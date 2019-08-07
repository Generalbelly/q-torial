import firebase from './firebase';
import GoogleAnalyticsAccount from './components/atoms/Entities/GoogleAnalyticsAccount';

let accounts = [];
const queryProperties = async (accountId) => {
  const response = await window.gapi.client.analytics.management.webproperties.list({
    accountId: accountId,
  });
  return response.result.items;
};

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
          // TODO Google以外もやるようになったら、ここにservice=googleも追加。
          const addOauth = firebase.getFunctions().httpsCallable('addOauth');
          await addOauth({
            code: responseCode,
            email,
          });
          resolve();
        }
      });
      const { code } = await auth.grantOfflineAccess({
        scope: _scope,
      });
      responseCode = code;
    })
  },
  queryAccounts: async () => {
    // try {
    //   await window.gapi.client.load('analytics', 'v3');
    //   const response = await window.gapi.client.analytics.management.accounts.list();
    //   accounts = await Promise.all(response.result.items.map((account) => {
    //     return new GoogleAnalyticsAccount({
    //       ...account,
    //       webProperties: queryProperties(account.id),
    //     });
    //   }));
    //   return accounts;
    // } catch (e) {
    //   console.error(e);
    //   return [];
    // }
  },
};
