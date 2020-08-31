import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AdaptableColumn } from '../../../../PredefinedConfig/Common/AdaptableColumn';

import { CSSProperties, useEffect } from 'react';
import { useState, useCallback } from 'react';
import { reorder } from './reorder';
import { LayoutEditorDroppableIds } from './droppableIds';

import { getListStyle } from './utils';
import { Box } from 'rebass';
import { AdaptableFormControlTextClear } from '../../../Components/Forms/AdaptableFormControlTextClear';

export type OnDragEnd = (result: {
  destination?: { index: number; droppableId: string };
  source: { index: number; columnId?: string; column?: AdaptableColumn; droppableId: string };
}) => void;

export interface ColumnListProps {
  columns: AdaptableColumn[];
  isDropDisabled?: boolean;
  getItemStyle: (
    c: AdaptableColumn,
    { isDragging, draggingOver }: { isDragging: boolean; draggingOver?: string },
    draggableStyle: CSSProperties
  ) => CSSProperties;
  onReady?: (onDragEnd: OnDragEnd) => void;
  onColumnOrderChange: (columns: AdaptableColumn[]) => void;
  renderItem?: (c: AdaptableColumn) => React.ReactNode;
}

export const ColumnList = (props: ColumnListProps) => {
  const [columns, setColumns] = useState(props.columns);
  const [search, setSearch] = useState('');

  const onDragEnd = React.useCallback<OnDragEnd>(
    result => {
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      if (
        source.droppableId !== LayoutEditorDroppableIds.ColumnList ||
        source.droppableId !== destination.droppableId
      ) {
        return;
      }
      if (!source.column || !source.column.Moveable) {
        return;
      }
      if (destination.index === source.index) {
        return;
      }

      const newColumns: AdaptableColumn[] = reorder(columns, source.index, destination.index);

      const newDropIndex = newColumns.indexOf(source.column);

      if (search && source.droppableId === LayoutEditorDroppableIds.ColumnList) {
        // cannot drop on this list while searching
        return;
      }
      if (!source.column.IsFixed && newColumns.slice(newDropIndex).filter(c => c.IsFixed).length) {
        // there are fixed cols after this one, so it's an invalid drop
        return;
      }

      setColumns(newColumns);

      if (props.onColumnOrderChange) {
        props.onColumnOrderChange(newColumns);
      }
    },
    [columns, setColumns, props.onColumnOrderChange, search]
  );

  useEffect(() => {
    if (props.onReady) {
      props.onReady(onDragEnd);
    }
  }, [onDragEnd]);

  const renderColumn = useCallback(
    (c: AdaptableColumn) => {
      const defaultRenderColumn = (c: AdaptableColumn) => {
        return <>{c.FriendlyName}</>;
      };
      return (props.renderItem || defaultRenderColumn)(c);
    },
    [props.renderItem]
  );

  return (
    <Droppable
      droppableId={LayoutEditorDroppableIds.ColumnList}
      isDropDisabled={search ? true : props.isDropDisabled}
    >
      {(provided, snapshot) => {
        return (
          <div
            className="ab-ColumnList"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot)}
          >
            <Box px={2} mb={2}>
              <AdaptableFormControlTextClear
                placeholder="Search a column"
                width="100%"
                value={search}
                OnTextChange={setSearch}
              />
            </Box>
            {columns.map((c: AdaptableColumn, index) => {
              return (
                <Draggable key={`${c.ColumnId}-column`} draggableId={c.ColumnId} index={index}>
                  {(provided, snapshot) => {
                    const style = props.getItemStyle(c, snapshot, provided.draggableProps.style);
                    style.padding = 0;

                    if (
                      search &&
                      c.FriendlyName.toLowerCase().indexOf(search.toLowerCase()) == -1
                    ) {
                      style.display = 'none';
                    }
                    return (
                      <>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="ab-ColumnList__column"
                          style={style}
                        >
                          {renderColumn(c)}
                        </div>
                      </>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
