import { CSSProperties } from 'react';
import { AdaptableColumn, Layout } from '../../../../types';
import { LayoutEditorDroppableIds } from './droppableIds';
import { DraggableSnapshot } from './utils';

export type LayoutGetItemStyle = (
  column: AdaptableColumn,
  layout: Layout,
  dragSource: LayoutEditorDroppableIds,
  { isDragging, draggingOver }: DraggableSnapshot,
  draggableStyle: CSSProperties
) => CSSProperties;

export const getItemStyle: LayoutGetItemStyle = (
  column,
  layout,
  dragSource: LayoutEditorDroppableIds,
  snapshot,
  draggableStyle
): CSSProperties => {
  const { isDragging, draggingOver } = snapshot;
  const result: CSSProperties = {
    userSelect: 'none',

    background: isDragging ? 'var(--ab-color-secondarylight)' : '',
    color: isDragging ? 'var(--ab-color-text-on-secondarylight)' : '',

    opacity: 1,

    // styles we need to apply on draggables
    ...draggableStyle,
  };

  if (isDragging) {
    // dragging from column list to column sort list
    if (
      dragSource == LayoutEditorDroppableIds.ColumnList &&
      draggingOver === LayoutEditorDroppableIds.ColumnSortList &&
      //if col not sortable or is already in the sort order
      (!column.Sortable ||
        (layout.ColumnSorts &&
          layout.ColumnSorts.filter(sort => sort.ColumnId === column.ColumnId)[0]))
    ) {
    }

    //dragging things on the first column, from any other column
    if (
      dragSource != LayoutEditorDroppableIds.ColumnList &&
      draggingOver === LayoutEditorDroppableIds.ColumnList
    ) {
      // result.background = '';
      // result.color = '';
    }
  }

  return result;
};
