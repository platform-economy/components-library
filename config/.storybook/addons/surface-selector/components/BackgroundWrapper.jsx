import React from 'react';
import styled, {withTheme} from 'styled-components';
import { INIT_EVENT, UPDATE_EVENT } from '../constants';

const BackgroundStyled = styled.div`
  background-color: ${props => props.theme.palette[props.color]};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

class BackgroundWrapperPure extends React.Component {
  state = {
    color: 'background'
  }
  componentDidMount() {
    const { channel, theme } = this.props;
    channel.on(UPDATE_EVENT, this.handleUpdate);
    channel.emit(INIT_EVENT, theme);
  }
  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(UPDATE_EVENT, this.handleUpdate);
  }
  componentDidUpdate(prevProps) {
    const { channel, theme } = this.props;
    const { theme: prevTheme } = prevProps;
    if (theme !== prevTheme) {
      channel.emit(INIT_EVENT, theme);
    }
  }

  handleUpdate = ({ color }) => {
    this.setState({ color });
  }

  render() {
    return (
      <BackgroundStyled color={this.state.color}>
        {this.props.children}
      </BackgroundStyled>
    );
  }
}

export const BackgroundWrapper = withTheme(BackgroundWrapperPure);
