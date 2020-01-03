import { getDocRect } from '../OverlayTrigger/utils';

export interface PositionInfoParam {
  targetRect: BoundingClientRect;
  constrainRect: BoundingClientRect;
  maxSizeOffset?: number;
}

export interface SizeInfo {
  maxWidth: number;
  maxHeight: number;
  horizontalPosition: 'left' | 'right';
  verticalPosition: 'top' | 'bottom';
}
export interface BoundingClientRect {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const getAvailableSizeInfo = ({
  targetRect,
  constrainRect,
  maxSizeOffset,
}: PositionInfoParam): SizeInfo => {
  let maxHeight;
  let maxWidth;

  const topAvailableSpace = Math.round(targetRect.top - constrainRect.top);
  const leftAvailableSpace = Math.round(targetRect.left - constrainRect.left);
  const bottomAvailableSpace = Math.round(constrainRect.bottom - targetRect.bottom);
  const rightAvailableSpace = Math.round(constrainRect.right - targetRect.right);

  let horizontalPosition: 'left' | 'right' = 'right';
  let verticalPosition: 'top' | 'bottom' = 'bottom';

  if (leftAvailableSpace > rightAvailableSpace) {
    horizontalPosition = 'left';
    maxWidth = Math.round(targetRect.left - constrainRect.left);
  } else {
    maxWidth = rightAvailableSpace;
  }
  if (topAvailableSpace > bottomAvailableSpace) {
    verticalPosition = 'top';
    maxHeight = Math.round(targetRect.top - constrainRect.top);
  } else {
    maxHeight = bottomAvailableSpace;
  }

  if (maxSizeOffset != null) {
    maxWidth -= maxSizeOffset;
    maxHeight -= maxSizeOffset;
  }

  return {
    horizontalPosition,
    verticalPosition,
    maxWidth,
    maxHeight,
  };
};

export default getAvailableSizeInfo;
