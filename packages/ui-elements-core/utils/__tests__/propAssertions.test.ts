import * as assertions from '../propAssertions';

describe('ui-elements-core', () => {
  describe('utils/propAssertions', () => {
    describe('assertGreaterThan', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertGreaterThan({ a: 1, b: 2 }, 'a', 0))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertGreaterThan({ a: 1, b: 2 }, 'a', 1))
          .toThrow('Invalid a: must be greater than 1, but is 1');
      });
    });
    describe('assertGreaterThanOther', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertGreaterThanOther({ a: 1, b: 2 }, 'b', 'a'))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertGreaterThanOther({ a: 1, b: 2 }, 'a', 'b'))
          .toThrow('Invalid a: must be greater than b, but is 1');
      });
    });
    describe('assertGreaterThanOrEqual', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertGreaterThanOrEqual({ a: 1, b: 2 }, 'a', 1))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertGreaterThanOrEqual({ a: 1, b: 2 }, 'a', 2))
          .toThrow('Invalid a: must be greater than or equal 2, but is 1');
      });
    });
    describe('assertGreaterThanOrEqualOther', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertGreaterThanOrEqualOther({ a: 1, b: 1 }, 'a', 'b'))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertGreaterThanOrEqualOther({ a: 1, b: 2 }, 'a', 'b'))
          .toThrow('Invalid a: must be greater than or equal b, but is 1');
      });
    });
    describe('assertLessThan', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertLessThan({ a: 1, b: 2 }, 'a', 2))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertLessThan({ a: 1, b: 2 }, 'a', 1))
          .toThrow('Invalid a: must be less than 1, but is 1');
      });
    });
    describe('assertLessThanOther', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertLessThanOther({ a: 1, b: 2 }, 'a', 'b'))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertLessThanOther({ a: 1, b: 2 }, 'b', 'a'))
          .toThrow('Invalid b: must be less than a, but is 2');
      });
    });
    describe('assertLessThanOrEqual', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertLessThanOrEqual({ a: 1, b: 2 }, 'a', 1))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertLessThanOrEqual({ a: 1, b: 2 }, 'a', 0))
          .toThrow('Invalid a: must be less than or equal 0, but is 1');
      });
    });
    describe('assertLessThanOrEqualOther', () => {
      it('should pass valid value', () => {
        expect(() => assertions.assertLessThanOrEqualOther({ a: 1, b: 1 }, 'b', 'a'))
          .not.toThrow();
      });
      it('should throw on invalid value', () => {
        expect(() => assertions.assertLessThanOrEqualOther({ a: 1, b: 2 }, 'b', 'a'))
          .toThrow('Invalid b: must be less than or equal a, but is 2');
      });
    });
  });
});
