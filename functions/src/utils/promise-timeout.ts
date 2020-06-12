const promiseTimeout = (promise: Promise<any>, ms: number = 10000): Promise<any> => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Timed out in ${ ms }ms.`));
    }, ms);
  });
  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout,
  ]);
};

export default promiseTimeout;
