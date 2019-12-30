import { makeColorDiff } from '@relayr/ui-elements-core';
import { paletteDark } from './paletteDark';

const palette = paletteDark;

export const darkenOne = makeColorDiff(palette.active, palette.active_lowered);
export const lightenOne = makeColorDiff(palette.active, palette.active_hovered);
