import { getData, setData } from '../googleAPIStorage';

describe('ui-elements-cloud-integrations', () => {
  describe('utils', () => {
    describe('google-api', () => {
      describe('storage', () => {

        beforeEach(() => {
          const script = document.getElementById('script-google-api');
          if (script) {
            script.remove();
          }
          delete window.__ui_elements_cloud_integrations_gapi;
        });

        it('should get data and memoize first default', () => {
          const KEY = 'key';
          const DEFAULT = 'default';
          const actual1 = getData(KEY, DEFAULT);
          expect(actual1).toBe(DEFAULT);
          const actual2 = getData(KEY, 'some other default');
          expect(actual2).toBe(DEFAULT);
        });
        it('should set data', () => {
          const KEY = 'key';
          const VALUE1 = 'value1';
          const VALUE2 = 'value2';
          setData(KEY, VALUE1);
          const actual1 = getData(KEY, 'some default');
          expect(actual1).toBe(VALUE1);
          setData(KEY, VALUE2);
          const actual2 = getData(KEY, 'some other default');
          expect(actual2).toBe(VALUE2);
        });
      });
    });
  });
});
