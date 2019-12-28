import firebase from './firebase';

export default {
  updateAssets() {
    return new Promise(async (resolve, reject) => {
      try {
        const updateAssets = firebase.getFunctions().httpsCallable('updateAssets');
        await updateAssets();
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  },
};
