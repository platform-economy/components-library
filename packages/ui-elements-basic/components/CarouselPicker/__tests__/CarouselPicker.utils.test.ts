import {  circularizeIndex, clampIndex } from '../CarouselPicker.utils';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('CarouselPicker.utils', () => {
      describe('.circularizeIndex', () => {
        const LENGTH = 10;
        const TEST_CASES = [
          { index: 0, expected: 0 },
          { index: 5, expected: 5 },
          { index: 9, expected: 9 },
          { index: 10, expected: 0 },
          { index: 19, expected: 9 },
          { index: 20, expected: 0 },
          { index: -1, expected: 9 },
          { index: -10, expected: 0 },
          { index: -11, expected: 9 },
          { index: -20, expected: 0 },
        ];

        TEST_CASES.forEach(({ index, expected }) => {
          it(`should return ${expected} for index ${index}`, () => {
            const actual = circularizeIndex(index, LENGTH);
            expect(actual).toBe(expected);
          });
        });
      });
      describe('.clampIndex', () => {
        const LENGTH = 10;
        const TEST_CASES = [
          { index: 0, expected: 0 },
          { index: 5, expected: 5 },
          { index: 9, expected: 9 },
          { index: 10, expected: 9 },
          { index: 19, expected: 9 },
          { index: 20, expected: 9 },
          { index: -1, expected: 0 },
          { index: -10, expected: 0 },
          { index: -11, expected: 0 },
          { index: -20, expected: 0 },
        ];

        TEST_CASES.forEach(({ index, expected }) => {
          it(`should return ${expected} for index ${index}`, () => {
            const actual = clampIndex(index, LENGTH);
            expect(actual).toBe(expected);
          });
        });
      });
    });
  });
});
