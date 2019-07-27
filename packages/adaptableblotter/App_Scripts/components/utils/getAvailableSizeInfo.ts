export interface PositionInfoParam {
  targetRect: BoundingClientRect;
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

const getAvailableSizeInfo = ({ targetRect, maxSizeOffset }: PositionInfoParam): SizeInfo => {
  let maxHeight;
  let maxWidth;

  const bottom = Math.round(
    ((global as unknown) as ({ innerHeight: number })).innerHeight - targetRect.bottom
  );
  const right = Math.round(
    ((global as unknown) as ({ innerWidth: number })).innerWidth - targetRect.right
  );

  let horizontalPosition: 'left' | 'right' = 'right';
  let verticalPosition: 'top' | 'bottom' = 'bottom';

  if (targetRect.left > right) {
    horizontalPosition = 'left';
    maxWidth = Math.round(targetRect.left);
  } else {
    maxWidth = right;
  }
  if (targetRect.top > bottom) {
    verticalPosition = 'top';
    maxHeight = Math.round(targetRect.top);
  } else {
    maxHeight = bottom;
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
