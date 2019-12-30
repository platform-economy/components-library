import * as React from 'react';
import styled from 'styled-components';

export type GridWrapperProps = {
  columns: 1 | 2 | 3 | 4 | 6 ;
  children: React.ReactNode;
  lastChildJustified?:boolean;
};

export type GridGrowProps = {
  columns: 1 | 2 | 3 | 4 | 6 ;
  children: React.ReactNode;
  colspan?: number
};

export const columnPercentage = (columns?: number) =>  {
  return !columns || columns > 6 || columns <= 1
  ? 100
  : (100 - ((columns - 1) * 2)) / columns;
};

export const growCounter = (columns:number, colspan:number) => {
  return colspan
  ? columnPercentage(columns) * colspan + ((colspan - 1) * 2)
  : columnPercentage(columns);
};

const GridContainer = styled.div<GridWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div{
    box-sizing: border-box;
    flex-basis: ${props => `${columnPercentage(props.columns)}%` };
    margin-bottom: 14px;
  }

  & > :first-child{
    margin-left: 0;
  }

  & > :last-child{
    margin-right: ${props => !props.lastChildJustified && 'auto'};
    margin-left: ${props => !props.lastChildJustified && '2%'};
  }
`;

export const GridGrow = styled.div<GridGrowProps>`
  &&{
    justify-content: space-between;
    flex-basis: ${props => props.colspan && props.columns ?
    `${growCounter(props.columns, props.colspan)}%` :
    `${columnPercentage(props.columns)}%` };
  }
`;

export class GridWrapper extends React.Component<GridWrapperProps> {
  render() {
    return (
      <GridContainer {...this.props}>
        {this.props.children}
      </GridContainer>
    );
  }
}
