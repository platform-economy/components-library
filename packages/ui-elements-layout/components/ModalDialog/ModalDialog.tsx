import React, { Component } from 'react';
import styled from 'styled-components';

export type ModalDialogProps = {
  isOpened?: boolean;
  closeIcon?: React.ReactNode;
  onCloseClick?: (e: React.SyntheticEvent) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const StyledModalDialog = styled.div`
  width: 680px;
  height: 733px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.theme.palette.surface};
  position: relative;
  padding: 10px;
`;

export const CloseIconWrapper = styled.div`
  color: ${props => props.theme.palette.text_inverted};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.43;
  top: 1em;
  position: absolute;
  right: 1.5em;
  &:hover {
      color: ${props => props.theme.palette.active_hovered};
      cursor: pointer;
  }
`;

export class ModalDialog extends Component<ModalDialogProps> {

  render() {

    const { children, onCloseClick, header, closeIcon } = this.props;
    return (
      <StyledModalDialog>
        <header>
            {closeIcon ? (
            <CloseIconWrapper onClick={onCloseClick}>
              {closeIcon}
            </CloseIconWrapper>) : null}
            {header}
        </header>
        <section>
          {children}
        </section>

      </StyledModalDialog>
    );
  }
}
