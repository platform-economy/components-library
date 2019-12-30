import { getData, setData } from './googleAPIStorage';

const GOOGLE_API_SCRIPT = 'https://apis.google.com/js/platform.js';
const DATA_KEY = 'googleAPIScriptPromise';
export function loadGoogleAPIScript(): Promise<void> {
  let googleAPIScriptPromise = getData(DATA_KEY, null) as Promise<void>|null;
  if (!googleAPIScriptPromise) {
    googleAPIScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script') as HTMLScriptElement;
      script.src = GOOGLE_API_SCRIPT;
      script.id = 'script-google-api';
      script.async = true;
      script.onload = () => {
        console.log(`Loaded Google API script: ${GOOGLE_API_SCRIPT}`);
        resolve();
      };
      script.onerror = (event, source?, fileno?, columnNumber?, error?: Error) => reject(error);
      document.body.appendChild(script);
    });
    setData(DATA_KEY, googleAPIScriptPromise);
  }
  return googleAPIScriptPromise;
}
