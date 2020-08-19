import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { ColumnSort } from '../../../../PredefinedConfig/Common/ColumnSort';
import { reorder } from './reorder';
import HelpBlock from '../../../../components/HelpBlock';
import { OnDragEnd } from './ColumnList';
import { LayoutEditorDroppableIds } from './droppableIds';

export interface RowGroupsListProps {
  rowGroups?: string[];
  isDropDisabled?: boolean;
  onReady?: (onDragEnd: OnDragEnd) => void;
  onRowGroupsChange?: (rowGroups: string[]) => void;

  getItemStyle?: (
    columnId: string,
    { isDragging, draggingOver }: { isDragging: boolean; draggingOver?: string },
    draggableStyle: CSSProperties
  ) => CSSProperties;
  renderItem?: (columnId: string, clear: () => void) => React.ReactNode;
}

const getListStyle = (isDraggingOver: boolean) => ({
  width: 300,
  height: '100%',
});

export const RowGroupsList = (props: RowGroupsListProps) => {
  const rowGroups = props.rowGroups || [];
  const setRowGroups = (rowGroups: string[]) => {
    props.onRowGroupsChange(rowGroups);
  };

  const onDragEnd = React.useCallback<OnDragEnd>(
    result => {
      const { destination, source } = result;
      if (!destination) {
        return;
      }
      const columnDrag =
        source.droppableId === LayoutEditorDroppableIds.ColumnList &&
        destination.droppableId === LayoutEditorDroppableIds.RowGroupsList;

      const rowGroupsDrag =
        source.droppableId === LayoutEditorDroppableIds.RowGroupsList &&
        destination.droppableId === LayoutEditorDroppableIds.RowGroupsList;

      const valid = columnDrag || rowGroupsDrag;

      if (!valid) {
        return;
      }

      if (rowGroupsDrag) {
        if (destination.index === source.index) {
          return;
        }

        const newRowGroups: string[] = reorder(rowGroups, source.index, destination.index);

        setRowGroups(newRowGroups);

        if (props.onRowGroupsChange) {
          props.onRowGroupsChange(newRowGroups);
        }

        return;
      }

      if (columnDrag) {
        if (!source.column.Groupable) {
          return;
        }

        if (rowGroups.filter(colId => colId === source.columnId)[0]) {
          return false;
        }
        const newRowGroups: string[] = [...rowGroups];

        newRowGroups.splice(destination.index, 0, source.columnId);

        setRowGroups(newRowGroups);

        if (props.onRowGroupsChange) {
          props.onRowGroupsChange(newRowGroups);
        }

        return;
      }
    },
    [rowGroups, setRowGroups, props.onRowGroupsChange]
  );

  useEffect(() => {
    if (props.onReady) {
      props.onReady(onDragEnd);
    }
  }, [onDragEnd]);

  const renderItem = React.useCallback(
    (colId: string) => {
      return props.renderItem(colId, () => {
        setRowGroups(rowGroups.filter(rowGroup => rowGroup !== colId));
      });
    },
    [props.renderItem]
  );

  return (
    <Droppable droppableId="RowGroupsList" isDropDisabled={props.isDropDisabled}>
      {(provided, snapshot) => (
        <div
          className={`ab-RowGroupsList ${!rowGroups.length ? 'ab-RowGroupsList--empty' : ''}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {!rowGroups.length ? <HelpBlock>Drag columns to create row groups</HelpBlock> : null}
          {rowGroups.map((colId: string, index) => {
            return (
              <Draggable key={colId} draggableId={`${colId}-rowGroup`} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="ab-RowGroupsList__column"
                      style={props.getItemStyle(colId, snapshot, provided.draggableProps.style)}
                    >
                      {renderItem(colId)}
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
