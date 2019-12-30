import React from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  INIT_EVENT,
  UPDATE_EVENT,
  FONTS,
  DEFAULT_FONT,
  MIN_SIZE,
  MAX_SIZE,
  DEFAULT_SIZE
} from '../constants';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: inherit;
    font-size: inherit;
  }
  
  html {
    font-family: "${props => props.fontFamily}";
    font-size: ${props => props.fontSize}px;
  }
`;

export class GlobalStylesWrapper extends React.Component {
  state = {
    styles: {
      fontFamily: DEFAULT_FONT,
      fontSize: DEFAULT_SIZE,
    }
  }
  componentDidMount() {
    const { channel } = this.props;
    const { styles } = this.state;
    channel.on(UPDATE_EVENT, this.handleUpdate);
    channel.emit(INIT_EVENT, {
      fonts: FONTS,
      minSize: MIN_SIZE,
      maxSize: MAX_SIZE,
      initialStyles: styles
    });
  }
  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(UPDATE_EVENT, this.handleUpdate);
  }

  handleUpdate = (styles) => {
    this.setState({ styles });
  }

  render() {
    const { styles } = this.state;
    return (
      <GlobalStyles {...styles} />
    );
  }
}
