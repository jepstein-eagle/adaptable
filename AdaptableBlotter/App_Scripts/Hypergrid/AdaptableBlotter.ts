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
import * as StrategyIds from '../Core/StrategyIds'
import { CustomSortStrategyHyperGrid } from '../Strategy/CustomSortStrategyHyperGrid'
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
import { IEvent } from '../Core/Interface/IEvent';
import { EventDispatcher } from '../Core/EventDispatcher'
import { Helper } from '../Core/Helper';
import { ColumnType, SearchStringOperator, SortOrder } from '../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { Expression } from '../Core/Expression/Expression';

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
        this.CustomSorts = new Map<number, Function>()

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchService(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategyHyperGrid(this))
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
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        // //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        // //grid.table.bind("keydown",
        // grid.table.keydown((event) => {
        //     this._onKeyDown.Dispatch(this, event)
        // })

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

        grid.addEventListener('fin-column-sort', (e: any) => {
            this.toggleSort(e.detail.column)
            //in case we want multi column
            //keys =  event.detail.keys;
        });

        //This is temporary for now as it replaces the whole pipelne. 
        //Ideally dev should set that up or we should just add our instead of replacing the whole chain
        grid.setPipeline([MySorterDataSource(this)], {
            stash: 'default',
            apply: false //  Set the new pipeline without calling reindex.
        });

        // grid.addEventListener("fin-keydown", (e: any) => {
        //     console.log("+++++++++++++ The key down  ", e)
        // });

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

    public sortColumn: number
    public sortOrder: SortOrder
    public toggleSort(columnIndex: number) {
        //Toggle sort one column at a time
        if (this.sortColumn === columnIndex) {
            if (this.sortOrder == SortOrder.Descending) {
                this.sortColumn = null;
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
        return false;
    }

    public getCurrentCellEditValue(): any {
        return "";
    }

    getActiveCell(): { Id: any, ColumnId: string, Value: any } {
        return null
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns fuck all
    public getSelectedCells(): ISelectedCells {
        return null
    }

    public getColumnType(columnId: string): ColumnType {
        // //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        // if (!columnId) {
        //     console.log('columnId is undefined returning String for Type')
        //     return ColumnType.String;
        // }
        // if (!this.grid.dataSource.options.schema.hasOwnProperty('model') || !this.grid.dataSource.options.schema.model.hasOwnProperty('fields')) {
        //     console.log('There is no Schema model for the grid. Defaulting to type string for column ' + columnId)
        //     return ColumnType.String;
        // }

        // let type = this.grid.dataSource.options.schema.model.fields[columnId].type;
        // switch (type) {
        //     case 'string':
        //         return ColumnType.String;
        //     case 'number':
        //         return ColumnType.Number;
        //     case 'boolean':
        //         return ColumnType.Boolean;
        //     case 'date':
        //         return ColumnType.Date;
        //     case 'object':
        //         return ColumnType.Object;
        //     default:
        //         break;
        // }
        return ColumnType.String;
    }

    public setValue(id: any, columnId: string, value: any): void {
    }

    public setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void {
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

    public CustomSorts: Map<number, Function>
    public setCustomSort(columnId: string, comparer: Function): void {
        let columnIndex = this.getColumnIndex(columnId)
        this.CustomSorts.set(columnIndex, comparer)
        this.ReInitGrid()
    }

    public removeCustomSort(columnId: string): void {
        this.CustomSorts.delete(this.getColumnIndex(columnId))
        this.ReInitGrid()
    }

    private ReInitGrid() {
        this.grid.behavior.reindex()
    }

    public getColumnValueString(columnId: string): Array<string> {
        let returnArray: string[] = []
        let dataSourceColumnIndex = this.grid.behavior.dataModel.schema.findIndex((x: any) => x.name == columnId)
        let rowCount = this.grid.behavior.dataModel.dataSource.getRowCount()
        //This is wrong as it doesnt get DisplayValue but I'll check after.... I hate this fcking grid
        for (var index = 0; index < rowCount; index++) {
            var element = this.grid.behavior.dataModel.dataSource.getValue(dataSourceColumnIndex, index)
            returnArray.push(element)
        }
        //this allow to get value only from visible rows. so only ~30 as there is scrolling.
        // for (var index = 1; index < rowCount; index++) {
        //     var element = this.grid.getValue(columnIndex,index)
        //     returnArray.push(element)
        // }

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
        return ""
    }

    public addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void {
        if (timeout) {
            setTimeout(() => this.removeCellStyle(rowIdentifierValue, columnIndex, style), timeout);
        }
    }

    public addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void {
        if (timeout) {
            setTimeout(() => this.removeRowStyle(rowIdentifierValue, style), timeout);
        }
    }

    public removeAllCellStylesWithRegex(regex: RegExp): void {
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
    }

    public removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void {
    }

    public removeRowStyle(rowIdentifierValue: any, style: string): void {
    }

    // Im sure this is wrong! But for now want to try it..
    public getAllRowIds(): string[] {
        return [];
    }



    public GetDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any {
    }

    public isGridPageable(): boolean {
        return false
    }

    public applyQuickSearch(): void {
    }

    public printGrid(): void {

    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}


//All custom pipelines should extend from pipelineBase
var MySorterDataSource = (blotter: IAdaptableBlotter) => (<any>window).fin.Hypergrid.DataSourceBase.extend('MySorterDataSource', {
    //The `get` and `set` are two functions are use by HyperGrid core if there if the DataSource has the type "sorter"
    type: 'sorter',
    blotter: blotter,
    data: [],
    set: function (sorter: any) {
        // if (sorter) {
        //     this.sorter = sorter; // Will become a ref to MySorterAPI
        // } else {
        //     delete this.sorter;
        // }
    },

    get: function () {
        return this.sorter;
    },
    // This function is called on every reIndex call if this object is in the pipelne
    apply: function () {
        var c = this.blotter.sortColumn;
        if (!c) {
            this.data.length = 0;
            return;
        }

        var fields = this.dataSource.schema[c].name;
        //All objects added to your pipeline will have access to the underlying "raw" data
        // getReIndex resolves the entire pipeline beneath this dataSource for all rows
        // Furthermore this sort reorders objects in an array as opposed to leveraging an index
        // This trivial example would not scale
        this.data = (function () {
            var ds = this.dataSource;
            var count = ds.getRowCount();
            var result = new Array(count);
            for (var y = 0; y < count; y++) {
                result[y] = ds.getRow(y);
            }

            return result;
        }).bind(this)();

        let customComparer = this.blotter.CustomSorts.get(c)
        if (customComparer) {
            this.data = this.data.sort(customComparer)
            if (this.blotter.sortOrder === SortOrder.Descending) {
                this.data = this.data.reverse()
            }
        }
        else {
            this.data = this.data.sort(function (a: any, b: any) {
                if (a[fields] > b[fields]) {
                    return 1;
                }
                if (a[fields] < b[fields]) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            })
            if (this.blotter.sortOrder === SortOrder.Descending) {
                this.data = this.data.reverse()
            }
        }
    },
    getRow: function (y: any) {
        //Data available after an apply call
        if (this.data.length > 0) {
            return this.data[y];
        }
        //No sorted columns. Go down the pipeline for the dataRows
        return this.dataSource.getRow(y);
    },
    //Since we are not using an index, but making a copy of the underlying data for this pipeline
    //We also need to override the following
    //If we override setValue the update will not persist down the other pipelineDataSources
    getValue: function (c: any, r: any) {
        var row = this.getRow(r);
        if (!row) {
            return null;
        }
        return row[this.dataSource.schema[c].name];
    }
});
