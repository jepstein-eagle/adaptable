import * as React from 'react';
import { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react';
import batchUpdate from '../utils/batchUpdate';
import getAvailableSizeInfo, { BoundingClientRect, SizeInfo } from '../utils/getAvailableSizeInfo';
import { createPortal } from 'react-dom';

import selectParent from 'select-parent';

import useProperty from '../utils/useProperty';
import Overlay from './Overlay';
import getOverlayStyle from './getOverlayStyle';
import join from '../utils/join';
import usePrevious from '../utils/usePrevious';
import { getDocRect, getRect } from './utils';

export type ConstrainToType = ((node: HTMLElement) => HTMLElement) | string;

export const getConstrainRect = (target: HTMLElement, constrainTo?: ConstrainToType) => {
  let el: HTMLElement | null = null;
  if (typeof constrainTo === 'string') {
    el = selectParent(constrainTo, target);
  }
  if (typeof constrainTo === 'function') {
    el = constrainTo(target);
  }

  if (el && el.tagName) {
    return getRect(el);
  }

  return getDocRect();
};

export interface OverlayTriggerProps extends React.HTMLAttributes<HTMLElement> {
  opacityTransitionDuration?: string | number;
  children: React.ReactNode;
  visible?: boolean;
  showTriangle?: boolean;
  style?: CSSProperties;
  onVisibleChange?: (visible: boolean) => void;
  showEvent: 'click' | 'mousedown' | 'mouseenter' | 'focus';
  hideEvent: 'mouseleave' | 'blur';
  render: () => ReactNode;
  targetOffset?: number;
  defaultZIndex?: number;
  anchor: 'vertical' | 'horizontal';
  constrainTo?: ConstrainToType;
}

let portalElement: HTMLElement;
const ensurePortalElement = () => {
  if (!(global as any).document) {
    return;
  }
  if (portalElement) {
    return;
  }

  portalElement = document.createElement('div');

  document.body.appendChild(portalElement);
};

const OverlayTrigger = (props: OverlayTriggerProps) => {
  const {
    visible: _,
    showTriangle,
    showEvent,
    hideEvent,
    render,
    targetOffset,
    defaultZIndex,
    anchor,
    opacityTransitionDuration,
    onVisibleChange,
    constrainTo,
    ...domProps
  } = props;

  const domRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<Element>(null);

  const [visible, setVisible] = useProperty(props, 'visible', false);

  const [targetRect, setTargetRect] = useState<BoundingClientRect | null>(null);
  const [sizeInfo, setSizeInfo] = useState<SizeInfo | null>(null);
  const prevVisible = usePrevious<boolean>(visible, false);

  ensurePortalElement();

  useEffect(() => {
    const target = (domRef as any).current.previousSibling;
    if (!target) {
      console.warn(
        'No OverlayTrigger target - make sure you render a child inside the OverlayTrigger, which will be the overlay target'
      );
      return;
    }
    (targetRef as any).current = target as Element;

    const onShow = () => {
      batchUpdate(() => {
        setVisible(true);

        const targetRect = (target as any).getBoundingClientRect() as BoundingClientRect;
        const sizeInfo = getAvailableSizeInfo({
          targetRect,
          constrainRect: getConstrainRect(target, constrainTo),
        });

        setTargetRect(targetRect);
        setSizeInfo(sizeInfo);
      }).commit();
    };

    const onHide = () => {
      setVisible(false);
    };

    if (props.visible === undefined) {
      target.addEventListener(showEvent, onShow);
      target.addEventListener(hideEvent, onHide);
    }

    if (props.visible && !prevVisible) {
      onShow();
    }

    return () => {
      if (props.visible === undefined) {
        target.removeEventListener(showEvent, onShow);
        target.removeEventListener(hideEvent, onHide);
      }
    };
  }, [props.visible, showEvent, hideEvent]);

  let overlay;

  if (targetRect) {
    let overlayStyle = getOverlayStyle({
      constrainRect: getConstrainRect(targetRef.current as HTMLElement, constrainTo),
      targetRect,
      targetOffset,
      anchor,
    });

    overlayStyle.transition = `opacity ${opacityTransitionDuration}`;
    overlayStyle.overflow = `visible`;
    overlayStyle.zIndex = defaultZIndex;

    overlayStyle = { ...overlayStyle, ...props.style };

    const position =
      anchor === 'vertical' ? sizeInfo!.verticalPosition : sizeInfo!.horizontalPosition;

    overlay = createPortal(
      <Overlay
        {...domProps}
        className={join(
          'ab-Overlay',
          `ab-Overlay--position-${position}`,
          showTriangle ? 'ab-Overlay--show-triangle' : '',
          domProps.className
        )}
        visible={visible}
        style={overlayStyle}
        anchor={anchor}
        position={position}
        getConstrainRect={() => getConstrainRect(targetRef.current as HTMLElement)}
      >
        {props.render()}
      </Overlay>,
      portalElement
    );
  }

  return (
    <>
      {props.children}
      <div
        data-name="OverlayTrigger"
        data-visible={visible}
        ref={domRef}
        style={{
          visibility: 'hidden',
          flex: 'none',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
      {overlay}
    </>
  );
};

OverlayTrigger.defaultProps = {
  showEvent: 'mouseenter',
  hideEvent: 'mouseleave',
  anchor: 'vertical',
  targetOffset: 10,
  defaultZIndex: 1000000,
  opacityTransitionDuration: '250ms',
};

export default OverlayTrigger;
