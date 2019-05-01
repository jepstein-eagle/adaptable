// import styles - ab and 2 default agGrid
import '../Styles/stylesheets/adaptableblotter-style.css'
import 'ag-grid-enterprise';

import * as Redux from 'redux'
import * as ReactDOM from "react-dom";
import * as _ from 'lodash'
import { AdaptableBlotterApp } from '../View/AdaptableBlotterView';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as StyleConstants from '../Utilities/Constants/StyleConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
// redux / store
import { IAdaptableBlotterStore, AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../Redux/Store/AdaptableBlotterStore'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
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
// import other items
import { EventDispatcher } from '../Utilities/EventDispatcher'
import { DataType, SortOrder, DisplayAction, DistinctCriteriaPairValue, FilterOnDataChangeOptions } from '../Utilities/Enums'
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { Color } from '../Utilities/color';
import { IPPStyle } from "../Utilities/Interface/Reports/IPPStyle";
import { ICellInfo } from "../Utilities/Interface/ICellInfo";
import { IVendorGridInfo } from "../Utilities/Interface/IVendorGridInfo";
import { IColumn } from '../Utilities/Interface/IColumn';
import { IGridSort } from "../Utilities/Interface/IGridSort";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { IFreeTextColumn } from "../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { ICustomSort } from "../Utilities/Interface/BlotterObjects/ICustomSort";
import { IColumnFilter } from "../Utilities/Interface/BlotterObjects/IColumnFilter";
import { ICellValidationRule } from "../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { ICalculatedColumn } from "../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { IRange } from "../Utilities/Interface/Expression/IRange";
import { IBlotterApi } from '../Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../Utilities/Interface/blotterOptions/IAdaptableblotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs, IAlertFiredEventArgs } from '../Utilities/Interface/IStateEvents';
import { ISelectedCellInfo } from "../Utilities/Interface/SelectedCell/ISelectedCellInfo";
import { ISelectedCell } from "../Utilities/Interface/SelectedCell/ISelectedCell";
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
//if you add an import from a different folder for aggrid you need to add it to externals in the webpack prod file
import {  GridOptions, Column, RowNode, ICellEditor, AddRangeSelectionParams, ICellRendererFunc, SideBarDef } from "ag-grid-community"
import { Events } from "ag-grid-community/dist/lib/eventKeys"
import { NewValueParams, ValueGetterParams, ColDef, ValueFormatterParams } from "ag-grid-community/dist/lib/entities/colDef"
import { GetMainMenuItemsParams, MenuItemDef } from "ag-grid-community/dist/lib/entities/gridOptions"
import { Expression } from '../Utilities/Expression';
import { RangeHelper } from '../Utilities/Helpers/RangeHelper';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';
import { BlotterApi } from '../Api/BlotterApi';
import { Action } from 'redux';
import { DEFAULT_LAYOUT, HALF_SECOND } from '../Utilities/Constants/GeneralConstants';
import { CustomSortStrategyagGrid } from './Strategy/CustomSortStrategyagGrid';
import { IMenuItem } from '../Utilities/Interface/IMenu';
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
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState';
import { IPermittedColumnValues } from '../Utilities/Interface/IPermittedColumnValues';

export class AdaptableBlotter implements IAdaptableBlotter {

    public api: IBlotterApi
    public strategies: IStrategyCollection
    public adaptableBlotterStore: IAdaptableBlotterStore
    public blotterOptions: IAdaptableBlotterOptions
    public vendorGridName: any

    public CalendarService: ICalendarService
    public DataService: IDataService
    public ValidationService: IValidationService
    public AuditLogService: AuditLogService
    public StyleService: StyleService
    public ChartService: IChartService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    public FreeTextColumnService: IFreeTextColumnService
    public LicenceService: ILicenceService
    public ScheduleService: IScheduleService
    public embedColumnMenu: boolean;

    private calculatedColumnPathMap: Map<string, string[]> = new Map()
    private useRowNodeLookUp: boolean;

    private abContainerElement: HTMLElement;
    private gridOptions: GridOptions

    public isInitialised: boolean
    private throttleOnDataChangedUser: (() => void) & _.Cancelable;
    private throttleOnDataChangedExternal: (() => void) & _.Cancelable;
    public hasFloatingFilter: boolean

    private agGridHelper: agGridHelper;

    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid: boolean = true) {
        //we create the Blotter Options by merging the values provided by the user with the defaults (where no value has been set)
        this.blotterOptions = BlotterHelper.assignBlotterOptions(blotterOptions);

        this.gridOptions = this.blotterOptions.vendorGrid
        this.vendorGridName = 'agGrid';
        this.embedColumnMenu = true;
        this.isInitialised = false;
        this.hasFloatingFilter = true;
        this.useRowNodeLookUp = false; // we will set later in instantiate if possible to be true

        // get the api ready
        this.api = new BlotterApi(this);

        // set the licence first
        this.LicenceService = new LicenceService(this);
        BlotterHelper.checkLicenceKey(this.LicenceService.LicenceInfo);

        // the audit service needs to be created before the store
        this.AuditLogService = new AuditLogService(this, this.blotterOptions);
        // create the store
        this.adaptableBlotterStore = new AdaptableBlotterStore(this);

        // set up the helper
        this.agGridHelper = new agGridHelper(this, this.gridOptions);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.DataService = new DataService(this);
        this.ValidationService = new ValidationService(this);
        this.StyleService = new StyleService(this);
        this.ChartService = new ChartService(this);
        this.FreeTextColumnService = new FreeTextColumnService(this);
        this.ScheduleService = new ScheduleService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, (columnId, record) => this.gridOptions.api.getValue(columnId, record));

        // we prefer the grid to be NOT instantiated so that we can do it
        // perhaps in future we will force instantiation only?
        const isGridInstantiated = this.gridOptions.api && typeof this.gridOptions.api.getValue === 'function';
        if (!isGridInstantiated) {
            const canInstantiateGrid = this.tryInstantiateAgGrid();
            if (!canInstantiateGrid) { // we have no grid, we can't do anything
                LoggingHelper.LogAdaptableBlotterError('Unable to set up ag-Grid');
                return;
            }
        }

        console.log("we have got to here")
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
        this.adaptableBlotterStore.Load
            .then(() => this.strategies.forEach(strat => strat.initializeWithRedux()),
                (e) => {
                    LoggingHelper.LogAdaptableBlotterError('Failed to Init AdaptableBlotterStore : ', e);
                    //for now we initiliaze the strategies even if loading state has failed (perhaps revisit this?)
                    this.strategies.forEach(strat => strat.initializeWithRedux())
                    this.dispatchAction(PopupRedux.PopupHideLoading());  // doesnt really help but at least clears the screen
                })
            .then(
                () => this.initInternalGridLogic(),
                (e) => {
                    LoggingHelper.LogAdaptableBlotterError('Failed to Init Strategies : ', e);
                    //for now we initiliaze the grid even if initialising strategies has failed (perhaps revisit this?)
                    this.initInternalGridLogic()
                    this.dispatchAction(PopupRedux.PopupHideLoading()); // doesnt really help but at least clears the screen
                })
            .then(() => {
                this.applyFinalRendering();
                this.isInitialised = true
                this.dispatchAction(PopupRedux.PopupHideLoading());
            })

        if (renderGrid) {
            if (this.abContainerElement == null) {
                this.abContainerElement = document.getElementById(this.blotterOptions.containerOptions.adaptableBlotterContainer);
            }
            if (this.abContainerElement != null) {
                this.abContainerElement.innerHTML = ""
                ReactDOM.render(AdaptableBlotterApp({ AdaptableBlotter: this }), this.abContainerElement);
            }
        }
        // create debounce methods that take a time based on user settings
        this.throttleOnDataChangedUser = _.throttle(this.applyDataChange, this.blotterOptions.filterOptions.filterActionOnUserDataChange.ThrottleDelay);
        this.throttleOnDataChangedExternal = _.throttle(this.applyDataChange, this.blotterOptions.filterOptions.filterActionOnExternalDataChange.ThrottleDelay);
    }


    private tryInstantiateAgGrid(): boolean {
        let vendorContainer = document.getElementById(this.blotterOptions.containerOptions.vendorContainer);
        if (!vendorContainer) {
            LoggingHelper.LogAdaptableBlotterError('You must provide an element id in `containerOptions.vendorContainer`');
            return false;
        }

        // set up whether we use the getRowNode method or loop when finding a record (former is preferable)
        // can only do that here as the gridOptions not yet set up
        this.useRowNodeLookUp = this.agGridHelper.TrySetUpNodeIds();
       
        // Create Adaptable Blotter Tool Panel
        if (this.blotterOptions.generalOptions.showAdaptableBlotterToolPanel) {
            LoggingHelper.LogAdaptableBlotterInfo("Adding Adaptable Blotter Tool Panel")
            this.gridOptions.sideBar = this.gridOptions.sideBar || {};
            this.gridOptions.components = this.gridOptions.components || {};
            // https://www.ag-grid.com/javascript-grid-side-bar/

            if (this.gridOptions.sideBar) {

                const sidebar = this.gridOptions.sideBar;
                if (sidebar === true) {
                    // Possibility 1: Sidebar is true - meaning that they want the default filter and columns, so create both:
                    this.gridOptions.sideBar = this.agGridHelper.createAdaptableBlotterSideBarDefs(true, true);
                } else if (sidebar === 'columns') {
                    // Possibility 2: Sidebar is 'columns' (string) - meaning column only so create just that
                    this.gridOptions.sideBar = this.agGridHelper.createAdaptableBlotterSideBarDefs(false, true);
                } else if (sidebar === 'filters') {
                    // Possibility 3: Sidebar is 'filters' (string) - meaning filters only so create just that
                    this.gridOptions.sideBar = this.agGridHelper.createAdaptableBlotterSideBarDefs(true, false);
                } else {
                    // Possibilty 4: either no sidebar or they created their own; in either case, should add Blotter Tool panel
                    const sidebarDef = (this.gridOptions.sideBar as SideBarDef);
                    if (sidebarDef) {
                        sidebarDef.toolPanels = sidebarDef.toolPanels || [];
                        sidebarDef.toolPanels.push(this.agGridHelper.createAdaptableBlotterToolPanel());
                    }
                }
                const toolpanelContext: IAdaptableBlotterToolPanelContext = { Blotter: this };
                this.gridOptions.components.adaptableBlotterToolPanel = AdaptableBlotterToolPanelBuilder(toolpanelContext);
            }
        }
        // now create the grid itself - we have to do it this way as previously when we instantiated the Grid 'properly' it got created as J.Grid 
        console.log('creating the grid as not created by user')
         let grid: any =   new (<any>window).agGrid.Grid(vendorContainer, this.gridOptions);
        return (grid != null);
    }
    

    // debounced methods
    debouncedSetColumnIntoStore = _.debounce(() => this.setColumnIntoStore(), HALF_SECOND);
    debouncedSaveGridLayout = _.debounce(() => this.saveGridLayout(), HALF_SECOND);
    debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), HALF_SECOND);
    debouncedFilterGrid = _.debounce(() => this.applyGridFiltering(), HALF_SECOND);

    private filterOnUserDataChange(): void {
        if (this.blotterOptions.filterOptions.filterActionOnUserDataChange.RunFilter == FilterOnDataChangeOptions.Always) {
            this.applyDataChange();
        } else if (this.blotterOptions.filterOptions.filterActionOnUserDataChange.RunFilter == FilterOnDataChangeOptions.Throttle) {
            this.throttleOnDataChangedUser();
        }
    }

    private filterOnExternalDataChange(): void {
        if (this.blotterOptions.filterOptions.filterActionOnExternalDataChange.RunFilter == FilterOnDataChangeOptions.Always) {
            this.applyDataChange();
        } else if (this.blotterOptions.filterOptions.filterActionOnExternalDataChange.RunFilter == FilterOnDataChangeOptions.Throttle) {
            this.throttleOnDataChangedExternal();
        }
    }

    private createFilterWrapper(col: Column) {
        this.gridOptions.api.destroyFilter(col)
        this.gridOptions.api.getColumnDef(col).filter = FilterWrapperFactory(this)
        col.initialise()
    }

    private createFloatingFilterWrapper(col: Column) {
        this.gridOptions.api.getColumnDef(col).floatingFilterComponentParams = { suppressFilterButton: false }
        this.gridOptions.api.getColumnDef(col).floatingFilterComponent = FloatingFilterWrapperFactory(this)
    }

    private _currentEditor: ICellEditor

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, KeyboardEvent | any> = new EventDispatcher<IAdaptableBlotter, KeyboardEvent | any>();
    public onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any> {
        return this._onKeyDown;
    }

    private _onGridDataBound: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onGridDataBound;
    }

    private _onSelectedCellsChanged: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onSelectedCellsChanged;
    }

    private _onRefresh: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onRefresh;
    }

    private _onGridReloaded: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onGridReloaded(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onGridReloaded;
    }

    private _onSearchChanged: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onSearchChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onSearchChanged;
    }

    public reloadGrid(): void {
        this._onGridReloaded.Dispatch(this, this);
    }

    public applyGridFiltering() {
        this.gridOptions.api.onFilterChanged()
        this._onSearchChanged.Dispatch(this, this);
        this._onRefresh.Dispatch(this, this);
    }

    private applyDataChange() {
        this.gridOptions.api.onFilterChanged()
        this._onRefresh.Dispatch(this, this);
    }

    public clearGridFiltering() {
        this.gridOptions.columnApi.getAllColumns().forEach(c => {
            c.setFilterActive(false)
        });
    }

    public clearColumnFiltering(columnIds: string[]): void {
        columnIds.forEach(c => {
            let column: Column = this.gridOptions.columnApi.getAllColumns().find(col => col.getColId() == c);
            if (column) {
                column.setFilterActive(false)
            }
        });
    }

    public hideFilterFormPopup: Function
    public hideFilterForm() {
        if (this.hideFilterFormPopup) {
            this.hideFilterFormPopup()
        }
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        let allColumns = this.gridOptions.columnApi.getAllGridColumns()
        let startIndex: number = 0;

        //  this is not quite right as it assumes that only the first column can be grouped
        //  but lets do this for now and then refine and refactor later to deal with weirder use cases
        if (ColumnHelper.isSpecialColumn(allColumns[0].getColId())) {
            startIndex++;
        }

        VisibleColumnList.forEach((column, index) => {
            let col = this.gridOptions.columnApi.getColumn(column.ColumnId)
            if (!col) {
                LoggingHelper.LogAdaptableBlotterError("Cannot find vendor column:" + column.ColumnId)
            }
            if (!col.isVisible()) {
                this.setColumnVisible(this.gridOptions.columnApi, col, true, "api")
            }
            this.moveColumn(this.gridOptions.columnApi, col, startIndex + index, "api");
        })
        allColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0).forEach((col => {
            this.setColumnVisible(this.gridOptions.columnApi, col, false, "api")
        }))
        // we need to do this to make sure agGrid and Blotter column collections are in sync
        this.setColumnIntoStore();
    }


    public setColumnIntoStore() {
        let allColumns: IColumn[] = []
        let existingColumns: IColumn[] = this.api.gridApi.getColumns();
        let vendorCols: Column[] = this.gridOptions.columnApi.getAllGridColumns()
        let quickSearchClassName = this.getQuickSearchClassName();

        vendorCols.forEach((vendorColumn) => {
            let colId: string = vendorColumn.getColId()
            if (!ColumnHelper.isSpecialColumn(colId)) {
                let existingColumn: IColumn = ColumnHelper.getColumnFromId(colId, existingColumns);
                if (existingColumn) {
                    existingColumn.Visible = vendorColumn.isVisible();
                    if (existingColumn.DataType == DataType.Unknown) {
                        existingColumn.DataType = this.getColumnDataType(vendorColumn);
                    }
                } else {
                    existingColumn = this.createColumn(vendorColumn, quickSearchClassName)
                }
                allColumns.push(existingColumn);
            }
        })
        this.dispatchAction(GridRedux.GridSetColumns(allColumns));
    }

    private createColumn(vendorColumn: Column, quickSearchClassName: string): IColumn {
        let colId: string = vendorColumn.getColId()
        let abColumn: IColumn = {
            ColumnId: colId,
            FriendlyName: this.gridOptions.columnApi.getDisplayNameForColumn(vendorColumn, 'header'),
            DataType: this.getColumnDataType(vendorColumn),
            Visible: vendorColumn.isVisible(),
            ReadOnly: this.isColumnReadonly(colId),
            Sortable: this.isColumnSortable(colId),
            Filterable: this.isColumnFilterable(colId),
        }
        this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
        this.addFiltersToVendorColumn(vendorColumn);
        return abColumn;
    }

    private addFiltersToVendorColumn(vendorColumn: Column): void {
        if (vendorColumn.getColDef().filter && this.blotterOptions.filterOptions.useAdaptableBlotterFilterForm) {
            this.createFilterWrapper(vendorColumn);
        }

        if (this.gridOptions.floatingFilter && this.blotterOptions.filterOptions.useAdaptableBlotterFloatingFilter) {
            this.createFloatingFilterWrapper(vendorColumn);
        }
    }

    private getQuickSearchClassName(): string {
        let quickSearchClassName: string = StringExtensions.IsNotNullOrEmpty(this.api.quickSearchApi.getQuickSearchStyle().ClassName) ?
            this.api.quickSearchApi.getQuickSearchStyle().ClassName :
            StyleHelper.CreateStyleName(StrategyConstants.QuickSearchStrategyId, this)
        return quickSearchClassName;
    }

    private addQuickSearchStyleToColumn(col: IColumn, quickSearchClassName: string): void {
        let blotter = this
        let cellClassRules: any = {};
        cellClassRules[quickSearchClassName] = function (params: any) {
            let columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
            let quickSearchState = blotter.api.quickSearchApi.getQuickSearchState();
            if (StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
                && (quickSearchState.DisplayAction == DisplayAction.HighlightCell
                    || quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell)) {

                let range = RangeHelper.CreateValueRangeFromOperand(quickSearchState.QuickSearchText);
                if (range) {
                    // not right but just checking...
                    if (RangeHelper.IsColumnAppropriateForRange(range.Operator, col)) {
                        let expression: Expression = ExpressionHelper.CreateSingleColumnExpression(columnId, null, null, null, [range])
                        if (ExpressionHelper.checkForExpressionFromRecord(expression, params.node, [col], blotter)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        this.setCellClassRules(cellClassRules, col.ColumnId, "QuickSearch")
    }


    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.strategies.forEach(x => {
            let menuItem = x.getPopupMenuItem()
            if (menuItem != null) {
                if (menuItems.findIndex(m => m.StrategyId == menuItem.StrategyId) == -1) {
                    menuItems.push(menuItem);
                }
            }
        })
        this.dispatchAction(MenuRedux.SetMenuItems(menuItems));
    }

    public getPrimaryKeyValueFromRecord(record: RowNode): any {
        return this.gridOptions.api.getValue(this.blotterOptions.primaryKey, record)
    }

    public gridHasCurrentEditValue(): boolean {
        if (this._currentEditor) {
            return true
        }
        return false
    }

    public getCurrentCellEditValue(): any {
        //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
        // Currently used by Shortcut to get the current edit value - is there a better way?
        if (this._currentEditor) {
            return this._currentEditor.getValue()
        }
        return ""
    }

    public getActiveCell(): ICellInfo {
        let activeCell = this.gridOptions.api.getFocusedCell()
        if (activeCell) {
            let rowNode = this.gridOptions.api.getModel().getRow(activeCell.rowIndex)
            //if the selected cell is from a group cell we don't return it
            //that's a design choice as this is used only when editing and you cant edit those cells
            if (rowNode && !rowNode.group) {
                return {
                    ColumnId: activeCell.column.getColId(),
                    Id: this.getPrimaryKeyValueFromRecord(rowNode),
                    Value: this.gridOptions.api.getValue(activeCell.column, rowNode)
                }
            }
        }
    }

    public saveGridLayout() {
        if (this.blotterOptions.layoutOptions != null && this.blotterOptions.layoutOptions.includeVendorStateInLayouts != null && this.blotterOptions.layoutOptions.includeVendorStateInLayouts) {
            LayoutHelper.autoSaveLayout(this);
        }
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    public setSelectedCells(): void {
        let selectionMap: Map<string, ISelectedCell[]> = new Map<string, ISelectedCell[]>();

        let selected = this.gridOptions.api.getRangeSelections();
        let columns: IColumn[] = []
        if (selected) {
            //we iterate for each ranges
            selected.forEach((rangeSelection, index) => {
                let y1 = Math.min(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                let y2 = Math.max(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                for (let column of rangeSelection.columns) {
                    let colId: string = column.getColId();
                    if (index == 0) {
                        let selectedColumn: IColumn = ColumnHelper.getColumnFromId(colId, this.api.gridApi.getColumns());
                        columns.push(selectedColumn);
                    }

                    for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
                        let rowNode = this.gridOptions.api.getModel().getRow(rowIndex)
                        //if the selected cells are from a group cell we don't return it
                        //that's a design choice as this is used only when editing and you cant edit those cells
                        if (rowNode && !rowNode.group) {
                            let primaryKey = this.getPrimaryKeyValueFromRecord(rowNode)
                            let value = this.gridOptions.api.getValue(column, rowNode)
                            let valueArray: ISelectedCell[] = selectionMap.get(primaryKey);
                            if (valueArray == undefined) {
                                valueArray = []
                                selectionMap.set(primaryKey, valueArray);
                            }
                            let selectedCellInfo: ISelectedCell = { columnId: colId, value: value }
                            valueArray.push(selectedCellInfo);
                        }
                    }
                }
            });
        }
        let selectedCells: ISelectedCellInfo = { Columns: columns, Selection: selectionMap }
        this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCells));

        this._onSelectedCellsChanged.Dispatch(this, this)
    }

    //We deduce the type here, as there is no way to get it through the definition
    private getColumnDataType(column: Column): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            LoggingHelper.LogAdaptableBlotterWarning('column is undefined returning String for Type')
            return DataType.String;
        }

        // get the column type if already in store (and not unknown)
        let existingColumn: IColumn = ColumnHelper.getColumnFromId(column.getId(), this.api.gridApi.getColumns());
        if (existingColumn && existingColumn.DataType != DataType.Unknown) {
            return existingColumn.DataType;
        }

        // check for column type
        let colType: any = column.getColDef().type;
        if (colType) {
            let isArray: boolean = Array.isArray(colType);
            if (isArray) {
                // do array check
                let myDatatype: DataType = DataType.Unknown;
                colType.forEach((c: string) => {
                    if (c == "numericColumn") {
                        myDatatype = DataType.Number;
                    }
                    if (c.startsWith("abColDef")) {
                        myDatatype = this.getabColDefValue(c);
                    }
                });
                if (myDatatype != DataType.Unknown) {
                    return myDatatype;
                }
            } else {
                // do string check
                if (colType == "numericColumn") {
                    return DataType.Number;
                }
                if (colType.startsWith("abColDef")) {
                    return this.getabColDefValue(colType);
                }
            }

        }

        let model = this.gridOptions.api.getModel();
        if (model == null) {
            LoggingHelper.LogAdaptableBlotterWarning('No model so returning type "Unknown" for Column: "' + column.getColId() + '"')
            return DataType.Unknown;
        }

        let row = model.getRow(0);

        if (row == null) { // possible that there will be no data.
            LoggingHelper.LogAdaptableBlotterWarning('No data in grid so returning type "Unknown" for Column: "' + column.getColId() + '"')
            return DataType.Unknown;
        }
        //if it's a group we need the content of the group
        if (row.group) {
            let childNodes: RowNode[] = row.childrenAfterGroup;
            if (ArrayExtensions.IsNullOrEmpty(childNodes)) {
                LoggingHelper.LogAdaptableBlotterWarning('No data in grid so returning type "Unknown" for Column: "' + column.getColId() + '"')
                return DataType.Unknown;
            }
            row = childNodes[0];
        }
        let value = this.gridOptions.api.getValue(column, row)
        let dataType: DataType
        if (value instanceof Date) {
            dataType = DataType.Date
        }
        else {
            switch (typeof value) {
                case 'string':
                    dataType = DataType.String;
                    break
                case 'number':
                    dataType = DataType.Number;
                    break
                case 'boolean':
                    dataType = DataType.Boolean;
                    break
                case 'object':
                    dataType = DataType.Object;
                    break
                default:
                    break;
            }
        }
        LoggingHelper.LogAdaptableBlotterWarning("No defined type for column '" + column.getColId() + "'. Defaulting to type of first value: " + dataType)
        return dataType
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


    public setValue(cellInfo: ICellInfo): void {
        if (this.useRowNodeLookUp) {
            let rowNode: RowNode = this.gridOptions.api.getRowNode(cellInfo.Id);
            if (rowNode != null) {
                this.updateValue(cellInfo, rowNode);
            }
        } else {
            let isUpdated: boolean = false;
            // prefer not to use this method but if we do then at least we can prevent further lookups once we find
            this.gridOptions.api.getModel().forEachNode(rowNode => {
                if (!isUpdated) {
                    if (cellInfo.Id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                        this.updateValue(cellInfo, rowNode);
                        isUpdated = true;
                    }
                }
            })
        }
        this.filterOnUserDataChange();
        this.gridOptions.api.clearRangeSelection();
    }

    private updateValue(cellInfo: ICellInfo, rowNode: RowNode): void {
        let oldValue = this.gridOptions.api.getValue(cellInfo.ColumnId, rowNode)
        rowNode.setDataValue(cellInfo.ColumnId, cellInfo.Value)

        let dataChangedEvent: IDataChangedInfo =
        {
            OldValue: oldValue,
            NewValue: cellInfo.Value,
            ColumnId: cellInfo.ColumnId,
            IdentifierValue: cellInfo.Id,
            Record: null
        }
        if (this.AuditLogService.IsAuditCellEditsEnabled) {
            this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
        }
        this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedEvent)
        this.DataService.CreateDataChangedEvent(dataChangedEvent);
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
 if (ArrayExtensions.IsNullOrEmpty(batchValues)) {
            return;
        }

        var dataChangedEvents: IDataChangedInfo[] = []
        let nodesToRefresh: RowNode[] = []
        let refreshColumnList: string[] = []
        let percentBars: IPercentBar[] = this.api.percentBarApi.getAllPercentBar();

        // now two ways to do this - one using pk lookup and other using foreach on row node
        if (this.useRowNodeLookUp) {
            batchValues.forEach((cellInfo: ICellInfo) => {
                let rowNode: RowNode = this.gridOptions.api.getRowNode(cellInfo.Id);
                if (rowNode) {
                    this.updateBatchValue(cellInfo, rowNode, nodesToRefresh, refreshColumnList, dataChangedEvents, percentBars);
                }
            });
        } else {
           this.gridOptions.api.getModel().forEachNode((rowNode: RowNode) => {
                let cellInfo: ICellInfo = batchValues.find(x => x.Id == this.getPrimaryKeyValueFromRecord(rowNode))
                if (cellInfo) {
                    this.updateBatchValue(cellInfo, rowNode, nodesToRefresh, refreshColumnList, dataChangedEvents, percentBars);
                }
            })
        }

        if (this.AuditLogService.IsAuditCellEditsEnabled) {
            this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        }
        this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents)
        dataChangedEvents.forEach(dc => this.DataService.CreateDataChangedEvent(dc));

        this.filterOnUserDataChange();
        this.gridOptions.api.clearRangeSelection();
        nodesToRefresh.forEach(node => {
            this.refreshCells(node, refreshColumnList)
        })
    }

    private updateBatchValue(cellInfo: ICellInfo, rowNode: RowNode, nodesToRefresh: RowNode[], refreshColumnList: string[], dataChangedEvents: IDataChangedInfo[], percentBars: IPercentBar[]): void {
        let colId: string = cellInfo.ColumnId;
        refreshColumnList.push(colId);
        nodesToRefresh.push(rowNode);

        ArrayExtensions.AddItem(refreshColumnList, colId);

        let oldValue = this.gridOptions.api.getValue(colId, rowNode)

        var data: any = rowNode.data;
        data[colId] = cellInfo.Value;

        let dataChangedEvent: IDataChangedInfo = {
            OldValue: oldValue,
            NewValue: cellInfo.Value,
            ColumnId: colId,
            IdentifierValue: cellInfo.Id,
            Record: null
        }
        dataChangedEvents.push(dataChangedEvent)

        // check if any calc columns need to refresh
        let columnList = this.calculatedColumnPathMap.get(colId);
        if (columnList) {
            columnList.forEach(calcColumn => {
                ArrayExtensions.AddItem(refreshColumnList, calcColumn);
            });
        }

        // see if we need to refresh any percent bars
        percentBars.forEach(pb => {
            refreshColumnList.forEach(changedColId => {
                if (StringExtensions.IsNotNullOrEmpty(pb.MaxValueColumnId) && pb.MaxValueColumnId == changedColId) {
                    ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
                }
                if (StringExtensions.IsNotNullOrEmpty(pb.MinValueColumnId) && pb.MinValueColumnId == changedColId) {
                    ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
                }
            })
        })
    }

    public cancelEdit() {
        this.gridOptions.api.stopEditing(true)
    }

    public getRecordIsSatisfiedFunction(id: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any {
        if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
            let rowNode: RowNode
            if (this.useRowNodeLookUp) {
                rowNode = this.gridOptions.api.getRowNode(id);
            } else {
                let foundRow: boolean = false;
                this.gridOptions.api.getModel().forEachNode(node => {
                    if (!foundRow && id == this.getPrimaryKeyValueFromRecord(node)) {
                        rowNode = node
                        foundRow = true;
                    }
                })
            }
            return (columnId: string) => { return this.gridOptions.api.getValue(columnId, rowNode); }
        }
        else {
            return (columnId: string) => { return this.getDisplayValue(id, columnId); }
        }
    }

    public getRecordIsSatisfiedFunctionFromRecord(record: RowNode, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any {
        if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
            return (columnId: string) => { return this.gridOptions.api.getValue(columnId, record) }
        } else {
            return (columnId: string) => { return this.getDisplayValueFromRecord(record, columnId); }
        }
    }

    private isColumnReadonly(columnId: string): boolean {
        //same as hypergrid. we do not support the fact that some rows are editable and some are not
        //if editable is a function then we return that its not readonly since we assume that some record will be editable
        //that's wrong but we ll see if we face the issue later
        let colDef = this.gridOptions.api.getColumnDef(columnId)
        if (colDef && typeof colDef.editable == 'boolean') {
            return !colDef.editable;
        }
        else {
            return true
        }
    }

    private isColumnSortable(columnId: string): boolean {
        // follow agGrid logic which is that ONLY if sortable explicitly set to false do you suppress sort
        let colDef: ColDef = this.gridOptions.api.getColumnDef(columnId)
        if (colDef.sortable != null) {
            return colDef.sortable;
        }
        return true;
    }

    private isColumnFilterable(columnId: string): boolean {
        // follow agGrid logic which is that ONLY filterable if one explicitly set
        let colDef: ColDef = this.gridOptions.api.getColumnDef(columnId)
        return colDef.filter != null && colDef.filter != false;
    }

    public setCustomSort(columnId: string, comparer: Function): void {
        let sortModel = this.gridOptions.api.getSortModel()
        let columnDef = this.gridOptions.api.getColumnDef(columnId);

        if (columnDef) {
            columnDef.comparator = <any>comparer
        }
        this.gridOptions.api.setSortModel(sortModel)
    }

    public removeCustomSort(columnId: string): void {
        let sortModel = this.gridOptions.api.getSortModel()
        let columnDef = this.gridOptions.api.getColumnDef(columnId);

        if (columnDef) {
            columnDef.comparator = null
        }
        this.gridOptions.api.setSortModel(sortModel)
    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue, visibleRowsOnly: boolean): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();

        // check if there are permitted column values for that column
        // NB.  this is currently a bug as we dont check for visibility so if using permitted values then ALL are returned :(
        let permittedValuesForColumn: IPermittedColumnValues = this.api.userInterfaceApi.getPermittedValuesForColumn(columnId)
        if (permittedValuesForColumn != undefined) {
            permittedValuesForColumn.PermittedValues.forEach(pv => {
                returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
            })
        } else {
            let useRawValue: boolean = this.useRawValueForColumn(columnId);
            if (visibleRowsOnly) {
                this.gridOptions.api.forEachNodeAfterFilter((rowNode: RowNode) => {
                    this.addDistinctColumnValue(rowNode, columnId, useRawValue, distinctCriteria, returnMap);
                });
            } else {
                this.gridOptions.api.forEachNode(rowNode => {
                    this.addDistinctColumnValue(rowNode, columnId, useRawValue, distinctCriteria, returnMap);
                })
            }
        }
        return Array.from(returnMap.values()).slice(0, this.blotterOptions.queryOptions.maxColumnValueItemsDisplayed);
    }


    private addDistinctColumnValue(rowNode: RowNode, columnId: string, useRawValue: boolean, distinctCriteria: DistinctCriteriaPairValue, returnMap: Map<string, IRawValueDisplayValuePair>): void {
        //we do not return the values of the aggregates when in grouping mode
        //otherwise they wxould appear in the filter dropdown etc....
        if (!rowNode.group) {
            let rawValue = this.gridOptions.api.getValue(columnId, rowNode)
            let displayValue = (useRawValue) ?
                Helper.StringifyValue(rawValue) :
                this.getDisplayValueFromRecord(rowNode, columnId);
            if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            } else {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
        }
    }


    private useRawValueForColumn(columnId: string): boolean {
        // will add more in due course I'm sure but for now only percent bar columns return false...
        let percentBars: IPercentBar[] = this.api.percentBarApi.getAllPercentBar();
        if (ArrayExtensions.IsEmpty(percentBars)) {
            return false;
        }
        return ArrayExtensions.ContainsItem(percentBars.map(pb => { return pb.ColumnId }), columnId);
    }

    public getDisplayValue(id: any, columnId: string): string {
        let returnValue: string

        if (this.useRowNodeLookUp) {
            let rowNode: RowNode = this.gridOptions.api.getRowNode(id);
            returnValue = this.getDisplayValueFromRecord(rowNode, columnId);
        } else {
            let foundRow: boolean = false;
            this.gridOptions.api.getModel().forEachNode(rowNode => {
                if (!foundRow && id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                    returnValue = this.getDisplayValueFromRecord(rowNode, columnId);
                    foundRow = true;
                }
            })
        }
        return returnValue
    }

    public getDisplayValueFromRecord(row: RowNode, columnId: string): string {
        if (row == null) {
            return ""
        }
        let rawValue = this.gridOptions.api.getValue(columnId, row)
        if (this.useRawValueForColumn(columnId)) {
            return Helper.StringifyValue(rawValue);
        }
        return this.getDisplayValueFromRawValue(columnId, rawValue);
    }

    public getDisplayValueFromRawValue(columnId: string, rawValue: any): any {
        let colDef = this.gridOptions.api.getColumnDef(columnId)
        if (colDef.valueFormatter) {
            let column = this.gridOptions.columnApi.getAllColumns().find(c => c.getColId() == columnId)
            let formatter = colDef.valueFormatter
            let params: ValueFormatterParams = {
                value: rawValue,
                node: null,
                data: null,
                colDef: colDef,
                column: column,
                api: this.gridOptions.api,
                columnApi: this.gridOptions.columnApi,
                context: null
            }
            let formattedValue = formatter(params)
            if (colDef.cellRenderer) {
                return this.getRenderedValue(colDef, formattedValue);
            }
            return formattedValue || ""
        }
        else if (colDef.cellRenderer) {
            return this.getRenderedValue(colDef, rawValue);
        }
        else {
            return this.agGridHelper.getCleanValue(rawValue);
        }
    }

    private getRenderedValue(colDef: ColDef, valueToRender: any): string {
        return this.agGridHelper.getRenderedValue(this.api.percentBarApi.getAllPercentBar(), colDef, valueToRender);
    }


    public getRawValueFromRecord(row: RowNode, columnId: string): any {
        return this.gridOptions.api.getValue(columnId, row);
    }

    public setCellClassRules(cellClassRules: any, columnId: string, type: "ConditionalStyle" | "QuickSearch" | "FlashingCell" | "FormatColumn") {
        let localCellClassRules = this.gridOptions.columnApi.getColumn(columnId).getColDef().cellClassRules

        if (localCellClassRules) {

            if (type == "FormatColumn") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyConstants.FormatColumnStrategyId)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            else if (type == "ConditionalStyle") {
                let cssStyles: string[] = this.api.conditionalStyleApi.getAllConditionalStyle().map(c => c.Style.ClassName);
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyConstants.ConditionalStyleStrategyId) || ArrayExtensions.ContainsItem(cssStyles, prop)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            //Is initialized in setColumnIntoStore
            else if (type == "QuickSearch") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyConstants.QuickSearchStrategyId)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            //Is initialized in Flash
            else if (type == "FlashingCell") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StyleConstants.FLASH_UP_STYLE)) {
                        delete localCellClassRules[prop]
                    }
                    if (prop.includes(StyleConstants.FLASH_DOWN_STYLE)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            for (let prop in cellClassRules) {
                localCellClassRules[prop] = cellClassRules[prop]
            }
        }
        else {
            this.gridOptions.columnApi.getColumn(columnId).getColDef().cellClassRules = cellClassRules;
        }
    }

    public forAllRecordsDo(func: (record: any) => any) {
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            func(rowNode)
        });
    }

    public forAllVisibleRecordsDo(func: (record: any) => any) {
        this.gridOptions.api.forEachNodeAfterFilterAndSort(rowNode => {
            func(rowNode)
        });
    }

    public redraw() {
        this.gridOptions.api.redrawRows();
        this.gridOptions.api.refreshHeader();
        this._onRefresh.Dispatch(this, this)
    }

    public testredrawRow(rowNode: RowNode) {
        this.gridOptions.api.redrawRows({ rowNodes: [rowNode] });
    }

    public refreshCells(rowNode: RowNode, columnIds: string[]) {
        this.gridOptions.api.refreshCells({ rowNodes: [rowNode], columns: columnIds, force: true });
        //     this.gridOptions.api.flashCells({ rowNodes: [rowNode], columns: columnIds });
    }

    public editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void {
        // first change the value getter in the coldefs - nothing else needs to change
        let colDefs: ColDef[] = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef())
        let colDefIndex = colDefs.findIndex(x => x.headerName == calculatedColumn.ColumnId)
        let cols: IColumn[] = this.api.gridApi.getColumns();
        let cleanedExpression: string = CalculatedColumnHelper.cleanExpressionColumnNames(calculatedColumn.ColumnExpression, cols);

        let newColDef: ColDef = colDefs[colDefIndex];
        newColDef.valueGetter = (params: ValueGetterParams) => Helper.RoundValueIfNumeric(this.CalculatedColumnExpressionService.ComputeExpressionValue(cleanedExpression, params.node), 4);

        colDefs[colDefIndex] = newColDef
        this.agGridHelper.safeSetColDefs(colDefs);

        // for column list its an itnernal map only so we can first delete
        for (let columnList of this.calculatedColumnPathMap.values()) {
            let index = columnList.indexOf(calculatedColumn.ColumnId);
            if (index > -1) {
                columnList.splice(index, 1);
            }
        }
        // and then add
        let columnList = CalculatedColumnHelper.getColumnListFromExpression(cleanedExpression)
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column)
            if (!childrenColumnList) {
                childrenColumnList = []
                this.calculatedColumnPathMap.set(column, childrenColumnList)
            }
            childrenColumnList.push(calculatedColumn.ColumnId)
        }
    }

    public removeCalculatedColumnFromGrid(calculatedColumnID: string) {
        let colDefs: ColDef[] = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef())
        let colDefIndex = colDefs.findIndex(x => x.headerName == calculatedColumnID)
        if (colDefIndex > -1) {
            colDefs.splice(colDefIndex, 1)
            this.agGridHelper.safeSetColDefs(colDefs);
        }
        for (let columnList of this.calculatedColumnPathMap.values()) {
            let index = columnList.indexOf(calculatedColumnID);
            if (index > -1) {
                columnList.splice(index, 1);
            }
        }
        this.setColumnIntoStore();
    }

    public addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn) {
        let venderCols = this.gridOptions.columnApi.getAllColumns()
        let colDefs: ColDef[] = venderCols.map(x => x.getColDef())

        let cols: IColumn[] = this.api.gridApi.getColumns();
        let cleanedExpression: string = CalculatedColumnHelper.cleanExpressionColumnNames(calculatedColumn.ColumnExpression, cols);

        let newColDef: ColDef = {
            headerName: calculatedColumn.ColumnId,
            colId: calculatedColumn.ColumnId,
            hide: true,
            enableValue: true, // makes the column 'summable'
            editable: false,
            filter: 'agTextColumnFilter',
            valueGetter: (params: ValueGetterParams) => Helper.RoundValueIfNumeric(this.CalculatedColumnExpressionService.ComputeExpressionValue(cleanedExpression, params.node), 4)
        }

        colDefs.push(newColDef);
        this.agGridHelper.safeSetColDefs(colDefs);

        let columnList = CalculatedColumnHelper.getColumnListFromExpression(cleanedExpression)
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column)
            if (!childrenColumnList) {
                childrenColumnList = []
                this.calculatedColumnPathMap.set(column, childrenColumnList)
            }
            childrenColumnList.push(calculatedColumn.ColumnId)
        }
        this.addSpecialColumnToState(calculatedColumn.ColumnId, true);
    }

    public addFreeTextColumnToGrid(freeTextColumn: IFreeTextColumn) {
        let venderCols: Column[] = this.gridOptions.columnApi.getAllColumns()
        let colDefs: ColDef[] = venderCols.map(x => x.getColDef())
        let newColDef: ColDef = {
            headerName: freeTextColumn.ColumnId,
            colId: freeTextColumn.ColumnId,
            editable: true,
            hide: true,
            valueGetter: (params: ValueGetterParams) => this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, params.node)
        }
        colDefs.push(newColDef);
        this.agGridHelper.safeSetColDefs(colDefs);

        this.addSpecialColumnToState(freeTextColumn.ColumnId, false);
    }

    private addSpecialColumnToState(columnId: string, isReadOnly: boolean): void {
        let vendorColumn = this.gridOptions.columnApi.getAllColumns().find(vc => vc.getColId() == columnId)

        let specialColumn: IColumn = {
            ColumnId: columnId,
            FriendlyName: columnId,
            DataType: this.getColumnDataType(vendorColumn),
            Visible: false,
            ReadOnly: isReadOnly,
            Sortable: true,
            Filterable: true, // why not?  need to test...
        }

        if (this.isFloatingFilterActive()) {
            this.createFloatingFilterWrapper(vendorColumn);
            this.gridOptions.api.refreshHeader();
        }

        this.dispatchAction(GridRedux.GridAddColumn(specialColumn));

        let quickSearchClassName = this.getQuickSearchClassName();
        this.addQuickSearchStyleToColumn(specialColumn, quickSearchClassName);

        this.addFiltersToVendorColumn(vendorColumn);

        if (this.isInitialised) {
            let conditionalStyleagGridStrategy: IConditionalStyleStrategy = this.strategies.get(StrategyConstants.ConditionalStyleStrategyId) as IConditionalStyleStrategy;
            conditionalStyleagGridStrategy.InitStyles();
        }
    }

    public isGroupRecord(record: any): boolean {
        let rowNode: RowNode = record as RowNode
        return rowNode.group;
    }

    public getFirstRecord() {
        // TODO: we can find a better way but its only used by Calccolumn on creation so not urgent
        let record: RowNode
        this.gridOptions.api.forEachNode(rowNode => {
            if (!rowNode.group) {
                if (!record) {
                    record = rowNode
                }
            }
        })
        return record;
    }

    // need to destroy more than just this... 
    // TODO;  manage destruction properly
    destroy() {
        if (this.abContainerElement != null) {
            ReactDOM.unmountComponentAtNode(this.abContainerElement);
        }
    }

    //TEMPORARY : JO
    public getIPPStyle(): IPPStyle {
        let headerFirstCol: HTMLElement = document.querySelectorAll(".ag-header-cell").item(0) as HTMLElement
        let header: HTMLElement = document.querySelector(".ag-header") as HTMLElement
        let headerColStyle = window.getComputedStyle(header, null)
        let firstRow: HTMLElement = document.querySelector(".ag-row-even") as HTMLElement
        let firstRowStyle = window.getComputedStyle(firstRow, null)
        let secondRow: HTMLElement = document.querySelector(".ag-row-odd") as HTMLElement
        let secondRowStyle = window.getComputedStyle(secondRow, null)
        return {
            Header: {
                headerColor: new Color(headerColStyle.color).toHex(),
                headerBackColor: new Color(headerColStyle.backgroundColor).toHex(),
                headerFontFamily: headerColStyle.fontFamily,
                headerFontSize: headerColStyle.fontSize,
                headerFontStyle: headerColStyle.fontStyle,
                headerFontWeight: headerColStyle.fontWeight,
                height: Number(headerColStyle.height.replace("px", "")),
                Columns: this.api.gridApi.getColumns().map(col => {
                    let headerColumn: HTMLElement = document.querySelector(".ag-header-cell[col-id='" + col.ColumnId + "']") as HTMLElement
                    let headerColumnStyle = window.getComputedStyle(headerColumn || headerFirstCol, null)
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign }
                })
            },
            Row: {
                color: new Color(firstRowStyle.color).toHex(),
                backColor: new Color(firstRowStyle.backgroundColor).toHex(),
                altBackColor: new Color(secondRowStyle.backgroundColor).toHex(),
                fontFamily: firstRowStyle.fontFamily,
                fontSize: firstRowStyle.fontSize,
                fontStyle: firstRowStyle.fontStyle,
                fontWeight: firstRowStyle.fontWeight,
                height: Number(firstRowStyle.height.replace("px", "")),
                Columns: this.api.gridApi.getColumns().map(col => {
                    let cellElement: HTMLElement = document.querySelector(".ag-cell[col-id='" + col.ColumnId + "']") as HTMLElement
                    let headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null)
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign }
                })
            },

        }
    }

    private initInternalGridLogic() {
        if (this.abContainerElement == null) {
            this.abContainerElement = document.getElementById(this.blotterOptions.containerOptions.adaptableBlotterContainer);
        }
        if (this.abContainerElement == null) {
            LoggingHelper.LogAdaptableBlotterError("There is no Div called " + this.blotterOptions.containerOptions.adaptableBlotterContainer + " so cannot render the Adaptable Blotter")
            return
        }

        let gridContainerElement = document.getElementById(this.blotterOptions.containerOptions.vendorContainer);
        if (gridContainerElement) {
            gridContainerElement.addEventListener("keydown", (event) => this._onKeyDown.Dispatch(this, event));
        }

        // vendorGrid.api.addGlobalListener((type: string, event: any) => {
        //     //console.log(event)
        // });
        //we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type
        //since there are many events and we want them to behave the same
        this.gridOptions.api.addEventListener(Events.EVENT_COLUMN_VISIBLE, (params: any) => {
            if (params.visible) {
                this.updateQuickSearchRangeVisibleColumn(params.column.colId);
            }
        })

        let columnEventsThatTriggersStateChange = [
            Events.EVENT_COLUMN_MOVED,
            Events.EVENT_GRID_COLUMNS_CHANGED,
            Events.EVENT_COLUMN_EVERYTHING_CHANGED,
            Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
            //   Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            Events.EVENT_COLUMN_VISIBLE,
            //   Events.EVENT_COLUMN_PINNED,
            Events.EVENT_NEW_COLUMNS_LOADED
        ];
        this.gridOptions.api.addGlobalListener((type: string) => {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                // bit messy but better than alternative which was calling setColumnIntoStore for every single column
                let popupState = this.getState().Popup.ScreenPopup;
                if (popupState.ShowScreenPopup && (popupState.ComponentName == ScreenPopups.ColumnChooserPopup || ScreenPopups.CalculatedColumnPopup)) {
                    // ignore
                } else {
                    // set the column into the store
                    this.debouncedSetColumnIntoStore() // was: this.setColumnIntoStore();

                }
                // refilter the grid if required
                this.debouncedFilterGrid();
            }
        });
        // dealing with scenario where the data is poured into the blotter after grid has been setup
        this.gridOptions.api.addEventListener(Events.EVENT_FIRST_DATA_RENDERED, () => {
            this.debouncedSetColumnIntoStore();
        });
        // once the grid is ready we should make sure we are too
        this.gridOptions.api.addEventListener(Events.EVENT_GRID_READY, () => {
            // do something?
        });
        // Pinning columms and changing column widths will trigger an auto save (if that and includvendorstate are both turned on)
        let columnEventsThatTriggersAutoLayoutSave = [
            Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            Events.EVENT_COLUMN_PINNED
        ];
        this.gridOptions.api.addGlobalListener((type: string) => {
            if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
                this.debouncedSaveGridLayout();
            }

        });

        // this event deals with when the user makes an edit - it doesnt look at ticking data
        this.gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
            //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
            let editor = (<any>this.gridOptions.api).rowRenderer.rowCompsByIndex[params.node.rowIndex].cellComps[params.column.getColId()].cellEditor;
            //No need to register for the keydown on the editor since we already register on the main div
            //TODO: check that it works when edit is popup. That's why I left the line below
            //editor.getGui().addEventListner("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = editor;



            //if there was already an implementation set by the dev we keep the reference to it and execute it at the end
            let oldIsCancelAfterEnd = this._currentEditor.isCancelAfterEnd;
            let isCancelAfterEnd = () => {


                let dataChangedInfo: IDataChangedInfo = {
                    OldValue: this.gridOptions.api.getValue(params.column.getColId(), params.node),
                    NewValue: this._currentEditor.getValue(),
                    ColumnId: params.column.getColId(),
                    IdentifierValue: this.getPrimaryKeyValueFromRecord(params.node),
                    Record: null
                }

                let failedRules: ICellValidationRule[] = this.ValidationService.ValidateCellChanging(dataChangedInfo);
                if (failedRules.length > 0) {
                    // first see if its an error = should only be one item in array if so
                    if (failedRules[0].ActionMode == "Stop Edit") {
                        let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                        this.api.alertApi.showAlertError("Validation Error", errorMessage, true)
                        return true;
                    }
                    else {
                        let warningMessage: string = "";
                        failedRules.forEach(f => {
                            warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this) + "\n";
                        });
                        let cellInfo: ICellInfo = {
                            Id: dataChangedInfo.IdentifierValue,
                            ColumnId: dataChangedInfo.ColumnId,
                            Value: dataChangedInfo.NewValue
                        };

                        let confirmAction: Redux.Action = GridRedux.GridSetValueLikeEdit(cellInfo, this.gridOptions.api.getValue(params.column.getColId(), params.node));
                        let cancelAction: Redux.Action = null;
                        let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(confirmAction, cancelAction, warningMessage);

                        this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
                        //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                        return true;
                    }

                }
                let whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false;
                if (!whatToReturn) {

                    // audit the cell event if needed
                    if (this.AuditLogService.IsAuditCellEditsEnabled) {
                        this.AuditLogService.AddEditCellAuditLog(dataChangedInfo);
                    }
                    // it might be a free text column so we need to update the values
                    this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedInfo);

                    // do we need to also refresh calculated columns?
                }
                return whatToReturn;
            };
            this._currentEditor.isCancelAfterEnd = isCancelAfterEnd;

        });
        this.gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, () => {

            //(<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = null;
            //We refresh the filter so we get live search/filter when editing.
            //Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb

            // if they have set to run filter after edit then lets do it
            this.filterOnUserDataChange();
            this.debouncedSetSelectedCells();

        });
        this.gridOptions.api.addEventListener(Events.EVENT_SELECTION_CHANGED, () => {
            this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(Events.EVENT_RANGE_SELECTION_CHANGED, () => {
            this.debouncedSetSelectedCells();
        });
        // this.gridOptions.api.addEventListener(Events.EVENT_TOOL_PANEL_VISIBLE_CHANGED, () => {
        // });





        //  this.gridOptions.api.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGED, (params: any) => {
        //     console.log(params)
        // });
        this.gridOptions.api.addEventListener(Events.EVENT_SORT_CHANGED, () => {
            this.onSortChanged()
            this.debouncedSetSelectedCells();
        });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_UPDATED, (params: any) => {
        //  });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_CHANGED, (params: any) => {
        //});
        this.gridOptions.api.addEventListener(Events.EVENT_MODEL_UPDATED, () => {
            // not sure about this - doing it to make sure that we set the columns properly at least once!
            this.checkColumnsDataTypeSet();

        });

        // this handles ticking data
        this.gridOptions.api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, (params: NewValueParams) => {
            let identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
            let colId: string = params.colDef.field;
            let dataChangedInfo: IDataChangedInfo = {
                OldValue: params.oldValue,
                NewValue: params.newValue,
                ColumnId: colId,
                IdentifierValue: identifierValue,
                Record: params.node
            }
            this.DataService.CreateDataChangedEvent(dataChangedInfo);
            //24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
            //so we manually raise.
            //https://github.com/JonnyAdaptableTools/adaptableblotter/issues/118
            let refreshColumnList: string[] = [colId]
            let columnList = this.calculatedColumnPathMap.get(colId);
            if (columnList) {
                columnList.forEach(columnId => {
                    let dataChangedInfo: IDataChangedInfo = {
                        OldValue: params.oldValue,
                        NewValue: this.gridOptions.api.getValue(columnId, params.node),
                        ColumnId: columnId,
                        IdentifierValue: identifierValue,
                        Record: params.node
                    }
                    this.DataService.CreateDataChangedEvent(dataChangedInfo);
                    ArrayExtensions.AddItem(refreshColumnList, columnId);
                });
            }

            // see if we need to refresh any percent bars
            this.api.percentBarApi.getAllPercentBar().forEach(pb => {
                refreshColumnList.forEach(changedColId => {
                    if (StringExtensions.IsNotNullOrEmpty(pb.MaxValueColumnId) && pb.MaxValueColumnId == changedColId) {
                        ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
                    }
                    if (StringExtensions.IsNotNullOrEmpty(pb.MinValueColumnId) && pb.MinValueColumnId == changedColId) {
                        ArrayExtensions.AddItem(refreshColumnList, pb.ColumnId);
                    }
                })
            })

            // this is new  - giving users ability to filter on external data changes
            this.filterOnExternalDataChange();

            // only if visible...
            this.refreshCells(params.node, refreshColumnList);
        });


        //We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
        let originalisExternalFilterPresent = this.gridOptions.isExternalFilterPresent;
        this.gridOptions.isExternalFilterPresent = () => {
            let columnFilters: IColumnFilter[] = this.getState().ColumnFilter.ColumnFilters;
            let isFilterActive = ArrayExtensions.IsNotNullOrEmpty(columnFilters);
            if (isFilterActive) {
                //used in particular at init time to show the filter icon correctly
                for (let colFilter of columnFilters) {
                    let agGridCol = this.gridOptions.columnApi.getColumn(colFilter.ColumnId);
                    if (agGridCol) {
                        if (!agGridCol.isFilterActive()) {
                            agGridCol.setFilterActive(true);
                        }
                    }
                }
            }
            let isSearchActive = StringExtensions.IsNotNullOrEmpty(this.getState().AdvancedSearch.CurrentAdvancedSearch);
            let isQuickSearchActive = StringExtensions.IsNotNullOrEmpty(this.getState().QuickSearch.QuickSearchText);
            //it means that originaldoesExternalFilterPass will be called to we reinit that collection
            return isFilterActive || isSearchActive || isQuickSearchActive || (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false);
        };
        let originaldoesExternalFilterPass = this.gridOptions.doesExternalFilterPass;
        this.gridOptions.doesExternalFilterPass = (node: RowNode) => {
            let columns = this.api.gridApi.getColumns();

            //first we assess AdvancedSearch (if its running locally)
            if (this.blotterOptions.generalOptions.serverSearchOption == 'None') {
                let currentSearchName = this.getState().AdvancedSearch.CurrentAdvancedSearch;
                if (StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                    // Get the actual Advanced Search object and check it exists
                    let currentSearch = this.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
                    if (currentSearch) {
                        // See if our record passes the Expression - using Expression Helper; if not then return false
                        if (!ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, node, columns, this)) {
                            // if (!ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, this)) {
                            return false;
                        }
                    }
                }
            }
            //we then assess filters
            if (this.blotterOptions.generalOptions.serverSearchOption == 'None' || this.blotterOptions.generalOptions.serverSearchOption == 'AdvancedSearch') {
                let columnFilters: IColumnFilter[] = this.api.columnFilterApi.getAllColumnFilter();
                if (columnFilters.length > 0) {
                    for (let columnFilter of columnFilters) {
                        if (!ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, node, columns, this)) {
                            return false;
                        }
                    }
                }
                //we next assess quicksearch
                let quickSearchState: QuickSearchState = this.api.quickSearchApi.getQuickSearchState();
                if (quickSearchState.DisplayAction != DisplayAction.HighlightCell) {
                    if (StringExtensions.IsNullOrEmpty(quickSearchState.QuickSearchText)) {
                        return true;
                    }
                    let quickSearchVisibleColumnExpresssions: Expression[] = this.getState().System.QuickSearchVisibleColumnExpressions;
                    let quickSearchRange = this.getState().System.QuickSearchRange;
                    if (quickSearchRange == null) { // might not have created so lets do it here
                        quickSearchRange = RangeHelper.CreateValueRangeFromOperand(quickSearchState.QuickSearchText);
                    }
                    if (quickSearchRange != null) {
                        let visibleCols = columns.filter(c => c.Visible);
                        for (let column of visibleCols) {
                            let expression = quickSearchVisibleColumnExpresssions.find(exp => exp.RangeExpressions[0].ColumnId == column.ColumnId);
                            if (expression) {
                                if (ExpressionHelper.checkForExpressionFromRecord(expression, node, [column], this)) {
                                    return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
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

        let originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
        this.gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
            //couldnt find a way to listen for menu close. There is a Menu Item Select
            //but you can also clsoe the menu from filter and clicking outside the menu....
            let colId: string = params.column.getColId()

            this.dispatchAction(MenuRedux.ClearColumnContextMenu());
            let column: IColumn = ColumnHelper.getColumnFromId(colId, this.api.gridApi.getColumns());
            if (column != null) {
                this.strategies.forEach(s => {
                    s.addContextMenuItem(column)
                })
            }

            let colMenuItems: (string | MenuItemDef)[];
            //if there was an initial implementation we init the list of menu items with this one, otherwise we take
            //the default items
            if (originalgetMainMenuItems) {
                let originalMenuItems = originalgetMainMenuItems(params);
                colMenuItems = originalMenuItems.slice(0);
            }
            else {
                colMenuItems = params.defaultItems.slice(0);
            }
            colMenuItems.push('separator');
            this.getState().Menu.ContextMenu.Items.forEach(x => {
                let glyph = this.abContainerElement.ownerDocument.createElement("span");
                glyph.className = "glyphicon glyphicon-" + x.GlyphIcon;
                colMenuItems.push({
                    name: x.Label,
                    action: () => this.dispatchAction(x.Action),
                    icon: glyph
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

    }

    public addPercentBar(pcr: IPercentBar): void {
        let renderedColumn = ColumnHelper.getColumnFromId(pcr.ColumnId, this.api.gridApi.getColumns());
        if (renderedColumn) {
            let cellRendererFunc: ICellRendererFunc = this.agGridHelper.createCellRendererFunc(pcr, this.blotterOptions.blotterId);
            let vendorGridColumn: Column = this.gridOptions.columnApi.getColumn(pcr.ColumnId);
            let coldDef: ColDef = vendorGridColumn.getColDef();
            coldDef.cellRenderer = cellRendererFunc;
            // change the style from number-cell temporarily?
            if (coldDef.cellClass == 'number-cell') {
                coldDef.cellClass = 'number-cell-changed';
            }
        }
    }

    public removePercentBar(pcr: IPercentBar): void {
        let renderedColumn = ColumnHelper.getColumnFromId(pcr.ColumnId, this.api.gridApi.getColumns())
        if (renderedColumn) {
            let vendorGridColumn: Column = this.gridOptions.columnApi.getColumn(pcr.ColumnId);
            // note we dont get it from the original (but I guess it will be applied next time you run...)
            vendorGridColumn.getColDef().cellRenderer = null;
            let coldDef: ColDef = vendorGridColumn.getColDef();
            coldDef.cellRenderer = null;
            // change the style back if it was changed by us
            if (coldDef.cellClass == 'number-cell-changed') {
                coldDef.cellClass = 'number-cell';
            }
        }
    }

    public editPercentBar(pcr: IPercentBar): void {
        this.removePercentBar(pcr);
        this.addPercentBar(pcr);
    }

    private onSortChanged(): void {
        let sortModel: any[] = this.gridOptions.api.getSortModel();

        let gridSorts: IGridSort[] = [];
        if (sortModel != null) {
            if (sortModel.length > 0) {
                sortModel.forEach(sm => {
                    if (ColumnHelper.isSpecialColumn(sm.colId)) {
                        let groupedColumn: Column = this.gridOptions.columnApi.getAllColumns().find(c => c.isRowGroupActive() == true)
                        if (groupedColumn) {
                            let customSort: ICustomSort = this.api.customSortApi.getAllCustomSort().find(cs => cs.ColumnId == groupedColumn.getColId());
                            if (customSort) {
                                // check that not already applied
                                if (!this.getState().Grid.GridSorts.find(gs => ColumnHelper.isSpecialColumn(gs.Column))) {
                                    let customSortStrategy: CustomSortStrategyagGrid = this.strategies.get(StrategyConstants.CustomSortStrategyId) as CustomSortStrategyagGrid;
                                    let groupCustomSort: ICustomSort = ObjectFactory.CreateEmptyCustomSort();
                                    groupCustomSort.ColumnId = sm.colId;
                                    groupCustomSort.SortedValues = customSort.SortedValues;
                                    let comparator: any = customSortStrategy.getComparerFunction(groupCustomSort, this);
                                    this.setCustomSort(sm.colId, comparator)
                                }
                            }
                        }
                    }
                    let gridSort: IGridSort = { Column: sm.colId, SortOrder: (sm.sort == "asc") ? SortOrder.Ascending : SortOrder.Descending }
                    gridSorts.push(gridSort);
                })
            }
        }
        this.dispatchAction(GridRedux.GridSetSort(gridSorts));
    }

    public getRowCount(): number {
        return this.gridOptions.rowData ? this.gridOptions.rowData.length : this.gridOptions.api.getDisplayedRowCount();
    }

    public getColumnCount(): number {
        return this.gridOptions.columnApi.getAllColumns().length;
    }

    public getVisibleRowCount(): number {
        return this.gridOptions.api.getDisplayedRowCount();
    }

    public getVisibleColumnCount(): number {
        return this.gridOptions.columnApi.getAllColumns().filter(c => c.isVisible()).length;
    }

    public selectColumn(columnId: string) {
        this.gridOptions.api.clearRangeSelection();
        let rangeSelectionParams: AddRangeSelectionParams = {
            rowStart: 0,
            rowEnd: this.gridOptions.api.getDisplayedRowCount(),
            columnStart: columnId,
            columnEnd: columnId,
            floatingStart: "top",
            floatingEnd: "bottom"
        }
        this.gridOptions.api.addRangeSelection(rangeSelectionParams)
    }

    public setGridSort(gridSorts: IGridSort[]): void {
        // get the sort model
        let sortModel: any[] = []
        gridSorts.forEach(gs => {
            let sortDescription: string = (gs.SortOrder == SortOrder.Ascending) ? "asc" : "desc"
            sortModel.push({ colId: gs.Column, sort: sortDescription })
        })
        this.gridOptions.api.setSortModel(sortModel)
        this.gridOptions.api.onSortChanged();
    }

    public setGridData(dataSource: any) {
        this.gridOptions.api.setRowData(dataSource)
    }

    private updateQuickSearchRangeVisibleColumn(columnId: string): void {
        if (this.isInitialised) {
            let quickSearchState: QuickSearchState = this.api.quickSearchApi.getQuickSearchState();
            // only update if quick search is not highlight and is set - rare use case...
            if (quickSearchState.DisplayAction != DisplayAction.HighlightCell && StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)) {
                let quickSearchRange: IRange = this.getState().System.QuickSearchRange;
                let column: IColumn = ColumnHelper.getColumnFromId(columnId, this.api.gridApi.getColumns());

                if (quickSearchRange != null) {
                    if (RangeHelper.IsColumnAppropriateForRange(quickSearchRange.Operator, column)) {
                        let quickSearchVisibleColumnExpression: Expression = ExpressionHelper.CreateSingleColumnExpression(column.ColumnId, null, null, null, [quickSearchRange])
                        let quickSearchVisibleColumnExpressions: Expression[] = [].concat(this.getState().System.QuickSearchVisibleColumnExpressions)
                        quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression)
                        this.adaptableBlotterStore.TheStore.dispatch(SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions));
                    }
                }
            }
        }
    }

    private checkColumnsDataTypeSet(): any {
        // check that we have no unknown columns - if we do then ok
        let firstCol = this.api.gridApi.getColumns()[0];
        if (firstCol && firstCol.DataType == DataType.Unknown) {
            this.setColumnIntoStore();
        }
    }

    public getVendorGridState(visibleCols: string[], forceFetch: boolean): IVendorGridInfo {
        // forceFetch is used for default layout and just gets everything in the grid's state - not nice and can be refactored
        if (forceFetch) {
            return {
                GroupState: null,
                ColumnState: JSON.stringify(this.gridOptions.columnApi.getColumnState())
            }
        }

        if (this.blotterOptions.layoutOptions != null && this.blotterOptions.layoutOptions.includeVendorStateInLayouts != null && this.blotterOptions.layoutOptions.includeVendorStateInLayouts) {
            let groupedState: any = null
            let displayedColumns: Column[] = this.gridOptions.columnApi.getAllDisplayedColumns();
            let groupedCol = displayedColumns.find(c => ColumnHelper.isSpecialColumn(c.getColId()));
            if (groupedCol) {
                groupedState = groupedCol.getActualWidth();
            }

            let columnState = this.gridOptions.columnApi.getColumnState();

            // Dont like this but not sure we have a choice to avoid other issues...
            // Going to update the state to make sure that visibility matches those given here
            columnState.forEach(c => {
                // to do
                let colId: string = c.colId;
                if (visibleCols.find(v => v == colId)) {
                    c.hide = false;
                } else {
                    c.hide = true;
                }
            })
            return {
                GroupState: groupedState,
                ColumnState: JSON.stringify(columnState)
            }

        }
        return null; // need this?
    }

    public setVendorGridState(vendorGridState: IVendorGridInfo): void {
        if (vendorGridState) {

            let columnState: any = JSON.parse(vendorGridState.ColumnState);
            if (columnState) {
                this.setColumnState(this.gridOptions.columnApi, columnState, "api");
            }

            let groupedState: any = vendorGridState.GroupState;
            if (groupedState) {
                // assume for now its just a number
                let column: Column = this.gridOptions.columnApi.getColumn("ag-Grid-AutoColumn")
                if (column) {
                    this.gridOptions.columnApi.setColumnWidth(column, groupedState, true);
                }
            }
        }
    }


    // these 3 methods are strange as we shouldnt need to have to set a columnEventType but it seems agGrid forces us to
    // not sure why as its not in the api
    private setColumnVisible(columnApi: any, col: any, isVisible: boolean, columnEventType: string) {
        columnApi.setColumnVisible(col, isVisible, columnEventType)
    }

    private moveColumn(columnApi: any, col: any, index: number, columnEventType: string) {
        columnApi.moveColumn(col, index, columnEventType)
    }

    private setColumnState(columnApi: any, columnState: any, columnEventType: string) {
        columnApi.setColumnState(columnState, columnEventType)
    }

    public isSelectable(): boolean {
        if (this.gridOptions.enableRangeSelection != null) {
            return this.gridOptions.enableRangeSelection;
        }
        return false;
    }


    private isFloatingFilterActive(): boolean {
        return this.gridOptions.floatingFilter != null && this.gridOptions.floatingFilter == true && this.blotterOptions.filterOptions.useAdaptableBlotterFloatingFilter;
    }

    public showFloatingFilter(): void {
        if (this.blotterOptions.filterOptions.useAdaptableBlotterFloatingFilter) {
            this.gridOptions.floatingFilter = true;
            this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
                this.createFloatingFilterWrapper(col);
            });
            this.gridOptions.api.refreshHeader();
        }
    }

    public hideFloatingFilter(): void {
        if (this.blotterOptions.filterOptions.useAdaptableBlotterFloatingFilter) {
            this.gridOptions.floatingFilter = false;
            this.gridOptions.api.refreshHeader();
        }
    }

    public applyLightTheme(): void {
        if (this.blotterOptions.generalOptions.useDefaultVendorGridThemes && StringExtensions.IsNotNullOrEmpty(this.blotterOptions.containerOptions.vendorContainer)) {
            let container = document.getElementById(this.blotterOptions.containerOptions.vendorContainer);
            if (container != null) {
                container.className = this.agGridHelper.getLightThemeName();
            }
        }
    }

    public applyDarkTheme(): void {
        if (this.blotterOptions.generalOptions.useDefaultVendorGridThemes && StringExtensions.IsNotNullOrEmpty(this.blotterOptions.containerOptions.vendorContainer)) {
            let container = document.getElementById(this.blotterOptions.containerOptions.vendorContainer);
            if (container != null) {
                container.className = this.agGridHelper.getDarkThemeName();
            }
        }
    }

    // Method called after we have rendered the grid
    // where we apply our stuff but also any ag-Grid props that we control
    private applyFinalRendering(): void {


        // add the filter header style if required
        if (this.blotterOptions.filterOptions.indicateFilteredColumns == true) {
            var css = document.createElement("style");
            css.id = this.blotterOptions.blotterId + '_filtered-columns-style';
            css.type = "text/css";
            css.innerHTML = ".ag-header-cell-filtered {  font-style: italic; font-weight: bolder;}";
            document.body.appendChild(css);
        }


        // sometimes the header row looks wrong when using floating filter so to be sure...
        if (this.isFloatingFilterActive()) {
            this.dispatchAction(GridRedux.FloatingilterBarShow())
            this.gridOptions.api.refreshHeader();
        }

        // if user layout and a percent bar sometimes the first few cells are pre-rendered so we frig it like this
        let currentlayout: string = this.api.layoutApi.getCurrentLayoutName();
        if (currentlayout != DEFAULT_LAYOUT && ArrayExtensions.IsNotNullOrEmpty(this.api.percentBarApi.getAllPercentBar())) {
            this.api.layoutApi.setLayout(DEFAULT_LAYOUT);
        }

        // at the end so load the current layout
        this.api.layoutApi.setLayout(currentlayout);
    }

    // A couple of state management functions
    private getState(): AdaptableBlotterState {
        return this.adaptableBlotterStore.TheStore.getState()
    }

    private dispatchAction(action: Action): void {
        this.adaptableBlotterStore.TheStore.dispatch(action);
    }
}
