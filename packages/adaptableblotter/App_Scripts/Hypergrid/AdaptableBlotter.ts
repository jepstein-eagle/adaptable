import { CalculatedColumnStrategy } from '../Strategy/CalculatedColumnStrategy';

import * as Emitter from 'emittery';

import * as Redux from 'redux';
import * as ReactDOM from 'react-dom';
import { AdaptableBlotterApp } from '../View/AdaptableBlotterView';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import {
  IAdaptableBlotterStore,
  AdaptableBlotterState,
} from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableBlotterStore } from '../Redux/Store/AdaptableBlotterStore';
import { IStrategy, IStrategyCollection } from '../Strategy/Interface/IStrategy';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { CustomSortStrategy } from '../Strategy/CustomSortStrategy';
import { SmartEditStrategy } from '../Strategy/SmartEditStrategy';
import { ShortcutStrategy } from '../Strategy/ShortcutStrategy';
import { DataManagementStrategy } from '../Strategy/DataManagementStrategy';
import { PlusMinusStrategy } from '../Strategy/PlusMinusStrategy';
import { ColumnChooserStrategy } from '../Strategy/ColumnChooserStrategy';
import { ExportStrategy } from '../Strategy/ExportStrategy';
import { ColumnInfoStrategy } from '../Strategy/ColumnInfoStrategy';
import { UserFilterStrategy } from '../Strategy/UserFilterStrategy';
import { ColumnFilterStrategy } from '../Strategy/ColumnFilterStrategy';
import { CellValidationStrategy } from '../Strategy/CellValidationStrategy';
import { LayoutStrategy } from '../Strategy/LayoutStrategy';
import { ThemeStrategy } from '../Strategy/ThemeStrategy';
import { DashboardStrategy } from '../Strategy/DashboardStrategy';
import { TeamSharingStrategy } from '../Strategy/TeamSharingStrategy';
import { IColumnFilterContext } from '../Utilities/Interface/IColumnFilterContext';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import {
  DataType,
  DistinctCriteriaPairValue,
  SortOrder,
  FilterOnDataChangeOptions,
} from '../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter, EmitterCallback } from '../Utilities/Interface/IAdaptableBlotter';
import { CustomSortDataSource } from './CustomSortDataSource';
import { FilterAndSearchDataSource } from './FilterAndSearchDataSource';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IPPStyle } from '../Utilities/Interface/Reports/IPPStyle';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
import { BulkUpdateStrategy } from '../Strategy/BulkUpdateStrategy';
import { IBlotterApi } from '../Api/Interface/IBlotterApi';
import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';
import { DataSourceStrategy } from '../Strategy/DataSourceStrategy';
import * as _ from 'lodash';
import { CellSummaryStrategy } from '../Strategy/CellSummaryStrategy';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { GridCell } from '../Utilities/Interface/SelectedCell/GridCell';
import { ColumnCategoryStrategy } from '../Strategy/ColumnCategoryStrategy';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { ChartService } from '../Utilities/Services/ChartService';
import { AlertStrategy } from '../Strategy/AlertStrategy';
import { HomeStrategy } from '../Strategy/HomeStrategy';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { iPushPullHelper } from '../Utilities/Helpers/iPushPullHelper';
import { EnumExtensions } from '../Utilities/Extensions/EnumExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { HypergridThemes } from './HypergridThemes';
import { ICalendarService } from '../Utilities/Services/Interface/ICalendarService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../Utilities/Services/AuditLogService';
import { CalendarService } from '../Utilities/Services/CalendarService';
import { ValidationService } from '../Utilities/Services/ValidationService';
import { CalculatedColumnExpressionService } from '../Utilities/Services/CalculatedColumnExpressionService';
import { FreeTextColumnStrategy } from '../Strategy/FreeTextColumnStrategy';
import { IFreeTextColumnService } from '../Utilities/Services/Interface/IFreeTextColumnService';
import { FreeTextColumnService } from '../Utilities/Services/FreeTextColumnService';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import { IDataService, ChangeDirection } from '../Utilities/Services/Interface/IDataService';
import { DataService } from '../Utilities/Services/DataService';
import { BlotterApi } from '../Api/BlotterApi';
import { AdvancedSearchStrategy } from '../Strategy/AdvancedSearchStrategy';
import { CalendarStrategy } from '../Strategy/CalendarStrategy';
import { QuickSearchStrategy } from '../Strategy/QuickSearchStrategy';
import { ConditionalStyleStrategyHypergrid } from './Strategy/ConditionalStyleStrategyHypergrid';
import { FlashingCellsStrategyHypergrid } from './Strategy/FlashingCellsStrategyHypergrid';
import { FormatColumnStrategyHypergrid } from './Strategy/FormatColumnStrategyHypergrid';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../Utilities/Helpers/CellValidationHelper';
import { ChartStrategy } from '../Strategy/ChartStrategy';
import {
  HALF_SECOND,
  GRID_REFRESHED_EVENT,
  SEARCH_APPLIED_EVENT,
  CELLS_SELECTED_EVENT,
  GRID_RELOADED_EVENT,
  KEY_DOWN_EVENT,
} from '../Utilities/Constants/GeneralConstants';
import { ILicenceService } from '../Utilities/Services/Interface/ILicenceService';
import { LicenceService } from '../Utilities/Services/LicenceService';
import { PieChartStrategy } from '../Strategy/PieChartStrategy';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ScheduleService } from '../Utilities/Services/ScheduleService';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { SearchService } from '../Utilities/Services/SearchService';
import { IStyle } from '../PredefinedConfig/Common/IStyle';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ColumnSort, VendorGridInfo } from '../PredefinedConfig/RunTimeState/LayoutState';
import { CalculatedColumn } from '../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { FreeTextColumn } from '../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { FilterFormReact } from '../View/Components/FilterForm/FilterForm';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';
import { PercentBar } from '../PredefinedConfig/RunTimeState/PercentBarState';
import { PermittedColumnValues } from '../PredefinedConfig/DesignTimeState/UserInterfaceState';
import { ActionColumn } from '../PredefinedConfig/DesignTimeState/ActionColumnState';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';

// do I need this in both places??
type RuntimeConfig = {
  instantiateGrid?: (...args: any[]) => any;
};

//icon to indicate toggle state
const UPWARDS_BLACK_ARROW = '\u25b2'; // aka '▲'
const DOWNWARDS_BLACK_ARROW = '\u25bc'; // aka '▼'
const filterOffRaw: any = {
  type: 'image/png',
  data:
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAChSURBVChTzZHBCoUgFET9TqEiskgyWoutQvRLRIr+cR7XQAjiJW/1BgZmMUevXsY5xy9OoDEGMcYiUzeB67qibVuwQjVNA6311V+WBeM4vsLDMEApde/1fY9pmtI453neHEKAlBJd1z0fXtc16PbjODK07zvmeUZVVd8nooc75zJIOX3Gm6i0bVsGKf8xKIRIuyJTLgJJ3nvQzsjW2geIsQ/pr9hMVrSncAAAAABJRU5ErkJggg==',
};
const filterOnRaw = {
  type: 'image/png',
  data:
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAACoSURBVChTY3BqfP2fHAzWmDbj7f8p294RhVOBasEa02e+/e/VBmQQCTxaX/9PnvYGoj5ywpv/Qd2ENft3vv4f1gfVBAP+nW/+h/a+ATtn1q73KHjytvdgg3070DTBgHvL6/8g22fsQGiaDmSHA21xaybgIpDHixa8hWssnA8NDEIApCh3LkIjiD2INYJCL2X6W3B8gdhEaQQBUOCA4gyE8+e9xaKJgQEA/74BNE3cElkAAAAASUVORK5CYII=',
};
const filterOn = new Image();
filterOn.src = 'data:' + filterOnRaw.type + ';base64,' + filterOnRaw.data;
const filterOff = new Image();
filterOff.src = 'data:' + filterOffRaw.type + ';base64,' + filterOffRaw.data;

const getFilterIcon = (state: boolean) => {
  return state ? filterOn : filterOff;
};

export class AdaptableBlotter implements IAdaptableBlotter {
  public api: IBlotterApi;
  public strategies: IStrategyCollection;
  public adaptableBlotterStore: IAdaptableBlotterStore;

  public CalendarService: ICalendarService;
  public DataService: IDataService;
  public ValidationService: IValidationService;
  public AuditLogService: IAuditLogService;
  public ChartService: IChartService;
  public LicenceService: ILicenceService;
  public CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
  public FreeTextColumnService: IFreeTextColumnService;
  public ScheduleService: IScheduleService;
  public SearchService: ISearchService;

  public blotterOptions: AdaptableBlotterOptions;
  public vendorGridName: any;
  public embedColumnMenu: boolean;

  private cellStyleHypergridMap: Map<any, Map<string, CellStyleHypergrid>> = new Map();
  private cellFlashIntervalHypergridMap: Map<any, Map<string, number>> = new Map();
  private abContainerElement: HTMLElement;
  private hyperGrid: any;
  private filterContainer: HTMLDivElement;

  public isInitialised: boolean;

  private throttleOnDataChangedUser: (() => void) & _.Cancelable;
  private throttleOnDataChangedExternal: (() => void) & _.Cancelable;
  public hasQuickFilter: boolean;

  private runtimeConfig?: RuntimeConfig;

  private emitter: Emitter;

  constructor(blotterOptions: AdaptableBlotterOptions, renderGrid: boolean = true) {
    //we init with defaults then overrides with options passed in the constructor
    this.blotterOptions = BlotterHelper.assignBlotterOptions(blotterOptions);

    this.hyperGrid = this.blotterOptions.vendorGrid;
    this.vendorGridName = 'Hypergrid';
    this.embedColumnMenu = false;
    this.hasQuickFilter = true;

    // Create licencing
    this.LicenceService = new LicenceService(this);
    BlotterHelper.checkLicenceKey(this.LicenceService.LicenceInfo);

    // the audit service needs to be created before the store
    this.AuditLogService = new AuditLogService(this);
    // create the store
    this.adaptableBlotterStore = new AdaptableBlotterStore(this);

    // create the services
    this.CalendarService = new CalendarService(this);
    this.DataService = new DataService(this);
    this.ValidationService = new ValidationService(this);
    this.SearchService = new SearchService(this);
    // get the api ready
    this.api = new BlotterApi(this);
    this.ChartService = new ChartService(this);
    this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(
      this,
      (columnId, record) => {
        let column = this.getHypergridColumn(columnId);
        return this.valOrFunc(record, column);
      }
    );
    this.FreeTextColumnService = new FreeTextColumnService(this);
    this.ScheduleService = new ScheduleService(this);

    //we build the list of strategies
    //maybe we don't need to have a map and just an array is fine..... dunno'
    this.strategies = new Map<string, IStrategy>();
    this.strategies.set(
      StrategyConstants.AdvancedSearchStrategyId,
      new AdvancedSearchStrategy(this)
    );
    this.strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategy(this));
    this.strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy(this));
    this.strategies.set(
      StrategyConstants.CalculatedColumnStrategyId,
      new CalculatedColumnStrategy(this)
    );
    this.strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy(this));
    this.strategies.set(
      StrategyConstants.CellValidationStrategyId,
      new CellValidationStrategy(this)
    );
    this.strategies.set(StrategyConstants.ChartStrategyId, new ChartStrategy(this));
    this.strategies.set(
      StrategyConstants.ColumnCategoryStrategyId,
      new ColumnCategoryStrategy(this)
    );
    this.strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy(this));
    this.strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy(this));
    this.strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy(this));
    this.strategies.set(
      StrategyConstants.ConditionalStyleStrategyId,
      new ConditionalStyleStrategyHypergrid(this)
    );
    this.strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategy(this));
    this.strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy(this));
    this.strategies.set(
      StrategyConstants.DataManagementStrategyId,
      new DataManagementStrategy(this)
    );
    this.strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy(this));
    this.strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy(this));
    this.strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy(this));
    this.strategies.set(
      StrategyConstants.FlashingCellsStrategyId,
      new FlashingCellsStrategyHypergrid(this)
    );
    this.strategies.set(
      StrategyConstants.FormatColumnStrategyId,
      new FormatColumnStrategyHypergrid(this)
    );
    this.strategies.set(
      StrategyConstants.FreeTextColumnStrategyId,
      new FreeTextColumnStrategy(this)
    );
    this.strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy(this));
    this.strategies.set(StrategyConstants.PieChartStrategyId, new PieChartStrategy(this));
    this.strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy(this));
    this.strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy(this));
    this.strategies.set(StrategyConstants.CellSummaryStrategyId, new CellSummaryStrategy(this));
    this.strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy(this));
    this.strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy(this));
    this.strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy(this));
    this.strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy(this));
    this.strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy(this));

    this.abContainerElement = document.getElementById(
      this.blotterOptions.containerOptions.adaptableBlotterContainer
    );
    if (this.abContainerElement == null) {
      LoggingHelper.LogAdaptableBlotterError(
        'There is no Div called ' +
          this.blotterOptions.containerOptions.adaptableBlotterContainer +
          ' so cannot render the Adaptable Blotter'
      );
      return;
    }
    this.abContainerElement.innerHTML = '';

    this.filterContainer = this.abContainerElement.ownerDocument.createElement('div');
    this.filterContainer.id = blotterOptions.blotterId + '_filterContainer';
    this.filterContainer.style.position = 'absolute';
    this.filterContainer.style.visibility = 'hidden';
    this.abContainerElement.ownerDocument.body.appendChild(this.filterContainer);

    iPushPullHelper.init(this.blotterOptions.iPushPullConfig);

    this.adaptableBlotterStore.Load.then(
      () => this.strategies.forEach(strat => strat.initializeWithRedux()),
      e => {
        LoggingHelper.LogAdaptableBlotterError('Failed to Init AdaptableBlotterStore : ', e);
        //for now i'm still initializing the strategies even if loading state has failed....
        //we may revisit that later
        this.strategies.forEach(strat => strat.initializeWithRedux());
      }
    )
      .then(
        () => this.initInternalGridLogic(),
        e => {
          LoggingHelper.LogAdaptableBlotterError('Failed to Init Strategies : ', e);
          //for now i'm still initializing the grid even if loading state has failed....
          //we may revisit that later
          this.initInternalGridLogic();
        }
      )
      .then(() => {
        let currentlayout = this.adaptableBlotterStore.TheStore.getState().Layout.CurrentLayout;
        this.adaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(currentlayout));
        BlotterHelper.isValidPrimaryKey(this, this.getState().Grid.Columns);
        this.isInitialised = true;
        this.adaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupHideLoading());
      });

    if (renderGrid) {
      if (this.abContainerElement != null) {
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

  private getState(): AdaptableBlotterState {
    return this.adaptableBlotterStore.TheStore.getState();
  }

  private buildFontCSSShorthand(fontCssShortHand: string, newStyle: IStyle): string {
    var el = document.createElement('span');
    //we we let teh CSS parse build the different properties of the font CSS
    el.style.font = fontCssShortHand;
    //we now update individual properties
    el.style.fontWeight = newStyle.FontWeight.toLocaleLowerCase();
    el.style.fontStyle = newStyle.FontStyle.toLocaleLowerCase();
    //font size can be null
    if (newStyle.FontSize) {
      el.style.fontSize = EnumExtensions.getCssFontSizeFromFontSizeEnum(newStyle.FontSize);
    }
    //we return the new font CSS shorthand
    return el.style.font;
  }

  private buildFontCSSProperties(fontCssShortHand: string): CSSStyleDeclaration {
    var el = document.createElement('span');
    //we we let teh CSS parse build the different properties of the font CSS
    el.style.font = fontCssShortHand;
    //we return the new style
    return el.style;
  }

  public setColumnIntoStore() {
    // let columns: IColumn[] = this.hyperGrid.behavior.columns.map((x: any) => {
    let activeColumns: IColumn[] = this.hyperGrid.behavior
      .getActiveColumns()
      .map((x: any, index: number) => {
        let existingColumn: IColumn = ColumnHelper.getColumnFromId(
          x.name,
          this.getState().Grid.Columns
        );
        return {
          ColumnId: existingColumn ? existingColumn.ColumnId : x.name ? x.name : 'Unknown Column',
          FriendlyName: existingColumn
            ? existingColumn.FriendlyName
            : x.header
            ? x.header
            : x.name
            ? x.name
            : 'Unknown Column',
          DataType: existingColumn ? existingColumn.DataType : this.getColumnDataType(x),
          Visible: true,
          Index: index,
          ReadOnly: this.isColumnReadonly(x.name, index),
          Sortable: existingColumn ? existingColumn.Sortable : this.isColumnSortable(x.name),
          Filterable: existingColumn ? existingColumn.Filterable : this.isColumnFilterable(x.name), // TODO: can we manage by column
        };
      });
    let hiddenColumns: IColumn[] = this.hyperGrid.behavior.getHiddenColumns().map((x: any) => {
      let existingColumn: IColumn = ColumnHelper.getColumnFromId(
        x.name,
        this.getState().Grid.Columns
      );
      return {
        ColumnId: existingColumn ? existingColumn.ColumnId : x.name ? x.name : 'Unknown Column',
        FriendlyName: existingColumn
          ? existingColumn.FriendlyName
          : x.header
          ? x.header
          : x.name
          ? x.name
          : 'Unknown Column',
        DataType: existingColumn ? existingColumn.DataType : this.getColumnDataType(x),
        Visible: false,
        Index: -1,
        ReadOnly: false, // not great but doesnt matter as it will update when made visible....this.isColumnReadonly(x.name),
        Sortable: existingColumn ? existingColumn.Sortable : this.isColumnSortable(x.name),
        Filterable: existingColumn ? existingColumn.Filterable : this.isColumnFilterable(x.name),
      };
    });
    this.adaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetColumnsAction>(
      GridRedux.GridSetColumns(activeColumns.concat(hiddenColumns))
    );

    this.debouncedFilterGrid();
  }

  public hideFilterForm() {
    ReactDOM.unmountComponentAtNode(this.filterContainer);
    this.filterContainer.style.visibility = 'hidden';
  }

  public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
    VisibleColumnList.forEach((column, index) => {
      //we use allcolumns so we can show previously hidden columns
      let oldcolindex = this.hyperGrid.behavior.allColumns.findIndex(
        (x: any) => x.name == column.ColumnId
      );
      this.hyperGrid.behavior.showColumns(false, oldcolindex, index, false);
      //this.grid.swapColumns(index, oldcolindex);
    });
    this.hyperGrid.behavior
      .getActiveColumns()
      .filter((x: any) => VisibleColumnList.findIndex(y => y.ColumnId == x.name) < 0)
      .forEach((col: any) => {
        this.hyperGrid.behavior.hideColumns(false, this.hyperGrid.behavior.allColumns.indexOf(col));
      });
    this.hyperGrid.behavior.changed();
    //if the event columnReorder starts to be fired when changing the order programmatically
    //we'll need to remove that line
    this.setColumnIntoStore();
  }

  public on = (eventName: string, callback: EmitterCallback): (() => void) => {
    return this.emitter.on(eventName, callback);
  };

  public emit = (eventName: string, data?: any): Promise<any> => {
    return this.emitter.emit(eventName, data);
  };

  public createMainMenu() {
    let menuItems: AdaptableBlotterMenuItem[] = [];
    this.strategies.forEach(x => {
      let menuItem = x.getPopupMenuItem();
      if (menuItem != null) {
        menuItems.push(menuItem);
      }
    });
    this.adaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMainMenuItemsAction>(
      MenuRedux.SetMainMenuItems(menuItems)
    );
  }

  public reloadGrid(): void {
    this.emitter.emit(GRID_RELOADED_EVENT);
  }

  public getPrimaryKeyValueFromRecord(record: any): any {
    return record[this.blotterOptions.primaryKey];
  }

  public gridHasCurrentEditValue(): boolean {
    return this.hyperGrid.cellEditor;
  }

  public getCurrentCellEditValue(): any {
    if (this.hyperGrid.cellEditor) {
      return this.hyperGrid.cellEditor.getEditorValue();
    }
    return '';
  }

  getActiveCell(): GridCell {
    let currentCell = this.hyperGrid.selectionModel.getLastSelection();

    if (currentCell) {
      let column = this.hyperGrid.behavior.getActiveColumns()[currentCell.origin.x];
      let row = this.hyperGrid.behavior.dataModel.dataSource.getRow(currentCell.origin.y);
      let primaryKey = this.getPrimaryKeyValueFromRecord(row);

      let value = this.valOrFunc(row, column);
      return { primaryKeyValue: primaryKey, columnId: column.name, value: value };
    }
    return null;
  }

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

  //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
  public setSelectedCells(): void {
    let selected: Array<any> = this.hyperGrid.selectionModel.getSelections();
    let columns: IColumn[] = [];
    let selectedCells: GridCell[] = [];
    for (let rectangle of selected) {
      //we don't use firstSelectedCell and lastSelectedCell as they keep the order of the click. i.e. firstcell can be below lastcell....
      for (
        let columnIndex = rectangle.origin.x;
        columnIndex <= rectangle.origin.x + rectangle.width;
        columnIndex++
      ) {
        let column = this.hyperGrid.behavior.getActiveColumns()[columnIndex];
        let selectedColumn: IColumn = ColumnHelper.getColumnFromId(
          column.name,
          this.adaptableBlotterStore.TheStore.getState().Grid.Columns
        );
        columns.push(selectedColumn);
        for (
          let rowIndex = rectangle.origin.y;
          rowIndex <= rectangle.origin.y + rectangle.height;
          rowIndex++
        ) {
          let row = this.hyperGrid.behavior.dataModel.dataSource.getRow(rowIndex);
          let primaryKey = this.getPrimaryKeyValueFromRecord(row);
          let value = this.valOrFunc(row, column);
          selectedCells.push({ columnId: column.name, value: value, primaryKeyValue: primaryKey });
        }
      }
    }
    let selectedCellInfo: ISelectedCellInfo = { Columns: columns, GridCells: selectedCells };
    this.adaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetSelectedCellsAction>(
      GridRedux.GridSetSelectedCells(selectedCellInfo)
    );
    this.emitter.emit(CELLS_SELECTED_EVENT);
  }

  public getColumnDataType(column: any): DataType {
    //Some columns can have no ID or Title. we return string as a consequence but it needs testing
    if (!column) {
      LoggingHelper.LogAdaptableBlotterWarning('columnId is undefined returning String for Type');
      return DataType.String;
    }

    if (column) {
      if (!column.hasOwnProperty('type')) {
        let dataType: DataType;

        switch (column.getType()) {
          case 'string':
            dataType = DataType.String;
            break;
          case 'number':
          case 'int':
          case 'float':
            dataType = DataType.Number;
            break;
          case 'boolean':
            dataType = DataType.Boolean;
            break;
          case 'date':
            dataType = DataType.Date;
            break;
          case 'object':
            dataType = DataType.Object;
            break;
          //for calculated column that's what happens
          case 'unknown': {
            //get First record
            let record = this.getFirstRecord();
            var value = this.valOrFunc(record, column);
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
              'No defined type for column ' +
                column.name +
                '. Defaulting to type of first value: ' +
                dataType
            );
          }
          /* falls through */
          default:
            break;
        }
        return dataType;
      }

      let type = column.type;
      switch (type) {
        case 'string':
          return DataType.String;
        case 'number':
          return DataType.Number;
        case 'boolean':
          return DataType.Boolean;
        case 'date':
          return DataType.Date;
        case 'object':
          return DataType.Object;
        default:
          break;
        //  }
      }
    }
    LoggingHelper.LogAdaptableBlotterWarning('columnId does not exist');
    return DataType.String;
  }

  public setValue(cellInfo: GridCell): void {
    //there is a bug in hypergrid 15/12/16 and the row object on the cellEditor is the row below the one currently edited
    //so we just close editor for now even if not the one where we set the value
    //if(this.gridHasCurrentEditValue() && this.getPrimaryKeyValueFromRecord(this.hyperGrid.cellEditor.row) == id)
    this.cancelEdit();

    let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(
      this.blotterOptions.primaryKey,
      cellInfo.primaryKeyValue
    );

    let oldValue = row[cellInfo.columnId];
    row[cellInfo.columnId] = cellInfo.value;

    let dataChangedEvent: DataChangedInfo = {
      OldValue: oldValue,
      NewValue: cellInfo.value,
      ColumnId: cellInfo.columnId,
      IdentifierValue: cellInfo.primaryKeyValue,
      Record: null,
    };
    if (this.AuditLogService.isAuditCellEditsEnabled) {
      this.AuditLogService.addEditCellAuditLog(dataChangedEvent);
    }
    // it might be a free text column so we need to update the values
    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedEvent);

    //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
    this.filterOnUserDataChange();
  }

  public setValueBatch(batchValues: GridCell[]): void {
    //no need to have a batch mode so far.... we'll see in the future performance
    let dataChangedEvents: DataChangedInfo[] = [];
    for (let element of batchValues) {
      let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(
        this.blotterOptions.primaryKey,
        element.primaryKeyValue
      );
      let oldValue = row[element.columnId];
      row[element.columnId] = element.value;

      let dataChangedEvent: DataChangedInfo = {
        OldValue: oldValue,
        NewValue: element.value,
        ColumnId: element.columnId,
        IdentifierValue: element.primaryKeyValue,
        Record: null,
      };
      dataChangedEvents.push(dataChangedEvent);
    }
    //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
    this.filterOnUserDataChange();

    if (this.AuditLogService.isAuditCellEditsEnabled) {
      this.AuditLogService.addEditCellAuditLogBatch(dataChangedEvents);
    }
    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents);

    this.ClearSelection();
  }

  private ClearSelection() {
    this.hyperGrid.selectionModel.clear();
    this.debouncedSetSelectedCells();
  }

  public cancelEdit() {
    this.hyperGrid.cancelEditing();
  }

  public forAllRecordsDo(func: (record: any) => any): any {
    //we use getData instead of this.hyperGrid.behavior.dataModel.dataSource as this method is used to compute stuff on filtered data as well
    let ds = this.hyperGrid.behavior.getData();
    ds.forEach((row: any) => func(row));
  }

  public forAllVisibleRecordsDo(func: (record: any) => any) {
    let rowCount = this.hyperGrid.behavior.dataModel.dataSource.getRowCount();
    for (var index = 0; index < rowCount; index++) {
      var element = this.hyperGrid.behavior.dataModel.dataSource.getRow(index);
      func(element);
    }
  }

  public getRecordIsSatisfiedFunction(
    id: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any {
    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
      let record = this.hyperGrid.behavior.dataModel.dataSource.findRow(
        this.blotterOptions.primaryKey,
        id
      );
      return (columnId: string) => {
        let column = this.getHypergridColumn(columnId);
        return this.valOrFunc(record, column);
      };
    } else {
      return (columnId: string) => {
        return this.getDisplayValue(id, columnId);
      };
    }
  }
  public getRecordIsSatisfiedFunctionFromRecord(
    record: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any {
    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
      return (columnId: string) => {
        let column = this.getHypergridColumn(columnId);
        return this.valOrFunc(record, column);
      };
    } else {
      return (columnId: string) => {
        return this.getDisplayValueFromRecord(record, columnId);
      };
    }
  }

  private getColumnIndex(columnId: string): number {
    //this returns the index of the column in the collection which is as well the index y of the cell in the grid
    // it doesnt return the index from the schema
    let hgindex: any = this.hyperGrid.behavior
      .getActiveColumns()
      .findIndex((x: any) => x.name == columnId);
    return hgindex;
  }

  private isColumnReadonly(columnId: string, index: number): boolean {
    if (this.hyperGrid.cellEditor) {
      if (this.hyperGrid.cellEditor.column.name == columnId) {
        //we are already editing that column so that's an easy answer
        return false;
      }
      //in our current use cases as of 02/10/2017 it should never happens that we
      //check for editable on a different column that we edit
      else {
        LoggingHelper.LogAdaptableBlotterWarning(
          'Editing ' +
            this.hyperGrid.cellEditor.column.name +
            ' but checking for editable on column ' +
            columnId
        );
      }
    } else {
      //now instead of checking if editor was defined at design time on the column we try to instantiate the editor
      //for that column directly
      let cellEvent = new this.hyperGrid.behavior.CellEvent();
      //this index does need to be the coordinate y/grid index of the column and not the hypergrid column index
      cellEvent.resetGridCY(index, 1);
      let editor = this.hyperGrid.behavior.getCellEditorAt(cellEvent);
      if (editor) {
        editor.cancelEditing();
        editor = null;
        return false;
      }
      return true;
    }
  }

  private isColumnSortable(columnId: string): boolean {
    if (!this.isSortable()) {
      return false;
    }
    let column = this.getHypergridColumn(columnId);
    if (column.properties.hasOwnProperty('unsortable')) {
      return !column.properties.unsortable;
    }
    return true;
  }

  public setCustomSort(columnId: string): void {
    //nothing to do except the reindex so the CustomSortSource does it's job if needed
    let columnSort: ColumnSort = this.adaptableBlotterStore.TheStore.getState().Grid.ColumnSorts.find(
      x => x.Column == columnId
    );
    if (columnSort) {
      this.ReindexAndRepaint();
    }
  }

  public removeCustomSort(columnId: string): void {
    //nothing to do except the reindex so the CustomSortSource does it's job if needed
    let columnSort: ColumnSort = this.adaptableBlotterStore.TheStore.getState().Grid.ColumnSorts.find(
      x => x.Column == columnId
    );
    if (columnSort) {
      this.ReindexAndRepaint();
    }
  }

  public ReindexAndRepaint() {
    this.hyperGrid.behavior.reindex();
    this.hyperGrid.repaint();
    this.emitter.emit(GRID_REFRESHED_EVENT);
  }

  public getColumnValueDisplayValuePairDistinctList(
    columnId: string,
    distinctCriteria: DistinctCriteriaPairValue,
    visibleRowsOnly: boolean
  ): Array<IRawValueDisplayValuePair> {
    // TODO: we are not checking visible rows only!
    let returnMap = new Map<string, IRawValueDisplayValuePair>();
    // check if there are permitted column values for that column
    let permittedValues: PermittedColumnValues[] = this.getState().UserInterface
      .PermittedColumnValues;
    let permittedValuesForColumn = permittedValues.find(pc => pc.ColumnId == columnId);
    if (permittedValuesForColumn) {
      permittedValuesForColumn.PermittedValues.forEach(pv => {
        returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
        if (returnMap.size == this.blotterOptions.queryOptions.maxColumnValueItemsDisplayed) {
          return Array.from(returnMap.values());
        }
      });
    } else {
      let element;
      let column = this.getHypergridColumn(columnId);
      if (visibleRowsOnly) {
        let rowCount = this.hyperGrid.behavior.dataModel.dataSource.getRowCount();
        for (var visibleindex = 0; visibleindex < rowCount; visibleindex++) {
          element = this.hyperGrid.behavior.dataModel.dataSource.getRow(visibleindex);
          this.addDistinctItem(element, columnId, column, distinctCriteria, returnMap);
          if (returnMap.size == this.blotterOptions.queryOptions.maxColumnValueItemsDisplayed) {
            return Array.from(returnMap.values());
          }
        }
      } else {
        let data = this.hyperGrid.behavior.dataModel.getData();
        for (var allIndex = 0; allIndex < data.length; allIndex++) {
          element = data[allIndex];
          this.addDistinctItem(element, columnId, column, distinctCriteria, returnMap);
          if (returnMap.size == this.blotterOptions.queryOptions.maxColumnValueItemsDisplayed) {
            return Array.from(returnMap.values());
          }
        }
      }
    }
    return Array.from(returnMap.values());
  }

  private addDistinctItem(
    element: any,
    columnId: string,
    column: any,
    distinctCriteria: DistinctCriteriaPairValue,
    returnMap: Map<string, IRawValueDisplayValuePair>
  ): void {
    let displayString = this.getDisplayValueFromRecord(element, columnId);
    let rawValue = this.valOrFunc(element, column);
    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
      returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayString });
    } else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
      returnMap.set(displayString, { RawValue: rawValue, DisplayValue: displayString });
    }
  }

  public getDisplayValue(id: any, columnId: string): string {
    let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(
      this.blotterOptions.primaryKey,
      id
    );
    return this.getDisplayValueFromRecord(row, columnId);
  }

  public getDisplayValueFromRecord(row: any, columnId: string) {
    let column = this.getHypergridColumn(columnId);
    if (column) {
      let formatter = column.getFormatter();
      return formatter(this.valOrFunc(row, column));
    }
    return '';
  }

  public getDisplayValueFromRawValue(colId: string, rawValue: any): any {
    let formatter = this.getColumnFormatter(colId);
    if (formatter) {
      return formatter(rawValue);
    } else {
      return rawValue;
    }
  }

  public getRawValueFromRecord(row: any, columnId: string): any {
    let column = this.getHypergridColumn(columnId);
    return this.valOrFunc(row, column);
  }

  public getDataRowFromRecord(record: any): any {
    return record; // not sure this works...
  }

  public getColumnFormatter(columnId: string) {
    let column = this.getHypergridColumn(columnId);
    if (column && column.properties.format) {
      return column.getFormatter();
    }
    return null;
  }

  public addCellStyleHypergrid(
    rowIdentifierValue: any,
    columnId: string,
    style: CellStyleHypergrid,
    timeout?: number
  ): void {
    //here we don't call Repaint as we consider that we already are in the repaint loop
    let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(rowIdentifierValue);
    if (!cellStyleHypergridColumns) {
      cellStyleHypergridColumns = new Map();
      this.cellStyleHypergridMap.set(rowIdentifierValue, cellStyleHypergridColumns);
    }
    let cellStyleHypergrid = cellStyleHypergridColumns.get(columnId);
    if (!cellStyleHypergrid) {
      cellStyleHypergrid = {};
      cellStyleHypergridColumns.set(columnId, cellStyleHypergrid);
    }

    if (style.flashBackColor) {
      cellStyleHypergrid.flashBackColor = style.flashBackColor;
      if (timeout) {
        let cellIntervalColumns = this.cellFlashIntervalHypergridMap.get(rowIdentifierValue);
        if (!cellIntervalColumns) {
          cellIntervalColumns = new Map();
          this.cellFlashIntervalHypergridMap.set(rowIdentifierValue, cellIntervalColumns);
        }
        let cellFlashIntervalHypergrid = cellIntervalColumns.get(columnId);
        if (cellFlashIntervalHypergrid) {
          clearTimeout(cellFlashIntervalHypergrid);
          cellIntervalColumns.set(columnId, null);
        }
        let timeoutInterval: any = setTimeout(
          () => this.removeCellStyleHypergrid(rowIdentifierValue, columnId, 'flash'),
          timeout
        );
        cellIntervalColumns.set(columnId, timeoutInterval);
      }
    }
    if (style.quickSearchStyle) {
      cellStyleHypergrid.quickSearchStyle = style.quickSearchStyle;
    }
    //There is never a timeout for CS
    if (style.conditionalStyleColumn) {
      cellStyleHypergrid.conditionalStyleColumn = style.conditionalStyleColumn;
    }

    if (style.formatColumnStyle) {
      cellStyleHypergrid.formatColumnStyle = style.formatColumnStyle;
    }
  }

  public addRowStyleHypergrid(rowIdentifierValue: any, style: CellStyleHypergrid): void {
    let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(rowIdentifierValue);
    if (!cellStyleHypergridColumns) {
      cellStyleHypergridColumns = new Map();
      this.cellStyleHypergridMap.set(rowIdentifierValue, cellStyleHypergridColumns);
    }
    for (let column of this.adaptableBlotterStore.TheStore.getState().Grid.Columns) {
      let cellStyleHypergrid = cellStyleHypergridColumns.get(column.ColumnId);
      if (!cellStyleHypergrid) {
        cellStyleHypergrid = {};
        cellStyleHypergridColumns.set(column.ColumnId, cellStyleHypergrid);
      }
      //here we don't call Repaint as we consider that we already are in the repaint loop
      //There is never a timeout for CS
      if (style.conditionalStyleRow) {
        cellStyleHypergrid.conditionalStyleRow = style.conditionalStyleRow;
      }
    }
  }

  public getRowIndexHypergrid(rowIdentifierValue: any): number {
    //11/01/17 We cannot use findRow as it returns the rowIndex from the original DataSource
    //I leave the getIndexedData for now but we would need to optimize that.... since we create a big array every iteration
    // let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(this.primaryKey, rowIdentifierValue)
    // let rowIndex = this.hyperGrid.behavior.dataModel.dataSource.getProperty('foundRowIndex')
    // return rowIndex
    let rowIndex = this.hyperGrid.behavior.dataModel.getIndexedData().findIndex((x: any) => {
      if (x && x.hasOwnProperty(this.blotterOptions.primaryKey)) {
        return x[this.blotterOptions.primaryKey] == rowIdentifierValue;
      }
      return false;
    });
    return rowIndex;
  }

  public removeCellStyleHypergrid(
    rowIdentifierValue: any,
    columnId: string,
    style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch' | 'formatColumn'
  ): void {
    let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(rowIdentifierValue);
    if (!cellStyleHypergridColumns) {
      cellStyleHypergridColumns = new Map();
      this.cellStyleHypergridMap.set(rowIdentifierValue, cellStyleHypergridColumns);
    }
    let cellStyleHypergrid = cellStyleHypergridColumns.get(columnId);
    if (!cellStyleHypergrid) {
      cellStyleHypergrid = {};
      cellStyleHypergridColumns.set(columnId, cellStyleHypergrid);
    }
    if (style == 'flash') {
      cellStyleHypergrid.flashBackColor = undefined;
      this.hyperGrid.repaint();
    }
    if (style == 'csColumn') {
      cellStyleHypergrid.conditionalStyleColumn = undefined;
      this.hyperGrid.repaint();
    }
    if (style == 'csRow') {
      cellStyleHypergrid.conditionalStyleRow = undefined;
      this.hyperGrid.repaint();
    }
    if (style == 'QuickSearch') {
      cellStyleHypergrid.quickSearchStyle = undefined;
    }

    if (style == 'formatColumn') {
      cellStyleHypergrid.formatColumnStyle = undefined;
    }
  }

  public removeAllCellStyleHypergrid(
    style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch' | 'formatColumn'
  ): void {
    this.cellStyleHypergridMap.forEach(cellStyleHypergridColumns => {
      cellStyleHypergridColumns.forEach(cellStyleHypergrid => {
        if (style == 'flash') {
          cellStyleHypergrid.flashBackColor = undefined;
          this.hyperGrid.repaint();
        }
        if (style == 'csColumn') {
          cellStyleHypergrid.conditionalStyleColumn = undefined;
          this.hyperGrid.repaint();
        }
        if (style == 'csRow') {
          cellStyleHypergrid.conditionalStyleRow = undefined;
          this.hyperGrid.repaint();
        }
        if (style == 'QuickSearch') {
          cellStyleHypergrid.quickSearchStyle = undefined;
        }
        if (style == 'formatColumn') {
          cellStyleHypergrid.formatColumnStyle = undefined;
        }
      });
    });
  }

  public applyGridFiltering(): void {
    //which call onRefresh to refresh live excel updates
    this.ReindexAndRepaint();
    this.emitter.emit(GRID_REFRESHED_EVENT);
    this.emitter.emit(SEARCH_APPLIED_EVENT);
  }

  private applyDataChange() {
    this.ReindexAndRepaint();
  }

  public clearGridFiltering() {
    // todo
  }

  public clearColumnFiltering(columnIds: string[]): void {
    // to do
  }

  public removeCalculatedColumnFromGrid(calculatedColumnID: string) {
    let colIndex = this.hyperGrid.behavior
      .getColumns()
      .findIndex((x: any) => x.name == calculatedColumnID);
    if (colIndex > -1) {
      this.hyperGrid.behavior.getColumns().splice(colIndex, 1);
      //we re-index the Column Object since we are removing the Schema
      for (let i = colIndex; i < this.hyperGrid.behavior.getColumns().length; i++) {
        this.hyperGrid.behavior.getColumns()[i]._index =
          this.hyperGrid.behavior.getColumns()[i].index - 1;
      }
    }
    let activecolIndex = this.hyperGrid.behavior
      .getActiveColumns()
      .findIndex((x: any) => x.name == calculatedColumnID);
    if (activecolIndex > -1) {
      this.hyperGrid.behavior.getActiveColumns().splice(activecolIndex, 1);
      //No need to do it here since the collections share the same instance of Column
      // for (let i = activecolIndex; i < this.hyperGrid.behavior.getActiveColumns().length; i++) {
      //     this.hyperGrid.behavior.getActiveColumns()[i]._index = this.hyperGrid.behavior.getActiveColumns()[i].index - 1
      // }
    }

    //needs to be last since column.name load up the schema
    let schemaIndex = this.hyperGrid.behavior.dataModel.schema.findIndex(
      (x: any) => x.name == calculatedColumnID
    );
    if (schemaIndex > -1) {
      this.hyperGrid.behavior.dataModel.schema.splice(schemaIndex, 1);
    }
    this.hyperGrid.behavior.changed();
    this.setColumnIntoStore();
  }

  public editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void {
    let newSchema = {
      name: calculatedColumn.ColumnId,
      header: calculatedColumn.ColumnId,
      calculator: (dataRow: any) => {
        //22/08/17: I think that's a bug that's been fixed in v2 of hypergrid but for now we need to return the header
        if (Object.keys(dataRow).length == 0) {
          return calculatedColumn.ColumnId;
        }
        return this.CalculatedColumnExpressionService.ComputeExpressionValue(
          calculatedColumn.ColumnExpression,
          dataRow
        );
      },
    };
    let schemaIndex = this.hyperGrid.behavior.dataModel.schema.findIndex(
      (x: any) => x.name == calculatedColumn.ColumnId
    );

    this.hyperGrid.behavior.dataModel.schema[schemaIndex] = newSchema;

    let existingColumnIndex = this.hyperGrid.behavior.columns.findIndex(
      (c: any) => c.name == calculatedColumn.ColumnId
    );
    let existingColumn = this.hyperGrid.behavior.columns.find(
      (c: any) => c.name == calculatedColumn.ColumnId
    );
    existingColumn.calculator = newSchema.calculator;
    this.hyperGrid.behavior.columns[existingColumnIndex] = existingColumn;

    this.hyperGrid.behavior.changed();
  }

  public addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn) {
    let schema = {
      name: calculatedColumn.ColumnId,
      header: calculatedColumn.ColumnId,
      calculator: (dataRow: any) => {
        //22/08/17: I think that's a bug that's been fixed in v2 of hypergrid but for now we need to return the header
        if (Object.keys(dataRow).length == 0) {
          return calculatedColumn.ColumnId;
        }
        return this.CalculatedColumnExpressionService.ComputeExpressionValue(
          calculatedColumn.ColumnExpression,
          dataRow
        );
      },
    };
    this.hyperGrid.behavior.dataModel.schema.push(schema);

    this.hyperGrid.behavior.addColumn({
      index: this.hyperGrid.behavior.getColumns().length,
      header: schema.header,
      calculator: schema.calculator,
      type: 'string',
    });

    this.hyperGrid.behavior.changed();
    this.setColumnIntoStore();
  }

  public addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn): void {
    let schema = {
      name: freeTextColumn.ColumnId,
      header: freeTextColumn.ColumnId,
      calculator: (dataRow: any) => {
        //22/08/17: I think that's a bug that's been fixed in v2 of hypergrid but for now we need to return the header
        if (Object.keys(dataRow).length == 0) {
          return freeTextColumn.ColumnId;
        }
        return this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, dataRow);
      },
    };

    this.hyperGrid.behavior.dataModel.schema.push(schema);

    this.hyperGrid.behavior.addColumn({
      index: this.hyperGrid.behavior.getColumns().length,
      header: schema.header,
      calculator: schema.calculator,
      type: 'string',
      editor: 'textfield', // this is not quite right as it says undefined, but not sure how to get a cell editor added dynamically at runtime.
    });
  }

  public addActionColumnToGrid(actionColumn: ActionColumn): void {
    // to do
  }

  public isGroupRecord(): boolean {
    return false;
  }

  public getFirstRecord() {
    return this.hyperGrid.behavior.dataModel.getData()[0];
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.abContainerElement);
    ReactDOM.unmountComponentAtNode(this.filterContainer);
  }

  private valOrFunc(dataRow: any, column: any) {
    var result, calculator;
    if (dataRow) {
      result = dataRow[column.name];
      calculator = ((typeof result)[0] === 'f' && result) || column.calculator;
      if (calculator) {
        result = calculator(dataRow, column.name);
      }
    }
    return result || result === 0 || result === false ? result : '';
  }

  public getHypergridColumn(columnId: string): any {
    return this.hyperGrid.behavior.allColumns.find((x: any) => x.name == columnId);
  }

  //TEMPORARY : JO
  public getIPPStyle(): IPPStyle {
    let headerFontStyle = this.buildFontCSSProperties(this.hyperGrid.properties.columnHeaderFont);
    let fontStyle = this.buildFontCSSProperties(this.hyperGrid.properties.font);
    return {
      Header: {
        headerColor: this.hyperGrid.properties.columnHeaderColor,
        headerBackColor: this.hyperGrid.properties.columnHeaderBackgroundColor,
        headerFontFamily: headerFontStyle.fontFamily,
        headerFontSize: headerFontStyle.fontSize,
        headerFontStyle: headerFontStyle.fontStyle,
        headerFontWeight: headerFontStyle.fontWeight,
        height: this.hyperGrid.properties.defaultRowHeight,
        Columns: this.adaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
          let colHypergrid = this.getHypergridColumn(col.ColumnId);
          return {
            columnFriendlyName: col.FriendlyName,
            width: colHypergrid.getWidth(),
            textAlign: colHypergrid.properties.columnHeader.halign,
          };
        }),
      },
      Row: {
        color: this.hyperGrid.properties.color,
        backColor: this.hyperGrid.properties.backgroundColor,
        altBackColor:
          this.hyperGrid.properties.altbackground || this.hyperGrid.properties.backgroundColor,
        fontFamily: fontStyle.fontFamily,
        fontSize: fontStyle.fontSize,
        fontStyle: fontStyle.fontStyle,
        fontWeight: fontStyle.fontWeight,
        height: this.hyperGrid.properties.defaultRowHeight,
        Columns: this.adaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
          let colHypergrid = this.getHypergridColumn(col.ColumnId);
          return {
            columnFriendlyName: col.FriendlyName,
            width: colHypergrid.getWidth(),
            textAlign: colHypergrid.properties.halign,
          };
        }),
      },
    };
  }

  private initInternalGridLogic() {
    this.hyperGrid.addEventListener('fin-keydown', (e: any) => {
      //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
      //like that we avoid the need to have different logic for different grids....
      this.emitter.emit(KEY_DOWN_EVENT, e.detail.primitiveEvent);
    });
    //we'll see if we need to handle differently keydown when in edit mode internally or not....
    //I think we don't need to but hey.... you never know
    this.hyperGrid.addEventListener('fin-editor-keydown', (e: any) => {
      //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
      //like that we avoid the need to have different logic for different grids....
      this.emitter.emit(KEY_DOWN_EVENT, e.detail.keyEvent);
    });
    //we hide the filterform if scrolling on the x axis
    this.hyperGrid.addEventListener('fin-scroll-x', () => {
      if (this.filterContainer.style.visibility == 'visible') {
        this.hideFilterForm();
      }
    });
    this.hyperGrid.addEventListener('fin-click', (e: any) => {
      if (this.filterContainer.style.visibility == 'visible') {
        this.hideFilterForm();
      }
      if (e.detail.primitiveEvent.isHeaderCell) {
        //try to check if we are clicking on the filter icon
        //we remove the scroll as get boundscell look at visible columns only
        let scrolledX = e.detail.gridCell.x - this.hyperGrid.getHScrollValue();
        let y = e.detail.gridCell.y;
        let headerBounds = this.hyperGrid.getBoundsOfCell({ x: scrolledX, y: y });
        let mouseCoordinate = e.detail.primitiveEvent.primitiveEvent.detail.mouse;
        let iconPadding = this.hyperGrid.properties.iconPadding;
        let filterIndex = this.adaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.findIndex(
          x => x.ColumnId == e.detail.primitiveEvent.column.name
        );
        let filterIconWidth = getFilterIcon(filterIndex >= 0).width;
        if (mouseCoordinate.x > headerBounds.corner.x - filterIconWidth - iconPadding) {
          let filterContext: IColumnFilterContext = {
            Column: ColumnHelper.getColumnFromId(
              e.detail.primitiveEvent.column.name,
              this.adaptableBlotterStore.TheStore.getState().Grid.Columns
            ),
            Blotter: this,
            ShowCloseButton: true,
          };
          this.filterContainer.style.visibility = 'visible';
          this.filterContainer.style.top =
            e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientY + 'px';
          this.filterContainer.style.left =
            e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientX + 'px';

          let colId: string = e.detail.primitiveEvent.column.name;

          this.adaptableBlotterStore.TheStore.dispatch(MenuRedux.ClearColumntMenu());

          let column: IColumn = ColumnHelper.getColumnFromId(colId, this.getState().Grid.Columns);
          if (column != null) {
            this.strategies.forEach(s => {
              s.addColumnMenuItem(column);
            });
          }

          ReactDOM.render(FilterFormReact(filterContext), this.filterContainer);
        }
        e.preventDefault();
      }
    });

    this.hyperGrid.addEventListener('fin-before-cell-edit', (event: any) => {
      // cell edit is about to happen so create datachanging and datahanged objects
      // these are to use to check for free text column, validation and audit log
      let row = this.hyperGrid.behavior.dataModel.getRow(
        event.detail.input.event.visibleRow.rowIndex
      );

      let dataChangedEvent: DataChangedInfo = {
        OldValue: event.detail.oldValue,
        NewValue: event.detail.newValue,
        ColumnId: event.detail.input.column.name,
        IdentifierValue: this.getPrimaryKeyValueFromRecord(row),
        Record: null,
      };

      // first free text column
      let freeTextColumn: FreeTextColumn = this.getState().FreeTextColumn.FreeTextColumns.find(
        fc => fc.ColumnId == dataChangedEvent.ColumnId
      );
      if (freeTextColumn) {
        this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedEvent);
      }

      // then check validation
      let failedRules: CellValidationRule[] = this.ValidationService.ValidateCellChanging(
        dataChangedEvent
      );
      if (failedRules.length > 0) {
        // first see if its an error = should only be one item in array if so
        if (failedRules[0].ActionMode == 'Stop Edit') {
          let errorMessage: string = ObjectFactory.CreateCellValidationMessage(
            failedRules[0],
            this
          );
          this.api.alertApi.showAlertError('Validation Error', errorMessage, true);
          event.preventDefault();
        } else {
          let warningMessage: string = '';
          failedRules.forEach(f => {
            warningMessage =
              warningMessage + ObjectFactory.CreateCellValidationMessage(f, this) + '\n';
          });
          let cellInfo: GridCell = {
            primaryKeyValue: dataChangedEvent.IdentifierValue,
            columnId: dataChangedEvent.ColumnId,
            value: dataChangedEvent.NewValue,
          };

          let confirmAction: Redux.Action = GridRedux.GridSetValueLikeEdit(
            cellInfo,
            row[dataChangedEvent.ColumnId]
          );
          let cancelAction: Redux.Action = null;
          let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
            confirmAction,
            cancelAction,
            warningMessage
          );
          this.adaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(
            PopupRedux.PopupShowConfirmation(confirmation)
          );
          //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
          event.preventDefault();
        }
      }

      // finally call auditlogservice
      if (this.AuditLogService.isAuditCellEditsEnabled) {
        this.AuditLogService.addEditCellAuditLog(dataChangedEvent);
      }
    });
    //We call Reindex so functions like CustomSort, Search and Filter are reapplied
    this.hyperGrid.addEventListener('fin-after-cell-edit', () => {
      this.filterOnUserDataChange();
    });
    this.hyperGrid.addEventListener('fin-selection-changed', () => {
      this.debouncedSetSelectedCells();
    });
    this.hyperGrid.addEventListener('fin-column-selection-changed', () => {
      //    this.debouncedSetSelectedCells()
    });

    //this is used so the grid displays sort icon when sorting....
    this.hyperGrid.behavior.dataModel.getSortImageForColumn = (columnIndex: number) => {
      var icon = '';

      let columnSorts: ColumnSort[] = this.adaptableBlotterStore.TheStore.getState().Grid
        .ColumnSorts;
      let cols: any[] = this.hyperGrid.behavior.getActiveColumns();
      columnSorts.forEach((gs: ColumnSort, index: number) => {
        let foundCol = cols.find(c => c.name == gs.Column);

        if (foundCol && foundCol.index == columnIndex) {
          icon = gs.SortOrder == SortOrder.Ascending ? UPWARDS_BLACK_ARROW : DOWNWARDS_BLACK_ARROW;
          if (columnSorts.length > 1) {
            let gridIndex = index + 1;
            icon += '(' + gridIndex + ') ';
          }
        }
      });
      return icon;
    };
    let originGetCell = this.hyperGrid.behavior.dataModel.getCell;
    this.hyperGrid.behavior.dataModel.getCell = (config: any, declaredRendererName: string) => {
      try {
        //we run the original one as we don't want it to override our styles. i.e. for ex background color for our flash
        let originalGetCellReturn: any;
        if (originGetCell) {
          //we need to maintain the context tof the call
          originalGetCellReturn = originGetCell.call(
            this.hyperGrid.behavior.dataModel,
            config,
            declaredRendererName
          );
        }
        if (config.isHeaderRow && !config.isHandleColumn) {
          let filterIndex = this.adaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.findIndex(
            x => x.ColumnId == config.name
          );
          config.value = [null, config.value, getFilterIcon(filterIndex >= 0)];
        }
        if (config.isDataRow && config.dataRow) {
          let row = config.dataRow;
          let columnId = config.name;
          if (columnId && row) {
            //check that it doesn't impact perf monitor
            let rowIdentifierValue: any = this.getPrimaryKeyValueFromRecord(row);
            let column = this.getHypergridColumn(columnId);
            let newValue: any = this.valOrFunc(row, column);

            // really really dont like this as its doing it every single time!
            let olddValue = this.DataService.GetPreviousColumnValue(
              columnId,
              rowIdentifierValue,
              newValue,
              ChangeDirection.Ignore
            );

            if (olddValue != null && olddValue != newValue) {
              let dataChangedInfo: DataChangedInfo = {
                OldValue: olddValue,
                NewValue: newValue,
                ColumnId: columnId,
                IdentifierValue: rowIdentifierValue,
                Record: null,
              };

              this.DataService.CreateDataChangedEvent(dataChangedInfo);
              // this is new  - giving users ability to filter on external data changes
              this.filterOnExternalDataChange();
            }
          }
          let primaryKey = this.getPrimaryKeyValueFromRecord(row);
          let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(primaryKey);
          let cellStyleHypergrid = cellStyleHypergridColumns
            ? cellStyleHypergridColumns.get(columnId)
            : null;
          if (cellStyleHypergrid) {
            let flashColor = cellStyleHypergrid.flashBackColor;
            let conditionalStyleColumn = cellStyleHypergrid.conditionalStyleColumn;
            let conditionalStyleRow = cellStyleHypergrid.conditionalStyleRow;
            let quickSearchStyle = cellStyleHypergrid.quickSearchStyle;
            let formatStyle = cellStyleHypergrid.formatColumnStyle;

            //Lowest priority first then every step will override the properties it needs to override.
            //probably not needed to optimise as we just assign properties.......
            if (formatStyle && !formatStyle.ClassName) {
              if (formatStyle.BackColor) {
                config.backgroundColor = formatStyle.BackColor;
              }
              if (formatStyle.ForeColor) {
                config.color = formatStyle.ForeColor;
              }
              if (
                formatStyle.FontStyle ||
                formatStyle.FontWeight ||
                formatStyle.ForeColor ||
                formatStyle.FontSize
              ) {
                config.font = this.buildFontCSSShorthand(config.font, formatStyle);
              }
            }
            if (conditionalStyleRow) {
              if (conditionalStyleRow.BackColor) {
                config.backgroundColor = conditionalStyleRow.BackColor;
              }
              if (conditionalStyleRow.ForeColor) {
                config.color = conditionalStyleRow.ForeColor;
              }
              if (
                conditionalStyleRow.FontStyle ||
                conditionalStyleRow.FontWeight ||
                conditionalStyleRow.ForeColor ||
                conditionalStyleRow.FontSize
              ) {
                config.font = this.buildFontCSSShorthand(config.font, conditionalStyleRow);
              }
            }
            if (conditionalStyleColumn) {
              if (conditionalStyleColumn.BackColor) {
                config.backgroundColor = conditionalStyleColumn.BackColor;
              }
              if (conditionalStyleColumn.ForeColor) {
                config.color = conditionalStyleColumn.ForeColor;
              }
              if (
                conditionalStyleColumn.FontStyle ||
                conditionalStyleColumn.FontWeight ||
                conditionalStyleColumn.ForeColor ||
                conditionalStyleColumn.FontSize
              ) {
                config.font = this.buildFontCSSShorthand(config.font, conditionalStyleColumn);
              }
            }

            if (quickSearchStyle) {
              if (quickSearchStyle.BackColor) {
                config.backgroundColor = quickSearchStyle.BackColor;
              }
              if (quickSearchStyle.ForeColor) {
                config.color = quickSearchStyle.ForeColor;
              }
              if (
                quickSearchStyle.FontStyle ||
                quickSearchStyle.FontWeight ||
                //   || quickSearchStyle.ForeColor (JW: I think this line is unnecessary and ditto above with conditional style)
                quickSearchStyle.FontSize
              ) {
                config.font = this.buildFontCSSShorthand(config.font, quickSearchStyle);
              }
            }

            if (flashColor) {
              config.backgroundColor = flashColor;
            }
          }
        }

        return originalGetCellReturn || this.hyperGrid.Bars.get(declaredRendererName);
      } catch (err) {
        LoggingHelper.LogAdaptableBlotterError('Error during GetCell', err);
      }
    };
    this.hyperGrid.addEventListener('fin-column-sort', (e: any) => {
      this.onSortSaved(e.detail.column);
      this.debouncedSetSelectedCells();
      //in case we want multi column
      //keys =  event.detail.keys;
      //    this.hyperGrid.behavior.reindex();
    });
    //We add our sorter pipe last into the existing pipeline
    let currentDataSources = this.hyperGrid.behavior.dataModel.DataSources;
    currentDataSources.push(FilterAndSearchDataSource(this));
    currentDataSources.push(CustomSortDataSource(this));
    this.hyperGrid.setPipeline(currentDataSources, {
      stash: 'default',
      apply: false, //  Set the new pipeline without calling reindex. We might need to reindex.... Not sure yet
    });
    this.hyperGrid.addEventListener('fin-column-changed-event', () => {
      setTimeout(() => this.setColumnIntoStore(), 5);
    });
  }

  public getRowCount(): number {
    let data = this.hyperGrid.behavior.dataModel.getData();
    return data.length;
  }

  public getColumnCount(): number {
    //       return this.hyperGrid.behavior.getActiveColumns().length + this.hyperGrid.behavior.getHiddenColumns().length
    return this.hyperGrid.behavior.dataModel.dataSource.getColumnCount();
  }

  public getVisibleRowCount(): number {
    let indexData = this.hyperGrid.behavior.dataModel.getIndexedData();
    return indexData.length;
  }

  public getVisibleColumnCount(): number {
    return this.hyperGrid.behavior.getActiveColumns().length;
  }

  public selectColumn(columnId: string) {
    // still not got this working. i can select a column but it doesnt trigger the correct selections so nothing appens
    // it seems as though we can set the ColumnSelections and RowSelections collections but not the main Selection collection which is what we need
    // stupid stupid grid.
    //   let test = this.hyperGrid.selectionModel.getSelectedColumns()
    let index = this.hyperGrid.behavior
      .getActiveColumns()
      .findIndex((c: any) => c.name == columnId);
    this.hyperGrid.selectionModel.clear();
    // not implementing until can work out how to do it!
    this.hyperGrid.selectionModel.selectColumn(index, index);
    this.hyperGrid.selectionModel.selectRow(index, index);
    this.hyperGrid.selectionModel.setLastSelectionType('cell');
    this.debouncedSetSelectedCells();
  }

  public onSortSaved(gridColumnIndex: number) {
    let currentColumnSorts: ColumnSort[] = this.adaptableBlotterStore.TheStore.getState().Grid
      .ColumnSorts;
    let newColumnSorts: ColumnSort[] = [].concat(currentColumnSorts);

    let column = this.hyperGrid.behavior.getActiveColumns()[gridColumnIndex].name;

    // not rigth for existing sorts in terms of turning off...
    let currentColumnSort: ColumnSort = newColumnSorts.find(gs => gs.Column == column);
    if (currentColumnSort) {
      // if exists and ascending make descending
      if (currentColumnSort.SortOrder == SortOrder.Ascending) {
        currentColumnSort.SortOrder = SortOrder.Descending;
      } else {
        // it exists and is descendig so need to 'turn off' (i.e.remove from colection)
        let index = newColumnSorts.findIndex(a => a.Column == currentColumnSort.Column);
        newColumnSorts.splice(index, 1);
      }
    } else {
      let newcColumnSort: ColumnSort = { Column: column, SortOrder: SortOrder.Ascending };
      newColumnSorts.push(newcColumnSort);
    }

    this.adaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetSortAction>(
      GridRedux.GridSetSort(newColumnSorts)
    );
    this.hyperGrid.behavior.reindex();
  }

  public setColumnSort(): void {
    this.hyperGrid.behavior.reindex();
  }

  public setGridData(data: any): void {
    let schema = this.hyperGrid.behavior.dataModel.dataSource.schema;
    this.hyperGrid.behavior.dataModel.dataSource.setData(data, schema);
    this.ReindexAndRepaint();
  }

  public getVendorGridState(): VendorGridInfo {
    return null;
  }

  public setVendorGridState(vendorGridState: VendorGridInfo): void {
    // todo - but we dont know how to ;(
  }

  public isSelectable(): boolean {
    return true;
  }

  private isSortable(): boolean {
    if (this.hyperGrid.properties.hasOwnProperty('unsortable')) {
      return !this.hyperGrid.behavior.unsortable;
    }
    return true;
  }

  private isColumnFilterable(colId: string): boolean {
    // currently we ONLY look at grid level but need to get it working at col level ideally
    if (this.hyperGrid.properties.hasOwnProperty('filterable')) {
      return this.hyperGrid.behavior.filterable;
    }
    return true;
  }

  public showQuickFilter(): void {
    // todo
  }

  public hideQuickFilter(): void {
    // todo
  }

  public applyLightTheme(): void {
    if (this.blotterOptions.generalOptions.useDefaultVendorGridThemes) {
      this.hyperGrid.addProperties(HypergridThemes.getLightTheme());
      this.applyAlternateRowStyle();
    }
  }

  public applyDarkTheme(): void {
    if (this.blotterOptions.generalOptions.useDefaultVendorGridThemes) {
      this.hyperGrid.addProperties(HypergridThemes.getDarkTheme());
      this.applyAlternateRowStyle();
    }
  }

  public applyBlotterTheme(themeClassName: string) {
    // TODO:  this is currently not supported
  }

  private applyAlternateRowStyle() {
    var origgetCell = this.hyperGrid.behavior.dataModel.getCell;
    this.hyperGrid.behavior.dataModel.getCell = (config: any, declaredRendererName: any) => {
      if (config.isDataRow) {
        var y = config.dataCell.y;
        if (y % 2) {
          config.backgroundColor = config.altbackground;
        }
      }
      return origgetCell.call(this.hyperGrid.behavior.dataModel, config, declaredRendererName);
    };
  }

  public addPercentBar(pcr: PercentBar): void {
    // to do
  }
  public removePercentBar(pcr: PercentBar): void {
    // todo
  }

  public editPercentBar(pcr: PercentBar): void {
    // todo
  }

  public redraw() {
    this.ReindexAndRepaint();
  }
}

export interface CellStyleHypergrid {
  conditionalStyleColumn?: IStyle;
  conditionalStyleRow?: IStyle;
  flashBackColor?: string;
  quickSearchStyle?: IStyle;
  formatColumnStyle?: IStyle;
}
