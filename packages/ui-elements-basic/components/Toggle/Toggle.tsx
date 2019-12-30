import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { ToggleProps } from './types';

const ThemeStyledToggle = styled.button<ToggleProps>`
      padding: 13px 30px;
      border-radius: 2px;
      border: none;
      outline: none;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      transition: 100ms all ease-in-out;

      background-color: transparent;
      color: ${props => (props.highlight && props.toggled) ?
               props.theme.palette.active :
               props.theme.palette.text};
      font-size: 1.5em;
      cursor: pointer;
      border-bottom:2px solid transparent;
      margin-bottom:-2px;

      &.iconOffFromIconOn {
        color: ${props => props.theme.palette.inactive};
      }

      &:active:hover,
      &:active:focus {
        color: ${props => props.theme.palette.active_hovered};
      }

      &:focus,
      &.iconOffFromIconOn:focus {
        color: ${props => props.theme.palette.active};
        margin-bottom:-2px;
      }
      &:hover:not(:disabled), &.iconOffFromIconOn:hover:not(:disabled) {
        color: ${props => props.theme.palette.active_hovered};
      }

      &:active {
        color: ${props => props.theme.palette.text};
      }

      &:disabled {
        color: ${props => props.theme.palette.inactive};
        cursor: not-allowed;
      }
    `;

export class Toggle extends React.Component<ToggleProps> {
  render() {
    const { iconOn, iconOff, toggled } = this.props;
    return (
      <ThemeStyledToggle
          {...this.props}
          className={classNames({
            iconOffFromIconOn: (!toggled && iconOff == null),
          })}
      >
        {toggled ? iconOn : (iconOff || iconOn)}
      </ThemeStyledToggle>
    );
  }
}
