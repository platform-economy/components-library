import { range } from 'lodash';
import {
  assertGreaterThan,
  assertGreaterThanOrEqual,
  assertLessThanOrEqualOther,
} from '@relayr/ui-elements-core';
import { OffsetPaginationProps } from './types';

export type PageDescription = {
  caption: string;
  offset: number;
  pageIndex: number;
  isCurrent: boolean;
};

type Props = Required<OffsetPaginationProps>;

export function getPageClasses(page: PageDescription) {
  return [
    'page',
    `page-${page.pageIndex + 1}`,
    ... page.isCurrent ? ['current'] : [],
  ].join(' ');
}

export function getPages(props: Props) {
  assertGreaterThanOrEqual(props, 'offset', 0);
  assertGreaterThan(props, 'limit', 0);
  assertGreaterThanOrEqual(props, 'totalItems', 0);
  assertGreaterThanOrEqual(props, 'boundaryRange', 0);
  assertGreaterThanOrEqual(props, 'siblingRange', 0);
  assertLessThanOrEqualOther(props, 'offset', 'totalItems');

  const { limit, offset, totalItems, siblingRange, boundaryRange } = props;

  // both "start" and "end" positions are inclusive

  const currentPageIndex = Math.floor(offset / limit);
  const pagesCount = Math.ceil(totalItems / limit);

  const leftBoundaryStart = 0;
  const leftBoundaryEnd = Math.min(boundaryRange - 1, currentPageIndex - 1);
  const rightBoundaryStart = Math.max(currentPageIndex + 1, pagesCount - boundaryRange);
  const rightBoundaryEnd = pagesCount - 1;

  const leftSiblingsStart = Math.max(currentPageIndex - siblingRange, leftBoundaryEnd + 1);
  const leftSiblingsEnd = currentPageIndex - 1;
  const rightSiblingsStart = currentPageIndex + 1;
  const rightSiblingsEnd = Math.min(currentPageIndex + siblingRange, rightBoundaryStart - 1);

  const leftBoundary = createPagesRange(leftBoundaryStart, leftBoundaryEnd, limit);
  const rightBoundary = createPagesRange(rightBoundaryStart, rightBoundaryEnd, limit);
  const leftSiblings = createPagesRange(leftSiblingsStart, leftSiblingsEnd, limit);
  const rightSiblings = createPagesRange(rightSiblingsStart, rightSiblingsEnd, limit);

  const current = {
    pageIndex: currentPageIndex,
    caption: (currentPageIndex + 1).toString(),
    offset: currentPageIndex * limit,
    isCurrent: true,
  } as PageDescription;

  const leftEllipsis =
    createEllipsis(leftBoundaryEnd, leftSiblingsStart, leftSiblingsStart - 1, limit);
  const rightEllipsis =
    createEllipsis(rightSiblingsEnd, rightBoundaryStart, rightSiblingsEnd + 1, limit);

  return [
    ...leftBoundary,
    ...leftEllipsis,
    ...leftSiblings,
    current,
    ...rightSiblings,
    ...rightEllipsis,
    ...rightBoundary,
  ];
}

function createEllipsis(start: number, end: number, pageIndex: number, limit: number) {
  if (end - start > 1) {
    return [{
      pageIndex,
      caption: '...',
      offset: pageIndex * limit,
      isCurrent: false,
    }] as PageDescription[];
  }
  return [];
}

function createPagesRange(start: number, end: number, limit: number) {
  if (end < start) {
    return [];
  }
  return range(start, end + 1).map((pageIndex) => {
    return {
      pageIndex,
      caption: (pageIndex + 1).toString(),
      offset: pageIndex * limit,
      isCurrent: false,
    } as PageDescription;
  });
}
