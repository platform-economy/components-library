import * as React from 'react';
import { noop } from 'lodash';

export type DropdownContextType = {
  readonly opened: boolean;
  readonly coverRef: React.RefObject<HTMLElement>;
  readonly iconOpened: React.ReactNode|null;
  readonly iconClosed: React.ReactNode|null;
  onCoverClick(): void;
  onContentClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
  onFocus(): void;
  onBlur(): void;
};

export const DropdownContext = React.createContext<DropdownContextType>({
  opened: false,
  coverRef: React.createRef(),
  iconOpened: null,
  iconClosed: null,
  onCoverClick: noop,
  onContentClick: noop,
  onMouseOver: noop,
  onMouseOut: noop,
  onFocus: noop,
  onBlur: noop,
});
