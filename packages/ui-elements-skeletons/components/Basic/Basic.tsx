import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const pulseKeyframes = keyframes`
  0% {
    background: #aaa;
  }
  50% {
    background: #ddd;
  }
  100% {
    background: #aaa;
  }
`;

export type BasicProps = {
  /**
   * Width of component
   *
   * @default "400px"
   **/
  width?: string;
  /**
  * Height of component
  *
  * @default "400px"
  **/
  height?: string;
};

const SkeletonDiv = styled.div`
  background: #aaa;
  width: ${(props: BasicProps) => props.width || '400px'};
  height: ${(props: BasicProps) => props.height || '40px'};
  animation: 2s ${pulseKeyframes} linear infinite 0s;
`;

export class Basic extends React.Component<BasicProps> {
  render() {
    return (
      <SkeletonDiv {...this.props} />
    );
  }
}
