import React, { Component, Fragment, Children } from 'react';
import styled from 'styled-components';
import { isUndefined } from 'lodash';
import classnames from 'classnames';

import { RenderContentWrapper } from './RenderContentWrapper';
import { TableCell } from './TableCell';

const StyledTableExpandableRow = styled.tr`
  &.expanded {
    background-color: ${({ theme }) => theme.palette.midground};
  }

  tbody > &.clickable:hover {
    background-color: ${({ theme }) => theme.palette.midground};
    cursor: pointer;
  }
`;

const StyledTableContentRow = styled.tr`
  @keyframes paddingTransition {
    from { padding: 0 30px; }
    to { padding: 18px 30px; }
  }

  overflow: hidden;
  height: min-content;

  ${TableCell} {
    animation: paddingTransition .5s;
  }

  &&.collapsed {
    border-top: none;

    ${TableCell} {
      padding: 0 30px;
    }
  }
`;

const StyledContentContainer = styled.div`
  transition: height .5s;
  overflow: hidden;
`;

export type TableExpandableRowProps = {
  expanded?: boolean;
  renderContent: (data: unknown) => React.ReactNode;
  renderData?: unknown;
  onClick?: (e: React.SyntheticEvent) => void;
};

export type TableExpandableRowState = {
  alreadyExpanded: boolean;
  contentHeight: number;
};

export class TableExpandableRow extends Component<
  TableExpandableRowProps, TableExpandableRowState
  > {
  constructor(props: TableExpandableRowProps) {
    super(props);

    this.state = {
      alreadyExpanded: !!props.expanded,
      contentHeight: 0,
    };
  }

  setHeight = (height: number) => {
    if (height !== this.state.contentHeight) {
      this.setState({
        contentHeight: height,
      });
    }
  }

  renderContent = () => {
    const { expanded, renderContent, renderData, children } = this.props;

    return (
      <StyledTableContentRow className={classnames({ collapsed: !expanded })}>
        <TableCell colSpan={Children.count(children)}>
          <StyledContentContainer
            style={{ height: expanded ? this.state.contentHeight : 0 }}
          >
            <RenderContentWrapper getHeight={this.setHeight}>
              {renderContent(renderData)}
            </RenderContentWrapper>
          </StyledContentContainer>
        </TableCell>
      </StyledTableContentRow>
    );
  }

  static getDerivedStateFromProps(props: TableExpandableRowProps, state: TableExpandableRowState) {
    if (!state.alreadyExpanded && props.expanded) {
      return { alreadyExpanded: true };
    }

    return null;
  }

  render() {
    const { children, expanded, onClick } = this.props;
    const { alreadyExpanded } = this.state;

    return (
      <Fragment>
        <StyledTableExpandableRow
          className={classnames({ clickable: !isUndefined(onClick), expanded: !!expanded })}
          onClick={onClick}
        >
          {children}
        </StyledTableExpandableRow>
        {alreadyExpanded && this.renderContent()}
      </Fragment>
    );
  }
}
