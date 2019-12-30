import * as React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';
import { getPages, getPageClasses, PageDescription } from './OffsetPagination.utils';
import { OffsetPaginationProps, OnChangeData } from './types';

class OffsetPaginationPure extends React.Component<OffsetPaginationProps> {
  private getProps(): Required<OffsetPaginationProps> {
    return {
      className: '',
      onChange: noop,
      boundaryRange: 1,
      siblingRange: 2,
      showFirstAndLastNav: false,
      previousNavIcon: (<React.Fragment>&lt;</React.Fragment>),
      nextNavIcon: (<React.Fragment>&gt;</React.Fragment>),
      firstNavIcon: (<React.Fragment>&lt;&lt;</React.Fragment>),
      lastNavIcon: (<React.Fragment>&gt;&gt;</React.Fragment>),
      ...this.props,
    };
  }

  private onPageClick = (page: PageDescription) => (e: React.MouseEvent) => {
    const { onChange } = this.getProps();
    if (page.isCurrent) {
      return;
    }
    const paginationData: OnChangeData = {
      newOffset: page.offset,
      newPageIndex: page.pageIndex,
    };
    onChange(paginationData, e);
  }

  private onPreviousClick = (e: React.MouseEvent) => {
    const { onChange, offset, limit } = this.getProps();
    const currentPage = Math.floor(offset / limit);
    const newPageIndex = Math.max(currentPage - 1, 0);
    const newOffset = newPageIndex * limit;
    onChange({ newOffset, newPageIndex }, e);
  }

  private onNextClick = (e: React.MouseEvent) => {
    const { onChange, offset, limit, totalItems } = this.getProps();
    const currentPage = Math.floor(offset / limit);
    const lastPage = Math.floor((totalItems - 1) / limit);
    const newPageIndex = Math.min(currentPage + 1, lastPage);
    const newOffset = newPageIndex * limit;
    onChange({ newOffset, newPageIndex }, e);
  }

  private onFirstClick = (e: React.MouseEvent) => {
    const { onChange } = this.getProps();
    const newPageIndex = 0;
    const newOffset = 0;
    onChange({ newOffset, newPageIndex }, e);
  }

  private onLastClick = (e: React.MouseEvent) => {
    const { onChange, limit, totalItems } = this.getProps();
    const newPageIndex = Math.floor((totalItems - 1) / limit);
    const newOffset = newPageIndex * limit;
    onChange({ newOffset, newPageIndex }, e);
  }

  render() {
    const props = this.getProps();
    return (
      <div className={`OffsetPagination ${props.className}`}>
        {this.renderFirstButton(props)}
        {this.renderPreviousButton(props)}
        {getPages(props).map(page => (
          <div
            key={`page-${page.pageIndex}`}
            className={getPageClasses(page)}
            onClick={this.onPageClick(page)}
          >
            {page.caption}
          </div>
        ))}
        {this.renderNextButton(props)}
        {this.renderLastButton(props)}
      </div>
    );
  }

  private renderPreviousButton(props: Required<OffsetPaginationProps>) {
    const { offset, previousNavIcon } = props;
    const className = 'nav nav-prev';
    if (offset === 0) {
      return (
        <div className={`${className} disabled`}>
          {previousNavIcon}
        </div>
      );
    }
    return (
      <div className={className} onClick={this.onPreviousClick}>
        {previousNavIcon}
      </div>
    );
  }

  private renderNextButton(props: Required<OffsetPaginationProps>) {
    const { limit, offset, totalItems, nextNavIcon } = props;
    const className = 'nav nav-next';
    if (offset + limit >= totalItems) {
      return (
        <div className={`${className} disabled`}>
          {nextNavIcon}
        </div>
      );
    }
    return (
      <div className={className} onClick={this.onNextClick}>
        {nextNavIcon}
      </div>
    );
  }

  private renderFirstButton(props: Required<OffsetPaginationProps>) {
    const { offset, firstNavIcon } = props;
    const className = 'nav nav-first';
    if (!props.showFirstAndLastNav) {
      return null;
    }
    if (offset === 0) {
      return (
        <div className={`${className} disabled`}>
          {firstNavIcon}
        </div>
      );
    }
    return (
      <div className={className} onClick={this.onFirstClick}>
        {firstNavIcon}
      </div>
    );
  }

  private renderLastButton(props: Required<OffsetPaginationProps>) {
    const { limit, offset, totalItems, lastNavIcon } = props;
    const className = 'nav nav-last';
    if (!props.showFirstAndLastNav) {
      return null;
    }
    if (offset + limit >= totalItems) {
      return (
        <div className={`${className} disabled`}>
          {lastNavIcon}
        </div>
      );
    }
    return (
      <div className={className} onClick={this.onLastClick}>
        {lastNavIcon}
      </div>
    );
  }
}

export const OffsetPagination = styled(OffsetPaginationPure)`
  display: inline-block;
  color: ${props => props.theme.palette.text};
  font-size: 14px;
  user-select: none;

  .nav, .page {
    display: inline-block;
    width: 3em;
    padding: 3px;
    cursor: pointer;
    box-sizing: border-box;
    border-top: 2px solid transparent;
  }

  .nav:hover, .page:hover {
    color: ${props => props.theme.palette.active_hovered};
  }

  .nav {
    vertical-align: middle;
  }

  .page {
    font-weight: bold;
    text-align: center;
  }

  .page.current {
    cursor: default;
    color: ${props => props.theme.palette.active};
    border-top-color: ${props => props.theme.palette.active};
  }

  .page.current:hover {
    cursor: default;
    color: ${props => props.theme.palette.active_hovered};
    border-top-color: ${props => props.theme.palette.active_hovered};
  }

  .nav-prev, .nav-first {
    text-align: left;
  }

  .nav-next, .nav-last {
    text-align: right;
  }

  .nav.disabled {
    cursor: default;
    color: ${props => props.theme.palette.inactive};
  }
`;
