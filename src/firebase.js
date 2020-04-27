import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';

export const { FieldValue, Timestamp } = firebase.firestore;

export default class FirebaseService {
  app;

  db;

  functions;

  auth;

  analytics;

  constructor(config, name = null) {
    this.app = firebase.initializeApp(config, name);
    if (config.measurementId) {
      this.analytics = this.app.analytics();
    }
    this.functions = this.app.functions();
    this.db = this.app.firestore();
    this.db.enablePersistence({ synchronizeTabs: true });
    this.auth = this.app.auth();
    this.auth.useDeviceLanguage();
  }

  async signUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return this.auth.signOut();
  }

  checkAuth() {
    return new Promise(resolve => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        resolve(user);
        unsubscribe();
      });
    });
  }

  watchAuth(handler) {
    return this.auth.onAuthStateChanged(handler);
  }

  async applyActionCode(code) {
    await this.auth.applyActionCode(code);
  }

  async sendEmailVerification() {
    const user = await this.checkAuth();
    if (user) {
      await user.sendEmailVerification();
    }
  }

  async sendPasswordResetEmail(email, settings = null) {
    await this.auth.sendPasswordResetEmail(email, settings);
  }

  async resetPassword(code, password) {
    const email = await this.auth.verifyPasswordResetCode(code);
    await this.auth.confirmPasswordReset(code, password);
    return email;
  }

  async updatePassword(password) {
    const user = await this.checkAuth();
    if (user) {
      await user.updatePassword(password);
    }
  }

  updateAssets() {
    return new Promise(async (resolve, reject) => {
      try {
        const updateAssets = this.functions.httpsCallable('updateAssets');
        await updateAssets();
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * @return {firebase.firestore.Firestore}
   *
   */
  getDB() {
    return this.db;
  }

  /**
   * @return {firebase.functions.Functions}
   *
   */
  getFunctions() {
    return this.functions;
  }
}

const appFirebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};
const measurementId = process.env.VUE_APP_FIREBASE_MEASUREMENT_ID;
if (measurementId) {
  appFirebaseConfig.measurementId = measurementId;
}

export const appFirebaseService = new FirebaseService(
  appFirebaseConfig,
  process.env.VUE_APP_NAME,
);

const userFirebaseService = (name = 'user') => {
  let service;
  return (config = {}) => {
    if (!service) {
      service = new FirebaseService({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        databaseURL: config.databaseURL,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
      }, name);
    }
    return service;
  };
};

export const getUserFirebaseService = userFirebaseService();
