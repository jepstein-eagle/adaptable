import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  AdaptableColumn,
  AdaptableColumnProperties,
} from '../../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout } from '../../../../PredefinedConfig/LayoutState';
import { AdaptableApi } from '../../../../Api/AdaptableApi';
import { Flex, Text, Box } from 'rebass';
import Panel, { PanelProps } from '../../../../components/Panel';
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
import { ButtonInfo } from '../../../Components/Buttons/ButtonInfo';

export interface LayoutEditorProps {
  api: AdaptableApi;
  layout: Layout;
  onLayoutChange?: (layout: Layout) => void;
}

const verticalPanelStyle = { minHeight: 150, flex: '1 0 auto', overflow: 'auto' };

const ListPanel = (props: PanelProps) => (
  <Panel
    variant="modern"
    bodyProps={{ padding: 0 }}
    style={{ ...verticalPanelStyle, ...props.style }}
    {...props}
  />
);
const ColumnLabels = (
  props: AdaptableColumnProperties & {
    children?: React.ReactNode;
    labels?: Record<string, React.ReactNode>;
    flexDirection?: 'row' | 'column';
    showBoth?: boolean;
    showTitle?: boolean;
  }
) => {
  const {
    children,
    showBoth,
    showTitle,
    flexDirection = 'row',
    labels: labelsProp,
    ...columnProperties
  } = props;

  const labelNames = [
    'Aggregatable',
    'Filterable',
    'Groupable',
    'Moveable',
    'Pivotable',
    'Sortable',
  ];
  const labels = labelNames.map(name => ((columnProperties as any)[name] ? name.charAt(0) : ''));
  const flexProps = {
    [flexDirection === 'row' ? 'alignItems' : 'justifyContent']: 'center',
  };

  return (
    <Flex flexDirection={flexDirection} {...flexProps} width="100%">
      {showTitle ? <Text mr={2}>Behaviours:</Text> : null}
      {labels.map((l, index) => {
        const enabled = !!l;
        const labelName = labelNames[index];
        const letter = labelName.charAt(0);

        const renderBox = (enabled: boolean) => {
          return (
            <Flex
              width={'20px'}
              height={'20px'}
              alignItems="center"
              justifyContent="center"
              fontSize={2}
              ml={2}
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
        };
        return (
          <Flex mt={flexDirection === 'row' ? 0 : 2} flexDirection="row" alignItems="center">
            {renderBox(enabled)}
            {showBoth ? renderBox(!enabled) : null}
            {labelsProp ? (
              <Flex flex={1} ml={2}>
                {labelsProp[labelName]}
              </Flex>
            ) : null}
          </Flex>
        );
      })}
      {children}
    </Flex>
  );
};

export const LayoutEditor = (props: LayoutEditorProps) => {
  const { api } = props;
  const allColumns = React.useMemo(() => api.columnApi.getColumns(), []);

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
      ? {
          ...layout,
          Columns: columnList
            .filter(col => visibleColumnsMap[col.ColumnId] || col.ColumnId === c.ColumnId)
            .map(c => c.ColumnId),
        }
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

      if (destination.droppableId === LayoutEditorDroppableIds.ColumnList) {
        onDragEndRef.current.columnList(result);
      }
      if (destination.droppableId === LayoutEditorDroppableIds.ColumnSortList) {
        onDragEndRef.current.columnSortList(result);
      }
      if (destination.droppableId === LayoutEditorDroppableIds.RowGroupsList) {
        onDragEndRef.current.rowGroupsList(result);
      }
      if (destination.droppableId === LayoutEditorDroppableIds.PivotList) {
        onDragEndRef.current.pivotList(result);
      }
    },
    [columnList]
  );

  const onDragStart = useCallback(
    snapshot => {
      const { source, draggableId } = snapshot;

      const dragSource = source.droppableId;

      const column =
        dragSource === LayoutEditorDroppableIds.ColumnList ? allColumnsMap[draggableId] : null;

      const invalidSourceForColumns = source.droppableId !== LayoutEditorDroppableIds.ColumnList;

      const dropDisabledOnColumns = !column || !column.Moveable || invalidSourceForColumns;

      dispatch({
        type: LayoutEditorActions.SET_DROP_DISABLED_ON_COLUMNS,
        payload: dropDisabledOnColumns,
      });

      dispatch({
        type: LayoutEditorActions.SET_DRAG_SOURCE,
        payload: dragSource,
      });

      const columnAlreadySorted =
        column &&
        layout.ColumnSorts &&
        !!layout.ColumnSorts.filter(c => c.ColumnId === column.ColumnId)[0];

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
      <Box className="ab-LayoutEditor">
        <ListPanel
          header="Columns"
          bodyScroll
          style={{ flex: 'none' }}
          className="ab-LayoutEditor__ColumnListPanel"
          bodyProps={{ style: { display: 'flex' }, px: 0 }}
        >
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
                <Flex flexDirection="column" alignItems="stretch">
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    backgroundColor="secondary"
                    color="text-on-secondary"
                  >
                    <Flex flex={1} alignItems="center">
                      <Box ml={2} mr={2}>
                        <Icon name="drag" size={30} />
                      </Box>
                      {c.FriendlyName}{' '}
                      <ButtonInfo
                        marginLeft={1}
                        style={{ color: 'var(--ab-color-text-on-secondary)' }}
                        onClick={() => {
                          props.api.internalApi.showPopupScreen('ColumnInfo', 'ColumnInfoPopup', {
                            column: c,
                            source: 'ContextMenu',
                          });
                        }}
                      ></ButtonInfo>
                    </Flex>
                    <CheckBox
                      title="Visible"
                      readOnly={!c.Hideable && visible}
                      checked={visible}
                      mx={2}
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                      onChange={setColumnVisibility.bind(null, c)}
                    >
                      Visible
                    </CheckBox>
                  </Flex>

                  <Flex padding={2} flexDirection="column">
                    <ColumnLabels
                      showTitle={true}
                      Sortable={c.Sortable}
                      Filterable={c.Filterable}
                      Moveable={c.Moveable}
                      Pivotable={c.Pivotable}
                      Groupable={c.Groupable}
                      Aggregatable={c.Aggregatable}
                    >
                      <Flex flex={1}></Flex>
                      {c.Aggregatable &&
                      c.AvailableAggregationFunctions &&
                      c.AvailableAggregationFunctions.length ? (
                        <CheckBox
                          ml={3}
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
                            ml={2}
                            columns={['label']}
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
                    </ColumnLabels>
                  </Flex>
                </Flex>
              );
            }}
          />
        </ListPanel>

        <ListPanel header="Sorting" className="ab-LayoutEditor__ColumnSortListPanel">
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
              const column: AdaptableColumn = allColumnsMap[c.ColumnId];
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
                    <Icon name={c.SortOrder === 'Asc' ? 'sort-asc' : 'sort-desc'} />
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
        </ListPanel>

        <ListPanel header="Row Groups" className="ab-LayoutEditor__RowGroupsListPanel">
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
        </ListPanel>

        <ListPanel
          className="ab-LayoutEditor__PivotListPanel"
          header={
            <Flex
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Pivoted Columns</Text>
              <CheckBox
                mt={0}
                mb={0}
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
        </ListPanel>

        <ListPanel
          header="Legend: Column Behaviour"
          style={{
            gridRow: '1 /1',
            gridColumn: '3/3',
          }}
          bodyProps={{
            padding: 2,
            backgroundColor: 'defaultbackground',
            color: 'text-on-defaultbackground',
          }}
        >
          <ColumnLabels
            flexDirection="column"
            showBoth
            labels={{
              Sortable: 'Able to be sorted',
              Filterable: 'Can be filtered',
              Aggregatable: 'Shows aggregations (in grouped rows)',
              Groupable: 'Can form a row group',
              Moveable: 'Is draggable and movable',
              Pivotable: 'Eligible for pivoting',
            }}
            Sortable={true}
            Filterable={true}
            Moveable={true}
            Pivotable={true}
            Groupable={true}
            Aggregatable={true}
          ></ColumnLabels>
        </ListPanel>
      </Box>
    </DragDropContext>
  );
};
