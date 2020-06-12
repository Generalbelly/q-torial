import { CreateReadStreamOptions, DownloadOptions, DownloadResponse } from '@google-cloud/storage';
import { Readable } from "stream";
import admin from './admin';

interface storageConfig {
  gzip: boolean,
  destination: string,
  metadata: Object,
}

interface StorageFile {
  createReadStream(options?: CreateReadStreamOptions): Readable;
  download(options?: DownloadOptions): Promise<DownloadResponse>;
}

export const getFile = async (bucket: string, filepath: string): Promise<StorageFile> => {
  const storage = admin.storage();
  return storage.bucket(bucket).file(filepath);
};

export const downloadFile = async (bucket: string, filepath: string, downloadPath: string) => {
  const file = await getFile(bucket, filepath);
  await file.download({
    destination: downloadPath,
  });
};

export const putFile = async (filename: string, config: storageConfig) => {
  const storage = admin.storage();
  await storage.bucket().upload(filename, config);
};

export const makePublic = async (filename: string) => {
  const storage = admin.storage();
  await storage.bucket().file(filename).makePublic();
};

// export const copy = async (filename: string, newFilename: string): Promise<boolean> => new Promise(
//   async (resolve, reject) => {
//     try {
//       const storage = admin.storage();
//       await storage.bucket().file(filename).copy(newFilename);
//       resolve(true);
//     } catch (e) {
//       console.error(e);
//       reject(e);
//     }
//   },
// );
//
// export const move = async (origin: string, dest: string): Promise<boolean> => new Promise(
//   async (resolve, reject) => {
//     try {
//       const storage = admin.storage();
//       await storage.bucket().file(origin).move(dest);
//       resolve(true);
//     } catch (e) {
//       console.error(e);
//       reject(e);
//     }
//   },
// );
