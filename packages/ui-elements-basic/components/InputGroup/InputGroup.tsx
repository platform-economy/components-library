import * as React from 'react';
import styled from 'styled-components';

export type InputGroupProps = {
  children?: React.ReactNode;
};

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: transparent;

  * {
    max-height: 100%;
  }
`;

export class InputGroup extends React.Component<InputGroupProps> {
  render() {
    return (
      <StyledInputGroup className="InputGroup">{this.props.children}</StyledInputGroup>
    );
  }
}
