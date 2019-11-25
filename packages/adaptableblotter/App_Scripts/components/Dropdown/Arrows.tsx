import * as React from 'react';
import { Icon } from '../icons';

const Arrows = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        position: 'absolute',
        background: 'var(--ab-color-defaultbackground)',
        fill: 'var(--ab-cmp-dropdown__fill)',
        top: '50%',
        right: 'var(--ab-space-1)',
        transform: 'translate3d(0px, -50%, 0px)',
        cursor: 'pointer',
      }}
    >
      <Icon name="triangle-up" size={24} style={{ position: 'relative', top: 7 }} />
      <Icon name="triangle-down" size={24} style={{ position: 'relative', top: -7 }} />
    </div>
  );
};

export default Arrows;
