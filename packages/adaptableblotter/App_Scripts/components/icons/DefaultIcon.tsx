import * as React from 'react';
import { ReactNode } from 'react';

export type IconProps = { size?: number; children?: ReactNode; style?: React.CSSProperties };

const HUNDRED_PERCENT_SIZE = 24;

const DEFAULT_SIZE = 20;

export const getSize = (size: number) => {
  return Math.round(size * (DEFAULT_SIZE / HUNDRED_PERCENT_SIZE));
};

export default ({ children, size = DEFAULT_SIZE, ...props }: IconProps) => {
  size = getSize(size);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
      style={{ verticalAlign: 'middle', ...props.style }}
    >
      {children}
    </svg>
  );
};
