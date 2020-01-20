import { appFirebaseService } from './firebase';

export default {
  cancelSubscription(stripeCustomerId) {
    return new Promise(async (resolve, reject) => {
      try {
        const cancelSubscription = appFirebaseService.getFunctions().httpsCallable('cancelSubscription');
        const result = await cancelSubscription({
          id: stripeCustomerId,
        });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};
