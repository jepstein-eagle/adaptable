/// <reference path="../../../typings/index.d.ts" />

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
import { AuditLogService } from '../../Core/Services/AuditLogService'
import * as StrategyIds from '../../Core/StrategyIds'
import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy'
import { SmartEditStrategy } from '../../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../../Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from '../../Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from '../../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../../Strategy/ColumnChooserStrategy'
import { ExportStrategy } from '../../Strategy/ExportStrategy'
import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy'
import { CalendarStrategy } from '../../Strategy/CalendarStrategy'
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy'
import { PrintPreviewStrategy } from '../../Strategy/PrintPreviewStrategy'
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { FilterStrategy } from '../../Strategy/FilterStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { IColumnFilter, IColumnFilterContext } from '../../Core/Interface/IFilterStrategy';
import { ICellValidationRule, ICellValidationStrategy } from '../../Core/Interface/ICellValidationStrategy';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { Helper } from '../../Core/Helper';
import { DataType, LeafExpressionOperator, SortOrder, QuickSearchDisplayType, DistinctCriteriaPairValue, CellValidationMode } from '../../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn, IRawValueDisplayValuePair, IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotter'
import { Expression } from '../../Core/Expression/Expression';
import { FilterFormReact } from '../../View/FilterForm';
import { IDataChangingEvent, IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ILayout } from '../../Core/Interface/ILayoutStrategy';
import { LayoutState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'
import { GridOptions, Column, Events, RowNode } from "ag-grid"


export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public SearchService: ISearchService
    public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    private filterContainer: HTMLDivElement
    public BlotterOptions: IAdaptableBlotterOptions

    constructor(private gridOptions: GridOptions, private container: HTMLElement, options?: IAdaptableBlotterOptions) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, options)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchService(this);
        this.ThemeService = new ThemeService(this)
        this.AuditLogService = new AuditLogService(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        //this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        //this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        //this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        //this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        //this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        //this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        //this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        //this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))
        //this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        //this.Strategies.set(StrategyIds.FilterStrategyId, new FilterStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        //this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))

        this.filterContainer = this.container.ownerDocument.createElement("div")
        this.filterContainer.id = "filterContainer"
        this.filterContainer.style.position = 'absolute'
        this.filterContainer.style.visibility = "hidden"
        this.container.ownerDocument.body.appendChild(this.filterContainer)

        ReactDOM.render(AdaptableBlotterApp(this), this.container);
        gridOptions.api.addGlobalListener((type: string, event: any) => {
            //console.log(event)
        });

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
    }

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> = new EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>();
    public onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> {
        return this._onKeyDown;
    }

    private _onGridDataBound: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onGridDataBound;
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

        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(visibleColumns.concat(hiddenColumns)));
    }

    public hideFilterForm() {
        throw Error("not implemented yet")
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
        return false
    }

    public getCurrentCellEditValue(): any {
        return "";
    }

    public getActiveCell(): ICellInfo {
        return null
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
                rowNode.setDataValue(cellInfo.ColumnId, cellInfo.Value)
                return
            }
        })
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            let value = batchValues.find(x => x.Id == this.getPrimaryKeyValueFromRecord(rowNode))
            if (value) {
                rowNode.setDataValue(value.ColumnId, value.Value)
            }
        })
    }

    public cancelEdit() {
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        return null
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
        let colDef = this.gridOptions.columnApi.getColumn(columnId).getColDef()
        if (typeof colDef.editable == 'boolean') {
            return !colDef.editable;
        }
        else {
            return true
        }
    }

    public setCustomSort(columnId: string, comparer: Function): void {

    }

    public removeCustomSort(columnId: string): void {

    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        return null
    }


    public exportBlotter(): void {
    }

    public getDisplayValue(id: any, columnId: string): string {
        return null
    }

    public getDisplayValueFromRecord(row: any, columnId: string): string {
        return null
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

    public printGrid(): void {

    }

    public applyColumnFilters(): void {
        return null
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }


    public getQuickSearchRowIds(rowIds: string[]): string[] {
        return null
    }
}