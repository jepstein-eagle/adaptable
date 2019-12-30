import * as React from 'react';
import { useRef } from 'react';

/**
 * This is useful because AgGrid behaves wierdly and needs
 * height management for the wrapper element of the grid.
 */

const AbsoluteFlexContainer = ({
  childProps,
  ...props
}: { childProps?: React.HTMLProps<HTMLElement> } & React.HTMLProps<HTMLElement>) => {
  const domRef = useRef<HTMLDivElement>(null);
  const childDOMRef = useRef<HTMLDivElement>(null);

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
          height: '100%',
          ...childProps.style,
        }}
        data-ab-name="ab__aggrid-container"
      >
        {props.children}
      </div>
    </div>
  );
};

export default AbsoluteFlexContainer;
