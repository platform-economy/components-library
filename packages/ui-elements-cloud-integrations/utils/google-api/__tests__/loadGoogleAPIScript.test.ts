import { loadGoogleAPIScript } from '../loadGoogleAPIScript';

describe('ui-elements-cloud-integrations', () => {
  describe('utils', () => {
    describe('google-api', () => {

      beforeEach(() => {
        const script = document.getElementById('script-google-api');
        if (script) {
          script.remove();
        }
        delete window.__ui_elements_cloud_integrations_gapi;
      });
      describe('loadScript', () => {
        it('should append script to body', async () => {
          jest.setTimeout(10);
          const promise = loadGoogleAPIScript();
          const script = document.getElementById('script-google-api') as HTMLScriptElement;
          expect(script).toBeDefined();
          expect(script.src).toBe('https://apis.google.com/js/platform.js');
          expect(script.onload).toBeDefined();
          expect(script.parentElement).toBe(document.body);
          script.onload && script.onload(new Event('onload'));
          await expect(promise).resolves.toBeUndefined();
        });
        it('should append single script for multiple calls', async () => {
          jest.setTimeout(10);
          const promise1 = loadGoogleAPIScript();
          const promise2 = loadGoogleAPIScript();
          const allScripts = document.getElementsByTagName('script');
          const scripts = Array.from(allScripts).filter(
            (script: HTMLScriptElement) => script.id === 'script-google-api',
          );
          expect(scripts.length).toBe(1);
          scripts[0].onload && scripts[0].onload(new Event('onload'));
          await expect(promise1).resolves.toBeUndefined();
          await expect(promise2).resolves.toBeUndefined();
        });
        it('should reject on error', async () => {
          jest.setTimeout(10);
          const promise = loadGoogleAPIScript();
          const script = document.getElementById('script-google-api') as HTMLScriptElement;
          expect(script.onerror).toBeDefined();
          const error = new Error('error message');
          script.onerror && script.onerror(new Event('onerror'), 'source', 0, 0, error);
          await expect(promise).rejects.toBe(error);
        });
      });
    });
  });
});
