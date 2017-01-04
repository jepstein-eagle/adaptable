/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../View/AdaptableBlotterView';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { IAdaptableBlotterStore } from '../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../Redux/Store/AdaptableBlotterStore'
import { IMenuItem, IStrategy } from '../Core/Interface/IStrategy';
import { ICalendarService } from '../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../Core/Services/CalendarService'
import { IAuditService } from '../Core/Services/Interface/IAuditService'
import { AuditService } from '../Core/Services/AuditService'
import { ISearchService } from '../Core/Services/Interface/ISearchService'
import { SearchServiceHyperGrid } from '../Core/Services/SearchServiceHypergrid'
import * as StrategyIds from '../Core/StrategyIds'
import { CustomSortStrategy } from '../Strategy/CustomSortStrategy'
import { SmartEditStrategy } from '../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from '../Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from '../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../Strategy/ColumnChooserStrategy'
import { ExcelExportStrategy } from '../Strategy/ExcelExportStrategy'
import { FlashingCellsHypergridStrategy } from '../Strategy/FlashingCellsHypergridStrategy'
import { CalendarStrategy } from '../Strategy/CalendarStrategy'
import { ConditionalStyleHypergridStrategy } from '../Strategy/ConditionalStyleHypergridStrategy'
import { PrintPreviewStrategy } from '../Strategy/PrintPreviewStrategy'
import { QuickSearchStrategy } from '../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../Strategy/AdvancedSearchStrategy'
import { IEvent } from '../Core/Interface/IEvent';
import { EventDispatcher } from '../Core/EventDispatcher'
import { Helper } from '../Core/Helper';
import { ColumnType, SortOrder } from '../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { Expression } from '../Core/Expression/Expression';
import { CustomSortDataSource } from './CustomSortDataSource'
import { QuickSearchDataSource } from './QuickSearchDataSource'
import { AdvancedSearchDataSource } from './AdvancedSearchDataSource'
import { INamedExpression } from '../Core/Interface/IExpression';

//icon to indicate toggle state
const UPWARDS_BLACK_ARROW = '\u25b2' // aka '▲'
const DOWNWARDS_BLACK_ARROW = '\u25bc' // aka '▼'

export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public SearchService: ISearchService

    constructor(private grid: any, private container: HTMLElement, private primaryKey: string) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchServiceHyperGrid(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        //this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsHypergridStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleHypergridStrategy(this))
        //this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        grid.addEventListener("fin-keydown", (e: any) => {
            //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
            //like that we avoid the need to have different logic for different grids....
            this._onKeyDown.Dispatch(this, e.detail.primitiveEvent)
        });

        //we'll see if we need to handle differently keydown when in edit mode internally or not....
        //I think we don't need to but hey.... you never know
        grid.addEventListener("fin-editor-keydown", (e: any) => {
            //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
            //like that we avoid the need to have different logic for different grids....
            this._onKeyDown.Dispatch(this, e.detail.keyEvent)
        });

        grid.addEventListener("fin-after-cell-edit", (e: any) => {
            this.grid.behavior.reindex();
            throw 'reminder';
        });

        // grid.addEventListener('fin-click', function (e: any) {
        //     var cell = e.detail.gridCell;
        //     console.log('fin-click cell:', cell);
        // });

        this.sortOrder = SortOrder.Unknown
        //this is used so the grid displays sort icon when sorting....
        grid.behavior.dataModel.getSortImageForColumn = (columnIndex: number) => {
            var icon = '';
            if (this.sortColumn == columnIndex) {
                if (this.sortOrder == SortOrder.Ascending) {
                    icon = UPWARDS_BLACK_ARROW;
                }
                else if (this.sortOrder == SortOrder.Descending) {
                    icon = DOWNWARDS_BLACK_ARROW;
                }
            }
            return icon;
        }

        grid.behavior.dataModel.getCell = (config: any, declaredRendererName: string) => {
            //might need to use untranslatedX
            var x = config.x;
            var y = config.normalizedY;
            let row = this.grid.behavior.dataModel.dataSource.getRow(y)
            let column = this.grid.behavior.getActiveColumns()[x]
            if (column && row) {
                this.AuditService.CreateAuditEvent(this.getPrimaryKeyValueFromRecord(row), config.value, column.name)
            }
            let flashColor = this.grid.behavior.getCellProperty(x, y, 'flashBackgroundColor')
            let csBackgroundColorColumn = this.grid.behavior.getCellProperty(x, y, 'csBackgroundColorColumn')
            let csForeColorColumn = this.grid.behavior.getCellProperty(x, y, 'csForeColorColumn')
            let csBackgroundColorRow = this.grid.behavior.getCellProperty(x, y, 'csBackgroundColorRow')
            let csForeColorRow = this.grid.behavior.getCellProperty(x, y, 'csForeColorRow')
            if (flashColor) {
                config.backgroundColor = flashColor;
            }
            else if (csBackgroundColorColumn || csForeColorColumn) {
                config.backgroundColor = csBackgroundColorColumn;
                config.color = csForeColorColumn;
            }
            else if (csBackgroundColorRow || csForeColorRow) {
                config.backgroundColor = csBackgroundColorRow;
                config.color = csForeColorRow;
            }
            return this.grid.cellRenderers.get(declaredRendererName);
        };
        grid.addEventListener('fin-column-sort', (e: any) => {
            this.toggleSort(e.detail.column)
            //in case we want multi column
            //keys =  event.detail.keys;
        });

        //We add our sorter pipe last into the existing pipeline
        let currentDataSources = grid.behavior.dataModel.DataSources;
        //first AdvancedSearch that should filter most of the data
        currentDataSources.push(AdvancedSearchDataSource(this))
        //then quick search that will filter occasionnaly
        currentDataSources.push(QuickSearchDataSource(this))
        //last has to be the customsort so we sort only the remaining data
        currentDataSources.push(CustomSortDataSource(this))

        grid.setPipeline(currentDataSources, {
            stash: 'default',
            apply: false //  Set the new pipeline without calling reindex. We might need to reindex.... Not sure yet
        });

        grid.addEventListener("fin-column-changed-event", () => {
            setTimeout(() => this.SetColumnIntoStore(), 5);
        });

        // grid.dataSource.bind("change", (e: any) => {
        //     if (e.action == "itemchange") {
        //         let itemsArray = e.items[0];
        //         let changedValue = itemsArray[e.field];
        //         let identifierValue = //itemsArray["uid"];
        //         this.AuditService.CreateAuditEvent(identifierValue, changedValue, e.field);
        //     }
        // });

        // //we plug the AuditService on the Save event and wait for the editor to disappear so conditional style
        // //can reevaluate the record when the DisplayValue is now computed. i.e. $2.000.000 instead of 2000000
        // grid.bind("save", (e: kendo.ui.GridSaveEvent) => {
        //     setTimeout(() => {
        //         //I use "in"" instead of "of" on purpose here as I'm iterating on the properties of the object and not an array
        //         for (let valueField in e.values) {
        //             let changedValue = e.values[valueField];
        //             let identifierValue = //e.model.uid;
        //             this.AuditService.CreateAuditEvent(identifierValue, changedValue, valueField);
        //         }
        //     }, 5)
        // })

        // //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        // grid.bind("columnReorder", () => {
        //     // we want to fire this after the DOM manipulation. 
        //     // Why the fuck they don't have the concept of columnReordering and columnReordered is beyond my understanding
        //     // http://www.telerik.com/forums/column-reorder-event-delay
        //     setTimeout(() => this.SetColumnIntoStore(), 5);
        // });
    }

    public SetColumnIntoStore() {
        // let columns: IColumn[] = this.grid.behavior.columns.map((x: any) => {
        let activeColumns: IColumn[] = this.grid.behavior.getActiveColumns().map((x: any) => {
            return {
                ColumnId: x.name ? x.name : "Unknown Column",
                ColumnFriendlyName: x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                ColumnType: this.getColumnType(x.name),
                Visible: true
            }
        });
        let hiddenColumns: IColumn[] = this.grid.behavior.getHiddenColumns().map((x: any) => {
            return {
                ColumnId: x.name ? x.name : "Unknown Column",
                ColumnFriendlyName: x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                ColumnType: this.getColumnType(x.name),
                Visible: false
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(activeColumns.concat(hiddenColumns)));
    }

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> = new EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>();
    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> {
        return this._onKeyDown;
    }

    private _onGridDataBound: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    OnGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onGridDataBound;
    }

    public CreateMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));

        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public onMenuClicked(menuItem: IMenuItem): void {
        this.Strategies.get(menuItem.StrategyId).onAction(menuItem.Action);
    }

    public sortColumn: number = -1
    public sortOrder: SortOrder
    public toggleSort(columnIndex: number) {
        //Toggle sort one column at a time
        if (this.sortColumn === columnIndex) {
            if (this.sortOrder == SortOrder.Descending) {
                this.sortColumn = -1;
            }
            else {
                this.sortOrder = SortOrder.Descending
            }
        } else {
            this.sortOrder = SortOrder.Ascending
            this.sortColumn = columnIndex;
        }
        this.grid.behavior.reindex();
    }

    public getPrimaryKeyValueFromRecord(record: any): any {
        return record[this.primaryKey]
    }

    public gridHasCurrentEditValue(): boolean {
        return this.grid.cellEditor;
    }

    public getCurrentCellEditValue(): any {
        if (this.grid.cellEditor) {
            return this.grid.cellEditor.getEditorValue()
        }
        return "";
    }

    getActiveCell(): { Id: any, ColumnId: string, Value: any } {
        let currentCell = this.grid.selectionModel.getLastSelection();

        if (currentCell) {
            let column = this.grid.behavior.getActiveColumns()[currentCell.origin.x]
            let row = this.grid.behavior.dataModel.dataSource.getRow(currentCell.origin.y)
            let primaryKey = this.getPrimaryKeyValueFromRecord(row)
            let value = this.grid.behavior.dataModel.dataSource.getValue(currentCell.origin.x, currentCell.origin.y)
            return { Id: primaryKey, ColumnId: column.name, Value: value }
        }
        return null
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns fuck all
    public getSelectedCells(): ISelectedCells {
        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected: Array<any> = this.grid.selectionModel.getSelections();
        for (let rectangle of selected) {
            //we don't use firstSelectedCell and lastSelectedCell as they keep the order of the click. i.e. firstcell can be below lastcell....
            //for (let columnIndex = rectangle.firstSelectedCell.x; columnIndex <= rectangle.lastSelectedCell.x; columnIndex++) {
            for (let columnIndex = rectangle.origin.x; columnIndex <= rectangle.origin.x + rectangle.width; columnIndex++) {
                let column = this.grid.behavior.getActiveColumns()[columnIndex]
                for (let rowIndex = rectangle.origin.y; rowIndex <= rectangle.origin.y + rectangle.height; rowIndex++) {
                    // for (let rowIndex = rectangle.firstSelectedCell.y; rowIndex <= rectangle.lastSelectedCell.y; rowIndex++) {
                    let row = this.grid.behavior.dataModel.dataSource.getRow(rowIndex)
                    let primaryKey = this.getPrimaryKeyValueFromRecord(row)
                    let value = this.grid.behavior.dataModel.dataSource.getValue(columnIndex, rowIndex)
                    //this line is pretty much doing the same....just keeping it for the record
                    //maybe we could get it directly from the row..... dunno wht's best
                    // let value = column.getValue(rowIndex)
                    let valueArray = selectionMap.get(primaryKey);
                    if (valueArray == undefined) {
                        valueArray = []
                        selectionMap.set(primaryKey, valueArray);
                    }
                    valueArray.push({ columnID: column.name, value: value });
                }
            }
        }

        return {
            Selection: selectionMap
        };
    }

    public getColumnType(columnId: string): ColumnType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!columnId) {
            console.log('columnId is undefined returning String for Type')
            return ColumnType.String;
        }

        let column = this.grid.behavior.dataModel.schema.find((x: any) => x.name == columnId)
        if (column) {
            if (!column.hasOwnProperty('type')) {
                console.log('There is no defined type. Defaulting to type string for column ' + columnId)
                return ColumnType.String;
            }
            let type = column.type;
            switch (type) {
                case 'string':
                    return ColumnType.String;
                case 'number':
                    return ColumnType.Number;
                case 'boolean':
                    return ColumnType.Boolean;
                case 'date':
                    return ColumnType.Date;
                case 'object':
                    return ColumnType.Object;
                default:
                    break;
            }
        }
        console.log('columnId does not exist')
        return ColumnType.String;
    }

    public setValue(id: any, columnId: string, value: any): void {
        let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, id)
        row[columnId] = value
        //there is a bug in hypergrid 15/12/16 and the row object on the cellEditor is the row below the one currently edited
        //so we just close editor for now even if not the one where we set the value
        //if(this.gridHasCurrentEditValue() && this.getPrimaryKeyValueFromRecord(this.grid.cellEditor.row) == id)
        this.grid.abortEditing()

        //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
        this.grid.repaint()
    }

    public setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void {
        //no need to have a batch mode so far.... we'll see in the future performance
        for (let element of batchValues) {
            let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, element.id)
            row[element.columnId] = element.value
        }
        //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
        this.grid.repaint()
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            let record = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, id)
            return (columnName: string) => { return record[columnName]; }
        }
        else {
            return (columnName: string) => { return this.getDisplayValue(id, columnName); }
        }
    }

    public selectCells(cells: { id: any, columnId: string }[]): void {
    }

    public getColumnHeader(columnId: string): string {
        let column = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId);
        if (column) {
            return column.ColumnFriendlyName
        }
        else {
            return "";
        }
    }

    public getColumnIndex(columnName: string): number {
        //check that we are using the right collection.... maybe sometimes it will be using AllColumns, Active columns.... no idea...
        //but need to get things done
        return this.grid.behavior.getActiveColumns().findIndex((x: any) => x.name == columnName);
    }


    public isColumnReadonly(columnId: string): boolean {
        return false;
    }

    public setCustomSort(columnId: string, comparer: Function): void {
        //nothing to do except the reindex so the CustomSortSource does it's job if needed
        this.ReindexAndRepaint()
    }

    public removeCustomSort(columnId: string): void {
        //nothing to do except the reindex so the CustomSortSource does it's job if needed
        this.ReindexAndRepaint()
    }

    public ReindexAndRepaint()
    {
        this.grid.behavior.reindex();
        this.grid.repaint();
    }
    public getColumnValueString(columnId: string): Array<string> {
        let returnArray: string[] = []
        let dataSourceColumnIndex = this.grid.behavior.dataModel.schema.findIndex((x: any) => x.name == columnId)
        let rowCount = this.grid.behavior.dataModel.dataSource.getRowCount()
        for (var index = 0; index < rowCount; index++) {
            var element = this.grid.behavior.dataModel.dataSource.getRow(index)
            returnArray.push(this.getDisplayValue(this.getPrimaryKeyValueFromRecord(element), columnId))
        }
        return returnArray
    }

    public SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        VisibleColumnList.forEach((column, index) => {
            //we use allcolumns so we can show previously hidden columns
            let oldcolindex = this.grid.behavior.allColumns.findIndex((x: any) => x.name == column.ColumnId)
            this.grid.behavior.showColumns(false, oldcolindex, index, false)
            //this.grid.swapColumns(index, oldcolindex);
        })
        this.grid.behavior.getActiveColumns().filter((x: any) => VisibleColumnList.findIndex(y => y.ColumnId == x.name) < 0).forEach(((col: any) => {
            this.grid.behavior.hideColumns(false, this.grid.behavior.allColumns.indexOf(col))
        }))
        this.grid.behavior.changed()
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.SetColumnIntoStore();
    }

    public saveAsExcel(fileName: string, allPages: boolean): void {
    }

    public getDisplayValue(id: any, columnId: string): string {
        let column = this.grid.behavior.allColumns.find((x: any) => x.name == columnId)
        let formatter = column.getFormatter()
        let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, id)
        return formatter(row[columnId])
    }

    public addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void {
        throw 'Not implemented for hypergrid see addCellStyleHypergrid';
    }

    public addCellStyleHypergrid(rowIdentifierValue: any, columnIndex: number, style: CellStyleHypergrid, timeout?: number): void {
        //here we don't call Repaint as we consider that we already are in the repaint loop
        let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, rowIdentifierValue)
        let rowIndex = this.grid.behavior.dataModel.dataSource.getProperty('foundRowIndex')
        if (rowIndex) {
            if (style.flashBackColor) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'flashBackgroundColor', style.flashBackColor)
                if (timeout) {
                    setTimeout(() => this.removeCellStyleByIndex(columnIndex, rowIndex, 'flash'), timeout);
                }
            }
            //There is never a timeout for CS
            if (style.csBackColorColumn) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'csBackgroundColorColumn', style.csBackColorColumn)
            }
            if (style.csForeColorColumn) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'csForeColorColumn', style.csForeColorColumn)
            }
        }
    }

    public addRowStyleHypergrid(rowIdentifierValue: any, style: CellStyleHypergrid, timeout?: number): void {
        let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, rowIdentifierValue)
        let rowIndex = this.grid.behavior.dataModel.dataSource.getProperty('foundRowIndex')
        if (rowIndex) {
            for (var index = 0; index < this.grid.behavior.getActiveColumns().length; index++) {
                //here we don't call Repaint as we consider that we already are in the repaint loop
                //There is never a timeout for CS
                if (style.csBackColorRow) {
                    this.grid.behavior.setCellProperty(index, rowIndex, 'csBackgroundColorRow', style.csBackColorRow)
                }
                if (style.csForeColorRow) {
                    this.grid.behavior.setCellProperty(index, rowIndex, 'csForeColorRow', style.csForeColorRow)
                }
            }
        }
    }

    public getRowIndexHypergrid(rowIdentifierValue: any): number {
        let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, rowIdentifierValue)
        let rowIndex = this.grid.behavior.dataModel.dataSource.getProperty('foundRowIndex')
        return rowIndex
    }

    public addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void {
        throw 'Not implemented for hypergrid see addRowStyleHypergrid';
    }

    public removeAllCellStylesWithRegex(regex: RegExp): void {
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
    }


    public removeCellStyleByIndex(x: number, y: number, style: 'flash' | 'csColumn' | 'csRow'): void {
        if (style == 'flash') {
            this.grid.behavior.setCellProperty(x, y, 'flashBackgroundColor', undefined)
            this.grid.repaint()
        }
        if (style == 'csColumn') {
            this.grid.behavior.setCellProperty(x, y, 'csBackgroundColorColumn', undefined)
            this.grid.behavior.setCellProperty(x, y, 'csForeColorColumn', undefined)
            this.grid.repaint()
        }
        if (style == 'csRow') {
            this.grid.behavior.setCellProperty(x, y, 'csBackgroundColorRow', undefined)
            this.grid.behavior.setCellProperty(x, y, 'csForeColorRow', undefined)
            this.grid.repaint()
        }
    }

    public removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void {
    }

    public removeRowStyle(rowIdentifierValue: any, style: string): void {
    }

    public getAllRowIds(): string[] {
        let ds = this.grid.behavior.dataModel.dataSource
        let count = ds.getRowCount();
        let result = new Array(count);
        for (var y = 0; y < count; y++) {
            result[y] = ds.getRow(y)[this.primaryKey];
        }
        return result
    }

    public hideRows(rowIds: string[]): void {
    }

    public showRows(rowIds: string[]): void {

    }

    public GetDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any {
    }

    public isGridPageable(): boolean {
        return false
    }

    public printGrid(): void {

    }

    public applyFilters(): void { }

    public isFilteredColumn(columnId: string): boolean {
        return false;
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}

interface CellStyleHypergrid {
    csForeColorColumn?: string,
    csBackColorColumn?: string,
    csForeColorRow?: string,
    csBackColorRow?: string,
    flashBackColor?: string
}