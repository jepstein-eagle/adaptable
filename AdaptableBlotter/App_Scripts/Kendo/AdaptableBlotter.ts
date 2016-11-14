/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../View/AdaptableBlotterView';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { IAdaptableBlotterStore } from '../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../Redux/Store/AdaptableBlotterStore'
import { CustomSortStrategy } from './Strategy/CustomSortStrategy'
import { SmartEditStrategy } from './Strategy/SmartEditStrategy'
import { ShortcutStrategy } from './Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from './Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from './Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from './Strategy/ColumnChooserStrategy'
import { ExcelExportStrategy } from './Strategy/ExcelExportStrategy'
import { FlashingCellsStrategy } from './Strategy/FlashingCellsStrategy'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem, IStrategy } from '../Core/Interface/IStrategy';
import { IEvent } from '../Core/Interface/IEvent';
import { EventDispatcher } from '../Core/EventDispatcher'
import { Helper } from '../Core/Helper';
import { ColumnType } from '../Core/Enums'
import { ICalendarService } from '../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../Core/Services/CalendarService'
import { IAuditService } from '../Core/Services/Interface/IAuditService'
import { AuditService } from '../Core/Services/AuditService'
import { CalendarStrategy } from './Strategy/CalendarStrategy'
import { ConditionalStyleStrategy } from './Strategy/ConditionalStyleStrategy'
import { PrintPreviewStrategy } from './Strategy/PrintPreviewStrategy'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn, IColumnStyleMapping } from '../Core/Interface/IAdaptableBlotter'



export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService


    constructor(private grid: kendo.ui.Grid, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        //grid.table.bind("keydown",
        grid.table.keydown((event) => {
            this._onKeyDown.Dispatch(this, event)

        })


        grid.bind("dataBound", (e: any) => {
            this._onGridDataBound.Dispatch(this, e)
        });

        grid.dataSource.bind("change", (e: any) => {
            if (e.action == "itemchange") {
                let itemsArray = e.items[0];
                let changedValue = itemsArray[e.field];
                let identifierValue = itemsArray["uid"];
                this.AuditService.CreateAuditEvent(identifierValue, changedValue, e.field);
            }
        });

        //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        grid.bind("columnReorder", () => {
            // we want to fire this after the DOM manipulation. 
            // Why the fuck they don't have the concept of columnReordering and columnReordered is beyond my understanding
            // http://www.telerik.com/forums/column-reorder-event-delay
            setTimeout(() => this.SetColumnIntoStore(), 5);
        });
    }


    public SetColumnIntoStore() {
        let columns: IColumn[] = this.grid.columns.map(x => {
            return {
                ColumnId: x.field,
                ColumnFriendlyName: x.title,
                ColumnType: this.getColumnType(x.field),
                Visible: x.hasOwnProperty('hidden') ? !x.hidden : true
            }
        });

        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(columns));
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

        //let menuItems = [].concat(this.strategies.values.(strat: IStrategy => strat.getMenuItems()[0]));
        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public onMenuClicked(menuItem: IMenuItem): void {
        this.Strategies.get(menuItem.StrategyId).onAction(menuItem.Action);
    }

    public gridHasCurrentEditValue(): boolean {
        var currentEditCell = this.getcurrentEditedCell();
        return currentEditCell.length > 0;
    }

    public getCurrentCellEditValue(): any {
        return this.getcurrentEditedCell().val();
    }

    getActiveCell(): { Id: any, ColumnId: string, Value: any } {
        let activeCell = $('#grid_active_cell')
        let row = activeCell.closest("tr");
        let item = this.grid.dataItem(row);
        let uuid = item.uid;
        let idx = activeCell.index();
        let col = <string>(this.grid.options.columns[idx].field);
        return {
            Id: uuid, ColumnId: col, Value: item.get(col)
        };
    }

    private getcurrentEditedCell(): JQuery {
        // hopefully there is a way to do this without using jquery, or which is less brittle
        return $(".k-edit-cell .k-input").not(".k-formatted-value");
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns fuck all
    public getSelectedCells(): ISelectedCells {

        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected = this.grid.select().not("tr");
        selected.each((i, element) => {
            var row = $(element).closest("tr");
            var item = this.grid.dataItem(row);
            var uuid = item.uid;
            var idx = $(element).index();
            var col = <string>(this.grid.options.columns[idx].field);
            var value = item.get(col);
            var valueArray = selectionMap.get(uuid);
            if (valueArray == undefined) {
                valueArray = []
                selectionMap.set(uuid, valueArray);
            }
            valueArray.push({ columnID: col, value: value });
        });

        return {
            Selection: selectionMap
        };
    }

    public getColumnType(columnId: string): ColumnType {

        if (!this.grid.dataSource.options.schema.hasOwnProperty('model') || !this.grid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            console.log('There is no Schema model for the grid. Defaulting to type string for column ' + columnId)
            return ColumnType.String;
        }

        let type = this.grid.dataSource.options.schema.model.fields[columnId].type;
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

    public setValue(id: any, columnId: string, value: any): void {
        // jw: i prefer this still despite the problems as it always works...... 
        // this.setValueBatch([ {id, columnId, value}]);

        // this line is apparently working for Jo but for JW it causes huge problems.  edits are either ignored or look like they have not worked but you see the new vlaue only when clicking back into the cell again!    
        // this line triggers a Databound changed event but only if the cell is not in edit mode.    
        // this.grid.bind("dataBinding", function (e: any) { e.preventDefault(); });
        this.grid.dataSource.getByUid(id).set(columnId, value);

        // this line helps a bit with some of the issues but not all of them sadly
        //this.grid.dataSource.sync();
    }

    public setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void {
        // first update the model, then sync the grid, then tell the AuditService (which will fire an event picked up by Flashing Cells)
        for (var item of batchValues) {
            let model: any = this.grid.dataSource.getByUid(item.id);
            model[item.columnId] = item.value;
        }

        // this line triggers a Databound changed event 
        this.grid.dataSource.sync();

        //  this.grid.bind("dataBinding", function(e:any) { e.preventDefault(); });
        //  this.grid.dataSource.getByUid(item.id).set(item.columnId, item.value);
        //  this.grid.unbind("dataBinding");
        //  this.grid.refresh();

        for (var item of batchValues) {
            let model: any = this.grid.dataSource.getByUid(item.id);
            this.AuditService.CreateAuditEvent(item.id, item.value, item.columnId);
        }
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            let record: any = this.grid.dataSource.getByUid(id);
            return (columnName: string) => { return record[columnName]; }
        }
        else {
            return (columnName: string) => { return this.getDisplayValue(id, columnName); }
        }
    }

    public selectCells(cells: { id: any, columnId: string }[]): void {
        let selectorQuery: JQuery
        for (let cell of cells) {
            let columnIndex = this.getColumnIndex(cell.columnId);
            var row = this.getRowByRowIdentifier(cell.id);
            let cellSelect = this.getCellByColumnIndexAndRow(row, columnIndex)
            if (selectorQuery == null) {
                selectorQuery = cellSelect
            }
            else {
                selectorQuery = selectorQuery.add(cellSelect)
            }
        }
        this.grid.select(selectorQuery);
    }

    public getColumnHeader(columnId: string): string {
        let column = this.grid.columns.find(x => x.field == columnId);
        if (column) {
            return column.title
        }
        else {
            return "";
        }
    }

    public getColumnIndex(columnName: string): number {
        return this.grid.columns.findIndex(x => x.field == columnName);
    }


    public isColumnReadonly(columnId: string): boolean {
        if (!this.grid.dataSource.options.schema.hasOwnProperty('model') || !this.grid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            //field cannot be readonly in that scenario
            return false;
        }
        let column = this.grid.dataSource.options.schema.model.fields[columnId];
        if (column) {
            if (column.hasOwnProperty('editable')) {
                return !column.editable
            }
            else {
                return false
            }
        }
        else {
            return true;
        }
    }

    public setCustomSort(columnId: string, comparer: Function): void {
        let column = this.grid.columns.find(x => x.field == columnId);

        if (column) {
            column.sortable = { compare: comparer }
        }
        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }

    public removeCustomSort(columnId: string): void {
        let column = this.grid.columns.find(x => x.field == columnId);

        if (column) {
            column.sortable = {}
        }

        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }

    private ReInitGrid() {
        this.grid.setDataSource(this.grid.dataSource);

    }

    public getColumnValueString(columnId: string): Array<string> {
        let columnIndex = this.grid.columns.findIndex(x => x.field == columnId);
        let tdIndex = columnIndex + 1;
        var rows = this.grid.table.find("tr > td:nth-child(" + tdIndex + ")");
        return rows.map((index, element) => $(element).text()).toArray();
    }

    public SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        VisibleColumnList.forEach((column, index) => {
            let col = this.grid.columns.find(x => x.field == column.ColumnId)
            //if not then not need to set it because it was already visible.........
            if (col.hasOwnProperty('hidden')) {
                this.grid.showColumn(col)
            }
            this.grid.reorderColumn(index, col);
        })
        this.grid.columns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.field) < 0).forEach((col => {
            this.grid.hideColumn(col)
        }))
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.SetColumnIntoStore();
    }

    public saveAsExcel(fileName: string, allPages: boolean): void {
        this.grid.options.excel.fileName = fileName + ".xls";
        this.grid.options.excel.allPages = allPages;
        this.grid.saveAsExcel();
    }

    private getRowByRowIdentifier(rowIdentifierValue: any): JQuery {
        return this.grid.table.find("tr[data-uid='" + rowIdentifierValue + "']");
    }

    private getCellByColumnIndexAndRow(row: any, columnIndex: number): JQuery {
        let tdIndex = columnIndex + 1;
        //we use the context of Jquery instead of parent/children so we improve performance drastically!
        let cell = $("td:nth-child(" + tdIndex + ")", row);
        return cell;
    }

    public getDisplayValue(id: any, columnId: string): string {
        let columnIndex = this.getColumnIndex(columnId)
        let row = this.getRowByRowIdentifier(id)
        let cell = this.getCellByColumnIndexAndRow(row, columnIndex)
        return cell.text();
    }

    public addCellStylesForRow(rowIdentifierValue: any, columnStyleMappings: Array<IColumnStyleMapping>): void {
        if (columnStyleMappings.length > 0) {
            var row = this.getRowByRowIdentifier(rowIdentifierValue);
            columnStyleMappings.forEach(csm => {
                var cell = this.getCellByColumnIndexAndRow(row, csm.ColumnIndex);
                if (cell != null && !cell.hasClass(csm.StyleName)) {
                    cell.addClass(csm.StyleName);
                }
            })
        }
    }

    public addCellStyle(rowIdentifierValue: any, columnStyleMapping: IColumnStyleMapping, timeout?: number): void {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        var cell = this.getCellByColumnIndexAndRow(row, columnStyleMapping.ColumnIndex);
        if (cell != null && !cell.hasClass(columnStyleMapping.StyleName)) {
            cell.addClass(columnStyleMapping.StyleName);
        }
        if (timeout) {
            setTimeout(() => this.removeCellStyle(rowIdentifierValue, columnStyleMapping), timeout);
        }
    }


    public removeCellStyles(rowIdentifierValues: any[], columnStyleMappings: Array<IColumnStyleMapping>): void {
        // seems expensive to remove styles like this....
        // but on the other hand we only do it when we update conditional styles through config so its not often
        rowIdentifierValues.forEach(rowId => {
            var row = this.getRowByRowIdentifier(rowId);
            columnStyleMappings.forEach(csm => {
                var cell = this.getCellByColumnIndexAndRow(row, csm.ColumnIndex);
                if (cell != null) {
                    if (cell.hasClass(csm.StyleName)) {
                        cell.removeClass(csm.StyleName)
                    }
                }
            })
        })
    }


    public removeCellStyle(rowIdentifierValue: any, columnStyleMapping: IColumnStyleMapping): void {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        var cell = this.getCellByColumnIndexAndRow(row, columnStyleMapping.ColumnIndex);
        if (cell != null && cell.hasClass(columnStyleMapping.StyleName)) {
            cell.removeClass(columnStyleMapping.StyleName);
        }
    }

    // Im sure this is wrong! But for now want to try it..
    public getAllRowIds(): string[] {
        var dataSource = this.grid.dataSource.data();
        let uidList: string[] = [];
        for (var i = 0; i < dataSource.length; i++) {
            uidList.push(dataSource[i].uid);
        }
        return uidList;
    }



    public GetDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any {
        // this is rather brittle... but its only required the first time we change a cell value
        var dataSource = this.grid.dataSource;
        var dataSourceCopy: any = dataSource;
        var testarray: any = dataSourceCopy._data;
        var currentRowIndex: number;
        for (var i = 0; i < testarray.length; i++) {
            var myRow: any = testarray[i];
            var uidValue = myRow["uid"];
            if (uidValue != null && uidValue == identifierValue) {
                currentRowIndex = i;
                break;
            }
        }
        var oldRow = dataSourceCopy._pristineData[currentRowIndex];
        var oldValue = oldRow[columnName];
        return oldValue;
    }

    public isGridPageable(): boolean {
        if (this.grid.options.pageable) {
            return true;
        }
        return false;
    }


    // this is copied straight from Telerik website and needs a fair bit of work but is ok for now...
    public printGrid(): void {

        var gridElement = $('#grid'),
            printableContent = '',
            win = window.open('', '', 'width=800, height=500, resizable=1, scrollbars=1'),
            doc = win.document.open();

        var htmlStart =
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta charset="utf-8" />' +
            '<title>Adaptable Blotter Grid</title>' +
            '<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
            '<style>' +
            'html { font: 11pt sans-serif; }' +
            '.k-grid { border-top-width: 0; }' +
            '.k-grid, .k-grid-content { height: auto !important; }' +
            '.k-grid-content { overflow: visible !important; }' +
            'div.k-grid table { table-layout: auto; width: 100% !important; }' +
            '.k-grid .k-grid-header th { border-top: 1px solid; }' +
            '.k-grouping-header, .k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
            // '.k-grid-pager { display: none; }' + // optional: hide the whole pager
            '</style>' +
            '</head>' +
            '<body>';

        var htmlEnd =
            '</body>' +
            '</html>';

        var gridHeader = gridElement.children('.k-grid-header');
        if (gridHeader[0]) {
            var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
            printableContent = gridElement
                .clone()
                .children('.k-grid-header').remove()
                .end()
                .children('.k-grid-content')
                .find('table')
                .first()
                .children('tbody').before(thead)
                .end()
                .end()
                .end()
                .end()[0].outerHTML;
        } else {
            printableContent = gridElement.clone()[0].outerHTML;
        }

        doc.write(htmlStart + printableContent + htmlEnd);
        doc.close();
        win.print();
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}

