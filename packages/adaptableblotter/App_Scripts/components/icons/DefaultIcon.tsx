import * as React from 'react';
import { ReactNode } from 'react';

export type IconProps = { size?: number; children?: ReactNode };

export default ({ children, size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    {children}
  </svg>
);
