import styled from 'styled-components';

export type Direction = 'horizontal' | 'vertical';

export type DrawerProps = {
  direction: Direction;
  size: string | number;
  open?: boolean;
};

export const getDefaultUnit = (value: string | number, unit: string = 'px'): string => (
  typeof value === 'number' ? `${value}${unit}` : value
);

const makeGetDimenion = (destDirection: Direction) =>
  (props: DrawerProps): string => {
    const { open, direction } = props;

    if (direction !== destDirection) {
      return '100%';
    }

    let { size } = props;
    size = getDefaultUnit(size);

    return open ? size : '0px';
  };

export const getWidth = makeGetDimenion('horizontal');
export const getHeight = makeGetDimenion('vertical');

export const Drawer = styled.div<DrawerProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: ${props => getWidth(props)};
  height: ${props => getHeight(props)};
  transition-property: width, height;
  transition-duration: .2s;
  transition-timing-function: ease-out;
  background-color: ${props => props.theme.palette.surface};
  overflow: hidden ${props => props.direction === 'horizontal' ? 'auto' : 'hidden'};
`;
