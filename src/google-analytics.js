import firebase from './firebase';
import GoogleAnalyticsAccount from './components/atoms/Entities/GoogleAnalyticsAccount';

let auth = null;
let _scope = null;
export default {
  init(clientId, apiKey, scope) {
    _scope = scope;
    window.gapi.client.init({
      clientId,
      apiKey,
      scope,
    });
  },
  async oauth2SignIn() {
    return new Promise(async (resolve) => {
      auth = await window.gapi.auth2.getAuthInstance();
      let responseCode;
      auth.currentUser.listen(async (user) => {
        if (user.isSignedIn()) {
          const basicProfile = user.getBasicProfile()
          const email = basicProfile.getEmail();
          const addGa = firebase.getFunctions().httpsCallable('addGa');
          const ga = await addGa({
            code: responseCode,
            email,
          });
          resolve(ga);
        }
      });
      const { code } = await auth.grantOfflineAccess({
        scope: _scope,
      });
      responseCode = code;
    });
  },
  queryAccounts(gaId) {
    return new Promise(async (resolve, reject) => {
      try {
        const queryAccounts = firebase.getFunctions().httpsCallable('queryAccounts');
        const accounts = await queryAccounts({
          id: gaId,
        });
        resolve(accounts);
      } catch (e) {
        reject(e);
      }
    });
  },
};
