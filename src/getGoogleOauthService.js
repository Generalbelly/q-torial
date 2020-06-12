class GoogleOauthService {
  auth;

  constructor(clientId, apiKey, scope = 'email') {
    this.auth = gapi.auth2.init({
      clientId,
      apiKey,
      scope,
    });
  }

  async signIn(additionalScope = '') {
    return new Promise(async (resolve, reject) => {
      try {
        let responseCode;
        let done = false;
        this.auth.currentUser.listen(async user => {
          if (user.isSignedIn() && !done) {
            const basicProfile = user.getBasicProfile();
            const email = basicProfile.getEmail();
            resolve({
              email,
              profile: basicProfile,
              code: responseCode,
            });
            done = true;
          }
        });
        const { code } = await this.auth.grantOfflineAccess({
          scope: additionalScope,
        });
        responseCode = code;
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
}

const useGoogleOauthService = () => {
  let service;
  return () => {
    if (!service) {
      service = new GoogleOauthService(
        process.env.VUE_APP_GOOGLE_ANALYTICS_CLIENT_ID,
        process.env.VUE_APP_GOOGLE_ANALYTICS_API_KEY,
      );
    }
    return service;
  };
};

export const getGoogleOauthService = useGoogleOauthService();
