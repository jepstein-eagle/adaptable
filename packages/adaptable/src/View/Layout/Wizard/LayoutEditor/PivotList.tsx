import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { CSSProperties } from 'react';
import { useEffect } from 'react';

import { reorder } from './reorder';
import HelpBlock from '../../../../components/HelpBlock';
import { OnDragEnd } from './ColumnList';
import { LayoutEditorDroppableIds } from './droppableIds';
import { getListStyle } from './utils';

export interface PivotListProps {
  pivotColumns?: string[];
  isDropDisabled?: boolean;
  onReady?: (onDragEnd: OnDragEnd) => void;
  onPivotColumnsChange: (rowGroups: string[]) => void;

  getItemStyle?: (
    columnId: string,
    { isDragging, draggingOver }: { isDragging: boolean; draggingOver?: string },
    draggableStyle: CSSProperties
  ) => CSSProperties;
  renderItem?: (columnId: string, clear: () => void) => React.ReactNode;
}

export const PivotList = (props: PivotListProps) => {
  const pivotColumns = props.pivotColumns || [];
  const setPivotColumns = (pivotColumns: string[]) => {
    props.onPivotColumnsChange(pivotColumns);
  };

  const onDragEnd = React.useCallback<OnDragEnd>(
    result => {
      const { destination, source } = result;
      if (!destination) {
        return;
      }
      const columnDrag =
        source.droppableId === LayoutEditorDroppableIds.ColumnList &&
        destination.droppableId === LayoutEditorDroppableIds.PivotList;

      const pivotDrag =
        source.droppableId === LayoutEditorDroppableIds.PivotList &&
        destination.droppableId === LayoutEditorDroppableIds.PivotList;

      const valid = columnDrag || pivotDrag;

      if (!valid) {
        return;
      }

      if (pivotDrag) {
        if (destination.index === source.index) {
          return;
        }

        const newPivotColumns: string[] = reorder(pivotColumns, source.index, destination.index);

        setPivotColumns(newPivotColumns);

        return;
      }

      if (columnDrag) {
        if (!source.column.Pivotable) {
          return;
        }

        if (pivotColumns.filter(colId => colId === source.columnId)[0]) {
          return false;
        }
        const newPivotColumns: string[] = [...pivotColumns];

        newPivotColumns.splice(destination.index, 0, source.columnId);

        setPivotColumns(newPivotColumns);

        return;
      }
    },
    [pivotColumns, setPivotColumns, props.onPivotColumnsChange]
  );

  useEffect(() => {
    if (props.onReady) {
      props.onReady(onDragEnd);
    }
  }, [onDragEnd]);

  const renderItem = React.useCallback(
    (colId: string) => {
      return props.renderItem(colId, () => {
        setPivotColumns(pivotColumns.filter(pivotColId => pivotColId !== colId));
      });
    },
    [props.renderItem]
  );

  return (
    <Droppable
      droppableId={LayoutEditorDroppableIds.PivotList}
      isDropDisabled={props.isDropDisabled}
    >
      {(provided, snapshot) => (
        <div
          className={`ab-LayoutEditor__PivotList ${
            !pivotColumns.length ? 'ab-LayoutEditor__PivotList--empty' : ''
          }`}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot)}
        >
          {!pivotColumns.length ? <HelpBlock>Drag columns to pivot</HelpBlock> : null}
          {pivotColumns.map((colId: string, index) => {
            return (
              <Draggable key={colId} draggableId={`${colId}-pivot`} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="ab-LayoutEditor__PivotList__column"
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
