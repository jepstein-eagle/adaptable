import '../../../stylesheets/adaptableblotter-style.css'
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
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
import { UserDataManagementStrategy } from '../../Strategy/UserDataManagementStrategy'
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
import { ICalculatedColumn } from "../../Strategy/Interface/ICalculatedColumnStrategy";
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';

// import other items
import { IColumnFilter, IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ICellValidationRule, ICellValidationStrategy } from '../../Strategy/Interface/ICellValidationStrategy';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { Helper } from '../../Core/Helpers/Helper';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { DataType, LeafExpressionOperator, SortOrder, QuickSearchDisplayType, DistinctCriteriaPairValue, CellValidationMode } from '../../Core/Enums'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { LayoutState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'

//if you add an import from a different folder for aggrid
//you need to add it to externals in the webpack prod file
import { GridOptions, Column, RowNode, ICellEditor, IFilterComp, ColDef } from "ag-grid"
import { Events } from "ag-grid/dist/lib/eventKeys"
import { NewValueParams, ValueGetterParams } from "ag-grid/dist/lib/entities/colDef"
import { GetMainMenuItemsParams, MenuItemDef } from "ag-grid/dist/lib/entities/gridOptions"
import { RefreshCellsParams } from "ag-grid/dist/lib/gridApi"

import { FilterWrapperFactory } from './FilterWrapper'
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { Color } from '../../Core/color';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { AboutStrategy } from '../../Strategy/AboutStrategy';
import { BulkUpdateStrategy } from '../../Strategy/BulkUpdateStrategy';
import { IAdaptableStrategyCollection, ICellInfo, ISelectedCells } from '../../Core/Interface/Interfaces';
import { IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotterOptions';
import { IColumn } from '../../Core/Interface/IColumn';

export class AdaptableBlotter implements IAdaptableBlotter {

    public GridName: string = "ag-Grid"
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore
    private calculatedColumnPathMap: Map<string, string[]> = new Map()

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public ValidationService: IValidationService
    // public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    public BlotterOptions: IAdaptableBlotterOptions
    public StyleService: StyleService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService

    constructor(private gridOptions: GridOptions, private container: HTMLElement, private gridContainer: HTMLElement, options?: IAdaptableBlotterOptions) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, options)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.ValidationService = new ValidationService(this);
        //   this.ThemeService = new ThemeService(this)
        this.AuditLogService = new AuditLogService(this);
        this.StyleService = new StyleService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, (columnId, record) => this.gridOptions.api.getValue(columnId, record));

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.AboutStrategyId, new AboutStrategy(this))
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
        this.Strategies.set(StrategyIds.ExportStrategyId, new ExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsagGridStrategy(this))
        this.Strategies.set(StrategyIds.FormatColumnStrategyId, new FormatColumnagGridStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategyagGrid(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.TeamSharingStrategyId, new TeamSharingStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.UserFilterStrategyId, new UserFilterStrategy(this))

        iPushPullHelper.isIPushPullLoaded(this.BlotterOptions.iPushPullConfig)

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()),
                (e) => {
                    console.error('Failed to Init AdaptableBlotterStore : ', e);
                    //for now i'm still initializing the strategies even if loading state has failed.... 
                    //we may revisit that later
                    this.Strategies.forEach(strat => strat.InitializeWithRedux())
                })
            .then(
                () => this.initInternalGridLogic(gridOptions, gridContainer),
                (e) => {
                    console.error('Failed to Init Strategies : ', e);
                    //for now i'm still initializing the grid even if loading state has failed.... 
                    //we may revisit that later
                    this.initInternalGridLogic(gridOptions, gridContainer)
                }
            )
    }

    private createFilterWrapper(col: Column) {
        this.gridOptions.api.destroyFilter(col)
        this.gridOptions.api.getColumnDef(col).filter = FilterWrapperFactory(this)
        col.initialise()
    }

    public InitAuditService() {
        //Probably Temporary but we init the Audit service with current data
        this.AuditService.Init(this.gridOptions.rowData)
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

    public applyColumnFilters() {
        this.gridOptions.api.onFilterChanged()
        this._onRefresh.Dispatch(this, this);
    }

    public setColumnIntoStore() {
        let visibleColumns = this.gridOptions.columnApi.getAllGridColumns().filter(x => x.isVisible()).map((col, index) => {
            return {
                ColumnId: col.getColId(),
                FriendlyName: this.gridOptions.columnApi.getDisplayNameForColumn(col, 'header'),
                DataType: this.getColumnDataType(col),
                Visible: col.isVisible(),
                Index: index
            }
        })
        let hiddenColumns = this.gridOptions.columnApi.getAllColumns().filter(x => !x.isVisible()).map(col => {
            return {
                ColumnId: col.getColId(),
                FriendlyName: this.gridOptions.columnApi.getDisplayNameForColumn(col, 'header'),
                DataType: this.getColumnDataType(col),
                Visible: col.isVisible(),
                Index: -1
            }
        })

        let allColumns = visibleColumns.concat(hiddenColumns)
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetColumnsAction>(GridRedux.GridSetColumns(allColumns));
        let blotter = this
        for (let col of allColumns) {
            this.setCellClassRules({
                'Ab-QuickSearch': function (params: any) {
                    let columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
                    let quickSearchState = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
                    if (StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)
                        && (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.HighlightCell
                            || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndHighlightCell)) {
                        let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                        let displayValue = blotter.getDisplayValueFromRecord(params.node, columnId);
                        let rowId = blotter.getPrimaryKeyValueFromRecord(params.node);
                        let stringValueLowerCase = displayValue.toLowerCase();
                        switch (blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchOperator) {
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
            }, col.ColumnId, "QuickSearch")
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
        VisibleColumnList.forEach((column, index) => {
            let col = this.gridOptions.columnApi.getColumn(column.ColumnId)
            if (!col.isVisible()) {
                this.gridOptions.columnApi.setColumnVisible(col, true, "api") // not sure if this right - there is a new parametr of columneventtype here...
            }
            this.gridOptions.columnApi.moveColumn(col, index, "api") // not sure if this right - there is a new parametr of columneventtype here...
        })
        allColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0).forEach((col => {
            this.gridOptions.columnApi.setColumnVisible(col, false, "api") // not sure if this right - there is a new parametr of columneventtype here...
        }))
    }

    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => {
            let menuItem = x.getPopupMenuItem()
            if (menuItem != null) {
                menuItems.push(menuItem);
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

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    public getSelectedCells(): ISelectedCells {
        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        let selected = this.gridOptions.api.getRangeSelections();
        if (selected) {
            //we iterate for each ranges
            selected.forEach((rangeSelection, index) => {
                for (let column of rangeSelection.columns) {
                    let y1 = Math.min(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                    let y2 = Math.max(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                    for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
                        let rowNode = this.gridOptions.api.getModel().getRow(rowIndex)
                        //if the selected cells are from a group cell we don't return it
                        //that's a design choice as this is used only when editing and you cant edit those cells
                        if (rowNode && !rowNode.group) {
                            let primaryKey = this.getPrimaryKeyValueFromRecord(rowNode)
                            let value = this.gridOptions.api.getValue(column, rowNode)
                            let valueArray = selectionMap.get(primaryKey);
                            if (valueArray == undefined) {
                                valueArray = []
                                selectionMap.set(primaryKey, valueArray);
                            }
                            valueArray.push({ columnID: column.getColId(), value: value });
                        }
                    }
                }
            });
        }
        return {
            Selection: selectionMap
        };
    }

    //We deduce the type here. I couldnt find a way to get it through the definition
    private getColumnDataType(column: Column): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            console.log('columnId is undefined returning String for Type')
            return DataType.String;
        }

        let row = this.gridOptions.api.getModel().getRow(0)
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
        console.log('There is no defined type. Defaulting to type of the first value for column ' + column.getColId(), dataType)
        return dataType
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
        this.applyColumnFilters();
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

                //   rowNode.setDataValue(value.ColumnId, value.Value)

                //    var res = this.gridOptions.api.updateRowData({ update: itemsToUpdate });


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
        var res = this.gridOptions.api.updateRowData({ update: itemsToUpdate });
        this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        dataChangedEvents.forEach(dc => this.AuditService.CreateAuditChangedEvent(dc));


        this.applyColumnFilters();
    }

    public cancelEdit() {
        this.gridOptions.api.stopEditing(true)
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            let rowNodeSearch: RowNode
            //ag-grid doesn't support FindRow based on data
            // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
            this.gridOptions.api.getModel().forEachNode(rowNode => {
                if (id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                    rowNodeSearch = rowNode
                }
            })
            return (columnName: string) => { return this.gridOptions.api.getValue(columnName, rowNodeSearch); }
        }
        else {
            return (columnName: string) => { return this.getDisplayValue(id, columnName); }
        }
    }

    public getRecordIsSatisfiedFunctionFromRecord(record: RowNode, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            return (columnName: string) => { return this.gridOptions.api.getValue(columnName, record) }
        }
        else {
            return (columnName: string) => { return this.getDisplayValueFromRecord(record, columnName); }
        }
    }

    public selectCells(cells: ICellInfo[]): void {
        // todo?
    }

    public getColumnIndex(columnName: string): number {
        return null
    }

    public isColumnReadonly(columnId: string): boolean {
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
        //we use forEachNode as we want to get all data even the one filtered out...
        let data = this.gridOptions.api.forEachNode(rowNode => {
            //we do not return the values of the aggregates when in grouping mode
            //otherwise they would appear in the filter dropdown etc....
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
        return Array.from(returnMap.values()).slice(0, this.BlotterOptions.maxColumnValueItemsDisplayed);
    }

    public getDisplayValue(id: any, columnId: string): string {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        let returnValue: string
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            if (id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                returnValue = this.getDisplayValueFromRecord(rowNode, columnId)
            }
        })
        return returnValue
    }

    public getDisplayValueFromRecord(row: RowNode, columnId: string): string {
        //TODO : this method needs optimizing since getting the column everytime seems costly
        //we do not handle yet if the column uses a template... we handle only if it's using a renderer
        let colDef = this.gridOptions.api.getColumnDef(columnId)
        let rawValue = this.gridOptions.api.getValue(columnId, row)
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
        let localCellClassRules = this.gridOptions.columnApi.getColumn(columnId).getColDef().cellClassRules
        if (localCellClassRules) {

            if (type == "FormatColumn") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StyleConstants.FORMAT_COLUMN_STYLE)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            else if (type == "ConditionalStyle") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StyleConstants.CONDITIONAL_STYLE_STYLE)) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            //Is initialized in setColumnIntoStore
            else if (type == "QuickSearch") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StyleConstants.QUICK_SEARCH_STYLE)) {
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

    public deleteCalculatedColumn(calculatedColumnID: string) {
        let colDef = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef())
        let colDefIndex = colDef.findIndex(x => x.headerName == calculatedColumnID)
        if (colDefIndex > -1) {
            colDef.splice(colDefIndex, 1)
            this.gridOptions.api.setColumnDefs(colDef)
        }
        for (let columnList of this.calculatedColumnPathMap.values()) {
            let index = columnList.indexOf(calculatedColumnID);
            if (index > -1) {
                columnList.splice(index, 1);
            }
        }
        this.setColumnIntoStore();
    }
    public createCalculatedColumn(calculatedColumn: ICalculatedColumn) {
        let colDef = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef())
        colDef.push({
            headerName: calculatedColumn.ColumnId,
            colId: calculatedColumn.ColumnId,
            valueGetter: (params: ValueGetterParams) => this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.GetValueFunc, params.node)
        })
        this.gridOptions.api.setColumnDefs(colDef)
        let columnList = this.CalculatedColumnExpressionService.getColumnListFromExpression(calculatedColumn.GetValueFunc)
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column)
            if (!childrenColumnList) {
                childrenColumnList = []
                this.calculatedColumnPathMap.set(column, childrenColumnList)
            }
            childrenColumnList.push(calculatedColumn.ColumnId)
        }
        this.setColumnIntoStore();
        let col = this.gridOptions.columnApi.getAllGridColumns().find(col => col.getColId() == calculatedColumn.ColumnId)
        if (col) {
            this.createFilterWrapper(col)
        }
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
        ReactDOM.unmountComponentAtNode(this.container);
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
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
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
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
                    let cellElement: HTMLElement = document.querySelector(".ag-cell[col-id='" + col.ColumnId + "']") as HTMLElement
                    let headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null)
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign }
                })
            },

        }
    }


    private initInternalGridLogic(gridOptions: GridOptions, gridContainer: HTMLElement) {
        // gridOptions.api.addGlobalListener((type: string, event: any) => {
        //     //console.log(event)
        // });
        //we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type 
        //since there are many events and we want them to behave the same
        let columnEventsThatTriggersStateChange = [Events.EVENT_COLUMN_MOVED,
        Events.EVENT_GRID_COLUMNS_CHANGED,
        Events.EVENT_COLUMN_VISIBLE,
        Events.EVENT_NEW_COLUMNS_LOADED];
        gridOptions.api.addGlobalListener((type: string, event: any) => {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                this.setColumnIntoStore();
            }
        });
        gridContainer.addEventListener("keydown", (event) => this._onKeyDown.Dispatch(this, event));
        gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
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
                    let cellValidationStrategy: ICellValidationStrategy = this.Strategies.get(StrategyIds.CellValidationStrategyId) as ICellValidationStrategy;
                    // first see if its an error = should only be one item in array if so
                    if (failedRules[0].CellValidationMode == CellValidationMode.StopEdit) {
                        let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                        let error: IUIError = {
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
        gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, (params: any) => {
            //(<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = null;
            //We refresh the filter so we get live search/filter when editing.
            //Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
            this.applyColumnFilters();
        });
        gridOptions.api.addEventListener(Events.EVENT_SELECTION_CHANGED, (params: any) => {
            this._onSelectedCellsChanged.Dispatch(this, this)
        });
        gridOptions.api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, (params: NewValueParams) => {
            let identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
            this.AuditService.CreateAuditEvent(identifierValue, params.newValue, params.colDef.field, params.node);
            //24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
            //so we manually raise.
            //https://github.com/jonathannaim/adaptableblotter/issues/118
            let columnList = this.calculatedColumnPathMap.get(params.colDef.field);
            if (columnList) {
                columnList.forEach(x => {
                    let newValue = this.gridOptions.api.getValue(x, params.node);
                    this.AuditService.CreateAuditEvent(identifierValue, newValue, x, params.node);
                });
            }
        });

        //We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
        let originalisExternalFilterPresent = gridOptions.isExternalFilterPresent;
        gridOptions.isExternalFilterPresent = () => {
            let isFilterActive = this.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.length > 0;
            if (isFilterActive) {
                //used in particular at init time to show the filter icon correctly
                for (let colFilter of this.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters) {
                    if (!this.gridOptions.columnApi.getColumn(colFilter.ColumnId).isFilterActive()) {
                        this.gridOptions.columnApi.getColumn(colFilter.ColumnId).setFilterActive(true);
                    }
                }
            }
            let isSearchActive = StringExtensions.IsNotNullOrEmpty(this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch);
            let isQuickSearchActive = StringExtensions.IsNotNullOrEmpty(this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText);
            //it means that originaldoesExternalFilterPass will be called to we reinit that collection
            return isFilterActive || isSearchActive || isQuickSearchActive || (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false);
        };
        let originaldoesExternalFilterPass = gridOptions.doesExternalFilterPass;
        gridOptions.doesExternalFilterPass = (node: RowNode) => {
            let columns = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            // let rowId = this.getPrimaryKeyValueFromRecord(node)
            //first we assess AdvancedSearch 
            let currentSearchName = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
            if (StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                let currentSearch = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
                if (!ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, node, columns, this)) {
                    // if (!ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, this)) {
                    return false;
                }
            }
            //we then assess filters
            let columnFilters: IColumnFilter[] = this.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
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
            let quickSearchState = this.AdaptableBlotterStore.TheStore.getState().QuickSearch;
            if (StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
                && quickSearchState.QuickSearchDisplayType != QuickSearchDisplayType.HighlightCell) {
                let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                for (let column of columns.filter(c => c.Visible)) {
                    let displayValue = this.getDisplayValueFromRecord(node, column.ColumnId);
                    let rowId = this.getPrimaryKeyValueFromRecord(node);
                    let stringValueLowerCase = displayValue.toLowerCase();
                    switch (this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchOperator) {
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
            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
        };
        this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
            this.createFilterWrapper(col);
        });
        let originalgetMainMenuItems = gridOptions.getMainMenuItems;
        gridOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
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
            this.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.Items.forEach(x => {
                let glyph = this.container.ownerDocument.createElement("span");
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
            console.error('Failed to Init AdaptableBlotterStore : ', e);
            //for now i'm still initializing the strategies even if loading state has failed.... 
            //we may revisit that later
            this.Strategies.forEach(strat => strat.InitializeWithRedux());
        });
    }

    public getRowInfo(): any {
        return this.gridOptions.api.getModel().getRowCount()
    }

    public getColumnInfo(): any {
        return this.gridOptions.columnApi.getAllColumns().length;
    }

    public getDisplayValueFunction(id: any): (columnName: string) => any {
        return (columnName: string) => { return this.getDisplayValue(id, columnName) }
    }

    public getDisplayValueFunctionFromRecord(record: any): (columnName: string) => any {
        return (columnName: string) => { return this.getDisplayValueFromRecord(record, columnName) }
    }


}






