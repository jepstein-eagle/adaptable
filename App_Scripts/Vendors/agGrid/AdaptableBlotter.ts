import '../../../stylesheets/adaptableblotter-style.css'
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import { IAdaptableBlotterStore, AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore'
// import redux
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
// import service
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../../Core/Services/CalendarService'
import { CalculatedColumnExpressionService } from '../../Core/Services/CalculatedColumnExpressionService'
import { IAuditService, IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { IValidationService } from '../../Core/Services/Interface/IValidationService'
import { AuditService } from '../../Core/Services/AuditService'
import { IDataChangingEvent } from '../../Core/Services/Interface/IAuditService'
import { ValidationService } from '../../Core/Services/ValidationService'
//import { ThemeService } from '../../Core/Services/ThemeService'
import { StyleService } from '../../Core/Services/StyleService'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StyleConstants from '../../Core/Constants/StyleConstants'
// import strategy
import { IStrategy } from '../../Strategy/Interface/IStrategy';
import { IMenuItem } from '../../Core/Interface/IMenu';
import { IUIError, IUIConfirmation } from '../../Core/Interface/IMessage';
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

// import other items
import { IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ICellValidationStrategy } from '../../Strategy/Interface/ICellValidationStrategy';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { Helper } from '../../Core/Helpers/Helper';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { DataType, LeafExpressionOperator, SortOrder, DisplayAction, DistinctCriteriaPairValue } from '../../Core/Enums'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { LayoutState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'



import { FilterWrapperFactory } from './FilterWrapper'
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { Color } from '../../Core/color';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair, KeyValuePair } from '../../View/UIInterfaces';
import { AboutStrategy } from '../../Strategy/AboutStrategy';
import { ApplicationStrategy } from '../../Strategy/ApplicationStrategy';
import { BulkUpdateStrategy } from '../../Strategy/BulkUpdateStrategy';
import { IAdaptableStrategyCollection, ICellInfo, IPermittedColumnValues } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { SelectColumnStrategy } from '../../Strategy/SelectColumnStrategy';
import { BlotterApi } from './BlotterApi';
import { ICalculatedColumn, ICellValidationRule, IColumnFilter, IGridSort, ILayout } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs } from '../../Core/Api/Interface/ServerSearch';
import { DataSourceStrategy } from '../../Strategy/DataSourceStrategy';
import { ColumnHelper } from '../../Core/Helpers/ColumnHelper';
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { ArrayExtensions } from '../../Core/Extensions/ArrayExtensions';
import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { AdaptableBlotterLogger } from '../../Core/Helpers/AdaptableBlotterLogger';
import * as _ from 'lodash'
import { SelectedCellsStrategy } from '../../Strategy/SelectedCellsStrategy';
import { ISelectedCell, ISelectedCellInfo } from '../../Strategy/Interface/ISelectedCellsStrategy';
import { StyleHelper } from '../../Core/Helpers/StyleHelper';

// ag-Grid imports
//if you add an import from a different folder for aggrid
//you need to add it to externals in the webpack prod file
import { GridOptions, Column, RowNode, ICellEditor, IFilterComp, ColDef, AddRangeSelectionParams } from "ag-grid"
import { Events } from "ag-grid/dist/lib/eventKeys"
import { NewValueParams, ValueGetterParams } from "ag-grid/dist/lib/entities/colDef"
import { GetMainMenuItemsParams, MenuItemDef } from "ag-grid/dist/lib/entities/gridOptions"
import { RefreshCellsParams } from "ag-grid/dist/lib/gridApi"

export class AdaptableBlotter implements IAdaptableBlotter {

    private testState: any = null

    public api: IBlotterApi
    public GridName: string = "ag-Grid"
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore
    private calculatedColumnPathMap: Map<string, string[]> = new Map()

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public ValidationService: IValidationService
    public AuditLogService: AuditLogService
    public StyleService: StyleService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService

    public BlotterOptions: IAdaptableBlotterOptions

    private COLUMN_STATE: string = "ColumnState"
    private COLUMN_GROUP_STATE: string = "ColumnGroupState"

    constructor(blotterOptions: IAdaptableBlotterOptions, private abContainer: HTMLElement, private vendorGrid: GridOptions, private gridContainer: HTMLElement) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.ValidationService = new ValidationService(this);
        this.AuditLogService = new AuditLogService(this, this.BlotterOptions);
        this.StyleService = new StyleService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, (columnId, record) => this.vendorGrid.api.getValue(columnId, record));

        // store the options in state - and also later anything else that we need...
        //   this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetBlotterOptionsAction>(GridRedux.GridSetBlotterOptions(this.BlotterOptions));

        // store any grid-specific info in this object (to be improved!) and then accessible later
        let blotterRestrictions: string[] = ["UseClassSytleNames"]
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetBlotterRestrictionsAction>(GridRedux.GridSetBlotterRestrictions(blotterRestrictions));


        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.AboutStrategyId, new AboutStrategy(this))
        this.Strategies.set(StrategyIds.ApplicationStrategyId, new ApplicationStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.BulkUpdateStrategyId, new BulkUpdateStrategy(this))
        this.Strategies.set(StrategyIds.CalculatedColumnStrategyId, new CalculatedColumnStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.ColumnFilterStrategyId, new ColumnFilterStrategy(this))
        this.Strategies.set(StrategyIds.ColumnInfoStrategyId, new ColumnInfoStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleagGridStrategy(this))
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortagGridStrategy(this))
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy(this))
        this.Strategies.set(StrategyIds.DataSourceStrategyId, new DataSourceStrategy(this))
        this.Strategies.set(StrategyIds.ExportStrategyId, new ExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsagGridStrategy(this))
        this.Strategies.set(StrategyIds.FormatColumnStrategyId, new FormatColumnagGridStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategyagGrid(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.TeamSharingStrategyId, new TeamSharingStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.DataManagementStrategyId, new DataManagementStrategy(this))
        this.Strategies.set(StrategyIds.UserFilterStrategyId, new UserFilterStrategy(this))
        // not able to select a column in hypergrid currently
        this.Strategies.set(StrategyIds.SelectColumnStrategyId, new SelectColumnStrategy(this))
        this.Strategies.set(StrategyIds.SelectedCellsStrategyId, new SelectedCellsStrategy(this))


        iPushPullHelper.isIPushPullLoaded(this.BlotterOptions.iPushPullConfig)

        ReactDOM.render(AdaptableBlotterApp(this), this.abContainer);

        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()),
                (e) => {
                    AdaptableBlotterLogger.LogError('Failed to Init AdaptableBlotterStore : ', e);
                    //for now i'm still initializing the strategies even if loading state has failed.... 
                    //we may revisit that later
                    this.Strategies.forEach(strat => strat.InitializeWithRedux())
                })
            .then(
                () => this.initInternalGridLogic(vendorGrid, gridContainer),
                (e) => {
                    AdaptableBlotterLogger.LogError('Failed to Init Strategies : ', e);
                    //for now i'm still initializing the grid even if loading state has failed.... 
                    //we may revisit that later
                    this.initInternalGridLogic(vendorGrid, gridContainer)
                }
            )

        // get the api ready
        this.api = new BlotterApi(this);


    }


    private getState(): AdaptableBlotterState {
        return this.AdaptableBlotterStore.TheStore.getState()
    }


    private createFilterWrapper(col: Column) {
        this.vendorGrid.api.destroyFilter(col)
        this.vendorGrid.api.getColumnDef(col).filter = FilterWrapperFactory(this)
        col.initialise()
    }

    public InitAuditService() {
        //Probably Temporary but we init the Audit service with current data
        this.AuditService.Init(this.vendorGrid.rowData)
    }

    private _currentEditor: ICellEditor

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> = new EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>();
    public onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> {
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

    public applyGridFiltering() {
        this.vendorGrid.api.onFilterChanged()
        this._onRefresh.Dispatch(this, this);
    }



    public hideFilterFormPopup: Function
    public hideFilterForm() {
        if (this.hideFilterFormPopup) {
            this.hideFilterFormPopup()
        }
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        let allColumns = this.vendorGrid.columnApi.getAllGridColumns()
        let startIndex: number = 0;

        //  this is not quite right as it assumes that only the first column can be grouped 
        //  but lets do this for now and then refine and refactor later to deal with weirder use cases
        if (ColumnHelper.isSpecialColumn(allColumns[0].getColId())) {
            startIndex++;
        }

        VisibleColumnList.forEach((column, index) => {
            let col = this.vendorGrid.columnApi.getColumn(column.ColumnId)
            if (!col.isVisible()) {
                this.tempSetColumnVisibleFixForBuild(this.vendorGrid.columnApi, col, true, "api")
               // this.vendorGrid.columnApi.setColumnVisible(col, true, "api") // not sure if this right - there is a new parametr of columneventtype here...
            }
          //  this.vendorGrid.columnApi.moveColumn(col, startIndex + index, "api") // not sure if this right - there is a new parametr of columneventtype here...
            this.tempMoveColumnFixForBuild( this.vendorGrid.columnApi, col, startIndex + index, "api");
        })
        allColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0).forEach((col => {
            this.tempSetColumnVisibleFixForBuild(this.vendorGrid.columnApi, col, false, "api")
        //    this.vendorGrid.columnApi.setColumnVisible(col, false, "api") // not sure if this right - there is a new parametr of columneventtype here...
        }))
        // we need to do this to make sure agGrid and Blotter cols collections are in sync
        this.setColumnIntoStore();
    }

    public setColumnIntoStore() {
        let hiddenColumns: IColumn[] = []
        let visibleColumns: IColumn[] = []

        let vendorCols: any[] = this.vendorGrid.columnApi.getAllGridColumns()

        vendorCols.forEach((col, index) => {
            let colId: string = col.getColId()
            if (!ColumnHelper.isSpecialColumn(colId)) {
                if (col.isVisible()) {
                    let visibleCol: IColumn = {
                        ColumnId: colId,
                        FriendlyName: this.vendorGrid.columnApi.getDisplayNameForColumn(col, 'header'),
                        DataType: this.getColumnDataType(col),
                        Visible: true,
                        Index: index,
                        ReadOnly: this.isColumnReadonly(colId)
                    }
                    visibleColumns.push(visibleCol)
                } else {
                    let hiddenCol: IColumn = {
                        ColumnId: colId,
                        FriendlyName: this.vendorGrid.columnApi.getDisplayNameForColumn(col, 'header'),
                        DataType: this.getColumnDataType(col),
                        Visible: false,
                        Index: index,
                        ReadOnly: this.isColumnReadonly(colId)
                    }
                    visibleColumns.push(hiddenCol)
                }
            }
        })


        let allColumns = visibleColumns.concat(hiddenColumns)
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetColumnsAction>(GridRedux.GridSetColumns(allColumns));
        let blotter = this
        let quickSearchClassName: string = StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Style.ClassName) ?
            blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Style.ClassName :
            StyleHelper.CreateStyleName(StrategyIds.QuickSearchStrategyId, this)
        for (let col of allColumns) {
            let cellClassRules: any = {};
            cellClassRules[quickSearchClassName] = function (params: any) {
                let columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
                let quickSearchState = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
                if (StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)
                    && (quickSearchState.DisplayAction == DisplayAction.HighlightCell
                        || quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell)) {
                    let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                    let displayValue = blotter.getDisplayValueFromRecord(params.node, columnId);
                    let rowId = blotter.getPrimaryKeyValueFromRecord(params.node);
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
                return false;
            }
            this.setCellClassRules(cellClassRules, col.ColumnId, "QuickSearch")
        }

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
        return this.vendorGrid.api.getValue(this.BlotterOptions.primaryKey, record)
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
        let activeCell = this.vendorGrid.api.getFocusedCell()
        if (activeCell) {
            let rowNode = this.vendorGrid.api.getModel().getRow(activeCell.rowIndex)
            //if the selected cell is from a group cell we don't return it
            //that's a design choice as this is used only when editing and you cant edit those cells
            if (rowNode && !rowNode.group) {
                return {
                    ColumnId: activeCell.column.getColId(),
                    Id: this.getPrimaryKeyValueFromRecord(rowNode),
                    Value: this.vendorGrid.api.getValue(activeCell.column, rowNode)
                }
            }
        }
    }

    debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), 500);

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    public setSelectedCells(): void {
        let selectionMap: Map<string, ISelectedCell[]> = new Map<string, ISelectedCell[]>();
        let selected = this.vendorGrid.api.getRangeSelections();
        let columns: IColumn[] = []
        if (selected) {
            //we iterate for each ranges
            selected.forEach((rangeSelection, index) => {
                let y1 = Math.min(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                let y2 = Math.max(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                for (let column of rangeSelection.columns) {
                    let colId: string = column.getColId();
                    if (index == 0) {
                        let selectedColumn: IColumn = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == colId);
                        //   let dataType = DataType.Number;
                        //   let isReadonly: boolean = this.isColumnReadonly(colId)
                        columns.push(selectedColumn);
                    }

                    for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
                        let rowNode = this.vendorGrid.api.getModel().getRow(rowIndex)
                        //if the selected cells are from a group cell we don't return it
                        //that's a design choice as this is used only when editing and you cant edit those cells
                        if (rowNode && !rowNode.group) {
                            let primaryKey = this.getPrimaryKeyValueFromRecord(rowNode)
                            let value = this.vendorGrid.api.getValue(column, rowNode)
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

    //We deduce the type here. I couldnt find a way to get it through the definition
    private getColumnDataType(column: Column): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            AdaptableBlotterLogger.LogMessage('columnId is undefined returning String for Type')
            return DataType.String;
        }

        // get the column type if already in store (and not unknwown)
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

        let row = this.vendorGrid.api.getModel().getRow(0)

        if (row == null) { // possible that there will be no data.
            AdaptableBlotterLogger.LogWarning('there is no first row so we are returning Unknown for Type')
            return DataType.Unknown;
        }
        //if it's a group we need the content of the group
        if (row.group) {
            row = row.childrenAfterGroup[0]
        }
        let value = this.vendorGrid.api.getValue(column, row)
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
        this.vendorGrid.api.getModel().forEachNode(rowNode => {
            if (cellInfo.Id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                let oldValue = this.vendorGrid.api.getValue(cellInfo.ColumnId, rowNode)
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
        this.vendorGrid.api.clearRangeSelection();
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see

        // using new method... (JW, 11/3/18)
        var itemsToUpdate: any[] = [];
        var dataChangedEvents: IDataChangedEvent[] = []
        this.vendorGrid.api.getModel().forEachNode(rowNode => {
            let value = batchValues.find(x => x.Id == this.getPrimaryKeyValueFromRecord(rowNode))
            if (value) {

                let oldValue = this.vendorGrid.api.getValue(value.ColumnId, rowNode)

                var data: any = rowNode.data;
                data[value.ColumnId] = value.Value;
                itemsToUpdate.push(data);

                //   rowNode.setDataValue(value.ColumnId, value.Value)

                //    var res = this.vendorGrid.api.updateRowData({ update: itemsToUpdate });


                let dataChangedEvent: IDataChangedEvent = {
                    OldValue: oldValue,
                    NewValue: value.Value,
                    ColumnId: value.ColumnId,
                    IdentifierValue: value.Id,
                    Timestamp: null,
                    Record: null
                }
                //     this.AuditService.CreateAuditChangedEvent(dataChangedEvent);

                //   this.AuditLogService.AddEditCellAuditLog(dataChangedEvent)

                dataChangedEvents.push(dataChangedEvent)
            }
        })
        var res = this.vendorGrid.api.updateRowData({ update: itemsToUpdate });
        this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        dataChangedEvents.forEach(dc => this.AuditService.CreateAuditChangedEvent(dc));


        this.applyGridFiltering();

        this.vendorGrid.api.clearRangeSelection();
    }

    public cancelEdit() {
        this.vendorGrid.api.stopEditing(true)
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any {
        if (type == "getColumnValue") {
            let rowNodeSearch: RowNode
            //ag-grid doesn't support FindRow based on data
            // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
            this.vendorGrid.api.getModel().forEachNode(rowNode => {
                if (id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                    rowNodeSearch = rowNode
                }
            })
            return (columnId: string) => { return this.vendorGrid.api.getValue(columnId, rowNodeSearch); }
        }
        else {
            return (columnId: string) => { return this.getDisplayValue(id, columnId); }
        }
    }

    public getRecordIsSatisfiedFunctionFromRecord(record: RowNode, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any {
        if (type == "getColumnValue") {
            return (columnId: string) => { return this.vendorGrid.api.getValue(columnId, record) }
        }
        else {
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
        let colDef = this.vendorGrid.api.getColumnDef(columnId)
        if (typeof colDef.editable == 'boolean') {
            return !colDef.editable;
        }
        else {
            return true
        }
    }

    public setCustomSort(columnId: string, comparer: Function): void {

        let sortModel = this.vendorGrid.api.getSortModel()
        let columnDef = this.vendorGrid.api.getColumnDef(columnId);

        if (columnDef) {
            columnDef.comparator = <any>comparer
        }
        this.vendorGrid.api.setSortModel(sortModel)
    }

    public removeCustomSort(columnId: string): void {
        let sortModel = this.vendorGrid.api.getSortModel()
        let columnDef = this.vendorGrid.api.getColumnDef(columnId);

        if (columnDef) {
            columnDef.comparator = null
        }
        this.vendorGrid.api.setSortModel(sortModel)
    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();

        let permittedValues: IPermittedColumnValues[] = this.getState().UserInterface.PermittedColumnValues
        let permittedValuesForColumn = permittedValues.find(pc => pc.ColumnId == columnId);
        if (permittedValuesForColumn) {
            permittedValuesForColumn.PermittedValues.forEach(pv => {
                returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
            })
        } else {
            //we use forEachNode as we want to get all data even the one filtered out...
            let data = this.vendorGrid.api.forEachNode(rowNode => {
                //we do not return the values of the aggregates when in grouping mode
                //otherwise they wxould appear in the filter dropdown etc....
                if (!rowNode.group) {
                    let displayString = this.getDisplayValueFromRecord(rowNode, columnId)
                    let rawValue = this.vendorGrid.api.getValue(columnId, rowNode)
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
        this.vendorGrid.api.getModel().forEachNode(rowNode => {
            if (id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                returnValue = this.getDisplayValueFromRecord(rowNode, columnId)
            }
        })
        return returnValue
    }

    public getDisplayValueFromRecord(row: RowNode, columnId: string): string {
        //TODO : this method needs optimizing since getting the column everytime seems costly
        //we do not handle yet if the column uses a template... we handle only if it's using a renderer
        let colDef = this.vendorGrid.api.getColumnDef(columnId)
        let rawValue = this.vendorGrid.api.getValue(columnId, row)
        if (colDef.valueFormatter) {
            let formatter: any = colDef.valueFormatter
            let formattedValue = formatter({ value: rawValue })
            if (colDef.cellRenderer) {
                let render: any = colDef.cellRenderer
                if (typeof render == "string") {
                    return String(formattedValue)
                }
                return render({ value: formattedValue }) || "";
            }
            return formattedValue || ""
        }
        else if (colDef.cellRenderer) {
            let render: any = colDef.cellRenderer
            if (typeof render == "string") {
                return String(rawValue)
            }
            return render({ value: rawValue }) || "";
        }
        else {
            return String(rawValue) || "";
        }
    }


    public setCellClassRules(cellClassRules: any, columnId: string, type: "ConditionalStyle" | "QuickSearch" | "FlashingCell" | "FormatColumn") {
        let localCellClassRules = this.vendorGrid.columnApi.getColumn(columnId).getColDef().cellClassRules

        if (localCellClassRules) {

            if (type == "FormatColumn") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyIds.FormatColumnStrategyId)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            else if (type == "ConditionalStyle") {
                let cssStyles: string[] = this.getState().ConditionalStyle.ConditionalStyles.map(c => c.Style.ClassName);
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyIds.ConditionalStyleStrategyId) || ArrayExtensions.ContainsItem(cssStyles, prop)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            //Is initialized in setColumnIntoStore
            else if (type == "QuickSearch") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyIds.QuickSearchStrategyId)) {
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
            this.vendorGrid.columnApi.getColumn(columnId).getColDef().cellClassRules = cellClassRules;
        }
    }

    public forAllRecordsDo(func: (record: any) => any) {
        this.vendorGrid.api.getModel().forEachNode(rowNode => {
            func(rowNode)
        });
    }

    public forAllVisibleRecordsDo(func: (record: any) => any) {
        this.vendorGrid.api.forEachNodeAfterFilterAndSort(rowNode => {
            func(rowNode)
        });
    }

    public redrawRows() {
        this.vendorGrid.api.redrawRows();
        this._onRefresh.Dispatch(this, this)
    }

    public refreshCells(rowNode: RowNode, columnIds: string[]) {
        this.vendorGrid.api.refreshCells({ rowNodes: [rowNode], columns: columnIds, force: true });
    }

    public removeCalculatedColumnFromGrid(calculatedColumnID: string) {
        let colDef = this.vendorGrid.columnApi.getAllColumns().map(x => x.getColDef())
        let colDefIndex = colDef.findIndex(x => x.headerName == calculatedColumnID)
        if (colDefIndex > -1) {
            colDef.splice(colDefIndex, 1)
            this.vendorGrid.api.setColumnDefs(colDef)
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
        let colDef = this.vendorGrid.columnApi.getAllColumns().map(x => x.getColDef())
        colDef.push({
            headerName: calculatedColumn.ColumnId,
            colId: calculatedColumn.ColumnId,
            valueGetter: (params: ValueGetterParams) => this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, params.node)
        })
        this.vendorGrid.api.setColumnDefs(colDef)
        let columnList = this.CalculatedColumnExpressionService.getColumnListFromExpression(calculatedColumn.ColumnExpression)
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column)
            if (!childrenColumnList) {
                childrenColumnList = []
                this.calculatedColumnPathMap.set(column, childrenColumnList)
            }
            childrenColumnList.push(calculatedColumn.ColumnId)
        }
        this.setColumnIntoStore();
        let col = this.vendorGrid.columnApi.getAllGridColumns().find(col => col.getColId() == calculatedColumn.ColumnId)
        if (col) {
            this.createFilterWrapper(col)
        }
        let conditionalStyleagGridStrategy: IConditionalStyleStrategy = this.Strategies.get(StrategyIds.ConditionalStyleStrategyId) as IConditionalStyleStrategy;
        conditionalStyleagGridStrategy.InitStyles();
    }

    public getFirstRecord() {
        let record: RowNode
        this.vendorGrid.api.forEachNode(rowNode => {
            if (!rowNode.group) {
                if (!record) {
                    record = rowNode
                }
            }
        })
        return record;
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.abContainer);
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


    private initInternalGridLogic(vendorGrid: GridOptions, gridContainer: HTMLElement) {
        // vendorGrid.api.addGlobalListener((type: string, event: any) => {
        //     //console.log(event)
        // });
        //we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type 
        //since there are many events and we want them to behave the same
        let columnEventsThatTriggersStateChange = [Events.EVENT_COLUMN_MOVED,
        Events.EVENT_GRID_COLUMNS_CHANGED,
        Events.EVENT_COLUMN_EVERYTHING_CHANGED,
        Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
        Events.EVENT_COLUMN_VISIBLE,
        Events.EVENT_NEW_COLUMNS_LOADED];
        vendorGrid.api.addGlobalListener((type: string, event: any) => {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                // bit messy but better than alternative which was calling setColumnIntoStore for every single column
                let popupState = this.getState().Popup.ScreenPopup;
                if (popupState.ShowPopup && popupState.ComponentName == ScreenPopups.ColumnChooserPopup) {
                    // ignore
                } else {
                    this.setColumnIntoStore();
                }
            }
        });
        gridContainer.addEventListener("keydown", (event) => this._onKeyDown.Dispatch(this, event));
        vendorGrid.api.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
            //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
            let editor = (<any>this.vendorGrid.api).rowRenderer.rowCompsByIndex[params.node.rowIndex].cellComps[params.column.getColId()].cellEditor;
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
                    let cellValidationStrategy: ICellValidationStrategy = this.Strategies.get(StrategyIds.CellValidationStrategyId) as ICellValidationStrategy;
                    // first see if its an error = should only be one item in array if so
                    if (failedRules[0].CellValidationMode == "Stop Edit") {
                        let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                        let error: IUIError = {
                            ErrorHeader: "Validation Error",
                            ErrorMsg: errorMessage
                        };
                        this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));
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
                            ConfirmAction: GridRedux.GridSetValueLikeEdit(cellInfo, this.vendorGrid.api.getValue(params.column.getColId(), params.node)),
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
                            OldValue: this.vendorGrid.api.getValue(params.column.getColId(), params.node),
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
        vendorGrid.api.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, (params: any) => {
            //(<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = null;
            //We refresh the filter so we get live search/filter when editing.
            //Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
            this.applyGridFiltering();
            this.testing();
        });
        vendorGrid.api.addEventListener(Events.EVENT_SELECTION_CHANGED, (params: any) => {
            this.testing();
        });
        vendorGrid.api.addEventListener(Events.EVENT_RANGE_SELECTION_CHANGED, (params: any) => {
            this.testing();
            //   this._onSelectedCellsChanged.Dispatch(this, this)
        });
        vendorGrid.api.addEventListener(Events.EVENT_SORT_CHANGED, (params: any) => {
            this.onSortChanged(params)
        });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_UPDATED, (params: any) => {
        //  });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_CHANGED, (params: any) => {
        //});
        vendorGrid.api.addEventListener(Events.EVENT_MODEL_UPDATED, (params: any) => {
            // not sure about this - doing it to make sure that we set the columns properly at least once!
            this.checkColumnsDataTypeSet();
        });


        vendorGrid.api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, (params: NewValueParams) => {
            let identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
            this.AuditService.CreateAuditEvent(identifierValue, params.newValue, params.colDef.field, params.node);
            //24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
            //so we manually raise.
            //https://github.com/jonathannaim/adaptableblotter/issues/118
            let columnList = this.calculatedColumnPathMap.get(params.colDef.field);
            if (columnList) {
                columnList.forEach(x => {
                    let newValue = this.vendorGrid.api.getValue(x, params.node);
                    this.AuditService.CreateAuditEvent(identifierValue, newValue, x, params.node);
                });
            }
        });

        //We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
        let originalisExternalFilterPresent = vendorGrid.isExternalFilterPresent;
        vendorGrid.isExternalFilterPresent = () => {
            let isFilterActive = this.getState().Filter.ColumnFilters.length > 0;
            if (isFilterActive) {
                //used in particular at init time to show the filter icon correctly
                for (let colFilter of this.getState().Filter.ColumnFilters) {
                    if (!this.vendorGrid.columnApi.getColumn(colFilter.ColumnId).isFilterActive()) {
                        this.vendorGrid.columnApi.getColumn(colFilter.ColumnId).setFilterActive(true);
                    }
                }
            }
            let isSearchActive = StringExtensions.IsNotNullOrEmpty(this.getState().AdvancedSearch.CurrentAdvancedSearch);
            let isQuickSearchActive = StringExtensions.IsNotNullOrEmpty(this.getState().QuickSearch.QuickSearchText);
            //it means that originaldoesExternalFilterPass will be called to we reinit that collection
            return isFilterActive || isSearchActive || isQuickSearchActive || (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false);
        };
        let originaldoesExternalFilterPass = vendorGrid.doesExternalFilterPass;
        vendorGrid.doesExternalFilterPass = (node: RowNode) => {
            let columns = this.getState().Grid.Columns;

            // let rowId = this.getPrimaryKeyValueFromRecord(node)
            //first we assess AdvancedSearch (if its running locally)
            if (this.BlotterOptions.serverSearchOption == 'None') {
                let currentSearchName = this.getState().AdvancedSearch.CurrentAdvancedSearch;
                if (StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                    // if its a static search then it wont be in advanced searches so nothing to do
                    let currentSearch = this.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
                    if (currentSearch) {
                        if (!ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, node, columns, this)) {
                            // if (!ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, this)) {
                            return false;
                        }
                    }
                }
            }
            //we then assess filters
            if (this.BlotterOptions.serverSearchOption == 'None' || 'AdvancedSearch') {
                let columnFilters: IColumnFilter[] = this.getState().Filter.ColumnFilters;
                if (columnFilters.length > 0) {
                    for (let columnFilter of columnFilters) {
                        if (!ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, node, columns, this)) {
                            // if (!ExpressionHelper.checkForExpression(columnFilter.Filter, rowId, columns, this)) {
                            return false;
                        }
                    }
                }
                //we assess quicksearch
                let recordReturnValue = false;
                let quickSearchState = this.getState().QuickSearch;
                if (StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
                    && quickSearchState.DisplayAction != DisplayAction.HighlightCell) {
                    let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                    for (let column of columns.filter(c => c.Visible)) {
                        let displayValue = this.getDisplayValueFromRecord(node, column.ColumnId);
                        let rowId = this.getPrimaryKeyValueFromRecord(node);
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
                    return false;
                }
            }
            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
        };
        this.vendorGrid.columnApi.getAllGridColumns().forEach(col => {
            this.createFilterWrapper(col);
        });
        let originalgetMainMenuItems = vendorGrid.getMainMenuItems;
        vendorGrid.getMainMenuItems = (params: GetMainMenuItemsParams) => {
            //couldnt find a way to listen for menu close. There is a Menu Item Select 
            //but you can also clsoe the menu from filter and clicking outside the menu....
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.HideColumnContextMenu());
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(params.column.getColId(), 0, 0));
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
                let glyph = this.abContainer.ownerDocument.createElement("span");
                glyph.className = "glyphicon glyphicon-" + x.GlyphIcon;
                colMenuItems.push({
                    name: x.Label,
                    action: () => this.AdaptableBlotterStore.TheStore.dispatch(x.Action),
                    icon: glyph
                });
            });
            return colMenuItems;
        };
        this.AdaptableBlotterStore.Load.then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()), (e) => {
            AdaptableBlotterLogger.LogError('Failed to Init AdaptableBlotterStore : ', e);
            //for now i'm still initializing the strategies even if loading state has failed.... 
            //we may revisit that later
            this.Strategies.forEach(strat => strat.InitializeWithRedux());
        });
    }

    private onSortChanged(params: any): void {
        let sortModel: any[] = this.vendorGrid.api.getSortModel();

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

    public getRowInfo(): any {
        return this.vendorGrid.api.getModel().getRowCount()
    }

    public getColumnInfo(): any {
        return this.vendorGrid.columnApi.getAllColumns().length;
    }

    public selectColumn(columnId: string) {
        this.vendorGrid.api.clearRangeSelection();
        let rangeSelectionParams: AddRangeSelectionParams = {
            rowStart: 0,
            rowEnd: this.vendorGrid.api.getDisplayedRowCount(),
            columnStart: columnId,
            columnEnd: columnId,
            floatingStart: "top",
            floatingEnd: "bottom"
        }
        this.vendorGrid.api.addRangeSelection(rangeSelectionParams)
    }

    public setGridSort(gridSorts: IGridSort[]): void {
        // get the sort model
        let sortModel: any[] = []
        gridSorts.forEach(gs => {
            let sortDescription: string = (gs.SortOrder == SortOrder.Ascending) ? "asc" : "desc"
            sortModel.push({ colId: gs.Column, sort: sortDescription })
        })
        this.vendorGrid.api.setSortModel(sortModel)
        this.vendorGrid.api.onSortChanged();
    }

    public setData(dataSource: any) {
        this.vendorGrid.api.setRowData(dataSource)
    }



    private checkColumnsDataTypeSet(): any {
        // check that we have no unknown columns - if we do then ok
        let firstCol = this.getState().Grid.Columns[0];
        if (firstCol.DataType == DataType.Unknown) {
            this.setColumnIntoStore();
        }
    }

    public getVendorGridState(visibleCols: string[]): any {
        let columnState = this.vendorGrid.columnApi.getColumnState();
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
        //  let columnKVP: KeyValuePair = { Key: this.COLUMN_STATE, Value: this.vendorGrid.columnApi.getColumnState() };
        //  let columnGroupKVP: KeyValuePair = { Key: this.COLUMN_GROUP_STATE, Value: this.vendorGrid.columnApi.getColumnGroupState() };
        //  let myArray = [columnKVP, columnGroupKVP]
        let mystring: any = JSON.stringify(columnState)
        return mystring;
    }

    public setVendorGridState(vendorGridState: any): void {
        if (vendorGridState) {
            let columnState: any = JSON.parse(vendorGridState);
            if (columnState) {
                this.vendorGrid.columnApi.setColumnState(columnState, "api")
            }
        }
        //   let columnStateKVP: KeyValuePair = vendorGridInfo.find(vgi => vgi.Key == this.COLUMN_STATE)
        //    if (columnStateKVP) {
        //        this.vendorGrid.columnApi.setState(columnStateKVP.Value, "api");
        //  }

        //  let columnGroupStateKVP: KeyValuePair = vendorGridInfo.find(vgi => vgi.Key == this.COLUMN_GROUP_STATE)
        //  if (columnGroupStateKVP) {
        //      this.vendorGrid.columnApi.setColumnGroupState(columnGroupStateKVP.Value, "api");
        //   }


    }


    private testing(): void {
        this.debouncedSetSelectedCells()

    }

    private tempSetColumnVisibleFixForBuild(columnApi:any, col: any, isVisible: boolean, columnEventType: string){
       columnApi.setColumnVisible(col, true, "api")
    }

    private tempMoveColumnFixForBuild(columnApi:any, col: any, index: number, columnEventType: string){
        columnApi.moveColumn(col, index, "api")
    }



}






