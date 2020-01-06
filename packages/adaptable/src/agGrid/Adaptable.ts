import {
  Grid,
  CellRange,
  CellRangeParams,
  PopupEditorWrapper,
  RefreshCellsParams,
  ITooltipParams,
  GridOptions,
  Column,
  RowNode,
  ICellEditor,
  ICellRendererFunc,
  SideBarDef,
  ToolPanelDef,
} from 'ag-grid-community';
import 'ag-grid-enterprise';

import * as Redux from 'redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';

import { Events } from 'ag-grid-community/dist/lib/eventKeys';
import {
  NewValueParams,
  ValueGetterParams,
  ColDef,
  ValueFormatterParams,
  ColGroupDef,
  ValueSetterParams,
} from 'ag-grid-community/dist/lib/entities/colDef';
import {
  GetMainMenuItemsParams,
  MenuItemDef,
  GetContextMenuItemsParams,
} from 'ag-grid-community/dist/lib/entities/gridOptions';
import { Action } from 'redux';
import Emitter, { EmitterCallback } from '../Utilities/Emitter';
import { AdaptableApp } from '../View/AdaptableView';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as StyleConstants from '../Utilities/Constants/StyleConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
// redux / store
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableStore, INIT_STATE } from '../Redux/Store/AdaptableStore';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
// services
import { ICalendarService } from '../Utilities/Services/Interface/ICalendarService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../Utilities/Services/AuditLogService';
import { StyleService } from '../Utilities/Services/StyleService';
import { IStyleService } from '../Utilities/Services/Interface/IStyleService';
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
import { IStrategyCollection, IStrategy } from '../Strategy/Interface/IStrategy';
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
  MessageType,
} from '../PredefinedConfig/Common/Enums';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { Color } from '../Utilities/color';
import { IPPStyle } from '../Utilities/Interface/IPPStyle';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
// Helpers
import { ColumnHelper, getColumnsFromFriendlyNames } from '../Utilities/Helpers/ColumnHelper';
import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../Utilities/Helpers/Helper';

// ag-Grid
// if you add an import from a different folder for aggrid you need to add it to externals in the webpack prod file
import { Expression, QueryRange } from '../PredefinedConfig/Common/Expression';
import { RangeHelper } from '../Utilities/Helpers/RangeHelper';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AdaptableApiImpl } from '../Api/Implementation/AdaptableApiImpl';
import {
  DEFAULT_LAYOUT,
  HALF_SECOND,
  LIGHT_THEME,
  DARK_THEME,
} from '../Utilities/Constants/GeneralConstants';
import { CustomSortStrategyagGrid } from './Strategy/CustomSortStrategyagGrid';
import { agGridHelper } from './agGridHelper';
import { AdaptableToolPanelBuilder } from '../View/Components/ToolPanel/AdaptableToolPanel';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ScheduleService } from '../Utilities/Services/ScheduleService';
import { QuickSearchState } from '../PredefinedConfig/QuickSearchState';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { SearchService } from '../Utilities/Services/SearchService';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { ColumnFilter } from '../PredefinedConfig/ColumnFilterState';
import { VendorGridInfo, PivotDetails } from '../PredefinedConfig/LayoutState';
import { CustomSort } from '../PredefinedConfig/CustomSortState';
import { EditLookUpColumn, UserMenuItem } from '../PredefinedConfig/UserInterfaceState';
import { createUuid, TypeUuid } from '../PredefinedConfig/Uuid';
import { ActionColumn } from '../PredefinedConfig/ActionColumnState';
import { ActionColumnRenderer } from './ActionColumnRenderer';
import { AdaptableTheme } from '../PredefinedConfig/ThemeState';
import { GeneralOptions } from '../AdaptableOptions/GeneralOptions';
import { GridRow, RowInfo } from '../Utilities/Interface/Selection/GridRow';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { IHomeStrategy } from '../Strategy/Interface/IHomeStrategy';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { DefaultSparklinesChartProperties } from '../Utilities/Defaults/DefaultSparklinesChartProperties';
import AdaptableWizardView from '../View/AdaptableWizardView';

import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { Glue42Service } from '../Utilities/Services/Glue42Service';
import { IGlue42Service } from '../Utilities/Services/Interface/IGlue42Service';
import { IReportService } from '../Utilities/Services/Interface/IReportService';
import { ReportService } from '../Utilities/Services/ReportService';
import { AdaptableApi } from '../Api/AdaptableApi';
import { AdaptableState } from '../PredefinedConfig/AdaptableState';
import { PushPullService } from '../Utilities/Services/PushPullService';
import { IPushPullService } from '../Utilities/Services/Interface/IPushPullService';
import { ILayoutService } from '../Utilities/Services/Interface/ILayoutService';
import { IStrategyService, StrategyService } from '../Utilities/Services/StrategyService';
import { LayoutService } from '../Utilities/Services/LayoutService';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { IFilterService } from '../Utilities/Services/Interface/IFilterService';
import { FilterService } from '../Utilities/Services/FilterService';
import { DefaultAdaptableOptions } from '../Utilities/Defaults/DefaultAdaptableOptions';
import { AdaptableOptions } from '../AdaptableOptions/AdaptableOptions';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableToolPanelContext } from '../Utilities/Interface/AdaptableToolPanelContext';
import {
  IAdaptableNoCodeWizard,
  IAdaptableNoCodeWizardOptions,
  IAdaptableNoCodeWizardInitFn,
} from '../AdaptableInterfaces/IAdaptableNoCodeWizard';
import { AdaptablePlugin } from '../AdaptableOptions/AdaptablePlugin';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';

// do I need this in both places??
type RuntimeConfig = {
  instantiateGrid?: (...args: any[]) => any;
};

const RowNodeProto: any = RowNode.prototype as unknown;
const RowNode_dispatchLocalEvent = RowNodeProto.dispatchLocalEvent;

/**
 * Since column definitions can be nested and have groups
 * we use this forEachColumn function to call the passed-in `fn`
 * which will be called with just ColDef (not ColGroupDef), so just column definitions, not group definitions
 */
const forEachColumn = (
  cols: (ColDef | ColGroupDef)[],
  fn: (
    columnDef: ColDef,
    i: number,
    arr: (ColDef | ColGroupDef)[],
    parentColGroup?: ColGroupDef
  ) => any,
  parentColGroup?: ColGroupDef
) => {
  cols.forEach((col, i, arr) => {
    if ((col as ColGroupDef).children) {
      forEachColumn((col as ColGroupDef).children, fn, col as ColGroupDef);
    } else {
      fn(col, i, arr, parentColGroup);
    }
  });
};

export class Adaptable implements IAdaptable {
  public api: AdaptableApi;

  public strategies: IStrategyCollection;

  public AdaptableStore: IAdaptableStore;

  public adaptableOptions: AdaptableOptions;

  public vendorGridName: any;

  public CalendarService: ICalendarService;

  public DataService: IDataService;

  public ValidationService: IValidationService;

  public AuditLogService: IAuditLogService;

  public ChartService: IChartService;

  public StyleService: IStyleService;

  public LayoutService: ILayoutService;

  public StrategyService: IStrategyService;

  public FilterService: IFilterService;

  public CalculatedColumnExpressionService: ICalculatedColumnExpressionService;

  public FreeTextColumnService: IFreeTextColumnService;

  public ScheduleService: IScheduleService;

  public SearchService: ISearchService;

  public Glue42Service: IGlue42Service;

  public PushPullService: IPushPullService;

  public ReportService: IReportService;

  public embedColumnMenu: boolean;

  private calculatedColumnPathMap: Map<string, string[]> = new Map();

  private useRowNodeLookUp: boolean;

  private abContainerElement: HTMLElement;

  private gridContainerElement: HTMLElement;

  public gridOptions: GridOptions;

  public isInitialised: boolean;

  private throttleOnDataChangedUser: ((rowNodes: RowNode[]) => void) & _.Cancelable;

  private throttleOnDataChangedExternal: ((rowNodes: RowNode[]) => void) & _.Cancelable;

  private agGridHelper: agGridHelper;

  private renderGrid: boolean;

  private runtimeConfig?: RuntimeConfig;

  private emitter: Emitter;

  private _currentEditor: ICellEditor;

  // only for our private / internal events used within Adaptable
  // public events are emitted through the EventApi
  _on = (eventName: string, callback: EmitterCallback): (() => void) =>
    this.emitter.on(eventName, callback);
  private _emit = (eventName: string, data?: any): Promise<any> =>
    this.emitter.emit(eventName, data);

  // new static constructor which takes an Adaptable adaptable object and returns the api object
  // going forward this should be the only way that we instantiate and use Adaptable and everything should be accessible via the API
  public static init(adaptableOptions: AdaptableOptions): AdaptableApi {
    const extraOptions = {
      renderGrid: undefined as boolean,
      runtimeConfig: null as RuntimeConfig,
    };

    if (Array.isArray(adaptableOptions.plugins)) {
      adaptableOptions.plugins.forEach(plugin => {
        plugin.beforeInit(adaptableOptions, extraOptions);
      });
    }

    const ab = new Adaptable(
      adaptableOptions,
      extraOptions.renderGrid,
      extraOptions.runtimeConfig,
      true
    );

    if (Array.isArray(adaptableOptions.plugins)) {
      adaptableOptions.plugins.forEach(plugin => {
        plugin.afterInit(ab);
      });
    }

    return ab.api;
  }

  // the 'old' constructor which takes an Adaptable adaptable object
  // this is still used internally but should not be used externally as a preference
  constructor(
    adaptableOptions: AdaptableOptions,
    renderGrid: boolean = true,
    runtimeConfig?: RuntimeConfig,
    _staticInit?: boolean
  ) {
    if (!_staticInit) {
      console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! You should not use the "Adaptable" constructor directly, as it is deprecated and will not work in a future version!
!!!!!!!
!!!!!!! Use Adaptable.init(adaptableOptions) instead.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    }
    this.emitter = new Emitter();

    this.renderGrid = renderGrid;
    // we create AdaptableOptions by merging the values provided by the user with the defaults (where no value has been set)
    this.adaptableOptions = AdaptableHelper.assignadaptableOptions(adaptableOptions);
    AdaptableHelper.CheckadaptableOptions(this.adaptableOptions);
    this.runtimeConfig = runtimeConfig;

    this.gridOptions = this.adaptableOptions!.vendorGrid;
    if (this.gridOptions.allowContextMenuWithControlKey === undefined) {
      this.gridOptions.allowContextMenuWithControlKey = true;
    }
    this.vendorGridName = 'agGrid';
    this.embedColumnMenu = true;
    this.isInitialised = false;

    this.useRowNodeLookUp = false; // we will set later in instantiate if possible to be true

    this.forPlugins(plugin => plugin.afterInitOptions(this, this.adaptableOptions));

    // get the api ready
    this.api = new AdaptableApiImpl(this);
    this.forPlugins(plugin => plugin.afterInitApi(this, this.api));

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
    this.Glue42Service = new Glue42Service(this);
    this.PushPullService = new PushPullService(this);
    this.ReportService = new ReportService(this);
    this.LayoutService = new LayoutService(this);
    this.FilterService = new FilterService(this);
    this.StrategyService = new StrategyService(this);
    this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(
      this,
      (columnId, rowNode) => this.gridOptions.api!.getValue(columnId, rowNode)
    );

    this.forPlugins(plugin => plugin.afterInitServices(this));

    // we prefer the grid to be NOT instantiated so that we can do it
    // perhaps in future we will force instantiation only?
    const isGridInstantiated =
      this.gridOptions.api && typeof this.gridOptions.api!.getValue === 'function';
    if (!isGridInstantiated) {
      const canInstantiateGrid = this.tryInstantiateAgGrid();
      if (!canInstantiateGrid) {
        // we have no grid, we can't do anything
        LoggingHelper.LogAdaptableError('Unable to set up ag-Grid');
        return;
      }
    }

    // add our adaptable object to the grid options api object
    // this is VERY useful for when we need to access Adaptable inside of agGrid only functions
    if (this.gridOptions.api) {
      (this.gridOptions.api as any).__adaptable = this;
    }

    // Set up strategies - we set up all the strategies suitable for the vendor grid
    // But users can make some hidden or readonly in their entitlements
    this.strategies = this.agGridHelper.setUpStrategies();

    // Load the store
    this.AdaptableStore.Load.then(
      () => this.strategies.forEach(strat => strat.initializeWithRedux()),
      e => {
        LoggingHelper.LogAdaptableError('Failed to Init AdaptableStore : ', e);
        // for now we initiliaze the strategies even if loading state has failed (perhaps revisit this?)
        this.strategies.forEach(strat => strat.initializeWithRedux());
        this.api.internalApi.hideLoadingScreen(); // doesnt really help but at least clears the screen
      }
    )
      .then(
        () => this.initInternalGridLogic(),
        e => {
          LoggingHelper.LogAdaptableError('Failed to Init Strategies : ', e);
          // for now we initiliaze the grid even if initialising strategies has failed (perhaps revisit this?)
          this.initInternalGridLogic();
          this.api.internalApi.hideLoadingScreen(); // doesnt really help but at least clears the screen
        }
      )
      .then(async () => {
        this.applyFinalRendering();
        this.isInitialised = true;
        this.api.internalApi.hideLoadingScreen();
      });

    // render Adaptable - might be false because for example the react wrapper will skip rendering
    // as it will do rendering by itself
    if (renderGrid) {
      if (this.abContainerElement == null) {
        this.abContainerElement = this.getadaptableContainerElement();
      }
      if (this.abContainerElement != null) {
        this.abContainerElement.innerHTML = '';
        ReactDOM.render(AdaptableApp({ Adaptable: this }), this.abContainerElement);
      }
    }

    // create debounce methods that take a time based on user settings
    this.throttleOnDataChangedUser = _.throttle(
      this.applyDataChange,
      this.adaptableOptions!.filterOptions!.filterActionOnUserDataChange.ThrottleDelay
    );
    this.throttleOnDataChangedExternal = _.throttle(
      this.applyDataChange,
      this.adaptableOptions!.filterOptions.filterActionOnExternalDataChange.ThrottleDelay
    );
  }

  forPlugins(callback: (plugin: AdaptablePlugin) => any) {
    if (Array.isArray(this.adaptableOptions.plugins)) {
      this.adaptableOptions.plugins.forEach(plugin => {
        callback(plugin);
      });
    }
  }

  private initStore() {
    this.AdaptableStore = new AdaptableStore(this);

    this.forPlugins(plugin => plugin.afterInitStore(this, this.AdaptableStore));

    this.AdaptableStore.onAny((eventName: string, data: any) => {
      this.forPlugins(plugin => plugin.onStoreEvent(eventName, data, this.AdaptableStore));

      if (eventName == INIT_STATE) {
        // and reset state also?
        this.forPlugins(plugin => plugin.onAdaptableReady(this, this.adaptableOptions));
        this.api.eventApi.emit('AdaptableReady', this.adaptableOptions.adaptableId);
      }
    });
  }

  private tryInstantiateAgGrid(): boolean {
    const vendorContainer = this.getGridContainerElement();
    if (!vendorContainer) {
      LoggingHelper.LogAdaptableError(
        'You must provide an element id in `containerOptions.vendorContainer`'
      );
      return false;
    }

    // set up whether we use the getRowNode method or loop when finding a rowNode (former is preferable)
    // can only do that here as the gridOptions not yet set up
    this.useRowNodeLookUp = this.agGridHelper.TrySetUpNodeIds();

    // Create Adaptable adaptable Tool Panel
    if (this.adaptableOptions!!.userInterfaceOptions!.showAdaptableToolPanel) {
      LoggingHelper.LogAdaptableInfo('Adding Adaptable Tool Panel');
      this.gridOptions.sideBar = this.gridOptions.sideBar || {};
      this.gridOptions.components = this.gridOptions.components || {};
      // https://www.ag-grid.com/javascript-grid-side-bar/

      if (this.gridOptions.sideBar) {
        const sidebar = this.gridOptions.sideBar;
        if (sidebar === true) {
          // Possibility 1: Sidebar is true - meaning that they want the default filter and columns, so create both:
          this.gridOptions.sideBar = this.agGridHelper.createAdaptableSideBarDefs(true, true);
        } else if (sidebar === 'columns') {
          // Possibility 2: Sidebar is 'columns' (string) - meaning column only so create just that
          this.gridOptions.sideBar = this.agGridHelper.createAdaptableSideBarDefs(false, true);
        } else if (sidebar === 'filters') {
          // Possibility 3: Sidebar is 'filters' (string) - meaning filters only so create just that
          this.gridOptions.sideBar = this.agGridHelper.createAdaptableSideBarDefs(true, false);
        } else {
          // Possibilty 4: either no sidebar or they created their own; in either case, should add adaptable Tool panel
          const sidebarDef = this.gridOptions.sideBar as SideBarDef;
          if (sidebarDef) {
            sidebarDef.toolPanels = sidebarDef.toolPanels || [];
            sidebarDef.toolPanels.push(this.agGridHelper.createAdaptableToolPanel());
          }
        }
        const toolpanelContext: AdaptableToolPanelContext = { Adaptable: this };
        this.gridOptions.components.AdaptableToolPanel = AdaptableToolPanelBuilder(
          toolpanelContext
        );
      }
    }
    // now create the grid itself - we have to do it this way as previously when we instantiated the Grid 'properly' it got created as J.Grid
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

  debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), 250);

  debouncedSetSelectedRows = _.debounce(() => this.setSelectedRows(), HALF_SECOND);

  debouncedFilterGrid = _.debounce(() => this.applyGridFiltering(), HALF_SECOND);

  private filterOnUserDataChange(rowNodes: RowNode[]): void {
    if (
      this.adaptableOptions!.filterOptions.filterActionOnUserDataChange.RunFilter ==
      FilterOnDataChangeOptions.Always
    ) {
      this.applyDataChange(rowNodes);
    } else if (
      this.adaptableOptions!.filterOptions.filterActionOnUserDataChange.RunFilter ==
      FilterOnDataChangeOptions.Throttle
    ) {
      this.throttleOnDataChangedUser(rowNodes);
    }
  }

  private filterOnExternalDataChange(rowNodes: RowNode[]): void {
    if (
      this.adaptableOptions!.filterOptions.filterActionOnExternalDataChange.RunFilter ==
      FilterOnDataChangeOptions.Always
    ) {
      this.applyDataChange(rowNodes);
    } else if (
      this.adaptableOptions!.filterOptions.filterActionOnExternalDataChange.RunFilter ==
      FilterOnDataChangeOptions.Throttle
    ) {
      this.throttleOnDataChangedExternal(rowNodes);
    }
  }

  private createFilterWrapper(col: Column) {
    this.gridOptions.api!.destroyFilter(col);
    this.gridOptions.api!.getColumnDef(col).filter = FilterWrapperFactory(this);
    col.initialise();
  }

  private createQuickFilterWrapper(col: Column) {
    let vendorColDef: ColDef = this.gridOptions.api!.getColumnDef(col);
    if (vendorColDef) {
      vendorColDef.floatingFilterComponentParams = {
        suppressFilterButton: false,
      };
      vendorColDef.floatingFilterComponent = FloatingFilterWrapperFactory(this);
    }
  }

  public reloadGrid(): void {
    this._emit('GridReloaded');
  }

  public applyGridFiltering() {
    this.gridOptions.api!.onFilterChanged();
    this._emit('SearchApplied');
    this._emit('GridRefreshed');
  }

  private applyDataChange(rowNodes: RowNode[]) {
    let itemsToUpdate: any[] = rowNodes.map((rowNode: RowNode) => {
      return rowNode.data;
    });
    if (ArrayExtensions.IsNotNullOrEmpty(itemsToUpdate)) {
      this.gridOptions.api!.updateRowData({ update: itemsToUpdate });
      this._emit('GridRefreshed');
    }
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

  public setNewColumnListOrder(VisibleColumnList: Array<AdaptableColumn>): void {
    const allColumns = this.gridOptions.columnApi!.getAllGridColumns();
    let startIndex: number = 0;

    if (this.api.internalApi.isGridInPivotMode()) {
      return;
    }
    //  this is not quite right as it assumes that only the first column can be grouped
    //  but lets do this for now and then refine and refactor later to deal with weirder use cases
    if (ColumnHelper.isSpecialColumn(allColumns[0].getColId())) {
      startIndex++;
    }

    VisibleColumnList.forEach((column, index) => {
      const col = this.gridOptions.columnApi!.getColumn(column.ColumnId);
      if (!col) {
        LoggingHelper.LogAdaptableError(`Cannot find vendor column:${column.ColumnId}`);
      } else {
        if (!col.isVisible()) {
          this.setColumnVisible(this.gridOptions.columnApi, col, true, 'api');
        }
        this.moveColumn(this.gridOptions.columnApi, col, startIndex + index, 'api');
      }
    });
    allColumns
      .filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0)
      .forEach(col => {
        this.setColumnVisible(this.gridOptions.columnApi, col, false, 'api');
      });
    // we need to do this to make sure agGrid and adaptable column collections are in sync
    this.setColumnIntoStore();
  }

  public setColumnIntoStore() {
    // if pivotnig and we have 'special' columns as a result then do nothing ...
    if (this.gridOptions.columnApi.isPivotMode()) {
      if (ArrayExtensions.IsNotNullOrEmpty(this.gridOptions.columnApi.getPivotColumns())) {
        return;
      }
    }
    const allColumns: AdaptableColumn[] = [];
    const existingColumns: AdaptableColumn[] = this.api.gridApi.getColumns();
    const vendorCols: Column[] = this.gridOptions.columnApi!.getAllGridColumns();

    vendorCols.forEach(vendorColumn => {
      const colId: string = vendorColumn.getColId();
      if (!ColumnHelper.isSpecialColumn(colId)) {
        let existingColumn: AdaptableColumn = ColumnHelper.getColumnFromId(colId, existingColumns);
        if (existingColumn) {
          existingColumn.Visible = vendorColumn.isVisible();
          if (existingColumn.DataType == DataType.Unknown) {
            existingColumn.DataType = this.agGridHelper.getColumnDataType(vendorColumn);
          }
        } else {
          existingColumn = this.createAdaptableColumn(vendorColumn);
        }
        allColumns.push(existingColumn);
      }
    });
    this.api.internalApi.setColumns(allColumns);
    // Save the layout if required
    this.LayoutService.autoSaveLayout();
  }

  private createAdaptableColumn(vendorColumn: Column): AdaptableColumn {
    const abColumn: AdaptableColumn = this.agGridHelper.createAdaptableColumnFromVendorColumn(
      vendorColumn
    );
    this.applyStylingToColumn(vendorColumn, abColumn);
    return abColumn;
  }

  private applyStylingToColumn(vendorColumn: Column, abColumn: AdaptableColumn): void {
    if (
      vendorColumn.getColDef().filter &&
      this.adaptableOptions!.filterOptions.useAdaptableFilterForm
    ) {
      this.createFilterWrapper(vendorColumn);
    }

    if (this.isQuickFilterActive()) {
      this.createQuickFilterWrapper(vendorColumn);
    }

    const quickSearchClassName = this.getQuickSearchClassName();
    if (abColumn == null) {
      abColumn = ColumnHelper.getColumnFromId(
        vendorColumn.getColId(),
        this.api.gridApi.getColumns()
      );
    }
    if (abColumn) {
      this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
    }
  }

  private safeSetColDefs(colDefs: (ColDef | ColGroupDef)[]) {
    // bizarrely we need this line otherwise ag-Grid mangles the ColIds (e.g. 'tradeId' becomes 'tradeId_1')
    this.gridOptions.api!.setColumnDefs([]);
    this.gridOptions.api!.setColumnDefs(colDefs);

    const vendorCols: Column[] = this.gridOptions.columnApi!.getAllGridColumns();
    vendorCols.forEach((vendorColumn: Column) => {
      let abColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
        vendorColumn.getColId(),
        this.api.gridApi.getColumns()
      );
      this.applyStylingToColumn(vendorColumn, abColumn);
    });

    this.redraw();
  }

  private getQuickSearchClassName(): string {
    const quickSearchClassName: string = StringExtensions.IsNotNullOrEmpty(
      this.api.quickSearchApi.getQuickSearchStyle().ClassName
    )
      ? this.api.quickSearchApi.getQuickSearchStyle().ClassName
      : this.StyleService.CreateStyleName(StrategyConstants.QuickSearchStrategyId);
    return quickSearchClassName;
  }

  private addQuickSearchStyleToColumn(col: AdaptableColumn, quickSearchClassName: string): void {
    const adaptable = this;
    const cellClassRules: any = {};
    cellClassRules[quickSearchClassName] = function(params: any) {
      if (params.node && !params.node.group) {
        const columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
        const quickSearchState = adaptable.api.quickSearchApi.getQuickSearchState();
        if (
          StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText) &&
          (quickSearchState.DisplayAction == DisplayAction.HighlightCell ||
            quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell)
        ) {
          let excludeColumnFromQuickSearch = adaptable.adaptableOptions.searchOptions!
            .excludeColumnFromQuickSearch;
          if (excludeColumnFromQuickSearch) {
            if (excludeColumnFromQuickSearch(col)) {
              return false;
            }
          }

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
                ExpressionHelper.checkForExpressionFromRowNode(
                  expression,
                  params.node,
                  [col],
                  adaptable
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

  public createFunctionMenu() {
    const menuItems: AdaptableMenuItem[] = [];
    this.strategies.forEach((strat: IStrategy) => {
      strat.setStrategyEntitlement();
      const menuItem: AdaptableMenuItem | undefined = strat.addFunctionMenuItem();
      if (Helper.objectExists(menuItem)) {
        if (menuItems.findIndex(m => m.FunctionName == menuItem.FunctionName) == -1) {
          menuItems.push(menuItem);
        }
      }
    });
    // store the main menu as we will re-use (and it never changes)
    this.api.internalApi.setMainMenuItems(menuItems);
  }

  public getPrimaryKeyValueFromRowNode(rowNode: RowNode): any {
    return this.gridOptions.api!.getValue(this.adaptableOptions!.primaryKey, rowNode);
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

  // this is only used by Shortcut
  public getActiveCell(): GridCell {
    const activeCell = this.gridOptions.api!.getFocusedCell();
    if (activeCell) {
      const rowNode = this.gridOptions.api!.getModel().getRow(activeCell.rowIndex);
      // if the selected cell is from a group cell we don't return it
      // that's a design choice as this is used only when editing and you cant edit those cells
      if (rowNode && !rowNode.group) {
        return {
          columnId: activeCell.column.getColId(),
          primaryKeyValue: this.getPrimaryKeyValueFromRowNode(rowNode),
          rawValue: this.getRawValueFromRowNode(rowNode, activeCell.column.getColId()),
          displayValue: this.getDisplayValueFromRowNode(rowNode, activeCell.column.getColId()),
        };
      }
    }
  }

  public saveGridLayout() {
    if (
      this.adaptableOptions!.layoutOptions != null &&
      this.adaptableOptions!.layoutOptions.includeVendorStateInLayouts != null &&
      this.adaptableOptions!.layoutOptions.includeVendorStateInLayouts
    ) {
      this.LayoutService.autoSaveLayout();
    }
  }

  // This method returns selected cells ONLY (if selection mode is cells or multiple cells).
  // If the selection mode is row it will returns nothing - use the setSelectedRows() method
  public setSelectedCells(): void {
    const selected: CellRange[] = this.gridOptions.api!.getCellRanges();
    const columns: AdaptableColumn[] = [];
    const selectedCells: GridCell[] = [];

    if (this.api.internalApi.isGridInPivotMode()) {
      //  LoggingHelper.LogAdaptableWarning(
      //    'cannot currently perform cell selection in pivot mode'
      //  );
      return;
    }

    if (selected) {
      // we iterate for each ranges
      selected.forEach((rangeSelection, index) => {
        const y1 = Math.min(rangeSelection.startRow!.rowIndex, rangeSelection.endRow!.rowIndex);
        const y2 = Math.max(rangeSelection.startRow!.rowIndex, rangeSelection.endRow!.rowIndex);
        for (const column of rangeSelection.columns) {
          if (column != null) {
            const colId: string = column.getColId();
            const selectedColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
              colId,
              this.api.gridApi.getColumns()
            );
            if (columns.find(c => c.ColumnId == selectedColumn.ColumnId) == null) {
              columns.push(selectedColumn);
            }

            for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
              const rowNode = this.gridOptions.api!.getModel().getRow(rowIndex);
              // if the selected cells are from a group cell we don't return it
              // that's a design choice as this is used only when editing and you cant edit those cells
              if (rowNode && !rowNode.group) {
                const primaryKey = this.getPrimaryKeyValueFromRowNode(rowNode);
                // const value = this.gridOptions.api!.getValue(column, rowNode);

                const selectedCell: GridCell = {
                  columnId: colId,
                  rawValue: this.getRawValueFromRowNode(rowNode, colId),
                  displayValue: this.getDisplayValueFromRowNode(rowNode, colId),
                  primaryKeyValue: primaryKey,
                };
                selectedCells.push(selectedCell);
              }
            }
          }
        }
      });
    }
    const selectedCellInfo: SelectedCellInfo = { Columns: columns, GridCells: selectedCells };
    this.api.internalApi.setSelectedCells(selectedCellInfo);

    this._emit('CellsSelected');

    this.agGridHelper.fireSelectionChangedEvent();
  }

  public setSelectedRows(): void {
    const nodes: RowNode[] = this.gridOptions.api!.getSelectedNodes();
    const selectedRows: GridRow[] = [];

    if (this.gridOptions.columnApi.isPivotMode()) {
      //  dont perform row selection in pivot mode
      return;
    }

    if (ArrayExtensions.IsNotNullOrEmpty(nodes)) {
      nodes.forEach(node => {
        const rowInfo: RowInfo = {
          isMaster: !!(node.master != null && node.master == true),
          isExpanded: !!(node.expanded != null && node.expanded == true),
          isGroup: !!(node.group != null && node.group == true),
          level: node.level,
        };

        const gridRow: GridRow = {
          primaryKeyValue: this.getPrimaryKeyValueFromRowNode(node),
          rowData: node.data,
          rowInfo,
        };
        selectedRows.push(gridRow);
      });
    }
    const selectedRowInfo: SelectedRowInfo = { GridRows: selectedRows };
    this.api.internalApi.setSelectedRows(selectedRowInfo);

    this._emit('RowsSelected');
    this.agGridHelper.fireSelectionChangedEvent();
  }

  public setValue(dataChangedInfo: DataChangedInfo, reselectSelectedCells: boolean): void {
    // if we have the row node then just update it
    if (dataChangedInfo.RowNode) {
      dataChangedInfo.RowNode.setDataValue(dataChangedInfo.ColumnId, dataChangedInfo.NewValue);
    } else {
      if (this.useRowNodeLookUp) {
        const rowNode: RowNode = this.gridOptions.api!.getRowNode(dataChangedInfo.PrimaryKeyValue);
        if (rowNode != null) {
          rowNode.setDataValue(dataChangedInfo.ColumnId, dataChangedInfo.NewValue);
          dataChangedInfo.RowNode = rowNode;
        }
      } else {
        let isUpdated: boolean = false;
        // prefer not to use this method but if we do then at least we can prevent further lookups once we find
        this.gridOptions.api!.getModel().forEachNode(rowNode => {
          if (!isUpdated) {
            if (dataChangedInfo.PrimaryKeyValue == this.getPrimaryKeyValueFromRowNode(rowNode)) {
              //  dataChangedInfo = this.updateValue(gridCell, rowNode);
              rowNode.setDataValue(dataChangedInfo.ColumnId, dataChangedInfo.NewValue);
              dataChangedInfo.RowNode = rowNode;
              isUpdated = true;
            }
          }
        });
      }
    }
    this.performPostEditChecks(dataChangedInfo);
    if (reselectSelectedCells) {
      this.agGridHelper.reselectSelectedCells();
    }
  }

  public cancelEdit() {
    this.gridOptions.api!.stopEditing(true);
  }

  public getRowNodeIsSatisfiedFunction(
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
          if (!foundRow && id == this.getPrimaryKeyValueFromRowNode(node)) {
            rowNode = node;
            foundRow = true;
          }
        });
      }
      return (columnId: string) => this.gridOptions.api!.getValue(columnId, rowNode);
    }
    return (columnId: string) => this.getDisplayValue(id, columnId);
  }

  public getRowNodeIsSatisfiedFunctionFromRowNode(
    rowwNode: RowNode,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any {
    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
      let testreturnvalue: any = (columnId: string) =>
        this.gridOptions.api!.getValue(columnId, rowwNode);
      return testreturnvalue;
    }
    return (columnId: string) => this.getDisplayValueFromRowNode(rowwNode, columnId);
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
    const permittedValuesForColumn: any[] = this.api.userInterfaceApi.getPermittedValuesForColumn(
      columnId
    );
    if (ArrayExtensions.IsNotNullOrEmpty(permittedValuesForColumn)) {
      permittedValuesForColumn.forEach(pv => {
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
      this.adaptableOptions!.queryOptions.maxColumnValueItemsDisplayed
    );
  }

  public getColumnValueDisplayValuePairList(
    columnId: string,
    visibleRowsOnly: boolean,
    onlyIncludeIds?: { [key: string]: boolean }
  ): Array<IRawValueDisplayValuePair> {
    const returnArray: IRawValueDisplayValuePair[] = [];

    let permittedMap = new Map<string, IRawValueDisplayValuePair>();

    // check if there are permitted column values for that column
    // NB.  this currently contains a small bug as we dont check for visibility so if using permitted values then ALL are returned :(
    const permittedValuesForColumn: any[] = this.api.userInterfaceApi.getPermittedValuesForColumn(
      columnId
    );
    if (ArrayExtensions.IsNotNullOrEmpty(permittedValuesForColumn)) {
      permittedValuesForColumn.forEach(pv => {
        permittedMap.set(pv, { RawValue: pv, DisplayValue: pv });
      });
    } else {
      permittedMap = null;
    }
    const useRawValue: boolean = this.useRawValueForColumn(columnId);

    const eachFn = (rowNode: RowNode, columnId: string, useRawValue: boolean) => {
      if (!rowNode.group) {
        const rawValue = this.gridOptions.api!.getValue(columnId, rowNode);
        const displayValue = useRawValue
          ? Helper.StringifyValue(rawValue)
          : this.getDisplayValueFromRowNode(rowNode, columnId);

        let allowed = !permittedMap || permittedMap.has(displayValue);
        if (allowed && onlyIncludeIds) {
          let id = this.getPrimaryKeyValueFromRowNode(rowNode);
          allowed = !!onlyIncludeIds[id];
        }
        if (allowed) {
          returnArray.push({ RawValue: rawValue, DisplayValue: displayValue });
        }
      }
    };

    if (visibleRowsOnly) {
      this.gridOptions.api!.forEachNodeAfterFilter((rowNode: RowNode) => {
        eachFn(rowNode, columnId, useRawValue);
      });
    } else {
      this.gridOptions.api!.forEachNode(rowNode => {
        eachFn(rowNode, columnId, useRawValue);
      });
    }

    return returnArray.slice(0, this.adaptableOptions!.queryOptions.maxColumnValueItemsDisplayed);
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
        : this.getDisplayValueFromRowNode(rowNode, columnId);

      if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
        returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
      } else {
        returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
      }
    }
  }

  private useRawValueForColumn(columnId: string): boolean {
    // we need to return false if the column has a cell rendeerer i think...
    const colDef: ColDef = this.gridOptions.api!.getColumnDef(columnId);
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
      returnValue = this.getDisplayValueFromRowNode(rowNode, columnId);
    } else {
      let foundRow: boolean = false;
      this.gridOptions.api!.getModel().forEachNode(rowNode => {
        if (!foundRow && id == this.getPrimaryKeyValueFromRowNode(rowNode)) {
          returnValue = this.getDisplayValueFromRowNode(rowNode, columnId);
          foundRow = true;
        }
      });
    }
    return returnValue;
  }

  public getDisplayValueFromRowNode(row: RowNode, columnId: string): string {
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

  public getRawValueFromRowNode(rowNode: RowNode, columnId: string): any {
    return this.gridOptions.api!.getValue(columnId, rowNode);
  }

  public getDataRowFromRowNode(rowNode: RowNode): any {
    return rowNode != null && rowNode != undefined ? rowNode.data : undefined;
  }

  public getRowNodeForPrimaryKey(primaryKeyValue: any): any {
    if (this.useRowNodeLookUp) {
      return this.gridOptions.api!.getRowNode(primaryKeyValue);
    } else {
      this.gridOptions.api!.getModel().forEachNode(rowNode => {
        if (primaryKeyValue == this.getPrimaryKeyValueFromRowNode(rowNode)) {
          return rowNode;
        }
      });
    }
  }

  public getRowNodesForPrimaryKeys(primaryKeyValues: any[]): any[] {
    let rowNodes: RowNode[] = [];
    if (this.useRowNodeLookUp) {
      primaryKeyValues.forEach((pkValue: any) => {
        const rowNode: RowNode = this.gridOptions.api!.getRowNode(pkValue);
        if (rowNode) {
          rowNodes.push(rowNode);
        }
      });
    } else {
      primaryKeyValues.forEach((pkValue: any) => {
        let foundRow: boolean = false;
        this.gridOptions.api!.getModel().forEachNode(rowNode => {
          if (!foundRow && pkValue == this.getPrimaryKeyValueFromRowNode(rowNode)) {
            rowNodes.push(rowNode);
            foundRow = true;
          }
        });
      });
    }
    return rowNodes;
  }

  public setCellClassRules(
    cellClassRules: any,
    columnId: string,
    type:
      | 'ConditionalStyle'
      | 'QuickSearch'
      | 'FlashingCell'
      | 'FormatColumn'
      | 'Alert'
      | 'UpdatedRow'
  ) {
    const vendorColumn: Column = this.gridOptions.columnApi!.getColumn(columnId);
    if (vendorColumn) {
      const colDef: ColDef = vendorColumn.getColDef();
      if (colDef) {
        const localCellClassRules = colDef.cellClassRules;

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
          } // doing Alert - hope this is correct
          else if (type == 'Alert') {
            for (const prop in localCellClassRules) {
              if (prop.includes(StyleConstants.ALERT_STYLE)) {
                delete localCellClassRules[prop];
              }
            }
          } else if (type == 'UpdatedRow') {
            for (const prop in localCellClassRules) {
              if (prop.includes(StyleConstants.UPDATED_ROW_NEUTRAL_STYLE)) {
                delete localCellClassRules[prop];
              }
            }
          }
          // Is initialized in Flash
          else if (type == 'FlashingCell') {
            for (const prop in localCellClassRules) {
              if (prop.includes(StyleConstants.FLASH_CELL_UP_STYLE)) {
                delete localCellClassRules[prop];
              }
              if (prop.includes(StyleConstants.FLASH_CELL_DOWN_STYLE)) {
                delete localCellClassRules[prop];
              }
            }
          }
          for (const prop in cellClassRules) {
            localCellClassRules[prop] = cellClassRules[prop];
          }
        } else {
          colDef.cellClassRules = cellClassRules;
        }
      }
    }
  }

  public forAllRowNodesDo(func: (rowNode: any) => any) {
    this.gridOptions.api!.getModel().forEachNode(rowNode => {
      func(rowNode);
    });
  }

  public forAllVisibleRowNodesDo(func: (rowNode: any) => any) {
    this.gridOptions.api!.forEachNodeAfterFilterAndSort(rowNode => {
      func(rowNode);
    });
  }

  public redraw() {
    this.gridOptions.api!.redrawRows();
    this.gridOptions.api!.refreshHeader();
    this._emit('GridRefreshed');
  }

  public redrawRow(rowNode: any) {
    this.gridOptions.api!.redrawRows({ rowNodes: [rowNode] });
  }

  public refreshCells(rowNodes: any[], columnIds: string[]) {
    const refreshCellParams: RefreshCellsParams = {
      rowNodes: rowNodes,
      columns: columnIds,
      force: true,
    };
    this.gridOptions.api!.refreshCells(refreshCellParams);
  }

  public jumpToRow(rowNode: any): void {
    this.gridOptions.api!.ensureNodeVisible(rowNode, 'middle');
  }

  public jumpToColumn(columnId: string): void {
    this.gridOptions.api!.ensureColumnVisible(columnId);
  }

  public jumpToCell(columnId: string, rowNode: any): void {
    this.jumpToRow(rowNode);
    this.jumpToColumn(columnId);
  }

  private forEachColumn = (fn: (columnDef: ColDef) => any) => {
    forEachColumn(this.getColumnDefs(), fn);
  };

  /**
   * This creates a clone of the current column definitions. If config.removeEmpty is true, will also remove empty column groups
   *
   */
  private mapColumnDefs = (
    fn: (columnDef: ColDef, i: number, colDefs: ColDef[]) => ColDef | null,
    config?: { removeEmpty: boolean }
  ) => {
    config = config || { removeEmpty: false };

    let colDefs: (ColDef | ColGroupDef)[] = [...this.getColumnDefs()];

    forEachColumn(colDefs, (columnDef: ColDef, i, colDefs, parentColGroup) => {
      const result = fn(columnDef, i, colDefs);

      const parentArray = parentColGroup ? parentColGroup.children : colDefs;

      parentArray[i] = result;

      if (i === colDefs.length - 1 && config.removeEmpty) {
        if (parentColGroup) {
          parentColGroup.children = parentArray.filter(x => !!x);
        }
      }
    });

    if (config.removeEmpty) {
      colDefs = colDefs.filter(x => !!x);
    }

    return colDefs;
  };

  public editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void {
    // the name of the column might have changed so lets get the column from store as that will be the 'old' one
    const cols: AdaptableColumn[] = this.api.gridApi.getColumns();
    const existingABColumn: AdaptableColumn = cols.find(c => c.Uuid == calculatedColumn.Uuid);

    let cleanedExpression: string = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(
      calculatedColumn.ColumnExpression,
      cols
    );

    const dataType: DataType = this.CalculatedColumnExpressionService.GetCalculatedColumnDataType(
      cleanedExpression
    );

    let agGridDataType: string = dataType == DataType.Number ? 'abColDefNumber' : 'abColDefString';

    if (existingABColumn) {
      // now get the ag-Grid ColDef Index
      const colDefs: ColDef[] = this.mapColumnDefs((colDef: ColDef) => {
        if (colDef.headerName === existingABColumn.ColumnId) {
          // clean the expression in case it got dirty

          const newColDef: ColDef = { ...colDef };
          //  change the value getter in the coldefs
          newColDef.valueGetter = (params: ValueGetterParams) =>
            Helper.RoundValueIfNumeric(
              this.CalculatedColumnExpressionService.ComputeExpressionValue(
                cleanedExpression,
                params.node
              ),
              4
            );
          newColDef.type = agGridDataType;

          // reset the name in case its changed
          newColDef.headerName = calculatedColumn.ColumnId;
          newColDef.colId = calculatedColumn.ColumnId;

          return newColDef;
        }

        return colDef;
      });

      this.safeSetColDefs(colDefs);

      // for column list its an itnernal map only so we can first delete
      for (const columnList of this.calculatedColumnPathMap.values()) {
        const index = columnList.indexOf(calculatedColumn.ColumnId);
        if (index > -1) {
          columnList.splice(index, 1);
        }
      }
      // and then add
      const columnList = this.CalculatedColumnExpressionService.GetColumnListFromExpression(
        cleanedExpression
      );
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
      existingABColumn.DataType = dataType;
      this.api.internalApi.addAdaptableColumn(existingABColumn);
    }
    this.postSpecialColumnEditDelete(true);
  }

  public removeCalculatedColumnFromGrid(calculatedColumnID: string) {
    let foundColDef: boolean = false;
    const newColDefs = this.mapColumnDefs(
      (colDef: ColDef) => {
        if (colDef.headerName === calculatedColumnID) {
          foundColDef = true;
          return null;
        }
        return colDef;
      },
      { removeEmpty: true }
    );

    if (foundColDef) {
      this.safeSetColDefs(newColDefs);
    }
    for (const columnList of this.calculatedColumnPathMap.values()) {
      const index = columnList.indexOf(calculatedColumnID);
      if (index > -1) {
        columnList.splice(index, 1);
      }
    }

    this.postSpecialColumnEditDelete(true);
  }

  public addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn) {
    const colDefs: (ColDef | ColGroupDef)[] = [...(this.getColumnDefs() || [])];

    const cols: AdaptableColumn[] = this.api.gridApi.getColumns();
    const cleanedExpression: string = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(
      calculatedColumn.ColumnExpression,
      cols
    );

    const dataType: DataType = this.CalculatedColumnExpressionService.GetCalculatedColumnDataType(
      cleanedExpression
    );

    let agGridDataType: string = dataType == DataType.Number ? 'abColDefNumber' : 'abColDefString';

    const newColDef: ColDef = {
      headerName: calculatedColumn.ColumnId,
      colId: calculatedColumn.ColumnId,
      hide: true,
      enableValue: true, // makes the column 'summable'
      editable: false,
      filter: true,
      resizable: true,
      enableRowGroup: true, // makes the column 'groupable'
      sortable: true,
      type: agGridDataType,
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
    this.safeSetColDefs(colDefs);

    const columnList = this.CalculatedColumnExpressionService.GetColumnListFromExpression(
      cleanedExpression
    );
    for (const column of columnList) {
      let childrenColumnList = this.calculatedColumnPathMap.get(column);
      if (!childrenColumnList) {
        childrenColumnList = [];
        this.calculatedColumnPathMap.set(column, childrenColumnList);
      }
      childrenColumnList.push(calculatedColumn.ColumnId);
    }

    this.addSpecialColumnToState(calculatedColumn.Uuid, calculatedColumn.ColumnId, dataType);
  }

  public getColumnDefs = (): (ColDef | ColGroupDef)[] => {
    return (this.gridOptions.columnApi as any).columnController.columnDefs || [];
  };

  public addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn) {
    const colDefs: (ColDef | ColGroupDef)[] = [...this.getColumnDefs()];
    const newColDef: ColDef = {
      headerName: freeTextColumn.ColumnId,
      colId: freeTextColumn.ColumnId,
      editable: true,
      hide: true,
      filter: true,
      sortable: true,
      resizable: true,
      cellEditor: 'agLargeTextCellEditor',
      type: 'abColDefString',
      valueSetter: (params: ValueSetterParams) => {
        return (params.data[freeTextColumn.ColumnId] = params.newValue);
      },
      valueGetter: (params: ValueGetterParams) => {
        return this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, params.node);
      },
    };
    colDefs.push(newColDef);

    this.safeSetColDefs(colDefs);

    this.addSpecialColumnToState(freeTextColumn.Uuid, freeTextColumn.ColumnId, DataType.String);
  }

  public removeFreeTextColumnFromGrid(freeTextColumnId: string): void {
    let foundColDef: boolean = false;
    const newColDefs = this.mapColumnDefs(
      (colDef: ColDef) => {
        if (colDef.headerName === freeTextColumnId) {
          foundColDef = true;
          return null;
        }
        return colDef;
      },
      { removeEmpty: true }
    );

    if (foundColDef) {
      this.safeSetColDefs(newColDefs);
    }

    this.postSpecialColumnEditDelete(true);
  }

  public editFreeTextColumnInGrid(freeTextColumn: FreeTextColumn): void {
    this.postSpecialColumnEditDelete(true);
  }

  public addActionColumnToGrid(actionColumn: ActionColumn) {
    const colDefs: (ColDef | ColGroupDef)[] = [...this.getColumnDefs()];
    const newColDef: ColDef = {
      headerName: actionColumn.FriendlyName ? actionColumn.FriendlyName : actionColumn.ColumnId,
      colId: actionColumn.ColumnId,
      editable: false,
      hide: false,
      filter: false,
      sortable: false,
      resizable: true,
      cellRenderer: ActionColumnRenderer,
    };
    colDefs.push(newColDef);
    this.safeSetColDefs(colDefs);
    this.addSpecialColumnToState(actionColumn.Uuid, actionColumn.ColumnId, DataType.String);
  }

  private addSpecialColumnToState(uuid: TypeUuid, columnId: string, dataType: DataType): void {
    const vendorColumn: Column | undefined = this.gridOptions
      .columnApi!.getAllColumns()
      .find(vc => vc.getColId() == columnId);

    if (vendorColumn) {
      const vendorColDef: ColDef = vendorColumn.getColDef();
      const specialColumn: AdaptableColumn = {
        Uuid: uuid,
        ColumnId: columnId,
        FriendlyName: columnId,
        DataType: dataType,
        Visible: false,
        ReadOnly: this.agGridHelper.isColumnReadonly(vendorColDef),
        Sortable: this.agGridHelper.isColumnSortable(vendorColDef),
        Filterable: this.agGridHelper.isColumnFilterable(vendorColDef),
        Groupable: this.agGridHelper.isColumnGroupable(vendorColDef),
        Pivotable: this.agGridHelper.isColumnPivotable(vendorColDef),
        Aggregatable: this.agGridHelper.isColumnAggregetable(vendorColDef),
        IsSparkline: dataType == DataType.NumberArray,
        SpecialColumn: true,
      };

      this.api.internalApi.addAdaptableColumn(specialColumn);

      this.applyStylingToColumn(vendorColumn, specialColumn);

      this.postSpecialColumnEditDelete(false);
    }
  }

  public isGroupRowNode(rowNode: RowNode): boolean {
    return rowNode.group;
  }

  public getFirstRowNode() {
    // TODO: we can find a better way but its only used by Calccolumn on creation so not urgent
    let rowNode: RowNode;
    this.gridOptions.api!.forEachNode(node => {
      if (!node.group) {
        if (!rowNode) {
          rowNode = node;
        }
      }
    });
    return rowNode;
  }

  // need to destroy more than just this...
  // TODO;  manage destruction properly
  destroy() {
    const abContainerElement = this.getadaptableContainerElement();
    if (abContainerElement != null) {
      ReactDOM.unmountComponentAtNode(abContainerElement);
    }
  }

  // This horrible method is used to get the grid style for when we export to iPushPull
  // We need to find a better implementation
  public getIPPStyle(): IPPStyle {
    const headerFirstCol: HTMLElement = document
      .querySelectorAll('.ag-header-cell')
      .item(0) as HTMLElement;
    const header: HTMLElement = document.querySelector('.ag-header') as HTMLElement;
    const headerColStyle = window.getComputedStyle(header, null);
    const firstRow: HTMLElement = document.querySelector('.ag-row-even') as HTMLElement;
    const firstRowStyle = window.getComputedStyle(firstRow, null);
    const secondRow: HTMLElement = document.querySelector('.ag-row-odd') as HTMLElement;
    const secondRowStyle = secondRow
      ? window.getComputedStyle(secondRow, null)
      : {
          backgroundColor: '#fff',
        };
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

  private getadaptableContainerElement(): HTMLElement | null {
    if (!this.abContainerElement) {
      this.abContainerElement = document.getElementById(
        this.adaptableOptions!.containerOptions.adaptableContainer
      );

      if (!this.abContainerElement) {
        let oldContainer = document.getElementById('adaptableBlotter');

        if (oldContainer) {
          console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!! The old default container element for Adaptable was "#adaptableContainer", configured via 'containerOptions.adaptableContainer="adaptableBlotter"'.
!!!!! Seems like you haven't updated your html container selector, so we're falling back to using that one.
!!!!!
!!!!! To make this warning go away, update your html structure and make sure you have an element with id="adaptable" in your app!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
          this.abContainerElement = oldContainer;
        }
      }
    }
    return this.abContainerElement;
  }

  private getGridContainerElement(): HTMLElement | null {
    if (!this.gridContainerElement) {
      this.gridContainerElement = document.getElementById(
        this.adaptableOptions!.containerOptions.vendorContainer
      );
    }
    return this.gridContainerElement;
  }

  private initInternalGridLogic() {
    if (this.renderGrid) {
      if (this.abContainerElement == null) {
        this.abContainerElement = this.getadaptableContainerElement();
      }
      if (this.abContainerElement == null) {
        LoggingHelper.LogAdaptableError(
          `There is no DIV with id="${
            this.adaptableOptions!.containerOptions.adaptableContainer
          }" so cannot render Adaptable`
        );
        return;
      }
    }

    const gridContainerElement = this.getGridContainerElement();
    if (gridContainerElement) {
      gridContainerElement.addEventListener('keydown', event => this._emit('KeyDown', event));
    }

    this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_VISIBLE, (params: any) => {
      if (params.visible && params.column) {
        this.updateQuickSearchRangeVisibleColumn(params.column.colId);
      }
    });

    // we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type
    // since there are many events and we want them to behave the same
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
          this.debouncedSetColumnIntoStore();
        }
        // refilter the grid if required
        this.debouncedFilterGrid();
      }
    });
    // dealing with scenario where the data is providee to adaptable after grid has been setup
    this.gridOptions.api!.addEventListener(Events.EVENT_FIRST_DATA_RENDERED, () => {
      this.debouncedSetColumnIntoStore();
    });
    // once the grid is ready we should make sure we are too
    this.gridOptions.api!.addEventListener(Events.EVENT_GRID_READY, () => {
      // do something?
    });

    this.gridOptions.api!.addEventListener(
      Events.EVENT_COLUMN_PIVOT_MODE_CHANGED,
      (params: any) => {
        if (
          params.type == 'columnPivotModeChanged' &&
          params.columnApi != null &&
          params.columnApi.columnController != null &&
          params.columnApi.columnController.pivotMode == true
        ) {
          if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInPivotLayout == true) {
            this.gridOptions.columnApi!.autoSizeAllColumns();
          }

          this.api.internalApi.setPivotModeOn();
        } else {
          this.api.internalApi.setPivotModeOff();
        }
      }
    );
    this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_PIVOT_CHANGED, (params: any) => {
      if (
        params.type == 'columnPivotChanged' &&
        params.columnApi != null &&
        params.columnApi.columnController != null &&
        params.columnApi.columnController.pivotMode == true
      ) {
        if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInPivotLayout == true) {
          this.gridOptions.columnApi!.autoSizeAllColumns();
        }
      }
    });

    // Pinning columms and changing column widths will trigger an auto save (if that and includvendorstate are both turned on)
    const columnEventsThatTriggersAutoLayoutSave = [
      Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
      Events.EVENT_COLUMN_PINNED,
      Events.EVENT_COLUMN_PIVOT_CHANGED,
      Events.EVENT_COLUMN_PIVOT_MODE_CHANGED,
      Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
      Events.EVENT_SORT_CHANGED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
        this.debouncedSaveGridLayout();
      }
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_RESIZED, (params: any) => {
      // if a column is resized there are a couple of things we need to do once its finished
      if (params.type == 'columnResized' && params.finished == true) {
        // refresh the header if you have quick filter bar to ensure its full length
        if (this.isQuickFilterActive()) {
          this.gridOptions.api!.refreshHeader();
        }
        // redraw any sparklines if that has been changed
        if (params.column) {
          let colId = params.column.colId;
          const isSparklineColumn: boolean = this.api.sparklineColumnApi.isSparklineColumn(colId);

          if (isSparklineColumn) {
            // this is a bit brute force as its redrawing the whole grid but its quite a rare use case so probably ok
            this.redraw();
          }
        }
      }
    });

    // this event deals with when the user makes an edit - it doesnt look at ticking data
    this.gridOptions.api!.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
      // TODO: Jo: This is a workaround as we are accessing private members of agGrid.
      // I still wonder if we can do this nicer by using :   this.gridOptions.api!.getEditingCells();
      // must be a good reason why we don't use it
      if (this.gridOptions.columnApi.isPivotMode()) {
        return;
      }
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

      this._currentEditor.isCancelAfterEnd = () => {
        const dataChangedInfo: DataChangedInfo = {
          OldValue: this.gridOptions.api!.getValue(params.column.getColId(), params.node),
          NewValue: this._currentEditor.getValue(),
          ColumnId: params.column.getColId(),
          PrimaryKeyValue: this.getPrimaryKeyValueFromRowNode(params.node),
          RowNode: params.node,
        };

        if (!this.ValidationService.PerformCellValidation(dataChangedInfo)) {
          return true;
        }

        const onServerValidationCompleted = () => {
          const whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false;
          if (!whatToReturn) {
            this.performPostEditChecks(dataChangedInfo, false);
          }
          return whatToReturn;
        };

        const isCancelAfterEnd = this.adaptableOptions.editOptions.validateOnServer
          ? this.ValidationService.PerformServerValidation(dataChangedInfo, {
              onServerValidationCompleted,
            })
          : onServerValidationCompleted;

        return isCancelAfterEnd();
      };
    });
    this.gridOptions.api!.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, (params: any) => {
      // (<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))

      this._currentEditor = null;
      // We refresh the filter so we get live search/filter when editing.
      // Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb

      // if they have set to run filter after edit then lets do it
      if (params.node) {
        this.filterOnUserDataChange([params.node]);
        this.debouncedSetSelectedCells();
      }
    });

    const columnEventsThatTriggerSetRowSelection = [
      Events.EVENT_ROW_GROUP_OPENED,
      Events.EVENT_SELECTION_CHANGED,
      Events.EVENT_ROW_SELECTED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (ArrayExtensions.ContainsItem(columnEventsThatTriggerSetRowSelection, type)) {
        this.debouncedSetSelectedRows();
      }
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_ROW_GROUP_OPENED, () => {
      //      this.debouncedSetSelectedRows();
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_SELECTION_CHANGED, () => {
      //     this.debouncedSetSelectedRows();
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_ROW_SELECTED, () => {
      //     this.debouncedSetSelectedRows();
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

    this.gridOptions.api!.addEventListener(Events.EVENT_MODEL_UPDATED, (params: any) => {
      // not sure about this - doing it to make sure that we set the columns properly at least once!

      this.checkColumnsDataTypeSet();
    });

    const rowListeners: { [key: string]: (event: any) => void } = {
      dataChanged: (event: any) =>
        this.onRowDataChanged({
          //  myevent: event,
          rowNode: event.node,
          oldData: event.oldData,
          newData: event.newData,
        }),
    };

    /**
     * AgGrid does not expose Events.EVENT_ROW_DATA_CHANGED
     * so we have to override `dispatchLocalEvent`
     * and hook our own functionality into it
     *
     */
    RowNodeProto.dispatchLocalEvent = function(event: any) {
      const result = RowNode_dispatchLocalEvent.apply(this, arguments);
      const fn = rowListeners[event.type];
      if (fn) {
        fn(event);
      }
      return result;
    };

    // this handles ticking data
    // except it doesnt handle when data has been added to ag-Grid using updateRowData
    this.gridOptions.api!.addEventListener(
      Events.EVENT_CELL_VALUE_CHANGED,
      (params: NewValueParams) => {
        // this gets called as soon as opening editor so make sure the values are different before starting any work...
        if (params.newValue != params.oldValue) {
          // not sure I need this now as we ALWAYS do this in performPostEditChecks();
          /*
          const dataChangedInfo: DataChangedInfo = {
            OldValue: params.oldValue,
            NewValue: params.newValue,
            ColumnId: colId,
            PrimaryKeyValue: identifierValue,
            RowNode: params.node,
          };
           this.DataService.CreateDataChangedEvent(dataChangedInfo);
       */
          const colId: string | undefined = params.colDef.field;
          if (colId) {
            // 24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
            // so we manually raise.
            // https://github.com/JonnyAdaptableTools/adaptableadaptable/issues/118
            const refreshColumnList: string[] = [colId];
            const columnList = this.calculatedColumnPathMap.get(colId);
            if (columnList) {
              const identifierValue = this.getPrimaryKeyValueFromRowNode(params.node);
              columnList.forEach(columnId => {
                const dataChangedInfo: DataChangedInfo = {
                  OldValue: params.oldValue,
                  NewValue: this.gridOptions.api!.getValue(columnId, params.node),
                  ColumnId: columnId,
                  PrimaryKeyValue: identifierValue,
                  RowNode: params.node,
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
          }

          // this is new  - giving users ability to filter on external data changes
          this.filterOnExternalDataChange([params.node]);
        }
      }
    );

    // We plug our filter mechanism and if there is already something like external widgets... we save ref to the function
    const originalisExternalFilterPresent = this.gridOptions.isExternalFilterPresent;
    this.gridOptions.isExternalFilterPresent = () => {
      const columnFilters: ColumnFilter[] = this.api.columnFilterApi.getAllColumnFilter();
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
        this.api.advancedSearchApi.getAdvancedSearchState().CurrentAdvancedSearch
      );
      const isQuickSearchActive = StringExtensions.IsNotNullOrEmpty(
        this.api.quickSearchApi.getQuickSearchValue()
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
      if (this.adaptableOptions!.searchOptions!.serverSearchOption == 'None') {
        const currentSearch = this.api.advancedSearchApi.getCurrentAdvancedSearch();
        if (currentSearch) {
          // See if our rowNode passes the Expression - using Expression Helper; if not then return false
          if (
            !ExpressionHelper.checkForExpressionFromRowNode(
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
        this.adaptableOptions.searchOptions.serverSearchOption == 'None' ||
        this.adaptableOptions.searchOptions.serverSearchOption == 'AdvancedSearch'
      ) {
        const columnFilters: ColumnFilter[] = this.api.columnFilterApi.getAllColumnFilter();
        if (columnFilters.length > 0) {
          for (const columnFilter of columnFilters) {
            if (
              !ExpressionHelper.checkForExpressionFromRowNode(
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
                  ExpressionHelper.checkForExpressionFromRowNode(expression, node, [column], this)
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
    this.addSpecialRendereredColumns();

    // Build the COLUMN HEADER MENU.  Note that we do this EACH time the menu is opened (as items can change)
    const originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
    this.gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
      // couldnt find a way to listen for menu close. There is a Menu Item Select, but you can also close menu from filter and clicking outside menu....
      const colId: string = params.column.getColId();

      const AdaptableMenuItems: AdaptableMenuItem[] = [];

      const adaptableColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
        colId,
        this.api.gridApi.getColumns()
      );
      if (adaptableColumn != null) {
        this.strategies.forEach(s => {
          let menuItem: AdaptableMenuItem = s.addColumnMenuItem(adaptableColumn);
          if (menuItem) {
            AdaptableMenuItems.push(menuItem);
          }
        });
        // add the column menu items from Home Strategy
        const homeStrategy: IHomeStrategy = this.strategies.get(
          StrategyConstants.HomeStrategyId
        ) as IHomeStrategy;
        AdaptableMenuItems.push(...homeStrategy.addBaseColumnMenuItems(adaptableColumn));
      }

      let colMenuItems: (string | MenuItemDef)[];
      // if there was an initial implementation we init the list of menu items with this one; otherwise we take the default items
      if (originalgetMainMenuItems) {
        const originalMenuItems = originalgetMainMenuItems(params);
        colMenuItems = originalMenuItems.slice(0);
      } else {
        colMenuItems = params.defaultItems.slice(0);
      }
      colMenuItems.push('separator');

      let menuInfo: MenuInfo = {
        GridCell: undefined,
        Column: adaptableColumn,
        IsSelectedCell: false,
        IsSingleSelectedColumn: false,
        RowNode: undefined,
        PrimaryKeyValue: undefined,
      };

      let showAdaptableColumnMenu = this.adaptableOptions.userInterfaceOptions!
        .showAdaptableColumnMenu;

      if (showAdaptableColumnMenu == null || showAdaptableColumnMenu !== false) {
        AdaptableMenuItems.forEach((AdaptableMenuItem: AdaptableMenuItem) => {
          let addContextMenuItem: boolean = true;
          if (showAdaptableColumnMenu != null && typeof showAdaptableColumnMenu === 'function') {
            addContextMenuItem = showAdaptableColumnMenu(AdaptableMenuItem, menuInfo);
          }
          if (addContextMenuItem) {
            let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(
              AdaptableMenuItem
            );
            colMenuItems.push(menuItem);
          }
        });
      }
      let userColumnMenuItems = this.api.userInterfaceApi.getUserInterfaceState().ColumnMenuItems;

      if (typeof userColumnMenuItems === 'function') {
        userColumnMenuItems = userColumnMenuItems(menuInfo);
      }

      if (ArrayExtensions.IsNotNullOrEmpty(userColumnMenuItems)) {
        userColumnMenuItems.forEach((userMenuItem: UserMenuItem) => {
          let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromUsereMenu(
            userMenuItem,
            menuInfo
          );
          colMenuItems.push(menuItem);
        });
      }

      return colMenuItems;
    };

    // Build the CONTEXT MENU.  Again we do this each time a cell is right clicked as its context-sensitive
    const originalgetContextMenuItems = this.gridOptions.getContextMenuItems;

    this.gridOptions.getContextMenuItems = (params: GetContextMenuItemsParams) => {
      let contextMenuItems: (string | MenuItemDef)[] = [];

      // if there was an initial implementation we init the list of menu items with this one, otherwise we take default items
      // this allows us to ensure that devs can still create their own agGrid context menu without losing ours
      if (originalgetContextMenuItems) {
        const originalContexttems = originalgetContextMenuItems(params);
        contextMenuItems = originalContexttems.slice(0);
      } else {
        contextMenuItems = params.defaultItems ? params.defaultItems.slice(0) : [];
      }
      let menuInfo: MenuInfo;

      // keep it simple for now - if its a grouped cell then do nothing
      if (!params.node.group) {
        const AdaptableMenuItems: AdaptableMenuItem[] = [];
        const agGridColumn: Column = params.column;
        if (agGridColumn) {
          const adaptableColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
            agGridColumn.getColId(),
            this.api.gridApi.getColumns()
          );

          if (adaptableColumn != null) {
            menuInfo = this.agGridHelper.createMenuInfo(params, adaptableColumn);
            this.strategies.forEach(s => {
              let menuItem: AdaptableMenuItem | undefined = s.addContextMenuItem(menuInfo);
              if (menuItem) {
                AdaptableMenuItems.push(menuItem);
              }
            });

            // here we create Adaptable adaptable Menu items from OUR internal collection
            // user has ability to decide whether to show or not
            if (ArrayExtensions.IsNotNullOrEmpty(AdaptableMenuItems)) {
              let showAdaptableContextMenu = this.adaptableOptions.userInterfaceOptions!
                .showAdaptableContextMenu;
              if (showAdaptableContextMenu == null || showAdaptableContextMenu !== false) {
                contextMenuItems.push('separator');
                AdaptableMenuItems.forEach((AdaptableMenuItem: AdaptableMenuItem) => {
                  let addContextMenuItem: boolean = true;
                  if (
                    showAdaptableContextMenu != null &&
                    typeof showAdaptableContextMenu === 'function'
                  ) {
                    addContextMenuItem = showAdaptableContextMenu(AdaptableMenuItem, menuInfo);
                  }
                  if (addContextMenuItem) {
                    let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(
                      AdaptableMenuItem
                    );
                    contextMenuItems.push(menuItem);
                  }
                });
              }
            }

            // here we add any User defined Context Menu Items
            let userContextMenuItems = this.api.userInterfaceApi.getUserInterfaceState()
              .ContextMenuItems;

            if (typeof userContextMenuItems === 'function') {
              userContextMenuItems = userContextMenuItems(menuInfo);
            }

            if (ArrayExtensions.IsNotNullOrEmpty(userContextMenuItems)) {
              contextMenuItems.push('separator');
              userContextMenuItems!.forEach((userMenuItem: UserMenuItem) => {
                let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromUsereMenu(
                  userMenuItem,
                  menuInfo
                );
                contextMenuItems.push(menuItem);
              });
            }
          }
        }
      }

      return contextMenuItems;
    };
  }

  private postSpecialColumnEditDelete(doReload: boolean) {
    if (this.isInitialised) {
      //  reload the existing layout if its not default
      let currentlayout = this.api.layoutApi.getCurrentLayout().Name;
      if (currentlayout != DEFAULT_LAYOUT) {
        if (doReload) {
          this.api.layoutApi.setLayout(DEFAULT_LAYOUT);
          this.api.layoutApi.setLayout(currentlayout);
          this.setColumnIntoStore();
        } else {
          this.api.layoutApi.setLayout(currentlayout);
        }
      }
    }
    // if grid is initialised then emit AdaptableReady event so we can re-apply any styles
    // and re-apply any specially rendered columns
    if (this.isInitialised) {
      this.api.eventApi.emit('AdaptableReady');
      this.addSpecialRendereredColumns();
    }
  }

  private addSpecialRendereredColumns(): void {
    this.api.percentBarApi.getAllPercentBar().forEach(pcr => {
      this.addPercentBar(pcr);
    });
    this.api.sparklineColumnApi.getAllSparklineColumn().forEach(sparklineColumn => {
      this.addSparklineColumn(sparklineColumn);
    });
  }

  public addSparklineColumn(sparklineColumn: SparklineColumn): void {
    // check that the brushes are set as might not be
    if (sparklineColumn.LineColor == null || sparklineColumn.LineColor == undefined) {
      sparklineColumn.LineColor = DefaultSparklinesChartProperties.Brush;
    }

    const renderedColumn = ColumnHelper.getColumnFromId(
      sparklineColumn.ColumnId,
      this.api.gridApi.getColumns()
    );

    if (renderedColumn) {
      const cellRendererComp: any = this.agGridHelper.createSparklineCellRendererComp(
        sparklineColumn,
        this.adaptableOptions!.adaptableId!
      );
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(
        sparklineColumn.ColumnId
      );
      const colDef: ColDef = vendorGridColumn.getColDef();
      colDef.cellRenderer = cellRendererComp;

      if (sparklineColumn.ShowToolTip != null && sparklineColumn.ShowToolTip == true) {
        colDef.tooltipField = colDef.field;
      } else {
        colDef.tooltipField = '';
      }
    }
  }

  public addPercentBar(pcr: PercentBar): void {
    const renderedColumn = ColumnHelper.getColumnFromId(
      pcr.ColumnId,
      this.api.gridApi.getColumns()
    );
    if (renderedColumn) {
      const cellRendererFunc: ICellRendererFunc = this.agGridHelper.createPercentBarCellRendererFunc(
        pcr,
        this.adaptableOptions!.adaptableId!
      );
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(pcr.ColumnId);
      const colDef: ColDef = vendorGridColumn.getColDef();
      colDef.cellRenderer = cellRendererFunc;

      // change the style from number-cell temporarily?
      if (colDef.cellClass == 'number-cell') {
        colDef.cellClass = 'number-cell-changed';
      }

      if (pcr.ShowToolTip != null && pcr.ShowToolTip == true) {
        colDef.tooltipField = colDef.field;
        // for now NOT using this PercentBarTooltip but we can add it later and will be powwerful.
        //  coldDef.tooltipComponent = PercentBarTooltip;
        // coldDef.tooltipValueGetter = (params: ITooltipParams) => {
        //   return { value: params.value * 10 };
        // };
      } else {
        colDef.tooltipField = '';
      }
    }
  }

  public removeSparklineColumn(sparklineColumn: SparklineColumn): void {
    const renderedColumn = ColumnHelper.getColumnFromId(
      sparklineColumn.ColumnId,
      this.api.gridApi.getColumns()
    );
    if (renderedColumn) {
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(
        sparklineColumn.ColumnId
      );
      // note we dont get it from the original (but I guess it will be applied next time you run...)
      vendorGridColumn.getColDef().cellRenderer = null;
      const coldDef: ColDef = vendorGridColumn.getColDef();
      coldDef.cellRenderer = null;
    }
  }

  private onRowDataChanged({
    rowNode,
    oldData,
    newData,
  }: {
    rowNode: RowNode;
    oldData: any;
    newData: any;
  }): void {
    // this is not quite right as its breaking for master / detail : openign a Master fires DataChanged Events of update : false and no oldData
    // should we check the event for false?
    // or should we check for oldData?
    // for now will do the second...
    // might need to rethink if we add full cache and then just return if its master / details
    if (oldData == null || oldData == undefined) {
      return;
    }

    if (oldData == newData) {
      return;
    }

    const identifierValue = this.getPrimaryKeyValueFromRowNode(rowNode);

    Object.keys(oldData).forEach((key: string) => {
      const oldValue = oldData[key];
      const newValue = newData[key];

      if (oldValue != newValue) {
        const dataChangedInfo: DataChangedInfo = {
          OldValue: oldValue,
          NewValue: newValue,
          ColumnId: key,
          PrimaryKeyValue: identifierValue,
          RowNode: rowNode,
        };

        // we cannot check here for cell validation as it will be too late
        // so we have to hope that its been done already - though currently we ONLY do it for direct edits and setCellValue() but not other api updates
        // if we have gone through AdaptableAPI we will be fine but not if they update ag-Grid directly
        // but we can perform the POST EDIT checks
        this.performPostEditChecks(dataChangedInfo);
      }
    });
  }

  /**
   * There are a few things that we need to do AFTER we edit a cell and it makes sense to put them in one place
   */
  private performPostEditChecks(
    dataChangedInfo: DataChangedInfo,
    applyFilter: boolean = true
  ): void {
    if (this.AuditLogService.isAuditCellEditsEnabled) {
      this.AuditLogService.addEditCellAuditLog(dataChangedInfo);
    }
    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedInfo);
    this.DataService.CreateDataChangedEvent(dataChangedInfo);

    if (applyFilter) {
      this.filterOnUserDataChange([dataChangedInfo.RowNode]);
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

  public editSparklineColumn(sparklineColumn: SparklineColumn): void {
    this.removeSparklineColumn(sparklineColumn);
    this.addSparklineColumn(sparklineColumn);
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
                  !this.api.gridApi
                    .getColumnSorts()
                    .find((gs: ColumnSort) => ColumnHelper.isSpecialColumn(gs.Column))
                ) {
                  const customSortStrategy: CustomSortStrategyagGrid = this.strategies.get(
                    StrategyConstants.CustomSortStrategyId
                  ) as CustomSortStrategyagGrid;
                  const groupCustomSort: CustomSort = ObjectFactory.CreateEmptyCustomSort();
                  groupCustomSort.ColumnId = sm.colId;
                  groupCustomSort.SortedValues = customSort.SortedValues;
                  const comparator: any = customSortStrategy.getComparerFunction(groupCustomSort);
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
    this.api.internalApi.setColumnSorts(columnSorts);
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
      // floatingStart: 'top',
      // floatingEnd: 'bottom',
    };
    this.gridOptions.api!.addCellRange(cellRangeParams);
  }

  public setColumnSort(columnSorts: ColumnSort[]): void {
    // get the sort model
    const sortModel: any[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(columnSorts)) {
      columnSorts.forEach(gs => {
        const sortDescription: string = gs.SortOrder == SortOrder.Ascending ? 'asc' : 'desc';
        sortModel.push({ colId: gs.Column, sort: sortDescription });
      });
    }
    this.gridOptions.api!.setSortModel(sortModel);
    this.gridOptions.api!.onSortChanged();
  }

  public setDataSource(dataSource: any) {
    this.gridOptions.api!.setRowData(dataSource);
  }

  public updateRows(dataRows: any[]): void {
    this.gridOptions.api!.updateRowData({ update: dataRows });
  }

  public addRows(dataRows: any[]): void {
    this.gridOptions.api!.updateRowData({ add: dataRows });
  }

  public deleteRows(dataRows: any[]): void {
    this.gridOptions.api!.updateRowData({ remove: dataRows });
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
        const column: AdaptableColumn = ColumnHelper.getColumnFromId(
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
            this.AdaptableStore.TheStore.dispatch(
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

  public getVendorGridDefaultLayoutInfo(): VendorGridInfo {
    return {
      GroupState: null, // is this right????  what if they want to group
      ColumnState: JSON.stringify(this.gridOptions.columnApi!.getColumnState()),
      ColumnGroupState: JSON.stringify(this.gridOptions.columnApi!.getColumnGroupState()),
      InPivotMode: this.gridOptions.pivotMode,
    };
  }

  public getVendorGridLayoutInfo(visibleCols: string[]): VendorGridInfo {
    if (
      this.adaptableOptions!.layoutOptions != null &&
      this.adaptableOptions!.layoutOptions.includeVendorStateInLayouts != null &&
      this.adaptableOptions!.layoutOptions.includeVendorStateInLayouts
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

      const columnGroupState = this.gridOptions.columnApi!.getColumnGroupState();

      return {
        GroupState: groupedState,
        ColumnState: JSON.stringify(columnState),
        ColumnGroupState: ArrayExtensions.IsNotNullOrEmpty(columnGroupState)
          ? JSON.stringify(columnGroupState)
          : null,
        InPivotMode: this.gridOptions.columnApi.isPivotMode(),
      };
    }
    return null; // need this?
  }

  public setVendorGridLayoutInfo(vendorGridInfo: VendorGridInfo): void {
    if (vendorGridInfo) {
      if (vendorGridInfo.ColumnState) {
        const columnState: any = JSON.parse(vendorGridInfo.ColumnState);
        if (columnState) {
          this.setColumnState(this.gridOptions.columnApi, columnState, 'api');
        }
      }

      if (vendorGridInfo.GroupState) {
        const groupedState: any = vendorGridInfo.GroupState;
        if (groupedState) {
          // assume for now its just a number
          const column: Column = this.gridOptions.columnApi!.getColumn('ag-Grid-AutoColumn');
          if (column) {
            this.gridOptions.columnApi!.setColumnWidth(column, groupedState, true);
          }
        }
      }

      if (vendorGridInfo.ColumnGroupState) {
        const columnGroupState: any = vendorGridInfo.ColumnGroupState;
        if (columnGroupState) {
          this.gridOptions.columnApi.setColumnGroupState(JSON.parse(columnGroupState));
        }
      }

      if (vendorGridInfo.InPivotMode && vendorGridInfo.InPivotMode == true) {
        this.gridOptions.columnApi.setPivotMode(true);
      } else {
        this.gridOptions.columnApi.setPivotMode(false);
      }
    }
  }

  public setGroupedColumns(groupedCols: string[]): void {
    if (ArrayExtensions.IsNotNullOrEmpty(groupedCols)) {
      this.gridOptions.columnApi.setRowGroupColumns(groupedCols);
    } else {
      this.gridOptions.columnApi.setRowGroupColumns([]);
    }

    if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInLayout == true) {
      this.gridOptions.columnApi!.autoSizeAllColumns();
    }
  }

  public setPivotingDetails(pivotDetails: PivotDetails): void {
    let isPivotLayout = this.LayoutService.isPivotedLayout(pivotDetails);

    // if its not a pivot layout then turn off pivot mode and get out
    if (!isPivotLayout) {
      this.gridOptions.columnApi.setPivotMode(false);
      return;
    }

    if (ArrayExtensions.IsNotNull(pivotDetails.PivotColumns)) {
      this.gridOptions.columnApi.setPivotColumns(pivotDetails.PivotColumns);
    }

    if (ArrayExtensions.IsNotNull(pivotDetails.AggregationColumns)) {
      this.gridOptions.columnApi.setValueColumns(pivotDetails.AggregationColumns);
    }
  }

  public setPivotMode(pivotDetails: PivotDetails, vendorGridInfo: VendorGridInfo): void {
    if (vendorGridInfo == null) {
      if (this.LayoutService.isPivotedLayout(pivotDetails)) {
        this.turnOnPivoting();
      } else {
        this.turnOffPivoting();
      }
    } else {
      if (vendorGridInfo.InPivotMode && vendorGridInfo.InPivotMode == true) {
        this.turnOnPivoting();
      } else {
        this.turnOffPivoting();
      }
    }
  }

  private turnOnPivoting(): void {
    this.gridOptions.columnApi.setPivotMode(true);
  }

  private turnOffPivoting(): void {
    this.gridOptions.columnApi.setPivotMode(false);
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
      this.gridOptions.floatingFilter === true &&
      this.adaptableOptions!.filterOptions.useAdaptableQuickFilter
    );
  }

  public showQuickFilter(): void {
    if (this.adaptableOptions!.filterOptions!.useAdaptableQuickFilter) {
      this.gridOptions.floatingFilter = true;
      this.gridOptions.columnApi!.getAllGridColumns().forEach(col => {
        this.createQuickFilterWrapper(col);
      });
      this.gridOptions.api!.refreshHeader();
    }
  }

  public hideQuickFilter(): void {
    if (this.adaptableOptions!.filterOptions!.useAdaptableQuickFilter) {
      this.gridOptions.floatingFilter = false;
      this.gridOptions.api!.refreshHeader();
    }
  }

  public applyAdaptableTheme(theme: AdaptableTheme | string) {
    const themeName: string = typeof theme === 'string' ? theme : theme.Name;

    const themeNamesToRemove: string[] = [];
    const themesToRemove: AdaptableTheme[] = [];

    const allThemes = this.api.themeApi.getAllTheme();
    const allThemesMap: Record<string, AdaptableTheme> = allThemes.reduce(
      (acc: Record<string, AdaptableTheme>, theme: AdaptableTheme) => {
        acc[theme.Name] = theme;
        return acc;
      },
      {} as Record<string, AdaptableTheme>
    );

    // const themePrefix = 'ab--theme-'
    const el: HTMLElement = document.documentElement;
    el.classList.forEach((cssClassName: string) => {
      const index = cssClassName.indexOf(StyleConstants.THEME_STYLE);
      if (index === 0) {
        themeNamesToRemove.push(cssClassName);
        const themeName = cssClassName.substring(StyleConstants.THEME_STYLE.length);
        if (allThemesMap[themeName]) {
          themesToRemove.push(allThemesMap[themeName]);
        }
      }
    });

    themeNamesToRemove.forEach(cssClassName => el.classList.remove(cssClassName));

    const newTheme: AdaptableTheme = allThemesMap[themeName];
    const newThemeClassName: string = StyleConstants.THEME_STYLE + themeName;

    el.classList.add(newThemeClassName);

    const computedDocumentStyle = getComputedStyle(el);
    const [abLoaded, abThemeLoaded] = ['--ab-loaded', '--ab-theme-loaded'].map(variable => {
      let val = computedDocumentStyle.getPropertyValue(variable);

      if (typeof val === 'string' && val.trim) {
        val = val.trim();
      }
      return val;
    });

    const systemThemes = this.api.themeApi.getAllSystemTheme();
    const isSystemTheme = !!systemThemes.filter(t => t.Name === themeName)[0];

    const container = this.getGridContainerElement();

    if (newTheme && isSystemTheme) {
      if (themeName === LIGHT_THEME) {
        newTheme.VendorGridClassName = this.agGridHelper.getVendorLightThemeName();
      }
      if (themeName === DARK_THEME) {
        newTheme.VendorGridClassName = this.agGridHelper.getVendorDarkThemeName();
      }
    }

    if (!newTheme.VendorGridClassName) {
      // default the vendor grid to the light theme
      newTheme.VendorGridClassName = this.agGridHelper.getVendorLightThemeName();
    }

    if (container != null) {
      if (themesToRemove.length) {
        themesToRemove.forEach(theme => {
          if (theme.VendorGridClassName) {
            container.classList.remove(theme.VendorGridClassName);
          }
        });
      }

      if (newTheme && newTheme.VendorGridClassName) {
        container.classList.add(newTheme.VendorGridClassName);
      }

      container.classList.add('ab-Grid');

      if (this.adaptableOptions!.filterOptions!.indicateFilteredColumns) {
        container.classList.add('ab-Grid--indicate-filtered-columns');
      }
    }

    // if (isSystemTheme) {
    //   const container = this.getGridContainerElement();
    //   if (container != null) {
    //     const vendorLight = this.agGridHelper.getVendorLightThemeName();
    //     const vendorDark = this.agGridHelper.getVendorDarkThemeName();

    //     container.classList.remove(vendorLight);
    //     container.classList.remove(vendorDark);

    //     container.classList.add(themeName === LIGHT_THEME ? vendorLight : vendorDark);
    //   }
    // }

    if (abLoaded !== '777') {
      LoggingHelper.LogError('Please import Adaptable styles from "adaptableadaptable/index.css"');
    }

    // every theme should define a custom css variable: --ab-theme-loaded: <themeName> defined on the document element.
    if (abThemeLoaded !== themeName) {
      LoggingHelper.LogWarning(`Theme "${themeName}" doesn't seem to be loaded! Make sure you import the css file for the "${themeName}" theme!

If it's a default theme, try

import "adaptableadaptable/themes/${themeName}.css"`);
    }
  }

  public setUpRowStyles() {
    this.agGridHelper.setUpRowStyles();
  }

  public clearRowStyles() {
    this.agGridHelper.clearRowStyles();
  }

  // Method called after we have rendered the grid
  // where we apply our stuff but also any ag-Grid props that we control
  private applyFinalRendering(): void {
    // Apply row styles here?  weird that it cannot find the method in Helper.
    this.setUpRowStyles();

    // not sure if this is the right place here.
    // perhaps we need some onDataLoaded event??
    const editLookUpCols:
      | EditLookUpColumn[]
      | undefined = this.api.userInterfaceApi.getUserInterfaceState().EditLookUpColumns;
    if (ArrayExtensions.IsNotNullOrEmpty(editLookUpCols)) {
      const colDefs: (ColDef | ColGroupDef)[] = this.mapColumnDefs((colDef: ColDef) => {
        editLookUpCols!.forEach((editLookUpColumn: EditLookUpColumn) => {
          if (colDef.field === editLookUpColumn.ColumnId) {
            colDef.cellEditor = 'agRichSelectCellEditor';
            if (editLookUpColumn.LookUpValues) {
              colDef.cellEditorParams = {
                values: this.api.userInterfaceApi.getEditLookUpValuesForColumn(
                  editLookUpColumn.ColumnId
                ),
              };
            } else {
              colDef.cellEditorParams = {
                values: this.getColumnValueDisplayValuePairDistinctList(
                  editLookUpColumn.ColumnId,
                  DistinctCriteriaPairValue.DisplayValue,
                  false
                ).map(t => t.DisplayValue),
              };
            }
          }
        });

        return colDef;
      });

      this.safeSetColDefs(colDefs);
    }

    // sometimes the header row looks wrong when using quick filter so to be sure...
    if (this.isQuickFilterActive()) {
      this.api.internalApi.showQuickFilterBar();
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

  private getGeneralOptions(): GeneralOptions {
    return this.adaptableOptions!.generalOptions!;
  }

  // A couple of state management functions
  private getState(): AdaptableState {
    return this.AdaptableStore.TheStore.getState();
  }
}

//export const init = (adaptableOptions: AdaptableOptions): AdaptableApi =>
//  Adaptable.init(adaptableOptions);

export class AdaptableNoCodeWizard implements IAdaptableNoCodeWizard {
  private init: IAdaptableNoCodeWizardInitFn;

  private adaptableOptions: AdaptableOptions;
  private extraOptions: IAdaptableNoCodeWizardOptions;

  /**
   * @param adaptableOptions
   */
  constructor(
    adaptableOptions: AdaptableOptions,
    extraOptions: IAdaptableNoCodeWizardOptions = {}
  ) {
    const defaultInit: IAdaptableNoCodeWizardInitFn = ({ gridOptions, adaptableOptions }) => {
      adaptableOptions.vendorGrid = gridOptions;

      return new Adaptable(adaptableOptions);
    };

    this.adaptableOptions = adaptableOptions;
    this.init = extraOptions.onInit || defaultInit;
    this.extraOptions = extraOptions;

    this.render();
  }

  render(container?: HTMLElement | null) {
    let id: string = DefaultAdaptableOptions.containerOptions!.adaptableContainer || 'adaptable';

    if (!container) {
      if (this.adaptableOptions.containerOptions) {
        id = this.adaptableOptions.containerOptions.adaptableContainer || 'adaptable';
      }
    }

    container = container || document.getElementById(id);

    if (!container) {
      throw new Error('Cannot find container in which to render Adaptable No Code Wizard');
    }

    ReactDOM.render(
      React.createElement(AdaptableWizardView, {
        adaptableOptions: this.adaptableOptions,
        ...this.extraOptions,
        onInit: (adaptableOptions: AdaptableOptions) => {
          let adaptable: IAdaptable | void;

          ReactDOM.unmountComponentAtNode(container!);

          adaptable = this.init({
            adaptableOptions,
            gridOptions: adaptableOptions.vendorGrid,
          });

          adaptable = adaptable || new Adaptable(adaptableOptions);
        },
      }),
      container
    );
  }
}
