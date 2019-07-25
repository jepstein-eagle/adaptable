import * as React from 'react';

import ResizeObserverPoly from 'resize-observer-polyfill';

const RO = (global as any).ResizeObserver || ResizeObserverPoly;

export interface NotifyResizeProps {
  onResize: (size: { width: number; height: number }) => void;
}
const NotifyResize = (props: NotifyResizeProps) => {
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ro = new RO((entries: any) => {
      const entry = entries[0];

      if (entry) {
        const { width, height } = entry.contentRect;

        props.onResize({ width, height });
      }
    });

    ro.observe(domRef.current);

    return () => {
      ro.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        visibility: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default NotifyResize;
