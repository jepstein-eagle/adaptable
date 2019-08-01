import * as React from 'react';
import { ReactNode } from 'react';

export type IconProps = { size?: number; children?: ReactNode; style?: React.CSSProperties };

const DEFAULT_SIZE = 20;
export default ({ children, size = DEFAULT_SIZE, ...props }: IconProps) => {
  size = Math.round(((size * 100) / DEFAULT_SIZE) * (DEFAULT_SIZE / 100));
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
