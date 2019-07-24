import * as React from 'react';
import ArrowUp from '../icons/triangle-up';
import ArrowDown from '../icons/triangle-down';

const Arrows = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        position: 'absolute',
        background: 'var(--ab-color-white)',
        fill: 'var(--ab-cmp-dropdown__fill)',
        top: '50%',
        right: 'var(--ab-space-1)',
        transform: 'translate3d(0px, -50%, 0px)',
        cursor: 'pointer',
      }}
    >
      <ArrowUp size={24} style={{ position: 'relative', top: 8 }} />
      <ArrowDown size={24} style={{ position: 'relative', top: -8 }} />
    </div>
  );
};

export default Arrows;
