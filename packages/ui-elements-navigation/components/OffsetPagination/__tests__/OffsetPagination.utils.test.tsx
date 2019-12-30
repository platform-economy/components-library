import * as React from 'react';
import * as _ from 'lodash';
import * as utils from '../OffsetPagination.utils';
import { OffsetPaginationProps } from '../types';

const createProps = (props: Partial<OffsetPaginationProps>): Required<OffsetPaginationProps> => ({
  className: '',
  offset: 0,
  limit: 10,
  totalItems: 100,
  onChange: _.noop,
  boundaryRange: 1,
  siblingRange: 3,
  showFirstAndLastNav: true,
  previousNavIcon: (<div/>),
  nextNavIcon: (<div/>),
  firstNavIcon: (<div/>),
  lastNavIcon: (<div/>),
  ...props,
});

describe('ui-elements-navigation', () => {
  describe('Components', () => {
    describe('OffsetPagination utils', () => {
      describe('getPages', () => {
        type TestCase = {
          name: string,
          props: Partial<OffsetPaginationProps>,
          pages: utils.PageDescription[],
        };

        const TEST_CASES: TestCase[] = [
          {
            name: 'page 1 of 7',
            props: { offset: 0, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: true  },
              { caption: '2',   pageIndex: 1, offset: 10, isCurrent: false },
              { caption: '...', pageIndex: 2, offset: 20, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
            ],
          },
          {
            name: 'page 2 of 7',
            props: { offset: 10, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '2',   pageIndex: 1, offset: 10, isCurrent: true  },
              { caption: '3',   pageIndex: 2, offset: 20, isCurrent: false },
              { caption: '...', pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
            ],
          },
          {
            name: 'page 3 of 7',
            props: { offset: 20, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '2',   pageIndex: 1, offset: 10, isCurrent: false },
              { caption: '3',   pageIndex: 2, offset: 20, isCurrent: true  },
              { caption: '4',   pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '...', pageIndex: 4, offset: 40, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
            ],
          },
          {
            name: 'page 4 of 7',
            props: { offset: 30, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '...', pageIndex: 1, offset: 10, isCurrent: false },
              { caption: '3',   pageIndex: 2, offset: 20, isCurrent: false },
              { caption: '4',   pageIndex: 3, offset: 30, isCurrent: true  },
              { caption: '5',   pageIndex: 4, offset: 40, isCurrent: false },
              { caption: '...', pageIndex: 5, offset: 50, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
            ],
          },
          {
            name: 'page 5 of 7',
            props: { offset: 40, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '...', pageIndex: 2, offset: 20, isCurrent: false },
              { caption: '4',   pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '5',   pageIndex: 4, offset: 40, isCurrent: true  },
              { caption: '6',   pageIndex: 5, offset: 50, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
            ],
          },
          {
            name: 'page 6 of 7',
            props: { offset: 50, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '...', pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '5',   pageIndex: 4, offset: 40, isCurrent: false },
              { caption: '6',   pageIndex: 5, offset: 50, isCurrent: true  },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
            ],
          },
          {
            name: 'page 7 of 7',
            props: { offset: 60, limit: 10, totalItems: 70, siblingRange: 1, boundaryRange: 1 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '...', pageIndex: 4, offset: 40, isCurrent: false },
              { caption: '6',   pageIndex: 5, offset: 50, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: true  },
            ],
          },
          {
            name: 'boundaryRange=2 (siblingsRange=0)',
            props: { offset: 40, limit: 10, totalItems: 90, siblingRange: 0, boundaryRange: 2 },
            pages: [
              { caption: '1',   pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '2',   pageIndex: 1, offset: 10, isCurrent: false },
              { caption: '...', pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '5',   pageIndex: 4, offset: 40, isCurrent: true  },
              { caption: '...', pageIndex: 5, offset: 50, isCurrent: false },
              { caption: '8',   pageIndex: 7, offset: 70, isCurrent: false },
              { caption: '9',   pageIndex: 8, offset: 80, isCurrent: false },
            ],
          },
          {
            name: 'siblingsRange=2 (boundaryRange=0)',
            props: { offset: 40, limit: 10, totalItems: 90, siblingRange: 2, boundaryRange: 0 },
            pages: [
              { caption: '...', pageIndex: 1, offset: 10, isCurrent: false },
              { caption: '3',   pageIndex: 2, offset: 20, isCurrent: false },
              { caption: '4',   pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '5',   pageIndex: 4, offset: 40, isCurrent: true  },
              { caption: '6',   pageIndex: 5, offset: 50, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
              { caption: '...', pageIndex: 7, offset: 70, isCurrent: false },
            ],
          },
          {
            name: 'siblingsRange=3 (boundaryRange=0)',
            props: { offset: 40, limit: 10, totalItems: 90, siblingRange: 3, boundaryRange: 0 },
            pages: [
              { caption: '...', pageIndex: 0, offset: 0,  isCurrent: false },
              { caption: '2',   pageIndex: 1, offset: 10, isCurrent: false },
              { caption: '3',   pageIndex: 2, offset: 20, isCurrent: false },
              { caption: '4',   pageIndex: 3, offset: 30, isCurrent: false },
              { caption: '5',   pageIndex: 4, offset: 40, isCurrent: true  },
              { caption: '6',   pageIndex: 5, offset: 50, isCurrent: false },
              { caption: '7',   pageIndex: 6, offset: 60, isCurrent: false },
              { caption: '8',   pageIndex: 7, offset: 70, isCurrent: false },
              { caption: '...', pageIndex: 8, offset: 80, isCurrent: false },
            ],
          },
          {
            name: 'no items',
            props: { offset: 0, limit: 10, totalItems: 0, siblingRange: 0, boundaryRange: 0 },
            pages: [
              { caption: '1', pageIndex: 0, offset: 0,  isCurrent: true },
            ],
          },
          {
            name: 'offset equals totalItems',
            props: { offset: 20, limit: 10, totalItems: 20, siblingRange: 0, boundaryRange: 0 },
            pages: [
              { caption: '...', pageIndex: 1, offset: 10,  isCurrent: false },
              { caption: '3', pageIndex: 2, offset: 20,  isCurrent: true },
            ],
          },
        ];

        TEST_CASES.forEach((testCase) => {
          it(`should return proper pages for test case "${testCase.name}"`, () => {
            const { props, pages: expectedPages } = testCase;
            const pages = utils.getPages(createProps(props));
            expect(pages).toEqual(expectedPages);
          });
        });

        it('should handle negative "offset"', () => {
          const props = createProps({ offset: -1 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid offset/);
        });

        it('should handle negative "limit"', () => {
          const props = createProps({ limit: -1 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid limit/);
        });

        it('should handle zero "limit"', () => {
          const props = createProps({ limit: 0 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid limit/);
        });

        it('should handle negative "totalItems"', () => {
          const props = createProps({ totalItems: -1 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid totalItems/);
        });

        it('should handle negative "boundaryRange"', () => {
          const props = createProps({ boundaryRange: -1 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid boundaryRange/);
        });

        it('should handle negative "siblingRange"', () => {
          const props = createProps({ siblingRange: -1 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid siblingRange/);
        });

        it('should handle "offset" greater than "totalItems"', () => {
          const props = createProps({ offset: 11, totalItems: 10 });
          expect(() => utils.getPages(props)).toThrowError(/Invalid offset/);
        });
      });
      describe('getPageClasses', () => {
        it('should return proper classes', () => {
          const classes = utils.getPageClasses({
            caption: '1',
            pageIndex: 0,
            offset: 0,
            isCurrent: false,
          });
          expect(classes).toBe('page page-1');
        });
        it('should return proper classes for current page', () => {
          const classes = utils.getPageClasses({
            caption: '2',
            pageIndex: 1,
            offset: 10,
            isCurrent: true,
          });
          expect(classes).toBe('page page-2 current');
        });
      });
    });
  });
});
