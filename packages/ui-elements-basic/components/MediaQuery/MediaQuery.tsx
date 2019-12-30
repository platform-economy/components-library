import * as React from 'react';
import _ from 'lodash';

export type MQDefaultSizes = 'S' | 'M' | 'L' | 'XL' ;

export const sizesMapDefault = new Map<MQDefaultSizes, number>();

export type MQProps<Sizes> = {
  min?: Sizes,
  max?: Sizes,
  children: React.ReactNode,
};

export type MQState = {
  windowWidth: number,
};

sizesMapDefault.set('S', 414);
sizesMapDefault.set('M', 768);
sizesMapDefault.set('L', 960);
sizesMapDefault.set('XL', 1440);

export function createMediaQuery<Sizes = MQDefaultSizes>(sizesMap: Map<Sizes, number>) {
  return class MediaQuery extends React.Component<MQProps<Sizes>, MQState> {
    constructor(props:MQProps<Sizes>) {
      super(props);
      this.state = {
        windowWidth: 0,
      };
    }

    shouldComponentRender = (props:MQProps<Sizes>, state:MQState) => {
      const min = props.min ? sizesMap.get(props.min) : undefined;
      const max = props.max ? sizesMap.get(props.max) : undefined;
      if (min && min > 0 && state.windowWidth <= min) {
        return false;
      }
      if (max && max > 0 && state.windowWidth > max) {
        return false;
      }
      return true;
    }

    updateWindowSize = () => this.setState({ windowWidth: window.innerWidth });

    displayConditionsChanged = (oldProps:MQProps<Sizes>, newProps:MQProps<Sizes>) => {
      if (!_.isEqual(oldProps, newProps)) {
        return true;
      }
      return false;
    }

    windowDimensionsChanged = (oldState:MQState, newState:MQState) => {
      if (!_.isEqual(oldState, newState)
        && this.shouldComponentRender(this.props, this.state)
          !== this.shouldComponentRender(this.props, newState)) {
        return true;
      }
      return false;
    }

    shouldComponentUpdate = (nextProps:MQProps<Sizes>, nextState:MQState) => {
      if (this.displayConditionsChanged(this.props, nextProps)
        || this.windowDimensionsChanged(this.state, nextState)) {
        return true;
      }
      return false;
    }

    componentDidMount = () => {
      this.updateWindowSize();
      window.addEventListener('resize', this.updateWindowSize);
    }

    componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowSize);

    render() {
      return (
        this.shouldComponentRender(this.props, this.state) && this.props.children
      );
    }
  };
}
