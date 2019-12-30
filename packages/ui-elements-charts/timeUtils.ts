import * as d3 from 'd3';

export function timeTicks(date: Date) {
  const timeScales = new Map<d3.CountableTimeInterval, (date:Date) => string>();
  timeScales.set(d3.timeSecond, d3.timeFormat('.%L'));
  timeScales.set(d3.timeMinute, d3.timeFormat(':%S'));
  timeScales.set(d3.timeHour, d3.timeFormat('%I:%M %p'));
  timeScales.set(d3.timeDay, d3.timeFormat('%I:%M %p'));
  timeScales.set(d3.timeMonth, d3.timeFormat('%a %d'));
  timeScales.set(d3.timeYear, d3.timeFormat('%b %d'));

  for (const [scaleMethod, formatter] of timeScales.entries()) {
    if (scaleMethod(date) < date) {
      return formatter(date);
    }
  }
  return d3.timeFormat('%Y')(date);
}
