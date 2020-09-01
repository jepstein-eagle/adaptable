import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { ColumnSort } from '../../../../PredefinedConfig/Common/ColumnSort';
import { reorder } from './reorder';
import HelpBlock from '../../../../components/HelpBlock';
import { OnDragEnd } from './ColumnList';
import { LayoutEditorDroppableIds } from './droppableIds';
import { getListStyle } from './utils';

export interface ColumnSortListProps {
  columnSorts?: ColumnSort[];
  isDropDisabled?: boolean;
  onReady?: (onDragEnd: OnDragEnd) => void;
  onColumnSortsChange: (sorts: ColumnSort[]) => void;

  getItemStyle?: (
    columnId: string,
    { isDragging, draggingOver }: { isDragging: boolean; draggingOver?: string },
    draggableStyle: CSSProperties
  ) => CSSProperties;
  renderItem: (c: ColumnSort, clear: () => void, toggleSort: () => void) => React.ReactNode;
}
export const ColumnSortList = (props: ColumnSortListProps) => {
  const columnSorts = props.columnSorts || [];

  const setColumnSorts = (columnSorts: ColumnSort[]) => {
    props.onColumnSortsChange(columnSorts);
  };
  const onDragEnd = React.useCallback<OnDragEnd>(
    result => {
      const { destination, source } = result;
      if (!destination) {
        return;
      }
      const columnDrag =
        source.droppableId === LayoutEditorDroppableIds.ColumnList &&
        destination.droppableId === LayoutEditorDroppableIds.ColumnSortList;

      const sortDrag =
        source.droppableId === LayoutEditorDroppableIds.ColumnSortList &&
        destination.droppableId === LayoutEditorDroppableIds.ColumnSortList;

      const valid = columnDrag || sortDrag;

      if (!valid) {
        return;
      }

      if (sortDrag) {
        if (destination.index === source.index) {
          return;
        }

        const newColumnSorts: ColumnSort[] = reorder(columnSorts, source.index, destination.index);

        setColumnSorts(newColumnSorts);

        if (props.onColumnSortsChange) {
          props.onColumnSortsChange(newColumnSorts);
        }

        return;
      }

      if (columnDrag) {
        if (!source.column.Sortable) {
          return;
        }

        if (columnSorts.filter(c => c.ColumnId === source.columnId)[0]) {
          return false;
        }
        const newColumnSorts: ColumnSort[] = [...columnSorts];

        newColumnSorts.splice(destination.index, 0, {
          SortOrder: 'Asc',
          ColumnId: source.columnId,
        });

        setColumnSorts(newColumnSorts);

        if (props.onColumnSortsChange) {
          props.onColumnSortsChange(newColumnSorts);
        }

        return;
      }
    },
    [columnSorts, setColumnSorts, props.onColumnSortsChange]
  );

  const toggleSort = (c: ColumnSort) => {
    setColumnSorts(
      columnSorts.map(sort => {
        if (sort.ColumnId === c.ColumnId) {
          sort = { ...sort, SortOrder: c.SortOrder === 'Asc' ? 'Desc' : 'Asc' };
        }

        return sort;
      })
    );
  };

  useEffect(() => {
    if (props.onReady) {
      props.onReady(onDragEnd);
    }
  }, [onDragEnd]);

  const renderItem = (c: ColumnSort) => {
    return props.renderItem(
      c,
      () => {
        setColumnSorts(props.columnSorts.filter(sort => sort.ColumnId !== c.ColumnId));
      },
      () => {
        toggleSort(c);
      }
    );
  };

  return (
    <Droppable
      droppableId={LayoutEditorDroppableIds.ColumnSortList}
      isDropDisabled={props.isDropDisabled}
    >
      {(provided, snapshot) => (
        <div
          className={`ab-LayoutEditor__ColumnSortList ${
            !columnSorts.length ? 'ab-LayoutEditor__ColumnSortList--empty' : ''
          }`}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot)}
        >
          {!columnSorts.length ? <HelpBlock>Drag columns to create sort order</HelpBlock> : null}
          {columnSorts.map((c: ColumnSort, index) => {
            return (
              <Draggable
                key={`${c.ColumnId}-sort`}
                draggableId={`${c.ColumnId}-sort`}
                index={index}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="ab-LayoutEditor__ColumnSortList__column"
                      style={props.getItemStyle(
                        c.ColumnId,
                        snapshot,
                        provided.draggableProps.style
                      )}
                    >
                      {renderItem(c)}
                    </div>
                  );
                }}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
