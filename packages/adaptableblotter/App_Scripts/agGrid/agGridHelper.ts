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
} from 'ag-grid-community';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IStrategy } from '../Strategy/Interface/IStrategy';
import { AlertStrategy } from '../Strategy/AlertStrategy';
import { AdvancedSearchStrategy } from '../Strategy/AdvancedSearchStrategy';
import { ApplicationStrategy } from '../Strategy/ApplicationStrategy';
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
import { DataManagementStrategy } from '../Strategy/DataManagementStrategy';
import { DataSourceStrategy } from '../Strategy/DataSourceStrategy';
import { ExportStrategy } from '../Strategy/ExportStrategy';
import { FlashingCellStrategyagGrid } from './Strategy/FlashingCellsStrategyagGrid';
import { FormatColumnStrategyagGrid } from './Strategy/FormatColumnStrategyagGrid';
import { FreeTextColumnStrategy } from '../Strategy/FreeTextColumnStrategy';
import { HomeStrategy } from '../Strategy/HomeStrategy';
import { LayoutStrategy } from '../Strategy/LayoutStrategy';
import { ColumnCategoryStrategy } from '../Strategy/ColumnCategoryStrategy';
import { PercentBarStrategy } from '../Strategy/PercentBarStrategy';
import { PieChartStrategy } from '../Strategy/PieChartStrategy';
import { PlusMinusStrategy } from '../Strategy/PlusMinusStrategy';
import { QuickSearchStrategy } from '../Strategy/QuickSearchStrategy';
import { SmartEditStrategy } from '../Strategy/SmartEditStrategy';
import { ShortcutStrategy } from '../Strategy/ShortcutStrategy';
import { TeamSharingStrategy } from '../Strategy/TeamSharingStrategy';
import { ThemeStrategy } from '../Strategy/ThemeStrategy';
import { CellSummaryStrategy } from '../Strategy/CellSummaryStrategy';
import { UserFilterStrategy } from '../Strategy/UserFilterStrategy';
import { ReminderStrategy } from '../Strategy/ReminderStrategy';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { AdaptableBlotter } from './AdaptableBlotter';
import { PercentBar } from '../PredefinedConfig/RunTimeState/PercentBarState';
import { RowStyle } from '../PredefinedConfig/DesignTimeState/UserInterfaceState';
import { SelectionChangedEventArgs } from '../Api/Events/BlotterEvents';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
} from '../Utilities/Interface/AdaptableBlotterMenu';
import { iconToString } from '../components/icons';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { IColumn } from '../Utilities/Interface/IColumn';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';

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

  public setUpStrategies(): Map<string, IStrategy> {
    let strategies = new Map<string, IStrategy>();
    let blotter = this.blotter as AdaptableBlotter;
    strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategy(blotter));
    strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy(blotter));
    strategies.set(StrategyConstants.ApplicationStrategyId, new ApplicationStrategy(blotter));
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
    strategies.set(StrategyConstants.DataManagementStrategyId, new DataManagementStrategy(blotter));
    strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy(blotter));
    strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy(blotter));
    strategies.set(
      StrategyConstants.FlashingCellsStrategyId,
      new FlashingCellStrategyagGrid(blotter)
    );
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
    strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy(blotter));
    strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy(blotter));
    strategies.set(StrategyConstants.CellSummaryStrategyId, new CellSummaryStrategy(blotter));
    strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy(blotter));
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
    let primaryKey: any = this.blotter.blotterOptions.primaryKey;
    // otherwise lets set the Id so that it returns the primaryKey
    this.gridOptions.getRowNodeId = function(data) {
      return data[primaryKey];
    };
    return true;
  }

  public createPercentBarCellRendererFunc(pcr: PercentBar, blotterId: string): ICellRendererFunc {
    let showNegatives: boolean = pcr.MinValue < 0;
    let showPositives: boolean = pcr.MaxValue > 0;

    let cellRendererFunc: ICellRendererFunc = (params: ICellRendererParams) => {
      let isNegativeValue: boolean = params.value < 0;
      let value = params.value;

      let maxValue = StringExtensions.IsNotNullOrEmpty(pcr.MaxValueColumnId)
        ? this.blotter.getRawValueFromRecord(params.node, pcr.MaxValueColumnId)
        : pcr.MaxValue;
      let minValue = StringExtensions.IsNotNullOrEmpty(pcr.MinValueColumnId)
        ? this.blotter.getRawValueFromRecord(params.node, pcr.MinValueColumnId)
        : pcr.MinValue;

      if (isNegativeValue) {
        value = value * -1;
      }
      let percentagePositiveValue = (100 / maxValue) * value;
      let percentageNegativeValue = (100 / (minValue * -1)) * value;

      if (showNegatives && showPositives) {
        // if need both then half the space
        percentagePositiveValue = percentagePositiveValue / 2;
        percentageNegativeValue = percentageNegativeValue / 2;
      }

      let eOuterDiv = document.createElement('div');
      eOuterDiv.className = 'ab_div-colour-render-div';
      if (pcr.ShowValue) {
        let showValueBar = document.createElement('div');
        showValueBar.id = 'ab_div-colour-render-text_' + blotterId + '_' + pcr.ColumnId;
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
        let fullWidth = showPositives ? 50 : 100;

        let negativeDivBlankBar = document.createElement('div');
        negativeDivBlankBar.className = 'ab_div-colour-render-bar';
        negativeDivBlankBar.id = 'ab_div-colour-blank-bar_' + blotterId + '_' + pcr.ColumnId;
        negativeDivBlankBar.style.width = fullWidth - percentageNegativeValue + '%';
        eOuterDiv.appendChild(negativeDivBlankBar);

        let negativeDivPercentBar = document.createElement('div');
        negativeDivPercentBar.className = 'ab_div-colour-render-bar';
        negativeDivBlankBar.id = 'ab_div-colour-negative-bar_' + blotterId + '_' + pcr.ColumnId;
        negativeDivPercentBar.style.width = percentageNegativeValue + '%';
        if (isNegativeValue) {
          negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
        }
        eOuterDiv.appendChild(negativeDivPercentBar);
      }

      if (showPositives) {
        let positivePercentBarDiv = document.createElement('div');
        positivePercentBarDiv.className = 'ab_div-colour-render-bar';
        positivePercentBarDiv.id = 'ab_div-colour-positive-bar_' + blotterId + '_' + pcr.ColumnId;
        positivePercentBarDiv.style.width = percentagePositiveValue + '%';
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
    } else {
      return String(value) || '';
    }
  }

  public getRenderedValue(percentBars: PercentBar[], colDef: ColDef, valueToRender: any): any {
    let isRenderedColumn = ArrayExtensions.ContainsItem(percentBars, colDef.field);
    if (isRenderedColumn) {
      return valueToRender;
    }

    let render: any = colDef.cellRenderer;
    if (typeof render == 'string') {
      return this.getCleanValue(valueToRender);
    }
    return render({ value: valueToRender }) || '';
  }

  public safeSetColDefs(colDefs: ColDef[]) {
    // bizarrely we need this line otherwise ag-Grid mangles the ColIds (e.g. 'tradeId' becomes 'tradeId_1')
    this.gridOptions.api!.setColumnDefs([]);
    this.gridOptions.api!.setColumnDefs(colDefs);
  }

  public createAdaptableBlotterSideBarDefs(
    showFilterPanel: boolean,
    showColumnsPanel: boolean
  ): SideBarDef {
    let toolPanelDef: ToolPanelDef[] = [];

    if (showFilterPanel) {
      let filterToolPanel: ToolPanelDef = {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      };
      toolPanelDef.push(filterToolPanel);
    }

    if (showColumnsPanel) {
      let columnsToolPanel: ToolPanelDef = {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      };
      toolPanelDef.push(columnsToolPanel);
    }
    toolPanelDef.push(this.createAdaptableBlotterToolPanel());

    let abSideBarDef: SideBarDef = {
      toolPanels: toolPanelDef,
      defaultToolPanel: '', // for now we wont show an open (default) tool panel in this scenario - might revisit
    };
    return abSideBarDef;
  }

  public createAdaptableBlotterToolPanel(): ToolPanelDef {
    return {
      id: 'adaptableBlotterToolPanel',
      labelDefault: 'Adaptable Blotter',
      labelKey: 'adaptableBlotterToolPanel',
      iconKey: 'menu',
      toolPanel: 'adaptableBlotterToolPanel',
    };
  }

  // This method reselects cells - only IF they are in a single column
  // Might be able to change that later
  // We do this by gettng the selected cells, clearing the selection and then re-applying
  public reselectSelectedCells(): void {
    let selectedCellRanges: CellRange[] = this.gridOptions.api!.getCellRanges();

    if (ArrayExtensions.CorrectLength(selectedCellRanges, 1)) {
      let selectedCellRange: CellRange = selectedCellRanges[0];
      let cellRangeParams: CellRangeParams = {
        rowStartIndex: selectedCellRange.startRow.rowIndex,
        rowEndIndex: selectedCellRange.endRow.rowIndex,
        columns: selectedCellRange.columns,
      };
      this.gridOptions.api!.clearRangeSelection();

      this.gridOptions.api!.addCellRange(cellRangeParams);
    }
  }

  public setUpRowStyles(): void {
    let rowStyles: RowStyle[] = this.blotter.api.userInterfaceApi.getUserInterfaceState().RowStyles;
    if (ArrayExtensions.IsNotNullOrEmpty(rowStyles)) {
      // First lets deal with Alls - we will get the first one and then get out
      let allRowStyle = rowStyles.find(rs => rs.RowType == 'All');
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
        let evenRowStyle = rowStyles.find(rs => rs.RowType == 'Even');
        let oddRowStyle = rowStyles.find(rs => rs.RowType == 'Odd');

        // this logic feels a bit OTT but the idea is to avoid having to create this getRowClass or getRowStyle functions when not needed.
        let evenRowStyleName: string = evenRowStyle && evenRowStyle.Style.ClassName;
        let oddRowStyleName: string = oddRowStyle && oddRowStyle.Style.ClassName;

        let emptyEvenRowStyleName = StringExtensions.IsNullOrEmpty(evenRowStyleName);
        let emptyOddRowStyleName = StringExtensions.IsNullOrEmpty(oddRowStyleName);

        let atLeastOneNormalStyle: boolean =
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
    let selectionChangedArgs: SelectionChangedEventArgs = {
      selectedCellInfo: this.blotter.api.gridApi.getGridState().SelectedCellInfo,
      selectedRowInfo: this.blotter.api.gridApi.getGridState().SelectedRowInfo,
    };
    this.blotter.api.eventApi._onSelectionChanged.Dispatch(this.blotter, selectionChangedArgs);
  }

  public getContextMenuInfo(params: GetContextMenuItemsParams, column: IColumn): ContextMenuInfo {
    // lets build a picture of what has been right clicked.  Will take time to get right but lets start

    const colId = params.column.getColId();
    const primaryKeyValue = this.blotter.getPrimaryKeyValueFromRecord(params.node);
    let isSelectedColumn: boolean = false;
    let clickedCell: GridCell = {
      columnId: colId,
      value: params.value,
      primaryKeyValue: primaryKeyValue,
    };
    let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    let matchedCell: GridCell = selectedCellInfo.GridCells.find(
      gc =>
        gc != null &&
        gc.columnId == clickedCell.columnId &&
        gc.primaryKeyValue == clickedCell.primaryKeyValue
    );
    let isSelectedCell: boolean = matchedCell != null;
    if (isSelectedCell) {
      isSelectedColumn = ArrayExtensions.CorrectLength(selectedCellInfo.Columns, 1);
    }

    return {
      isSelectedCell: isSelectedCell,
      currentCell: clickedCell,
      column: column,
      isSelectedColumn: isSelectedColumn,
    };
  }

  public createAgGridMenuDef(x: AdaptableBlotterMenuItem): MenuItemDef {
    return {
      name: x.Label,
      action: () => this.blotter.api.internalApi.dispatchReduxAction(x.Action),
      icon: iconToString(x.GlyphIcon, {
        style: {
          fill: 'var(--ab-color-text-on-primary)',
        },
      }),
    };
  }
}
