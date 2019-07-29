import {
  Grid,
  CellRange,
  CellRangeParams,
  PopupEditorWrapper,
  RefreshCellsParams,
  RedrawRowsParams,
  ColDefUtil,
} from 'ag-grid-community';
import 'ag-grid-enterprise';

import * as Emitter from 'emittery';

import * as Redux from 'redux';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {
  GridOptions,
  Column,
  RowNode,
  ICellEditor,
  ICellRendererFunc,
  SideBarDef,
} from 'ag-grid-community';
import { Events } from 'ag-grid-community/dist/lib/eventKeys';
import {
  NewValueParams,
  ValueGetterParams,
  ColDef,
  ValueFormatterParams,
} from 'ag-grid-community/dist/lib/entities/colDef';
import {
  GetMainMenuItemsParams,
  MenuItemDef,
  GetContextMenuItemsParams,
} from 'ag-grid-community/dist/lib/entities/gridOptions';
import { Action } from 'redux';
import { AdaptableBlotterApp } from '../View/AdaptableBlotterView';
import { IAdaptableBlotter, EmitterCallback } from '../Utilities/Interface/IAdaptableBlotter';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as StyleConstants from '../Utilities/Constants/StyleConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
// redux / store
import {
  IAdaptableBlotterStore,
  AdaptableBlotterState,
} from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableBlotterStore, INIT_STATE } from '../Redux/Store/AdaptableBlotterStore';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
// services
import { ICalendarService } from '../Utilities/Services/Interface/ICalendarService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../Utilities/Services/AuditLogService';
import { StyleService } from '../Utilities/Services/StyleService';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IFreeTextColumnService } from '../Utilities/Services/Interface/IFreeTextColumnService';
import { CalendarService } from '../Utilities/Services/CalendarService';
import { DataService } from '../Utilities/Services/DataService';
import { ValidationService } from '../Utilities/Services/ValidationService';
import { ChartService } from '../Utilities/Services/ChartService';
import { FreeTextColumnService } from '../Utilities/Services/FreeTextColumnService';
import { CalculatedColumnExpressionService } from '../Utilities/Services/CalculatedColumnExpressionService';
// strategies
import { IStrategyCollection } from '../Strategy/Interface/IStrategy';
import { IConditionalStyleStrategy } from '../Strategy/Interface/IConditionalStyleStrategy';
// components
import { FilterWrapperFactory } from './FilterWrapper';
import { FloatingFilterWrapperFactory } from './FloatingFilterWrapper';

import {
  DataType,
  SortOrder,
  DisplayAction,
  DistinctCriteriaPairValue,
  FilterOnDataChangeOptions,
  LeafExpressionOperator,
} from '../PredefinedConfig/Common/Enums';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { Color } from '../Utilities/color';
import { IPPStyle } from '../Utilities/Interface/Reports/IPPStyle';
import { IColumn } from '../Utilities/Interface/IColumn';
import { IBlotterApi } from '../Api/Interface/IBlotterApi';
import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { GridCell } from '../Utilities/Interface/SelectedCell/GridCell';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
// Helpers
import { iPushPullHelper } from '../Utilities/Helpers/iPushPullHelper';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { StyleHelper } from '../Utilities/Helpers/StyleHelper';
import { LayoutHelper } from '../Utilities/Helpers/LayoutHelper';
import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../Utilities/Helpers/Helper';

// ag-Grid
// if you add an import from a different folder for aggrid you need to add it to externals in the webpack prod file
import { Expression } from '../PredefinedConfig/Common/Expression/Expression';
import { RangeHelper } from '../Utilities/Helpers/RangeHelper';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import { BlotterApi } from '../Api/BlotterApi';
import {
  DEFAULT_LAYOUT,
  HALF_SECOND,
  BLOTTER_READY_EVENT,
  CELLS_SELECTED_EVENT,
  GRID_RELOADED_EVENT,
  SEARCH_APPLIED_EVENT,
  GRID_REFRESHED_EVENT,
  KEY_DOWN_EVENT,
} from '../Utilities/Constants/GeneralConstants';
import { CustomSortStrategyagGrid } from './Strategy/CustomSortStrategyagGrid';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../Utilities/Helpers/CellValidationHelper';
import { agGridHelper } from './agGridHelper';
import { CalculatedColumnHelper } from '../Utilities/Helpers/CalculatedColumnHelper';
import { ILicenceService } from '../Utilities/Services/Interface/ILicenceService';
import { LicenceService } from '../Utilities/Services/LicenceService';
import { AdaptableBlotterToolPanelBuilder } from '../View/Components/ToolPanel/AdaptableBlotterToolPanel';
import { IAdaptableBlotterToolPanelContext } from '../Utilities/Interface/IAdaptableBlotterToolPanelContext';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ScheduleService } from '../Utilities/Services/ScheduleService';
import { Glue42Helper } from '../Utilities/Helpers/Glue42Helper';
import { QuickSearchState } from '../PredefinedConfig/RunTimeState/QuickSearchState';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { SearchService } from '../Utilities/Services/SearchService';
import { PercentBar } from '../PredefinedConfig/RunTimeState/PercentBarState';
import { CalculatedColumn } from '../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { FreeTextColumn } from '../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';
import { ColumnFilter } from '../PredefinedConfig/RunTimeState/ColumnFilterState';
import { ColumnSort, VendorGridInfo } from '../PredefinedConfig/RunTimeState/LayoutState';
import { CustomSort } from '../PredefinedConfig/RunTimeState/CustomSortState';
import { QueryRange } from '../PredefinedConfig/Common/Expression/QueryRange';
import {
  PermittedColumnValues,
  EditLookUpColumn,
} from '../PredefinedConfig/DesignTimeState/UserInterfaceState';
import { createUuid, TypeUuid } from '../PredefinedConfig/Uuid';
import { ActionColumn } from '../PredefinedConfig/DesignTimeState/ActionColumnState';
import { PercentBarTooltip } from './PercentBarTooltip';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';
import { ActionColumnRenderer } from './ActionColumnRenderer';

// do I need this in both places??
type RuntimeConfig = {
  instantiateGrid?: (...args: any[]) => any;
};

export class AdaptableBlotter implements IAdaptableBlotter {
  public api: IBlotterApi;

  public strategies: IStrategyCollection;

  public adaptableBlotterStore: IAdaptableBlotterStore;

  public blotterOptions: AdaptableBlotterOptions;

  public vendorGridName: any;

  public CalendarService: ICalendarService;

  public DataService: IDataService;

  public ValidationService: IValidationService;

  public AuditLogService: IAuditLogService;

  public StyleService: StyleService;

  public ChartService: IChartService;

  public CalculatedColumnExpressionService: ICalculatedColumnExpressionService;

  public FreeTextColumnService: IFreeTextColumnService;

  public LicenceService: ILicenceService;

  public ScheduleService: IScheduleService;
  public SearchService: ISearchService;

  public embedColumnMenu: boolean;

  private calculatedColumnPathMap: Map<string, string[]> = new Map();

  private useRowNodeLookUp: boolean;

  private abContainerElement: HTMLElement;

  private gridContainerElement: HTMLElement;

  public gridOptions: GridOptions;

  public isInitialised: boolean;

  private throttleOnDataChangedUser: (() => void) & _.Cancelable;

  private throttleOnDataChangedExternal: (() => void) & _.Cancelable;

  public hasQuickFilter: boolean;

  private agGridHelper: agGridHelper;

  private renderGrid: boolean;

  private runtimeConfig?: RuntimeConfig;

  private emitter: Emitter;

  constructor(
    blotterOptions: AdaptableBlotterOptions,
    renderGrid: boolean = true,
    runtimeConfig?: RuntimeConfig
  ) {
    this.emitter = new Emitter();

    this.renderGrid = renderGrid;
    // we create the Blotter Options by merging the values provided by the user with the defaults (where no value has been set)
    this.blotterOptions = BlotterHelper.assignBlotterOptions(blotterOptions);
    this.runtimeConfig = runtimeConfig;

    this.gridOptions = this.blotterOptions.vendorGrid;
    this.vendorGridName = 'agGrid';
    this.embedColumnMenu = true;
    this.isInitialised = false;
    this.hasQuickFilter = true;
    this.useRowNodeLookUp = false; // we will set later in instantiate if possible to be true

    // set the licence first
    this.LicenceService = new LicenceService(this);
    BlotterHelper.checkLicenceKey(this.LicenceService.LicenceInfo);

    // get the api ready
    this.api = new BlotterApi(this);

    // data source needs to be created before Audit Log Service
    this.DataService = new DataService(this);
    // the audit service needs to be created before the store
    this.AuditLogService = new AuditLogService(this);
    // create the store
    this.initStore();

    // set up the helper
    this.agGridHelper = new agGridHelper(this, this.gridOptions);

    // create the services
    this.CalendarService = new CalendarService(this);

    this.ValidationService = new ValidationService(this);
    this.StyleService = new StyleService(this);
    this.ChartService = new ChartService(this);
    this.FreeTextColumnService = new FreeTextColumnService(this);
    this.ScheduleService = new ScheduleService(this);
    this.SearchService = new SearchService(this);
    this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(
      this,
      (columnId, record) => this.gridOptions.api!.getValue(columnId, record)
    );

    // we prefer the grid to be NOT instantiated so that we can do it
    // perhaps in future we will force instantiation only?
    const isGridInstantiated =
      this.gridOptions.api && typeof this.gridOptions.api!.getValue === 'function';
    if (!isGridInstantiated) {
      const canInstantiateGrid = this.tryInstantiateAgGrid();
      if (!canInstantiateGrid) {
        // we have no grid, we can't do anything
        LoggingHelper.LogAdaptableBlotterError('Unable to set up ag-Grid');
        return;
      }
    }

    // add our blotter to the grid options api object
    // this is VERY useful for when we need to access the Blotter inside of agGrid only functions
    if (this.gridOptions.api) {
      (this.gridOptions.api as any).__blotter = this;
    }

    // set up iPushPull
    iPushPullHelper.init(this.blotterOptions.iPushPullConfig);

    // set up Glue42 - note this is currently not working in the browser but will be done shortly
    if (Glue42Helper.isRunningGlue42()) {
      Glue42Helper.init();
    }

    // Set up strategies - we set up all the strategies suitable for the vendor grid
    // But users can make some hidden or readonly in their entitlements
    this.strategies = this.agGridHelper.setUpStrategies();

    // Load the store
    this.adaptableBlotterStore.Load.then(
      () => this.strategies.forEach(strat => strat.initializeWithRedux()),
      e => {
        LoggingHelper.LogAdaptableBlotterError('Failed to Init AdaptableBlotterStore : ', e);
        // for now we initiliaze the strategies even if loading state has failed (perhaps revisit this?)
        this.strategies.forEach(strat => strat.initializeWithRedux());
        this.dispatchAction(PopupRedux.PopupHideLoading()); // doesnt really help but at least clears the screen
      }
    )
      .then(
        () => this.initInternalGridLogic(),
        e => {
          LoggingHelper.LogAdaptableBlotterError('Failed to Init Strategies : ', e);
          // for now we initiliaze the grid even if initialising strategies has failed (perhaps revisit this?)
          this.initInternalGridLogic();
          this.dispatchAction(PopupRedux.PopupHideLoading()); // doesnt really help but at least clears the screen
        }
      )
      .then(() => {
        this.applyFinalRendering();
        this.isInitialised = true;
        this.dispatchAction(PopupRedux.PopupHideLoading());
      });

    if (renderGrid) {
      if (this.abContainerElement == null) {
        this.abContainerElement = this.getBlotterContainerElement();
      }
      if (this.abContainerElement != null) {
        this.abContainerElement.innerHTML = '';
        ReactDOM.render(AdaptableBlotterApp({ AdaptableBlotter: this }), this.abContainerElement);
      }
    }
    // create debounce methods that take a time based on user settings
    this.throttleOnDataChangedUser = _.throttle(
      this.applyDataChange,
      this.blotterOptions.filterOptions.filterActionOnUserDataChange.ThrottleDelay
    );
    this.throttleOnDataChangedExternal = _.throttle(
      this.applyDataChange,
      this.blotterOptions.filterOptions.filterActionOnExternalDataChange.ThrottleDelay
    );
  }

  public on = (eventName: string, callback: EmitterCallback): (() => void) => {
    return this.emitter.on(eventName, callback);
  };

  public emit = (eventName: string, data?: any): Promise<any> => {
    return this.emitter.emit(eventName, data);
  };

  private initStore() {
    this.adaptableBlotterStore = new AdaptableBlotterStore(this);

    this.adaptableBlotterStore.onAny((eventName: string) => {
      if (eventName == INIT_STATE) {
        this.emit(BLOTTER_READY_EVENT);
      }
    });
  }

  private tryInstantiateAgGrid(): boolean {
    const vendorContainer = this.getGridContainerElement();
    if (!vendorContainer) {
      LoggingHelper.LogAdaptableBlotterError(
        'You must provide an element id in `containerOptions.vendorContainer`'
      );
      return false;
    }

    // set up whether we use the getRowNode method or loop when finding a record (former is preferable)
    // can only do that here as the gridOptions not yet set up
    this.useRowNodeLookUp = this.agGridHelper.TrySetUpNodeIds();

    // Create Adaptable Blotter Tool Panel
    if (this.blotterOptions.generalOptions.showAdaptableBlotterToolPanel) {
      LoggingHelper.LogAdaptableBlotterInfo('Adding Adaptable Blotter Tool Panel');
      this.gridOptions.sideBar = this.gridOptions.sideBar || {};
      this.gridOptions.components = this.gridOptions.components || {};
      // https://www.ag-grid.com/javascript-grid-side-bar/

      if (this.gridOptions.sideBar) {
        const sidebar = this.gridOptions.sideBar;
        if (sidebar === true) {
          // Possibility 1: Sidebar is true - meaning that they want the default filter and columns, so create both:
          this.gridOptions.sideBar = this.agGridHelper.createAdaptableBlotterSideBarDefs(
            true,
            true
          );
        } else if (sidebar === 'columns') {
          // Possibility 2: Sidebar is 'columns' (string) - meaning column only so create just that
          this.gridOptions.sideBar = this.agGridHelper.createAdaptableBlotterSideBarDefs(
            false,
            true
          );
        } else if (sidebar === 'filters') {
          // Possibility 3: Sidebar is 'filters' (string) - meaning filters only so create just that
          this.gridOptions.sideBar = this.agGridHelper.createAdaptableBlotterSideBarDefs(
            true,
            false
          );
        } else {
          // Possibilty 4: either no sidebar or they created their own; in either case, should add Blotter Tool panel
          const sidebarDef = this.gridOptions.sideBar as SideBarDef;
          if (sidebarDef) {
            sidebarDef.toolPanels = sidebarDef.toolPanels || [];
            sidebarDef.toolPanels.push(this.agGridHelper.createAdaptableBlotterToolPanel());
          }
        }
        const toolpanelContext: IAdaptableBlotterToolPanelContext = { Blotter: this };
        this.gridOptions.components.adaptableBlotterToolPanel = AdaptableBlotterToolPanelBuilder(
          toolpanelContext
        );
      }
    }
    // now create the grid itself - we have to do it this way as previously when we instantiated the Grid 'properly' it got created as J.Grid
    // console.log('creating the grid as not created by user')

    let grid: any;
    if (this.runtimeConfig && this.runtimeConfig.instantiateGrid) {
      grid = this.runtimeConfig.instantiateGrid(vendorContainer, this.gridOptions);
    } else {
      grid = new Grid(vendorContainer, this.gridOptions);
    }

    return grid != null;
  }

  // debounced methods
  debouncedSetColumnIntoStore = _.debounce(() => this.setColumnIntoStore(), HALF_SECOND);

  debouncedSaveGridLayout = _.debounce(() => this.saveGridLayout(), HALF_SECOND);

  debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), HALF_SECOND);

  debouncedFilterGrid = _.debounce(() => this.applyGridFiltering(), HALF_SECOND);

  private filterOnUserDataChange(): void {
    if (
      this.blotterOptions.filterOptions.filterActionOnUserDataChange.RunFilter ==
      FilterOnDataChangeOptions.Always
    ) {
      this.applyDataChange();
    } else if (
      this.blotterOptions.filterOptions.filterActionOnUserDataChange.RunFilter ==
      FilterOnDataChangeOptions.Throttle
    ) {
      this.throttleOnDataChangedUser();
    }
  }

  private filterOnExternalDataChange(): void {
    if (
      this.blotterOptions.filterOptions.filterActionOnExternalDataChange.RunFilter ==
      FilterOnDataChangeOptions.Always
    ) {
      this.applyDataChange();
    } else if (
      this.blotterOptions.filterOptions.filterActionOnExternalDataChange.RunFilter ==
      FilterOnDataChangeOptions.Throttle
    ) {
      this.throttleOnDataChangedExternal();
    }
  }

  private createFilterWrapper(col: Column) {
    this.gridOptions.api!.destroyFilter(col);
    this.gridOptions.api!.getColumnDef(col).filter = FilterWrapperFactory(this);
    col.initialise();
  }

  private createQuickFilterWrapper(col: Column) {
    this.gridOptions.api!.getColumnDef(col).floatingFilterComponentParams = {
      suppressFilterButton: false,
    };
    this.gridOptions.api!.getColumnDef(col).floatingFilterComponent = FloatingFilterWrapperFactory(
      this
    );
  }

  private _currentEditor: ICellEditor;

  public reloadGrid(): void {
    this.emit(GRID_RELOADED_EVENT);
  }

  public applyGridFiltering() {
    this.gridOptions.api!.onFilterChanged();
    this.emit(SEARCH_APPLIED_EVENT);
    this.emit(GRID_REFRESHED_EVENT);
  }

  private applyDataChange() {
    this.gridOptions.api!.onFilterChanged();
    this.emit(GRID_REFRESHED_EVENT);
  }

  public clearGridFiltering() {
    this.gridOptions.columnApi!.getAllColumns().forEach(c => {
      c.setFilterActive(false);
    });
  }

  public clearColumnFiltering(columnIds: string[]): void {
    columnIds.forEach(c => {
      const column: Column = this.gridOptions.columnApi
        .getAllColumns()
        .find(col => col.getColId() == c);
      if (column) {
        column.setFilterActive(false);
      }
    });
  }

  public hideFilterFormPopup: Function;

  public hideFilterForm() {
    if (this.hideFilterFormPopup) {
      this.hideFilterFormPopup();
    }
  }

  public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
    const allColumns = this.gridOptions.columnApi!.getAllGridColumns();
    let startIndex: number = 0;

    //  this is not quite right as it assumes that only the first column can be grouped
    //  but lets do this for now and then refine and refactor later to deal with weirder use cases
    if (ColumnHelper.isSpecialColumn(allColumns[0].getColId())) {
      startIndex++;
    }

    VisibleColumnList.forEach((column, index) => {
      const col = this.gridOptions.columnApi!.getColumn(column.ColumnId);
      if (!col) {
        LoggingHelper.LogAdaptableBlotterError(`Cannot find vendor column:${column.ColumnId}`);
      }
      if (!col.isVisible()) {
        this.setColumnVisible(this.gridOptions.columnApi, col, true, 'api');
      }
      this.moveColumn(this.gridOptions.columnApi, col, startIndex + index, 'api');
    });
    allColumns
      .filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0)
      .forEach(col => {
        this.setColumnVisible(this.gridOptions.columnApi, col, false, 'api');
      });
    // we need to do this to make sure agGrid and Blotter column collections are in sync
    this.setColumnIntoStore();
  }

  public setColumnIntoStore() {
    const allColumns: IColumn[] = [];
    const existingColumns: IColumn[] = this.api.gridApi.getColumns();
    const vendorCols: Column[] = this.gridOptions.columnApi!.getAllGridColumns();
    const quickSearchClassName = this.getQuickSearchClassName();

    vendorCols.forEach(vendorColumn => {
      const colId: string = vendorColumn.getColId();
      if (!ColumnHelper.isSpecialColumn(colId)) {
        let existingColumn: IColumn = ColumnHelper.getColumnFromId(colId, existingColumns);
        if (existingColumn) {
          existingColumn.Visible = vendorColumn.isVisible();
          if (existingColumn.DataType == DataType.Unknown) {
            existingColumn.DataType = this.getColumnDataType(vendorColumn);
          }
        } else {
          existingColumn = this.createColumn(vendorColumn, quickSearchClassName);
        }
        allColumns.push(existingColumn);
      }
    });
    this.dispatchAction(GridRedux.GridSetColumns(allColumns));
    // Save the layout if required
    LayoutHelper.autoSaveLayout(this);
  }

  private createColumn(vendorColumn: Column, quickSearchClassName: string): IColumn {
    const colId: string = vendorColumn.getColId();
    const abColumn: IColumn = {
      Uuid: createUuid(),
      ColumnId: colId,
      FriendlyName: this.gridOptions.columnApi!.getDisplayNameForColumn(vendorColumn, 'header'),
      DataType: this.getColumnDataType(vendorColumn),
      Visible: vendorColumn.isVisible(),
      ReadOnly: this.isColumnReadonly(colId),
      Sortable: this.isColumnSortable(colId),
      Filterable: this.isColumnFilterable(colId),
    };
    this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
    this.addFiltersToVendorColumn(vendorColumn);
    return abColumn;
  }

  private addFiltersToVendorColumn(vendorColumn: Column): void {
    if (
      vendorColumn.getColDef().filter &&
      this.blotterOptions.filterOptions.useAdaptableBlotterFilterForm
    ) {
      this.createFilterWrapper(vendorColumn);
    }

    if (
      this.gridOptions.floatingFilter &&
      this.blotterOptions.filterOptions.useAdaptableBlotterQuickFilter
    ) {
      this.createQuickFilterWrapper(vendorColumn);
    }
  }

  private getQuickSearchClassName(): string {
    const quickSearchClassName: string = StringExtensions.IsNotNullOrEmpty(
      this.api.quickSearchApi.getQuickSearchStyle().ClassName
    )
      ? this.api.quickSearchApi.getQuickSearchStyle().ClassName
      : StyleHelper.CreateStyleName(StrategyConstants.QuickSearchStrategyId, this);
    return quickSearchClassName;
  }

  private addQuickSearchStyleToColumn(col: IColumn, quickSearchClassName: string): void {
    const blotter = this;
    const cellClassRules: any = {};
    cellClassRules[quickSearchClassName] = function(params: any) {
      if (params.node && !params.node.group) {
        const columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
        const quickSearchState = blotter.api.quickSearchApi.getQuickSearchState();
        if (
          StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText) &&
          (quickSearchState.DisplayAction == DisplayAction.HighlightCell ||
            quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell)
        ) {
          const range = RangeHelper.CreateValueRangeFromOperand(quickSearchState.QuickSearchText);
          if (range) {
            // not right but just checking...
            if (
              RangeHelper.IsColumnAppropriateForRange(range.Operator as LeafExpressionOperator, col)
            ) {
              const expression: Expression = ExpressionHelper.CreateSingleColumnExpression(
                columnId,
                null,
                null,
                null,
                [range]
              );
              if (
                ExpressionHelper.checkForExpressionFromRecord(
                  expression,
                  params.node,
                  [col],
                  blotter
                )
              ) {
                return true;
              }
            }
          }
        }
      }
      return false;
    };
    this.setCellClassRules(cellClassRules, col.ColumnId, 'QuickSearch');
  }

  public createMainMenu() {
    const menuItems: AdaptableBlotterMenuItem[] = [];
    this.strategies.forEach(x => {
      const menuItem = x.getPopupMenuItem();
      if (menuItem != null && menuItem != undefined) {
        if (menuItems.findIndex(m => m.StrategyId == menuItem.StrategyId) == -1) {
          menuItems.push(menuItem);
        }
      }
    });
    this.dispatchAction(MenuRedux.SetMainMenuItems(menuItems));
  }

  public getPrimaryKeyValueFromRecord(record: RowNode): any {
    return this.gridOptions.api!.getValue(this.blotterOptions.primaryKey, record);
  }

  public gridHasCurrentEditValue(): boolean {
    if (this._currentEditor) {
      return true;
    }
    return false;
  }

  public getCurrentCellEditValue(): any {
    // TODO: Jo: This is a workaround as we are accessing private members of agGrid.
    // Currently used by Shortcut to get the current edit value - is there a better way?
    if (this._currentEditor) {
      return this._currentEditor.getValue();
    }
    return '';
  }

  public getActiveCell(): GridCell {
    const activeCell = this.gridOptions.api!.getFocusedCell();
    if (activeCell) {
      const rowNode = this.gridOptions.api!.getModel().getRow(activeCell.rowIndex);
      // if the selected cell is from a group cell we don't return it
      // that's a design choice as this is used only when editing and you cant edit those cells
      if (rowNode && !rowNode.group) {
        return {
          columnId: activeCell.column.getColId(),
          primaryKeyValue: this.getPrimaryKeyValueFromRecord(rowNode),
          value: this.gridOptions.api!.getValue(activeCell.column, rowNode),
        };
      }
    }
  }

  public saveGridLayout() {
    if (
      this.blotterOptions.layoutOptions != null &&
      this.blotterOptions.layoutOptions.includeVendorStateInLayouts != null &&
      this.blotterOptions.layoutOptions.includeVendorStateInLayouts
    ) {
      LayoutHelper.autoSaveLayout(this);
    }
  }

  // this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
  public setSelectedCells(): void {
    const selected: CellRange[] = this.gridOptions.api!.getCellRanges();
    //  const nodes: RowNode[] = this.gridOptions.api!.getSelectedNodes();
    //  const rows: any[] = this.gridOptions.api!.getSelectedRows();

    const columns: IColumn[] = [];
    const selectedCells: GridCell[] = [];

    if (selected) {
      // we iterate for each ranges
      selected.forEach((rangeSelection, index) => {
        const y1 = Math.min(rangeSelection.startRow!.rowIndex, rangeSelection.endRow!.rowIndex);
        const y2 = Math.max(rangeSelection.startRow!.rowIndex, rangeSelection.endRow!.rowIndex);
        for (const column of rangeSelection.columns) {
          if (column != null) {
            const colId: string = column.getColId();
            if (index == 0) {
              const selectedColumn: IColumn = ColumnHelper.getColumnFromId(
                colId,
                this.api.gridApi.getColumns()
              );
              columns.push(selectedColumn);
            }

            for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
              const rowNode = this.gridOptions.api!.getModel().getRow(rowIndex);
              // if the selected cells are from a group cell we don't return it
              // that's a design choice as this is used only when editing and you cant edit those cells
              if (rowNode && !rowNode.group) {
                const primaryKey = this.getPrimaryKeyValueFromRecord(rowNode);
                const value = this.gridOptions.api!.getValue(column, rowNode);

                const selectedCell: GridCell = {
                  columnId: colId,
                  value: value,
                  primaryKeyValue: primaryKey,
                };
                selectedCells.push(selectedCell);
              }
            }
          }
        }
      });
    }
    const selectedCellInfo: ISelectedCellInfo = { Columns: columns, GridCells: selectedCells };
    this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCellInfo));

    // this._onSelectedCellsChanged.Dispatch(this, this);
    this.emit(CELLS_SELECTED_EVENT);
  }

  // We deduce the type here, as there is no way to get it through the definition
  private getColumnDataType(column: Column): DataType {
    // Some columns can have no ID or Title. we return string as a consequence but it needs testing
    if (!column) {
      LoggingHelper.LogAdaptableBlotterWarning('column is undefined returning String for Type');
      return DataType.String;
    }

    // get the column type if already in store (and not unknown)
    const existingColumn: IColumn = ColumnHelper.getColumnFromId(
      column.getId(),
      this.api.gridApi.getColumns()
    );
    if (existingColumn && existingColumn.DataType != DataType.Unknown) {
      return existingColumn.DataType;
    }

    // check for column type
    const colType: any = column.getColDef().type;
    if (colType) {
      const isArray: boolean = Array.isArray(colType);
      if (isArray) {
        // do array check
        let myDatatype: DataType = DataType.Unknown;
        colType.forEach((c: string) => {
          if (c == 'numericColumn') {
            myDatatype = DataType.Number;
          }
          if (c.startsWith('abColDef')) {
            myDatatype = this.getabColDefValue(c);
          }
        });
        if (myDatatype != DataType.Unknown) {
          return myDatatype;
        }
      } else {
        // do string check
        if (colType == 'numericColumn') {
          return DataType.Number;
        }
        if (colType.startsWith('abColDef')) {
          return this.getabColDefValue(colType);
        }
      }
    }

    const model = this.gridOptions.api!.getModel();
    if (model == null) {
      LoggingHelper.LogAdaptableBlotterWarning(
        `No model so returning type "Unknown" for Column: "${column.getColId()}"`
      );
      return DataType.Unknown;
    }

    let row = model.getRow(0);

    if (row == null) {
      // possible that there will be no data.
      LoggingHelper.LogAdaptableBlotterWarning(
        `No data in grid so returning type "Unknown" for Column: "${column.getColId()}"`
      );
      return DataType.Unknown;
    }
    // if it's a group we need the content of the group
    if (row.group) {
      const childNodes: RowNode[] = row.childrenAfterGroup;
      if (ArrayExtensions.IsNullOrEmpty(childNodes)) {
        LoggingHelper.LogAdaptableBlotterWarning(
          `No data in grid so returning type "Unknown" for Column: "${column.getColId()}"`
        );
        return DataType.Unknown;
      }
      row = childNodes[0];
    }
    const value = this.gridOptions.api!.getValue(column, row);
    let dataType: DataType;
    if (value instanceof Date) {
      dataType = DataType.Date;
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
    LoggingHelper.LogAdaptableBlotterWarning(
      `No defined type for column '${column.getColId()}'. Defaulting to type of first value: ${dataType}`
    );
    return dataType;
  }

  private getabColDefValue(colType: string): DataType {
    switch (colType) {
      case 'abColDefNumber':
        return DataType.Number;
      case 'abColDefString':
        return DataType.String;
      case 'abColDefBoolean':
        return DataType.Boolean;
      case 'abColDefDate':
        return DataType.Date;
      case 'abColDefObject':
        return DataType.Object;
    }
  }

  public setValue(gridCell: GridCell): void {
    if (this.useRowNodeLookUp) {
      const rowNode: RowNode = this.gridOptions.api!.getRowNode(gridCell.primaryKeyValue);
      if (rowNode != null) {
        this.updateValue(gridCell, rowNode);
      }
    } else {
      let isUpdated: boolean = false;
      // prefer not to use this method but if we do then at least we can prevent further lookups once we find
      this.gridOptions.api!.getModel().forEachNode(rowNode => {
        if (!isUpdated) {
          if (gridCell.primaryKeyValue == this.getPrimaryKeyValueFromRecord(rowNode)) {
            this.updateValue(gridCell, rowNode);
            isUpdated = true;
          }
        }
      });
    }
    this.filterOnUserDataChange();
    this.gridOptions.api!.clearRangeSelection();
  }

  private updateValue(gridCell: GridCell, rowNode: RowNode): void {
    const oldValue = this.gridOptions.api!.getValue(gridCell.columnId, rowNode);
    rowNode.setDataValue(gridCell.columnId, gridCell.value);

    const dataChangedEvent: DataChangedInfo = {
      OldValue: oldValue,
      NewValue: gridCell.value,
      ColumnId: gridCell.columnId,
      IdentifierValue: gridCell.primaryKeyValue,
      Record: rowNode,
    };
    if (this.AuditLogService.isAuditCellEditsEnabled) {
      this.AuditLogService.addEditCellAuditLog(dataChangedEvent);
    }
    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedEvent);
    this.DataService.CreateDataChangedEvent(dataChangedEvent);
  }

  // this is used by strategies to update the grid
  // not sure why do it this way and not just get it updated through the event
  public setValueBatch(gridCellBatch: GridCell[]): void {
    if (ArrayExtensions.IsNullOrEmpty(gridCellBatch)) {
      return;
    }

    var dataChangedEvents: DataChangedInfo[] = [];
    const nodesToRefresh: RowNode[] = [];
    const refreshColumnList: string[] = [];
    const percentBars: PercentBar[] = this.api.percentBarApi.getAllPercentBar();

    // now two ways to do this - one using pk lookup and other using foreach on row node
    if (this.useRowNodeLookUp) {
      gridCellBatch.forEach((gridCell: GridCell) => {
        const rowNode: RowNode = this.gridOptions.api!.getRowNode(gridCell.primaryKeyValue);
        if (rowNode) {
          this.updateBatchValue(
            gridCell,
            rowNode,
            nodesToRefresh,
            refreshColumnList,
            dataChangedEvents,
            percentBars
          );
        }
      });
    } else {
      this.gridOptions.api!.getModel().forEachNode((rowNode: RowNode) => {
        const gridCell: GridCell = gridCellBatch.find(
          x => x.primaryKeyValue == this.getPrimaryKeyValueFromRecord(rowNode)
        );
        if (gridCell) {
          this.updateBatchValue(
            gridCell,
            rowNode,
            nodesToRefresh,
            refreshColumnList,
            dataChangedEvents,
            percentBars
          );
        }
      });
    }

    if (this.AuditLogService.isAuditCellEditsEnabled) {
      this.AuditLogService.addEditCellAuditLogBatch(dataChangedEvents);
    }
    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents);
    dataChangedEvents.forEach(dc => this.DataService.CreateDataChangedEvent(dc));

    this.filterOnUserDataChange();
    this.refreshCells(nodesToRefresh, refreshColumnList);

    // we want to reselect the cells that are selected so that users can repeat actions
    // we do this by gettng the selected cells, clearing the selection and then re-applying
    //  agGridHelper.reselectSelectedCells();
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

  private updateBatchValue(
    gridCell: GridCell,
    rowNode: RowNode,
    nodesToRefresh: RowNode[],
    refreshColumnList: string[],
    dataChangedEvents: DataChangedInfo[],
    percentBars: PercentBar[]
  ): void {
    const colId: string = gridCell.columnId;
    refreshColumnList.push(colId);
    nodesToRefresh.push(rowNode);

    ArrayExtensions.AddItem(refreshColumnList, colId);

    const oldValue = this.gridOptions.api!.getValue(colId, rowNode);

    var data: any = rowNode.data;
    data[colId] = gridCell.value;

    const dataChangedEvent: DataChangedInfo = {
      OldValue: oldValue,
      NewValue: gridCell.value,
      ColumnId: colId,
      IdentifierValue: gridCell.primaryKeyValue,
      Record: rowNode,
    };
    dataChangedEvents.push(dataChangedEvent);

    // check if any calc columns need to refresh
    const columnList = this.calculatedColumnPathMap.get(colId);
    if (columnList) {
      columnList.forEach(calcColumn => {
        ArrayExtensions.AddItem(refreshColumnList, calcColumn);
      });
    }

    // see if we need to refresh any percent bars
    percentBars.forEach(pb => {
      refreshColumnList.forEach(changedColId => {
        if (
          StringExtensions.IsNotNullOrEmpty(pb.MaxValueColumnId) &&
          pb.MaxValueColumnId == changedColId
        ) {
          ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
        }
        if (
          StringExtensions.IsNotNullOrEmpty(pb.MinValueColumnId) &&
          pb.MinValueColumnId == changedColId
        ) {
          ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
        }
      });
    });
  }

  public cancelEdit() {
    this.gridOptions.api!.stopEditing(true);
  }

  public getRecordIsSatisfiedFunction(
    id: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any {
    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
      let rowNode: RowNode;
      if (this.useRowNodeLookUp) {
        rowNode = this.gridOptions.api!.getRowNode(id);
      } else {
        let foundRow: boolean = false;
        this.gridOptions.api!.getModel().forEachNode(node => {
          if (!foundRow && id == this.getPrimaryKeyValueFromRecord(node)) {
            rowNode = node;
            foundRow = true;
          }
        });
      }
      return (columnId: string) => this.gridOptions.api!.getValue(columnId, rowNode);
    }
    return (columnId: string) => this.getDisplayValue(id, columnId);
  }

  public getRecordIsSatisfiedFunctionFromRecord(
    record: RowNode,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any {
    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
      return (columnId: string) => this.gridOptions.api!.getValue(columnId, record);
    }
    return (columnId: string) => this.getDisplayValueFromRecord(record, columnId);
  }

  private isColumnReadonly(columnId: string): boolean {
    // same as hypergrid. we do not support the fact that some rows are editable and some are not
    // if editable is a function then we return that its not readonly since we assume that some record will be editable
    // that's wrong but we ll see if we face the issue later
    const colDef = this.gridOptions.api!.getColumnDef(columnId);
    if (colDef && typeof colDef.editable === 'boolean') {
      return !colDef.editable;
    }
    return true;
  }

  private isColumnSortable(columnId: string): boolean {
    // follow agGrid logic which is that ONLY if sortable explicitly set to false do you suppress sort
    const colDef: ColDef = this.gridOptions.api!.getColumnDef(columnId);
    if (colDef.sortable != null) {
      return colDef.sortable;
    }
    return true;
  }

  private isColumnFilterable(columnId: string): boolean {
    // follow agGrid logic which is that ONLY filterable if one explicitly set
    const colDef: ColDef = this.gridOptions.api!.getColumnDef(columnId);
    return colDef.filter != null && colDef.filter != false;
  }

  public setCustomSort(columnId: string, comparer: Function): void {
    const sortModel = this.gridOptions.api!.getSortModel();
    const columnDef = this.gridOptions.api!.getColumnDef(columnId);

    if (columnDef) {
      columnDef.comparator = <any>comparer;
    }
    this.gridOptions.api!.setSortModel(sortModel);
  }

  public removeCustomSort(columnId: string): void {
    const sortModel = this.gridOptions.api!.getSortModel();
    const columnDef = this.gridOptions.api!.getColumnDef(columnId);

    if (columnDef) {
      columnDef.comparator = null;
    }
    this.gridOptions.api!.setSortModel(sortModel);
  }

  public getColumnValueDisplayValuePairDistinctList(
    columnId: string,
    distinctCriteria: DistinctCriteriaPairValue,
    visibleRowsOnly: boolean
  ): Array<IRawValueDisplayValuePair> {
    const returnMap = new Map<string, IRawValueDisplayValuePair>();

    // check if there are permitted column values for that column
    // NB.  this currently contains a small bug as we dont check for visibility so if using permitted values then ALL are returned :(
    const permittedValuesForColumn: PermittedColumnValues = this.api.userInterfaceApi.getPermittedValuesForColumn(
      columnId
    );
    if (permittedValuesForColumn != undefined) {
      permittedValuesForColumn.PermittedValues.forEach(pv => {
        returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
      });
    } else {
      const useRawValue: boolean = this.useRawValueForColumn(columnId);
      if (visibleRowsOnly) {
        this.gridOptions.api!.forEachNodeAfterFilter((rowNode: RowNode) => {
          this.addDistinctColumnValue(rowNode, columnId, useRawValue, distinctCriteria, returnMap);
        });
      } else {
        this.gridOptions.api!.forEachNode(rowNode => {
          this.addDistinctColumnValue(rowNode, columnId, useRawValue, distinctCriteria, returnMap);
        });
      }
    }
    return Array.from(returnMap.values()).slice(
      0,
      this.blotterOptions.queryOptions.maxColumnValueItemsDisplayed
    );
  }

  private addDistinctColumnValue(
    rowNode: RowNode,
    columnId: string,
    useRawValue: boolean,
    distinctCriteria: DistinctCriteriaPairValue,
    returnMap: Map<string, IRawValueDisplayValuePair>
  ): void {
    // we do not return the values of the aggregates when in grouping mode
    // otherwise they would appear in the filter dropdown etc....
    if (!rowNode.group) {
      const rawValue = this.gridOptions.api!.getValue(columnId, rowNode);
      const displayValue = useRawValue
        ? Helper.StringifyValue(rawValue)
        : this.getDisplayValueFromRecord(rowNode, columnId);
      if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
        returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
      } else {
        returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
      }
    }
  }

  private useRawValueForColumn(columnId: string): boolean {
    // we need to return false if the column has a cell rendeerer i think...
    let colDef: ColDef = this.gridOptions.api!.getColumnDef(columnId);
    if (colDef) {
      if (colDef.cellRenderer != null) {
        return true;
      }
    }

    // will add more in due course I'm sure but for now only percent bar columns return false...
    const percentBars: PercentBar[] = this.api.percentBarApi.getAllPercentBar();
    if (ArrayExtensions.IsEmpty(percentBars)) {
      return false;
    }
    return ArrayExtensions.ContainsItem(percentBars.map(pb => pb.ColumnId), columnId);
  }

  public getDisplayValue(id: any, columnId: string): string {
    let returnValue: string;

    if (this.useRowNodeLookUp) {
      const rowNode: RowNode = this.gridOptions.api!.getRowNode(id);
      returnValue = this.getDisplayValueFromRecord(rowNode, columnId);
    } else {
      let foundRow: boolean = false;
      this.gridOptions.api!.getModel().forEachNode(rowNode => {
        if (!foundRow && id == this.getPrimaryKeyValueFromRecord(rowNode)) {
          returnValue = this.getDisplayValueFromRecord(rowNode, columnId);
          foundRow = true;
        }
      });
    }
    return returnValue;
  }

  public getDisplayValueFromRecord(row: RowNode, columnId: string): string {
    if (row == null) {
      return '';
    }
    const rawValue = this.gridOptions.api!.getValue(columnId, row);
    if (this.useRawValueForColumn(columnId)) {
      return Helper.StringifyValue(rawValue);
    }
    return this.getDisplayValueFromRawValue(columnId, rawValue);
  }

  public getDisplayValueFromRawValue(columnId: string, rawValue: any): any {
    const colDef = this.gridOptions.api!.getColumnDef(columnId);
    if (colDef) {
      if (colDef.valueFormatter) {
        const column = this.gridOptions.columnApi
          .getAllColumns()
          .find(c => c.getColId() == columnId);
        const formatter = colDef.valueFormatter;
        const params: ValueFormatterParams = {
          value: rawValue,
          node: null,
          data: null,
          colDef,
          column,
          api: this.gridOptions.api,
          columnApi: this.gridOptions.columnApi,
          context: null,
        };
        const formattedValue = formatter(params);
        if (colDef.cellRenderer) {
          return this.getRenderedValue(colDef, formattedValue);
        }
        return formattedValue || '';
      }
      if (colDef.cellRenderer) {
        return this.getRenderedValue(colDef, rawValue);
      }
    }
    return this.agGridHelper.getCleanValue(rawValue);
  }

  private getRenderedValue(colDef: ColDef, valueToRender: any): string {
    return this.agGridHelper.getRenderedValue(
      this.api.percentBarApi.getAllPercentBar(),
      colDef,
      valueToRender
    );
  }

  public getRawValueFromRecord(row: RowNode, columnId: string): any {
    return this.gridOptions.api!.getValue(columnId, row);
  }

  public getDataRowFromRecord(record: any): any {
    let rowNode = record as RowNode;
    return rowNode != null && rowNode != undefined ? rowNode.data : undefined;
  }

  public setCellClassRules(
    cellClassRules: any,
    columnId: string,
    type: 'ConditionalStyle' | 'QuickSearch' | 'FlashingCell' | 'FormatColumn'
  ) {
    const localCellClassRules = this.gridOptions.columnApi!.getColumn(columnId).getColDef()
      .cellClassRules;

    if (localCellClassRules) {
      if (type == 'FormatColumn') {
        for (const prop in localCellClassRules) {
          if (prop.includes(StrategyConstants.FormatColumnStrategyId)) {
            delete localCellClassRules[prop];
          }
        }
      } else if (type == 'ConditionalStyle') {
        const cssStyles: string[] = this.api.conditionalStyleApi
          .getAllConditionalStyle()
          .map(c => c.Style.ClassName);
        for (const prop in localCellClassRules) {
          if (
            prop.includes(StrategyConstants.ConditionalStyleStrategyId) ||
            ArrayExtensions.ContainsItem(cssStyles, prop)
          ) {
            delete localCellClassRules[prop];
          }
        }
      }
      // Is initialized in setColumnIntoStore
      else if (type == 'QuickSearch') {
        for (const prop in localCellClassRules) {
          if (prop.includes(StrategyConstants.QuickSearchStrategyId)) {
            delete localCellClassRules[prop];
          }
        }
      }
      // Is initialized in Flash
      else if (type == 'FlashingCell') {
        for (const prop in localCellClassRules) {
          if (prop.includes(StyleConstants.FLASH_UP_STYLE)) {
            delete localCellClassRules[prop];
          }
          if (prop.includes(StyleConstants.FLASH_DOWN_STYLE)) {
            delete localCellClassRules[prop];
          }
        }
      }
      for (const prop in cellClassRules) {
        localCellClassRules[prop] = cellClassRules[prop];
      }
    } else {
      this.gridOptions.columnApi!.getColumn(columnId).getColDef().cellClassRules = cellClassRules;
    }
  }

  public forAllRecordsDo(func: (record: any) => any) {
    this.gridOptions.api!.getModel().forEachNode(rowNode => {
      func(rowNode);
    });
  }

  public forAllVisibleRecordsDo(func: (record: any) => any) {
    this.gridOptions.api!.forEachNodeAfterFilterAndSort(rowNode => {
      func(rowNode);
    });
  }

  public redraw() {
    this.gridOptions.api!.redrawRows();
    this.gridOptions.api!.refreshHeader();
    this.emit(GRID_REFRESHED_EVENT);
  }

  public testredrawRow(rowNode: RowNode) {
    this.gridOptions.api!.redrawRows({ rowNodes: [rowNode] });
  }

  public refreshCells(rows: RowNode[], columnIds: string[]) {
    let refreshCellParams: RefreshCellsParams = {
      rowNodes: rows,
      columns: columnIds,
      force: true,
    };
    this.gridOptions.api!.refreshCells(refreshCellParams);
  }

  public editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void {
    // the name of the column might have changed so lets get the column from store as that will be the 'old' one
    const cols: IColumn[] = this.api.gridApi.getColumns();
    let existingABColumn: IColumn = cols.find(c => c.Uuid == calculatedColumn.Uuid);
    if (existingABColumn) {
      // now get the ag-Grid ColDef Index
      const colDefs: ColDef[] = this.gridOptions.columnApi!.getAllColumns().map(x => x.getColDef());
      const colDefIndex = colDefs.findIndex(x => x.headerName == existingABColumn.ColumnId);

      // clean the expression in case it got dirty
      const cleanedExpression: string = CalculatedColumnHelper.cleanExpressionColumnNames(
        calculatedColumn.ColumnExpression,
        cols
      );

      const newColDef: ColDef = colDefs[colDefIndex];
      //  change the value getter in the coldefs
      newColDef.valueGetter = (params: ValueGetterParams) =>
        Helper.RoundValueIfNumeric(
          this.CalculatedColumnExpressionService.ComputeExpressionValue(
            cleanedExpression,
            params.node
          ),
          4
        );

      // reset the name in case its changed
      newColDef.headerName = calculatedColumn.ColumnId;
      newColDef.colId = calculatedColumn.ColumnId;

      colDefs[colDefIndex] = newColDef;
      this.agGridHelper.safeSetColDefs(colDefs);

      // for column list its an itnernal map only so we can first delete
      for (const columnList of this.calculatedColumnPathMap.values()) {
        const index = columnList.indexOf(calculatedColumn.ColumnId);
        if (index > -1) {
          columnList.splice(index, 1);
        }
      }
      // and then add
      const columnList = CalculatedColumnHelper.getColumnListFromExpression(cleanedExpression);
      for (const column of columnList) {
        let childrenColumnList = this.calculatedColumnPathMap.get(column);
        if (!childrenColumnList) {
          childrenColumnList = [];
          this.calculatedColumnPathMap.set(column, childrenColumnList);
        }
        childrenColumnList.push(calculatedColumn.ColumnId);
      }

      // finally the name of the column or the datatype might have changed so lets update the column in the store to be sure
      // re-apply the datatype in case it has been changed as a result of the expression changing
      existingABColumn.ColumnId = calculatedColumn.ColumnId;
      existingABColumn.DataType = this.CalculatedColumnExpressionService.GetCalculatedColumnDataType(
        cleanedExpression
      );
      this.dispatchAction(GridRedux.GridAddColumn(existingABColumn));
    }
  }

  public removeCalculatedColumnFromGrid(calculatedColumnID: string) {
    const colDefs: ColDef[] = this.gridOptions.columnApi!.getAllColumns().map(x => x.getColDef());
    const colDefIndex = colDefs.findIndex(x => x.headerName == calculatedColumnID);
    if (colDefIndex > -1) {
      colDefs.splice(colDefIndex, 1);
      this.agGridHelper.safeSetColDefs(colDefs);
    }
    for (const columnList of this.calculatedColumnPathMap.values()) {
      const index = columnList.indexOf(calculatedColumnID);
      if (index > -1) {
        columnList.splice(index, 1);
      }
    }
    this.setColumnIntoStore();
  }

  public addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn) {
    const venderCols = this.gridOptions.columnApi!.getAllColumns();
    const colDefs: ColDef[] = venderCols.map(x => x.getColDef());

    const cols: IColumn[] = this.api.gridApi.getColumns();
    const cleanedExpression: string = CalculatedColumnHelper.cleanExpressionColumnNames(
      calculatedColumn.ColumnExpression,
      cols
    );

    const newColDef: ColDef = {
      headerName: calculatedColumn.ColumnId,
      colId: calculatedColumn.ColumnId,
      hide: true,
      enableValue: true, // makes the column 'summable'
      editable: false,
      filter: true,
      sortable: true,
      valueGetter: (params: ValueGetterParams) =>
        Helper.RoundValueIfNumeric(
          this.CalculatedColumnExpressionService.ComputeExpressionValue(
            cleanedExpression,
            params.node
          ),
          4
        ),
    };

    colDefs.push(newColDef);
    this.agGridHelper.safeSetColDefs(colDefs);

    const columnList = CalculatedColumnHelper.getColumnListFromExpression(cleanedExpression);
    for (const column of columnList) {
      let childrenColumnList = this.calculatedColumnPathMap.get(column);
      if (!childrenColumnList) {
        childrenColumnList = [];
        this.calculatedColumnPathMap.set(column, childrenColumnList);
      }
      childrenColumnList.push(calculatedColumn.ColumnId);
    }
    let dataType: DataType = this.CalculatedColumnExpressionService.GetCalculatedColumnDataType(
      cleanedExpression
    );
    this.addSpecialColumnToState(calculatedColumn.Uuid, calculatedColumn.ColumnId, dataType);
  }

  public addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn) {
    const venderCols: Column[] = this.gridOptions.columnApi!.getAllColumns();
    const colDefs: ColDef[] = venderCols.map(x => x.getColDef());
    const newColDef: ColDef = {
      headerName: freeTextColumn.ColumnId,
      colId: freeTextColumn.ColumnId,
      editable: true,
      hide: true,
      filter: true,
      sortable: true,
      cellEditor: 'agLargeTextCellEditor',
      valueGetter: (params: ValueGetterParams) =>
        this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, params.node),
    };
    colDefs.push(newColDef);
    this.agGridHelper.safeSetColDefs(colDefs);

    this.addSpecialColumnToState(freeTextColumn.Uuid, freeTextColumn.ColumnId, DataType.String);
  }

  public addActionColumnToGrid(actionColumn: ActionColumn) {
    const venderCols: Column[] = this.gridOptions.columnApi!.getAllColumns();
    const colDefs: ColDef[] = venderCols.map(x => x.getColDef());
    const newColDef: ColDef = {
      headerName: actionColumn.ColumnId,
      colId: actionColumn.ColumnId,
      editable: false,
      hide: false,
      filter: false,
      sortable: false,
      cellRenderer: ActionColumnRenderer,
    };
    colDefs.push(newColDef);
    this.agGridHelper.safeSetColDefs(colDefs);

    this.addSpecialColumnToState(actionColumn.Uuid, actionColumn.ColumnId, DataType.String);
  }

  private addSpecialColumnToState(uuid: TypeUuid, columnId: string, dataType: DataType): void {
    const vendorColumn: Column | undefined = this.gridOptions
      .columnApi!.getAllColumns()
      .find(vc => vc.getColId() == columnId);

    if (vendorColumn) {
      let vendorColDef: ColDef = vendorColumn.getColDef();
      const specialColumn: IColumn = {
        Uuid: uuid,
        ColumnId: columnId,
        FriendlyName: columnId,
        DataType: dataType,
        Visible: false,
        ReadOnly: !vendorColDef.editable as boolean,
        Sortable: vendorColDef.sortable as boolean,
        Filterable: vendorColDef.filter as boolean,
      };

      if (this.isQuickFilterActive()) {
        this.createQuickFilterWrapper(vendorColumn);
        this.gridOptions.api!.refreshHeader();
      }

      this.dispatchAction(GridRedux.GridAddColumn(specialColumn));

      const quickSearchClassName = this.getQuickSearchClassName();
      this.addQuickSearchStyleToColumn(specialColumn, quickSearchClassName);

      this.addFiltersToVendorColumn(vendorColumn);

      if (this.isInitialised) {
        const conditionalStyleagGridStrategy: IConditionalStyleStrategy = this.strategies.get(
          StrategyConstants.ConditionalStyleStrategyId
        ) as IConditionalStyleStrategy;
        conditionalStyleagGridStrategy.initStyles();
      }
    }
  }

  public isGroupRecord(record: any): boolean {
    const rowNode: RowNode = record as RowNode;
    return rowNode.group;
  }

  public getFirstRecord() {
    // TODO: we can find a better way but its only used by Calccolumn on creation so not urgent
    let record: RowNode;
    this.gridOptions.api!.forEachNode(rowNode => {
      if (!rowNode.group) {
        if (!record) {
          record = rowNode;
        }
      }
    });
    return record;
  }

  // need to destroy more than just this...
  // TODO;  manage destruction properly
  destroy() {
    const abContainerElement = this.getBlotterContainerElement();
    if (abContainerElement != null) {
      ReactDOM.unmountComponentAtNode(abContainerElement);
    }
  }

  // TEMPORARY : JO
  public getIPPStyle(): IPPStyle {
    const headerFirstCol: HTMLElement = document
      .querySelectorAll('.ag-header-cell')
      .item(0) as HTMLElement;
    const header: HTMLElement = document.querySelector('.ag-header') as HTMLElement;
    const headerColStyle = window.getComputedStyle(header, null);
    const firstRow: HTMLElement = document.querySelector('.ag-row-even') as HTMLElement;
    const firstRowStyle = window.getComputedStyle(firstRow, null);
    const secondRow: HTMLElement = document.querySelector('.ag-row-odd') as HTMLElement;
    const secondRowStyle = window.getComputedStyle(secondRow, null);
    return {
      Header: {
        headerColor: new Color(headerColStyle.color).toHex(),
        headerBackColor: new Color(headerColStyle.backgroundColor).toHex(),
        headerFontFamily: headerColStyle.fontFamily,
        headerFontSize: headerColStyle.fontSize,
        headerFontStyle: headerColStyle.fontStyle,
        headerFontWeight: headerColStyle.fontWeight,
        height: Number(headerColStyle.height.replace('px', '')),
        Columns: this.api.gridApi.getColumns().map(col => {
          const headerColumn: HTMLElement = document.querySelector(
            `.ag-header-cell[col-id='${col.ColumnId}']`
          ) as HTMLElement;
          const headerColumnStyle = window.getComputedStyle(headerColumn || headerFirstCol, null);
          return {
            columnFriendlyName: col.FriendlyName,
            width: Number(headerColumnStyle.width.replace('px', '')),
            textAlign: headerColumnStyle.textAlign,
          };
        }),
      },
      Row: {
        color: new Color(firstRowStyle.color).toHex(),
        backColor: new Color(firstRowStyle.backgroundColor).toHex(),
        altBackColor: new Color(secondRowStyle.backgroundColor).toHex(),
        fontFamily: firstRowStyle.fontFamily,
        fontSize: firstRowStyle.fontSize,
        fontStyle: firstRowStyle.fontStyle,
        fontWeight: firstRowStyle.fontWeight,
        height: Number(firstRowStyle.height.replace('px', '')),
        Columns: this.api.gridApi.getColumns().map(col => {
          const cellElement: HTMLElement = document.querySelector(
            `.ag-cell[col-id='${col.ColumnId}']`
          ) as HTMLElement;
          const headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null);
          return {
            columnFriendlyName: col.FriendlyName,
            width: Number(headerColumnStyle.width.replace('px', '')),
            textAlign: headerColumnStyle.textAlign,
          };
        }),
      },
    };
  }

  private getBlotterContainerElement(): HTMLElement | null {
    if (!this.abContainerElement) {
      this.abContainerElement = document.getElementById(
        this.blotterOptions.containerOptions.adaptableBlotterContainer
      );
    }
    return this.abContainerElement;
  }

  private getGridContainerElement(): HTMLElement | null {
    if (!this.gridContainerElement) {
      this.gridContainerElement = document.getElementById(
        this.blotterOptions.containerOptions.vendorContainer
      );
    }
    return this.gridContainerElement;
  }

  private initInternalGridLogic() {
    if (this.renderGrid) {
      if (this.abContainerElement == null) {
        this.abContainerElement = this.getBlotterContainerElement();
      }
      if (this.abContainerElement == null) {
        LoggingHelper.LogAdaptableBlotterError(
          `There is no Div called ${this.blotterOptions.containerOptions.adaptableBlotterContainer} so cannot render the Adaptable Blotter`
        );
        return;
      }
    }

    const gridContainerElement = this.getGridContainerElement();
    if (gridContainerElement) {
      gridContainerElement.addEventListener('keydown', event => this.emit(KEY_DOWN_EVENT, event));
    }

    // vendorGrid.api.addGlobalListener((type: string, event: any) => {
    //     //console.log(event)
    // });
    // we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type
    // since there are many events and we want them to behave the same
    this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_VISIBLE, (params: any) => {
      if (params.visible) {
        this.updateQuickSearchRangeVisibleColumn(params.column.colId);
      }
    });

    const columnEventsThatTriggersStateChange = [
      Events.EVENT_COLUMN_MOVED,
      Events.EVENT_GRID_COLUMNS_CHANGED,
      Events.EVENT_COLUMN_EVERYTHING_CHANGED,
      Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
      //   Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
      Events.EVENT_COLUMN_VISIBLE,
      //   Events.EVENT_COLUMN_PINNED,
      Events.EVENT_NEW_COLUMNS_LOADED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
        // bit messy but better than alternative which was calling setColumnIntoStore for every single column
        const popupState = this.getState().Popup.ScreenPopup;
        if (
          popupState.ShowScreenPopup &&
          (popupState.ComponentName == ScreenPopups.ColumnChooserPopup ||
            ScreenPopups.CalculatedColumnPopup)
        ) {
          // ignore
        } else {
          // set the column into the store
          this.debouncedSetColumnIntoStore(); // was: this.setColumnIntoStore();
        }
        // refilter the grid if required
        this.debouncedFilterGrid();
      }
    });
    // dealing with scenario where the data is poured into the blotter after grid has been setup
    this.gridOptions.api!.addEventListener(Events.EVENT_FIRST_DATA_RENDERED, () => {
      this.debouncedSetColumnIntoStore();
    });
    // once the grid is ready we should make sure we are too
    this.gridOptions.api!.addEventListener(Events.EVENT_GRID_READY, () => {
      // do something?
    });
    // Pinning columms and changing column widths will trigger an auto save (if that and includvendorstate are both turned on)
    const columnEventsThatTriggersAutoLayoutSave = [
      Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
      Events.EVENT_COLUMN_PINNED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
        this.debouncedSaveGridLayout();
      }
    });

    // this event deals with when the user makes an edit - it doesnt look at ticking data
    this.gridOptions.api!.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
      // TODO: Jo: This is a workaround as we are accessing private members of agGrid.
      // I still wonder if we can do this nicer by using :   this.gridOptions.api!.getEditingCells();
      // must be a good reason why we don't use it

      const editor = (<any>this.gridOptions.api).rowRenderer.rowCompsByIndex[params.node.rowIndex]
        .cellComps[params.column.getColId()].cellEditor;

      // editor might be type Popup like agPopupTextCellEditor or agPopupSelectCellEditor (see: https://www.ag-grid.com/javascript-grid-cell-editing/)
      // if so then we need to get the inner editor
      if (editor instanceof PopupEditorWrapper) {
        this._currentEditor = (<any>this.gridOptions.api).rowRenderer.rowCompsByIndex[
          params.node.rowIndex
        ].cellComps[params.column.getColId()].cellEditor.cellEditor;
      } else {
        this._currentEditor = editor;
      }

      // No need to register for the keydown on the editor since we already register on the main div

      // if there was already an implementation set by the dev we keep the reference to it and execute it at the end
      const oldIsCancelAfterEnd = this._currentEditor.isCancelAfterEnd;
      const isCancelAfterEnd = () => {
        const dataChangedInfo: DataChangedInfo = {
          OldValue: this.gridOptions.api!.getValue(params.column.getColId(), params.node),
          NewValue: this._currentEditor.getValue(),
          ColumnId: params.column.getColId(),
          IdentifierValue: this.getPrimaryKeyValueFromRecord(params.node),
          Record: params.node,
        };

        const failedRules: CellValidationRule[] = this.ValidationService.ValidateCellChanging(
          dataChangedInfo
        );
        if (failedRules.length > 0) {
          // first see if its an error = should only be one item in array if so
          if (failedRules[0].ActionMode == 'Stop Edit') {
            const errorMessage: string = ObjectFactory.CreateCellValidationMessage(
              failedRules[0],
              this
            );
            this.api.alertApi.showAlertError('Validation Error', errorMessage, true);
            return true;
          }
          let warningMessage: string = '';
          failedRules.forEach(f => {
            warningMessage = `${warningMessage +
              ObjectFactory.CreateCellValidationMessage(f, this)}\n`;
          });
          const gridCell: GridCell = {
            primaryKeyValue: dataChangedInfo.IdentifierValue,
            columnId: dataChangedInfo.ColumnId,
            value: dataChangedInfo.NewValue,
          };

          const confirmAction: Redux.Action = GridRedux.GridSetValueLikeEdit(
            gridCell,
            this.gridOptions.api!.getValue(params.column.getColId(), params.node)
          );
          const cancelAction: Redux.Action = null;
          const confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
            confirmAction,
            cancelAction,
            warningMessage
          );

          this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
          // we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
          return true;
        }
        const whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false;
        if (!whatToReturn) {
          // audit the cell event if needed
          if (this.AuditLogService.isAuditCellEditsEnabled) {
            this.AuditLogService.addEditCellAuditLog(dataChangedInfo);
          }
          // it might be a free text column so we need to update the values
          this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedInfo);

          // do we need to also refresh calculated columns?
        }
        return whatToReturn;
      };
      this._currentEditor.isCancelAfterEnd = isCancelAfterEnd;
    });
    this.gridOptions.api!.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, () => {
      // (<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
      this._currentEditor = null;
      // We refresh the filter so we get live search/filter when editing.
      // Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb

      // if they have set to run filter after edit then lets do it
      this.filterOnUserDataChange();
      this.debouncedSetSelectedCells();
    });
    this.gridOptions.api!.addEventListener(Events.EVENT_SELECTION_CHANGED, () => {
      this.debouncedSetSelectedCells();
    });
    this.gridOptions.api!.addEventListener(Events.EVENT_RANGE_SELECTION_CHANGED, () => {
      this.debouncedSetSelectedCells();
    });
    // this.gridOptions.api!.addEventListener(Events.EVENT_TOOL_PANEL_VISIBLE_CHANGED, () => {
    // });

    //  this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGED, (params: any) => {
    // });
    this.gridOptions.api!.addEventListener(Events.EVENT_SORT_CHANGED, () => {
      this.onSortChanged();
      this.debouncedSetSelectedCells();
    });
    //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_UPDATED, (params: any) => {
    //  });
    //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_CHANGED, (params: any) => {
    // });
    this.gridOptions.api!.addEventListener(Events.EVENT_MODEL_UPDATED, (params: any) => {
      // not sure about this - doing it to make sure that we set the columns properly at least once!

      this.checkColumnsDataTypeSet();
    });

    //  this.gridOptions.api!.addEventListener(Events.EVENT_ROW_DATA_UPDATED, (params: any) => {
    //   });

    //   this.gridOptions.api!.addEventListener(Events.EVENT_ROW_VALUE_CHANGED, (params: any) => {
    //   });

    //   this.gridOptions.api!.addEventListener(Events.EVENT_ROW_DATA_CHANGED, (params: any) => {
    //   });

    // this handles ticking data
    // except it doesnt handle when data has been added to ag-Grid using updateRowData  ouch !!!
    this.gridOptions.api!.addEventListener(
      Events.EVENT_CELL_VALUE_CHANGED,
      (params: NewValueParams) => {
        // this gets called as soon as opening editor so make sure the values are different before starting any work...
        if (params.newValue != params.oldValue) {
          const identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
          const colId: string = params.colDef.field;
          const dataChangedInfo: DataChangedInfo = {
            OldValue: params.oldValue,
            NewValue: params.newValue,
            ColumnId: colId,
            IdentifierValue: identifierValue,
            Record: params.node,
          };

          this.DataService.CreateDataChangedEvent(dataChangedInfo);
          // 24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
          // so we manually raise.
          // https://github.com/JonnyAdaptableTools/adaptableblotter/issues/118
          const refreshColumnList: string[] = [colId];
          const columnList = this.calculatedColumnPathMap.get(colId);
          if (columnList) {
            columnList.forEach(columnId => {
              const dataChangedInfo: DataChangedInfo = {
                OldValue: params.oldValue,
                NewValue: this.gridOptions.api!.getValue(columnId, params.node),
                ColumnId: columnId,
                IdentifierValue: identifierValue,
                Record: params.node,
              };
              this.DataService.CreateDataChangedEvent(dataChangedInfo);
              ArrayExtensions.AddItem(refreshColumnList, columnId);
            });
          }

          // see if we need to refresh any percent bars
          this.api.percentBarApi.getAllPercentBar().forEach(pb => {
            refreshColumnList.forEach(changedColId => {
              if (
                StringExtensions.IsNotNullOrEmpty(pb.MaxValueColumnId) &&
                pb.MaxValueColumnId == changedColId
              ) {
                ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
              }
              if (
                StringExtensions.IsNotNullOrEmpty(pb.MinValueColumnId) &&
                pb.MinValueColumnId == changedColId
              ) {
                ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
              }
            });
          });

          // this is new  - giving users ability to filter on external data changes
          this.filterOnExternalDataChange();

          // only if visible...
          this.refreshCells([params.node], refreshColumnList);
        }
      }
    );

    // We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
    const originalisExternalFilterPresent = this.gridOptions.isExternalFilterPresent;
    this.gridOptions.isExternalFilterPresent = () => {
      const columnFilters: ColumnFilter[] = this.getState().ColumnFilter.ColumnFilters;
      const isFilterActive = ArrayExtensions.IsNotNullOrEmpty(columnFilters);
      if (isFilterActive) {
        // used in particular at init time to show the filter icon correctly
        for (const colFilter of columnFilters) {
          const agGridCol = this.gridOptions.columnApi!.getColumn(colFilter.ColumnId);
          if (agGridCol) {
            if (!agGridCol.isFilterActive()) {
              agGridCol.setFilterActive(true);
            }
          }
        }
      }
      const isSearchActive = StringExtensions.IsNotNullOrEmpty(
        this.getState().AdvancedSearch.CurrentAdvancedSearch
      );
      const isQuickSearchActive = StringExtensions.IsNotNullOrEmpty(
        this.getState().QuickSearch.QuickSearchText
      );
      // it means that originaldoesExternalFilterPass will be called to we reinit that collection
      return (
        isFilterActive ||
        isSearchActive ||
        isQuickSearchActive ||
        (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false)
      );
    };
    const originaldoesExternalFilterPass = this.gridOptions.doesExternalFilterPass;
    this.gridOptions.doesExternalFilterPass = (node: RowNode) => {
      const columns = this.api.gridApi.getColumns();

      // first we assess AdvancedSearch (if its running locally)
      if (this.blotterOptions.generalOptions.serverSearchOption == 'None') {
        const currentSearch = this.api.advancedSearchApi.getCurrentAdvancedSearch();
        if (currentSearch) {
          // See if our record passes the Expression - using Expression Helper; if not then return false
          if (
            !ExpressionHelper.checkForExpressionFromRecord(
              currentSearch.Expression,
              node,
              columns,
              this
            )
          ) {
            return false;
          }
        }
      }
      // we then assess filters
      if (
        this.blotterOptions.generalOptions.serverSearchOption == 'None' ||
        this.blotterOptions.generalOptions.serverSearchOption == 'AdvancedSearch'
      ) {
        const columnFilters: ColumnFilter[] = this.api.columnFilterApi.getAllColumnFilter();
        if (columnFilters.length > 0) {
          for (const columnFilter of columnFilters) {
            if (
              !ExpressionHelper.checkForExpressionFromRecord(
                columnFilter.Filter,
                node,
                columns,
                this
              )
            ) {
              return false;
            }
          }
        }
        // we next assess quicksearch
        const quickSearchState: QuickSearchState = this.api.quickSearchApi.getQuickSearchState();
        if (quickSearchState.DisplayAction != DisplayAction.HighlightCell) {
          if (StringExtensions.IsNullOrEmpty(quickSearchState.QuickSearchText)) {
            return true;
          }
          const quickSearchVisibleColumnExpresssions: Expression[] = this.getState().System
            .QuickSearchVisibleColumnExpressions;
          let quickSearchRange = this.getState().System.QuickSearchRange;
          if (quickSearchRange == null) {
            // might not have created so lets do it here
            quickSearchRange = RangeHelper.CreateValueRangeFromOperand(
              quickSearchState.QuickSearchText
            );
          }
          if (quickSearchRange != null) {
            const visibleCols = columns.filter(c => c.Visible);
            for (const column of visibleCols) {
              const expression = quickSearchVisibleColumnExpresssions.find(
                exp => exp.RangeExpressions[0].ColumnId == column.ColumnId
              );
              if (expression) {
                if (
                  ExpressionHelper.checkForExpressionFromRecord(expression, node, [column], this)
                ) {
                  return originaldoesExternalFilterPass
                    ? originaldoesExternalFilterPass(node)
                    : true;
                }
              }
            }
          } else {
            return true; // is this right????
          }
          return false;
        }
      }
      return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
    };

    // add any special renderers
    this.api.percentBarApi.getAllPercentBar().forEach(pcr => {
      this.addPercentBar(pcr);
    });

    const originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
    this.gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
      // couldnt find a way to listen for menu close. There is a Menu Item Select
      // but you can also clsoe the menu from filter and clicking outside the menu....
      const colId: string = params.column.getColId();

      // not quite sure we why do it this way
      // we clear the column menu
      // set all the items
      // then read them 5 lines below !....
      this.dispatchAction(MenuRedux.ClearColumntMenu());
      const column: IColumn = ColumnHelper.getColumnFromId(colId, this.api.gridApi.getColumns());
      if (column != null) {
        this.strategies.forEach(s => {
          s.addColumnMenuItem(column);
        });
      }

      let colMenuItems: (string | MenuItemDef)[];
      // if there was an initial implementation we init the list of menu items with this one, otherwise we take
      // the default items
      if (originalgetMainMenuItems) {
        const originalMenuItems = originalgetMainMenuItems(params);
        colMenuItems = originalMenuItems.slice(0);
      } else {
        colMenuItems = params.defaultItems.slice(0);
      }
      colMenuItems.push('separator');

      this.getState().Menu.ColumnMenu.MenuItems.forEach((x: AdaptableBlotterMenuItem) => {
        const glyph = this.abContainerElement.ownerDocument.createElement('span');
        glyph.className = `glyphicon glyphicon-${x.GlyphIcon}`;
        colMenuItems.push({
          name: x.Label,
          action: () => this.dispatchAction(x.Action),
          icon: glyph,
        });
      });
      return colMenuItems;
    };
    /*
        this.AdaptableBlotterStore.Load
            .then(() => this.strategies.forEach(strat => strat.initializeWithRedux()), (e) => {
                LoggingHelper.LogAdaptableBlotterError('Failed to Init AdaptableBlotterStore : ', e);
                //for now i'm still initializing the strategies even if loading state has failed....
                //we may revisit that later
                this.strategies.forEach(strat => strat.initializeWithRedux());

            });
*/

    const originalgetContextMenuItems = this.gridOptions.getContextMenuItems;
    this.gridOptions.getContextMenuItems = (params: GetContextMenuItemsParams) => {
      // this is the agGrid Context Menu that we might want to listen to...

      let colMenuItems: (string | MenuItemDef)[];
      // if there was an initial implementation we init the list of menu items with this one, otherwise we take default items
      // this allows us to ensure that devs can still create their own agGrid context menu without losing ours
      if (originalgetContextMenuItems) {
        const originalContexttems = originalgetContextMenuItems(params);
        colMenuItems = originalContexttems.slice(0);
      } else {
        colMenuItems = params.defaultItems.slice(0);
      }
      colMenuItems.push('separator');

      // this is where we will add extra itesm...

      return colMenuItems;
    };
  }

  public addPercentBar(pcr: PercentBar): void {
    const renderedColumn = ColumnHelper.getColumnFromId(
      pcr.ColumnId,
      this.api.gridApi.getColumns()
    );
    if (renderedColumn) {
      const cellRendererFunc: ICellRendererFunc = this.agGridHelper.createPercentBarCellRendererFunc(
        pcr,
        this.blotterOptions.blotterId!
      );
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(pcr.ColumnId);
      const coldDef: ColDef = vendorGridColumn.getColDef();
      coldDef.cellRenderer = cellRendererFunc;

      // change the style from number-cell temporarily?
      if (coldDef.cellClass == 'number-cell') {
        coldDef.cellClass = 'number-cell-changed';
      }

      if (pcr.ShowToolTip != null && pcr.ShowToolTip == true) {
        coldDef.tooltipField = 'changeOnYear';
        // for now NOT using this PercentBarTooltip but we can add it later and will be powwerful.
        //  coldDef.tooltipComponent = PercentBarTooltip;
      } else {
        coldDef.tooltipField = '';
      }
    }
  }

  public removePercentBar(pcr: PercentBar): void {
    const renderedColumn = ColumnHelper.getColumnFromId(
      pcr.ColumnId,
      this.api.gridApi.getColumns()
    );
    if (renderedColumn) {
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(pcr.ColumnId);
      // note we dont get it from the original (but I guess it will be applied next time you run...)
      vendorGridColumn.getColDef().cellRenderer = null;
      const coldDef: ColDef = vendorGridColumn.getColDef();
      coldDef.cellRenderer = null;
      // change the style back if it was changed by us
      if (coldDef.cellClass == 'number-cell-changed') {
        coldDef.cellClass = 'number-cell';
      }
    }
  }

  public editPercentBar(pcr: PercentBar): void {
    this.removePercentBar(pcr);
    this.addPercentBar(pcr);
  }

  private onSortChanged(): void {
    const sortModel: any[] = this.gridOptions.api!.getSortModel();

    const columnSorts: ColumnSort[] = [];
    if (sortModel != null) {
      if (sortModel.length > 0) {
        sortModel.forEach(sm => {
          if (ColumnHelper.isSpecialColumn(sm.colId)) {
            const groupedColumn: Column = this.gridOptions.columnApi
              .getAllColumns()
              .find(c => c.isRowGroupActive() == true);
            if (groupedColumn) {
              const customSort: CustomSort = this.api.customSortApi
                .getAllCustomSort()
                .find(cs => cs.ColumnId == groupedColumn.getColId());
              if (customSort) {
                // check that not already applied
                if (
                  !this.getState().Grid.ColumnSorts.find((gs: ColumnSort) =>
                    ColumnHelper.isSpecialColumn(gs.Column)
                  )
                ) {
                  const customSortStrategy: CustomSortStrategyagGrid = this.strategies.get(
                    StrategyConstants.CustomSortStrategyId
                  ) as CustomSortStrategyagGrid;
                  const groupCustomSort: CustomSort = ObjectFactory.CreateEmptyCustomSort();
                  groupCustomSort.ColumnId = sm.colId;
                  groupCustomSort.SortedValues = customSort.SortedValues;
                  const comparator: any = customSortStrategy.getComparerFunction(
                    groupCustomSort,
                    this
                  );
                  this.setCustomSort(sm.colId, comparator);
                }
              }
            }
          }
          const columnSort: ColumnSort = {
            Column: sm.colId,
            SortOrder: sm.sort == 'asc' ? SortOrder.Ascending : SortOrder.Descending,
          };
          columnSorts.push(columnSort);
        });
      }
    }
    this.dispatchAction(GridRedux.GridSetSort(columnSorts));
  }

  public getRowCount(): number {
    return this.gridOptions.rowData
      ? this.gridOptions.rowData.length
      : this.gridOptions.api!.getDisplayedRowCount();
  }

  public getColumnCount(): number {
    return this.gridOptions.columnApi!.getAllColumns().length;
  }

  public getVisibleRowCount(): number {
    return this.gridOptions.api!.getDisplayedRowCount();
  }

  public getVisibleColumnCount(): number {
    return this.gridOptions.columnApi!.getAllColumns().filter(c => c.isVisible()).length;
  }

  public selectColumn(columnId: string) {
    this.gridOptions.api!.clearRangeSelection();
    const cellRangeParams: CellRangeParams = {
      rowStartIndex: 0,
      rowEndIndex: this.gridOptions.api!.getDisplayedRowCount(),
      columnStart: columnId,
      columnEnd: columnId,
      //floatingStart: 'top',
      //floatingEnd: 'bottom',
    };
    this.gridOptions.api!.addCellRange(cellRangeParams);
  }

  public setColumnSort(columnSorts: ColumnSort[]): void {
    // get the sort model
    const sortModel: any[] = [];
    columnSorts.forEach(gs => {
      const sortDescription: string = gs.SortOrder == SortOrder.Ascending ? 'asc' : 'desc';
      sortModel.push({ colId: gs.Column, sort: sortDescription });
    });
    this.gridOptions.api!.setSortModel(sortModel);
    this.gridOptions.api!.onSortChanged();
  }

  public setGridData(dataSource: any) {
    this.gridOptions.api!.setRowData(dataSource);
  }

  private updateQuickSearchRangeVisibleColumn(columnId: string): void {
    if (this.isInitialised) {
      const quickSearchState: QuickSearchState = this.api.quickSearchApi.getQuickSearchState();
      // only update if quick search is not highlight and is set - rare use case...
      if (
        quickSearchState.DisplayAction != DisplayAction.HighlightCell &&
        StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
      ) {
        const quickSearchRange: QueryRange = this.getState().System.QuickSearchRange;
        const column: IColumn = ColumnHelper.getColumnFromId(
          columnId,
          this.api.gridApi.getColumns()
        );

        if (quickSearchRange != null) {
          if (
            RangeHelper.IsColumnAppropriateForRange(
              quickSearchRange.Operator as LeafExpressionOperator,
              column
            )
          ) {
            const quickSearchVisibleColumnExpression: Expression = ExpressionHelper.CreateSingleColumnExpression(
              column.ColumnId,
              null,
              null,
              null,
              [quickSearchRange]
            );
            const quickSearchVisibleColumnExpressions: Expression[] = [].concat(
              this.getState().System.QuickSearchVisibleColumnExpressions
            );
            quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
            this.adaptableBlotterStore.TheStore.dispatch(
              SystemRedux.QuickSearchSetVisibleColumnExpressions(
                quickSearchVisibleColumnExpressions
              )
            );
          }
        }
      }
    }
  }

  private checkColumnsDataTypeSet(): any {
    // check that we have no unknown columns - if we do then ok
    const firstCol = this.api.gridApi.getColumns()[0];
    if (firstCol && firstCol.DataType == DataType.Unknown) {
      this.setColumnIntoStore();
    }
  }

  public getVendorGridState(visibleCols: string[], forceFetch: boolean): VendorGridInfo {
    // forceFetch is used for default layout and just gets everything in the grid's state - not nice and can be refactored
    if (forceFetch) {
      return {
        GroupState: null,
        ColumnState: JSON.stringify(this.gridOptions.columnApi!.getColumnState()),
      };
    }

    if (
      this.blotterOptions.layoutOptions != null &&
      this.blotterOptions.layoutOptions.includeVendorStateInLayouts != null &&
      this.blotterOptions.layoutOptions.includeVendorStateInLayouts
    ) {
      let groupedState: any = null;
      const displayedColumns: Column[] = this.gridOptions.columnApi!.getAllDisplayedColumns();
      const groupedCol = displayedColumns.find(c => ColumnHelper.isSpecialColumn(c.getColId()));
      if (groupedCol) {
        groupedState = groupedCol.getActualWidth();
      }

      const columnState = this.gridOptions.columnApi!.getColumnState();

      // Dont like this but not sure we have a choice to avoid other issues...
      // Going to update the state to make sure that visibility matches those given here
      columnState.forEach(c => {
        // to do
        const colId: string = c.colId;
        if (visibleCols.find(v => v == colId)) {
          c.hide = false;
        } else {
          c.hide = true;
        }
      });
      return {
        GroupState: groupedState,
        ColumnState: JSON.stringify(columnState),
      };
    }
    return null; // need this?
  }

  public setVendorGridState(vendorGridState: VendorGridInfo): void {
    if (vendorGridState) {
      const columnState: any = JSON.parse(vendorGridState.ColumnState);
      if (columnState) {
        this.setColumnState(this.gridOptions.columnApi, columnState, 'api');
      }

      const groupedState: any = vendorGridState.GroupState;
      if (groupedState) {
        // assume for now its just a number
        const column: Column = this.gridOptions.columnApi!.getColumn('ag-Grid-AutoColumn');
        if (column) {
          this.gridOptions.columnApi!.setColumnWidth(column, groupedState, true);
        }
      }
    }
  }

  // these 3 methods are strange as we shouldnt need to have to set a columnEventType but it seems agGrid forces us to
  // not sure why as its not in the api
  private setColumnVisible(columnApi: any, col: any, isVisible: boolean, columnEventType: string) {
    columnApi.setColumnVisible(col, isVisible, columnEventType);
  }

  private moveColumn(columnApi: any, col: any, index: number, columnEventType: string) {
    columnApi.moveColumn(col, index, columnEventType);
  }

  private setColumnState(columnApi: any, columnState: any, columnEventType: string) {
    columnApi.setColumnState(columnState, columnEventType);
  }

  public isSelectable(): boolean {
    if (this.gridOptions.enableRangeSelection != null) {
      return this.gridOptions.enableRangeSelection;
    }
    return false;
  }

  private isQuickFilterActive(): boolean {
    return (
      this.gridOptions.floatingFilter != null &&
      this.gridOptions.floatingFilter == true &&
      this.blotterOptions.filterOptions.useAdaptableBlotterQuickFilter
    );
  }

  public showQuickFilter(): void {
    if (this.blotterOptions.filterOptions!.useAdaptableBlotterQuickFilter) {
      this.gridOptions.floatingFilter = true;
      this.gridOptions.columnApi!.getAllGridColumns().forEach(col => {
        this.createQuickFilterWrapper(col);
      });
      this.gridOptions.api!.refreshHeader();
    }
  }

  public hideQuickFilter(): void {
    if (this.blotterOptions.filterOptions!.useAdaptableBlotterQuickFilter) {
      this.gridOptions.floatingFilter = false;
      this.gridOptions.api!.refreshHeader();
    }
  }

  public applyLightTheme(): void {
    if (
      this.blotterOptions.generalOptions.useDefaultVendorGridThemes &&
      StringExtensions.IsNotNullOrEmpty(this.blotterOptions.containerOptions.vendorContainer)
    ) {
      const container = this.getGridContainerElement();
      if (container != null) {
        const light = this.agGridHelper.getLightThemeName();
        const dark = this.agGridHelper.getDarkThemeName();

        container.classList.remove(light);
        container.classList.remove(dark);

        container.classList.add(light);
      }
    }

    this.applyBlotterTheme(this.getBlotterLightThemeName());
  }

  public getBlotterLightThemeName() {
    return 'ab--theme-light';
  }

  public getBlotterDarkThemeName() {
    return 'ab--theme-dark';
  }

  public applyDarkTheme(): void {
    if (
      this.blotterOptions.generalOptions.useDefaultVendorGridThemes &&
      StringExtensions.IsNotNullOrEmpty(this.blotterOptions.containerOptions.vendorContainer)
    ) {
      const container = this.getGridContainerElement();
      if (container != null) {
        const light = this.agGridHelper.getLightThemeName();
        const dark = this.agGridHelper.getDarkThemeName();

        container.classList.remove(light);
        container.classList.remove(dark);

        container.classList.add(dark);
      }
    }

    this.applyBlotterTheme(this.getBlotterDarkThemeName());
  }

  private applyBlotterTheme(themeClassName: string) {
    const blotterContainer = this.getBlotterContainerElement();
    if (blotterContainer) {
      blotterContainer.classList.remove(this.getBlotterDarkThemeName());
      blotterContainer.classList.remove(this.getBlotterLightThemeName());
      blotterContainer.classList.add(themeClassName);
    }

    if (document.documentElement) {
      // also add those classes on the document element
      document.documentElement.classList.remove(this.getBlotterDarkThemeName());
      document.documentElement.classList.remove(this.getBlotterLightThemeName());
      document.documentElement.classList.add(themeClassName);
    }
  }

  // Method called after we have rendered the grid
  // where we apply our stuff but also any ag-Grid props that we control
  private applyFinalRendering(): void {
    // Apply row styles here?  weird that it cannot find the method in Helper.
    this.agGridHelper.setUpRowStyles();

    // not sure if this is the right place here.
    // perhaps we need some onDataLoaded event??
    let editLookUpCols: EditLookUpColumn[] = this.api.userInterfaceApi.getUserInterfaceState()
      .EditLookUpColumns;
    if (ArrayExtensions.IsNotNullOrEmpty(editLookUpCols)) {
      const colDefs: ColDef[] = this.gridOptions.columnApi!.getAllColumns().map(x => x.getColDef());

      editLookUpCols.forEach((e: EditLookUpColumn) => {
        const colDefIndex = colDefs.findIndex(x => x.field == e.ColumnId);

        const newColDef: ColDef = colDefs[colDefIndex];
        newColDef.cellEditor = 'agRichSelectCellEditor';
        if (ArrayExtensions.IsNullOrEmpty(e.LookUpValues)) {
          newColDef.cellEditorParams = {
            values: this.getColumnValueDisplayValuePairDistinctList(
              e.ColumnId,
              DistinctCriteriaPairValue.DisplayValue,
              false
            ).map(t => t.DisplayValue),
          };
        } else {
          newColDef.cellEditorParams = {
            values: e.LookUpValues,
          };
        }
        colDefs[colDefIndex] = newColDef;
      });
      this.agGridHelper.safeSetColDefs(colDefs);
    }

    // add the filter header style if required
    if (this.blotterOptions.filterOptions!.indicateFilteredColumns == true) {
      var css = document.createElement('style');
      css.id = `${this.blotterOptions.blotterId}_filtered-columns-style`;
      css.type = 'text/css';
      css.innerHTML = '.ag-header-cell-filtered {  font-style: italic; font-weight: bolder;}';
      document.body.appendChild(css);
    }

    // sometimes the header row looks wrong when using quick filter so to be sure...
    if (this.isQuickFilterActive()) {
      this.dispatchAction(GridRedux.QuickFilterBarShow());
      this.gridOptions.api!.refreshHeader();
    }

    // if user layout and a percent bar sometimes the first few cells are pre-rendered so we frig it like this
    const currentlayout: string = this.api.layoutApi.getCurrentLayoutName();
    if (
      currentlayout != DEFAULT_LAYOUT &&
      ArrayExtensions.IsNotNullOrEmpty(this.api.percentBarApi.getAllPercentBar())
    ) {
      this.api.layoutApi.setLayout(DEFAULT_LAYOUT);
    }

    // at the end so load the current layout
    this.api.layoutApi.setLayout(currentlayout);
  }

  // A couple of state management functions
  private getState(): AdaptableBlotterState {
    return this.adaptableBlotterStore.TheStore.getState();
  }

  private dispatchAction(action: Action): void {
    this.adaptableBlotterStore.TheStore.dispatch(action);
  }
}
