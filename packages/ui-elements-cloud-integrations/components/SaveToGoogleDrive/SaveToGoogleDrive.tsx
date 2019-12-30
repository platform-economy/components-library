import * as React from 'react';
import { withGoogleAPI, WithGoogleAPI } from '../../utils/google-api';

export type SaveToGoogleDriveProps = {
  src: string;
  filename: string;
  sitename: string;
};
export type SaveToGoogleDriveAllProps = SaveToGoogleDriveProps & WithGoogleAPI;

export class SaveToGoogleDrivePure extends React.Component<SaveToGoogleDriveAllProps> {
  private ref: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.initGoogleDriveButton();
  }

  componentDidUpdate() {
    this.initGoogleDriveButton();
  }

  shouldComponentUpdate(newProps: SaveToGoogleDriveAllProps) {
    return (
      this.props.googleAPILoaded !== newProps.googleAPILoaded ||
      this.props.src !== newProps.src ||
      this.props.filename !== newProps.filename ||
      this.props.sitename !== newProps.sitename
    );
  }

  private initGoogleDriveButton() {
    const { googleAPILoaded, src, filename, sitename } = this.props;
    if (this.ref.current && googleAPILoaded) {
      while (this.ref.current.firstChild) {
        this.ref.current.firstChild.remove();
      }
      const div = document.createElement('div');
      div.className = 'button';
      this.ref.current.appendChild(div);
      gapi.savetodrive.render(div, { src, filename, sitename });
    }
  }
  render() {
    return (
      <div className="SaveToGoogleDrive" ref={this.ref} />
    );
  }
}

export const SaveToGoogleDrive = withGoogleAPI('savetodrive')(SaveToGoogleDrivePure);
