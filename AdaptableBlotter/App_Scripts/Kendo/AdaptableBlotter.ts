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
import { SearchService } from '../Core/Services/SearchService'
import { IExpressionService } from '../Core/Services/Interface/IExpressionService'
import { ExpressionService } from '../Core/Services/ExpressionService'
import * as StrategyIds from '../Core/StrategyIds'
import { CustomSortStrategy } from '../Strategy/CustomSortStrategy'
import { SmartEditStrategy } from '../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from '../Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from '../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../Strategy/ColumnChooserStrategy'
import { ExcelExportStrategy } from '../Strategy/ExcelExportStrategy'
import { FlashingCellsStrategy } from '../Strategy/FlashingCellsStrategy'
import { CalendarStrategy } from '../Strategy/CalendarStrategy'
import { ConditionalStyleStrategy } from '../Strategy/ConditionalStyleStrategy'
import { PrintPreviewStrategy } from '../Strategy/PrintPreviewStrategy'
import { QuickSearchStrategy } from '../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../Strategy/AdvancedSearchStrategy'
import { AlertStrategy } from '../Strategy/AlertStrategy'
import { IEvent } from '../Core/Interface/IEvent';
import { EventDispatcher } from '../Core/EventDispatcher'
import { Helper } from '../Core/Helper';
import { ColumnType } from '../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { Expression } from '../Core/Expression/Expression';

export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public SearchService: ISearchService
    public ExpressionService: IExpressionService

    constructor(private grid: kendo.ui.Grid, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchService(this);
        this.ExpressionService = new ExpressionService(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, true))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.AlertStrategyId, new AlertStrategy(this))

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
                let identifierValue = this.getPrimaryKeyValueFromRecord(itemsArray);
                this.AuditService.CreateAuditEvent(identifierValue, changedValue, e.field);
            }
        });

        //we plug the AuditService on the Save event and wait for the editor to disappear so conditional style
        //can reevaluate the record when the DisplayValue is now computed. i.e. $2.000.000 instead of 2000000
        grid.bind("save", (e: kendo.ui.GridSaveEvent) => {
            setTimeout(() => {
                //I use "in"" instead of "of" on purpose here as I'm iterating on the properties of the object and not an array
                for (let valueField in e.values) {
                    let changedValue = e.values[valueField];
                    let identifierValue = this.getPrimaryKeyValueFromRecord(e.model);
                    this.AuditService.CreateAuditEvent(identifierValue, changedValue, valueField);
                }
            }, 5)
        })

        //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        grid.bind("columnReorder", () => {
            // we want to fire this after the DOM manipulation. 
            // Why the fuck they don't have the concept of columnReordering and columnReordered is beyond my understanding
            // http://www.telerik.com/forums/column-reorder-event-delay
            setTimeout(() => this.SetColumnIntoStore(), 5);
        });

        // following code is taken from Telerik website for how to ADD menu items to their column header menu
        // not sure yet if we want to use their or our menu, probably former
        // would be nice if can work out how to make it re-evaluate during runtime;
        // at the moment its only correct the FIRST time it runs for a column which is generally ok but not always accurate

        /*
        grid.bind("columnMenuInit", (e: any) => {
            let menu: any = e.container.find(".k-menu").data("kendoMenu");
            var field = e.field;
            var popup = e.container.data('kendoPopup');
            let columnMenuItems: string[] = [];
            let column: IColumn = this.getColumnFromColumnId(field);

            // each strategy can add its own menu item if it wants to
            this.Strategies.forEach(s => s.addColumnMenuItem(column, columnMenuItems));

            columnMenuItems.forEach(s => menu.append({ text: s }))

            // we can add the item this way which is nicer but not doing so for now
            //  $(e.container).find("ul").append('<li id="my-id" class="k-item k-state-default" role="menuitem"><span class="k-link"><b>Manual entry</b></span></li>');

            // event handler - each strategy listens and acts accordingly
            menu.bind("select", (e: any) => {
                var menuText = $(e.item).text();
                menu.close();
                popup.close();
                this.Strategies.forEach(s => s.onColumnMenuItemClicked(column, menuText));
            });
        })
 */
   

 }
   
    public SetColumnIntoStore() {
        //Some columns can have no ID or Title. We set it to Unknown columns 
        //but as of today it creates issues in all functions as we cannot identify the column....
        let columns: IColumn[] = this.grid.columns.map(x => {
            return {
                ColumnId: x.field ? x.field : "Unknown Column",
                ColumnFriendlyName: x.title ? x.title : (x.field ? x.field : "Unknown Column"),
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

    public getPrimaryKeyValueFromRecord( record: any) : any{
        return record["uid"]
    }

    getActiveCell(): { Id: any, ColumnId: string, Value: any } {
        let activeCell = $('#grid_active_cell')
        let row = activeCell.closest("tr");
        let item = this.grid.dataItem(row);
        let uuid = this.getPrimaryKeyValueFromRecord(item);
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
            var uuid = this.getPrimaryKeyValueFromRecord(item);
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
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!columnId) {
            console.log('columnId is undefined returning String for Type')
            return ColumnType.String;
        }
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
        this.grid.dataSource.getByUid(id).set(columnId, value);
    }

    public setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void {
        // first update the model, then sync the grid, then tell the AuditService (which will fire an event picked up by Flashing Cells)
        for (var item of batchValues) {
            let model: any = this.grid.dataSource.getByUid(item.id);
            model[item.columnId] = item.value;
        }

        // this line triggers a Databound changed event 
        this.grid.dataSource.sync();

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
        let column = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId);
        if (column) {
            return column.ColumnFriendlyName
        }
        else {
            return "";
        }
    }

    public getColumnIndex(columnName: string): number {
        return this.grid.columns.findIndex(x => x.field == columnName);
    }

    public getColumnFromColumnId(columnId: string): IColumn {
        return this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == columnId);
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
        //be careful here if we ever change to real primary key for kendo as we rely on UID
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

    public addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        var cell = this.getCellByColumnIndexAndRow(row, columnIndex);
        this.applyStyleToJQuerySelector(cell, style);
        if (timeout) {
            setTimeout(() => this.removeCellStyle(rowIdentifierValue, columnIndex, style), timeout);
        }
    }

    public addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        this.applyStyleToJQuerySelector(row, style);
        if (timeout) {
            setTimeout(() => this.removeRowStyle(rowIdentifierValue, style), timeout);
        }
    }

    private applyStyleToJQuerySelector(selector: JQuery, cellStyle: string) {
        if (selector != null && !selector.hasClass(cellStyle)) {
            selector.addClass(cellStyle);
        }
    }

    public removeAllCellStylesWithRegex(regex: RegExp): void {
        this.grid.table.find("td").removeClass((index, classes) => {
            return classes.split(/\s+/).filter(c => {
                return regex.test(c);
            }).join(' ');
        })
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
        this.grid.table.find("tr").removeClass((index, classes) => {
            return classes.split(/\s+/).filter(c => {
                return regex.test(c);
            }).join(' ');
        })
    }

    public removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        var cell = this.getCellByColumnIndexAndRow(row, columnIndex);
        if (cell != null && cell.hasClass(style)) {
            cell.removeClass(style);
        }
    }

    public removeRowStyle(rowIdentifierValue: any, style: string): void {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        if (row != null && row.hasClass(style)) {
            row.removeClass(style);
        }
    }

    // Im sure this is wrong! But for now want to try it..
    public getAllRowIds(): string[] {
        var dataSource = this.grid.dataSource.data();
        let uidList: string[] = [];
        for (var i = 0; i < dataSource.length; i++) {
            uidList.push(this.getPrimaryKeyValueFromRecord(dataSource[i]));
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
            var uidValue = this.getPrimaryKeyValueFromRecord(myRow);
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

    public hideRows(rowIds: string[]): void {
        rowIds.forEach(rowID => {
            var row = this.getRowByRowIdentifier(rowID);
            row.hide();
        })
    }

    public showRows(rowIds: string[]): void {
        rowIds.forEach(rowID => {
            var row = this.getRowByRowIdentifier(rowID);
            row.show();
        })
    }


    // this is all dead now and never called as we just hide the rows in the strategy...
    // keeping it commented out only so we have the working for when we do filters...
    /*        let quickSearchText = this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
            if (quickSearchText != "") {
                let filterItems: kendo.data.DataSourceFilterItem[] = [];
    
                let stringOperator: SearchStringOperator = this.AdaptableBlotterStore.TheStore.getState().QuickSearch.SearchStringOperator;
    
                let kendoStringOperator: string;
                let filterLogic: string;
    
                switch (stringOperator) {
                    case SearchStringOperator.Contains:
                        kendoStringOperator = "contains"   // ?
                        filterLogic = "or"
                        break;
                    case SearchStringOperator.Equals:
                        kendoStringOperator = "eq"   // ?
                        filterLogic = "or"
                        break;
                    case SearchStringOperator.NotEquals:
                        kendoStringOperator = "neq"   // ?
                        filterLogic = "and"
                        break;
                    case SearchStringOperator.StartsWith:
                        kendoStringOperator = "startswith"   // ?
                        filterLogic = "or"
                        break;
                }
                this.grid.columns.filter(c => this.getColumnType(c.field) == ColumnType.String).forEach(c => {
                    let filterItem: kendo.data.DataSourceFilterItem = { operator: kendoStringOperator, field: c.field, value: quickSearchText };
                    filterItems.push(filterItem);
                })
                let filters: kendo.data.DataSourceFilters = { logic: filterLogic, filters: filterItems };
                this.grid.dataSource.filter(filters);
            }
            else {
                this.grid.dataSource.filter([]);
            }
            */


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

