import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import { SaveToGoogleDrivePure } from '../index';

enzyme.configure({ adapter: new Adapter() });

declare global {
  interface Window {
    gapi: any; // tslint:disable-line:no-any
  }
}

describe('ui-elements-cloud-integrations', () => {
  describe('Components', () => {
    describe('SaveToGoogleDrive', () => {

      it('should render with default state', () => {
        const SRC = 'src';
        const FILENAME = 'filename';
        const SITENAME = 'sitename';

        const tree = TestRenderer
          .create((
            <SaveToGoogleDrivePure
              src={SRC}
              filename={FILENAME}
              sitename={SITENAME}
              googleAPILoaded={true}
              googleAPILoadError={null}
            />
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should call Google API', () => {
        const SRC = 'src';
        const FILENAME = 'filename';
        const SITENAME = 'sitename';

        window.gapi = window.gapi || {};
        window.gapi.savetodrive = {};
        window.gapi.savetodrive.render = jest.fn((el: HTMLElement, parameters: unknown) => {
          el.innerText = JSON.stringify(parameters);
        });

        enzyme
          .mount((
            <SaveToGoogleDrivePure
              src={SRC}
              filename={FILENAME}
              sitename={SITENAME}
              googleAPILoaded={true}
              googleAPILoadError={null}
            />
          ));
        expect(window.gapi.savetodrive.render).toBeCalledTimes(1);
        expect(window.gapi.savetodrive.render).toBeCalledWith(expect.anything(), {
          src: SRC,
          filename: FILENAME,
          sitename: SITENAME,
        });
      });
      ['src', 'filename', 'sitename'].forEach((prop) => {
        it(`should rerender when ${prop} changed`, () => {
          const SRC = 'src';
          const FILENAME = 'filename';
          const SITENAME = 'sitename';
          const NEW_VALUE = 'new value';

          window.gapi = window.gapi || {};
          window.gapi.savetodrive = {};
          window.gapi.savetodrive.render = jest.fn((el: HTMLElement, parameters: unknown) => {
            el.innerText = JSON.stringify(parameters);
          });

          const tree = enzyme
            .mount((
              <SaveToGoogleDrivePure
                src={SRC}
                filename={FILENAME}
                sitename={SITENAME}
                googleAPILoaded={true}
                googleAPILoadError={null}
              />
            ));
          tree.setProps({
            [prop]: NEW_VALUE,
          });
          expect(window.gapi.savetodrive.render).toBeCalledTimes(2);
          expect(window.gapi.savetodrive.render).toBeCalledWith(expect.anything(), {
            src: SRC,
            filename: FILENAME,
            sitename: SITENAME,
            [prop]: NEW_VALUE,
          });
        });
      });
    });
  });
});
