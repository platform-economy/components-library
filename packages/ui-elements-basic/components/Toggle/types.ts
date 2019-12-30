import { ButtonHTMLAttributes } from 'react';

export type MouseEventHandler = (event?: React.MouseEvent) => void;

export type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  toggled?: boolean;
  highlight?: boolean;
};
