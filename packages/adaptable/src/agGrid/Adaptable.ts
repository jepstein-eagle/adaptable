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
  IAggFunc,
  ColumnState,
  GetMainMenuItems,
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
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../Utilities/Services/AuditLogService';
import { StyleService } from '../Utilities/Services/StyleService';
import { IStyleService } from '../Utilities/Services/Interface/IStyleService';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IFreeTextColumnService } from '../Utilities/Services/Interface/IFreeTextColumnService';
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
  CellValueType,
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
  AG_GRID_GROUPED_COLUMN,
} from '../Utilities/Constants/GeneralConstants';
import { agGridHelper } from './agGridHelper';
import { getAdaptableToolPanelAgGridComponent } from '../View/Components/ToolPanel/AdaptableToolPanel';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ScheduleService } from '../Utilities/Services/ScheduleService';
import { QuickSearchState } from '../PredefinedConfig/QuickSearchState';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { SearchService } from '../Utilities/Services/SearchService';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { Layout } from '../PredefinedConfig/LayoutState';
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
import { isEqual } from 'lodash';
import { CreateEmptyCalculatedColumn } from '../Utilities/ObjectFactory';
import { KeyValuePair } from '../Utilities/Interface/KeyValuePair';
import * as parser from '../parser/src';
import { ColumnFilter } from '../PredefinedConfig/FilterState';
import { FlashingCellStrategyagGrid } from './Strategy/FlashingCellsStrategyagGrid';

ModuleRegistry.registerModules(AllCommunityModules);

const GROUP_PATH_SEPARATOR = '/';

const waitForAgGrid = (isReady: () => boolean): Promise<any> => {
  const startTime = Date.now();

  const ready = isReady();
  if (ready) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const wait = (callback: () => void) => {
      const ready = isReady();

      if (Date.now() - startTime > 50000) {
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

type VendorColumnState = {
  colId: string;
  hide?: boolean;
  aggFunc?: string | IAggFunc | null;
  width?: number;
  pivotIndex?: number | null;
  pinned?: boolean | string | 'left' | 'right';
  rowGroupIndex?: number | null;
  flex?: number;
};
type VendorColumnStateMap = { [key: string]: VendorColumnState };

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

  public adaptableStore: IAdaptableStore;

  public adaptableOptions: AdaptableOptions;

  public vendorGridName: any;

  public DataService: IDataService;

  public ValidationService: IValidationService;

  public AuditLogService: IAuditLogService;

  public ChartService: IChartService;

  public StyleService: IStyleService;

  public LayoutService: ILayoutService;

  public StrategyService: IStrategyService;

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

  constructor() {
    // (global as any).adaptable = this;
  }

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
    this.ValidationService = new ValidationService(this);
    this.StyleService = new StyleService(this);
    this.ChartService = new ChartService(this);
    this.FreeTextColumnService = new FreeTextColumnService(this);
    this.ScheduleService = new ScheduleService(this);
    this.SearchService = new SearchService(this);
    this.ReportService = new ReportService(this);
    this.LayoutService = new LayoutService(this);
    this.StrategyService = new StrategyService(this);
    this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this);

    this.forPlugins(plugin => plugin.afterInitServices(this));

    // Set up strategies - we set up all the strategies suitable for the vendor grid
    // But users can make some hidden or readonly in their entitlements
    this.strategies = this.agGridHelper.setUpStrategies();

    this.forPlugins(plugin => plugin.afterInitStrategies(this, this.strategies));

    // also try to set it early, here, if the grid is initialized - needed for AdapTable tool panel
    if (this.gridOptions.api) {
      (this.gridOptions.api as any).__adaptable = this;
    }

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
      this.adaptableStore.Load.then(
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
    this.adaptableStore = new AdaptableStore(this);

    this.adaptableStore.onAny(
      (
        eventName: string,
        data: { action: Redux.Action; state: AdaptableState; newState: AdaptableState }
      ) => {
        this.forPlugins(plugin => plugin.onStoreEvent(eventName, data, this.adaptableStore));

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

  private initializeAgGrid(): Promise<boolean> {
    // set up whether we use the getRowNode method or loop when finding a rowNode (former is preferable)
    // can only do that here as the gridOptions not yet set up
    this.useRowNodeLookUp = this.agGridHelper.TrySetUpNodeIds();

    if (Array.isArray(this.gridOptions.columnDefs)) {
      // IMPORTANT - we need colId to be set in order for safeSetColDefs to work correctly
      const assignColId = (colDef: ColDef | ColGroupDef) => {
        if (!colDef) {
          return;
        }
        if ((colDef as ColDef).field && !(colDef as ColDef).colId) {
          (colDef as ColDef).colId = (colDef as ColDef).field;
        }
        if ((colDef as ColGroupDef).children) {
          (colDef as ColGroupDef).children.forEach(assignColId);
        } else {
          if (!(colDef as ColDef).colId) {
            LoggingHelper.LogAdaptableWarning(
              'A column is missing the colId - please check ',
              colDef,
              'Either pass a "field" property or a "colId" property.'
            );
          }
        }
      };
      this.gridOptions.columnDefs.forEach(assignColId);
    }

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
        this.gridOptions.components.AdaptableToolPanel = getAdaptableToolPanelAgGridComponent(this);

        if (this.gridOptions.api) {
          this.gridOptions.api.setSideBar(this.gridOptions.sideBar as SideBarDef);
        }
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

    if ((this.gridOptions as any).modules) {
      delete (this.gridOptions as any).modules;
    }

    grid = new Grid(vendorContainer, this.gridOptions, { modules });

    // add our adaptable object to the grid options api object
    // this is VERY useful for when we need to access Adaptable inside of agGrid only functions
    if (this.gridOptions.api) {
      (this.gridOptions.api as any).__adaptable = this;
    }

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
    this.updateColumnsIntoStore();
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
        suppressFilterButton: true,
      };
      vendorColDef.floatingFilterComponent = FloatingFilterWrapperFactory(this);
    }
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

  public updateColumnsIntoStore() {
    // if pivoting and we have 'special' columns as a result then do nothing ...
    // if (this.gridOptions.columnApi!.isPivotMode()) {
    //   if (ArrayExtensions.IsNotNullOrEmpty(this.gridOptions.columnApi!.getPivotColumns())) {
    //     return;
    //   }
    // }
    const allColumns: AdaptableColumn[] = [];
    const vendorCols: Column[] = this.gridOptions.columnApi!.getAllColumns();

    // TODO sort the visible columns by layout order

    vendorCols.forEach(vendorColumn => {
      const colId: string = vendorColumn.getColId();
      if (!this.api.columnApi.isRowGroupColumn(colId)) {
        allColumns.push(this.createAdaptableColumn(vendorColumn));
      }
    });

    this.api.internalApi.setColumns(allColumns);
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

    // we only need to call applyStylingToColumn once for each column
    // since if we call it multiple times, it's breaking aggrid column sizing
    // when the user drags columns around to reorder them

    if ((colDef as any).__styleApplied) {
      return;
    }

    (colDef as any).__styleApplied = true;

    if (colDef.filter && this.adaptableOptions!.filterOptions.useAdaptableFilterForm) {
      this.createFilterWrapper(vendorColumn);
    }

    if (colDef.floatingFilter && this.adaptableOptions!.filterOptions.useAdaptableQuickFilter) {
      this.createQuickFilterWrapper(vendorColumn);
    }

    const quickSearchClassName = this.getQuickSearchClassName();
    if (abColumn == null) {
      abColumn = this.api.columnApi.getColumnFromId(vendorColumn.getColId());
    }
    if (abColumn) {
      this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
    }
  }

  private safeSetColDefs(colDefs: (ColDef | ColGroupDef)[]) {
    this.gridOptions.api!.setColumnDefs(colDefs);

    this.updateColumnsIntoStore();

    const vendorCols: Column[] = this.gridOptions.columnApi!.getAllGridColumns();
    vendorCols.forEach((vendorColumn: Column) => {
      let abColumn: AdaptableColumn = this.api.columnApi.getColumnFromId(vendorColumn.getColId());
      this.applyStylingToColumn(vendorColumn, abColumn);
    });
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
    let result;
    if (gridApi) {
      result = gridApi.getValue(this.adaptableOptions!.primaryKey, rowNode);
    }
    if (result === null && rowNode && rowNode.data) {
      result = rowNode.data[this.adaptableOptions!.primaryKey] ?? null;
    }

    return result;
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
          displayValue: this.getValueFromRowNode(rowNode, activeCell.column.getColId()),
        };
      }
    }
  }

  private getSortedColumnStateForVisibleColumns(
    visibleColumnList: string[],
    columnState?: VendorColumnState[]
  ) {
    columnState = columnState || this.gridOptions.columnApi!.getColumnState();

    const NewVisibleColumnIdsMap = visibleColumnList.reduce((acc, colId, index) => {
      acc[colId] = index;
      return acc;
    }, {} as { [key: string]: number });

    const columnsStateIndexes: { [colId: string]: number } = columnState.reduce(
      (acc, colState, index) => {
        acc[colState.colId] = index;

        return acc;
      },
      {} as { [colId: string]: number }
    );

    const newVisibleColumnsMap = visibleColumnList.reduce((acc, colId, index) => {
      acc[colId] = index;
      return acc;
    }, {} as { [key: string]: number });

    return [...columnState]
      .sort((colState1: ColumnState, colState2: ColumnState) => {
        const colId1 = colState1.colId;
        const colId2 = colState2.colId;
        const originalIndex1 = columnsStateIndexes[colId1];
        const originalIndex2 = columnsStateIndexes[colId2];

        if (colId1 === AG_GRID_GROUPED_COLUMN) {
          return -1;
        }
        if (colId2 === AG_GRID_GROUPED_COLUMN) {
          return 1;
        }

        if (newVisibleColumnsMap[colId1] != null && newVisibleColumnsMap[colId2] == null) {
          return -1;
        }
        if (newVisibleColumnsMap[colId1] == null && newVisibleColumnsMap[colId2] != null) {
          return 1;
        }
        if (newVisibleColumnsMap[colId1] == null && newVisibleColumnsMap[colId2] == null) {
          return originalIndex1 - originalIndex2;
        }

        return newVisibleColumnsMap[colState1.colId] - newVisibleColumnsMap[colState2.colId];
      })
      .map(colDef => ({ ...colDef, hide: NewVisibleColumnIdsMap[colDef.colId] == null }));
  }

  public setColumnOrder(VisibleColumnList: string[]): void {
    const newColumnState = this.getSortedColumnStateForVisibleColumns(VisibleColumnList);
    this.gridOptions.columnApi!.setColumnState(newColumnState);
    this.updateColumnsIntoStore();
  }

  private persistLayout(layout: Layout) {
    if (this.adaptableOptions.layoutOptions.autoSaveLayouts) {
      this.api.layoutApi.saveLayout(layout);
    } else {
      this.api.internalApi.updateCurrentDraftLayout(layout);
    }
  }

  public setLayout(layout?: Layout): void {
    if (!layout) {
      layout = this.api.layoutApi.getCurrentLayout();
    }
    const layoutColumnsMap = layout.Columns.reduce((acc, colId: string) => {
      acc[colId] = true;
      return acc;
    }, {} as { [colId: string]: boolean });
    const columnsState = this.gridOptions.columnApi.getColumnState();

    const columnsStateIndexes: { [colId: string]: number } = {};
    const columnsStateMap = columnsState.reduce((acc, colState, index) => {
      columnsStateIndexes[colState.colId] = index;
      acc[colState.colId] = colState;

      return acc;
    }, {} as VendorColumnStateMap);
    const groupedColumnsIndexesMap = (layout.RowGroupedColumns || []).reduce(
      (acc, colId: string, index) => {
        acc[colId] = index;

        return acc;
      },
      {} as { [key: string]: number }
    );

    let pivotedColumnsIndexesMap: { [key: string]: number } = {};

    const aggregationFunctionsColumnsMap = layout.AggregationColumns || {};

    const columnsInPivot = [
      ...(layout.PivotColumns || []),
      ...Object.keys(layout.AggregationColumns || {}),
    ];
    const columnsToShow = !layout.EnablePivot ? layout.Columns : columnsInPivot || [];

    if (columnsInPivot.length && layout.RowGroupedColumns) {
      columnsInPivot.push(...layout.RowGroupedColumns);
    }

    let isChanged = false;

    const newColState = this.getSortedColumnStateForVisibleColumns(columnsToShow, columnsState)
      .map((colDef: ColDef) => {
        const { colId } = colDef;
        const oldColState: VendorColumnState = columnsStateMap[colId];

        const hide = !layoutColumnsMap[colId];

        const newColState: VendorColumnState = { ...oldColState, hide };

        if (layout.ColumnWidthMap && layout.ColumnWidthMap[colId] != null) {
          newColState.width = layout.ColumnWidthMap[colId];
        }

        // if (groupedColumnsIndexesMap[colId] != null) {
        newColState.rowGroupIndex =
          groupedColumnsIndexesMap[colId] != null ? groupedColumnsIndexesMap[colId] : null;
        // }
        const pinned = layout.PinnedColumnsMap ? layout.PinnedColumnsMap[colId] : false;
        if (pinned) {
          newColState.pinned = pinned;
        }

        newColState.pivotIndex = null;
        if (pivotedColumnsIndexesMap[colId] != null) {
          newColState.pivotIndex = pivotedColumnsIndexesMap[colId];
        }
        newColState.aggFunc = null;
        if (aggregationFunctionsColumnsMap[colId] != null) {
          newColState.aggFunc =
            aggregationFunctionsColumnsMap[colId] === true
              ? colDef.aggFunc
              : (aggregationFunctionsColumnsMap[colId] as string);
        }

        isChanged = isChanged || !isEqual(newColState, oldColState);

        return newColState;
      })
      .filter(x => !!x);

    if (!isChanged) {
      // order changed
      const toString = (c: any) =>
        `${c.colId}-${c.rowGroupIndex}-${c.pivotIndex}-${c.aggFunc}-${c.pinned}-${c.width}-${c.hide}`;

      const oldColStateString = columnsState.map(toString).join(',');
      const newColStateString = newColState.map(toString).join(',');

      isChanged = newColStateString != oldColStateString;
    }

    const oldSortModel = this.gridOptions.api.getSortModel();

    const sortModel = (layout.ColumnSorts ?? [])
      .map(customSort => {
        const colId = customSort.Column;
        if (!layoutColumnsMap[colId]) {
          return null;
        }
        return {
          colId,
          sort: customSort.SortOrder === 'Asc' ? 'asc' : 'desc',
        };
      })
      .filter(x => !!x);

    const equalSortModel = isEqual(oldSortModel, sortModel);

    const pivoted = !!layout.EnablePivot;
    const shouldUpdatePivoted = this.gridOptions.columnApi.isPivotMode() !== pivoted;

    isChanged = isChanged || !equalSortModel || shouldUpdatePivoted;

    if (
      ArrayExtensions.IsNotNullOrEmpty(layout.ExpandedRowGroupKeys) &&
      this.adaptableOptions.layoutOptions.includeOpenedRowGroups
    ) {
      this.expandRowGroupsForValues(layout.ExpandedRowGroupKeys);
    }

    if (isChanged) {
      this.gridOptions.columnApi.setColumnState(newColState);

      this.gridOptions.api.setSortModel(sortModel);

      if (shouldUpdatePivoted) {
        this.gridOptions.columnApi.setPivotMode(pivoted);
      }

      this.gridOptions.columnApi.setPivotColumns(layout.PivotColumns || []);

      this.updateColumnsIntoStore();
    } else {
      // console.warn('NOTHING CHANGED');
    }
  }

  /**
   * This is the opposite of saveLayout
   *
   */
  private updateLayoutFromGrid() {
    const currentLayout = this.api.layoutApi.getCurrentLayout();
    const layout = { ...currentLayout };

    const columnOrder: string[] = [];
    const columnFlexes: { [key: string]: number } = {};
    const pinnedColumns: { [colId: string]: 'right' | 'left' } = {};

    const sortModel: {
      colId: string;
      sort: 'asc' | 'desc' | string;
    }[] = this.gridOptions.api.getSortModel();

    const columnSorts: ColumnSort[] = sortModel.map(({ colId, sort }) => {
      return { Column: colId, SortOrder: sort === 'asc' ? 'Asc' : 'Desc' };
    });

    const columnState = this.gridOptions.columnApi.getColumnState();

    let groupedColumns = [...new Array(columnState.length)];
    let pivotedColumns = [...new Array(columnState.length)];

    const pivotColumns: string[] = [];
    const aggregatedColumns: Record<string, string> = {};

    const columnWidths = columnState.reduce((acc, colDef) => {
      const { colId } = colDef;

      if (colDef.width != null) {
        acc[colId] = colDef.width;
      }
      if (colDef.flex != null) {
        columnFlexes[colId] = colDef.flex;
      }
      if (colDef.pinned === 'left') {
        pinnedColumns[colId] = 'left';
      }
      if (colDef.pinned === 'right') {
        pinnedColumns[colId] = 'right';
      }
      if (!colDef.hide) {
        columnOrder.push(colId);
      }

      if (colDef.rowGroupIndex != null) {
        groupedColumns[colDef.rowGroupIndex] = colId;
      }
      if (colDef.pivotIndex != null) {
        pivotedColumns[colDef.pivotIndex] = colId;
      }
      if (colDef.aggFunc && typeof colDef.aggFunc === 'string') {
        aggregatedColumns[colId] = colDef.aggFunc;
      }

      return acc;
    }, {} as { [key: string]: number });

    this.gridOptions.columnApi.getPivotColumns().forEach(col => {
      pivotColumns.push(col.getColId());
    });

    groupedColumns = groupedColumns.filter(x => !!x);
    pivotedColumns = pivotedColumns.filter(x => !!x);

    layout.ColumnWidthMap = columnWidths;
    layout.ColumnFlexMap = columnFlexes;
    layout.PinnedColumnsMap = pinnedColumns;

    layout.Columns = columnOrder;
    layout.ColumnSorts = columnSorts;
    layout.RowGroupedColumns = groupedColumns;
    if (Object.keys(aggregatedColumns).length) {
      layout.AggregationColumns = aggregatedColumns;
    }

    layout.EnablePivot = this.gridOptions.columnApi.isPivotMode();
    layout.PivotColumns = pivotColumns;

    if (this.adaptableOptions.layoutOptions.includeOpenedRowGroups) {
      layout.ExpandedRowGroupKeys = this.getExpandRowGroupsKeys();
    }
    this.persistLayout(layout);
  }

  public saveGridLayout() {
    this.updateLayoutFromGrid();
  }

  // This method returns selected cells ONLY (if selection mode is cells or multiple cells).
  // If the selection mode is row it will returns nothing - use the setSelectedRows() method
  public setSelectedCells(): void {
    if (!this.isSelectable()) {
      return;
    }
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
              const selectedColumn: AdaptableColumn = this.api.columnApi.getColumnFromId(colId);
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
                    displayValue: this.getValueFromRowNode(rowNode, colId),
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
    if (!this.isSelectable()) {
      return;
    }
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
      | 'Unknown' = this.api.columnApi.getColumnDataTypeFromColumnId(dataChangedInfo.ColumnId);
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
    distinctCriteria: CellValueType
  ): (columnId: string) => any {
    if (distinctCriteria == CellValueType.RawValue) {
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
    distinctCriteria: CellValueType
  ): (columnId: string) => any {
    if (distinctCriteria == CellValueType.RawValue) {
      let testreturnvalue: any = (columnId: string) =>
        this.gridOptions.api!.getValue(columnId, rowwNode);
      return testreturnvalue;
    }
    return (columnId: string) => this.getValueFromRowNode(rowwNode, columnId);
  }

  public getColumnValueDisplayValuePairDistinctList(
    columnId: string,
    visibleRowsOnly: boolean
  ): any[] {
    const returnValues: any[] = [];

    // this function does NOT look up for server values but actually it should...
    // that is currently commented out in the column api function (previously in filter form)

    // check if there are permitted column values for that column
    // NB.  this currently contains a small bug as we dont check for visibility so if using permitted values then ALL are returned :(
    // but that is only something used by a chart so not a big problem
    const permittedValuesForColumn: any[] = this.api.userInterfaceApi.getPermittedValuesForColumn(
      columnId
    );
    if (ArrayExtensions.IsNotNullOrEmpty(permittedValuesForColumn)) {
      permittedValuesForColumn.forEach(pv => {
        returnValues.push(pv);
      });
    }

    if (visibleRowsOnly) {
      this.gridOptions.api!.forEachNodeAfterFilter((rowNode: RowNode) => {
        returnValues.push(this.addDistinctColumnValue(rowNode, columnId));
      });
    } else {
      this.gridOptions.api!.forEachNode(rowNode => {
        returnValues.push(this.addDistinctColumnValue(rowNode, columnId));
      });
    }
    return _.uniq(returnValues).slice(
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
    const useRawValue: boolean = this.shouldUseRawValueForColumn(columnId);

    const eachFn = (rowNode: RowNode, columnId: string, useRawValue: boolean) => {
      if (rowNode && !this.isGroupRowNode(rowNode)) {
        const rawValue = this.gridOptions.api!.getValue(columnId, rowNode);
        const displayValue = useRawValue
          ? Helper.StringifyValue(rawValue)
          : this.getValueFromRowNode(rowNode, columnId);

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

  private addDistinctColumnValue(rowNode: RowNode, columnId: string): string {
    // we do not return the values of the aggregates when in grouping mode
    // otherwise they would appear in the filter dropdown etc....
    if (rowNode && !this.isGroupRowNode(rowNode)) {
      return this.getValueFromRowNode(rowNode, columnId);
    }
  }

  private shouldUseRawValueForColumn(columnId: string): boolean {
    // we need to return false if the column has a cell rendeerer i think...
    const colDef: ColDef = this.gridOptions.api!.getColumnDef(columnId);
    if (colDef) {
      if (colDef.cellRenderer != null) {
        return true;
      }
    }
    if (this.api.columnApi.isSpecialRenderedColumn(columnId)) {
      return true;
    }
    return false;
  }

  public getDisplayValue(id: any, columnId: string): string {
    let returnValue: string;

    if (this.useRowNodeLookUp) {
      const rowNode: RowNode = this.gridOptions.api!.getRowNode(id);
      returnValue = this.getValueFromRowNode(rowNode, columnId);
    } else {
      let foundRow: boolean = false;
      this.gridOptions.api!.getModel().forEachNode(rowNode => {
        if (!foundRow && id == this.getPrimaryKeyValueFromRowNode(rowNode)) {
          returnValue = this.getValueFromRowNode(rowNode, columnId);
          foundRow = true;
        }
      });
    }
    return returnValue;
  }

  // Always returns a display value unless told not to...
  public getValueFromRowNode(row: RowNode, columnId: string): string {
    if (row == null) {
      return '';
    }
    const rawValue = this.getRawValueFromRowNode(row, columnId);
    if (this.shouldUseRawValueForColumn(columnId)) {
      return Helper.StringifyValue(rawValue);
    }
    return this.getDisplayValueFromRawValue(columnId, rawValue);
  }

  public getDisplayValueFromRawValue(columnId: string, rawValue: any): any {
    const isRenderedColumn = this.api.columnApi.isSpecialRenderedColumn(columnId);
    if (isRenderedColumn) {
      return this.agGridHelper.getCleanValue(rawValue);
    }

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
          return this.agGridHelper.getRenderedValue(colDef, formattedValue);
        }
        return formattedValue || '';
      }
      if (colDef.cellRenderer) {
        return this.agGridHelper.getRenderedValue(colDef, rawValue);
      }
    }
    return this.agGridHelper.getCleanValue(rawValue);
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

    let colDefs: ColDef[] = this.getColumnDefs();

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
    const columnName = calculatedColumn.FriendlyName || calculatedColumn.ColumnId;
    const colDef = this.getColumnDefs().find(colDef => colDef.colId === calculatedColumn.ColumnId);

    const col = this.gridOptions.columnApi.getColumn(colDef.colId);

    const cleanedExpression: string = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(
      calculatedColumn.ColumnExpression,
      this.api.columnApi.getColumns()
    );

    if (calculatedColumn.CalculatedColumnSettings) {
      colDef.width = calculatedColumn.CalculatedColumnSettings.Width;
      colDef.enableValue = calculatedColumn.CalculatedColumnSettings.Aggregatable;
      colDef.filter = calculatedColumn.CalculatedColumnSettings.Filterable;
      colDef.resizable = calculatedColumn.CalculatedColumnSettings.Resizable;
      colDef.enableRowGroup = calculatedColumn.CalculatedColumnSettings.Groupable;
      colDef.sortable = calculatedColumn.CalculatedColumnSettings.Sortable;
      colDef.enablePivot = calculatedColumn.CalculatedColumnSettings.Pivotable;
    }

    colDef.headerName = columnName;

    colDef.valueGetter = (params: ValueGetterParams) =>
      this.CalculatedColumnExpressionService.ComputeExpressionValue(cleanedExpression, params.node);
    colDef.type = this.agGridHelper.getAgGridDataType(
      calculatedColumn.CalculatedColumnSettings.DataType as DataType
    );

    col.setColDef(colDef, null);

    this.updateColumnsIntoStore();
  }

  public tryRemoveCalculatedColumnFromGrid(calculatedColumnId: string): boolean {
    if (this.isSpecialColumnReferenced(calculatedColumnId)) {
      return false;
    }

    let foundColDef: boolean = false;
    const newColDefs = this.mapColumnDefs(
      (colDef: ColDef) => {
        if (colDef.headerName === calculatedColumnId) {
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
      const index = columnList.indexOf(calculatedColumnId);
      if (index > -1) {
        columnList.splice(index, 1);
      }
    }
    return true;
  }

  public addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn) {
    this.addCalculatedColumnsToGrid([calculatedColumn]);
  }
  public addCalculatedColumnsToGrid(calculatedColumns: CalculatedColumn[], colDefs?: ColDef[]) {
    colDefs = colDefs || this.getColumnDefs();

    const cols: AdaptableColumn[] = this.api.columnApi.getColumns();
    const newColDefs: ColDef[] = calculatedColumns.map(calculatedColumn => {
      const cleanedExpression: string = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(
        calculatedColumn.ColumnExpression,
        cols
      );

      if (!calculatedColumn.CalculatedColumnSettings) {
        calculatedColumn.CalculatedColumnSettings = CreateEmptyCalculatedColumn().CalculatedColumnSettings;
      }
      const newColDef: ColDef = {
        headerName: calculatedColumn.FriendlyName
          ? calculatedColumn.FriendlyName
          : calculatedColumn.ColumnId,
        colId: calculatedColumn.ColumnId,
        hide: true,
        editable: false,
        width: calculatedColumn.CalculatedColumnSettings.Width,
        enableValue: calculatedColumn.CalculatedColumnSettings.Aggregatable,
        filter: calculatedColumn.CalculatedColumnSettings.Filterable,
        floatingFilter: calculatedColumn.CalculatedColumnSettings.Filterable,
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
      return newColDef;
    });
    colDefs.push(...newColDefs);
    this.safeSetColDefs(colDefs);
  }

  public getColumnDefs = (): ColDef[] => {
    return this.gridOptions.columnApi.getAllColumns().map(c => c.getColDef());
  };

  public getColumnDefsWithCorrectVisibility = (): ColDef[] => {
    const visibleColIds = this.api.layoutApi.getCurrentVisibleColumnIdsMap();

    return this.gridOptions.columnApi.getAllColumns().map(c => {
      const colDef = c.getColDef();
      const colId = c.getColId();
      colDef.colId = colId;
      colDef.hide = !visibleColIds[colId];

      return colDef;
    });
  };

  public isSpecialColumnReferenced(columnId: string): boolean {
    let referencedText: string | undefined = '';
    this.strategies.forEach(s => {
      const strategyReference = s.getSpecialColumnReferences(columnId);
      if (StringExtensions.IsNotNullOrEmpty(strategyReference)) {
        referencedText += ' ' + strategyReference;
      }
    });
    if (StringExtensions.IsNotNullOrEmpty(referencedText)) {
      alert('Cannot delete the column because it is referenced in' + referencedText);
      return true;
    }
    return false;
  }

  public addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn, colDefs?: ColDef[]) {
    this.addFreeTextColumnsToGrid([freeTextColumn], colDefs);
  }
  public addFreeTextColumnsToGrid(freeTextColumns: FreeTextColumn[], colDefs?: ColDef[]) {
    colDefs = colDefs || this.getColumnDefs();

    const newColDefs: ColDef[] = freeTextColumns.map(freeTextColumn => {
      return {
        headerName: freeTextColumn.FriendlyName || freeTextColumn.ColumnId,
        colId: freeTextColumn.ColumnId,
        editable: true,
        hide: true,
        filter: true,
        sortable: true,
        resizable: true,
        enableRowGroup: true,
        cellEditor:
          freeTextColumn.TextEditor && freeTextColumn.TextEditor == 'Large'
            ? 'agLargeTextCellEditor'
            : 'agTextCellEditor',
        type: 'abColDefString',
        valueSetter: (params: ValueSetterParams) => {
          return (params.data[freeTextColumn.ColumnId] = params.newValue);
        },
        valueGetter: (params: ValueGetterParams) =>
          this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, params.node),
      };
    });

    colDefs.push(...newColDefs);

    this.safeSetColDefs(colDefs);
  }

  public tryRemoveFreeTextColumnFromGrid(freeTextColumnId: string): boolean {
    if (this.isSpecialColumnReferenced(freeTextColumnId)) {
      return false;
    }

    let foundColDef: boolean = false;
    const newColDefs = this.mapColumnDefs(
      (colDef: ColDef) => {
        if (colDef.colId === freeTextColumnId) {
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
    return true;
  }

  public editFreeTextColumnInGrid(freeTextColumn: FreeTextColumn): void {
    const columnName = freeTextColumn.FriendlyName || freeTextColumn.ColumnId;
    const colDef = this.getColumnDefs().find(colDef => colDef.colId === freeTextColumn.ColumnId);

    if (colDef && colDef.headerName !== columnName) {
      const col = this.gridOptions.columnApi.getColumn(colDef.colId);

      col.setColDef({ ...colDef, headerName: columnName }, null);
    }
    this.updateColumnsIntoStore();
  }

  public addActionColumnsToGrid(actionColumns: ActionColumn[]) {
    const colDefs = this.getColumnDefs();

    const newColDefs: ColDef[] = actionColumns.map(actionColumn => {
      const newColDef: ColDef = {
        headerName: actionColumn.FriendlyName ? actionColumn.FriendlyName : actionColumn.ColumnId,
        colId: actionColumn.ColumnId,
        editable: false,
        hide: false,
        filter: false,
        sortable: false,
        resizable: true,
        cellRenderer: ActionColumnRenderer,
        type: 'abColDefActionColumn',
      };
      return newColDef;
    });

    colDefs.push(...newColDefs);
    this.safeSetColDefs(colDefs);
  }

  private addSpecialColumnsToState(
    params: {
      uuid: TypeUuid;
      columnId: string;
      columnName?: string;
      dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown';
    }[]
  ): void {
    params.forEach(({ uuid, columnId, dataType, columnName }) => {
      columnName = columnName || columnId;
      const vendorColumn: Column | undefined = this.gridOptions
        .columnApi!.getAllColumns()
        .find(vc => vc.getColId() == columnId);

      if (vendorColumn) {
        const vendorColDef: ColDef = vendorColumn.getColDef();
        const specialColumn: AdaptableColumn = {
          Uuid: uuid,
          ColumnId: columnId,
          FriendlyName: columnName,
          DataType: dataType,
          Visible: false, // get from vendor col def?
          ReadOnly: this.agGridHelper.isColumnReadonly(vendorColDef),
          Sortable: this.agGridHelper.isColumnSortable(vendorColDef),
          Filterable: this.agGridHelper.isColumnFilterable(vendorColDef),
          Groupable: this.agGridHelper.isColumnGroupable(vendorColDef),
          Pivotable: this.agGridHelper.isColumnPivotable(vendorColDef),
          Aggregatable: this.agGridHelper.isColumnAggregetable(vendorColDef),
          Moveable: true,
          Hideable: true,
          IsSparkline: dataType == DataType.NumberArray,
          IsGrouped: false,
          IsFixed: false,
          IsSpecialColumn: true,
          IsExcludedFromQuickSearch: false,
        };

        this.api.internalApi.addAdaptableColumn(specialColumn);

        this.applyStylingToColumn(vendorColumn, specialColumn);
      }
    });
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
        Columns: this.api.columnApi.getColumns().map(col => {
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
        Columns: this.api.columnApi.getColumns().map(col => {
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
        this.debouncedSetColumnIntoStore(); // refilter the grid if required
        this.debouncedFilterGrid();
      }
    });
    // dealing with scenario where the data is provided to adaptable after grid has been setup
    this.gridOptions.api!.addEventListener(Events.EVENT_FIRST_DATA_RENDERED, () => {
      this.setLayout();
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
      // Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
      Events.EVENT_COLUMN_PINNED,
      Events.EVENT_COLUMN_PIVOT_CHANGED,
      Events.EVENT_COLUMN_PIVOT_MODE_CHANGED,
      Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
      Events.EVENT_SORT_CHANGED,
      Events.EVENT_COLUMN_ROW_GROUP_CHANGED,
    ];
    this.gridOptions.api!.addGlobalListener((type: string) => {
      if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
        // if (type === Events.EVENT_DISPLAYED_COLUMNS_CHANGED) {
        //   this.setLayout();
        // }
        this.debouncedSaveGridLayout();
      }
    });

    // doing this seperately as wont always be wanted
    this.gridOptions.api!.addEventListener(Events.EVENT_ROW_GROUP_OPENED, (params: any) => {
      if (this.adaptableOptions.layoutOptions.includeOpenedRowGroups) {
        this.debouncedSaveGridLayout();
      }
    });

    // this.gridOptions.api!.addEventListener(Events.EVENT_GRID_READY, () => {
    //   console.warn('GRID READY');
    // });

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
          this.debouncedSaveGridLayout();
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
          let abColumn: AdaptableColumn = this.api.columnApi.getColumnFromId(column.colId);
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
    // not sure if we need any of this tbh - needs looking at
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
          //    const colId: string | undefined = params.colDef.field;
          /*
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

            // see if we need to refresh any Special Rendered Columns
            if (this.api.columnApi.isSpecialRenderedColumn(colId)) {
              ArrayExtensions.AddItem(refreshColumnList, colId);
            }
          }
*/
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
      const columnFilters: ColumnFilter[] = this.api.filterApi.getAllColumnFilter();
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
      const columns = this.api.columnApi.getColumns();

      // first we assess AdvancedSearch (if its running locally)
      if (this.adaptableOptions!.searchOptions!.serverSearchOption == 'None') {
        const currentAdvancedSearch = this.api.advancedSearchApi.getCurrentAdvancedSearch();

        if (currentAdvancedSearch) {
          // See if our rowNode passes the Expression - using Expression Helper; if not then return false
          if (
            !parser.evaluate(currentAdvancedSearch, {
              data: node.data,
            })
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
        const columnFilters: ColumnFilter[] = this.api.filterApi.getAllColumnFilter();
        if (columnFilters.length > 0) {
          for (const columnFilter of columnFilters) {
            if (!this.api.filterApi.evaluateColumnFilter(columnFilter, node)) {
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
    const originalgetMainMenuItems: GetMainMenuItems = this.gridOptions.getMainMenuItems;
    this.gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
      // couldnt find a way to listen for menu close. There is a Menu Item Select, but you can also close menu from filter and clicking outside menu....
      const colId: string = params.column.getColId();
      let colMenuItems: (string | MenuItemDef)[];
      // if there was an initial implementation we init the list of menu items with this one; otherwise we take the default items
      if (originalgetMainMenuItems) {
        const originalMenuItems = originalgetMainMenuItems(params);
        colMenuItems = originalMenuItems.slice(0);
      } else {
        colMenuItems = params.defaultItems.slice(0);
      }
      colMenuItems.push('separator');

      const adaptableColumn: AdaptableColumn = this.api.columnApi.getColumnFromId(colId);
      if (adaptableColumn != null) {
        let menuInfo: MenuInfo = this.createMenuInfoObject(adaptableColumn);
        // First get all the Strategy based Adaptable Menu Items
        const adaptableMenuItems: AdaptableMenuItem[] = this.getAdaptableMenuItemsColumnHeader(
          adaptableColumn,
          menuInfo
        );

        // And then convert them into Menu Item Defs
        adaptableMenuItems.forEach((adaptableMenuItem: AdaptableMenuItem) => {
          let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(
            adaptableMenuItem
          );
          colMenuItems.push(menuItem);
        });

        // Next get all the User Menu Items
        let userColumnMenuItems: KeyValuePair[] = this.getUserMenuItemsColumnHeader(menuInfo);
        if (ArrayExtensions.IsNotNullOrEmpty(userColumnMenuItems)) {
          userColumnMenuItems.forEach((kvp: KeyValuePair) => {
            // And then convert them into Menu Item Defs
            let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromUserMenu(
              kvp.Key,
              kvp.Value,
              menuInfo
            );
            colMenuItems.push(menuItem);
          });
        }
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
        const adaptableColumn: AdaptableColumn = this.api.columnApi.getColumnFromId(
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
                let menuItem: MenuItemDef = this.agGridHelper.createAgGridMenuDefFromUserMenu(
                  label,
                  userMenuItem,
                  menuInfo
                );
                contextMenuItems.push(menuItem);
              });
          }
        }
      }
      return contextMenuItems;
    };
  }

  private createMenuInfoObject(adaptableColumn: AdaptableColumn): MenuInfo {
    return {
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
  }

  public buildStandaloneColumnHeader(adaptableColumn: AdaptableColumn): AdaptableMenuItem[] {
    let menuInfo: MenuInfo = this.createMenuInfoObject(adaptableColumn);
    let returnMenuItems: AdaptableMenuItem[] = [];
    returnMenuItems.push(...this.getAdaptableMenuItemsColumnHeader(adaptableColumn, menuInfo));

    let userColumnMenuItems: KeyValuePair[] = this.getUserMenuItemsColumnHeader(menuInfo);
    if (ArrayExtensions.IsNotNullOrEmpty(userColumnMenuItems)) {
      userColumnMenuItems.forEach((kvp: KeyValuePair) => {
        let adaptableMenuItem: AdaptableMenuItem = this.agGridHelper.createAdaptableMenuItemFromUserMenu(
          kvp.Key,
          kvp.Value,
          menuInfo
        );
        returnMenuItems.push(adaptableMenuItem);
      });
    }
    return returnMenuItems;
  }

  // method to get all the Adaptable Menu Items - together with running the function where user can choose whether or not to display
  private getAdaptableMenuItemsColumnHeader(
    adaptableColumn: AdaptableColumn,
    menuInfo: MenuInfo
  ): AdaptableMenuItem[] {
    const adaptableMenuItems: AdaptableMenuItem[] = [];
    let showAdaptableColumnMenu = this.adaptableOptions.userInterfaceOptions!
      .showAdaptableColumnMenu;

    let runCheck: boolean = showAdaptableColumnMenu == null || showAdaptableColumnMenu !== false;
    if (adaptableColumn != null) {
      this.strategies.forEach(s => {
        let menuItems: AdaptableMenuItem[] | undefined = s.addColumnMenuItems(adaptableColumn);
        if (menuItems) {
          if (runCheck) {
            menuItems.forEach((adaptableMenuItem: AdaptableMenuItem) => {
              if (adaptableMenuItem) {
                let addColumnMenuItem: boolean = true;
                if (
                  showAdaptableColumnMenu != null &&
                  typeof showAdaptableColumnMenu === 'function'
                ) {
                  addColumnMenuItem = showAdaptableColumnMenu(adaptableMenuItem, menuInfo);
                }
                if (addColumnMenuItem) {
                  adaptableMenuItems.push(adaptableMenuItem);
                }
              }
            });
          } else {
            adaptableMenuItems.push(...menuItems);
          }
        }
      });
    }
    return adaptableMenuItems;
  }

  private getUserMenuItemsColumnHeader(menuInfo: MenuInfo): KeyValuePair[] {
    let returnValues: KeyValuePair[] = [];
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
          let kvp: KeyValuePair = {
            Key: label,
            Value: userMenuItem,
          };
          returnValues.push(kvp);
        });
    }
    return returnValues;
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

    const renderedColumn = this.api.columnApi.getColumnFromId(sparklineColumn.ColumnId);

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
    const renderedColumn = this.api.columnApi.getColumnFromId(sparklineColumn.ColumnId);
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
    const renderedColumn = this.api.columnApi.getColumnFromId(pcr.ColumnId);
    if (renderedColumn) {
      const cellRendererFunc: ICellRendererFunc = this.agGridHelper.createPercentBarCellRendererFunc(
        pcr
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
    const renderedColumn = this.api.columnApi.getColumnFromId(pcr.ColumnId);
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

  public isSharedQueryReferenced(sharedQueryId: string): boolean {
    let referencedText: string | undefined = '';
    this.strategies.forEach(s => {
      const strategyReference = s.getSharedQueryReferences(sharedQueryId);
      if (StringExtensions.IsNotNullOrEmpty(strategyReference)) {
        referencedText += ' ' + strategyReference;
      }
    });
    if (StringExtensions.IsNotNullOrEmpty(referencedText)) {
      alert('Cannot delete the Shared Query because it is referenced in' + referencedText);
      return true;
    }
    return false;
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
        // if we have gone through AdaptableApi we will be fine but not if they update ag-Grid directly
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
        if (this.api.columnApi.isRowGroupColumn(sm.colId)) {
          this.agGridHelper.createGroupedColumnCustomSort();
        }
        const columnSort: ColumnSort = {
          Column: sm.colId,
          SortOrder: sm.sort == 'asc' ? SortOrder.Asc : SortOrder.Desc,
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
      const expandedKeys = columnValues.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      this.gridOptions.api.forEachNode((node: RowNode) => {
        if (node.group && !node.expanded) {
          const nodePath = [];
          let current = node;
          while (current) {
            nodePath.push(current.key);
            current = current.parent;
          }
          const nodeKey = nodePath
            .filter(x => !!x)
            .reverse()
            .join(GROUP_PATH_SEPARATOR);
          if (expandedKeys[nodeKey]) {
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
          let current = node;
          const path = [];
          while (current) {
            path.push(current.key);
            current = current.parent;
          }
          returnValues.push(
            path
              .filter(x => !!x)
              .reverse()
              .join(GROUP_PATH_SEPARATOR)
          );
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

  public selectAll(): void {
    this.gridOptions.api!.selectAll();
  }

  public hideColumn(columnId: string) {
    let vendorCol = this.gridOptions.columnApi!.getColumn(columnId);
    if (vendorCol) {
      this.gridOptions.columnApi.setColumnVisible(columnId, false);
      this.updateColumnsIntoStore();
    }
  }

  public showColumn(columnId: string) {
    let vendorCol = this.gridOptions.columnApi!.getColumn(columnId);
    if (vendorCol) {
      this.gridOptions.columnApi.setColumnVisible(columnId, true);
      this.updateColumnsIntoStore();
    }
  }

  public setColumnSort(columnSorts: ColumnSort[]): void {
    // get the sort model
    const sortModel: any[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(columnSorts)) {
      columnSorts.forEach(gs => {
        const sortDescription: string = gs.SortOrder == SortOrder.Asc ? 'asc' : 'desc';
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
        const column: AdaptableColumn = this.api.columnApi.getColumnFromId(columnId);
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
              this.adaptableStore.TheStore.dispatch(
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
      return this.api.columnApi.getColumnFromId(groupedColumn.getColId());
    }
  }

  private checkColumnsDataTypeSet(): any {
    // check that we have no unknown columns - if we do then ok
    const firstCol = this.api.columnApi.getColumns()[0];
    if (firstCol && firstCol.DataType == DataType.Unknown) {
      this.updateColumnsIntoStore();
    }
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

  private setColumnState(columnApi: any, columnState: any, columnEventType: string) {
    columnApi.setColumnState(columnState, columnEventType);
  }

  // do we want to do this each time or check once at startup and then set a flag?
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
    for (col of defs) {
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

    this.embedColumnMenu = this.agGridHelper.isModulePresent('menu');

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
                  false
                ),
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
      this.api.gridApi.showQuickFilterBar();
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
    return this.adaptableStore.TheStore.getState();
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

  exportToExcel(columnNames: string[], data: any[], fileName: string) {
    const columnDefs: ColDef[] = columnNames.map(columnName => ({
      field: columnName,
      headerName: columnName,
    }));

    const rowData: any[] = data.map(row => _.zipObject(columnNames, row));

    const gridOptions: GridOptions = {
      columnDefs,
      rowData,
    };

    const grid = new Grid(document.createElement('div'), gridOptions);

    gridOptions.api.exportDataAsExcel({
      sheetName: 'Sheet 1',
      fileName: fileName,
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
