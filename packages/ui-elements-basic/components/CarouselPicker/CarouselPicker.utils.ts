/**
 * Restricts index into range [0, length) by wrapping.
 * @param index
 * @param length
 */
export function circularizeIndex(index: number, length: number) {
  // double modulo is needed to support negative indices
  // - inner modulo range is [-length + 1, length - 1]
  // - by adding length we have [1, 2*length - 1] so always positive
  // - outer modulo will ensure range [0, length -1 ]
  // for positive number result is the same as in single modulo:
  // [0, +inf) => [0, length - 1] => [length, 2*length - 1] => [0, length - 1]
  return (index % length + length) % length;
}

/**
 * Restricts index into range [0, length) by returning nearest available value.
 * @param value
 * @param length
 */
export function clampIndex(value: number, length: number) {
  return Math.max(Math.min(value, length - 1), 0);
}

export const ARROW_UP_CODE = 38;
export const ARROW_DOWN_CODE = 40;
