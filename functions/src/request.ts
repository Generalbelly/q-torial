import * as https from 'https';

interface requestOptions {
  protocol: string,
  method: string,
  hostname: string,
  path: string,
}

export const makeRequest = async (options: requestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const req = https.request({
      protocol: options.protocol,
      method: options.method,
      hostname: options.hostname,
      path: options.path,
    }, (res) => {
      res.on('data', (data: any) => {
        console.log(data)
        resolve(data)
      });
    });
    req.on('error', (e) => {
      reject(e)
    });
    req.end();
  })
};
