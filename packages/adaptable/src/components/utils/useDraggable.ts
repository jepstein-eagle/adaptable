import { useRef, useCallback } from 'react';

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export default function useDraggable({
  onMove,
  onDrop,
  getBoundingRect = () => document.body.getBoundingClientRect(),
}: {
  onMove?: (event: MouseEvent) => void;
  onDrop?: (dx: number, dy: number) => void;
  getBoundingRect?: () => DOMRect;
}) {
  const startRef = useRef<{
    pageX: number;
    pageY: number;
    bounds: { left: number; right: number; top: number; bottom: number };
  }>();
  const handleRef = useRef<HTMLElement>(null);
  const targetRef = useRef<HTMLElement>(null);

  const handleRefCallback = useCallback((newNode: HTMLElement) => {
    const oldNode = handleRef.current;

    if (oldNode) {
      oldNode.removeEventListener('mousedown', handleMouseDown);
    }

    if (newNode) {
      newNode.addEventListener('mousedown', handleMouseDown);
      boundInitialPosition();
    }

    handleRef.current = newNode;
  }, []);

  const applyTransform = (dx: number, dy: number) => {
    if (!targetRef.current) return;
    targetRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const getTranslation = (event: MouseEvent) => {
    if (!startRef.current) return { dx: 0, dy: 0 };

    const { pageX, pageY, bounds } = startRef.current;

    return {
      dx: clamp(event.pageX - pageX, bounds.left, bounds.right),
      dy: clamp(event.pageY - pageY, bounds.top, bounds.bottom),
    };
  };

  const getTranslationBounds = (targetRect: DOMRect, boundingRect: DOMRect) => {
    const left = boundingRect.x - targetRect.x;
    const right = left + boundingRect.width - targetRect.width;
    const top = boundingRect.y - targetRect.y;
    const bottom = top + boundingRect.height - targetRect.height;

    return { left, right, top, bottom };
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (!targetRef.current) return;

    event.preventDefault();
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    const targetRect = targetRef.current.getBoundingClientRect();
    const boundingRect = getBoundingRect();

    startRef.current = {
      pageX: event.pageX,
      pageY: event.pageY,
      bounds: getTranslationBounds(targetRect, boundingRect),
    };
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);

    const { dx, dy } = getTranslation(event);

    applyTransform(0, 0);
    onDrop && onDrop(dx, dy);
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();

    const { dx, dy } = getTranslation(event);

    applyTransform(dx, dy);
    onMove && onMove(event);
  };

  const boundInitialPosition = () => {
    if (!targetRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const boundingRect = getBoundingRect();

    const bounds = getTranslationBounds(targetRect, boundingRect);
    const dx = clamp(0, bounds.left, bounds.right);
    const dy = clamp(0, bounds.top, bounds.bottom);

    if (onDrop && (dx !== 0 || dy !== 0)) onDrop(dx, dy);
  };

  return { handleRef: handleRefCallback, targetRef };
}
