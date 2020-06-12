import * as firebaseAdmin from 'firebase-admin';

export const createAdmin = (options?: firebaseAdmin.AppOptions, name?: string) => {
  return firebaseAdmin.initializeApp(options, name);
};

const admin = createAdmin({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});

export default admin;

export const getSecurityRules = (app?: firebaseAdmin.app.App) => {
  return firebaseAdmin.securityRules(app);
};
