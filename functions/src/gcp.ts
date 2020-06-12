import * as fs from 'fs';
import * as zlib from 'zlib';
const { pipeline } = require('stream');
// tslint:disable-next-line: no-implicit-dependencies
import { GaxiosError } from 'gaxios';
import { Credentials } from 'google-auth-library';
import { GoogleOAuthAccessToken } from 'firebase-admin';
// eslint-disable-next-line camelcase
import { cloudfunctions_v1, firestore_v1, google } from 'googleapis';
import replaceInFile, { ReplaceInFileConfig } from 'replace-in-file';

import functions from './functions';
import Gcp from './models/gcp';
import UserRepository from './repositories/user';
import { downloadFile } from './storage';
import { getSecurityRules, createAdmin } from './admin';
import FirebaseConfig from './models/firebase-config';
import Task from "./models/task";
import TaskRepository from './repositories/task';

const { credentials } = functions.config().gcp_oauth;
const clientId = credentials.client_id;
const clientSecret = credentials.client_secret;
// Don't use an actual redirect uri from our list of valid uri's. Instead, it needs to be postmessage.
// https://stackoverflow.com/a/48121098/7621726
const redirectUri = 'postmessage';

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);

const QtorialVersion = 'v0.1.0';

// Wrap callback in a promise.
const getToken = (code: string): Promise<Credentials> => new Promise((resolve: (token: Credentials) => void, reject: (err: GaxiosError) => void) => {
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      reject(err);
    } else if (token) {
      resolve(token);
    }
  });
});

interface Index extends firestore_v1.Schema$GoogleFirestoreAdminV1Index {
  collectionGroup: string,
}

export const uploadFirestoreIndexes = async (firebaseConfig: FirebaseConfig) => {
  try {
    const firestoreIndexesFile = '/tmp/firestore.indexes.json';
    // @ts-ignore
    await downloadFile(process.env.GCLOUD_PROJECT, 'firestore.indexes.json', firestoreIndexesFile);
    const firestoreClient = google.firestore({
      auth: oauth2Client,
      version: 'v1',
    });

    const collectionGroupBasePath = `projects/${firebaseConfig.projectId}/databases/(default)/collectionGroups`;
    const indexesObject: {
      // eslint-disable-next-line camelcase
      indexes: Index[]
    } = JSON.parse(fs.readFileSync(firestoreIndexesFile, 'utf8'));
    const { indexes } = indexesObject;
    await Promise.all(indexes.map(async index => {
      await firestoreClient.projects.databases.collectionGroups.indexes.create({
        parent: `${collectionGroupBasePath}/${index.collectionGroup}`,
        requestBody: {
          queryScope: index.queryScope,
          fields: index.fields,
        },
      });
    }));
    fs.unlinkSync(firestoreIndexesFile);
  } catch (e) {
    console.error(e);
  }
};

export const uploadFirestoreRules = async (firebaseConfig: FirebaseConfig) => {
  const securityRules = getSecurityRules(createAdmin({
    credential: {
      async getAccessToken(): Promise<GoogleOAuthAccessToken> {
        const { token } = await oauth2Client.getAccessToken();
        if (!token) {
          throw new Error('error occured while getting access token.');
        }
        const {
          expiry_date,
        } = await oauth2Client.getTokenInfo(token);
        return {
          access_token: token,
          expires_in: expiry_date,
        };
      },
    },
    storageBucket: firebaseConfig.storageBucket,
    projectId: firebaseConfig.projectId,
    databaseURL: firebaseConfig.databaseURL,
  }, 'user'));
  await securityRules.releaseFirestoreRulesetFromSource(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function authData() {
      return request.auth;
    }
    function incomingData() {
      return request.resource.data;
    }
    function signedIn() {
      return authData().uid != null;
    }
    function isOwner(userId) {
      return authData().uid == userId;
    }
    match /users/{userId}/tutorials/{tutorialId}/{document=**} {
      allow list, get, delete: if signedIn() && isOwner(userId);
      allow create: if signedIn() && isOwner(userId) &&
        incomingData().createdAt is timestamp &&
        incomingData().updatedAt is timestamp;
      allow update: if signedIn() && isOwner(userId) &&
        incomingData().updatedAt is timestamp;
    }
  }
}
`);
};

interface FunctionSetting {
  name: string,
  // eslint-disable-next-line camelcase
  eventTrigger?: cloudfunctions_v1.Schema$EventTrigger,
  // eslint-disable-next-line camelcase
  httpsTrigger?: cloudfunctions_v1.Schema$HttpsTrigger,
  public: boolean,
}

export const uploadTag = async (firebaseConfig: FirebaseConfig) => {
  const localFilePath = '/tmp/q-torial.js';
  const gzipFilePath = '/tmp/q-torial.js.gz';
  const storageFilePath = 'js/q-torial.js';
  // @ts-ignore
  await downloadFile(process.env.GCLOUD_PROJECT, 'js/q-torial.js', localFilePath);
  const options: ReplaceInFileConfig = {
    files: localFilePath,
    from: /\{\{FIREBAE_PROJECT_ID\}\}/g,
    to: firebaseConfig.projectId,
  };
  await replaceInFile(options);

  const gzip = zlib.createGzip();
  const source = fs.createReadStream(localFilePath);
  const destination = fs.createWriteStream(gzipFilePath);

  pipeline(source, gzip, destination, (err: any) => {
    if (err) {
      console.error(err);
    }
  });

  const storageClient = google.storage({
    auth: oauth2Client,
    version: 'v1',
  });
  await storageClient.objects.insert({
    bucket: firebaseConfig.storageBucket,
    name: storageFilePath,
    predefinedAcl: 'publicRead',
    media: {
      mimeType: 'application/javascript; charset=utf-8',
      body: gzip,
    },
    requestBody: {
      contentType: 'application/javascript; charset=utf-8',
      contentEncoding: 'gzip',
    },
  });
  fs.unlinkSync(localFilePath);
  fs.unlinkSync(gzipFilePath);
};

export const uploadFunctions = async (firebaseConfig: FirebaseConfig) => {
  const cloudFunctionClient = google.cloudfunctions({
    auth: oauth2Client,
    version: 'v1',
  });

  const zipFile = `functions/q-torial-${QtorialVersion}.zip`;
  const storageClient = google.storage({
    auth: oauth2Client,
    version: 'v1',
  });
  await storageClient.objects.copy({
    sourceBucket: process.env.GCLOUD_PROJECT,
    sourceObject: zipFile,
    destinationBucket: firebaseConfig.storageBucket,
    destinationObject: zipFile,
  });

  const location = `projects/${firebaseConfig.projectId}/locations/us-central1`;
  const resource = `projects/${firebaseConfig.projectId}/databases/(default)/documents/users/{userId}/tutorials/{tutorialId}`;
  const functionNames: FunctionSetting[] = [
    {
      name: 'onTutorialCreate',
      eventTrigger: {
        eventType: 'providers/cloud.firestore/eventTypes/document.create',
        resource,
      },
      public: false,
    },
    {
      name: 'onTutorialUpdate',
      eventTrigger: {
        eventType: 'providers/cloud.firestore/eventTypes/document.update',
        resource,
      },
      public: false,
    },
    {
      name: 'onTutorialDelete',
      eventTrigger: {
        eventType: 'providers/cloud.firestore/eventTypes/document.delete',
        resource,
      },
      public: false,
    },
    {
      name: 'getTutorial',
      httpsTrigger: {},
      public: true,
    },
    {
      name: 'storePerformance',
      httpsTrigger: {},
      public: true,
    },
    {
      name: 'logError',
      httpsTrigger: {},
      public: true,
    },
  ];

  await Promise.all(functionNames.map(async f => {
    const functionName = `${location}/functions/${f.name}`;
    // eslint-disable-next-line camelcase
    const createParams: cloudfunctions_v1.Schema$CloudFunction = {
      name: functionName,
      sourceArchiveUrl: `gs://${firebaseConfig.storageBucket}/${zipFile}`,
      entryPoint: f.name,
      runtime: 'nodejs10',
    };
    if (f.eventTrigger) {
      createParams.eventTrigger = f.eventTrigger;
    } else {
      createParams.httpsTrigger = f.httpsTrigger;
    }
    await cloudFunctionClient.projects.locations.functions.create({
      location,
      requestBody: createParams,
    });
    if (f.public) {
      await cloudFunctionClient.projects.locations.functions.setIamPolicy({
        resource: functionName,
        requestBody: {
          policy: {
            bindings: [
              {
                role: 'roles/cloudfunctions.invoker',
                members: [
                  'allUsers',
                ],
              },
            ],
          },
        },
      });
    }
  }));
};

const SETUP_TYPE_FIRESTORE_RULES = 'firestore.rules';
const SETUP_TYPE_FUNCTIONS = 'functions';
const SETUP_TYPE_TAG = 'tag';
const SETUP_TYPE_FIRESTORE_INDEXES = 'firestore.indexes';

export const setup = (userRepository: UserRepository, taskRepository: TaskRepository) => functions.https.onCall(async (data: any, context: functions.https.CallableContext):Promise<void> => {
  const { auth } = context;
  if (!auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }
  const { uid } = auth;
  const { version = 'v1', setupType = '', id = '' } = data;
  if (!id) {
    throw new functions.https.HttpsError('failed-precondition', 'id is required.');
  }

  const isTriggered = await taskRepository.exists(id);
  if (isTriggered) return;
  await taskRepository.add(new Task({ id, name: 'setup', payload: JSON.stringify(data) }));

  const gcp = await userRepository.getGcp(uid);
  if (!gcp) {
    throw new functions.https.HttpsError('not-found', 'gcp not found.');
  }
  const firebaseConfig = await userRepository.getFirebaseConfig(uid);
  if (!firebaseConfig) {
    throw new functions.https.HttpsError('not-found', 'firebaseConfig not found.');
  }
  oauth2Client.setCredentials({ refresh_token: gcp.refreshToken });

  try {
    if (setupType === SETUP_TYPE_FIRESTORE_RULES) {
      if (version !== gcp.firestoreRulesVersion) {
        await uploadFirestoreRules(firebaseConfig);
        gcp.firestoreRulesVersion = version;
        await userRepository.updateGcp(uid, gcp);
      }
    }
    if (setupType === SETUP_TYPE_FUNCTIONS) {
      if (version !== gcp.functionsVersion) {
        await uploadFunctions(firebaseConfig);
        gcp.functionsVersion = version;
        await userRepository.updateGcp(uid, gcp);
      }
    }
    if (setupType === SETUP_TYPE_TAG) {
      if (version !== gcp.tagVersion) {
        await uploadTag(firebaseConfig);
        gcp.tagVersion = version;
        await userRepository.updateGcp(uid, gcp);
      }
    }
    if (setupType === SETUP_TYPE_FIRESTORE_INDEXES) {
      if (version !== gcp.firestoreIndexesVersion) {
        await uploadFirestoreIndexes(firebaseConfig);
        gcp.firestoreIndexesVersion = version;
        await userRepository.updateGcp(uid, gcp);
      }
    }
  } catch (e) {
    console.error(e);
  }
});

export const addGcp = (userRepository: UserRepository) => functions.https.onCall(
  async (data: any, context: functions.https.CallableContext): Promise<Gcp> => {
    const { auth } = context;
    if (!auth) {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }

    const { code, email } = data;
    if (!code) {
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one arguments "code" for getting access token.');
    }

    if (!email) {
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one arguments "email".');
    }

    try {
      const { refresh_token } = await getToken(code);
      oauth2Client.setCredentials({ refresh_token });
      const gcp = await userRepository.addGcp(auth.uid, new Gcp({
        email,
        refreshToken: refresh_token,
      }));
      return gcp;
    } catch (error) {
      console.error(error);
      throw new Error('saving failed');
    }
  },
);

export const onGcpDelete = functions.firestore
  .document('/users/{userId}/gcps/{gcpId}')
  .onDelete(async (snap, context) => {
    const data = snap.data();
    if (!data) {
      throw new Error(`gcp not found: id is ${snap.id}`);
    }
    if (!data.refreshToken) {
      throw new Error(`gcp does not have refreshToken: id is ${snap.id}`);
    }
    oauth2Client.setCredentials({ refresh_token: data.refreshToken });
    const { token } = await oauth2Client.getAccessToken();

    if (token) {
      await oauth2Client.revokeToken(token);
    }
  });
