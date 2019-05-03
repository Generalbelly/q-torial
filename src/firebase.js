import firebase from 'firebase/app';
import 'firebase/auth';
import store from './store';
import chromeExtension from './chromeExtension';

export default {
  init(config) {
    firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
  },
  handleAuthError(error) {
    let field = null;
    let message = '';
    switch (error.code) {
      case 'auth/email-already-in-use':
        field = 'email';
        message = 'The email is already registered';
        break;
      case 'auth/invalid-email':
        field = 'email';
        message = 'The email is not valid.';
        break;
      case 'auth/weak-password':
        field = 'password';
        message = 'The password is not strong enough.';
        break;
      case 'auth/user-not-found':
        field = 'email';
        message = 'We couldn\'t find an account with the email.';
        break;
      case 'auth/wrong-password':
        field = 'password';
        message = 'The password is incorrect.';
        break;
      case 'auth/invalid-action-code':
      case 'auth/expired-action-code':
        field = 'general';
        message = 'The link you followed has already expired.';
        break;
      default:
        field = 'general';
        message = error.message;
    }
    console.log(error);
    store.dispatch('setServerSideErrors', {
      [field]: message,
    });
  },
  async signUp(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  async signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('signIn');
    chromeExtension.signIn(email, password).catch((response) => {
      console.log(response);
    });
  },
  async signOut() {
    await firebase.auth().signOut();
    console.log('signOut()');
    await store.dispatch('setUser', null);
    chromeExtension.signOut();
  },
  checkAuth() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(user => resolve(user));
    });
  },
  watchAuth() {
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log('watchAuth()', user);
      await store.dispatch('setUser', user);
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
};
