import React, { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * This is a component that renders an absolute child
 * and sizes the absolute child to have fixed height - the height
 * of the parent - this is done via a resize observer
 *
 * This is useful because AgGrid behaves wierdly and needs fixed
 * height for the wrapper element of the grid.
 */

const DefiniteHeight = ({
  childProps,
  ...props
}: { childProps?: React.HTMLProps<HTMLElement> } & React.HTMLProps<HTMLElement>) => {
  const domRef = useRef<HTMLDivElement>(null);
  const childDOMRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const domNode = domRef.current;
    if (!domNode) {
      return;
    }

    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const { height: newHeight } = entry.contentRect;
      if (newHeight !== height) {
        setHeight(height);
      }
    });

    if (domNode) {
      ro.observe(domNode);
    }

    // stop observing on unmount
    return () => ro.disconnect();
  }, []);

  const style = { ...props.style };
  if (!style.position) {
    style.position = 'relative';
  }

  childProps = childProps || {};

  return (
    <div {...props} style={style} ref={domRef}>
      <div
        {...childProps}
        ref={childDOMRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          width: '100%',
          height: height || '100%',
          ...childProps.style,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default DefiniteHeight;
