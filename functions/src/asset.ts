import * as fs from 'fs';
import { makeRequest } from './request';
import functions from './functions';

const PROTOCOL = 'https';
const HOST_NAME = 'storage.googleapis.com';

export const updateAssets = functions.https.onCall(
  (data: any, context: functions.https.CallableContext): Promise<boolean> => {
    const { auth } = context;
    if (!auth) {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    return new Promise(async (resolve, reject) => {
      try {
        const file = fs.createWriteStream('q-torial.js');
        const result = await makeRequest({
          protocol: PROTOCOL,
          hostname: HOST_NAME,
          method: 'get',
          path: 'q-torial/js/q-torial.js',
        });
        file.pipe(result);
        file.close();
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  },
);
