const SELECT_TUTORIAL = 'SELECT_TUTORIAL';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const VERSION = 'VERSION';

let version = null;
export default {
  sendMessage(message, force = false) {
    return new Promise((resolve, reject) => {
      try {
        if (version || force) {
          chrome.runtime.sendMessage(
            process.env.VUE_APP_CHROME_EXTENSION_ID, message,
            (response) => {
              resolve(response);
            },
          );
        } else {
          resolve(null);
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  async signIn(email, password) {
    try {
      await this.sendMessage({
        command: SIGN_IN,
        data: {
          email,
          password,
        },
      }, true);
    } catch (e) {
      throw e;
    }
  },
  async signOut() {
    this.sendMessage({
      command: SIGN_OUT,
    });
  },
  async getVersion() {
    try {
      const response = await this.sendMessage({
        command: VERSION,
      }, true);
      if (response.message) {
        version = response.message;
      }
      return version;
    } catch (e) {
      return false;
    }
  },
  async selectTutorial(tutorial = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.sendMessage({
          command: SELECT_TUTORIAL,
          data: tutorial,
        });
        if (response && response.status === 'ok') {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
};
