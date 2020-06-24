import * as Redux from 'redux';
import {
  Grid,
  CellRange,
  CellRangeParams,
  PopupEditorWrapper,
  RefreshCellsParams,
  GridOptions,
  Column,
  RowNode,
  ICellEditor,
  ICellRendererFunc,
  SideBarDef,
  Events,
  RowNodeTransaction,
  IClientSideRowModel,
  GridApi,
  ITooltipParams,
  ColumnResizedEvent,
} from '@ag-grid-community/all-modules';

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';

import {
  NewValueParams,
  ValueGetterParams,
  ColDef,
  ValueFormatterParams,
  ColGroupDef,
  ValueSetterParams,
} from '@ag-grid-community/all-modules';
import {
  GetMainMenuItemsParams,
  MenuItemDef,
  GetContextMenuItemsParams,
} from '@ag-grid-community/all-modules';
import Emitter, { EmitterCallback } from '../Utilities/Emitter';
import { AdaptableApp } from '../View/AdaptableView';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as StyleConstants from '../Utilities/Constants/StyleConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
// redux / store
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableStore, INIT_STATE } from '../Redux/Store/AdaptableStore';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';

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
// components
import { FilterWrapperFactory } from './FilterWrapper';
import { FloatingFilterWrapperFactory } from './FloatingFilterWrapper';

import {
  DataType,
  SortOrder,
  DisplayAction,
  DistinctCriteriaPairValue,
  FilterOnDataChangeOptions,
} from '../PredefinedConfig/Common/Enums';
import { Color } from '../Utilities/color';
import { IPPStyle } from '../Utilities/Interface/IPPStyle';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
// Helpers

import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { LoggingHelper, LogAdaptableError } from '../Utilities/Helpers/LoggingHelper';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../Utilities/Helpers/Helper';

// ag-Grid
// if you add an import from a different folder for aggrid you need to add it to externals in the webpack prod file
import { Expression, QueryRange } from '../PredefinedConfig/Common/Expression';
import { RangeHelper } from '../Utilities/Helpers/RangeHelper';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { AdaptableApiImpl } from '../Api/Implementation/AdaptableApiImpl';
import {
  DEFAULT_LAYOUT,
  HALF_SECOND,
  LIGHT_THEME,
  DARK_THEME,
} from '../Utilities/Constants/GeneralConstants';
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
import { VendorGridInfo, PivotDetails, Layout } from '../PredefinedConfig/LayoutState';
import { EditLookUpColumn, UserMenuItem } from '../PredefinedConfig/UserInterfaceState';
import { TypeUuid, createUuid } from '../PredefinedConfig/Uuid';
import { ActionColumn } from '../PredefinedConfig/ActionColumnState';
import { ActionColumnRenderer } from './ActionColumnRenderer';
import { AdaptableTheme } from '../PredefinedConfig/ThemeState';
import { GridRow, RowInfo } from '../PredefinedConfig/Selection/GridRow';
import { SelectedRowInfo } from '../PredefinedConfig/Selection/SelectedRowInfo';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { DefaultSparklinesChartProperties } from '../Utilities/Defaults/DefaultSparklinesChartProperties';
import AdaptableWizardView from '../View/AdaptableWizardView';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IReportService } from '../Utilities/Services/Interface/IReportService';
import { ReportService } from '../Utilities/Services/ReportService';
import { AdaptableApi } from '../Api/AdaptableApi';
import { AdaptableState } from '../PredefinedConfig/AdaptableState';
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
  AdaptableNoCodeWizardOptions,
  AdaptableNoCodeWizardInitFn,
} from '../AdaptableInterfaces/AdaptableNoCodeWizard';
import { AdaptablePlugin } from '../AdaptableOptions/AdaptablePlugin';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';
import { AllCommunityModules, ModuleRegistry } from '@ag-grid-community/all-modules';
import { GradientColumn } from '../PredefinedConfig/GradientColumnState';
import { AdaptableComparerFunction } from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { UserFunction } from '../AdaptableOptions/UserFunctions';
import { Report } from '../PredefinedConfig/ExportState';
import getScrollbarSize from '../Utilities/getScrollbarSize';
import { FormatColumn } from '../PredefinedConfig/FormatColumnState';
import FormatHelper from '../Utilities/Helpers/FormatHelper';

ModuleRegistry.registerModules(AllCommunityModules);

const waitForAgGrid = (isReady: () => boolean): Promise<any> => {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const wait = (callback: () => void) => {
      const ready = isReady();

      if (Date.now() - startTime > 1000) {
        console.warn(`Could not find any agGrid instance rendered.`);
        reject(`Could not find any agGrid instance rendered.`);
        return;
      }

      if (!ready) {
        requestAnimationFrame(() => {
          wait(callback);
        });
      } else {
        callback();
      }
    };

    wait(resolve);
  });
};

// do I need this in both places??
type RuntimeConfig = {
  waitForAgGrid?: boolean;
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

const adaptableInstances: { [key: string]: Adaptable } = {};

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

  private runtimeConfig?: RuntimeConfig;

  private emitter: Emitter;

  private _currentEditor: ICellEditor | undefined;
  private _id: string;

  private rowListeners: { [key: string]: (event: any) => void };

  private originalColDefValueFormatters: { [key: string]: any } = {};

  // only for our private / internal events used within Adaptable
  // public events are emitted through the EventApi
  _on = (eventName: string, callback: EmitterCallback): (() => void) =>
    this.emitter.on(eventName, callback);
  private _emit = (eventName: string, data?: any): Promise<any> =>
    this.emitter.emit(eventName, data);

  public static initLazy(adaptableOptions: AdaptableOptions): Promise<AdaptableApi> {
    return Adaptable.initInternal(adaptableOptions);
  }

  public static init(adaptableOptions: AdaptableOptions): Promise<AdaptableApi> {
    return Adaptable.initInternal(adaptableOptions);
  }

  /**
   * Lazy static constructor for Adaptable
   * Receives an AdaptableOptions object
   * Returns a Promise containing the api object in order to enable run-time access to AdapTable's properties and functions
   * @param adaptableOptions an instance of AdaptableOptions
   */
  public static async initInternal(
    adaptableOptions: AdaptableOptions,
    runtimeConfig?: RuntimeConfig
  ): Promise<AdaptableApi> {
    const extraOptions = {
      renderGrid: undefined as boolean,
      runtimeConfig: null as RuntimeConfig,
    };

    if (Array.isArray(adaptableOptions.plugins)) {
      for await (let plugin of adaptableOptions.plugins) {
        await plugin.beforeInit(adaptableOptions);
      }
    }

    const ab = new Adaptable();

    return ab.init(adaptableOptions, runtimeConfig, true).then(api => {
      if (Array.isArray(adaptableOptions.plugins)) {
        adaptableOptions.plugins.forEach(plugin => {
          plugin.afterInit(ab);
        });
      }

      return api;
    });
  }

  private static collectInstance(adaptable: Adaptable) {
    adaptable._id = adaptable.adaptableOptions.adaptableId || createUuid();
    adaptableInstances[adaptable._id] = adaptable;
  }

  private static forEachAdaptable(fn: (adaptable: Adaptable) => void) {
    Object.keys(adaptableInstances).forEach((key: string) => {
      fn(adaptableInstances[key]);
    });
  }

  private static dismissInstance(adaptable: Adaptable) {
    delete adaptableInstances[adaptable._id];
  }

  constructor() {}

  // the 'old' constructor which takes an Adaptable adaptable object
  // this is still used internally but should not be used externally as a preference
  async init(
    adaptableOptions: AdaptableOptions,
    runtimeConfig?: RuntimeConfig,
    _staticInit?: boolean
  ): Promise<AdaptableApi> {
    if (!_staticInit) {
      LoggingHelper.LogAdaptableWarning(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! You should not use the "Adaptable" constructor directly, as it was deprecated in v6 and removed in v7!
!!!!!!!
!!!!!!! Use const api = await Adaptable.init(adaptableOptions) instead.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    }
    this.emitter = new Emitter();

    // we create AdaptableOptions by merging the values provided by the user with the defaults (where no value has been set)
    this.adaptableOptions = AdaptableHelper.assignadaptableOptions(adaptableOptions);

    Adaptable.collectInstance(this);
    AdaptableHelper.CheckadaptableOptions(this.adaptableOptions);
    this.runtimeConfig = runtimeConfig || ({} as RuntimeConfig);

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

    // set up the helper
    this.agGridHelper = new agGridHelper(this, this.gridOptions);
    // we prefer the grid to be NOT instantiated so that we can do it
    // perhaps in future we will force instantiation only?

    // create the store
    this.initStore();

    // create the services
    this.CalendarService = new CalendarService(this);
    this.ValidationService = new ValidationService(this);
    this.StyleService = new StyleService(this);
    this.ChartService = new ChartService(this);
    this.FreeTextColumnService = new FreeTextColumnService(this);
    this.ScheduleService = new ScheduleService(this);
    this.SearchService = new SearchService(this);
    this.ReportService = new ReportService(this);
    this.LayoutService = new LayoutService(this);
    this.FilterService = new FilterService(this);
    this.StrategyService = new StrategyService(this);
    this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this);

    this.forPlugins(plugin => plugin.afterInitServices(this));

    // Set up strategies - we set up all the strategies suitable for the vendor grid
    // But users can make some hidden or readonly in their entitlements
    this.strategies = this.agGridHelper.setUpStrategies();

    this.forPlugins(plugin => plugin.afterInitStrategies(this, this.strategies));

    return this.initializeAgGrid().then(initialized => {
      if (!initialized) {
        // we have no grid, we can't do anything
        LoggingHelper.LogAdaptableError('Unable to set up ag-Grid');
        return this.api;
      }

      // add our adaptable object to the grid options api object
      // this is VERY useful for when we need to access Adaptable inside of agGrid only functions
      if (this.gridOptions.api) {
        (this.gridOptions.api as any).__adaptable = this;
      }

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

      if (this.abContainerElement == null) {
        this.abContainerElement = this.getadaptableContainerElement();
      }
      if (this.abContainerElement != null) {
        this.abContainerElement.innerHTML = '';
        ReactDOM.render(AdaptableApp({ Adaptable: this }), this.abContainerElement);
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

      return this.api;
    });
  }

  forPlugins(callback: (plugin: AdaptablePlugin) => any) {
    if (Array.isArray(this.adaptableOptions.plugins)) {
      this.adaptableOptions.plugins.forEach(plugin => {
        callback(plugin);
      });
    }
  }

  getPlugin(pluginId: string): AdaptablePlugin {
    const plugins = this.adaptableOptions.plugins || [];
    const thePlugin = plugins.filter(p => p.pluginId === pluginId)[0];
    if (!thePlugin) {
      throw `Cannot find plugin "${pluginId}". Make sure you spelled it right!`;
    }

    return thePlugin;
  }

  getPluginProperty(pluginId: string, propertyName: string, ...args: any): any {
    const plugins = this.adaptableOptions.plugins || [];

    const thePlugin = plugins.filter(p => p.pluginId === pluginId)[0];
    if (!thePlugin) {
      throw `Cannot find plugin "${pluginId}". Make sure you spelled it right!`;
    }

    if (thePlugin && thePlugin.hasProperty(propertyName)) {
      return thePlugin.getProperty(propertyName)(...args);
    }
  }

  lookupPlugins(propertyName: string, ...args: any): any {
    const plugins = this.adaptableOptions.plugins || [];

    for (let i = 0, len = plugins.length; i < len; i++) {
      const plugin = plugins[i];

      if (plugin.hasProperty(propertyName)) {
        return plugin.getProperty(propertyName)(...args);
      }
    }
  }

  isPluginLoaded = (pluginId: string) => {
    const plugins = this.adaptableOptions.plugins || [];
    for (let i = 0, len = plugins.length; i < len; i++) {
      const plugin = plugins[i];

      if (plugin.pluginId === pluginId) {
        return true;
      }
    }

    return false;
  };

  private initStore() {
    this.AdaptableStore = new AdaptableStore(this);

    this.AdaptableStore.onAny(
      (
        eventName: string,
        data: { action: Redux.Action; state: AdaptableState; newState: AdaptableState }
      ) => {
        this.forPlugins(plugin => plugin.onStoreEvent(eventName, data, this.AdaptableStore));

        if (eventName == INIT_STATE) {
          // and reset state also?
          this.forPlugins(plugin => plugin.onAdaptableReady(this, this.adaptableOptions));
          this.api.eventApi.emit('AdaptableReady', {
            adaptableApi: this.api,
            vendorGrid: this.adaptableOptions.vendorGrid,
          });
        }
      }
    );
  }

  private async initializeAgGrid(): Promise<boolean> {
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
        const toolpanelContext: AdaptableToolPanelContext = { Adaptable: this, Api: this.api };
        this.gridOptions.components.AdaptableToolPanel = AdaptableToolPanelBuilder(
          toolpanelContext
        );
      }
    }

    const checkVendorContainer = () => {
      let vendorContainer = this.getGridContainerElement();

      if (!vendorContainer) {
        vendorContainer = this.initVendorContainerFromInitializedAgGrid();
        if (!vendorContainer) {
          LoggingHelper.LogAdaptableError(
            'You must provide an element id in `containerOptions.vendorContainer`'
          );

          return false;
        }
      }
      return true;
    };

    const isGridInstantiated =
      this.gridOptions.api && typeof this.gridOptions.api!.getValue === 'function';

    if (isGridInstantiated) {
      if (!checkVendorContainer()) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    }

    if (this.runtimeConfig.waitForAgGrid) {
      return waitForAgGrid(() => !!this.gridOptions.api).then(() => {
        this.initVendorContainerFromInitializedAgGrid();
        return Promise.resolve(true);
      });
    } else {
      if (!checkVendorContainer()) {
        return Promise.resolve(false);
      }
    }
    // now create the grid itself - we have to do it this way as previously when we instantiated the Grid 'properly' it got created as J.Grid
    let grid: any;
    const modules = (this.adaptableOptions.vendorGrid || {}).modules || [];

    const vendorContainer = this.getGridContainerElement();

    grid = new Grid(vendorContainer, this.gridOptions, { modules });

    return Promise.resolve(grid != null);
  }

  private initVendorContainerFromInitializedAgGrid() {
    if (this.getGridContainerElement()) {
      return;
    }

    const layoutElements = this.gridOptions.api
      ? (this.gridOptions.api as any).gridOptionsWrapper
        ? (this.gridOptions.api as any).gridOptionsWrapper.layoutElements || []
        : []
      : [];

    let vendorContainer;

    for (let i = 0, len = layoutElements.length; i < len; i++) {
      const element = layoutElements[i];

      if (element && element.matches('.ag-root-wrapper')) {
        const gridContainer = element.closest('[class*="ag-theme"]');

        if (gridContainer) {
          vendorContainer = gridContainer;
          break;
        }
      }
    }

    if (!vendorContainer) {
      console.error(
        `Could not find the agGrid vendor container. This will probably break some AdapTable functionality.`
      );
    }

    return (this.adaptableOptions.containerOptions.vendorContainer = vendorContainer);
  }

  // debounced methods
  debouncedSetColumnIntoStore = _.debounce(() => {
    if (!this.gridOptions.api) {
      return;
    }
    this.setColumnIntoStore();
  }, HALF_SECOND);

  debouncedSaveGridLayout = _.debounce(() => {
    if (!this.gridOptions.api) {
      return;
    }
    this.saveGridLayout();
  }, HALF_SECOND);

  debouncedSetSelectedCells = _.debounce(() => {
    if (!this.gridOptions.api) {
      return;
    }
    this.setSelectedCells();
  }, 250);

  debouncedSetSelectedRows = _.debounce(() => {
    if (!this.gridOptions.api) {
      return;
    }
    this.setSelectedRows();
  }, HALF_SECOND);

  debouncedFilterGrid = _.debounce(() => {
    if (!this.gridOptions.api) {
      return;
    }
    this.applyGridFiltering();
  }, HALF_SECOND);

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
    this._emit('GridFiltered');
    this.setSelectedCells();
    this.setSelectedRows();
  }

  private applyDataChange(rowNodes: RowNode[]) {
    if (!this.gridOptions.api) {
      return;
    }
    let itemsToUpdate: any[] = rowNodes
      .filter((node: RowNode) => !this.isGroupRowNode(node))
      .filter((rowNode: RowNode) => this.isDataInModel(rowNode))
      .map((rowNode: RowNode) => {
        return rowNode.data;
      });
    if (ArrayExtensions.IsNotNullOrEmpty(itemsToUpdate)) {
      this.gridOptions.api!.applyTransaction({ update: itemsToUpdate });
    }
  }

  public isGroupRowNode(rowNode: RowNode): boolean {
    if (!rowNode) {
      return false;
    }
    if (rowNode.isEmptyRowGroupNode()) {
      return true;
    }
    if (rowNode.group && rowNode.group === true) {
      return true;
    }
    if (rowNode.leafGroup && rowNode.leafGroup === true) {
      return true;
    }
    return false;
  }

  private isDataInModel(rowNode: RowNode): boolean {
    if (!rowNode) {
      return false;
    }
    let data: any = rowNode.data[this.adaptableOptions.primaryKey];
    if (!data) {
      return false;
    }
    return this.getRowNodeForPrimaryKey(data) ? true : false;
  }

  public isPinnedRowNode(rowNode: RowNode): boolean {
    if (!rowNode) {
      return false;
    }
    if (rowNode.isRowPinned()) {
      return true;
    }
    return false;
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
    const allColumns: Column[] = this.gridOptions.columnApi!.getAllGridColumns();

    const NewVisibleColumnIds = VisibleColumnList.map(c => c.ColumnId);
    const NewVisibleColumnIdsMap = NewVisibleColumnIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as { [key: string]: boolean });

    allColumns.forEach(col => {
      if (!NewVisibleColumnIdsMap[col.getColId()]) {
        this.setColumnVisible(col, false);
      }
    });
    this.setColumnIntoStore();

    requestAnimationFrame(() => this.setColumnOrder(NewVisibleColumnIds));
  }

  public setColumnIntoStore() {
    // if pivotnig and we have 'special' columns as a result then do nothing ...
    if (this.gridOptions.columnApi!.isPivotMode()) {
      if (ArrayExtensions.IsNotNullOrEmpty(this.gridOptions.columnApi!.getPivotColumns())) {
        return;
      }
    }
    const allColumns: AdaptableColumn[] = [];
    const vendorCols: Column[] = this.gridOptions.columnApi!.getAllGridColumns();

    vendorCols.forEach(vendorColumn => {
      const colId: string = vendorColumn.getColId();
      if (!this.api.gridApi.isSpecialColumn(colId)) {
        let existingColumn: AdaptableColumn = this.api.gridApi.getColumnFromId(colId);
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
    const colDef = vendorColumn.getColDef();
    if (colDef.filter && this.adaptableOptions!.filterOptions.useAdaptableFilterForm) {
      this.createFilterWrapper(vendorColumn);
    }

    if (colDef.floatingFilter && this.adaptableOptions!.filterOptions.useAdaptableQuickFilter) {
      this.createQuickFilterWrapper(vendorColumn);
    }

    const quickSearchClassName = this.getQuickSearchClassName();
    if (abColumn == null) {
      abColumn = this.api.gridApi.getColumnFromId(vendorColumn.getColId());
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
      let abColumn: AdaptableColumn = this.api.gridApi.getColumnFromId(vendorColumn.getColId());
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
        let columnId = params.colDef.colId ? params.colDef.colId : params.colDef.field;

        const quickSearchState = adaptable.api.quickSearchApi.getQuickSearchState();
        if (
          StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText) &&
          (quickSearchState.DisplayAction == DisplayAction.HighlightCell ||
            quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell)
        ) {
          if (col.IsExcludedFromQuickSearch) {
            return false;
          }

          // in the very rare use case where there is no column id and we have a value
          // then lets try to find the column via the ColumnHeader and do it that way
          if (columnId == null) {
            if (params.columnApi) {
              let allCols: Column[] = params.columnApi.getAllColumns();
              if (ArrayExtensions.IsNotNullOrEmpty(allCols)) {
                let currentColumn: Column = allCols.find(
                  c => c.getColDef().headerName == params.colDef.headerName
                );
                if (currentColumn) {
                  columnId = currentColumn.getColId();
                }
              }
            }
            // if that fails then we should do a basic comparison (but without creating a range)
            if (columnId == null && params.value) {
              return String(params.value)
                .toLowerCase()
                .includes(quickSearchState.QuickSearchText);
            }
          }

          if (columnId != null) {
            const range = RangeHelper.CreateValueRangeFromOperand(quickSearchState.QuickSearchText);
            if (range) {
              // not right but just checking...
              if (RangeHelper.IsColumnAppropriateForRange(range, col)) {
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
      }
      return false;
    };
    this.setCellClassRules(cellClassRules, col.ColumnId, 'QuickSearch');
  }

  public getPrimaryKeyValueFromRowNode(rowNode: RowNode): any {
    let gridApi: GridApi = this.getGridOptionsApi();
    if (gridApi) {
      return gridApi.getValue(this.adaptableOptions!.primaryKey, rowNode);
    }
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
      if (rowNode && !this.isGroupRowNode(rowNode)) {
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
      selected.forEach(rangeSelection => {
        let shouldIncludeRange: boolean = true;
        let isStartRowPin: boolean = rangeSelection.startRow.rowPinned != null;
        let isEndRowPin: boolean = rangeSelection.endRow.rowPinned != null;
        // Warn user if trying to select pinned rows
        // If only selecting pinned rows then stop
        if (isStartRowPin) {
          if (isEndRowPin) {
            shouldIncludeRange = false;
          }
          LoggingHelper.LogWarning('Cannot select pinned rows in ag-Grid.');
        }
        if (shouldIncludeRange) {
          const y1 = Math.min(rangeSelection.startRow!.rowIndex, rangeSelection.endRow!.rowIndex);
          const y2 = Math.max(rangeSelection.startRow!.rowIndex, rangeSelection.endRow!.rowIndex);
          for (const column of rangeSelection.columns) {
            if (column != null) {
              const colId: string = column.getColId();
              const selectedColumn: AdaptableColumn = this.api.gridApi.getColumnFromId(colId);
              if (
                selectedColumn &&
                columns.find(c => c.ColumnId == selectedColumn.ColumnId) == null
              ) {
                columns.push(selectedColumn);
              }

              for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
                const rowNode = this.gridOptions.api!.getModel().getRow(rowIndex);
                // we used NOT to return grouped rows but I think that was wrong - if someone wants to return them then that is up to them...
                // we definitely dont return pinned rows as they cannot be selected
                if (rowNode && !this.isPinnedRowNode(rowNode)) {
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

    if (this.gridOptions.columnApi!.isPivotMode()) {
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
          rowNode: null,
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

  public setValue(dataChangedInfo: DataChangedInfo, internalUpdate: boolean): void {
    let newValue: any;

    let dataType:
      | 'String'
      | 'Number'
      | 'NumberArray'
      | 'Boolean'
      | 'Date'
      | 'Object'
      | 'Unknown' = this.api.gridApi.getColumnDataTypeFromColumnId(dataChangedInfo.ColumnId);
    newValue =
      dataType == DataType.Number ? Number(dataChangedInfo.NewValue) : dataChangedInfo.NewValue;

    if (dataChangedInfo.RowNode) {
      dataChangedInfo.RowNode.setDataValue(dataChangedInfo.ColumnId, newValue);
    } else {
      if (this.useRowNodeLookUp) {
        const rowNode: RowNode = this.gridOptions.api!.getRowNode(dataChangedInfo.PrimaryKeyValue);
        if (rowNode != null) {
          rowNode.setDataValue(dataChangedInfo.ColumnId, newValue);
          dataChangedInfo.RowNode = rowNode;
        }
      } else {
        let isUpdated: boolean = false;
        // prefer not to use this method but if we do then at least we can prevent further lookups once we find
        this.gridOptions.api!.getModel().forEachNode(rowNode => {
          if (!isUpdated) {
            if (dataChangedInfo.PrimaryKeyValue == this.getPrimaryKeyValueFromRowNode(rowNode)) {
              //  dataChangedInfo = this.updateValue(gridCell, rowNode);
              rowNode.setDataValue(dataChangedInfo.ColumnId, newValue);
              dataChangedInfo.RowNode = rowNode;
              isUpdated = true;
            }
          }
        });
      }
    }
    // its from a function so we want to update user filter but not external
    this.performPostEditChecks(dataChangedInfo, internalUpdate, !internalUpdate);
    if (internalUpdate) {
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

  public setCustomSort(columnId: string, comparer: AdaptableComparerFunction): void {
    const sortModel = this.gridOptions.api!.getSortModel();
    const columnDef = this.gridOptions.api!.getColumnDef(columnId);

    if (columnDef) {
      columnDef.comparator = <any>comparer;
      columnDef.pivotComparator = <any>comparer;
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
      if (rowNode && !this.isGroupRowNode(rowNode)) {
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

    if (rowNode && !this.isGroupRowNode(rowNode)) {
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
    return ArrayExtensions.ContainsItem(
      percentBars.map(pb => pb.ColumnId),
      columnId
    );
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
      if (typeof colDef.valueFormatter == 'function') {
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
          context: this.gridOptions.context,
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

  public setRowClassRules(
    rowClassRules: any,

    type: 'ConditionalStyle'
  ) {
    const localRowClassRules = this.gridOptions.rowClassRules;
    // do we need to remove stuff or test?  Im not sure...
    if (localRowClassRules) {
      // do something?
      if (type == 'ConditionalStyle') {
        //  console.log(localRowClassRules);
      }
    }
    this.gridOptions.rowClassRules = rowClassRules;
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

  public selectNodes(rowNodes: any[]): void {
    if (ArrayExtensions.IsNotNullOrEmpty(rowNodes)) {
      rowNodes.forEach(node => this.selectNode(node));
    }
  }
  public selectNode(rowNode: any): void {
    if (!rowNode) {
      LoggingHelper.LogAdaptableError('No node to select');
      return;
    }
    rowNode.setSelected(true, true);
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
    // given how much changes when editing a calculated column lets first ensure that it really has changed
    const existingCalcColumn: CalculatedColumn = this.api.calculatedColumnApi
      .getAllCalculatedColumn()
      .find(cc => cc.Uuid === calculatedColumn.Uuid);
    if (existingCalcColumn) {
      if (Helper.areObjectsEqual(existingCalcColumn, calculatedColumn)) {
        return;
      }
    }

    // the name of the column might have changed so lets get the column from store as that will be the 'old' one
    const cols: AdaptableColumn[] = this.api.gridApi.getColumns();
    const existingABColumn: AdaptableColumn = cols.find(c => c.Uuid == calculatedColumn.Uuid);

    if (existingABColumn) {
      let cleanedExpression: string = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(
        calculatedColumn.ColumnExpression,
        cols
      );

      // now get the ag-Grid ColDef Index
      const colDefs: ColDef[] = this.mapColumnDefs((colDef: ColDef) => {
        if (colDef.headerName === existingABColumn.ColumnId) {
          // clean the expression in case it got dirty

          const newColDef: ColDef = { ...colDef };
          //  change the value getter in the coldefs
          newColDef.valueGetter = (params: ValueGetterParams) =>
            this.CalculatedColumnExpressionService.ComputeExpressionValue(
              cleanedExpression,
              params.node
            );
          newColDef.type = this.agGridHelper.getAgGridDataType(
            calculatedColumn.CalculatedColumnSettings.DataType as DataType
          );

          // reset other value in case they have changed
          newColDef.enableValue = calculatedColumn.CalculatedColumnSettings.Aggregatable;
          newColDef.filter = calculatedColumn.CalculatedColumnSettings.Filterable;
          newColDef.resizable = calculatedColumn.CalculatedColumnSettings.Resizable;
          newColDef.enableRowGroup = calculatedColumn.CalculatedColumnSettings.Groupable;
          newColDef.sortable = calculatedColumn.CalculatedColumnSettings.Sortable;
          newColDef.enablePivot = calculatedColumn.CalculatedColumnSettings.Pivotable;

          // reset the name in case its changed
          newColDef.headerName = calculatedColumn.ColumnId;
          newColDef.colId = calculatedColumn.ColumnId;

          // finally the name of the column or the datatype might have changed so lets update the column in the store to be sure
          // re-apply the datatype in case it has been changed as a result of the expression changing
          existingABColumn.ColumnId = calculatedColumn.ColumnId;
          existingABColumn.DataType = calculatedColumn.CalculatedColumnSettings.DataType;
          existingABColumn.Aggregatable = this.agGridHelper.isColumnAggregetable(newColDef);
          existingABColumn.Filterable = this.agGridHelper.isColumnFilterable(newColDef);
          existingABColumn.Groupable = this.agGridHelper.isColumnGroupable(newColDef);
          existingABColumn.Pivotable = this.agGridHelper.isColumnPivotable(newColDef);
          existingABColumn.Sortable = this.agGridHelper.isColumnSortable(newColDef);
          existingABColumn.ReadOnly = this.agGridHelper.isColumnReadonly(newColDef);
          this.api.internalApi.addAdaptableColumn(existingABColumn);

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

    const newColDef: ColDef = {
      headerName: calculatedColumn.ColumnId,
      colId: calculatedColumn.ColumnId,
      hide: true,
      editable: false,
      enableValue: calculatedColumn.CalculatedColumnSettings.Aggregatable,
      filter: calculatedColumn.CalculatedColumnSettings.Filterable,
      resizable: calculatedColumn.CalculatedColumnSettings.Resizable,
      enableRowGroup: calculatedColumn.CalculatedColumnSettings.Groupable,
      sortable: calculatedColumn.CalculatedColumnSettings.Sortable,
      enablePivot: calculatedColumn.CalculatedColumnSettings.Pivotable,
      type: this.agGridHelper.getAgGridDataType(
        calculatedColumn.CalculatedColumnSettings.DataType as DataType
      ),
      valueGetter: (params: ValueGetterParams) =>
        this.CalculatedColumnExpressionService.ComputeExpressionValue(
          cleanedExpression,
          params.node
        ),
    };

    if (calculatedColumn.CalculatedColumnSettings.DataType == DataType.Number) {
      // don't think we want this
      //  newColDef.cellStyle = { ' text-align': 'right' };
    }

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

    this.addSpecialColumnToState(
      calculatedColumn.Uuid,
      calculatedColumn.ColumnId,
      calculatedColumn.CalculatedColumnSettings.DataType
    );
  }

  public getColumnDefs = (): (ColDef | ColGroupDef)[] => {
    return (this.gridOptions.columnApi as any).columnController.columnDefs || [];
    // we think this is better... but need to test a lot!!!
    // return this.gridOptions.columnApi.getAllColumns().map(c => c.getColDef());
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
      cellEditor:
        freeTextColumn.TextEditor && freeTextColumn.TextEditor == 'Large'
          ? 'agLargeTextCellEditor'
          : 'agTextCellEditor',
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

  private addSpecialColumnToState(
    uuid: TypeUuid,
    columnId: string,
    dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'
  ): void {
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
        IsExcludedFromQuickSearch: false,
      };

      this.api.internalApi.addAdaptableColumn(specialColumn);

      this.applyStylingToColumn(vendorColumn, specialColumn);

      this.postSpecialColumnEditDelete(false);
    }
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

  destroy(config?: { unmount: boolean; destroyApi?: boolean }) {
    if (this.gridOptions && this.gridOptions.api) {
      (this.gridOptions.api as any).__adaptable = null;

      if (config && config.destroyApi === false) {
      } else {
        this.gridOptions.api.destroy();
      }
    }

    this.rowListeners = null;
    this.emitter.clearListeners();
    this.emitter = null;
    Adaptable.dismissInstance(this);

    const abContainerElement = this.getadaptableContainerElement();
    if (config && !config.unmount) {
      return;
    }
    if (abContainerElement != null) {
      ReactDOM.unmountComponentAtNode(abContainerElement);
    }
  }

  // really really need to do this properly but as a temp fix lets create a default style for when no data
  public getDefaultIPPStyle(): IPPStyle {
    return {
      Header: {
        headerColor: '#000000',
        headerBackColor: '#f5f7f7',
        headerFontFamily: 'sans-serif',
        headerFontSize: '12px',
        headerFontStyle: 'normal',
        headerFontWeight: '400',
        height: 65,
        Columns: this.api.gridApi.getColumns().map(col => {
          return {
            columnFriendlyName: col.FriendlyName,
            width: 200,
            textAlign: 'start',
          };
        }),
      },
      Row: {
        color: '#000000',
        backColor: '#ffffff',
        altBackColor: '#fcfdfe',
        fontFamily: 'sans-serif',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '400',
        height: 30,
        Columns: this.api.gridApi.getColumns().map(col => {
          return {
            columnFriendlyName: col.FriendlyName,
            width: 200,
            textAlign: 'start',
          };
        }),
      },
    };
  }

  // This horrible method is used to get the grid style for when we export to ipushpull
  // We need to find a better implementation
  public getCurrentIPPStyle(): IPPStyle {
    return this.agGridHelper.getCurrentIPPStyle();
  }

  private getadaptableContainerElement(): HTMLElement | null {
    if (!this.abContainerElement) {
      this.abContainerElement = document.getElementById(
        this.adaptableOptions!.containerOptions.adaptableContainer
      );

      if (!this.abContainerElement) {
        let oldContainer = document.getElementById('adaptableBlotter');

        if (oldContainer) {
          LoggingHelper.LogAdaptableWarning(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!! The old default container element for Adaptable was "#adaptableBlotter", configured via 'containerOptions.adaptableContainer="adaptableBlotter"'.
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
      this.gridContainerElement =
        typeof this.adaptableOptions!.containerOptions.vendorContainer === 'string'
          ? document.getElementById(this.adaptableOptions!.containerOptions.vendorContainer)
          : this.adaptableOptions!.containerOptions.vendorContainer;
    }
    return this.gridContainerElement;
  }

  private initInternalGridLogic() {
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
    // dealing with scenario where the data is provided to adaptable after grid has been setup
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
      Events.EVENT_COLUMN_ROW_GROUP_CHANGED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
        this.debouncedSaveGridLayout();
      }
    });

    // doing this seperately as wont always be wanted
    this.gridOptions.api!.addEventListener(Events.EVENT_ROW_GROUP_OPENED, (params: any) => {
      if (this.adaptableOptions.layoutOptions.includeOpenedRowGroups) {
        this.debouncedSaveGridLayout();
      }
    });

    this.gridOptions.api!.addEventListener(
      Events.EVENT_COLUMN_RESIZED,
      (params: ColumnResizedEvent) => {
        if (!this.gridOptions.api) {
          return;
        }

        // if a column is resized there are a couple of things we need to do once its finished
        if (params.type == 'columnResized' && params.finished == true) {
          if (params.column) {
            this._emit('ColumnResized', params.column.getColId());
          }
        }
      }
    );

    // this event deals with when the user makes an edit - it doesnt look at ticking data
    this.gridOptions.api!.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
      // TODO: This is a workaround as we are accessing private members of agGrid.
      // I still wonder if we can do this nicer by using :   this.gridOptions.api!.getEditingCells();
      // must be a good reason why we don't use it

      if (this.gridOptions.columnApi!.isPivotMode()) {
        return;
      }
      const rowRenderer: any = (<any>this.gridOptions.api).rowRenderer;
      if (rowRenderer) {
        const index: any = rowRenderer.rowCompsByIndex[params.node.rowIndex];
        if (index) {
          const editor = index.cellComps[params.column.getColId()].cellEditor;

          // editor might be type Popup like agPopupTextCellEditor or agPopupSelectCellEditor (see: https://www.ag-grid.com/javascript-grid-cell-editing/)
          // if so then we need to get the inner editor
          if (editor instanceof PopupEditorWrapper) {
            this._currentEditor = (<any>editor).cellEditor;
          } else {
            this._currentEditor = editor;
          }
        }
      }

      // No need to register for the keydown on the editor since we already register on the main div

      // if there was already an implementation set by the dev we keep the reference to it and execute it at the end
      if (this._currentEditor) {
        const oldIsCancelAfterEnd = this._currentEditor.isCancelAfterEnd;

        this._currentEditor.isCancelAfterEnd = () => {
          const dataChangedInfo: DataChangedInfo = {
            OldValue: this.gridOptions.api!.getValue(params.column.getColId(), params.node),
            NewValue: this._currentEditor.getValue(),
            ColumnId: params.column.getColId(),
            PrimaryKeyValue: this.getPrimaryKeyValueFromRowNode(params.node),
            RowNode: params.node,
          };

          if (dataChangedInfo.OldValue === dataChangedInfo.NewValue) {
            return true;
          }
          if (!this.ValidationService.PerformCellValidation(dataChangedInfo)) {
            return true;
          }

          const onServerValidationCompleted = () => {
            const whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false;
            if (!whatToReturn) {
              // its from a user edit (I think!) but the filter is working anyway...
              this.performPostEditChecks(dataChangedInfo, false, false);
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
      }
    });
    this.gridOptions.api!.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, (params: any) => {
      // (<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))

      // We refresh the filter so we get live search/filter when editing.
      // Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
      this._currentEditor = undefined;

      if (params && params.node) {
        let column = params.column;
        // for numeric columns we want to make sure its a numeric update in case they have aggregation
        if (column) {
          let abColumn: AdaptableColumn = this.api.gridApi.getColumnFromId(column.colId);
          if (abColumn && abColumn.DataType == DataType.Number) {
            let shouldUpdateNumberEdit: boolean = true;
            if (ArrayExtensions.IsNotNullOrEmpty(this.api.shortcutApi.getAllShortcut())) {
              const lastShortCut: GridCell | undefined = this.api.internalApi.getSystemState()
                .LastAppliedShortCut;
              if (lastShortCut) {
                shouldUpdateNumberEdit = false;
              }
            }

            if (shouldUpdateNumberEdit) {
              params.node.setDataValue(column.colId, Number(params.value));
            }
          }
        }
        // if they have set to run filter after edit then lets do it
        this.filterOnUserDataChange([params.node]);
        this.debouncedSetSelectedCells();
      }
    });

    // this handles ticking data
    // except it doesnt handle when data has been added to ag-Grid using applyTransaction
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
                  StringExtensions.IsNotNullOrEmpty(pb.PositiveValueColumnId) &&
                  pb.PositiveValueColumnId == changedColId
                ) {
                  ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
                }
                if (
                  StringExtensions.IsNotNullOrEmpty(pb.NegativeValueColumnId) &&
                  pb.NegativeValueColumnId == changedColId
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

    this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGED, (params: any) => {
      // to do?
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_SELECTION_CHANGED, () => {
      //     this.debouncedSetSelectedRows();
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_RANGE_SELECTION_CHANGED, () => {
      this.debouncedSetSelectedCells();
    });

    // this.gridOptions.api!.addEventListener(Events.EVENT_TOOL_PANEL_VISIBLE_CHANGED, () => {
    // });

    //  this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGED, (params: any) => {
    // });

    const columnEventsThatTriggerSortChanged = [
      Events.EVENT_SORT_CHANGED,
      //  Events.EVENT_COLUMN_ROW_GROUP_CHANGED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (ArrayExtensions.ContainsItem(columnEventsThatTriggerSortChanged, type)) {
        this.onSortChanged();
        this.debouncedSetSelectedCells();
      }
    });

    this.gridOptions.api!.addEventListener(Events.EVENT_MODEL_UPDATED, (params: any) => {
      if (this.adaptableOptions.generalOptions.showGroupingTotalsAsHeader) {
        if (params && params.api) {
          const pinnedData = params.api.getPinnedTopRow(0);
          const model = params.api.getModel() as IClientSideRowModel;
          const rootNode = model.getRootNode();
          if (!pinnedData) {
            params.api.setPinnedTopRowData([rootNode.aggData]);
          } else {
            pinnedData.updateData(rootNode.aggData);
          }
        }
      }
      this.checkColumnsDataTypeSet();
    });

    this.rowListeners = {
      dataChanged: (event: any) => {
        this.onRowDataChanged({
          //  myevent: event,
          rowNode: event.node,
          oldData: event.oldData,
          newData: event.newData,
        });
      },
    };

    /**
     * AgGrid does not expose Events.EVENT_ROW_DATA_CHANGED
     * so we have to override `dispatchLocalEvent`
     * and hook our own functionality into it
     *
     */
    RowNodeProto.dispatchLocalEvent = function(event: any) {
      const node = event.node;

      const result = RowNode_dispatchLocalEvent.apply(this, arguments);

      // we don't know from which instance of aggrid this is coming,
      // as this fn is shared by all instances

      if (node) {
        Adaptable.forEachAdaptable(adaptable => {
          if (node.gridApi !== adaptable.gridOptions.api) {
            // the event is coming from another aggrid instance
            // so IGNORE IT
            return;
          }
          // we're on the correct instance, so do this
          const fn = adaptable.rowListeners ? adaptable.rowListeners[event.type] : null;
          if (fn) {
            fn(event);
          }
        });
      }

      return result;
    };

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
            const visibleCols = columns.filter(c => c.Visible && !c.IsExcludedFromQuickSearch);
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

    this.applyFormatColumnDisplayFormats();

    // Build the COLUMN HEADER MENU.  Note that we do this EACH time the menu is opened (as items can change)
    const originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
    this.gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
      // couldnt find a way to listen for menu close. There is a Menu Item Select, but you can also close menu from filter and clicking outside menu....
      const colId: string = params.column.getColId();

      const adaptableMenuItems: AdaptableMenuItem[] = [];

      const adaptableColumn: AdaptableColumn = this.api.gridApi.getColumnFromId(colId);
      if (adaptableColumn != null) {
        this.strategies.forEach(s => {
          let menuItems: AdaptableMenuItem[] | undefined = s.addColumnMenuItems(adaptableColumn);
          if (menuItems) {
            adaptableMenuItems.push(...menuItems);
          }
        });
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
        IsGroupedNode: false,
        RowNode: undefined,
        PrimaryKeyValue: undefined,
        SelectedCellInfo: this.api.gridApi.getSelectedCellInfo(),
        SelectedRowInfo: this.api.gridApi.getSelectedRowInfo(),
        AdaptableApi: this.api,
      };

      let showAdaptableColumnMenu = this.adaptableOptions.userInterfaceOptions!
        .showAdaptableColumnMenu;

      if (showAdaptableColumnMenu == null || showAdaptableColumnMenu !== false) {
        adaptableMenuItems.forEach((adaptableMenuItem: AdaptableMenuItem) => {
          if (adaptableMenuItem) {
            let addColumnMenuItem: boolean = true;
            if (showAdaptableColumnMenu != null && typeof showAdaptableColumnMenu === 'function') {
              addColumnMenuItem = showAdaptableColumnMenu(adaptableMenuItem, menuInfo);
            }
            if (addColumnMenuItem) {
              let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(
                adaptableMenuItem
              );
              colMenuItems.push(menuItem);
            }
          }
        });
      }
      let userColumnMenuItems = this.api.userInterfaceApi.getUserInterfaceState().ColumnMenuItems;

      if (ArrayExtensions.IsNotNullOrEmpty(userColumnMenuItems)) {
        userColumnMenuItems
          .filter((userMenuItem: UserMenuItem) => {
            return userMenuItem.UserMenuItemShowPredicate
              ? this.getUserFunctionHandler(
                  'UserMenuItemShowPredicate',
                  userMenuItem.UserMenuItemShowPredicate
                )(menuInfo)
              : true;
          })
          .forEach((userMenuItem: UserMenuItem) => {
            let label: string = userMenuItem.Label;
            // if there is a function for the label use that return value instead of the label value
            let functionLabel = this.getUserFunctionHandler(
              'UserMenuItemLabelFunction',
              userMenuItem.Label
            );
            if (functionLabel) {
              let labelFunctionResult: string = functionLabel(menuInfo);
              if (StringExtensions.IsNotNullOrEmpty(labelFunctionResult)) {
                label = labelFunctionResult;
              }
            }
            let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromUsereMenu(
              label,
              userMenuItem,
              menuInfo,
              'contextMenu'
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

      const adaptableMenuItems: AdaptableMenuItem[] = [];
      const agGridColumn: Column = params.column;
      if (agGridColumn) {
        const adaptableColumn: AdaptableColumn = this.api.gridApi.getColumnFromId(
          agGridColumn.getColId()
        );

        if (adaptableColumn != null) {
          menuInfo = this.agGridHelper.createMenuInfo(params, adaptableColumn);
          // keep it simple for now - if its a grouped cell then don't add the shipped menu items
          if (!params.node.group) {
            this.strategies.forEach(s => {
              let menuItem: AdaptableMenuItem | undefined = s.addContextMenuItem(menuInfo);
              if (menuItem) {
                adaptableMenuItems.push(menuItem);
              }
            });
          }
          // here we create Adaptable adaptable Menu items from OUR internal collection
          // user has ability to decide whether to show or not
          if (ArrayExtensions.IsNotNullOrEmpty(adaptableMenuItems)) {
            let showAdaptableContextMenu = this.adaptableOptions.userInterfaceOptions!
              .showAdaptableContextMenu;
            if (showAdaptableContextMenu == null || showAdaptableContextMenu !== false) {
              contextMenuItems.push('separator');
              adaptableMenuItems.forEach((adaptableMenuItem: AdaptableMenuItem) => {
                if (adaptableMenuItem) {
                  let addContextMenuItem: boolean = true;
                  if (
                    showAdaptableContextMenu != null &&
                    typeof showAdaptableContextMenu === 'function'
                  ) {
                    addContextMenuItem = showAdaptableContextMenu(adaptableMenuItem, menuInfo);
                  }
                  if (addContextMenuItem) {
                    let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(
                      adaptableMenuItem
                    );
                    contextMenuItems.push(menuItem);
                  }
                }
              });
            }
          }

          let userContextMenuItems = this.api.userInterfaceApi.getUserInterfaceState()
            .ContextMenuItems;

          if (ArrayExtensions.IsNotNullOrEmpty(userContextMenuItems)) {
            contextMenuItems.push('separator');
            userContextMenuItems
              .filter((userMenuItem: UserMenuItem) => {
                return userMenuItem.UserMenuItemShowPredicate
                  ? this.getUserFunctionHandler(
                      'UserMenuItemShowPredicate',
                      userMenuItem.UserMenuItemShowPredicate
                    )(menuInfo)
                  : true;
              })
              .forEach((userMenuItem: UserMenuItem) => {
                let label: string = userMenuItem.Label;
                // if there is a function for the label use that return value instead of the label value
                let functionLabel = this.getUserFunctionHandler(
                  'UserMenuItemLabelFunction',
                  userMenuItem.Label
                );
                if (functionLabel) {
                  let labelFunctionResult: string = functionLabel(menuInfo);
                  if (StringExtensions.IsNotNullOrEmpty(labelFunctionResult)) {
                    label = labelFunctionResult;
                  }
                }
                let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromUsereMenu(
                  label,
                  userMenuItem,
                  menuInfo,
                  'contextMenu'
                );
                contextMenuItems.push(menuItem);
              });
          }
        }
      }
      return contextMenuItems;
    };
  }

  public applyFormatColumnDisplayFormats(): void {
    // we will always call this method whenever any Format Column formats change - no need to manage adding, editing, deleting seperately
    const formatColumns: FormatColumn[] = this.api.formatColumnApi
      .getAllFormatColumnWithDisplayFormat()
      .concat(this.api.formatColumnApi.getAllFormatColumnWithCellAlignment());

    const cols = this.gridOptions.columnApi.getAllColumns();

    cols.forEach((column: Column) => {
      const colDef = column.getColDef();
      if (this.originalColDefValueFormatters[colDef.field] === undefined) {
        this.originalColDefValueFormatters[colDef.field] = colDef.valueFormatter || null;
      }

      colDef.valueFormatter = this.originalColDefValueFormatters[colDef.field];

      const formatColumn = formatColumns.find(
        fc => fc.ColumnId === colDef.field || fc.ColumnId === colDef.colId
      );

      if (!formatColumn) {
        return;
      }

      if (formatColumn.DisplayFormat) {
        if (formatColumn.DisplayFormat.Formatter === 'NumberFormatter') {
          const options = formatColumn.DisplayFormat.Options;
          colDef.valueFormatter = params => FormatHelper.NumberFormatter(params.value, options);
        }

        if (formatColumn.DisplayFormat.Formatter === 'DateFormatter') {
          const options = formatColumn.DisplayFormat.Options;
          colDef.valueFormatter = params => FormatHelper.DateFormatter(params.value, options);
        }
      }

      // update the alignment if it has been set
      if (formatColumn.CellAlignment != null) {
        switch (formatColumn.CellAlignment) {
          case 'Left':
            colDef.cellClass = 'ab-cell--align-left';
            break;
          case 'Right':
            colDef.cellClass = 'ab-cell--align-right';
            break;
          case 'Center':
            colDef.cellClass = 'ab-cell--align-center';
            break;
        }
      }
    });
  }

  private postSpecialColumnEditDelete(doReload: boolean) {
    if (this.isInitialised) {
      //  reload the existing layout if its not default
      // I have no idea any more why we do this but there must presumably be a good reason
      // we really need to revisit how we manage special columns
      // its still brittle but better than it was
      let currentlayout: Layout = this.api.layoutApi.getCurrentLayout();
      if (currentlayout) {
        let currentlayoutName: string = this.api.layoutApi.getCurrentLayout().Name;
        if (currentlayoutName != DEFAULT_LAYOUT) {
          if (doReload) {
            this.api.layoutApi.setLayout(DEFAULT_LAYOUT);
            this.api.layoutApi.setLayout(currentlayoutName);
            this.setColumnIntoStore();
          } else {
            this.api.layoutApi.setLayout(currentlayoutName);
          }
        }
      }
      this.applyFormatColumnDisplayFormats();
      this.addSpecialRendereredColumns();
      this._emit('SpecialColumnAdded');
    }
  }

  private addSpecialRendereredColumns(): void {
    this.forPlugins(() => {});
    this.api.percentBarApi.getAllPercentBar().forEach(pcr => {
      this.addPercentBar(pcr);
    });
    this.api.gradientColumnApi.getAllGradientColumn().forEach(gc => {
      this.addGradientColumn(gc);
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

    const renderedColumn = this.api.gridApi.getColumnFromId(sparklineColumn.ColumnId);

    if (renderedColumn) {
      const cellRendererComp: any = this.agGridHelper.createSparklineCellRendererComp(
        sparklineColumn,
        this.adaptableOptions!.adaptableId!
      );
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(
        sparklineColumn.ColumnId
      );
      const colDef: ColDef = vendorGridColumn.getColDef();
      if (cellRendererComp) {
        colDef.cellRenderer = cellRendererComp;
      }

      if (sparklineColumn.ShowToolTip != null && sparklineColumn.ShowToolTip == true) {
        colDef.tooltipField = colDef.field;
      } else {
        colDef.tooltipField = '';
      }
    }
  }

  public removeSparklineColumn(sparklineColumn: SparklineColumn): void {
    const renderedColumn = this.api.gridApi.getColumnFromId(sparklineColumn.ColumnId);
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

  public addGradientColumn(gradientColumn: GradientColumn): void {
    let agGridColDef: ColDef = this.gridOptions.api!.getColumnDef(gradientColumn.ColumnId);
    if (agGridColDef) {
      agGridColDef.cellStyle = (params: any) => {
        var color: any;
        var gradientValue: number | undefined;
        let baseValue = gradientColumn.BaseValue;
        let isNegativeValue = params.value < 0;
        if (isNegativeValue) {
          color = gradientColumn.NegativeColor;
          gradientValue = gradientColumn.NegativeValue;
        } else {
          color = gradientColumn.PositiveColor;
          gradientValue = gradientColumn.PositiveValue;
        }
        if (gradientValue && baseValue !== undefined) {
          const increase: any = Math.abs(gradientValue - baseValue);
          let percentage = ((params.value - baseValue) / increase) * 100;
          if (isNegativeValue) {
            percentage = percentage * -1;
          }
          let alpha = Number((percentage / 100).toPrecision(2)); //params.
          return {
            'background-color': new Color(color).toRgba(alpha),
          };
        }
      };
    }
  }

  public removeGradientColumn(gradientColumn: GradientColumn): void {
    let agGridColDef: ColDef = this.gridOptions.api!.getColumnDef(gradientColumn.ColumnId);
    if (agGridColDef && agGridColDef.cellStyle) {
      agGridColDef.cellStyle = undefined;
    }
  }

  public addPercentBar(pcr: PercentBar): void {
    const renderedColumn = this.api.gridApi.getColumnFromId(pcr.ColumnId);
    if (renderedColumn) {
      const cellRendererFunc: ICellRendererFunc = this.agGridHelper.createPercentBarCellRendererFunc(
        pcr,
        this.adaptableOptions!.adaptableId!
      );
      const vendorGridColumn: Column = this.gridOptions.columnApi!.getColumn(pcr.ColumnId);
      const colDef: ColDef = vendorGridColumn.getColDef();
      colDef.cellRenderer = cellRendererFunc;

      if (pcr.ShowToolTip != null && pcr.ShowToolTip == true && pcr.Ranges) {
        const min = pcr.Ranges[0].Min;
        const max = pcr.Ranges[pcr.Ranges.length - 1].Max;

        // colDef.tooltipField = colDef.field;
        // for now NOT using this PercentBarTooltip but we can add it later and will be powwerful.
        //  coldDef.tooltipComponent = PercentBarTooltip;
        colDef.tooltipValueGetter = ({ value }: ITooltipParams) => {
          const clampedValue = _.clamp(value, min, max);
          const percentageValue = ((clampedValue - min) / (max - min)) * 100;

          if (pcr.DisplayRawValue && pcr.DisplayPercentageValue) {
            return `${value} (${percentageValue.toFixed(0)}%)`;
          }

          if (pcr.DisplayPercentageValue) {
            return `${percentageValue.toFixed(0)}%`;
          }

          return value;
        };
      } else {
        colDef.tooltipField = '';
      }
    }
  }

  public removePercentBar(pcr: PercentBar): void {
    const renderedColumn = this.api.gridApi.getColumnFromId(pcr.ColumnId);
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
        // probably wrong but seems agGrid is doing it for us
        this.performPostEditChecks(dataChangedInfo, false, false);
      }
    });
  }

  /**
   * There are a few things that we need to do AFTER we edit a cell and it makes sense to put them in one place
   */
  private performPostEditChecks(
    dataChangedInfo: DataChangedInfo,
    applyUserDataFilter: boolean,
    applyExternalDataFilter: boolean
  ): void {
    if (this.AuditLogService.isAuditCellEditsEnabled) {
      this.AuditLogService.addEditCellAuditLog(dataChangedInfo);
    }

    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedInfo);
    this.DataService.CreateDataChangedEvent(dataChangedInfo);
    if (applyUserDataFilter) {
      this.filterOnUserDataChange([dataChangedInfo.RowNode]);
    }
    if (applyExternalDataFilter) {
      this.filterOnExternalDataChange([dataChangedInfo.RowNode]);
    }
    this.checkChangedCellCurrentlySelected(dataChangedInfo);
  }

  private checkChangedCellCurrentlySelected(dataChangedInfo: DataChangedInfo): void {
    let selectedCellInfo: SelectedCellInfo = this.api.gridApi.getSelectedCellInfo();
    if (selectedCellInfo && ArrayExtensions.IsNotNullOrEmpty(selectedCellInfo.GridCells)) {
      let matchingCell: GridCell = selectedCellInfo.GridCells.find(
        (gc: GridCell) =>
          gc.primaryKeyValue == dataChangedInfo.PrimaryKeyValue &&
          gc.columnId == dataChangedInfo.ColumnId
      );
      if (matchingCell) {
        this.setSelectedCells();
      }
    }

    let selectedRowInfo: SelectedRowInfo = this.api.gridApi.getSelectedRowInfo();
    if (selectedRowInfo && ArrayExtensions.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
      let matchingRow: GridRow = selectedRowInfo.GridRows.find(
        (gr: GridRow) => gr.primaryKeyValue == dataChangedInfo.PrimaryKeyValue
      );
      if (matchingRow) {
        this.setSelectedRows();
      }
    }
  }

  public editPercentBar(pcr: PercentBar): void {
    this.removePercentBar(pcr);
    this.addPercentBar(pcr);
  }

  public editGradientColumn(gradientColumn: GradientColumn): void {
    this.removeGradientColumn(gradientColumn);
    this.addGradientColumn(gradientColumn);
  }

  public editSparklineColumn(sparklineColumn: SparklineColumn): void {
    this.removeSparklineColumn(sparklineColumn);
    this.addSparklineColumn(sparklineColumn);
  }

  private onSortChanged(): void {
    const sortModel: { colId: string; sort: string }[] = this.gridOptions.api!.getSortModel();
    const newColumnSorts: ColumnSort[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(sortModel)) {
      sortModel.forEach(sm => {
        if (this.api.gridApi.isSpecialColumn(sm.colId)) {
          this.agGridHelper.createGroupedColumnCustomSort();
        }
        const columnSort: ColumnSort = {
          Column: sm.colId,
          SortOrder: sm.sort == 'asc' ? SortOrder.Ascending : SortOrder.Descending,
        };
        newColumnSorts.push(columnSort);
      });
    }
    this.api.gridApi.setColumnSorts(newColumnSorts);
    this._emit('SortChanged', newColumnSorts);
  }

  public expandAllRowGroups(): void {
    this.gridOptions.api.forEachNode((node: any) => {
      if (node.group) {
        node.expanded = true;
      }
    });
    this.gridOptions.api.onGroupExpandedOrCollapsed();
  }

  public closeAllRowGroups(): void {
    this.gridOptions.api.forEachNode((node: any) => {
      if (node.group) {
        node.expanded = false;
      }
    });
    this.gridOptions.api.onGroupExpandedOrCollapsed();
  }

  public expandRowGroupsForValues(columnValues: any[]): void {
    if (ArrayExtensions.IsNotNullOrEmpty(columnValues)) {
      this.gridOptions.api.forEachNode((node: RowNode) => {
        if (node.group && !node.expanded) {
          if (ArrayExtensions.ContainsItem(columnValues, node.key)) {
            node.setExpanded(true);
          }
        }
      });
      this.gridOptions.api.onGroupExpandedOrCollapsed();
    }
  }

  public getExpandRowGroupsKeys(): any[] {
    let returnValues: any[] = [];
    if (this.adaptableOptions.layoutOptions.includeOpenedRowGroups) {
      this.gridOptions.api.forEachNode((node: RowNode) => {
        if (node.group && node.expanded) {
          returnValues.push(node.key);
        }
      });
    }
    return returnValues;
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

  public selectColumns(columnIds: string[]): void {
    columnIds.forEach(colId => this.selectColumn(colId));
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
    if (!this.gridOptions.api) {
      return;
    }
    this.gridOptions.api.setSortModel(sortModel);
    this.gridOptions.api.onSortChanged();
  }

  public setDataSource(dataSource: any) {
    if (!this.gridOptions.api) {
      return;
    }
    this.gridOptions.api.setRowData(dataSource);
  }

  public loadDataSource(dataSource: any) {
    this.setDataSource(dataSource);
    let currentLayout = this.api.layoutApi.getCurrentLayout();
    if (currentLayout && currentLayout.AdaptableGridInfo) {
      if (ArrayExtensions.IsNotNullOrEmpty(currentLayout.AdaptableGridInfo.ExpandedRowGroupKeys)) {
        this.expandRowGroupsForValues(currentLayout.AdaptableGridInfo.ExpandedRowGroupKeys);
      }
    }
  }

  public updateRows(
    dataRows: any[],
    config?: { batchUpdate?: boolean; callback?: (res: RowNodeTransaction) => void }
  ): void {
    config = config || {};
    if (config.batchUpdate) {
      this.gridOptions.api!.applyTransactionAsync({ update: dataRows }, config.callback);
    } else {
      this.gridOptions.api!.applyTransaction({ update: dataRows });
    }
  }

  public addRows(dataRows: any[]): void {
    this.gridOptions.api!.applyTransaction({ add: dataRows });
  }

  public deleteRows(dataRows: any[]): void {
    this.gridOptions.api!.applyTransaction({ remove: dataRows });
  }

  private updateQuickSearchRangeVisibleColumn(columnId: string): void {
    if (this.isInitialised) {
      const quickSearchState: QuickSearchState = this.api.quickSearchApi.getQuickSearchState();
      // only update if quick search is not highlight and is set - rare use case...
      if (
        quickSearchState.DisplayAction != DisplayAction.HighlightCell &&
        StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
      ) {
        const column: AdaptableColumn = this.api.gridApi.getColumnFromId(columnId);
        if (!column.IsExcludedFromQuickSearch) {
          const quickSearchRange: QueryRange = this.getState().System.QuickSearchRange;

          if (quickSearchRange != null) {
            if (RangeHelper.IsColumnAppropriateForRange(quickSearchRange, column)) {
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
  }

  public getFirstGroupedColumn(): AdaptableColumn | undefined {
    let groupedColumns: Column[] = this.gridOptions.columnApi.getRowGroupColumns();
    if (ArrayExtensions.IsNotNullOrEmpty(groupedColumns)) {
      let groupedColumn: Column = groupedColumns[0];
      return this.api.gridApi.getColumnFromId(groupedColumn.getColId());
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
      const groupedCol = displayedColumns.find(c => this.api.gridApi.isSpecialColumn(c.getColId()));
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
        InPivotMode: this.gridOptions.columnApi!.isPivotMode(),
        ValueColumns: this.gridOptions.columnApi!.getValueColumns().map(c => c.getColId()),
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
          this.gridOptions.columnApi!.setColumnGroupState(JSON.parse(columnGroupState));
        }
      }

      if (vendorGridInfo.InPivotMode && vendorGridInfo.InPivotMode == true) {
        this.gridOptions.columnApi!.setPivotMode(true);
      } else {
        this.gridOptions.columnApi!.setPivotMode(false);
      }

      if (ArrayExtensions.IsNotNullOrEmpty(vendorGridInfo.ValueColumns)) {
        this.gridOptions.columnApi!.setValueColumns(vendorGridInfo.ValueColumns);
      }
    }
  }

  public setGroupedColumns(groupedCols: string[]): void {
    if (ArrayExtensions.IsNotNullOrEmpty(groupedCols)) {
      this.gridOptions.columnApi!.setRowGroupColumns(groupedCols);
    } else {
      this.gridOptions.columnApi!.setRowGroupColumns([]);
    }

    if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInLayout == true) {
      this.gridOptions.columnApi!.autoSizeAllColumns();
    }
  }

  public setPivotingDetails(pivotDetails: PivotDetails): void {
    let isPivotLayout = this.LayoutService.isPivotedLayout(pivotDetails);

    // if its not a pivot layout then turn off pivot mode and get out
    if (!isPivotLayout) {
      this.gridOptions.columnApi!.setPivotMode(false);
      return;
    }

    if (ArrayExtensions.IsNotNull(pivotDetails.PivotColumns)) {
      this.gridOptions.columnApi!.setPivotColumns(pivotDetails.PivotColumns);
    }

    if (ArrayExtensions.IsNotNull(pivotDetails.AggregationColumns)) {
      this.gridOptions.columnApi!.setValueColumns(pivotDetails.AggregationColumns);
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
    this.gridOptions.columnApi!.setPivotMode(true);
  }

  private turnOffPivoting(): void {
    this.gridOptions.columnApi!.setPivotMode(false);
  }

  public setLayout(layout: Layout): void {
    if (layout.Name === DEFAULT_LAYOUT) {
      if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInDefaultLayout === true) {
        this.gridOptions.columnApi!.autoSizeAllColumns();
      }
    } else {
      if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInLayout === true) {
        this.gridOptions.columnApi!.autoSizeAllColumns();
      }
    }

    // set any expanded group rows
    if (ArrayExtensions.IsNotNullOrEmpty(layout.AdaptableGridInfo.ExpandedRowGroupKeys)) {
      this.expandRowGroupsForValues(layout.AdaptableGridInfo.ExpandedRowGroupKeys);
    }

    let layoutSorts: ColumnSort[] = layout.AdaptableGridInfo.CurrentColumnSorts;
    setTimeout(() => {
      this.setColumnSort(layoutSorts);
    }, 1000);
  }

  // these 3 methods are strange as we shouldnt need to have to set a columnEventType but it seems agGrid forces us to
  // not sure why as its not in the api
  private setColumnVisible(col: any, isVisible: boolean) {
    this.gridOptions.columnApi!.setColumnVisible(col, isVisible);
  }

  private setColumnOrder(columnIds: string[]) {
    if (!this.gridOptions || !this.gridOptions.columnApi) {
      return;
    }
    this.gridOptions.columnApi!.setColumnsVisible(columnIds, true);
    const specialColumn: Column = this.gridOptions!.columnApi.getAllDisplayedColumns().filter(c =>
      this.api.gridApi.isSpecialColumn(c.getColId())
    )[0];
    if (specialColumn) {
      columnIds = [specialColumn.getColId(), ...columnIds];
    }

    this.gridOptions.columnApi!.moveColumns(columnIds, 0);
  }

  private setColumnState(columnApi: any, columnState: any, columnEventType: string) {
    columnApi.setColumnState(columnState, columnEventType);
  }

  public isSelectable(): boolean {
    let isRangeSelectionModuleRegistered: boolean = this.agGridHelper.isModulePresent(
      'range-selection'
    );
    if (
      isRangeSelectionModuleRegistered &&
      this.gridOptions.enableRangeSelection != null &&
      this.gridOptions.enableRangeSelection
    ) {
      return true;
    }
    return false;
  }

  public isGroupable(): boolean {
    const isTreeLayout: boolean = this.api.internalApi.isGridInTreeMode();
    return !isTreeLayout;
  }

  public isPivotable(): boolean {
    const isTreeLayout: boolean = this.api.internalApi.isGridInTreeMode();
    return !isTreeLayout;
  }

  public isQuickFilterActive(): boolean {
    return this.hasFloatingFilterOnAtLeastOneColumn() === true;
  }

  private hasFloatingFilterOnAtLeastOneColumn(defs = this.gridOptions.columnDefs): boolean {
    if (this.gridOptions.defaultColDef && this.gridOptions.defaultColDef.floatingFilter) {
      return true;
    }
    let col: ColDef | ColGroupDef;
    for (col of this.gridOptions.columnDefs) {
      if ((col as ColDef).floatingFilter) {
        return true;
      }
      if ((col as ColGroupDef).children) {
        if (this.hasFloatingFilterOnAtLeastOneColumn((col as ColGroupDef).children)) {
          return true;
        }
      }
    }
    return false;
  }

  public showQuickFilter(): void {
    this.gridOptions.api.setFloatingFiltersHeight(null);
  }

  public hideQuickFilter(): void {
    this.gridOptions.api.setFloatingFiltersHeight(0);
  }

  public getVendorGridLightThemeName(): string {
    const container = this.getGridContainerElement();

    if (container && container.classList) {
      // we detect the ag theme class
      const classList = container.classList;
      for (var i = 0, len = classList.length; i < len; i++) {
        const cls = classList[i];

        if (cls.indexOf('ag-theme-') === 0) {
          // even if dark theme is included, we compute the light theme name out of it
          return cls.replace('-dark', '');
        }
      }
    }
    return this.agGridHelper.getVendorLightThemeName();
  }

  public getVendorGridCurrentThemeName(): string {
    const container = this.getGridContainerElement();

    if (container && container.classList) {
      // we detect the ag theme class
      const classList = container.classList;
      for (var i = 0, len = classList.length; i < len; i++) {
        const cls = classList[i];

        if (cls.indexOf('ag-theme-') === 0) {
          return cls;
        }
      }
    }
    return this.getVendorGridLightThemeName();
  }

  public applyAdaptableTheme(theme: AdaptableTheme | string) {
    const themeName: string = typeof theme === 'string' ? theme : theme.Name;

    const themeNamesToRemove: string[] = [];
    const themesToRemove: AdaptableTheme[] = [];

    const allThemes = this.api.themeApi.getAllTheme().map(t => {
      // we mutate the theme later,
      // and since we don't want the mutation to end up in state
      // we better clone it here
      return { ...t };
    });
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

    if (
      this.adaptableOptions.userInterfaceOptions &&
      this.adaptableOptions.userInterfaceOptions.useCustomMacLikeScrollbars &&
      getScrollbarSize() > 0
    ) {
      el.classList.add('ab--custom-mac-like-scrollbars');
    } else {
      el.classList.remove('ab--custom-mac-like-scrollbars');
    }

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

    const getVendorLightThemeName = () => this.getVendorGridLightThemeName();
    const getVendorDarkThemeName = () => getVendorLightThemeName() + '-dark';

    if (newTheme && isSystemTheme) {
      if (themeName === LIGHT_THEME) {
        newTheme.VendorGridClassName = newTheme.VendorGridClassName || getVendorLightThemeName();
      }
      if (themeName === DARK_THEME) {
        newTheme.VendorGridClassName = newTheme.VendorGridClassName || getVendorDarkThemeName();
      }
    }

    if (!newTheme.VendorGridClassName) {
      // default the vendor grid to the light theme
      newTheme.VendorGridClassName = getVendorLightThemeName();
    }

    if (container != null) {
      if (themesToRemove.length) {
        themesToRemove.forEach(theme => {
          if (theme.VendorGridClassName) {
            container.classList.remove(theme.VendorGridClassName);
          }
        });
      }
      // also remove all vendor theme class names
      const vendorClassNamesToRemove: string[] = [];
      container.classList.forEach(x => {
        if (x && x.indexOf('ag-theme-') === 0) {
          vendorClassNamesToRemove.push(x);
        }
      });

      vendorClassNamesToRemove.forEach(x => container.classList.remove(x));

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

import "@adaptabletools/adaptable/themes/${themeName}.css"`);
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

    // Build the default group sort comparator - will get custom sort values (but not functions) in real time
    this.gridOptions.defaultGroupSortComparator = this.agGridHelper.runAdaptableNodeComparerFunction();

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

    if (this.gridOptions.treeData && this.gridOptions.treeData == true) {
      this.api.internalApi.setTreeModeOn();
    }

    if (this.isQuickFilterActive()) {
      this.api.internalApi.showQuickFilterBar();
    }

    const currentlayout: string = this.api.layoutApi.getCurrentLayoutName();

    this.agGridHelper.checkShouldClearExistingFiltersOrSearches();

    // if the current layout is the default or not set then autosize all columns if requested
    if (currentlayout === DEFAULT_LAYOUT || StringExtensions.IsNullOrEmpty(currentlayout)) {
      if (this.adaptableOptions!.layoutOptions!.autoSizeColumnsInDefaultLayout === true) {
        this.gridOptions.columnApi!.autoSizeAllColumns();
      }
    } else {
      // at the end so load the current layout (as its not default)
      this.api.layoutApi.setLayout(currentlayout);
    }

    // in case we have an existing quick search we need to make sure its applied
    this.api.quickSearchApi.applyQuickSearch(this.api.quickSearchApi.getQuickSearchValue());
  }

  // A couple of state management functions
  private getState(): AdaptableState {
    return this.AdaptableStore.TheStore.getState();
  }

  private getGridOptionsApi(): GridApi {
    if (!this.gridOptions.api) {
      LogAdaptableError(
        'There is a problem with your instance of ag-Grid - it has no gridApi object.  Please contact Support.'
      );
      return;
    }
    return this.gridOptions.api!;
  }

  getUserFunctionHandler<T extends UserFunction['type']>(
    type: T,
    name: string
  ): Extract<UserFunction, { type: T }>['handler'] | null {
    for (let uf of this.adaptableOptions.userFunctions) {
      if (uf.type === type && uf.name === name) {
        return uf.handler as any;
      }
    }
    return null;
  }

  canExportToExcel(): boolean {
    return this.agGridHelper.isModulePresent('excel-export');
  }

  exportToExcel(report: Report, columns: AdaptableColumn[], data: any[]) {
    const columnIds = columns.map(col => col.ColumnId);
    const columnDefs: ColDef[] = columns.map(col => ({
      field: col.ColumnId,
      headerName: col.FriendlyName,
    }));

    const rowData: any[] = data.map(row => _.zipObject(columnIds, row));

    const gridOptions: GridOptions = {
      columnDefs,
      rowData,
    };

    const grid = new Grid(document.createElement('div'), gridOptions);

    gridOptions.api.exportDataAsExcel({
      sheetName: 'Sheet 1',
      fileName: report.Name,
    });

    grid.destroy();
  }

  exportVisibleToClipboard(report: Report) {
    this.gridOptions.api.selectAllFiltered();
    this.gridOptions.api.copySelectedRowsToClipboard(true);
    this.gridOptions.api.deselectAll();
  }

  exportVisibleToExcel(report: Report) {
    this.gridOptions.api.exportDataAsExcel({
      sheetName: 'Sheet 1',
      fileName: report.Name,
    });
  }
  exportVisibleToCsv(report: Report) {
    this.gridOptions.api.exportDataAsCsv({
      fileName: report.Name,
    });
  }
}

export class AdaptableNoCodeWizard implements IAdaptableNoCodeWizard {
  private init: AdaptableNoCodeWizardInitFn;

  private adaptableOptions: AdaptableOptions;
  private extraOptions: AdaptableNoCodeWizardOptions;

  /**
   * @param adaptableOptions
   */
  constructor(adaptableOptions: AdaptableOptions, extraOptions: AdaptableNoCodeWizardOptions = {}) {
    const defaultInit: AdaptableNoCodeWizardInitFn = async ({ gridOptions, adaptableOptions }) => {
      adaptableOptions.vendorGrid = gridOptions;

      return await Adaptable.init(adaptableOptions);
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

    // this allows people to customize the wizard dimensions & styling
    // when it's visible
    container.classList.add('adaptable--in-wizard');

    ReactDOM.render(
      React.createElement(AdaptableWizardView, {
        adaptableOptions: this.adaptableOptions,
        ...this.extraOptions,
        onInit: (adaptableOptions: AdaptableOptions) => {
          container!.classList.remove('adaptable--in-wizard');
          ReactDOM.unmountComponentAtNode(container!);

          this.init({
            adaptableOptions,
            gridOptions: adaptableOptions.vendorGrid,
          });
        },
      }),
      container
    );
  }
}
