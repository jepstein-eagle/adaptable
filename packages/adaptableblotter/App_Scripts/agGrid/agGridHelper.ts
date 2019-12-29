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
  ColGroupDef,
  Column,
  RowNode,
  GetMainMenuItemsParams,
} from 'ag-grid-community';
import * as Redux from 'redux';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IStrategy } from '../Strategy/Interface/IStrategy';
import { AlertStrategy } from '../Strategy/AlertStrategy';
import { AdvancedSearchStrategy } from '../Strategy/AdvancedSearchStrategy';
import { BulkUpdateStrategy } from '../Strategy/BulkUpdateStrategy';
import { CalculatedColumnStrategy } from '../Strategy/CalculatedColumnStrategy';
import { CalendarStrategy } from '../Strategy/CalendarStrategy';
import { CellValidationStrategy } from '../Strategy/CellValidationStrategy';
import { ChartStrategy } from '../Strategy/ChartStrategy';
import { ColumnChooserStrategy } from '../Strategy/ColumnChooserStrategy';
import { ColumnFilterStrategy } from '../Strategy/ColumnFilterStrategy';
import { ColumnInfoStrategy } from '../Strategy/ColumnInfoStrategy';
import { ConditionalStyleStrategyagGrid } from './Strategy/ConditionalStyleStrategyagGrid';
import { CustomSortStrategyagGrid } from './Strategy/CustomSortStrategyagGrid';
import { DashboardStrategy } from '../Strategy/DashboardStrategy';
import { StateManagementStrategy } from '../Strategy/StateManagementStrategy';
import { DataSourceStrategy } from '../Strategy/DataSourceStrategy';
import { ExportStrategy } from '../Strategy/ExportStrategy';
import { FlashingCellStrategyagGrid } from './Strategy/FlashingCellsStrategyagGrid';
import { FormatColumnStrategyagGrid } from './Strategy/FormatColumnStrategyagGrid';
import { FreeTextColumnStrategy } from '../Strategy/FreeTextColumnStrategy';
import { HomeStrategy } from '../Strategy/HomeStrategy';
import { LayoutStrategy } from '../Strategy/LayoutStrategy';
import { ColumnCategoryStrategy } from '../Strategy/ColumnCategoryStrategy';
import { PercentBarStrategy } from '../Strategy/PercentBarStrategy';
import { SparklineColumnStrategy } from '../Strategy/SparklineColumnStrategy';
import { SparklineStrategy } from '../Strategy/SparklineStrategy';
import { PieChartStrategy } from '../Strategy/PieChartStrategy';
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
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotter } from './AdaptableBlotter';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { RowStyle, UserMenuItem } from '../PredefinedConfig/UserInterfaceState';
import LoggingHelper from '../Utilities/Helpers/LoggingHelper';
import ColumnHelper from '../Utilities/Helpers/ColumnHelper';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AlertStrategyagGrid } from './Strategy/AlertStrategyagGrid';
import { UpdatedRowStrategyagGrid } from './Strategy/UpdatedRowStrategyagGrid';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { getSparklineRendererForColumn } from './SparklineColumnRenderer';
import Helper from '../Utilities/Helpers/Helper';
import { SelectionChangedInfo, SelectionChangedEventArgs } from '../Api/Events/SelectionChanged';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { iconToString } from '../components/icons';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { createUuid } from '../PredefinedConfig/Uuid';

/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */

// tslint:disable-next-line: class-name
export class agGridHelper {
  constructor(private blotter: IAdaptableBlotter, private gridOptions: GridOptions) {
    this.blotter = blotter;
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
    const blotter = this.blotter as AdaptableBlotter;
    strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategyagGrid(blotter));
    strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy(blotter));
    strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy(blotter));
    strategies.set(
      StrategyConstants.CalculatedColumnStrategyId,
      new CalculatedColumnStrategy(blotter)
    );
    strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy(blotter));
    strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy(blotter));
    strategies.set(StrategyConstants.ChartStrategyId, new ChartStrategy(blotter));
    strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy(blotter));
    strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy(blotter));
    strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy(blotter));
    strategies.set(
      StrategyConstants.ConditionalStyleStrategyId,
      new ConditionalStyleStrategyagGrid(blotter)
    );
    strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategyagGrid(blotter));
    strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy(blotter));
    strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy(blotter));
    strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy(blotter));
    strategies.set(
      StrategyConstants.FlashingCellsStrategyId,
      new FlashingCellStrategyagGrid(blotter)
    );
    strategies.set(StrategyConstants.UpdatedRowStrategyId, new UpdatedRowStrategyagGrid(blotter));
    strategies.set(
      StrategyConstants.FormatColumnStrategyId,
      new FormatColumnStrategyagGrid(blotter)
    );
    strategies.set(StrategyConstants.FreeTextColumnStrategyId, new FreeTextColumnStrategy(blotter));
    strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy(blotter));
    strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy(blotter));
    strategies.set(StrategyConstants.ColumnCategoryStrategyId, new ColumnCategoryStrategy(blotter));
    strategies.set(StrategyConstants.PercentBarStrategyId, new PercentBarStrategy(blotter));
    strategies.set(StrategyConstants.PieChartStrategyId, new PieChartStrategy(blotter));
    strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy(blotter));
    strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy(blotter));
    strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy(blotter));
    strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy(blotter));
    strategies.set(
      StrategyConstants.StateManagementStrategyId,
      new StateManagementStrategy(blotter)
    );
    strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy(blotter));
    strategies.set(StrategyConstants.SystemStatusStrategyId, new SystemStatusStrategy(blotter));
    strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy(blotter));
    strategies.set(StrategyConstants.CellSummaryStrategyId, new CellSummaryStrategy(blotter));
    strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy(blotter));
    strategies.set(
      StrategyConstants.SparklineColumnStrategyId,
      new SparklineColumnStrategy(blotter)
    );
    strategies.set(StrategyConstants.SparklineStrategyId, new SparklineStrategy(blotter));
    strategies.set(StrategyConstants.ReminderStrategyId, new ReminderStrategy(blotter));
    return strategies;
  }

  public TrySetUpNodeIds(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.blotter.blotterOptions.primaryKey)) {
      // if no valid pk then always false
      return false;
    }
    // need some way of checking if running on client on server: if on server then we return false
    if (this.gridOptions.getRowNodeId != null) {
      return true;
    }

    // also we can check if they have done it
    const primaryKey: any = this.blotter.blotterOptions.primaryKey;
    // otherwise lets set the Id so that it returns the primaryKey
    this.gridOptions.getRowNodeId = function(data) {
      return data[primaryKey];
    };
    return true;
  }

  public createSparklineCellRendererComp(
    sparkline: SparklineColumn,
    blotterId: string
  ): ICellRendererFunc {
    return getSparklineRendererForColumn(sparkline);
  }

  public createPercentBarCellRendererFunc(pcr: PercentBar, blotterId: string): ICellRendererFunc {
    const showNegatives: boolean = pcr.MinValue < 0;
    const showPositives: boolean = pcr.MaxValue > 0;

    const cellRendererFunc: ICellRendererFunc = (params: ICellRendererParams) => {
      const isNegativeValue: boolean = params.value < 0;
      let value = params.value;
      if (Helper.objectNotExists(value)) {
        value = 0;
      }

      const maxValue = StringExtensions.IsNotNullOrEmpty(pcr.MaxValueColumnId)
        ? this.blotter.getRawValueFromRowNode(params.node, pcr.MaxValueColumnId)
        : pcr.MaxValue;
      const minValue = StringExtensions.IsNotNullOrEmpty(pcr.MinValueColumnId)
        ? this.blotter.getRawValueFromRowNode(params.node, pcr.MinValueColumnId)
        : pcr.MinValue;

      if (isNegativeValue) {
        value *= -1;
      }
      let percentagePositiveValue = (100 / maxValue) * value;
      let percentageNegativeValue = (100 / (minValue * -1)) * value;

      if (showNegatives && showPositives) {
        // if need both then half the space
        percentagePositiveValue /= 2;
        percentageNegativeValue /= 2;
      }

      const eOuterDiv = document.createElement('div');
      eOuterDiv.className = 'ab_div-colour-render-div';
      if (pcr.ShowValue) {
        const showValueBar = document.createElement('div');
        showValueBar.id = `ab_div-colour-render-text_${blotterId}_${pcr.ColumnId}`;
        showValueBar.className = 'ab_div-colour-render-text';
        if (showNegatives && showPositives) {
          showValueBar.style.paddingLeft = isNegativeValue ? '50%' : '20%';
        } else {
          showValueBar.style.paddingLeft = '5px';
        }
        showValueBar.innerHTML = params.value;
        eOuterDiv.appendChild(showValueBar);
      }

      if (showNegatives) {
        const fullWidth = showPositives ? 50 : 100;

        const negativeDivBlankBar = document.createElement('div');
        negativeDivBlankBar.className = 'ab_div-colour-render-bar';
        negativeDivBlankBar.id = `ab_div-colour-blank-bar_${blotterId}_${pcr.ColumnId}`;
        negativeDivBlankBar.style.width = `${fullWidth - percentageNegativeValue}%`;
        eOuterDiv.appendChild(negativeDivBlankBar);

        const negativeDivPercentBar = document.createElement('div');
        negativeDivPercentBar.className = 'ab_div-colour-render-bar';
        negativeDivBlankBar.id = `ab_div-colour-negative-bar_${blotterId}_${pcr.ColumnId}`;
        negativeDivPercentBar.style.width = `${percentageNegativeValue}%`;
        if (isNegativeValue) {
          negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
        }
        eOuterDiv.appendChild(negativeDivPercentBar);
      }

      if (showPositives) {
        const positivePercentBarDiv = document.createElement('div');
        positivePercentBarDiv.className = 'ab_div-colour-render-bar';
        positivePercentBarDiv.id = `ab_div-colour-positive-bar_${blotterId}_${pcr.ColumnId}`;
        positivePercentBarDiv.style.width = `${percentagePositiveValue}%`;
        if (!isNegativeValue) {
          positivePercentBarDiv.style.backgroundColor = pcr.PositiveColor;
        }
        eOuterDiv.appendChild(positivePercentBarDiv);
      }
      return eOuterDiv;
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
      IsSparkline: this.blotter.api.sparklineColumnApi.isSparklineColumn(colId),
      Groupable: this.isColumnGroupable(colDef),
      Pivotable: this.isColumnPivotable(colDef),
      Aggregatable: this.isColumnAggregetable(colDef),
      SpecialColumn: false,
    };
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
      labelDefault: 'Adaptable',
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
    const rowStyles: RowStyle[] = this.blotter.api.userInterfaceApi.getUserInterfaceState()
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
      selectedCellInfo: this.blotter.api.gridApi.getGridState().SelectedCellInfo,
      selectedRowInfo: this.blotter.api.gridApi.getGridState().SelectedRowInfo,
    };
    const selectionChangedArgs: SelectionChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Selection Changed Args',
      selectionChangedInfo
    );
    this.blotter.api.eventApi.emit('SelectionChanged', selectionChangedArgs);
  }

  public createMenuInfo(params: GetContextMenuItemsParams, column: AdaptableColumn): MenuInfo {
    // lets build a picture of what has been right clicked.  Will take time to get right but lets start
    const colId = params.column.getColId();
    const primaryKeyValue = this.blotter.getPrimaryKeyValueFromRowNode(params.node);
    let isSingleSelectedColumn: boolean = false;
    let isSelectedCell: boolean = false;
    let clickedCell: GridCell = {
      columnId: colId,
      value: params.value,
      primaryKeyValue: primaryKeyValue,
    };
    let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
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

    return {
      isSelectedCell: isSelectedCell,
      gridCell: clickedCell,
      column: column,
      rowNode: params.node,
      isSingleSelectedColumn: isSingleSelectedColumn,
      primaryKeyValue: primaryKeyValue,
    };
  }

  public createAgGridMenuDefFromAdaptableMenu(x: AdaptableMenuItem): MenuItemDef {
    return {
      name: x.Label,
      action: x.ClickFunction
        ? x.ClickFunction
        : () => this.blotter.api.internalApi.dispatchReduxAction(x.ReduxAction),
      icon: iconToString(x.Icon, {
        style: {
          fill: 'var(--ab-color-text-on-primary)',
        },
      }),
    };
  }

  public createAgGridMenuDefFromUsereMenu(x: UserMenuItem, menuInfo: MenuInfo): MenuItemDef {
    return {
      name: x.Label,
      action: () => x.UserMenuItemClickedFunction(menuInfo),
      icon: x.Icon,
      subMenu: ArrayExtensions.IsNullOrEmpty(x.SubMenuItems)
        ? undefined
        : x.SubMenuItems!.map(s => {
            return this.createAgGridMenuDefFromUsereMenu(s, menuInfo);
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

  public getColumnDataType(column: Column): DataType {
    // Some columns can have no ID or Title. we return string as a consequence but it needs testing
    if (!column) {
      LoggingHelper.LogAdaptableWarning('column is undefined returning String for Type');
      return DataType.String;
    }
    let dataType: DataType = DataType.Unknown;
    // get the column type if already in store (and not unknown)
    const existingColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
      column.getId(),
      this.blotter.api.gridApi.getColumns()
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

  private getabColDefValue(colType: string): DataType {
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
}
