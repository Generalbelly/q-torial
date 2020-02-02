// tslint:disable-next-line: no-implicit-dependencies
import { GaxiosError } from 'gaxios';
// tslint:disable-next-line: no-implicit-dependencies
import { Credentials } from 'google-auth-library';
import { google } from 'googleapis';

import admin from './admin';
import functions from './functions';
import Ga from './models/ga';

// oauth for google analytics
const { credentials } = functions.config().ga;
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

export const addGa = functions.https.onCall((data: any, context: functions.https.CallableContext) => new Promise(async (resolve, reject) => {
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

  const { refresh_token } = await getToken(code);

  oauth2Client.setCredentials({ refresh_token });

  try {
    const ref = admin.firestore().collection('users').doc(auth.uid).collection('gas')
      .doc();
    await ref.set({
      id: ref.id,
      email,
      refreshToken: refresh_token,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const unsubscribe = ref.onSnapshot(doc => {
      resolve(new Ga(doc.data()));
      unsubscribe();
    });
  } catch (error) {
    reject(error);
  }
}));

export const queryAccounts = functions.https.onCall((data: any, context: functions.https.CallableContext) => new Promise(async resolve => {
  const { auth } = context;
  if (!auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  const { id } = data;
  if (!id) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one arguments "id".');
  }
  const snap = await admin.firestore().collection('users').doc(auth.uid).collection('gas')
    .doc(id)
    .get();
  if (!snap.exists) {
    throw new functions.https.HttpsError('not-found', `ga(id:${id}) not found.`);
  }
  const ga = new Ga(snap.data());
  oauth2Client.setCredentials({ refresh_token: ga.refreshToken });

  let accounts: any[] = [];
  try {
    const apiClient = google.analytics({
      auth: oauth2Client,
      version: 'v3',
    });
    const accountsRes = await apiClient.management.accounts.list();
    if (accountsRes && accountsRes.data && accountsRes.data.items) {
      accounts = await Promise.all(accountsRes.data.items.map(async account => {
        const webPropertiesRes = await apiClient.management.webproperties.list({
          accountId: account.id,
        });
        let webProperties: any[] = [];
        if (webPropertiesRes && webPropertiesRes.data && webPropertiesRes.data.items) {
          webProperties = await Promise.all(webPropertiesRes.data.items.map(async webProperty => {
            const profilesRes = await apiClient.management.profiles.list({
              accountId: account.id,
              webPropertyId: webProperty.id,
            });
            return {
              ...webProperty,
              profiles: profilesRes.data.items,
            };
          }));
        }
        return {
          ...account,
          webProperties,
        };
      }));
    }
  } catch (error) {
    console.error(error);
  }
  resolve(accounts);
}));

// developerのtutorials.gaはきれいにはならない。。。
export const onGaDelete = functions.firestore
  .document('/users/{userId}/gas/{gaId}')
  .onDelete(async (snap, context) => {
    const data = snap.data();
    if (!data) {
      throw new Error(`ga not found: id is ${snap.id}`);
    }
    if (!data.refreshToken) {
      throw new Error(`ga does not have refreshToken: id is ${snap.id}`);
    }
    oauth2Client.setCredentials({ refresh_token: data.refreshToken });
    const { token } = await oauth2Client.getAccessToken();

    if (token) {
      await oauth2Client.revokeToken(token);
      const userKey = context.params.userId;
      const tutorials = await admin.firestore()
        .collection('users').doc(userKey)
        .collection('tutorials')
        .where('gaId', '==', context.params.gaId)
        .get();
      await Promise.all(tutorials.docs.map(doc => doc.ref.update({
        gaId: null,
      })));
    }
  });
