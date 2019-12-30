jest.mock('../loadGoogleAPI', () => ({
  loadGoogleAPI: jest.fn(() => new Promise(() => {})),
}));

import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { loadGoogleAPI } from '../loadGoogleAPI';
import { withGoogleAPI, WithGoogleAPI } from '../withGoogleAPI';

describe('ui-elements-cloud-integrations', () => {
  describe('utils', () => {
    describe('google-api', () => {
      describe('withGoogleAPI', () => {
        it('should render component initially', () => {
          let actualProps: WithGoogleAPI|null = null;

          (loadGoogleAPI as jest.Mock<Promise<void>>).mockImplementation(
            () => Promise.resolve(),
          );

          const Component = (props: WithGoogleAPI) => {
            actualProps = props;
            return null;
          };

          const ComponentWithGoogleAPI = withGoogleAPI('test1')(Component);
          TestRenderer.create(<ComponentWithGoogleAPI />);
          expect(actualProps).toEqual({
            googleAPILoaded: false,
            googleAPILoadError: null,
          });
        });
        it('should render component when loaded', async () => {
          jest.setTimeout(10);
          let actualProps: WithGoogleAPI|null = null;
          let rendered: (() => void)| null = null;

          (loadGoogleAPI as jest.Mock<Promise<void>>).mockImplementation(
            () => Promise.resolve(),
          );

          const Component = (props: WithGoogleAPI) => {
            actualProps = props;
            rendered && rendered();
            return null;
          };

          const ComponentWithGoogleAPI = withGoogleAPI('test1')(Component);
          TestRenderer.create(<ComponentWithGoogleAPI />);

          // stores resolve function as 'rendered' to be called from Component
          await new Promise(resolve => rendered = resolve);
          expect(actualProps).toEqual({
            googleAPILoaded: true,
            googleAPILoadError: null,
          });
        });
        it('should render component when failed', async () => {
          jest.setTimeout(10);
          let actualProps: WithGoogleAPI|null = null;
          let rendered: (() => void)| null = null;

          const error = new Error('error');
          (loadGoogleAPI as jest.Mock<Promise<void>>).mockImplementation(
            () => Promise.reject(error),
          );

          const Component = (props: WithGoogleAPI) => {
            actualProps = props;
            rendered && rendered();
            return null;
          };

          const ComponentWithGoogleAPI = withGoogleAPI('test1')(Component);
          TestRenderer.create(<ComponentWithGoogleAPI />);

          // stores resolve function as 'rendered' to be called from Component
          await new Promise(resolve => rendered = resolve);
          expect(actualProps).toEqual({
            googleAPILoaded: false,
            googleAPILoadError: error,
          });
        });
      });
    });
  });
});
