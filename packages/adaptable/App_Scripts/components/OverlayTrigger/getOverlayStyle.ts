import { CSSProperties } from 'react';
import getAvailableSizeInfo, { BoundingClientRect } from '../utils/getAvailableSizeInfo';

interface OverlayStyleParam {
  targetRect: BoundingClientRect;
  constrainRect: BoundingClientRect;
  maxSizeOffset?: number;

  anchor: 'vertical' | 'horizontal';
  targetOffset?: number;
}

const globalObject = typeof global !== 'undefined' ? global : window;

const getWindowSize = (): { width: number; height: number } => ({
  width: (globalObject as any).innerWidth,
  height: (globalObject as any).innerHeight,
});

const getOverlayStyle = ({
  targetRect,
  constrainRect,
  anchor,
  targetOffset,
}: OverlayStyleParam): CSSProperties => {
  const sizeInfo = getAvailableSizeInfo({ targetRect, constrainRect });
  const overlayStyle: CSSProperties = {
    maxWidth: sizeInfo.maxWidth,
    maxHeight: sizeInfo.maxHeight,
    position: 'absolute',
  };
  const offset = targetOffset || 0;
  const windowSize = getWindowSize();

  if (anchor === 'horizontal') {
    if (sizeInfo.horizontalPosition === 'left') {
      overlayStyle.right = windowSize.width - targetRect.left + offset;
      (overlayStyle as any).right -= (globalObject as any).scrollX;
    } else {
      overlayStyle.left = targetRect.right + offset;
      overlayStyle.left += (globalObject as any).scrollX;
    }
    overlayStyle.top = targetRect.top + targetRect.height / 2 + +(globalObject as any).scrollY;
    overlayStyle.transform = 'translate3d(0px, -50%, 0px)';
    delete overlayStyle.maxHeight;
  } else {
    if (sizeInfo.verticalPosition === 'top') {
      overlayStyle.bottom = windowSize.height - targetRect.top + offset;
      (overlayStyle as any).bottom -= (globalObject as any).scrollY;
    } else {
      overlayStyle.top = targetRect.bottom + offset;
      overlayStyle.top += (globalObject as any).scrollY;
    }

    overlayStyle.left = targetRect.left + targetRect.width / 2 + (globalObject as any).scrollX;
    overlayStyle.transform = 'translate3d(-50%, 0px, 0px)';
    delete overlayStyle.maxWidth;
  }

  return overlayStyle;
};

export default getOverlayStyle;
