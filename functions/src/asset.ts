import * as fs from 'fs';
import replaceInFile, { ReplaceInFileConfig } from 'replace-in-file';
import {GET_METHOD, makeRequest} from './request';
import functions from './functions';
import { putFile, makePublic } from './storage';

const gcpProjectId = process.env.GCLOUD_PROJECT;

export const downloadFile = async (path: string, dist: string): Promise<boolean> => new Promise(
  async (resolve, reject) => {
    try {
      const file = fs.createWriteStream(dist);
      const res = await makeRequest({
        responseType: 'stream',
        baseURL: 'https://storage.googleapis.com',
        method: GET_METHOD,
        url: path,
      });
      res.data.pipe(file);
      file.on('finish', () => {
        resolve(true);
      });
      file.on('error', () => {
        reject(new Error('downloading file failed.'));
      });
    } catch (e) {
      reject(e);
    }
  },
);

export const updateAssets = functions.https.onCall(
  (data: any, context: functions.https.CallableContext): Promise<boolean> => {
    const { auth } = context;
    if (!auth) {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    if (!gcpProjectId) {
      throw new Error('gcp project id is not found.');
    }
    return new Promise(async resolve => {
      try {
        const filename = '/tmp/q-torial.js';
        await downloadFile('/q-torial/js/q-torial.js', filename);
        const options: ReplaceInFileConfig = {
          files: filename,
          from: /\{\{FIREBAE_PROJECT_ID\}\}/g,
          to: gcpProjectId,
        };
        await replaceInFile(options)
        const destination = 'js/q-torial.js';
        await putFile(filename, {
          // Support for HTTP requests made with `Accept-Encoding: gzip`
          gzip: true,
          metadata: {
            // Enable long-lived HTTP caching headers
            cacheControl: 'public, max-age=3600',
          },
          destination,
        });
        await makePublic(destination);
        resolve(true);
      } catch (e) {
        console.error(e);
        resolve(false);
      }
    });
  },
);
