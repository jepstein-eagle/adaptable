import { BoundingClientRect } from '../utils/getAvailableSizeInfo';

export const getRect = (node: HTMLElement) => {
  const rect = node.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: rect.width,
    height: rect.height,
  } as BoundingClientRect;
};

export const getDocRect = (): BoundingClientRect => {
  const docRect: BoundingClientRect = {
    width: window.innerWidth,
    right: window.innerWidth,
    height: window.innerHeight,
    bottom: window.innerHeight,
    left: 0,
    top: 0,
  };

  return docRect;
};

export const getIntersection = (rect1: BoundingClientRect, rect2: BoundingClientRect) => {
  const left = Math.max(rect1.left, rect2.left);
  const top = Math.max(rect1.top, rect2.top);

  const right = Math.min(rect1.right, rect2.right);
  const bottom = Math.min(rect1.bottom, rect2.bottom);

  const width = right - left;
  const height = bottom - top;

  return {
    top,
    left,
    bottom,
    right,
    width,
    height,
  } as BoundingClientRect;
};
