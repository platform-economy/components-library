import { lightenOne, darkenOne } from '../methods';

describe('ui-elements-themes', () => {
  describe('_common/methods', () => {
    describe('lightenOne', () => {
      it('should lighten up color', () => {
        const result = lightenOne('#000');
        expect(result).toBe('#312808');
      });
    });
    describe('darkenOne', () => {
      it('should darken down color', () => {
        const result = darkenOne('#fff');
        expect(result).toBe('#f8d7c2');
      });
    });
  });
});
