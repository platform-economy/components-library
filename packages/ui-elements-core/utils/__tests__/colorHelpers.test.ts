import {
  makeColorDiff,
  makeEnsureNumberRange,
  hexToRGB,
  rgbToHex,
} from '@relayr/ui-elements-core/utils/colorHelpers';

describe('ui-elements-themes', () => {
  describe('utils/color-helpers', () => {
    describe('makeEnsureNumberRange', () => {
      it('should return given value', () => {
        const result = makeEnsureNumberRange(10, 30)(29);
        expect(result).toBe(29);
      });

      it('should return max value', () => {
        const result = makeEnsureNumberRange(10, 30)(31);
        expect(result).toBe(30);
      });

      it('should return min value', () => {
        const result = makeEnsureNumberRange(10, 30)(8);
        expect(result).toBe(10);
      });
    });

    describe('hexToRGB', () => {
      it('should return empty array on incorrect value', () => {
        expect(hexToRGB('#ererer')).toEqual([]);
        expect(hexToRGB('error')).toEqual([]);
      });

      it('should return correct values', () => {
        const hexValues = [
          '#000',
          '#FFF',
          '#c1c1c1',
        ];

        const rgbValues = [
          [0, 0, 0],
          [255, 255, 255],
          [193, 193, 193],
        ];

        hexValues.forEach((value, index) => {
          expect(hexToRGB(value)).toEqual(rgbValues[index]);
        });
      });
    });

    describe('rgbToHex', () => {
      it('should return correct values', () => {
        const hexValues = [
          '000000',
          'ffffff',
          'c1c1c1',
        ];

        const rgbValues = [
          [0, 0, 0],
          [255, 255, 255],
          [193, 193, 193],
        ];

        rgbValues.forEach((value, index) => {
          expect(rgbToHex(value)).toEqual(hexValues[index]);
        });
      });
    });

    describe('makeColorDiff', () => {

      it('should create color changer', () => {
        const colorChanger = makeColorDiff('#000000', '#eeeeee');
        expect(colorChanger).toBeDefined();
      });

      it('should change colors', () => {
        const colorChanger = makeColorDiff('#000000', '#eeeeee');
        const color = colorChanger('#000');
        expect(color).toBe('#eeeeee');

        const color2 = colorChanger('#222');
        expect(color2).toBe('#ffffff');
      });

    });
  });
});
