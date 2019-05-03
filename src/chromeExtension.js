const SIGN_UP = 'SIGN_UP';
const SIGN_OUT = 'SIGN_OUT';
const GET_LAST_ACTION = 'GET_LAST_ACTION';
const GET_VERSION = 'GET_VERSION';

export default {
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      try {
        if (chrome) {
          chrome.runtime.sendMessage(
            process.env.VUE_APP_CHROME_EXTENSION_ID, message,
            (response) => {
              resolve(response);
            },
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  async signIn(email, password) {
    try {
      await this.sendMessage({
        action: SIGN_UP,
        meta: {
          email,
          password,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  async signOut() {
    try {
      return this.sendMessage({
        action: SIGN_OUT,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getLastAction() {
    try {
      return this.sendMessage({
        action: GET_LAST_ACTION,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getVersion() {
    try {
      return this.sendMessage({
        action: GET_VERSION,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
