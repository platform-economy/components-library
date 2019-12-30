import { getData } from './googleAPIStorage';
import { loadGoogleAPIScript } from './loadGoogleAPIScript';

const DATA_KEY = 'apiPromises';

export async function loadGoogleAPI(...apiNames: string[]) {
  const apiPromises = getData(DATA_KEY, {}) as {[apiName: string]: Promise<string>};
  await loadGoogleAPIScript();
  const promises = apiNames.map((apiName) => {
    if (apiName in apiPromises) {
      return apiPromises[apiName];
    }
    const apiPromise = new Promise<string>((resolve, reject) => {
      const onError = (err: Error) => {
        reject(err);
        delete apiPromises[apiName];
      };
      gapi.load(apiName, {
        timeout: 1000,
        callback: () => {
          console.log(`Loaded Google API: ${apiName}`);
          resolve(apiName);
        },
        onerror: () => onError(new Error(`gapi.${apiName} failed to load!`)),
        ontimeout: () => onError(new Error(`gapi.${apiName} failed to load (timeout)!`)),
      });
    });
    apiPromises[apiName] = apiPromise;

    return apiPromise;
  });
  return await Promise.all(promises);
}
