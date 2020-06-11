import {
  ICellRendererFunc,
  ICellRendererParams,
  ColDef,
  GridOptions,
  SideBarDef,
  ToolPanelDef,
  CellRange,
  CellRangeParams,
  MenuItemDef,
  GetContextMenuItemsParams,
  Column,
  RowNode,
  Module,
  ModuleRegistry,
} from '@ag-grid-community/all-modules';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IStrategy } from '../Strategy/Interface/IStrategy';
import { AdvancedSearchStrategy } from '../Strategy/AdvancedSearchStrategy';
import { BulkUpdateStrategy } from '../Strategy/BulkUpdateStrategy';
import { CalculatedColumnStrategy } from '../Strategy/CalculatedColumnStrategy';
import { CalendarStrategy } from '../Strategy/CalendarStrategy';
import { CellValidationStrategy } from '../Strategy/CellValidationStrategy';

import { ColumnChooserStrategy } from '../Strategy/ColumnChooserStrategy';
import { ColumnFilterStrategy } from '../Strategy/ColumnFilterStrategy';
import { ColumnInfoStrategy } from '../Strategy/ColumnInfoStrategy';
import { ConditionalStyleStrategyagGrid } from './Strategy/ConditionalStyleStrategyagGrid';
import { DashboardStrategy } from '../Strategy/DashboardStrategy';
import { StateManagementStrategy } from '../Strategy/StateManagementStrategy';
import { DataSourceStrategy } from '../Strategy/DataSourceStrategy';
import { ExportStrategy } from '../Strategy/ExportStrategy';
import { FlashingCellStrategyagGrid } from './Strategy/FlashingCellsStrategyagGrid';
import { FormatColumnStrategyagGrid } from './Strategy/FormatColumnStrategyagGrid';
import { FreeTextColumnStrategy } from '../Strategy/FreeTextColumnStrategy';
import { LayoutStrategy } from '../Strategy/LayoutStrategy';
import { ColumnCategoryStrategy } from '../Strategy/ColumnCategoryStrategy';
import { PercentBarStrategy } from '../Strategy/PercentBarStrategy';
import { PlusMinusStrategy } from '../Strategy/PlusMinusStrategy';
import { QuickSearchStrategy } from '../Strategy/QuickSearchStrategy';
import { SmartEditStrategy } from '../Strategy/SmartEditStrategy';
import { ShortcutStrategy } from '../Strategy/ShortcutStrategy';
import { TeamSharingStrategy } from '../Strategy/TeamSharingStrategy';
import { ThemeStrategy } from '../Strategy/ThemeStrategy';
import { CellSummaryStrategy } from '../Strategy/CellSummaryStrategy';
import { UserFilterStrategy } from '../Strategy/UserFilterStrategy';
import { SystemStatusStrategy } from '../Strategy/SystemStatusStrategy';
import { ReminderStrategy } from '../Strategy/ReminderStrategy';
import { ScheduleStrategy } from '../Strategy/ScheduleStrategy';
import { Adaptable } from './Adaptable';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { RowStyle, UserMenuItem } from '../PredefinedConfig/UserInterfaceState';
import LoggingHelper from '../Utilities/Helpers/LoggingHelper';
import ColumnHelper from '../Utilities/Helpers/ColumnHelper';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AlertStrategyagGrid } from './Strategy/AlertStrategyagGrid';
import { UpdatedRowStrategyagGrid } from './Strategy/UpdatedRowStrategyagGrid';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import Helper from '../Utilities/Helpers/Helper';
import { SelectionChangedInfo, SelectionChangedEventArgs } from '../Api/Events/SelectionChanged';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import { iconToString } from '../components/icons';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { createUuid } from '../PredefinedConfig/Uuid';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { PushPullStrategy } from '../Strategy/PushPullStrategy';
import { Glue42Strategy } from '../Strategy/Glue42Strategy';
import { GradientColumnStrategy } from '../Strategy/GradientColumnStrategy';
import { ActionColumnStrategy } from '../Strategy/ActionColumnStrategy';
import { CustomSort } from '../PredefinedConfig/CustomSortState';
import {
  AdaptableComparerFunction,
  AdaptableNodeComparerFunction,
} from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';
import ObjectFactory from '../Utilities/ObjectFactory';
import { GridInfoStrategy } from '../Strategy/GridInfoStrategy';
import { CustomSortStrategy } from '../Strategy/CustomSortStrategy';
import { HideColumnStrategy } from '../Strategy/HideColumnStrategy';
import { SelectColumnStrategy } from '../Strategy/SelectColumnStrategy';
import { SelectedRowInfo } from '../PredefinedConfig/Selection/SelectedRowInfo';
import { AG_GRID_GROUPED_COLUMN } from '../Utilities/Constants/GeneralConstants';
import clamp from 'lodash/clamp';

/**
 * Adaptable ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */

// tslint:disable-next-line: class-name
export class agGridHelper {
  constructor(private adaptable: IAdaptable, private gridOptions: GridOptions) {
    this.adaptable = adaptable;
    this.gridOptions = gridOptions;
  }

  public getVendorLightThemeName(): string {
    return 'ag-theme-balham';
  }

  public getVendorDarkThemeName(): string {
    return 'ag-theme-balham-dark';
  }

  public setUpStrategies(): Map<AdaptableFunctionName, IStrategy> {
    const strategies = new Map<AdaptableFunctionName, IStrategy>();
    const adaptable = this.adaptable as Adaptable;
    strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy(adaptable));
    strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategyagGrid(adaptable));
    strategies.set(StrategyConstants.ActionColumnStrategyId, new ActionColumnStrategy(adaptable));
    strategies.set(
      StrategyConstants.AdvancedSearchStrategyId,
      new AdvancedSearchStrategy(adaptable)
    );
    strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy(adaptable));
    strategies.set(
      StrategyConstants.CalculatedColumnStrategyId,
      new CalculatedColumnStrategy(adaptable)
    );
    strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy(adaptable));
    strategies.set(
      StrategyConstants.CellValidationStrategyId,
      new CellValidationStrategy(adaptable)
    );

    strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy(adaptable));
    strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy(adaptable));
    strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy(adaptable));
    strategies.set(
      StrategyConstants.ConditionalStyleStrategyId,
      new ConditionalStyleStrategyagGrid(adaptable)
    );
    strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategy(adaptable));
    strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy(adaptable));
    strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy(adaptable));
    strategies.set(
      StrategyConstants.FlashingCellsStrategyId,
      new FlashingCellStrategyagGrid(adaptable)
    );
    strategies.set(StrategyConstants.UpdatedRowStrategyId, new UpdatedRowStrategyagGrid(adaptable));
    strategies.set(
      StrategyConstants.FormatColumnStrategyId,
      new FormatColumnStrategyagGrid(adaptable)
    );
    strategies.set(
      StrategyConstants.FreeTextColumnStrategyId,
      new FreeTextColumnStrategy(adaptable)
    );
    strategies.set(
      StrategyConstants.GradientColumnStrategyId,
      new GradientColumnStrategy(adaptable)
    );
    strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy(adaptable));
    strategies.set(
      StrategyConstants.ColumnCategoryStrategyId,
      new ColumnCategoryStrategy(adaptable)
    );
    strategies.set(StrategyConstants.PercentBarStrategyId, new PercentBarStrategy(adaptable));

    strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy(adaptable));
    strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy(adaptable));
    strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy(adaptable));
    strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy(adaptable));
    strategies.set(
      StrategyConstants.StateManagementStrategyId,
      new StateManagementStrategy(adaptable)
    );
    strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy(adaptable));
    strategies.set(StrategyConstants.SystemStatusStrategyId, new SystemStatusStrategy(adaptable));
    strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy(adaptable));
    strategies.set(StrategyConstants.CellSummaryStrategyId, new CellSummaryStrategy(adaptable));
    strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy(adaptable));

    strategies.set(StrategyConstants.GridInfoStrategyId, new GridInfoStrategy(adaptable));
    strategies.set(StrategyConstants.ReminderStrategyId, new ReminderStrategy(adaptable));
    strategies.set(StrategyConstants.ScheduleStrategyId, new ScheduleStrategy(adaptable));
    strategies.set(StrategyConstants.HideColumnStrategyId, new HideColumnStrategy(adaptable));
    strategies.set(StrategyConstants.SelectColumnStrategyId, new SelectColumnStrategy(adaptable));

    // should probably both be plugins
    strategies.set(StrategyConstants.IPushPullStrategyId, new PushPullStrategy(adaptable));
    strategies.set(StrategyConstants.Glue42StrategyId, new Glue42Strategy(adaptable));
    return strategies;
  }

  public TrySetUpNodeIds(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.adaptable.adaptableOptions.primaryKey)) {
      // if no valid pk then always false
      return false;
    }
    // need some way of checking if running on client on server: if on server then we return false
    if (this.gridOptions.getRowNodeId != null) {
      return true;
    }

    // also we can check if they have done it
    const primaryKey: any = this.adaptable.adaptableOptions.primaryKey;
    // otherwise lets set the Id so that it returns the primaryKey
    this.gridOptions.getRowNodeId = function(data) {
      return data[primaryKey];
    };
    return true;
  }

  public createSparklineCellRendererComp(
    sparkline: SparklineColumn,
    adaptableId: string
  ): ICellRendererFunc | void {
    return this.adaptable.lookupPlugins('sparklineColumnRenderer', sparkline);
  }

  public createPercentBarCellRendererFunc(pcr: PercentBar, adaptableId: string): ICellRendererFunc {
    const min = pcr.Ranges[0].Min;
    const max = pcr.Ranges[pcr.Ranges.length - 1].Max;

    const cellRendererFunc: ICellRendererFunc = (params: ICellRendererParams) => {
      let value = params.value;

      if (Helper.objectNotExists(value)) {
        value = 0;
      }

      const clampedValue = clamp(value, min, max);
      const percentageValue = ((clampedValue - min) / (max - min)) * 100;
      const matchingRange = pcr.Ranges.find(r => r.Min <= clampedValue && r.Max >= clampedValue);

      const wrapperEl = document.createElement('div');
      wrapperEl.style.height = '100%';
      wrapperEl.style.display = 'flex';
      wrapperEl.style.flexDirection = 'column';
      wrapperEl.style.justifyContent = 'center';

      const barEl = document.createElement('div');
      barEl.style.background = pcr.BackColor || '#cccccc';
      barEl.style.height = pcr.ShowValue ? '10px' : '20px';

      const barInsideEl = document.createElement('div');
      barInsideEl.style.background = matchingRange.Color;
      barInsideEl.style.height = pcr.ShowValue ? '10px' : '20px';
      barInsideEl.style.width = `${percentageValue.toFixed(0)}%`;

      const textEl = document.createElement('div');
      textEl.style.lineHeight = '1';
      if (pcr.DisplayRawValue && pcr.DisplayPercentageValue)
        textEl.innerText = `${value} (${percentageValue.toFixed(0)}%)`;
      else if (pcr.DisplayRawValue) textEl.innerText = value;
      else if (pcr.DisplayPercentageValue) textEl.innerText = `${percentageValue.toFixed(0)}%`;

      barEl.append(barInsideEl);
      wrapperEl.append(barEl);
      if (pcr.ShowValue) wrapperEl.append(textEl);

      return wrapperEl;
    };

    return cellRendererFunc;
  }

  public getCleanValue(value: string): string | undefined {
    if (value == null || value == 'null' || value == undefined || value == 'undefined') {
      return undefined;
    }
    return String(value) || '';
  }

  public getRenderedValue(percentBars: PercentBar[], colDef: ColDef, valueToRender: any): any {
    const isRenderedColumn = ArrayExtensions.ContainsItem(percentBars, colDef.field);
    if (isRenderedColumn) {
      return valueToRender;
    }

    const render: any = colDef.cellRenderer;
    if (typeof render === 'string') {
      return this.getCleanValue(valueToRender);
    }
    return render({ value: valueToRender }) || '';
  }

  public createAdaptableColumnFromVendorColumn(vendorColumn: Column): AdaptableColumn {
    const colId: string = vendorColumn.getColId();
    const colDef: ColDef = vendorColumn.getColDef();
    const abColumn: AdaptableColumn = {
      Uuid: createUuid(),
      ColumnId: colId,
      FriendlyName: this.gridOptions.columnApi!.getDisplayNameForColumn(vendorColumn, 'header'),
      DataType: this.getColumnDataType(vendorColumn),
      Visible: vendorColumn.isVisible(),
      ReadOnly: this.isColumnReadonly(colDef),
      Sortable: this.isColumnSortable(colDef),
      Filterable: this.isColumnFilterable(colDef),
      IsSparkline: this.adaptable.api.sparklineColumnApi.isSparklineColumn(colId),
      Groupable: this.isColumnGroupable(colDef),
      Pivotable: this.isColumnPivotable(colDef),
      Aggregatable: this.isColumnAggregetable(colDef),
      SpecialColumn: false,
      IsExcludedFromQuickSearch: false,
    };
    // lets set this here one as the function cannot change the result so dont need to run it each time
    let excludeColumnFromQuickSearch = this.adaptable.adaptableOptions.searchOptions!
      .excludeColumnFromQuickSearch;
    if (excludeColumnFromQuickSearch) {
      if (excludeColumnFromQuickSearch(abColumn)) {
        abColumn.IsExcludedFromQuickSearch = true;
      }
    }
    return abColumn;
  }

  public createAdaptableSideBarDefs(
    showFilterPanel: boolean,
    showColumnsPanel: boolean
  ): SideBarDef {
    const toolPanelDef: ToolPanelDef[] = [];

    if (showFilterPanel) {
      const filterToolPanel: ToolPanelDef = {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      };
      toolPanelDef.push(filterToolPanel);
    }

    if (showColumnsPanel) {
      const columnsToolPanel: ToolPanelDef = {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      };
      toolPanelDef.push(columnsToolPanel);
    }
    toolPanelDef.push(this.createAdaptableToolPanel());

    const abSideBarDef: SideBarDef = {
      toolPanels: toolPanelDef,
      defaultToolPanel: '', // for now we wont show an open (default) tool panel in this scenario - might revisit
    };
    return abSideBarDef;
  }

  public createAdaptableToolPanel(): ToolPanelDef {
    return {
      id: 'AdaptableToolPanel',
      labelDefault: this.adaptable.adaptableOptions.userInterfaceOptions.adaptableToolPanelTitle,
      labelKey: 'AdaptableToolPanel',
      iconKey: 'menu',
      toolPanel: 'AdaptableToolPanel',
    };
  }

  // This method reselects cells - only IF they are in a single column
  // Might be able to change that later
  // We do this by gettng the selected cells, clearing the selection and then re-applying
  public reselectSelectedCells(): void {
    const selectedCellRanges: CellRange[] = this.gridOptions.api!.getCellRanges();

    if (ArrayExtensions.CorrectLength(selectedCellRanges, 1)) {
      const selectedCellRange: CellRange = selectedCellRanges[0];
      const cellRangeParams: CellRangeParams = {
        rowStartIndex: selectedCellRange.startRow.rowIndex,
        rowEndIndex: selectedCellRange.endRow.rowIndex,
        columns: selectedCellRange.columns,
      };
      this.gridOptions.api!.clearRangeSelection();
      this.gridOptions.api!.addCellRange(cellRangeParams);
    }
  }

  public clearRowStyles(): void {
    this.gridOptions.rowStyle = undefined;
    this.gridOptions.rowClass = undefined;
    this.gridOptions.getRowClass = undefined;
    this.gridOptions.getRowStyle = undefined;
  }

  public setUpRowStyles(): void {
    const rowStyles: RowStyle[] = this.adaptable.api.userInterfaceApi.getUserInterfaceState()
      .RowStyles;
    if (ArrayExtensions.IsNotNullOrEmpty(rowStyles)) {
      // First lets deal with Alls - we will get the first one and then get out
      const allRowStyle = rowStyles.find(rs => rs.RowType == 'All');
      if (allRowStyle) {
        if (StringExtensions.IsNotNullOrEmpty(allRowStyle.Style.ClassName)) {
          // we have a row style name so we can just set that for the whole grid and no need to use the function
          this.gridOptions.rowClass = allRowStyle.Style.ClassName;
        } else {
          // no row style name so se the rowstyle - again no need to use a function
          this.gridOptions.rowStyle = {
            background: allRowStyle.Style.BackColor,
            color: allRowStyle.Style.ForeColor,
            fontWeight: allRowStyle.Style.FontWeight,
            fontStyle: allRowStyle.Style.FontStyle,
          };
        }
      } else {
        // we dont have an all row style so now things get hard and we need to see if we have one alternating style or 2
        const evenRowStyle = rowStyles.find(rs => rs.RowType == 'Even');
        const oddRowStyle = rowStyles.find(rs => rs.RowType == 'Odd');

        // this logic feels a bit OTT but the idea is to avoid having to create this getRowClass or getRowStyle functions when not needed.
        const evenRowStyleName: string = evenRowStyle && evenRowStyle.Style.ClassName;
        const oddRowStyleName: string = oddRowStyle && oddRowStyle.Style.ClassName;

        const emptyEvenRowStyleName = StringExtensions.IsNullOrEmpty(evenRowStyleName);
        const emptyOddRowStyleName = StringExtensions.IsNullOrEmpty(oddRowStyleName);

        const atLeastOneNormalStyle: boolean =
          (evenRowStyle && emptyEvenRowStyleName) || (oddRowStyle && emptyOddRowStyleName);

        if (evenRowStyleName || oddRowStyleName) {
          this.gridOptions.getRowClass = function(params) {
            if (evenRowStyleName) {
              if (params.node.rowIndex % 2 === 0) {
                return evenRowStyleName;
              }
            }
            if (oddRowStyleName) {
              if (params.node.rowIndex % 2 === 1) {
                return oddRowStyleName;
              }
            }
          };
        }

        if (atLeastOneNormalStyle) {
          this.gridOptions.getRowStyle = function(params: any) {
            if (evenRowStyle && emptyEvenRowStyleName) {
              if (params.node.rowIndex % 2 === 0) {
                return {
                  background: evenRowStyle.Style.BackColor,
                  color: evenRowStyle.Style.ForeColor,
                  fontWeight: evenRowStyle.Style.FontWeight,
                  fontStyle: evenRowStyle.Style.FontStyle,
                };
              }
            }

            if (oddRowStyle && emptyOddRowStyleName) {
              if (params.node.rowIndex % 2 === 1) {
                return {
                  background: oddRowStyle.Style.BackColor,
                  color: oddRowStyle.Style.ForeColor,
                  fontWeight: oddRowStyle.Style.FontWeight,
                  fontStyle: oddRowStyle.Style.FontStyle,
                };
              }
            }
          };
        }
      }
    }
  }

  public fireSelectionChangedEvent(): void {
    let selectionChangedInfo: SelectionChangedInfo = {
      selectedCellInfo: this.adaptable.api.gridApi.getGridState().SelectedCellInfo,
      selectedRowInfo: this.adaptable.api.gridApi.getGridState().SelectedRowInfo,
      adaptableApi: this.adaptable.api,
    };
    const selectionChangedArgs: SelectionChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Selection Changed Args',
      selectionChangedInfo
    );
    this.adaptable.api.eventApi.emit('SelectionChanged', selectionChangedArgs);
  }

  public createMenuInfo(params: GetContextMenuItemsParams, column: AdaptableColumn): MenuInfo {
    // lets build a picture of what has been right clicked.  Will take time to get right but lets start
    const colId = params.column.getColId();
    const primaryKeyValue = this.adaptable.getPrimaryKeyValueFromRowNode(params.node);
    let isSingleSelectedColumn: boolean = false;
    let isSelectedCell: boolean = false;
    let clickedCell: GridCell = {
      columnId: colId,
      rawValue: params.value,
      displayValue: this.adaptable.getDisplayValueFromRowNode(params.node, colId),
      primaryKeyValue: primaryKeyValue,
    };
    let selectedCellInfo: SelectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
    if (selectedCellInfo) {
      let matchedCell: GridCell = selectedCellInfo.GridCells.find(
        gc =>
          gc != null &&
          gc.columnId == clickedCell.columnId &&
          gc.primaryKeyValue == clickedCell.primaryKeyValue
      );

      isSelectedCell = matchedCell != null;
      if (isSelectedCell) {
        isSingleSelectedColumn = ArrayExtensions.CorrectLength(selectedCellInfo.Columns, 1);
      }
    }
    let selectedRowInfo: SelectedRowInfo = this.adaptable.api.gridApi.getSelectedRowInfo();

    return {
      IsSelectedCell: isSelectedCell,
      GridCell: clickedCell,
      Column: column,
      RowNode: params.node,
      IsGroupedNode: params.node ? params.node.group : false,
      IsSingleSelectedColumn: isSingleSelectedColumn,
      PrimaryKeyValue: primaryKeyValue,
      AdaptableApi: this.adaptable.api,

      SelectedCellInfo: selectedCellInfo,

      SelectedRowInfo: selectedRowInfo,
    };
  }

  public createAgGridMenuDefFromAdaptableMenu(x: AdaptableMenuItem): MenuItemDef {
    return {
      name: x.Label,
      action: x.ClickFunction
        ? x.ClickFunction
        : () => this.adaptable.api.internalApi.dispatchReduxAction(x.ReduxAction),
      icon: iconToString(x.Icon, {
        style: {
          fill: 'var(--ab-color-text-on-primary)',
        },
      }),
    };
  }

  public createAgGridMenuDefFromUsereMenu(
    x: UserMenuItem,
    menuInfo: MenuInfo,
    type: 'contextMenu' | 'columnMenu'
  ): MenuItemDef {
    const fn = this.adaptable.getUserFunctionHandler(
      type === 'contextMenu' ? 'UserMenuItemClickedFunction' : 'UserMenuItemClickedFunction',
      x.UserMenuItemClickedFunction
    );
    return {
      name: x.Label,
      action: () => fn(menuInfo),
      icon: x.Icon,
      subMenu: ArrayExtensions.IsNullOrEmpty(x.SubMenuItems)
        ? undefined
        : x.SubMenuItems!.map(s => {
            return this.createAgGridMenuDefFromUsereMenu(s, menuInfo, type);
          }),
    };
  }

  public isColumnReadonly(colDef: ColDef): boolean {
    // currently we do not support the fact that some rows are editable and some are not
    // if editable is a function then we return that its not readonly since we assume that some rowNode will be editable
    // that's wrong but we ll see if we face the issue later
    if (colDef && typeof colDef.editable === 'boolean') {
      return !colDef.editable;
    }
    return true;
  }

  public isColumnSortable(colDef: ColDef): boolean {
    if (colDef && colDef.sortable != null) {
      return colDef.sortable;
    }
    return false;
  }

  public isColumnGroupable(colDef: ColDef): boolean {
    if (colDef && colDef.enableRowGroup != null) {
      return colDef.enableRowGroup;
    }
    return false;
  }

  public isColumnPivotable(colDef: ColDef): boolean {
    if (colDef && colDef.enablePivot != null) {
      return colDef.enablePivot;
    }
    return false;
  }

  public isColumnAggregetable(colDef: ColDef): boolean {
    if (colDef && colDef.enableValue != null) {
      return colDef.enableValue;
    }
    return false;
  }

  public isColumnFilterable(colDef: ColDef): boolean {
    // follow agGrid logic which is that ONLY filterable if one explicitly set
    return colDef != null && colDef.filter != null && colDef.filter != false;
  }

  public getColumnDataType(
    column: Column
  ): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown' {
    // Some columns can have no ID or Title. we return string as a consequence but it needs testing
    if (!column) {
      LoggingHelper.LogAdaptableWarning('column is undefined returning String for Type');
      return DataType.String;
    }
    let dataType: any = DataType.Unknown;
    // get the column type if already in store (and not unknown)
    const existingColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
      column.getId(),
      this.adaptable.api.gridApi.getColumns()
    );
    if (existingColumn && existingColumn.DataType != DataType.Unknown) {
      return existingColumn.DataType;
    }

    // check for column type
    const colType: any = column.getColDef().type;
    if (colType) {
      if (Array.isArray(colType)) {
        colType.forEach((c: string) => {
          if (dataType == DataType.Unknown) {
            dataType = this.getabColDefValue(c);
          }
        });
      } else {
        dataType = this.getabColDefValue(colType);
      }
      if (dataType != DataType.Unknown) {
        return dataType;
      }
    }

    const model = this.gridOptions.api!.getModel();
    if (model == null) {
      LoggingHelper.LogAdaptableWarning(
        `No model so returning type "Unknown" for Column: "${column.getColId()}"`
      );
      return DataType.Unknown;
    }

    let row = model.getRow(0);

    if (row == null) {
      // possible that there will be no data.
      LoggingHelper.LogAdaptableWarning(
        `No data in grid so returning type "Unknown" for Column: "${column.getColId()}"`
      );
      return DataType.Unknown;
    }
    // if it's a group we need the content of the group
    if (row.group) {
      const childNodes: RowNode[] = row.childrenAfterGroup;
      if (ArrayExtensions.IsNullOrEmpty(childNodes)) {
        LoggingHelper.LogAdaptableWarning(
          `No data in grid so returning type "Unknown" for Column: "${column.getColId()}"`
        );
        return DataType.Unknown;
      }
      row = childNodes[0];
    }
    const value = this.gridOptions.api!.getValue(column, row);
    if (value instanceof Date) {
      dataType = DataType.Date;
    } else if (Array.isArray(value) && value.length && typeof value[0] === 'number') {
      dataType = DataType.NumberArray;
    } else {
      switch (typeof value) {
        case 'string':
          dataType = DataType.String;
          break;
        case 'number':
          dataType = DataType.Number;
          break;
        case 'boolean':
          dataType = DataType.Boolean;
          break;
        case 'object':
          dataType = DataType.Object;
          break;
        default:
          break;
      }
    }
    LoggingHelper.LogAdaptableWarning(
      `No defined type for column '${column.getColId()}'. Defaulting to type of first value: ${dataType}`
    );
    return dataType;
  }

  private getabColDefValue(
    colType: string
  ): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown' {
    if (colType == 'numericColumn') {
      return DataType.Number;
    }
    if (colType.startsWith('abColDef')) {
      switch (colType) {
        case 'abColDefNumber':
          return DataType.Number;
        case 'abColDefNumberArray':
          return DataType.NumberArray;
        case 'abColDefString':
          return DataType.String;
        case 'abColDefBoolean':
          return DataType.Boolean;
        case 'abColDefDate':
          return DataType.Date;
        case 'abColDefObject':
          return DataType.Object;
        default:
          return DataType.Unknown;
      }
    }
    return DataType.Unknown;
  }

  public getAgGridDataType(dataType: DataType): string {
    switch (dataType) {
      case DataType.Boolean:
        return 'abColDefBoolean';
      case DataType.Date:
        return 'abColDefDate';
      case DataType.Number:
        return 'abColDefNumber';
      case DataType.NumberArray:
        return 'abColDefNumberArray';
      case DataType.Object:
        return 'abColDefObject';
      case DataType.String:
        return 'abColDefString';
      case DataType.All:
      case DataType.Unknown:
        return 'abColDefCustom';
    }
  }

  public isModulePresent(moduleName: string): boolean {
    let modules: Module[] = ModuleRegistry.getRegisteredModules();
    let moduleNames: string[] = modules.map(m => m.moduleName);
    return ArrayExtensions.ContainsAnyItem(moduleNames, [
      `@ag-grid-enterprise/${moduleName}`,
      '@ag-grid-enterprise/all-modules',
    ]);
  }

  public createGroupedColumnCustomSort(): void {
    const groupedColumn: Column = this.gridOptions.columnApi
      .getAllColumns()
      .find(c => c.isRowGroupActive() == true);
    if (groupedColumn) {
      const customSort: CustomSort = this.adaptable.api.customSortApi
        .getAllCustomSort()
        .find(cs => cs.ColumnId == groupedColumn.getColId());
      if (customSort) {
        if (
          !this.adaptable.api.gridApi
            .getColumnSorts()
            .find((gs: ColumnSort) => ColumnHelper.isSpecialColumn(gs.Column))
        ) {
          const customSortStrategy: CustomSortStrategy = this.adaptable.strategies.get(
            StrategyConstants.CustomSortStrategyId
          ) as CustomSortStrategy;
          const groupCustomSort: CustomSort = ObjectFactory.CreateEmptyCustomSort();
          groupCustomSort.ColumnId = AG_GRID_GROUPED_COLUMN;
          groupCustomSort.SortedValues = customSort.SortedValues;

          const customSortComparerFunction: AdaptableComparerFunction = customSort.CustomSortComparerFunction
            ? this.adaptable.getUserFunctionHandler(
                'CustomSortComparerFunction',
                customSort.CustomSortComparerFunction
              )
            : customSortStrategy.getComparerFunction(groupCustomSort);
          this.adaptable.setCustomSort(AG_GRID_GROUPED_COLUMN, customSortComparerFunction);
        }
      }
    }
  }

  public checkShouldClearExistingFiltersOrSearches(): void {
    // if they have selected to clear column filters on startup then do it
    if (this.adaptable.adaptableOptions.filterOptions!.clearFiltersOnStartUp) {
      if (
        ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.columnFilterApi.getAllColumnFilter())
      ) {
        LoggingHelper.LogWarning(
          'Clearing existing Column Filters as "clearFiltersOnStartUp" is true'
        );
        this.adaptable.api.columnFilterApi.clearAllColumnFilter();
      }
    }
    // if they have selected to clear searches on startup then do it
    if (this.adaptable.adaptableOptions.searchOptions!.clearSearchesOnStartUp) {
      if (
        StringExtensions.IsNotNullOrEmpty(
          this.adaptable.api.quickSearchApi.getQuickSearchState().QuickSearchText
        ) ||
        ArrayExtensions.IsNotNullOrEmpty(
          this.adaptable.api.advancedSearchApi.getAllAdvancedSearch()
        ) ||
        ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.dataSourceApi.getAllDataSource())
      ) {
        LoggingHelper.LogWarning('Clearing existing Searches as "clearSearchesOnStartUp" is true');
        this.adaptable.api.quickSearchApi.clearQuickSearch();
        this.adaptable.api.advancedSearchApi.clearAdvancedSearch();
        this.adaptable.api.dataSourceApi.clearDataSource();
      }
    }
  }

  public runAdaptableNodeComparerFunction(): AdaptableNodeComparerFunction {
    let adaptable = this.adaptable;
    return function compareItemsOfCustomSort(nodeA: any, nodeB: any): number {
      let columnValues: any[] = [];
      let firstGroupedColumn: AdaptableColumn = adaptable.getFirstGroupedColumn();
      if (firstGroupedColumn) {
        // see if its a custom sort
        let customSort: CustomSort = adaptable.api.customSortApi.getCustomSortByColumn(
          firstGroupedColumn.ColumnId
        );
        if (customSort) {
          if (ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)) {
            columnValues = customSort.SortedValues;
          } else {
            const customSortComparerFunction: AdaptableComparerFunction = adaptable.getUserFunctionHandler(
              'CustomSortComparerFunction',
              customSort.CustomSortComparerFunction
            );
            return customSortComparerFunction(nodeA.key, nodeB.key, nodeA, nodeB);
          }
        }
      }
      let firstElementValueString = nodeA.key;
      let secondElementValueString = nodeB.key;

      let indexFirstElement = columnValues.indexOf(firstElementValueString);
      let containsFirstElement = indexFirstElement >= 0;
      let indexSecondElement = columnValues.indexOf(secondElementValueString);
      let containsSecondElement = indexSecondElement >= 0;
      //if none of the element are in the list we jsut return normal compare
      if (!containsFirstElement && !containsSecondElement) {
        if (firstElementValueString == secondElementValueString) {
          return 0;
        }
        return firstElementValueString < secondElementValueString ? -1 : 1;
      }
      //if first item not in the list make sure we put it after the second item
      if (!containsFirstElement) {
        return 1;
      }
      //if second item not in the list make sure we put it after the first item
      if (!containsSecondElement) {
        return -1;
      }

      //return the comparison from the list if the two items are in the list
      return indexFirstElement - indexSecondElement;
    };
  }
}
