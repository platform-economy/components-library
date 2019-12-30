jest.mock('../loadGoogleAPIScript', () => ({
  loadGoogleAPIScript: jest.fn(() => Promise.resolve()),
}));

import { loadGoogleAPI } from '../loadGoogleAPI';
import { loadGoogleAPIScript } from '../loadGoogleAPIScript';

declare global {
  interface Window {
    gapi: any; // tslint:disable-line:no-any
  }
}

describe('ui-elements-cloud-integrations', () => {
  describe('utils', () => {
    describe('google-api', () => {
      describe('loadScript', () => {

        beforeEach(() => {
          const script = document.getElementById('script-google-api');
          if (script) {
            script.remove();
          }
          delete window.__ui_elements_cloud_integrations_gapi;
        });

        it('should load single API', async () => {
          jest.setTimeout(10);
          window.gapi = {
            load: jest.fn((api, cb) => {
              cb.callback();
            }),
          };
          await expect(loadGoogleAPI('api1')).resolves.toEqual(['api1']);
          expect(loadGoogleAPIScript).toBeCalled();
          expect(window.gapi.load).toBeCalledTimes(1);
          expect(window.gapi.load).toBeCalledWith('api1', expect.anything());
        });
        it('should load two APIs at once', async () => {
          jest.setTimeout(10);
          window.gapi = {
            load: jest.fn((api, cb) => {
              cb.callback();
            }),
          };
          await expect(loadGoogleAPI('api1', 'api2'))
            .resolves.toEqual(['api1', 'api2']);
          expect(loadGoogleAPIScript).toBeCalled();
          expect(window.gapi.load).toBeCalledTimes(2);
        });
        it('should not load provided APIs twice', async () => {
          jest.setTimeout(10);
          window.gapi = {
            load: jest.fn((api, cb) => {
              cb.callback();
            }),
          };
          const promise1 = loadGoogleAPI('api1');
          const promise2 = loadGoogleAPI('api1');
          await expect(promise1).resolves.toEqual(['api1']);
          await expect(promise2).resolves.toEqual(['api1']);
          expect(window.gapi.load).toBeCalledTimes(1);
          expect(window.gapi.load).toBeCalledWith('api1', expect.anything());
        });
        it('should reject when onerror callback called', async () => {
          jest.setTimeout(10);
          window.gapi = {
            load: jest.fn((api, cb) => {
              cb.onerror();
            }),
          };
          await expect(loadGoogleAPI('api1'))
            .rejects.toMatchObject({ message: 'gapi.api1 failed to load!' });
        });
        it('should reject when ontimeout callback called', async () => {
          jest.setTimeout(10);
          window.gapi = {
            load: jest.fn((api, cb) => {
              cb.ontimeout();
            }),
          };
          await expect(loadGoogleAPI('api1'))
            .rejects.toMatchObject({ message: 'gapi.api1 failed to load (timeout)!' });
        });
      });
    });
  });
});
