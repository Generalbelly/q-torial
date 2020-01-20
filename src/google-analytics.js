import firebase from './firebase';

let auth = null;
let s = null;
export default {
  init(clientId, apiKey, scope) {
    s = scope;
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
          const basicProfile = user.getBasicProfile();
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
        scope: s,
      });
      responseCode = code;
    });
  },
};
