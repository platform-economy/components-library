export const makeEnsureNumberRange = (min: number, max: number) => (value: number) => {
  let result = value;
  result = result > max ? max : result;
  result = result < min ? min : result;
  return result;
};

export const hexToRGB = (hexValue: string): number[] => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const hex = hexValue.toLowerCase();
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hexExpanded = hex.replace(shorthandRegex, (m, r, g, b) => `${r}${r}${g}${g}${b}${b}`);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexExpanded);

  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : [];
};

export const rgbToHex = (rgb: number[]) => rgb.map((x: number) => {
  const val = makeEnsureNumberRange(0, 255)(x);
  const hex = val.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}).join('');

export const makeColorDiff = (ref: string, sample: string) => (sourceColor: string): string => {
  const diffChannels = hexToRGB(ref).map(
    (color: number, i: number) => color - hexToRGB(sample)[i],
  );

  const sourceChannels = hexToRGB(sourceColor);

  const hex = rgbToHex([
    sourceChannels[0] - diffChannels[0],
    sourceChannels[1] - diffChannels[1],
    sourceChannels[2] - diffChannels[2],
  ]);

  return `#${hex}`.toLowerCase();
};

export const expandHex = (color: string) => {
  let expandedColor;
  if (color.length === 3) {
    expandedColor = color.split('').map(el => `${el}${el}`).join('');
    return expandedColor;
  } return color;
};

export const hexColorsAverage = (start: string, end: string) => {
  const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/g;
  if (!start.match(regex) || !end.match(regex)) {
    return;
  }
  let startClean = start.replace(/#/g, '').toLowerCase();
  let endClean = end.replace(/#/g, '').toLowerCase();
  startClean = expandHex(startClean);
  endClean = expandHex(endClean);
  const rgb1 = startClean.match(/.{1,2}/g) || ['00', '00', '00'];
  const rgb2 = endClean.match(/.{1,2}/g) || ['00', '00', '00'];
  const channels1 = rgb1.map(el => parseInt(el, 16));
  const channels2 = rgb2.map(el => parseInt(el, 16));
  const channelsAverage: number[] = [];
  channels1.forEach((num, i) => channelsAverage.push(Math.round((num + channels2[i]) / 2)));
  const hexAverage = ['#'];
  channelsAverage.forEach((el) => {
    el.toString(16).length === 1
    ? hexAverage.push(`0${el.toString(16)}`)
    : hexAverage.push(el.toString(16));
  });
  return hexAverage.join('');
};

export const populatePalette = (array: string[], index: number) => {
  if (index > array.length - 1) {
    const startIndex = index % array.length;
    const endIndex =  index % array.length + 1;
    const newArray = [...array, hexColorsAverage(array[startIndex], array[endIndex])];
    return newArray;
  }return array;
};
