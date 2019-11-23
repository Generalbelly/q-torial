import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import store from './store';

export const { FieldValue } = firebase.firestore;

export const convertDocToObject = doc => {
  const data = {
    id: doc.id,
    ...doc.data(),
  }
  if (data.createdAt) {
    data.createdAtAsDateString = data.createdAt.toDate().toLocaleDateString();
  }
  if (data.updatedAt) {
    data.updatedAtAsDateString = data.updatedAt.toDate().toLocaleDateString();
  }
  return data;
};

export const convertDocumentsToArray = snapshot => {
  return snapshot.docs.map(doc => convertDocToObject(doc));
};

let db = null;
let functions = null;
export default {
  async init(config) {
    firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
    functions = firebase.functions();
    db = firebase.firestore();
    await db.enablePersistence({ synchronizeTabs: true });
  },
  async signUp(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  async signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  async signOut() {
    await firebase.auth().signOut();
    await store.dispatch('updateUser', null);
  },
  checkAuth() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(user => resolve(user));
    });
  },
  watchAuth() {
    firebase.auth().onAuthStateChanged(async (user) => {
      await store.dispatch('updateUser', user);
      if (user) {
        await store.dispatch('getUserPaymentInfo', user);
      }
    });
  },
  async applyActionCode(code) {
    await firebase.auth().applyActionCode(code);
  },
  async sendEmailVerification() {
    await firebase.auth().currentUser.sendEmailVerification();
  },
  async sendPasswordResetEmail(email) {
    await firebase.auth().sendPasswordResetEmail(email);
  },
  async resetPassword(code, password) {
    await firebase.auth().verifyPasswordResetCode(code);
    await firebase.auth().confirmPasswordReset(code, password);
  },
  getDB() {
    return db;
  },
  getFunctions() {
    return functions;
  },
};
