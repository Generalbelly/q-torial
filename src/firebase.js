import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import store from './store';
import UserEntity from './components/atoms/Entities/UserEntity';

export const { FieldValue } = firebase.firestore;

export const convertDocToObject = (doc) => {
  const data = {
    id: doc.id,
    ...doc.data(),
  };
  if (data.createdAt) {
    data.createdAtAsDateString = data.createdAt.toDate().toLocaleDateString();
  }
  if (data.updatedAt) {
    data.updatedAtAsDateString = data.updatedAt.toDate().toLocaleDateString();
  }
  return data;
};

export const convertDocumentsToArray = snapshot => snapshot.docs.map(doc => convertDocToObject(doc));

export default class FirebaseService {
  app;

  db;

  functions;

  auth;

  constructor(config, name = null) {
    this.app = firebase.initializeApp(config, name);
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
    await this.auth.signOut();
    await store.dispatch('updateLocalUser', null);
  }

  checkAuth() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(UserEntity.createFromAuth(
            user,
            store.state.user,
          ));
          return;
        }
        resolve(user);
      });
    });
  }

  watchAuth() {
    if (this.app.name !== process.env.VUE_APP_NAME) return;
    this.auth.onAuthStateChanged(async (user) => {
      await store.dispatch('updateLocalUser', user);
      if (user) {
        await store.dispatch('getUser');
        await store.dispatch('checkUserPaymentInfo');
        await store.dispatch('checkFirebaseConfig');
      }
    });
  }

  async applyActionCode(code) {
    await this.auth.applyActionCode(code);
  }

  async sendEmailVerification() {
    await this.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(email) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async resetPassword(code, password) {
    await this.auth.verifyPasswordResetCode(code);
    await this.auth.confirmPasswordReset(code, password);
  }

  async updatePassword(password) {
    await this.auth.currentUser.updatePassword(password);
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

  queryAccounts(gaId) {
    return new Promise(async (resolve, reject) => {
      try {
        const queryAccounts = this.functions.httpsCallable('queryAccounts');
        const accounts = await queryAccounts({
          id: gaId,
        });
        resolve(accounts);
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
   * @return {firebase.firestore.WriteBatch}
   *
   */
  getBatch() {
    return this.db.batch();
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getUserCollection() {
    return this.db.collection('users');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getStripeCustomerCollection(userId) {
    return this.db.collection('users').doc(userId).collection('stripe_customers');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getFirebaseConfigCollection(userId) {
    return this.db.collection('users').doc(userId).collection('firebase_configs');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getTutorialCollection(userId) {
    return this.db.collection('users').doc(userId).collection('tutorials');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getGaCollection(userId) {
    return this.db.collection('users').doc(userId).collection('gas');
  }

  /**
   * @return {firebase.functions.Functions}
   *
   */
  getFunctions() {
    return this.functions;
  }
}

export const appFirebaseService = new FirebaseService({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
}, process.env.VUE_APP_NAME);

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
