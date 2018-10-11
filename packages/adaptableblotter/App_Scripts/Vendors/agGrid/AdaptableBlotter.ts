// import styles - ab and 2 default agGrid
import '../../Styles/stylesheets/adaptableblotter-style.css'

import * as ReactDOM from "react-dom";
import * as _ from 'lodash'
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as StyleConstants from '../../Core/Constants/StyleConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
// redux / store
import { IAdaptableBlotterStore, AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore'
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
// services
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../../Core/Services/CalendarService'
import { CalculatedColumnExpressionService } from '../../Core/Services/CalculatedColumnExpressionService'
import { IAuditService, IDataChangedEvent, IDataChangingEvent } from '../../Core/Services/Interface/IAuditService'
import { IValidationService } from '../../Core/Services/Interface/IValidationService'
import { AuditService } from '../../Core/Services/AuditService'
import { ValidationService } from '../../Core/Services/ValidationService'
import { StyleService } from '../../Core/Services/StyleService'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";
import { ChartService } from '../../Core/Services/ChartService';
import { IChartService } from '../../Core/Services/Interface/IChartService';
// strategies
import { IStrategy } from '../../Strategy/Interface/IStrategy';
import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { AlertStrategy } from '../../Strategy/AlertStrategy';
import { ChartStrategy } from '../../Strategy/ChartStrategy';
import { AboutStrategy } from '../../Strategy/AboutStrategy';
import { ApplicationStrategy } from '../../Strategy/ApplicationStrategy';
import { BulkUpdateStrategy } from '../../Strategy/BulkUpdateStrategy';
import { CustomSortagGridStrategy } from '../../Strategy/CustomSortagGridStrategy'
import { SmartEditStrategy } from '../../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../../Strategy/ShortcutStrategy'
import { DataManagementStrategy } from '../../Strategy/DataManagementStrategy'
import { PlusMinusStrategy } from '../../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../../Strategy/ColumnChooserStrategy'
import { ExportStrategy } from '../../Strategy/ExportStrategy'
import { FlashingCellsagGridStrategy } from '../../Strategy/FlashingCellsagGridStrategy'
import { CalendarStrategy } from '../../Strategy/CalendarStrategy'
import { ConditionalStyleagGridStrategy } from '../../Strategy/ConditionalStyleagGridStrategy'
import { QuickSearchStrategyagGrid } from '../../Strategy/QuickSearchStrategyagGrid'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { UserFilterStrategy } from '../../Strategy/UserFilterStrategy'
import { ColumnFilterStrategy } from '../../Strategy/ColumnFilterStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { TeamSharingStrategy } from '../../Strategy/TeamSharingStrategy'
import { FormatColumnagGridStrategy } from '../../Strategy/FormatColumnagGridStrategy'
import { ColumnInfoStrategy } from '../../Strategy/ColumnInfoStrategy'
import { DashboardStrategy } from '../../Strategy/DashboardStrategy'
import { CalculatedColumnStrategy } from "../../Strategy/CalculatedColumnStrategy";
import { SelectColumnStrategy } from '../../Strategy/SelectColumnStrategy';
import { SelectedCellsStrategy } from '../../Strategy/SelectedCellsStrategy';
import { DataSourceStrategy } from '../../Strategy/DataSourceStrategy';
// components
import { FilterWrapperFactory } from './FilterWrapper'
import { FloatingFilterWrapperFactory } from './FloatingFilterWrapper';
// import other items
import { IMenuItem } from '../../Core/Interface/IMenu';
import { IEvent } from '../../Core/Interface/IEvent';
import { IUIConfirmation } from '../../Core/Interface/IMessage';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { DataType, LeafExpressionOperator, SortOrder, DisplayAction, DistinctCriteriaPairValue } from '../../Core/Enums'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { Color } from '../../Core/color';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IAdaptableStrategyCollection, ICellInfo, IPermittedColumnValues, IVendorGridInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { BlotterApi } from './BlotterApi';
import { ICalculatedColumn, ICellValidationRule, IColumnFilter, IGridSort } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from '../../Core/Api/Interface/IStateEvents';
import { ArrayExtensions } from '../../Core/Extensions/ArrayExtensions';
import { AdaptableBlotterLogger } from '../../Core/Helpers/AdaptableBlotterLogger';
import { ISelectedCell, ISelectedCellInfo } from '../../Strategy/Interface/ISelectedCellsStrategy';
// Helpers
import { StyleHelper } from '../../Core/Helpers/StyleHelper';
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { ColumnHelper } from '../../Core/Helpers/ColumnHelper';
import { LayoutHelper } from '../../Core/Helpers/LayoutHelper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
// ag-Grid 
//if you add an import from a different folder for aggrid you need to add it to externals in the webpack prod file
import { GridOptions, Column, RowNode, ICellEditor, AddRangeSelectionParams, LoggerFactory } from "ag-grid"
import { Events } from "ag-grid/dist/lib/eventKeys"
import { NewValueParams, ValueGetterParams, ColDef, ValueFormatterParams } from "ag-grid/dist/lib/entities/colDef"
import { GetMainMenuItemsParams, MenuItemDef } from "ag-grid/dist/lib/entities/gridOptions"
import { raw } from 'body-parser';
import { HomeStrategy } from '../../Strategy/HomeStrategy';
import { FreeTextColumnStrategy } from '../../Strategy/FreeTextColumnStrategy';

export class AdaptableBlotter implements IAdaptableBlotter {

    public api: IBlotterApi
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore
    public BlotterOptions: IAdaptableBlotterOptions
    public VendorGridName: any

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public ValidationService: IValidationService
    public AuditLogService: AuditLogService
    public StyleService: StyleService
    public ChartService: IChartService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService

    private calculatedColumnPathMap: Map<string, string[]> = new Map()
    private abContainerElement: HTMLElement;
    private gridOptions: GridOptions
    public EmbedColumnMenu: boolean;
    public isInitialised: boolean

    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid: boolean = true) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions)
        this.gridOptions = this.BlotterOptions.vendorGrid
        this.VendorGridName = 'agGrid';
        this.EmbedColumnMenu = true
        this.isInitialised = false;
        // create the store
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.ValidationService = new ValidationService(this);
        this.AuditLogService = new AuditLogService(this, this.BlotterOptions);
        this.StyleService = new StyleService(this);
        this.ChartService = new ChartService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, (columnId, record) => this.gridOptions.api.getValue(columnId, record));
        // get the api ready
        this.api = new BlotterApi(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyConstants.AboutStrategyId, new AboutStrategy(this))
        this.Strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategy(this))
        this.Strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyConstants.ApplicationStrategyId, new ApplicationStrategy(this))
        this.Strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy(this))
        this.Strategies.set(StrategyConstants.CalculatedColumnStrategyId, new CalculatedColumnStrategy(this))
        this.Strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy(this))
        //   this.Strategies.set(StrategyConstants.ChartStrategyId, new ChartStrategy(this))
        this.Strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy(this))
        this.Strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy(this))
        this.Strategies.set(StrategyConstants.ConditionalStyleStrategyId, new ConditionalStyleagGridStrategy(this))
        this.Strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortagGridStrategy(this))
        this.Strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy(this))
        this.Strategies.set(StrategyConstants.DataManagementStrategyId, new DataManagementStrategy(this))
        this.Strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy(this))
        this.Strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy(this))
        this.Strategies.set(StrategyConstants.FlashingCellsStrategyId, new FlashingCellsagGridStrategy(this))
        this.Strategies.set(StrategyConstants.FormatColumnStrategyId, new FormatColumnagGridStrategy(this))
        this.Strategies.set(StrategyConstants.FreeTextColumnStrategyId, new FreeTextColumnStrategy(this))
        this.Strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy(this))
        this.Strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy(this))
        this.Strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy(this))
        this.Strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategyagGrid(this))
        this.Strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy(this))
        this.Strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyConstants.SelectColumnStrategyId, new SelectColumnStrategy(this))
        this.Strategies.set(StrategyConstants.SelectedCellsStrategyId, new SelectedCellsStrategy(this))
        this.Strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy(this))

        iPushPullHelper.isIPushPullLoaded(this.BlotterOptions.iPushPullConfig)

        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()),
                (e) => {
                    AdaptableBlotterLogger.LogError('Failed to Init AdaptableBlotterStore : ', e);
                    //for now we initiliaze the strategies even if loading state has failed (perhaps revisit this?) 
                    this.Strategies.forEach(strat => strat.InitializeWithRedux())
                })
            .then(
                () => this.initInternalGridLogic(),
                (e) => {
                    AdaptableBlotterLogger.LogError('Failed to Init Strategies : ', e);
                    //for now we initiliaze the grid even if initialising strategies has failed (perhaps revisit this?) 
                    this.initInternalGridLogic()
                })
            .then(() => {
                // at the end so load the current layout, refresh the toolbar and turn off the loading message
                let currentlayout = this.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout
                this.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(currentlayout))
                if (this.gridOptions.floatingFilter) { // sometimes the header row looks wrong when using floating filter so to be sure...
                    this.gridOptions.api.refreshHeader();
                }
                this.isInitialised = true
                this.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupHideLoading())
            })

        if (renderGrid) {
            if (this.abContainerElement == null) {
                this.abContainerElement = document.getElementById(this.BlotterOptions.adaptableBlotterContainer);
            }
            if (this.abContainerElement != null) {
                this.abContainerElement.innerHTML = ""
                ReactDOM.render(AdaptableBlotterApp({ AdaptableBlotter: this }), this.abContainerElement);
            }
        }

    }

    private getState(): AdaptableBlotterState {
        return this.AdaptableBlotterStore.TheStore.getState()
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

    public InitAuditService() {
        //Probably Temporary but we init the Audit service with current data
        this.AuditService.Init(this.gridOptions.rowData)
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

    public SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs> = new EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>();
    public StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs> = new EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>();

    public ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs> = new EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>();


    public applyGridFiltering() {
        if (this.isFilterable()) {
            this.gridOptions.api.onFilterChanged()
            this._onRefresh.Dispatch(this, this);
        } else {
            AdaptableBlotterLogger.LogError('Trying to filter on a non-filterable grid.')
        }
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

    debouncedSetColumnIntoStore = _.debounce(() => this.setColumnIntoStore(), 500);
    public setColumnIntoStore() {
        let allColumns: IColumn[] = []
        let existingColumns: IColumn[] = this.getState().Grid.Columns;
        let vendorCols: Column[] = this.gridOptions.columnApi.getAllGridColumns()
        let quickSearchClassName = this.getQuickSearchClassName();

        vendorCols.forEach((vendorColumn, index) => {
            let colId: string = vendorColumn.getColId()
            if (!ColumnHelper.isSpecialColumn(colId)) {
                let existingColumn: IColumn = existingColumns.find(c => c.ColumnId == colId);
                if (existingColumn) {
                    existingColumn.Visible = vendorColumn.isVisible()
                } else {
                    existingColumn = this.createColumn(vendorColumn, quickSearchClassName)
                }
                allColumns.push(existingColumn);
            }
        })

        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetColumnsAction>(GridRedux.GridSetColumns(allColumns));
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
            Category: ColumnHelper.getColumnCategoryFromCategories(colId, this.AdaptableBlotterStore.TheStore.getState().UserInterface.ColumnCategories)

        }
        this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
        return abColumn;
    }

    private getQuickSearchClassName(): string {
        let blotter = this
        let quickSearchClassName: string = StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Style.ClassName) ?
            blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Style.ClassName :
            StyleHelper.CreateStyleName(StrategyConstants.QuickSearchStrategyId, this)
        return quickSearchClassName;
    }

    private addQuickSearchStyleToColumn(col: IColumn, quickSearchClassName: string): void {
        let blotter = this
        let cellClassRules: any = {};
        cellClassRules[quickSearchClassName] = function (params: any) {
            let columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
            let quickSearchState = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
            if (StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)
                && (quickSearchState.DisplayAction == DisplayAction.HighlightCell
                    || quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell)) {
                let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                let displayValue = blotter.getDisplayValueFromRecord(params.node, columnId);
                if (displayValue) {
                    let stringValueLowerCase = displayValue.toLowerCase();
                    switch (blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Operator) {
                        case LeafExpressionOperator.Contains:
                            {
                                if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                    return true
                                }
                            }
                            break;
                        case LeafExpressionOperator.StartsWith:
                            {
                                if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                    return true
                                }
                            }
                            break;
                    }
                }
            }
            return false;
        }
        this.setCellClassRules(cellClassRules, col.ColumnId, "QuickSearch")
    }


    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => {
            let menuItem = x.getPopupMenuItem()
            if (menuItem != null) {
                if (menuItems.findIndex(m => m.StrategyId == menuItem.StrategyId) == -1) {
                    menuItems.push(menuItem);
                }
            }
        })
        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public getPrimaryKeyValueFromRecord(record: RowNode): any {
        return this.gridOptions.api.getValue(this.BlotterOptions.primaryKey, record)
    }

    public gridHasCurrentEditValue(): boolean {
        if (this._currentEditor) {
            return true
        }
        return false
    }

    public getCurrentCellEditValue(): any {
        //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
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

    debouncedSaveGridLayout = _.debounce(() => this.saveGridLayout(), 500);
    public saveGridLayout() {
        if (this.BlotterOptions.includeVendorStateInLayouts) {
            LayoutHelper.autoSaveLayout(this);
        }
    }

    debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), 500);
    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    public setSelectedCells(): void {
        let selectionMap: Map<string, ISelectedCell[]> = new Map<string, ISelectedCell[]>();

        let test: RowNode[] = this.gridOptions.api.getSelectedNodes();
        if (test) {
            let s: any = test.length;
        }
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
                        let selectedColumn: IColumn = this.getState().Grid.Columns.find(c => c.ColumnId == colId);
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
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetSelectedCellsAction>(GridRedux.GridSetSelectedCells(selectedCells));
        this._onSelectedCellsChanged.Dispatch(this, this)
    }

    //We deduce the type here, as there is no way to get it through the definition
    private getColumnDataType(column: Column): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            AdaptableBlotterLogger.LogMessage('columnId is undefined returning String for Type')
            return DataType.String;
        }

        // get the column type if already in store (and not unknown)
        let existingColumn: IColumn = this.getState().Grid.Columns.find(c => c.ColumnId == column.getId());
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
                    if (c.startsWith("abColDef")) {
                        myDatatype = this.getabColDefValue(c);
                    }
                });
                if (myDatatype != DataType.Unknown) {
                    return myDatatype;
                }
            } else {
                // do string check
                if (colType.startsWith("abColDef")) {
                    return this.getabColDefValue(colType);
                }
            }

        }

        let row = this.gridOptions.api.getModel().getRow(0)

        if (row == null) { // possible that there will be no data.
            AdaptableBlotterLogger.LogWarning('there is no first row so we are returning Unknown for Type')
            return DataType.Unknown;
        }
        //if it's a group we need the content of the group
        if (row.group) {
            row = row.childrenAfterGroup[0]
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
        AdaptableBlotterLogger.LogMessage("No defined type for column '" + column.getColId() + "'. Defaulting to type of first value: " + dataType)
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
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            if (cellInfo.Id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                let oldValue = this.gridOptions.api.getValue(cellInfo.ColumnId, rowNode)
                rowNode.setDataValue(cellInfo.ColumnId, cellInfo.Value)
                // this seems to loop unnecessarily... ????

                let dataChangedEvent: IDataChangedEvent =
                {
                    OldValue: oldValue,
                    NewValue: cellInfo.Value,
                    ColumnId: cellInfo.ColumnId,
                    IdentifierValue: cellInfo.Id,
                    Timestamp: null,
                    Record: null
                }
                this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
            }
        })
        this.applyGridFiltering();
        this.gridOptions.api.clearRangeSelection();
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see

        // using new method... (JW, 11/3/18)
        var itemsToUpdate: any[] = [];
        var dataChangedEvents: IDataChangedEvent[] = []
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            let value = batchValues.find(x => x.Id == this.getPrimaryKeyValueFromRecord(rowNode))
            if (value) {

                let oldValue = this.gridOptions.api.getValue(value.ColumnId, rowNode)

                var data: any = rowNode.data;
                data[value.ColumnId] = value.Value;
                itemsToUpdate.push(data);

                let dataChangedEvent: IDataChangedEvent = {
                    OldValue: oldValue,
                    NewValue: value.Value,
                    ColumnId: value.ColumnId,
                    IdentifierValue: value.Id,
                    Timestamp: null,
                    Record: null
                }
                dataChangedEvents.push(dataChangedEvent)
            }
        })
        var res = this.gridOptions.api.updateRowData({ update: itemsToUpdate });
        this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        dataChangedEvents.forEach(dc => this.AuditService.CreateAuditChangedEvent(dc));

        this.applyGridFiltering();
        this.gridOptions.api.clearRangeSelection();
    }

    public cancelEdit() {
        this.gridOptions.api.stopEditing(true)
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any {
        if (type == "getColumnValue") {
            let rowNodeSearch: RowNode
            //ag-grid doesn't support FindRow based on data
            // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
            this.gridOptions.api.getModel().forEachNode(rowNode => {
                if (id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                    rowNodeSearch = rowNode
                }
            })
            return (columnId: string) => { return this.gridOptions.api.getValue(columnId, rowNodeSearch); }
        }
        else {
            return (columnId: string) => { return this.getDisplayValue(id, columnId); }
        }
    }

    public getRecordIsSatisfiedFunctionFromRecord(record: RowNode, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any {
        if (type == "getColumnValue") {
            return (columnId: string) => { return this.gridOptions.api.getValue(columnId, record) }
        } else {
            return (columnId: string) => { return this.getDisplayValueFromRecord(record, columnId); }
        }
    }


    public getColumnIndex(columnId: string): number {
        return null
    }

    private isColumnReadonly(columnId: string): boolean {
        //same as hypergrid. we do not support the fact that some rows are editable and some are not
        //if editable is a function then we return that its not readonly since we assume that some record will be editable
        //that's wrong but we ll see if we face the issue later
        //also looks like the column object already has the Iseditable function... need to check that
        let colDef = this.gridOptions.api.getColumnDef(columnId)
        if (typeof colDef.editable == 'boolean') {
            return !colDef.editable;
        }
        else {
            return true
        }
    }

    private isColumnSortable(columnId: string): boolean {
        if (!this.isSortable()) {
            return false;
        }

        let colDef: ColDef = this.gridOptions.api.getColumnDef(columnId)
        if (colDef.suppressSorting != null) {
            return !colDef.suppressSorting;
        }
        return true;
    }

    private isColumnFilterable(columnId: string): boolean {
        if (!this.isFilterable()) {
            return false;
        }

        let colDef: ColDef = this.gridOptions.api.getColumnDef(columnId)
        if (colDef.suppressFilter != null) {
            return !colDef.suppressFilter;
        }
        return true;
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

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();

        // check if there are permitted column values for that column
        let permittedValues: IPermittedColumnValues[] = this.getState().UserInterface.PermittedColumnValues
        let permittedValuesForColumn = permittedValues.find(pc => pc.ColumnId == columnId);
        if (permittedValuesForColumn) {
            permittedValuesForColumn.PermittedValues.forEach(pv => {
                returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
            })
        } else { // get the distinct values for the column from the grid
            //we use forEachNode as we want to get all data even the one filtered out...
            let data = this.gridOptions.api.forEachNode(rowNode => {
                //we do not return the values of the aggregates when in grouping mode
                //otherwise they wxould appear in the filter dropdown etc....
                if (!rowNode.group) {
                    let displayString = this.getDisplayValueFromRecord(rowNode, columnId)
                    let rawValue = this.gridOptions.api.getValue(columnId, rowNode)
                    if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                        returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayString });
                    }
                    else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
                        returnMap.set(displayString, { RawValue: rawValue, DisplayValue: displayString });
                    }
                }
            })
        }
        return Array.from(returnMap.values()).slice(0, this.BlotterOptions.maxColumnValueItemsDisplayed);
    }

    public getDisplayValue(id: any, columnId: string): string {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        let returnValue: string
        let foundRow: boolean = false;
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            if (!foundRow && id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                returnValue = this.getDisplayValueFromRecord(rowNode, columnId);
                foundRow = true;
            }
        })
        return returnValue
    }

    public getDisplayValueFromRecord(row: RowNode, columnId: string): string {
        //TODO : this method needs optimizing since getting the column everytime seems costly
        //we do not handle yet if the column uses a template... we handle only if it's using a renderer
        if (row == null) {
            return ""
        }
        let rawValue = this.gridOptions.api.getValue(columnId, row)

        return this.getDisplayValueFromRawValue(columnId, rawValue);
    }

    public getDisplayValueFromRawValue(columnId: string, rawValue: any): any {
        let colDef = this.gridOptions.api.getColumnDef(columnId)
        let column = this.gridOptions.columnApi.getAllColumns().find(c => c.getColId() == columnId)
        if (colDef.valueFormatter) {
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
            return this.cleanValue(rawValue);
        }
    }

    private getRenderedValue(colDef: ColDef, valueToRender: any): string {
        let render: any = colDef.cellRenderer
        if (typeof render == "string") {
            return this.cleanValue(valueToRender)
        }
        return render({ value: valueToRender }) || "";
    }

    private cleanValue(value: string): string {
        if (value == null || value == 'null') {
            return null;
        } else if (value == undefined || value == 'undefined') {
            return undefined;
        } else {
            return String(value) || "";
        }
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
                let cssStyles: string[] = this.getState().ConditionalStyle.ConditionalStyles.map(c => c.Style.ClassName);
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

    public redrawRows() {
        this.gridOptions.api.redrawRows();
        this._onRefresh.Dispatch(this, this)
    }

    public refreshCells(rowNode: RowNode, columnIds: string[]) {
        this.gridOptions.api.refreshCells({ rowNodes: [rowNode], columns: columnIds, force: true });
    }

    public editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void {
        // first change the value getter in the coldefs - nothing else needs to change
        let colDefs: ColDef[] = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef())
        let colDefIndex = colDefs.findIndex(x => x.headerName == calculatedColumn.ColumnId)

        let newColDef: ColDef = colDefs[colDefIndex];
        newColDef.valueGetter = (params: ValueGetterParams) => this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, params.node)

        colDefs[colDefIndex] = newColDef
        this.gridOptions.api.setColumnDefs(colDefs)

        // for column list its an itnernal map only so we can first delete
        for (let columnList of this.calculatedColumnPathMap.values()) {
            let index = columnList.indexOf(calculatedColumn.ColumnId);
            if (index > -1) {
                columnList.splice(index, 1);
            }
        }
        // and then add
        let columnList = this.CalculatedColumnExpressionService.getColumnListFromExpression(calculatedColumn.ColumnExpression)
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
            this.gridOptions.api.setColumnDefs(colDefs)
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
        colDefs.push({
            headerName: calculatedColumn.ColumnId,
            colId: calculatedColumn.ColumnId,
            hide: true,
            valueGetter: (params: ValueGetterParams) => this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, params.node)
        })
        this.gridOptions.api.setColumnDefs(colDefs)
        let columnList = this.CalculatedColumnExpressionService.getColumnListFromExpression(calculatedColumn.ColumnExpression)
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column)
            if (!childrenColumnList) {
                childrenColumnList = []
                this.calculatedColumnPathMap.set(column, childrenColumnList)
            }
            childrenColumnList.push(calculatedColumn.ColumnId)
        }

        let vendorColumn = this.gridOptions.columnApi.getAllColumns().find(vc => vc.getColId() == calculatedColumn.ColumnId)
        let hiddenCol: IColumn = {
            ColumnId: calculatedColumn.ColumnId,
            FriendlyName: calculatedColumn.ColumnId,
            DataType: this.getColumnDataType(vendorColumn),
            Visible: false,
            ReadOnly: true,
            Sortable: this.isSortable(),
            Filterable: this.isFilterable(),
        }
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridAddColumnAction>(GridRedux.GridAddColumn(hiddenCol));

        let quickSearchClassName = this.getQuickSearchClassName();
        this.addQuickSearchStyleToColumn(hiddenCol, quickSearchClassName);

        if (this.isFilterable() && this.BlotterOptions.useAdaptableBlotterFilterForm) {
            this.createFilterWrapper(vendorColumn)
        }
        let conditionalStyleagGridStrategy: IConditionalStyleStrategy = this.Strategies.get(StrategyConstants.ConditionalStyleStrategyId) as IConditionalStyleStrategy;
        conditionalStyleagGridStrategy.InitStyles();
    }

    public isGroupRecord(record: any): boolean {
        let rowNode: RowNode = record as RowNode
        return rowNode.group;
    }

    public getFirstRecord() {
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
                Columns: this.getState().Grid.Columns.map(col => {
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
                Columns: this.getState().Grid.Columns.map(col => {
                    let cellElement: HTMLElement = document.querySelector(".ag-cell[col-id='" + col.ColumnId + "']") as HTMLElement
                    let headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null)
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign }
                })
            },

        }
    }

    private initInternalGridLogic() {
        if (this.abContainerElement == null) {
            this.abContainerElement = document.getElementById(this.BlotterOptions.adaptableBlotterContainer);
        }
        if (this.abContainerElement == null) {
            AdaptableBlotterLogger.LogError("There is no Div called " + this.BlotterOptions.adaptableBlotterContainer + " so cannot render the Adaptable Blotter")
            return
        }

        let gridContainerElement = document.getElementById(this.BlotterOptions.vendorContainer);
        if (gridContainerElement) {
            gridContainerElement.addEventListener("keydown", (event) => this._onKeyDown.Dispatch(this, event));
        }

        // vendorGrid.api.addGlobalListener((type: string, event: any) => {
        //     //console.log(event)
        // });
        //we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type 
        //since there are many events and we want them to behave the same
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
        this.gridOptions.api.addGlobalListener((type: string, event: any) => {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                // bit messy but better than alternative which was calling setColumnIntoStore for every single column
                let popupState = this.getState().Popup.ScreenPopup;
                if (popupState.ShowScreenPopup && (popupState.ComponentName == ScreenPopups.ColumnChooserPopup || ScreenPopups.CalculatedColumnPopup)) {
                    // ignore
                } else {
                   this.debouncedSetColumnIntoStore() // was: this.setColumnIntoStore();
                }
            }
        });
        // Pinning columms and changing column widths will trigger an auto save (if that and includvendorstate are both turned on)
        let columnEventsThatTriggersAutoLayoutSave = [
            Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            Events.EVENT_COLUMN_PINNED
        ];
        this.gridOptions.api.addGlobalListener((type: string, event: any) => {
            if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
                this.debouncedSaveGridLayout();
            }

        });
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
                let dataChangingEvent: IDataChangingEvent;
                dataChangingEvent = { ColumnId: params.column.getColId(), NewValue: this._currentEditor.getValue(), IdentifierValue: this.getPrimaryKeyValueFromRecord(params.node) };
                let failedRules: ICellValidationRule[] = this.ValidationService.ValidateCellChanging(dataChangingEvent);
                if (failedRules.length > 0) {
                    // first see if its an error = should only be one item in array if so
                    if (failedRules[0].ActionMode == "Stop Edit") {
                        let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                        this.api.alertShowError("Validation Error", errorMessage, true)
                        return true;
                    }
                    else {
                        let warningMessage: string = "";
                        failedRules.forEach(f => {
                            warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this) + "\n";
                        });
                        let cellInfo: ICellInfo = {
                            Id: dataChangingEvent.IdentifierValue,
                            ColumnId: dataChangingEvent.ColumnId,
                            Value: dataChangingEvent.NewValue
                        };
                        let confirmation: IUIConfirmation = {
                            CancelText: "Cancel Edit",
                            ConfirmationTitle: "Cell Validation Failed",
                            ConfirmationMsg: warningMessage,
                            ConfirmationText: "Bypass Rule",
                            CancelAction: null,
                            ConfirmAction: GridRedux.GridSetValueLikeEdit(cellInfo, this.gridOptions.api.getValue(params.column.getColId(), params.node)),
                            ShowCommentBox: true
                        };
                        this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
                        //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                        return true;
                    }
                }
                let whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false;
                if (!whatToReturn) {
                    //no failed validation so we raise the edit auditlog
                    let dataChangedEvent: IDataChangedEvent =
                    {
                        OldValue: this.gridOptions.api.getValue(params.column.getColId(), params.node),
                        NewValue: dataChangingEvent.NewValue,
                        ColumnId: dataChangingEvent.ColumnId,
                        IdentifierValue: dataChangingEvent.IdentifierValue,
                        Timestamp: null,
                        Record: null
                    }
                    this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
                }
                return whatToReturn;
            };
            this._currentEditor.isCancelAfterEnd = isCancelAfterEnd;
        });
        this.gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, (params: any) => {
            //(<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = null;
            //We refresh the filter so we get live search/filter when editing.
            //Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
            this.applyGridFiltering();
            this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(Events.EVENT_SELECTION_CHANGED, (params: any) => {
            this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(Events.EVENT_RANGE_SELECTION_CHANGED, (params: any) => {
            this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(Events.EVENT_SORT_CHANGED, (params: any) => {
            this.onSortChanged(params)
            this.debouncedSetSelectedCells();
        });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_UPDATED, (params: any) => {
        //  });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_CHANGED, (params: any) => {
        //});
        this.gridOptions.api.addEventListener(Events.EVENT_MODEL_UPDATED, (params: any) => {
            // not sure about this - doing it to make sure that we set the columns properly at least once!
            this.checkColumnsDataTypeSet();
        });

        this.gridOptions.api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, (params: NewValueParams) => {
            let identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
            this.AuditService.CreateAuditEvent(identifierValue, params.newValue, params.colDef.field, params.node);
            //24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
            //so we manually raise.
            //https://github.com/JonnyAdaptableTools/adaptableblotter/issues/118
            let columnList = this.calculatedColumnPathMap.get(params.colDef.field);
            if (columnList) {
                columnList.forEach(x => {
                    let newValue = this.gridOptions.api.getValue(x, params.node);
                    this.AuditService.CreateAuditEvent(identifierValue, newValue, x, params.node);
                });
            }
        });

        //We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
        let originalisExternalFilterPresent = this.gridOptions.isExternalFilterPresent;
        this.gridOptions.isExternalFilterPresent = () => {
            let columnFilters: IColumnFilter[] = this.getState().ColumnFilter.ColumnFilters;
            let isFilterActive = ArrayExtensions.IsNotNullOrEmpty(columnFilters);
            if (isFilterActive) {
                //used in particular at init time to show the filter icon correctly
                for (let colFilter of columnFilters) {
                    if (!this.gridOptions.columnApi.getColumn(colFilter.ColumnId).isFilterActive()) {
                        this.gridOptions.columnApi.getColumn(colFilter.ColumnId).setFilterActive(true);
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
            let columns = this.getState().Grid.Columns;

            //first we assess AdvancedSearch (if its running locally)
            if (this.BlotterOptions.serverSearchOption == 'None') {
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
            if (this.BlotterOptions.serverSearchOption == 'None' || this.BlotterOptions.serverSearchOption == 'AdvancedSearch') {
                let columnFilters: IColumnFilter[] = this.getState().ColumnFilter.ColumnFilters;
                if (columnFilters.length > 0) {
                    for (let columnFilter of columnFilters) {
                        if (!ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, node, columns, this)) {
                            // if (!ExpressionHelper.checkForExpression(columnFilter.Filter, rowId, columns, this)) {
                            return false;
                        }
                    }
                }
                //we assess quicksearch
                let quickSearchState = this.getState().QuickSearch;
                if (StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
                    && quickSearchState.DisplayAction != DisplayAction.HighlightCell) {
                    let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                    for (let column of columns.filter(c => c.Visible)) {
                        let displayValue = this.getDisplayValueFromRecord(node, column.ColumnId);
                        if (displayValue != null) {
                            let stringValueLowerCase = displayValue.toLowerCase();
                            switch (quickSearchState.Operator) {
                                case LeafExpressionOperator.Contains:
                                    {
                                        if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
                                        }
                                    }
                                    break;
                                case LeafExpressionOperator.StartsWith:
                                    {
                                        if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    return false;
                }
            }
            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
        };

        // if (this.isFilterable()) {
        if (this.BlotterOptions.useAdaptableBlotterFilterForm) {
            this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
                this.createFilterWrapper(col);
            });
        }
        // }
        if (this.gridOptions.floatingFilter && this.BlotterOptions.useAdaptableBlotterFloatingFilter) {
            //      if (this.isFilterable()) {
            this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
                this.createFloatingFilterWrapper(col);
            });
        }

        let originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
        this.gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
            //couldnt find a way to listen for menu close. There is a Menu Item Select 
            //but you can also clsoe the menu from filter and clicking outside the menu....
            //    this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.HideColumnContextMenu());
            let colId: string = params.column.getColId()
            //   this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(params.column.getColId()));
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.ClearColumnContextMenu());
            this.Strategies.forEach(s => {
                s.addContextMenuItem(colId)
            })

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
                    action: () => this.AdaptableBlotterStore.TheStore.dispatch(x.Action),
                    icon: glyph
                });
            });
            return colMenuItems;
        };
        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()), (e) => {
                AdaptableBlotterLogger.LogError('Failed to Init AdaptableBlotterStore : ', e);
                //for now i'm still initializing the strategies even if loading state has failed.... 
                //we may revisit that later
                this.Strategies.forEach(strat => strat.InitializeWithRedux());

            });
    }

    private onSortChanged(params: any): void {
        let sortModel: any[] = this.gridOptions.api.getSortModel();

        let gridSorts: IGridSort[] = [];
        if (sortModel != null) {
            if (sortModel.length > 0) {
                sortModel.forEach(sm => {
                    let gridSort: IGridSort = { Column: sm.colId, SortOrder: (sm.sort == "asc") ? SortOrder.Ascending : SortOrder.Descending }
                    gridSorts.push(gridSort);

                })
            }
        }
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetSortAction>(GridRedux.GridSetSort(gridSorts));
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

    public setData(dataSource: any) {
        this.gridOptions.api.setRowData(dataSource)
    }

    private checkColumnsDataTypeSet(): any {
        // check that we have no unknown columns - if we do then ok
        let firstCol = this.getState().Grid.Columns[0];
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

        if (this.BlotterOptions.includeVendorStateInLayouts) {
            let groupedState: any = null
            let test = this.gridOptions.columnApi.getAllDisplayedColumns();
            let groupedCol = test.find(c => ColumnHelper.isSpecialColumn(c.getColId()));
            if (groupedCol) {
                console.log("special col width: " + groupedCol.getActualWidth())
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
                    //  alert("have a special column")
                    this.gridOptions.columnApi.setColumnWidth(column, groupedState, true);
                }
                //   this.gridOptions.api.refreshHeader();
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

    public isSortable(): boolean {
        if (this.gridOptions.enableSorting != null) {
            return this.gridOptions.enableSorting;
        }
        return false;
    }

    public isFilterable(): boolean {
        if (this.gridOptions.enableFilter != null) {
            return this.gridOptions.enableFilter;
        }
        return false;
    }

    public applyLightTheme(): void {
        if (this.BlotterOptions.useDefaultVendorGridThemes && StringExtensions.IsNotNullOrEmpty(this.BlotterOptions.vendorContainer)) {
            let container = document.getElementById(this.BlotterOptions.vendorContainer);
            if (container != null) {
                container.className = "ag-theme-balham";
            }
        }
    }

    public applyDarkTheme(): void {
        if (this.BlotterOptions.useDefaultVendorGridThemes && StringExtensions.IsNotNullOrEmpty(this.BlotterOptions.vendorContainer)) {
            let container = document.getElementById(this.BlotterOptions.vendorContainer);
            if (container != null) {
                container.className = "ag-theme-balham-dark";
            }
        }
    }

}