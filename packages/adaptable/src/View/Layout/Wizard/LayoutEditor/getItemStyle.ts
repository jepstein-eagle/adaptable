import { CSSProperties } from 'react';
import { AdaptableColumn, Layout } from '../../../../types';
import { LayoutEditorDroppableIds } from './droppableIds';

export type LayoutGetItemStyle = (
  column: AdaptableColumn,
  layout: Layout,
  dragSource: LayoutEditorDroppableIds,
  { isDragging, draggingOver }: { isDragging: boolean; draggingOver?: string },
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
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // padding: 'var(--ab-space-2)',

    // change background colour if dragging
    background: isDragging ? 'var(--ab-color-accent)' : '',
    color: isDragging ? 'var(--ab-color-text-on-secondary)' : '',
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
          layout.ColumnSorts.filter(sort => sort.Column === column.ColumnId)[0]))
    ) {
      result.background = '';
      result.color = '';
    }

    //dragging things on the first column, from any other column
    if (
      dragSource != LayoutEditorDroppableIds.ColumnList &&
      draggingOver === LayoutEditorDroppableIds.ColumnList
    ) {
      result.background = '';
      result.color = '';
    }
  }

  return result;
};
