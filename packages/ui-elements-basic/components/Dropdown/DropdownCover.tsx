import * as React from 'react';
import styled from 'styled-components';
import { DropdownContextType } from './DropdownContext';
import { withDropdownContext } from './withDropdownContext';
import classnames from 'classnames';

export type DropdownCoverProps = {
  className?: string;
  dropdownContext: DropdownContextType;
  disableClick?: boolean;
  children?: React.ReactNode;
};

class DropdownCoverPure extends React.Component<DropdownCoverProps> {
  constructor(props: DropdownCoverProps) {
    super(props);
  }

  get ref() {
    return this.props.dropdownContext
      ? this.props.dropdownContext.coverRef
      : /* istanbul ignore next */ null;
  }

  get icon() {
    const { opened, iconOpened, iconClosed } = this.props.dropdownContext;
    return opened ? iconOpened : iconClosed;
  }

  render() {
    const { className, dropdownContext, disableClick, children } = this.props;
    const { onCoverClick, onMouseOver, onMouseOut, onFocus, onBlur } = dropdownContext;
    const icon = this.icon;
    return (
      <div
        className={classnames('DropdownCover', className)}
        ref={this.ref as React.RefObject<HTMLDivElement>}
        style={{}}
        onClick={disableClick ? undefined : onCoverClick}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOut}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {icon ?
          (
            <div className="inlineWrapper">
              <div className="cover">
                {children}
              </div>
              <div className="icon">
                {icon}
              </div>
            </div>
          ) : (
            <div className="cover">
              {children}
            </div>
          )}
      </div>
    );
  }
}

export const DropdownCoverStyled = styled(DropdownCoverPure)``;

export const DropdownCover = withDropdownContext('DropdownCover')(
  DropdownCoverStyled as React.ComponentType<DropdownCoverProps>,
);
