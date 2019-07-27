import * as React from 'react';
import { useEffect, useState, useRef, useLayoutEffect, HTMLProps, HTMLAttributes } from 'react';

import batchUpdate from '../utils/batchUpdate';
import usePrevious from '../utils/usePrevious';

export interface OverlayProps extends HTMLAttributes<HTMLElement> {
  visible: boolean;
}

export const useRefresh = () => {
  const [x, update] = useState(0);
  return () => {
    update(x + 1);
  };
};

const Overlay = (props: OverlayProps) => {
  const { visible, ...domProps } = props;

  const [opacity, setOpacity] = useState<number>(0);
  const transitionInProgressRef = useRef<boolean>(false);

  const prevVisible = usePrevious(visible, visible);
  const prevOpacity = usePrevious(opacity, opacity);

  const refresh = useRefresh();

  useEffect(() => {
    batchUpdate(() => {
      transitionInProgressRef.current = true;

      setOpacity(props.visible ? 1 : 0);
    }).commit();
  }, [visible]);

  if (prevVisible && !visible) {
    transitionInProgressRef.current = true;
  }

  const onTransitionEnd = () => {
    transitionInProgressRef.current = false;
    refresh();
  };

  const renderTime = Date.now();
  const renderTimeRef = useRef<number>(renderTime);
  renderTimeRef.current = renderTime;

  useEffect(() => {
    let timeoutId: number;
    if (prevOpacity && !opacity) {
      timeoutId = setTimeout(() => {
        if (renderTimeRef.current != renderTime) {
          //we had other renders, so dont do anything - bail out

          return;
        }
        if (!visible) {
          onTransitionEnd();
        }
      }, 1500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [opacity, prevOpacity, renderTime]);

  const transitionInProgress = transitionInProgressRef.current;

  if (!visible && !transitionInProgress) {
    return null;
  }

  return (
    <div {...domProps} style={{ ...props.style, opacity }} onTransitionEnd={onTransitionEnd} />
  );
};

export default Overlay;
