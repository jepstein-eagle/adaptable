import * as React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { AdaptableColumn } from '../../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout, LayoutState } from '../../../../PredefinedConfig/LayoutState';
import { AdaptableApi } from '../../../../Api/AdaptableApi';
import { Flex } from 'rebass';
import Panel from '../../../../components/Panel';
import { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { ColumnSort } from '../../../../PredefinedConfig/Common/ColumnSort';
import { reorder } from './reorder';
import HelpBlock from '../../../../components/HelpBlock';
import { OnDragEnd } from './ColumnList';
import { LayoutEditorDroppableIds } from './droppableIds';

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

const getListStyle = (isDraggingOver: boolean) => ({
  width: 300,
  height: '100%',
});

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

        if (columnSorts.filter(c => c.Column === source.columnId)[0]) {
          return false;
        }
        const newColumnSorts: ColumnSort[] = [...columnSorts];

        newColumnSorts.splice(destination.index, 0, {
          SortOrder: 'Asc',
          Column: source.columnId,
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
        if (sort.Column === c.Column) {
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
        setColumnSorts(props.columnSorts.filter(sort => sort.Column !== c.Column));
      },
      () => {
        toggleSort(c);
      }
    );
  };

  return (
    <Droppable droppableId="ColumnSortList" isDropDisabled={props.isDropDisabled}>
      {(provided, snapshot) => (
        <div
          className={`ab-ColumnSortList ${!columnSorts.length ? 'ab-ColumnSortList--empty' : ''}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {!columnSorts.length ? <HelpBlock>Drag columns to create sort order</HelpBlock> : null}
          {columnSorts.map((c: ColumnSort, index) => {
            return (
              <Draggable key={c.Column} draggableId={`${c.Column}-sort`} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="ab-ColumnSortList__column"
                      style={props.getItemStyle(c.Column, snapshot, provided.draggableProps.style)}
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
