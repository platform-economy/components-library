import React, { ReactNode, Children } from 'react';
import styled from 'styled-components';
import { HorizontalRule } from '@relayr/ui-elements-layout';

const StyledHorizontalDivider = styled.div`
  display: flex;

  & > hr {
    flex: 1 1 auto;
    align-self: center;
    height: 0;
    margin: 0 20px;
  }

  & > * {
    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

export type HorizontalDividerProps = {
  startingRule?: boolean;
  endingRule?: boolean;
  children?: ReactNode;
};

export const HorizontalDivider = ({
  startingRule,
  endingRule,
  children,
}: HorizontalDividerProps) => {
  const childrenCount = Children.count(children);

  const renderChildren = () => {
    if (childrenCount === 0) {
      return <HorizontalRule />;
    }

    return Children.map(children, (child, index) => (
      <>
        {child}
        {index < childrenCount - 1 && <HorizontalRule />}
      </>
    ));
  };

  return (
    <StyledHorizontalDivider>
      {childrenCount !== 0 && startingRule && <HorizontalRule />}
      {renderChildren()}
      {childrenCount !== 0 && endingRule && <HorizontalRule />}
    </StyledHorizontalDivider>
  );
};
