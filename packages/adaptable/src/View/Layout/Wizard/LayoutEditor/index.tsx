import * as React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  AdaptableColumn,
  AdaptableColumnProperties,
} from '../../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout } from '../../../../PredefinedConfig/LayoutState';
import { AdaptableApi } from '../../../../Api/AdaptableApi';
import { Flex, Text, Box } from 'rebass';
import Panel from '../../../../components/Panel';
import { CSSProperties } from 'react';
import { ColumnList, OnDragEnd } from './ColumnList';
import CheckBox from '../../../../components/CheckBox';
import { Icon } from '../../../../components/icons';
import SimpleButton from '../../../../components/SimpleButton';
import { ColumnSortList } from './ColumnSortList';
import { RowGroupsList } from './RowGroupsList';
import { ColumnSort } from '../../../../PredefinedConfig/Common/ColumnSort';
import { LayoutEditorDroppableIds } from './droppableIds';
import { useRef, useCallback } from 'react';
import { getItemStyle } from './getItemStyle';
import { reducer, LayoutEditorActions, getInitialState } from './reducer';
import DropdownButton from '../../../../components/DropdownButton';
import { PivotList } from './PivotList';

export interface LayoutEditorProps {
  api: AdaptableApi;
  layout: Layout;
  onLayoutChange?: (layout: Layout) => void;
}

const verticalPanelStyle = { minHeight: 300, flex: '1 0 auto' };
const ColumnLabels = (props: AdaptableColumnProperties) => {
  const labelNames = [
    'Aggregatable',
    // 'Filterable',
    'Groupable',
    'Moveable',
    'Pivotable',
    'Sortable',
  ];
  const labels = labelNames.map(name => ((props as any)[name] ? name.charAt(0) : ''));
  return (
    <Flex flexDirection="row" alignItems="center" width="100%">
      <Text mr={2} style={{ flex: 1 }}>
        Attributes:
      </Text>
      {labels.map((l, index) => {
        const enabled = !!l;
        const labelName = labelNames[index];
        const letter = labelName.charAt(0);
        return (
          <Flex
            width={'20px'}
            height={'20px'}
            marginLeft={2}
            alignItems="center"
            justifyContent="center"
            fontSize={2}
            backgroundColor="defaultbackground"
            title={enabled ? labelName : `Not ${labelName}`}
            style={{
              overflow: 'hidden',
              cursor: 'auto',
              position: 'relative',
              fontWeight: 600,
              lineHeight: 0,
              border: `1px solid var(--ab-color-${enabled ? 'accent' : 'inputborder'})`,
              borderRadius: 'var(--ab__border-radius)',
              opacity: enabled ? 1 : 0.5,
            }}
            key={letter}
          >
            {!enabled ? (
              <div
                style={{
                  background: 'currentColor',
                  position: 'absolute',
                  bottom: '-100%',
                  right: 0,
                  width: 2,
                  height: '200%',
                  transform: 'skewX(45deg)',
                }}
              ></div>
            ) : null}
            {letter}
          </Flex>
        );
      })}
    </Flex>
  );
};

export const LayoutEditor = (props: LayoutEditorProps) => {
  const { api } = props;
  const allColumns = React.useMemo(() => api.gridApi.getColumns(), []);

  const initialState = React.useMemo(() => getInitialState(props.layout), []);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { layout } = state;

  const allColumnsMap = React.useMemo(() => {
    return allColumns.reduce((acc, col) => {
      acc[col.ColumnId] = col;
      return acc;
    }, {} as Record<string, AdaptableColumn | null>);
  }, [allColumns]);

  const tmpMap: Record<string, AdaptableColumn> = {};
  const [columnList, setColumnList] = React.useState<AdaptableColumn[]>(
    layout.Columns.map(colId => {
      const col = allColumnsMap[colId];

      tmpMap[colId] = col;
      return col;
    })
      .concat(
        allColumns.filter(col => {
          return !tmpMap[col.ColumnId];
        })
      )
      .filter(c => c)
  );
  const setLayout = (layout: Layout) => {
    dispatch({
      type: LayoutEditorActions.SET_LAYOUT,
      payload: layout,
    });
    if (props.onLayoutChange) {
      props.onLayoutChange(layout);
    }
  };

  React.useEffect(() => {
    if (props.layout !== state.layout) {
      setLayout(props.layout);
    }
  }, [props.layout]);

  const visibleColumnsMap = React.useMemo(() => {
    return allColumns.reduce((acc, col) => {
      acc[col.ColumnId] = layout.Columns.indexOf(col.ColumnId) != -1 ? col : null;
      return acc;
    }, {} as Record<string, AdaptableColumn | null>);
  }, [layout, allColumns]);

  const aggregationColumnsMap = React.useMemo(() => {
    return Object.keys(layout.AggregationColumns || {}).reduce((acc, colId) => {
      let fn = layout.AggregationColumns[colId];
      if (typeof fn === 'boolean') {
        fn = allColumnsMap[colId].AggregationFunction;
      }

      acc[colId] = fn;
      return acc;
    }, {} as Record<string, string>);
  }, [allColumnsMap, layout]);

  const setColumnVisibility = (c: AdaptableColumn, visible: boolean) => {
    const newLayout = visible
      ? { ...layout, Columns: [...layout.Columns, c.ColumnId] }
      : { ...layout, Columns: layout.Columns.filter(colId => colId !== c.ColumnId) };

    setLayout(newLayout);
  };

  const onDragEndRef = useRef<{
    columnList: OnDragEnd;
    columnSortList: OnDragEnd;
    rowGroupsList: OnDragEnd;
    pivotList: OnDragEnd;
  }>({
    columnList: () => {},
    columnSortList: () => {},
    rowGroupsList: () => {},
    pivotList: () => {},
  });

  const onDragEnd = useCallback<OnDragEnd>(
    result => {
      const { source, destination } = result;

      if (!source || !destination) {
        return;
      }

      if (source.droppableId === LayoutEditorDroppableIds.ColumnList) {
        source.column = columnList[source.index];
        source.columnId = source.column.ColumnId;
      }

      onDragEndRef.current.columnList(result);
      onDragEndRef.current.columnSortList(result);
      onDragEndRef.current.rowGroupsList(result);
      onDragEndRef.current.pivotList(result);
    },
    [columnList]
  );

  const onDragStart = useCallback(
    snapshot => {
      const { source, draggableId } = snapshot;

      const dragSource = source.droppableId;
      const column =
        dragSource === LayoutEditorDroppableIds.ColumnList ? allColumnsMap[draggableId] : null;

      const dropDisabledOnColumns = !column || !column.Moveable;
      dispatch({
        type: LayoutEditorActions.SET_DROP_DISABLED_ON_COLUMNS,
        payload: dropDisabledOnColumns,
      });

      dispatch({
        type: LayoutEditorActions.SET_DRAG_SOURCE,
        payload: dragSource,
      });
      dispatch({
        type: LayoutEditorActions.SET_DROP_DISABLED_ON_COLUMNS,
        payload: source.droppableId !== LayoutEditorDroppableIds.ColumnList,
      });

      const columnAlreadySorted =
        column &&
        layout.ColumnSorts &&
        !!layout.ColumnSorts.filter(c => c.Column === column.ColumnId)[0];

      const invalidSourceForSort =
        dragSource !== LayoutEditorDroppableIds.ColumnList &&
        dragSource !== LayoutEditorDroppableIds.ColumnSortList;

      const disableDropOnSort =
        invalidSourceForSort || columnAlreadySorted || (column && !column.Sortable);

      dispatch({
        type: LayoutEditorActions.SET_DROP_DISABLED_ON_SORT,
        payload: !!disableDropOnSort,
      });

      const columnAlreadyRowGrouped =
        column && layout.RowGroupedColumns
          ? !!layout.RowGroupedColumns.filter(colId => colId === column.ColumnId)[0]
          : false;

      const invalidSourceForRowGroups =
        dragSource !== LayoutEditorDroppableIds.ColumnList &&
        dragSource !== LayoutEditorDroppableIds.RowGroupsList;

      const disableDropOnRowGroups =
        invalidSourceForRowGroups || columnAlreadyRowGrouped || (column && !column.Groupable);

      dispatch({
        type: LayoutEditorActions.SET_DROP_DISABLED_ON_ROW_GROUPS,
        payload: !!disableDropOnRowGroups,
      });

      const columnAlreadyPivoted =
        column && layout.PivotColumns
          ? !!layout.PivotColumns.filter(colId => colId === column.ColumnId)[0]
          : false;

      const invalidSourceForPivot =
        dragSource !== LayoutEditorDroppableIds.ColumnList &&
        dragSource !== LayoutEditorDroppableIds.PivotList;

      const disableDropOnPivot =
        invalidSourceForPivot || columnAlreadyPivoted || (column && !column.Pivotable);

      dispatch({
        type: LayoutEditorActions.SET_DROP_DISABLED_ON_PIVOT,
        payload: !!disableDropOnPivot,
      });
    },
    [state, layout]
  );

  const onColumnOrderChange = useCallback(
    (columns: AdaptableColumn[]) => {
      setLayout({
        ...layout,
        Columns: columns.filter(c => visibleColumnsMap[c.ColumnId]).map(c => c.ColumnId),
      });

      setColumnList(columns);
    },
    [visibleColumnsMap, layout]
  );

  const onColumnSortsChange = useCallback(
    (ColumnSorts: ColumnSort[]) => {
      setLayout({
        ...layout,
        ColumnSorts,
      });
    },
    [layout]
  );

  const onRowGroupsChange = useCallback(
    (RowGroupedColumns: string[]) => {
      setLayout({
        ...layout,
        RowGroupedColumns,
      });
    },
    [layout]
  );

  const onPivotColumnsChange = useCallback(
    (PivotColumns: string[]) => {
      setLayout({
        ...layout,
        PivotColumns,
      });
    },
    [layout]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Flex flexDirection="row">
        <Panel header="Columns" bodyProps={{ padding: 0 }}>
          <ColumnList
            onReady={onDragEnd => {
              onDragEndRef.current.columnList = onDragEnd;
            }}
            getItemStyle={(
              c: AdaptableColumn,
              snapshot: { isDragging: boolean; draggingOver?: string },
              draggableStyle
            ): CSSProperties => {
              return getItemStyle(c, layout, state.dragSource, snapshot, draggableStyle);
            }}
            columns={columnList}
            isDropDisabled={state.dropDisabledOnColumns}
            onColumnOrderChange={onColumnOrderChange}
            renderItem={c => {
              const visible = !!visibleColumnsMap[c.ColumnId];
              const aggregate = !!aggregationColumnsMap[c.ColumnId];
              return (
                <Flex flexDirection="row" alignItems="center">
                  <Box ml={2} mr={3}>
                    <Icon name="drag" size={30} />
                  </Box>
                  <Flex
                    flexDirection="column"
                    alignItems="flex-start"
                    flex={1}
                    justifyContent="space-between"
                  >
                    <CheckBox
                      title="Visible"
                      readOnly={!c.Hideable && visible}
                      checked={visible}
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                      onChange={setColumnVisibility.bind(null, c)}
                    >
                      {c.FriendlyName}
                    </CheckBox>

                    <ColumnLabels
                      Sortable={c.Sortable}
                      Filterable={c.Filterable}
                      Moveable={c.Moveable}
                      Pivotable={c.Pivotable}
                      Groupable={c.Groupable}
                      Aggregatable={c.Aggregatable}
                    ></ColumnLabels>
                    {c.Aggregatable &&
                    c.AvailableAggregationFunctions &&
                    c.AvailableAggregationFunctions.length ? (
                      <CheckBox
                        disabled={!layout.RowGroupedColumns || !layout.RowGroupedColumns.length}
                        onChange={checked => {
                          let aggCols: null | Record<string, string | true> =
                            layout.AggregationColumns || {};
                          // const aggCols = new Set(layout.AggregationColumns);
                          if (checked) {
                            let aggFunc = c.AggregationFunction;
                            if (!aggFunc && c.AvailableAggregationFunctions) {
                              aggFunc = c.AvailableAggregationFunctions[0];
                            }
                            aggCols[c.ColumnId] = aggFunc;
                          } else {
                            delete aggCols[c.ColumnId];

                            if (!Object.keys(aggCols).length) {
                              aggCols = null;
                            }
                          }
                          setLayout({
                            ...layout,
                            AggregationColumns: aggCols,
                          });
                        }}
                        checked={aggregate}
                      >
                        Aggregate
                        <DropdownButton
                          style={{
                            visibility: aggregate ? 'visible' : 'hidden',
                          }}
                          columns={['label']}
                          ml={2}
                          variant="text"
                          items={c.AvailableAggregationFunctions.map(fnName => {
                            return {
                              label: fnName,
                              onClick: () => {
                                const aggCols = layout.AggregationColumns;
                                if (!aggCols) {
                                  return;
                                }
                                aggCols[c.ColumnId] = fnName;
                                setLayout({
                                  ...layout,
                                  AggregationColumns: aggCols,
                                });
                              },
                            };
                          })}
                        >
                          {aggregationColumnsMap[c.ColumnId]}
                        </DropdownButton>
                      </CheckBox>
                    ) : null}
                  </Flex>
                </Flex>
              );
            }}
          />
        </Panel>

        <Flex flexDirection="column">
          <Panel
            ml={2}
            header="Sorting"
            bodyProps={{ padding: 0 }}
            mb={2}
            style={verticalPanelStyle}
          >
            <ColumnSortList
              columnSorts={layout.ColumnSorts}
              onColumnSortsChange={onColumnSortsChange}
              isDropDisabled={state.dropDisabledOnSort}
              onReady={dragEnd => {
                onDragEndRef.current.columnSortList = dragEnd;
              }}
              getItemStyle={(
                columnId,
                snapshot: { isDragging: boolean; draggingOver?: string },
                draggableStyle
              ): CSSProperties => {
                return getItemStyle(
                  allColumnsMap[columnId],
                  layout,
                  state.dragSource,
                  snapshot,
                  draggableStyle
                );
              }}
              renderItem={(c: ColumnSort, clear, toggleSort) => {
                const column: AdaptableColumn = allColumnsMap[c.Column];
                return (
                  <Flex flexDirection="row" alignItems="center">
                    <Box ml={2} mr={3}>
                      <Icon name="drag" size={30} />
                    </Box>
                    <Flex flex="1" flexDirection="row" alignItems="center">
                      {column.FriendlyName} [{c.SortOrder}]
                    </Flex>
                    <SimpleButton
                      variant="raised"
                      style={{ cursor: 'pointer' }}
                      mr={3}
                      onClick={e => {
                        e.stopPropagation();
                        toggleSort();
                      }}
                    >
                      <Icon name={c.SortOrder === 'Ascending' ? 'sort-asc' : 'sort-desc'} />
                    </SimpleButton>
                    <SimpleButton
                      variant="text"
                      onClick={e => {
                        e.stopPropagation();
                        clear();
                      }}
                    >
                      <Icon name="clear" />
                    </SimpleButton>
                  </Flex>
                );
              }}
            />
          </Panel>

          <Panel
            style={verticalPanelStyle}
            ml={2}
            mb={2}
            header="Row Groups"
            bodyProps={{ padding: 0 }}
          >
            <RowGroupsList
              rowGroups={layout.RowGroupedColumns}
              onRowGroupsChange={onRowGroupsChange}
              isDropDisabled={state.dropDisabledOnRowGroups}
              onReady={dragEnd => {
                onDragEndRef.current.rowGroupsList = dragEnd;
              }}
              getItemStyle={(
                columnId,
                snapshot: { isDragging: boolean; draggingOver?: string },
                draggableStyle
              ): CSSProperties => {
                return getItemStyle(
                  allColumnsMap[columnId],
                  layout,
                  state.dragSource,
                  snapshot,
                  draggableStyle
                );
              }}
              renderItem={(colId: string, clear) => {
                const column: AdaptableColumn = allColumnsMap[colId];
                return (
                  <Flex flexDirection="row" alignItems="center">
                    <Box ml={2} mr={3}>
                      <Icon name="drag" size={30} />
                    </Box>
                    <Flex flexDirection="row" alignItems="center" flex={1}>
                      {column.FriendlyName}
                    </Flex>

                    <SimpleButton
                      variant="text"
                      onClick={e => {
                        e.stopPropagation();
                        clear();
                      }}
                    >
                      <Icon name="clear" />
                    </SimpleButton>
                  </Flex>
                );
              }}
            />
          </Panel>

          <Panel
            style={verticalPanelStyle}
            ml={2}
            header={
              <Flex
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>Pivoted Columns</Text>
                <CheckBox
                  checked={layout.EnablePivot}
                  onChange={checked => {
                    setLayout({
                      ...layout,
                      EnablePivot: checked,
                    });
                  }}
                >
                  Enable
                </CheckBox>
              </Flex>
            }
            bodyProps={{ padding: 0 }}
          >
            <PivotList
              pivotColumns={layout.PivotColumns}
              onPivotColumnsChange={onPivotColumnsChange}
              isDropDisabled={state.dropDisabledOnPivot}
              onReady={dragEnd => {
                onDragEndRef.current.pivotList = dragEnd;
              }}
              renderItem={(colId: string, clear) => {
                const column: AdaptableColumn = allColumnsMap[colId];
                return (
                  <Flex flexDirection="row" alignItems="center">
                    <Box ml={2} mr={3}>
                      <Icon name="drag" size={30} />
                    </Box>
                    <Flex flexDirection="row" alignItems="center" flex={1}>
                      {column.FriendlyName}
                    </Flex>

                    <SimpleButton
                      variant="text"
                      onClick={e => {
                        e.stopPropagation();
                        clear();
                      }}
                    >
                      <Icon name="clear" />
                    </SimpleButton>
                  </Flex>
                );
              }}
              getItemStyle={(
                columnId,
                snapshot: { isDragging: boolean; draggingOver?: string },
                draggableStyle
              ): CSSProperties => {
                return getItemStyle(
                  allColumnsMap[columnId],
                  layout,
                  state.dragSource,
                  snapshot,
                  draggableStyle
                );
              }}
            />
          </Panel>
        </Flex>
      </Flex>
    </DragDropContext>
  );
};
