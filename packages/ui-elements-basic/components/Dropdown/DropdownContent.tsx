import * as React from 'react';
import styled from 'styled-components';
import { DropdownContextType } from './DropdownContext';
import { withDropdownContext } from './withDropdownContext';
import classnames from 'classnames';

export type DropdownContentAlignment = 'left'|'right'|'center'|'justify';

export type DropdownContentProps = {
  className?: string;
  alignment?: DropdownContentAlignment|null;
  disableClick?: boolean;
  dropdownContext: DropdownContextType;
  children?: React.ReactNode;
};

class DropdownContentPure extends React.Component<DropdownContentProps> {
  private readonly ref: React.RefObject<HTMLDivElement>;

  constructor(props: DropdownContentProps) {
    super(props);
    this.ref = React.createRef();
  }

  private get alignmentClass(): DropdownContentAlignment {
    const { dropdownContext, alignment } = this.props;
    const { coverRef } = dropdownContext;

    if (alignment != null) {
      return alignment;
    }

    if (this.ref.current && coverRef && coverRef.current) {
      const width = this.ref.current.getBoundingClientRect().width;
      const coverLeft = coverRef.current.getBoundingClientRect().left;
      const windowWidth = window.innerWidth;
      if (coverLeft + width > windowWidth) {
        return 'right';
      }
    }
    return 'left';
  }

  render() {
    const { dropdownContext, className, disableClick, children } = this.props;
    const { onContentClick, onMouseOver, onMouseOut, onFocus, onBlur } = dropdownContext;
    return (
      <div
        ref={this.ref}
        className={classnames('DropdownContent', className, this.alignmentClass, {
          opened: dropdownContext.opened,
        })}
        onMouseDown={disableClick ? undefined : onContentClick}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOut}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </div>
    );
  }
}

export const DropdownContentStyled = styled(DropdownContentPure)``;

export const DropdownContent = withDropdownContext('DropdownContent')(
  DropdownContentStyled as React.ComponentType<DropdownContentProps>,
);
