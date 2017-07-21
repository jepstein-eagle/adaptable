import '../../../stylesheets/adaptableblotter-style.css'
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore'
import { IMenuItem, IStrategy, IUIError, IUIConfirmation, ICellInfo } from '../../Core/Interface/IStrategy';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../../Core/Services/CalendarService'
import { IAuditService } from '../../Core/Services/Interface/IAuditService'
import { AuditService } from '../../Core/Services/AuditService'
import { ISearchService } from '../../Core/Services/Interface/ISearchService'
import { ThemeService } from '../../Core/Services/ThemeService'
import { SearchService } from '../../Core/Services/SearchService'
import { StyleService } from '../../Core/Services/StyleService'
import { SearchServiceagGrid } from '../../Core/Services/SearchServiceagGrid'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import * as StrategyIds from '../../Core/StrategyIds'
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
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { FilterStrategy } from '../../Strategy/FilterStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { DashboardStrategy } from '../../Strategy/DashboardStrategy'
import { IColumnFilter, IColumnFilterContext } from '../../Core/Interface/IFilterStrategy';
import { ICellValidationRule, ICellValidationStrategy } from '../../Core/Interface/ICellValidationStrategy';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { Helper } from '../../Core/Helper';
import { StringExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { DataType, LeafExpressionOperator, SortOrder, QuickSearchDisplayType, DistinctCriteriaPairValue, CellValidationMode } from '../../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn, IRawValueDisplayValuePair, IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotter'
import { Expression } from '../../Core/Expression/Expression';
import { FilterFormReact } from '../../View/FilterForm';
import { IDataChangingEvent, IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ILayout } from '../../Core/Interface/ILayoutStrategy';
import { LayoutState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'

import { GridOptions, Column, Events, RowNode, ICellEditor, IFilterComp, ColDef } from "ag-grid"
import { NewValueParams } from "ag-grid/dist/lib/entities/colDef"

import { FilterWrapperFactory } from './FilterWrapper'


export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore
    private quickSearchHighlights: Map<string, boolean>

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public SearchService: ISearchService
    public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    private contextMenuContainer: HTMLDivElement
    public BlotterOptions: IAdaptableBlotterOptions
    public StyleService: StyleService

    constructor(private gridOptions: GridOptions, private container: HTMLElement, private gridContainer: HTMLElement, options?: IAdaptableBlotterOptions) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, options)
        this.quickSearchHighlights = new Map()

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchServiceagGrid(this);
        this.ThemeService = new ThemeService(this)
        this.AuditLogService = new AuditLogService(this);
        this.StyleService = new StyleService(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortagGridStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy(this))
        //this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsagGridStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleagGridStrategy(this))
        //this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.FilterStrategyId, new FilterStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))

        ReactDOM.render(AdaptableBlotterApp(this), this.container);
        // gridOptions.api.addGlobalListener((type: string, event: any) => {
        //     //console.log(event)
        // });

        //we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type 
        //since there are many events and we want them to behave the same
        let columnEventsThatTriggersStateChange = [Events.EVENT_COLUMN_MOVED,
        Events.EVENT_GRID_COLUMNS_CHANGED,
        Events.EVENT_COLUMN_VISIBLE,
        Events.EVENT_NEW_COLUMNS_LOADED]
        gridOptions.api.addGlobalListener((type: string, event: any) => {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                this.setColumnIntoStore()
            }
        });

        gridContainer.addEventListener("keydown", (event) => this._onKeyDown.Dispatch(this, event))
        gridContainer.addEventListener("contextmenu", (event) => {
            event.preventDefault()
            this.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.ShowColumnContextMenu(
                    "tradeId",
                    event.clientX,
                    event.clientY))
        })
        gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STARTED, (params: any) => {
            //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
            let editor = (<any>this.gridOptions.api).rowRenderer.renderedRows[params.rowIndex].renderedCells[params.column.getColId()].cellEditor
            //No need to register for the keydown on the editor since we already register on the main div
            //TODO: check that it works when edit is popup. That's why I left the line below
            //editor.getGui().addEventListner("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = editor
            //if there was already an implementation set by the dev we keep the reference to it and execute it at the end
            let oldIsCancelAfterEnd = this._currentEditor.isCancelAfterEnd
            let isCancelAfterEnd = () => {
                let dataChangedEvent: IDataChangingEvent
                dataChangedEvent = { ColumnId: params.column.getColId(), NewValue: this._currentEditor.getValue(), IdentifierValue: this.getPrimaryKeyValueFromRecord(params.node) }

                let failedRules: ICellValidationRule[] = this.AuditService.CheckCellChanging(dataChangedEvent);
                if (failedRules.length > 0) { // we have at least one failure or warning
                    let cellValidationStrategy: ICellValidationStrategy = this.Strategies.get(StrategyIds.CellValidationStrategyId) as ICellValidationStrategy;

                    // first see if its an error = should only be one item in array if so
                    if (failedRules[0].CellValidationMode == CellValidationMode.Prevent) {
                        let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                        let error: IUIError = {
                            ErrorMsg: errorMessage
                        }
                        this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));
                        return true;
                    } else {
                        let warningMessage: string = "";
                        failedRules.forEach(f => {
                            warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this) + "\n";
                        })
                        let cellInfo: ICellInfo = {
                            Id: dataChangedEvent.IdentifierValue,
                            ColumnId: dataChangedEvent.ColumnId,
                            Value: dataChangedEvent.NewValue
                        }
                        let confirmation: IUIConfirmation = {
                            CancelText: "Cancel Edit",
                            ConfirmationTitle: "Cell Validation Failed",
                            ConfirmationMsg: warningMessage,
                            ConfirmationText: "Bypass Rule",
                            CancelAction: null,
                            ConfirmAction: GridRedux.SetValueLikeEdit(cellInfo, this.gridOptions.api.getValue(params.column.getColId(), params.node))
                        }
                        this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
                        //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                        return true
                    }
                }
                let whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false
                if (!whatToReturn) {
                    //no failed validation so we raise the edit auditlog
                    this.AuditLogService.AddEditCellAuditLog(dataChangedEvent.IdentifierValue,
                        dataChangedEvent.ColumnId,
                        this.gridOptions.api.getValue(params.column.getColId(), params.node), dataChangedEvent.NewValue)
                }
                return whatToReturn
            }
            this._currentEditor.isCancelAfterEnd = isCancelAfterEnd;
        });

        gridOptions.api.addEventListener(Events.EVENT_CELL_EDITING_STOPPED, (params: any) => {
            //(<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = null
            //We refresh the filter so we get live search/filter when editing.
            //Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
            this.applyColumnFilters();
        });

        gridOptions.api.addEventListener(Events.EVENT_CELL_VALUE_CHANGED, (params: NewValueParams) => {
            let identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
            this.AuditService.CreateAuditEvent(identifierValue, params.newValue, params.colDef.field, params.node);
        });

        //We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
        let originalisExternalFilterPresent = gridOptions.isExternalFilterPresent
        gridOptions.isExternalFilterPresent = () => {
            let isFilterActive = this.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.length > 0
            let isSearchActive = StringExtensions.IsNotNullOrEmpty(this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId)
            let isQuickSearchActive = StringExtensions.IsNotNullOrEmpty(this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)
            //it means that originaldoesExternalFilterPass will be called to we reinit that collection
            this.quickSearchHighlights.clear()
            return isFilterActive || isSearchActive || isQuickSearchActive || (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false)
        }
        let originaldoesExternalFilterPass = gridOptions.doesExternalFilterPass
        gridOptions.doesExternalFilterPass = (node: RowNode) => {
            let columns = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns
            // let rowId = this.getPrimaryKeyValueFromRecord(node)

            //first we assess AdvancedSearch 
            let currentSearchId = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId
            if (StringExtensions.IsNotNullOrEmpty(currentSearchId)) {
                let currentSearch = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Uid == currentSearchId);
                if (!ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, node, columns, this)) {
                    // if (!ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, this)) {
                    return false;
                }
            }

            //we then assess filters
            let columnFilters: IColumnFilter[] = this.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters;
            if (columnFilters.length > 0) {
                for (let columnFilter of columnFilters) {
                    if (!ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, node, columns, this)) {
                        // if (!ExpressionHelper.checkForExpression(columnFilter.Filter, rowId, columns, this)) {
                        return false
                    }
                }
            }

            //we assess quicksearch
            let recordReturnValue = false
            if (StringExtensions.IsNotNullOrEmpty(this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)) {
                let quickSearchState = this.AdaptableBlotterStore.TheStore.getState().QuickSearch
                let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase()

                for (let column of columns.filter(c => c.Visible)) {
                    let displayValue = this.getDisplayValueFromRecord(node, column.ColumnId)
                    let rowId = this.getPrimaryKeyValueFromRecord(node)
                    let stringValueLowerCase = displayValue.toLowerCase()
                    switch (this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchOperator) {
                        case LeafExpressionOperator.Contains:
                            {
                                if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                    //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                    if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell
                                        || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndColourCell) {
                                        this.quickSearchHighlights.set(rowId + column.ColumnId, true);
                                    }
                                    recordReturnValue = true
                                }
                            }
                            break;
                        case LeafExpressionOperator.StartsWith:
                            {
                                if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                    //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                    if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell
                                        || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndColourCell) {
                                        this.quickSearchHighlights.set(rowId + column.ColumnId, true);
                                    }
                                    recordReturnValue = true
                                }
                            }
                            break;
                    }
                }
                if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell) {
                    recordReturnValue = true;
                }
                if (!recordReturnValue) { return false }
            }
            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true
        }

        this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
            this.gridOptions.api.destroyFilter(col)
            this.gridOptions.api.getColumnDef(col).filter = FilterWrapperFactory(this)
            col.initialise()
        })
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

    public applyColumnFilters() {
        this.gridOptions.api.onFilterChanged()
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
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(allColumns));
        let quickSearchHighlights = this.quickSearchHighlights
        let blotter = this
        for (let col of allColumns) {
            this.setCellClassRules({
                'Ab-QuickSearch': function (params: any) {
                    return quickSearchHighlights.has(blotter.getPrimaryKeyValueFromRecord(params.node) + params.colDef.field)
                }
            }, col.ColumnId, "QuickSearch")
        }

    }
    public hideFilterFormPopup : Function
    public hideFilterForm() {
        if(this.hideFilterFormPopup){
            this.hideFilterFormPopup()
        }
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        let allColumns = this.gridOptions.columnApi.getAllGridColumns()
        VisibleColumnList.forEach((column, index) => {
            let col = this.gridOptions.columnApi.getColumn(column.ColumnId)
            if (!col.isVisible()) {
                this.gridOptions.columnApi.setColumnVisible(col, true)
            }
            this.gridOptions.columnApi.moveColumn(col, index);
        })
        allColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0).forEach((col => {
            this.gridOptions.columnApi.setColumnVisible(col, false)
        }))
    }

    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));

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
        let rowNode = this.gridOptions.api.getModel().getRow(activeCell.rowIndex)
        return {
            ColumnId: activeCell.column.getColId(),
            Id: this.getPrimaryKeyValueFromRecord(rowNode),
            Value: this.gridOptions.api.getValue(activeCell.column, rowNode)
        }
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns fuck all
    public getSelectedCells(): ISelectedCells {
        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected = this.gridOptions.api.getRangeSelections();
        //we iterate for each ranges
        selected.forEach((rangeSelection, index) => {
            for (let column of rangeSelection.columns) {
                let y1 = Math.min(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                let y2 = Math.max(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex)
                for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
                    let rowNode = this.gridOptions.api.getModel().getRow(rowIndex)
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
        });

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

        //console.log('There is no defined type. Defaulting to type of the first value for column ' + column.getColId())
        let row = this.gridOptions.api.getModel().getRow(0)
        let value = this.gridOptions.api.getValue(column, row)
        if (value instanceof Date) {
            return DataType.Date
        }
        switch (typeof value) {
            case 'string':
                return DataType.String;
            case 'number':
                return DataType.Number;
            case 'boolean':
                return DataType.Boolean;
            case 'object':
                return DataType.Object;
            default:
                break;
        }
    }


    public setValue(cellInfo: ICellInfo): void {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            if (cellInfo.Id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                let oldValue = this.gridOptions.api.getValue(cellInfo.ColumnId, rowNode)
                rowNode.setDataValue(cellInfo.ColumnId, cellInfo.Value)
                this.AuditLogService.AddEditCellAuditLog(cellInfo.Id,
                    cellInfo.ColumnId,
                    oldValue, cellInfo.Value)
            }
        })
        this.applyColumnFilters();
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            let value = batchValues.find(x => x.Id == this.getPrimaryKeyValueFromRecord(rowNode))
            if (value) {
                let oldValue = this.gridOptions.api.getValue(value.ColumnId, rowNode)
                rowNode.setDataValue(value.ColumnId, value.Value)
                this.AuditLogService.AddEditCellAuditLog(value.Id,
                    value.ColumnId,
                    oldValue, value.Value)
            }
        })
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
    }

    public getColumnHeader(columnId: string): string {
        return null
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
        let columnDef = this.gridOptions.api.getColumnDef(columnId);

        if (columnDef) {
            columnDef.comparator = <any>comparer
        }
    }

    public removeCustomSort(columnId: string): void {
        let columnDef = this.gridOptions.api.getColumnDef(columnId);

        if (columnDef) {
            columnDef.comparator = null
        }
    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();
        //we use forEachNode as we want to get all data even the one filtered out...
        let data = this.gridOptions.api.forEachNode(rowNode => {
            let displayString = this.getDisplayValueFromRecord(rowNode, columnId)
            let rawValue = this.gridOptions.api.getValue(columnId, rowNode)
            if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayString });
            }
            else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayString, { RawValue: rawValue, DisplayValue: displayString });
            }
        })
        return Array.from(returnMap.values()).slice(0, this.BlotterOptions.maxColumnValueItemsDisplayed);
    }


    public exportBlotter(): void {
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
        if (colDef.cellRenderer) {
            let render: any = colDef.cellRenderer
            if (typeof render == "string") {
                return String(rawValue)
            }
            return render({ value: rawValue })
        }
        else {
            return String(rawValue)
        }
    }

    public setCellClassRules(cellClassRules: any, columnId: string, type: "ConditionalStyle" | "QuickSearch" | "FlashingCell") {
        let localCellClassRules = this.gridOptions.columnApi.getColumn(columnId).getColDef().cellClassRules
        if (localCellClassRules) {
            if (type == "ConditionalStyle") {
                for (let prop in localCellClassRules) {
                    if (prop.includes("Ab-ConditionalStyle-")) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            //Is initialized in setColumnIntoStore
            else if (type == "QuickSearch") {
                for (let prop in localCellClassRules) {
                    if (prop.includes("Ab-QuickSearch")) {
                        delete localCellClassRules[prop]
                    }
                }
            }
            //Is initialized in Flash
            else if (type == "FlashingCell") {
                for (let prop in localCellClassRules) {
                    if (prop.includes("Ab-FlashUp")) {
                        delete localCellClassRules[prop]
                    }
                    if (prop.includes("Ab-FlashDown")) {
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

    public addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void {
        return null
    }

    public addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void {

    }

    public removeAllCellStylesWithRegex(regex: RegExp): void {
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
    }


    public removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void {
    }

    public removeRowStyle(rowIdentifierValue: any, style: string): void {
    }

    public getAllRowIds(): string[] {
        return []
    }

    public hideRows(rowIds: string[]): void {
    }

    public showRows(rowIds: string[]): void {

    }

    public getDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any {
    }

    public isGridPageable(): boolean {
        return false
    }
    
    public refreshView() {
        this.gridOptions.api.refreshView();
    }

    public refreshCells(rowNode: RowNode, columnIds: string[]) {
        this.gridOptions.api.refreshCells([rowNode], columnIds);
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
        //ReactDOM.unmountComponentAtNode(this.contextMenuContainer);
    }


    public getQuickSearchRowIds(rowIds: string[]): string[] {
        return null
    }
}