import * as React from 'react';
import { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react';
import batchUpdate from '../utils/batchUpdate';
import getAvailableSizeInfo, { BoundingClientRect, SizeInfo } from '../utils/getAvailableSizeInfo';
import { createPortal } from 'react-dom';

import selectParent from '../utils/selectParent';

import useProperty from '../utils/useProperty';
import Overlay from './Overlay';
import getOverlayStyle, { OverlayHorizontalAlign } from './getOverlayStyle';
import join from '../utils/join';
import usePrevious from '../utils/usePrevious';
import { getDocRect, getRect } from './utils';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import useVendorClassName from './useVendorClassName';

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
  showEvent?: 'click' | 'mousedown' | 'mouseenter' | 'focus';
  target?: (overlayNode: HTMLElement) => HTMLElement;
  hideEvent?: 'mouseleave' | 'blur';
  hideDelay?: number;
  render: () => ReactNode;
  targetOffset?: number;
  defaultZIndex?: number;
  anchor?: 'vertical' | 'horizontal';
  alignHorizontal?: OverlayHorizontalAlign;
  constrainTo?: ConstrainToType;
}

const globalObject = typeof globalThis !== 'undefined' ? globalThis : window;

let portalElement: HTMLElement;

const ensurePortalElement = () => {
  if (!(globalObject as any).document) {
    return;
  }
  if (portalElement) {
    return;
  }

  portalElement = document.createElement('div');

  document.body.appendChild(portalElement);
};

const OverlayTrigger = React.forwardRef(
  (props: OverlayTriggerProps, ref: React.Ref<{ show: () => any; hide: () => any }>) => {
    let {
      visible: _,
      showTriangle,
      showEvent,
      hideEvent,
      render,
      targetOffset,
      defaultZIndex,
      anchor,
      hideDelay = 0,
      opacityTransitionDuration,
      onVisibleChange,
      alignHorizontal,
      constrainTo,
      target: targetProp,
      ...domProps
    } = props;

    const domRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<Element>(null);
    const overlayRef = useRef<Element>(null);

    const [visible, doSetVisible] = useProperty(props, 'visible', false);

    const hideTimeoutRef = useRef<any>(null);

    const setVisible = (visible: boolean) => {
      if (!visible) {
        hideTimeoutRef.current = setTimeout(() => {
          hideTimeoutRef.current = null;
          doSetVisible(false);
        }, hideDelay);
        return;
      }

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      doSetVisible(true);
    };

    const [targetRect, setTargetRect] = useState<BoundingClientRect | null>(null);
    const [sizeInfo, setSizeInfo] = useState<SizeInfo | null>(null);
    const prevVisible = usePrevious<boolean>(visible, false);

    ensurePortalElement();

    const onShow = () => {
      batchUpdate(() => {
        setVisible(true);

        const target = (targetRef as any).current;

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

    useEffect(() => {
      if (ref) {
        const api = {
          show: onShow,
          hide: onHide,
        };
        if (typeof ref === 'function') {
          ref(api);
        } else {
          (ref as any).current = api;
        }
      }
    }, [ref]);

    useEffect(() => {
      let target = (domRef as any).current.previousSibling;

      if (targetProp) {
        target = targetProp(target);
      }
      if (!target) {
        LoggingHelper.LogAdaptableWarning(
          'No OverlayTrigger target - make sure you render a child inside the OverlayTrigger, which will be the overlay target'
        );
        return;
      }
      (targetRef as any).current = target as Element;

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

    const vendorClassName = useVendorClassName([visible]);

    if (targetRect) {
      const overlayTarget = targetRef.current as HTMLElement;

      alignHorizontal =
        alignHorizontal ||
        (getComputedStyle(overlayTarget)
          .getPropertyValue('--ab-overlay-horizontal-align')
          .trim() as OverlayHorizontalAlign);

      let overlayStyle = getOverlayStyle({
        constrainRect: getConstrainRect(overlayTarget, constrainTo),
        targetRect,
        targetOffset,
        anchor,
        alignHorizontal,
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
          ref={node => {
            if (overlayRef.current && overlayRef.current != node) {
              overlayRef.current.removeEventListener(showEvent, onShow);
              overlayRef.current.removeEventListener(hideEvent, onHide);
            }

            overlayRef.current = node;

            if (node) {
              node.addEventListener(showEvent, onShow);
              node.addEventListener(hideEvent, onHide);
            }
          }}
          className={join(
            'ab-Overlay',
            `ab-Overlay--position-${position}`,
            showTriangle ? 'ab-Overlay--show-triangle' : '',
            vendorClassName,
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
  }
);

OverlayTrigger.defaultProps = {
  showEvent: 'mouseenter',
  hideEvent: 'mouseleave',
  anchor: 'vertical',
  targetOffset: 10,
  defaultZIndex: 1000000,
  opacityTransitionDuration: '250ms',
};

export default OverlayTrigger;
