import { CSSProperties } from 'react';

export type DraggableSnapshot = {
  isDragging: boolean;
  draggingOver?: string;
};

export type DroppableSnapshot = {
  isDraggingOver: boolean;
  draggingOverWith?: string;
};

export const getListStyle = (droppableSnapshot: DroppableSnapshot): CSSProperties => {
  const style: CSSProperties = {
    width: '100%',
    height: '100%',
  };

  if (droppableSnapshot.isDraggingOver) {
    style.background = 'var(--ab-color-primary)';
  }

  return style;
};
