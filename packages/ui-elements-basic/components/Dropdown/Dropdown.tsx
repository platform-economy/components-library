import * as React from 'react';
import styled from 'styled-components';
import { DropdownContext, DropdownContextType } from './DropdownContext';
import { DropdownCover, DropdownCoverStyled } from './DropdownCover';
import { DropdownContent, DropdownContentStyled } from './DropdownContent';
import classnames from 'classnames';

export type DropdownOpenState = 'closed'|'hovered'|'clicked';

export type DropdownProps = {
  className?: string;
  style?: React.CSSProperties;
  isMobile?: boolean;
  isContentCentered?: boolean;
  openState?: DropdownOpenState;
  dropOnHover?: boolean;
  dropOnFocus?: boolean;
  iconOpened?: React.ReactNode;
  iconClosed?: React.ReactNode;
  children: React.ReactNode;
  onOpenStateChange?: (openState: DropdownOpenState) => void;
};

type DropdownState = {
  dropdownContext: DropdownContextType;
};

const OPEN_DELAY = 20;
const CLOSE_DELAY = 300;

class DropdownPure extends React.Component<DropdownProps, DropdownState> {
  private readonly ref: React.RefObject<HTMLDivElement>;
  private openingTimer: number|null;
  private closingTimer: number|null;

  constructor(props: DropdownProps) {
    super(props);
    const { iconOpened, iconClosed } = this.props;
    const dropdownContext: DropdownContextType = {
      iconOpened,
      iconClosed,
      opened: this.isOpened,
      coverRef: React.createRef(),
      onCoverClick: this.handleCoverClick,
      onContentClick: this.handleContentClick,
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };
    this.state = {
      dropdownContext,
    };
    this.openingTimer = null;
    this.closingTimer = null;
    this.ref = React.createRef();
  }

  static getDerivedStateFromProps(newProps: DropdownProps, state: DropdownState) {
    const { dropdownContext: oldDropdownContext } = state;
    const dropdownContextChanges: {
      locked?: boolean;
      opened?: boolean;
      iconOpened?: React.ReactNode|null;
      iconClosed?: React.ReactNode|null;
    } = {};
    const isOpened = newProps.openState != null && newProps.openState !== 'closed';
    if (isOpened !== oldDropdownContext.opened) {
      dropdownContextChanges.opened = isOpened;
    }
    if (newProps.iconOpened !== oldDropdownContext.iconOpened) {
      dropdownContextChanges.iconOpened = newProps.iconOpened || null;
    }
    if (newProps.iconClosed !== oldDropdownContext.iconClosed) {
      dropdownContextChanges.iconClosed = newProps.iconClosed || null;
    }

    if (Object.keys(dropdownContextChanges).length > 0) {
      const dropdownContext = {
        ...oldDropdownContext,
        ...dropdownContextChanges,
      };
      return { dropdownContext };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
    if (this.openingTimer) {
      window.clearTimeout(this.openingTimer);
    }
    if (this.closingTimer) {
      window.clearTimeout(this.closingTimer);
    }
  }

  get openState() {
    return this.props.openState || 'closed';
  }

  get isOpened() {
    return this.openState !== 'closed';
  }

  get isClicked() {
    return this.openState === 'clicked';
  }

  handleCoverClick = () => {
    const newOpenState: DropdownOpenState = this.isClicked ? 'closed' : 'clicked';
    this.fireOpenStateChange(newOpenState);
  }

  handleContentClick = () => {
    const newOpenState: DropdownOpenState = this.isOpened ? 'clicked' : this.openState;
    this.fireOpenStateChange(newOpenState);
  }

  handleDocumentClick = (event: MouseEvent) => {
    if (this.ref && this.ref.current && !this.ref.current.contains(event.target as Node)) {
      this.fireOpenStateChange('closed');
    }
  }

  handleMouseOver = () => {
    const { dropOnHover = false } = this.props;
    if (!dropOnHover) {
      return;
    }
    this.open();
  }

  handleMouseOut = () => {
    const { dropOnHover = false } = this.props;
    if (!dropOnHover) {
      return;
    }
    this.close();
  }

  handleFocus = () => {
    const { dropOnFocus = false } = this.props;
    if (!dropOnFocus) {
      return;
    }
    this.open();
  }

  handleBlur = () => {
    const { dropOnFocus= false } = this.props;
    if (!dropOnFocus) {
      return;
    }
    this.close();
  }

  private open() {
    if (this.isOpened && this.closingTimer) {
      window.clearTimeout(this.closingTimer);
      this.closingTimer = null;
    } else if (!this.isOpened && !this.openingTimer) {
      this.openingTimer = window.setTimeout(
        () => {
          this.openingTimer = null;
          const newOpenState = this.openState === 'closed' ? 'hovered' : this.openState;
          this.fireOpenStateChange(newOpenState);
        },
        OPEN_DELAY,
      );
    }
  }

  private close() {
    if (!this.isOpened && this.openingTimer) {
      window.clearTimeout(this.openingTimer);
      this.openingTimer = null;
    } else if (this.isOpened && !this.closingTimer) {
      this.closingTimer = window.setTimeout(
        () => {
          this.closingTimer = null;
          const newOpenState = this.openState === 'hovered' ? 'closed' : this.openState;
          this.fireOpenStateChange(newOpenState);
        },
        CLOSE_DELAY,
      );
    }
  }

  fireOpenStateChange(newOpenState: DropdownOpenState) {
    const { onOpenStateChange } = this.props;
    if (newOpenState !== this.openState && onOpenStateChange) {
      onOpenStateChange(newOpenState);
    }
  }

  render() {
    const { className, isMobile, dropOnHover = false, style, children } = this.props;
    const { dropdownContext } = this.state;
    return (
      <div
        ref={this.ref}
        className={classnames('Dropdown', className, {
          mobile: isMobile,
          'drop-on-hover': dropOnHover,
        })}
        style={style}
      >
        <DropdownContext.Provider value={dropdownContext}>
          {children}
        </DropdownContext.Provider>
      </div>
    );
  }
}

const StyledDropdown = styled(DropdownPure)`
  position: relative;
  display: inline-block;

  &.mobile {
    display: block;
  }


  ${DropdownCoverStyled} {
    .inlineWrapper {
      display: inline-flex;
      flex-direction: row;
      flex: 0 0 auto;
      cursor: pointer;
    }
    .cover {
      flex: 1 1 0px;
    }
    .icon {
      flex: 0 0 auto;
      padding-left: 1em;
    }
  }
  &.mobile ${DropdownCoverStyled} {
    width: 100%;
    text-align: center;
    display: flex;
  }
  &.drop-on-hover ${DropdownCoverStyled}{
    cursor: default;
  }


  ${DropdownContentStyled} {
    position: absolute;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.26s, max-height 0.26s;

    &.left {
      left: 0
    }
    &.right {
      right: 0
    }
    &.center {
      left: 50%;
      transform: scaleY(0) translateX(-50%);
    }
    &.justify {
      left: 0;
      right: 0;
    }
    &.opened {
      transform: scaleY(1);
    }
    &.opened.center {
      transform: scaleY(1) translateX(-50%);
    }
  }
  &.mobile ${DropdownContentStyled} {
    position: relative;
    max-height: 0;
    width: 100%;

    &.opened {
      max-height: 100%;
    }
  }
`;

export class Dropdown extends React.Component<DropdownProps> {
  static Cover = DropdownCover;
  static Content = DropdownContent;

  render() {
    return <StyledDropdown {...this.props}>{this.props.children}</StyledDropdown>;
  }
}
