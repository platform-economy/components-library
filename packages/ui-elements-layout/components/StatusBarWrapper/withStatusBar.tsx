import styledComponents from 'styled-components';

const mappedColors:string[] = ['positive', 'negative', 'warning', 'active'];

export type statusBarSide = {
  side: 'top' | 'right' | 'left' | 'bottom',
};

export const withStatusBar = ({ side }:statusBarSide) =>
  <P extends {}>(component: React.ComponentType<P>) => {
    const StatusBarWrapper = styledComponents(component) <{ color: string }>`
      transition: border-color .4s ease;
      border-${side}: 5px solid ${props => (
        ~mappedColors.indexOf(props.color)
        ? props.theme.palette[props.color]
        : props.color
      )};
`;
    return StatusBarWrapper as React.ComponentType<P & {color:string}>;
  };
