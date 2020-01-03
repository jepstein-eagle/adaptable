import * as React from 'react';
import { useEffect, useState, useRef, useLayoutEffect, HTMLProps, HTMLAttributes } from 'react';

import batchUpdate from '../utils/batchUpdate';
import usePrevious from '../utils/usePrevious';
import { BoundingClientRect } from '../utils/getAvailableSizeInfo';

import { isEqual } from 'lodash';
import { getRect, getIntersection } from './utils';

export interface OverlayProps extends HTMLAttributes<HTMLElement> {
  visible: boolean;
  anchor: 'vertical' | 'horizontal';
  position: 'top' | 'bottom' | 'left' | 'right';
  getConstrainRect: () => BoundingClientRect;
}

export const useRefresh = () => {
  const [x, update] = useState(0);
  return () => {
    update(x + 1);
  };
};

const translateToValues = (x: string): string[] =>
  x
    .split('(')[1]
    .split(')')[0]
    .split(',')
    .map(s => s.trim());

const Overlay = (props: OverlayProps) => {
  const { visible, getConstrainRect, anchor, position, ...domProps } = props;

  const domRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }

    const constrainRect = getConstrainRect();

    const domNode = domRef.current!;
    const thisRect: BoundingClientRect = getRect(domNode);

    const intersection = getIntersection(constrainRect, thisRect);

    if (!isEqual(intersection, thisRect)) {
      const transform = props.style
        ? props.style.transform || 'translate3d(0px, 0px, 0px)'
        : 'translate3d(0px, 0px, 0px)';
      const horizontalDiff = Math.round(
        thisRect.left < constrainRect.left
          ? constrainRect.left - thisRect.left
          : thisRect.right > constrainRect.right
          ? constrainRect.right - thisRect.right
          : 0
      );
      const verticalDiff = Math.round(
        thisRect.top < constrainRect.top
          ? constrainRect.top - thisRect.top
          : thisRect.bottom > constrainRect.bottom
          ? constrainRect.bottom - thisRect.bottom
          : 0
      );

      const values = translateToValues(transform);
      if (horizontalDiff) {
        values[0] = `calc(${values[0]} + ${horizontalDiff}px)`;
      }
      if (verticalDiff) {
        values[1] = `calc(${values[1]} + ${verticalDiff}px)`;
      }

      domNode.style.transform = `translate3d(${values.join(', ')})`;
    }
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
    let timeoutId: any;
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
    <div
      {...domProps}
      ref={domRef}
      style={{ ...props.style, opacity }}
      onTransitionEnd={onTransitionEnd}
    />
  );
};

export default Overlay;
