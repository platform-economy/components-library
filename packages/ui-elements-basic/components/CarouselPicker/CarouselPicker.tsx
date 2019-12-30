import * as React from 'react';
import styled from 'styled-components';
import { noop, range, debounce } from 'lodash';
import classnames from 'classnames';
import { mediaQueries } from '@relayr/ui-elements-core';
import {
  ARROW_DOWN_CODE,
  ARROW_UP_CODE,
  circularizeIndex,
  clampIndex,
} from './CarouselPicker.utils';

export type CarouselItem = {
  value: unknown;
  caption: string|React.ReactNode;
};

export type CarouselPickerProps = {
  className?: string|null;
  items: CarouselItem[];
  siblingRange?: number; // default: 3
  hasEmptyItem?: boolean; // default: false
  isCircular?: boolean; // default: false
  value?: unknown; // default: null
  topIcon?: React.ReactNode|null;
  bottomIcon?: React.ReactNode|null;
  onValueChange?: (value: unknown, e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onBlur?: (e: React.SyntheticEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
};
type CarouselPickerState = {
  touchState: {
    start: number,
    index: number,
  }|null;
};

export class CarouselPickerPure extends React.Component<CarouselPickerProps, CarouselPickerState> {
  private ref = React.createRef<HTMLDivElement>();
  private accumulatedWheelDelta: number = 0;
  private clearAccumulatedWheelDelta = () => this.accumulatedWheelDelta = 0;
  private debouncedClearAccumulatedWheelDelta = debounce(this.clearAccumulatedWheelDelta, 100);

  state: CarouselPickerState = {
    touchState: null,
  };

  // event handlers
  handlePreviousButtonClick = (e: React.SyntheticEvent) => {
    this.changeCurrentIndexBy(-1, e);
  }

  handleNextButtonClick = (e: React.SyntheticEvent) => {
    this.changeCurrentIndexBy(1, e);
  }

  handleItemClick = (index: number, e: React.SyntheticEvent) => {
    this.changeCurrentIndex(index, e);
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    const { onKeyDown } = this.propsWithDefaults;
    if (e.keyCode === ARROW_UP_CODE) {
      this.changeCurrentIndexBy(-1, e);
    }
    if (e.keyCode === ARROW_DOWN_CODE) {
      this.changeCurrentIndexBy(1, e);
    }
    onKeyDown(e);
  }

  handleMouseWheel = (e: React.WheelEvent) => {
    const { deltaY: wheelDelta, deltaMode } = e;
    if (deltaMode === 0) { // delta in pixels
      const averageHeight = this.averageHeight;

      /* istanbul ignore if */
      if (averageHeight === 0) {
        return;
      }

      this.accumulatedWheelDelta += wheelDelta;
      const delta = Math.sign(Math.trunc(this.accumulatedWheelDelta / averageHeight));
      this.accumulatedWheelDelta = this.accumulatedWheelDelta % averageHeight;
      this.changeCurrentIndexBy(delta, e);
      this.debouncedClearAccumulatedWheelDelta();
    } else { // delta in lines or pages
      const delta = Math.sign(wheelDelta);
      this.changeCurrentIndexBy(delta, e);
    }
  }

  handleTouchStart = (e: React.TouchEvent) => {
    const firstTouch = e.touches[0];
    if (firstTouch) {
      const touchState = {
        start: firstTouch.clientY,
        index: this.currentIndex,
      };
      this.setState({ touchState });
    }
  }

  handleTouchEnd = (e: React.TouchEvent) => {
    const newIndex = this.getIndexFromTouchEvent(e);
    if (newIndex != null) {
      this.changeCurrentIndex(newIndex, e);
    }
    this.setState({ touchState: null });
  }

  handleTouchMove = (e: React.TouchEvent) => {
    const newIndex = this.getIndexFromTouchEvent(e);
    if (newIndex != null) {
      this.changeCurrentIndex(newIndex, e);
    }
  }

  // getters
  get propsWithDefaults(): Required<CarouselPickerProps> {
    return {
      className: null,
      siblingRange: 3,
      hasEmptyItem: false,
      value: undefined,
      isCircular: false,
      topIcon: null,
      bottomIcon: null,
      onValueChange: noop,
      onFocus: noop,
      onBlur: noop,
      onKeyDown: noop,
      onKeyUp: noop,
      onKeyPress: noop,
      ...this.props,
    };
  }

  get items() {
    const { items, value, hasEmptyItem } = this.propsWithDefaults;
    return [
      ... (hasEmptyItem || value == null) ? [{ value: null, caption: (<span>-</span>) }] : [],
      ...items,
    ];
  }

  get currentIndex() {
    const { value } = this.propsWithDefaults;
    return this.items.findIndex(item =>
      item.value === value || (item.value == null && value == null));
  }

  private get averageHeight() {
    const { siblingRange } = this.propsWithDefaults;
    /* istanbul ignore if */
    if (!this.ref.current) {
      return 0;
    }
    const { height } = this.ref.current.getBoundingClientRect();
    const totalVisibleItems = 2 * siblingRange + 1;
    return height / totalVisibleItems;
  }

  // private methods

  // TODO: find a better way to calculate new index
  // this approach doesn't include two arrows, which increase "influence area" of central item,
  // but increases "influence area" of all items instead, causing shift
  private getIndexFromTouchEvent(e: React.TouchEvent) {
    const { touchState } = this.state;
    const touch = e.touches[0];
    if (!this.ref.current || touch == null || touchState == null) {
      return null;
    }
    const touchDelta = touch.clientY;
    const averageHeight =  this.averageHeight;
    const delta = Math.round((touchState.start - touchDelta) / averageHeight);
    return touchState.index + delta;
  }

  private changeCurrentIndex(index: number, e: React.SyntheticEvent) {
    const { onValueChange, isCircular } = this.propsWithDefaults;
    const items = this.items;
    const nextIndex = isCircular
      ? circularizeIndex(index, items.length)
      : clampIndex(index, items.length);
    if (nextIndex !== this.currentIndex) {
      const { value } = items[nextIndex];
      onValueChange(value, e);
    }
  }

  private changeCurrentIndexBy(delta: number, e: React.SyntheticEvent) {
    if (delta !== 0) {
      this.changeCurrentIndex(this.currentIndex + delta, e);
    }
  }

  private getVisibleItems() {
    const { siblingRange, isCircular } = this.propsWithDefaults;
    const items = this.items;
    const currentIndex = this.currentIndex;

    const currentItem = { ...items[currentIndex], index: currentIndex };
    const previousSiblings = range(-siblingRange, 0).map((relativeIndex) => {
      const index = isCircular
        ? circularizeIndex(currentIndex + relativeIndex, items.length)
        : currentIndex + relativeIndex;
      if (index < 0 || index >= items.length) {
        return { index: null, value: null, caption: null };
      }
      return { index, ...items[index] };
    });

    const nextSiblings = range(1, siblingRange + 1).map((relativeIndex) => {
      const index = isCircular
        ? circularizeIndex(currentIndex + relativeIndex, items.length)
        : currentIndex + relativeIndex;
      if (index < 0 || index >= items.length) {
        return { index: null, value: null, caption: null };
      }
      return { index, ...items[index] };
    });

    const canSelectPrev = isCircular || currentIndex > 0;
    const canSelectNext = isCircular || currentIndex < items.length - 1;

    return { currentItem, previousSiblings, nextSiblings, canSelectPrev, canSelectNext };
  }

  // render

  render() {
    const { className, topIcon, bottomIcon, onFocus, onBlur } = this.propsWithDefaults;
    const { onKeyUp, onKeyPress } = this.props;

    const {
      currentItem,
      previousSiblings,
      nextSiblings,
      canSelectPrev,
      canSelectNext,
    } = this.getVisibleItems();
    return (
      <div
        ref={this.ref}
        tabIndex={0}
        className={classnames('CarouselPicker', className)}
        onKeyDown={this.handleKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onWheel={this.handleMouseWheel}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {previousSiblings.map((item, index) => (
          <div
            key={`item-prev-${index}`}
            className={classnames('item', 'item-before')}
            onClick={item.index != null ? this.handleItemClick.bind(this, item.index) : null}
          >
            {item.caption}
          </div>
        ))}
        {topIcon && (
          <div
            className={classnames('nav', 'nav-previous', { disabled: !canSelectPrev })}
            onClick={this.handlePreviousButtonClick}
          >
            {topIcon}
          </div>
        )}
        <div
          key={'item-current'}
          className={classnames('item', 'item-current')}
        >
          {currentItem.caption}
        </div>
        {bottomIcon && (
          <div
            className={classnames('nav', 'nav-next', { disabled: !canSelectNext })}
            onClick={this.handleNextButtonClick}
          >
            {bottomIcon}
          </div>
        )}
        {nextSiblings.map((item, index) => (
          <div
            key={`item-next-${index}`}
            className={classnames('item', 'item-after')}
            onClick={item.index != null ? this.handleItemClick.bind(this, item.index) : null}
          >
            {item.caption}
          </div>
        ))}
      </div>
    );
  }
}

export const CarouselPicker = styled(CarouselPickerPure)`
  color: ${props => props.theme.palette.text};
  outline: 0;
  user-select: none;

  .item, .nav {
    text-align: center;
    box-sizing: content-box;
    height: 1em;
    padding: 1px 3px;
    border-width: 2px 0;
    border-style: solid;
    border-color: transparent;
  }

  .item-before, .item-after {
    color: ${props => props.theme.palette.inactive};

    &:hover {
      color: ${props => props.theme.palette.text};
    }
    @media ${mediaQueries.touch} {
        pointer-events: none;
    }
  }

  .item-current {
    font-weight: bold;
  }
  &:focus .item-current {
    border-bottom-color: ${props => props.theme.palette.active};
  }
  &:hover .item-current {
    border-bottom-color: ${props => props.theme.palette.active_hovered};
  }

  .nav.disabled {
    color: ${props => props.theme.palette.inactive};
  }
`;
