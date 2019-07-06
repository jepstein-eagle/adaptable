import * as React from 'react';

export default ({ children, size = 24, ...props }: { size: number; children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    {children}
  </svg>
);
