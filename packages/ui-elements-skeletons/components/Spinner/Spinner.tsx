import styled, { keyframes } from 'styled-components';

export type SpinnerProps = {
  size?: string | number;
};

export const sizeCounter = (size?:number | string) => {
  if (size && typeof size === 'number') {
    return `${size}px`;
  }  if (size && typeof size === 'string') {
    const num = parseFloat(size);
    const unit = (size.match(/px|em/) || 'px');
    const output = (isNaN(num)) ? '' : `${num}${unit}`;
    return output;
  } return '1em';
};

export const borderSizeCounter = (size?:number | string) => {
  if (size && typeof size === 'number') {
    return `${size / 8}px`;
  }  if (size && typeof size === 'string') {
    const num = parseFloat(size);
    const unit = (size.match(/px|em/) || 'px');
    const output = (isNaN(num)) ? '' : `${num / 8}${unit}`;
    return output;
  } return '.2em';
};

export const spin = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
`;

export const Spinner = styled.div<SpinnerProps>`
  height: ${props => sizeCounter(props.size)};
  width: ${props => sizeCounter(props.size)};
  border-radius: 50%;
  border: ${props => borderSizeCounter(props.size)}
          solid ${props => props.theme.palette.text_inverted};
  border-top: ${props => borderSizeCounter(props.size)}
          solid ${props => props.theme.palette.active};
  animation: ${spin} 1s infinite linear;
  box-sizing: border-box;
`;
