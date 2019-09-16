import * as React from 'react';
import { ReactNode } from 'react';
import join from '../utils/join';

export type IconProps = {
  size?: number;
  children?: ReactNode;
  name?: string;
  style?: React.CSSProperties;
};

const HUNDRED_PERCENT_SIZE = 24;

const DEFAULT_SIZE = 20;

export const getSize = (size: number) => Math.round(size * (DEFAULT_SIZE / HUNDRED_PERCENT_SIZE));

export default ({ children, size = DEFAULT_SIZE, name, ...props }: IconProps) => {
  size = getSize(size);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
      className={join((props as any).className, `ab-Icon ab-Icon--${name}`)}
      style={{ verticalAlign: 'middle', ...props.style }}
    >
      {children}
    </svg>
  );
};
