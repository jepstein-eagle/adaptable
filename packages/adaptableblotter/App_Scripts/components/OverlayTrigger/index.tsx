import * as React from 'react';
import { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react';
import batchUpdate from '../utils/batchUpdate';
import getAvailableSizeInfo, { BoundingClientRect, SizeInfo } from '../utils/getAvailableSizeInfo';
import { createPortal } from 'react-dom';

import useProperty from '../utils/useProperty';
import Overlay from './Overlay';
import getOverlayStyle from './getOverlayStyle';
import join from '../utils/join';

interface OverlayTriggerProps extends React.HTMLAttributes<HTMLElement> {
  opacityTransitionDuration?: string | number;
  children: React.ReactNode;
  visible?: boolean;
  showTriangle?: boolean;
  style?: CSSProperties;
  onVisibleChange?: (visible: boolean) => void;
  showEvent?: 'click' | 'mousedown' | 'mouseenter' | 'focus';
  hideEvent?: 'mouseleave' | 'blur';
  render: () => ReactNode;
  targetOffset?: number;
  defaultZIndex?: number;
  anchor: 'vertical' | 'horizontal';
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
    ...domProps
  } = props;

  const domRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<Element>(null);

  const [visible, setVisible] = useProperty(props, 'visible', false);

  const [targetRect, setTargetRect] = useState<BoundingClientRect | null>(null);
  const [sizeInfo, setSizeInfo] = useState<SizeInfo | null>(null);

  ensurePortalElement();

  useEffect(() => {
    const target = domRef.current.previousSibling;
    if (!target) {
      console.warn(
        'No OverlayTrigger target - make sure you render a child inside the OverlayTrigger, which will be the overlay target'
      );
      return;
    }
    targetRef.current = target as Element;

    const onShow = () => {
      batchUpdate(() => {
        setVisible(true);

        const targetRect = (target as any).getBoundingClientRect() as BoundingClientRect;
        const sizeInfo = getAvailableSizeInfo({
          targetRect,
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

    if (props.visible) {
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
      targetRect,
      targetOffset,
      anchor,
    });

    overlayStyle.transition = `opacity ${opacityTransitionDuration}`;
    overlayStyle.overflow = `auto`;
    overlayStyle.zIndex = defaultZIndex;

    overlayStyle = { ...overlayStyle, ...props.style };

    overlay = createPortal(
      <Overlay
        {...domProps}
        className={join(
          'ab-Overlay',
          `ab-Overlay--position-${
            anchor === 'vertical' ? sizeInfo.verticalPosition : sizeInfo.horizontalPosition
          }`,
          showTriangle ? 'ab-Overlay--show-triangle' : '',
          domProps.className
        )}
        visible={visible}
        style={overlayStyle}
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
  defaultZIndex: 1000,
  opacityTransitionDuration: '250ms',
};

export default OverlayTrigger;
