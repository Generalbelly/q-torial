const SELECT_TUTORIAL = 'SELECT_TUTORIAL';
const SIGN_IN = 'SIGN_IN';
const FIREBAE_SIGN_IN = 'FIREBAE_SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const VERSION = 'VERSION';
const CHECK_AUTH = 'CHECK_AUTH';

let version = null;
export default {
  sendMessage(message, force = false) {
    return new Promise(resolve => {
      try {
        if (version || force) {
          chrome.runtime.sendMessage(
            process.env.VUE_APP_CHROME_EXTENSION_ID,
            message,
            response => {
              resolve(response);
            },
          );
        } else {
          resolve(null);
        }
      } catch (e) {
        console.log(e);
        resolve(null);
      }
    });
  },
  async signIn(email, password) {
    await this.sendMessage({
      command: SIGN_IN,
      data: {
        email,
        password,
      },
    }, true);
  },
  async firebaseSignIn(email, password) {
    await this.sendMessage({
      command: FIREBAE_SIGN_IN,
      data: {
        email,
        password,
      },
    }, true);
  },
  async signOut() {
    await this.sendMessage({
      command: SIGN_OUT,
    });
  },
  async getVersion() {
    const response = await this.sendMessage({
      command: VERSION,
    }, true);
    if (response && response.message) {
      version = response.message;
    }
    return version;
  },
  // async selectTutorial(tutorial = {}) {
  //   console.log(tutorial);
  //   const response = await this.sendMessage({
  //     command: SELECT_TUTORIAL,
  //     data: tutorial,
  //   });
  //   return response && response.status === 'OK';
  // },
  async checkAuth() {
    const response = await this.sendMessage({
      command: CHECK_AUTH,
    });
    return response && response.status === 'OK';
  },
};
