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
import { IEvent } from '../Core/Interface/IEvent';
import { EventDispatcher } from '../Core/EventDispatcher'
import { Helper } from '../Core/Helper';
import { ColumnType, SearchStringOperator } from '../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { Expression } from '../Core/Expression/Expression';



export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public SearchService: ISearchService

    constructor(private grid: any, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchService(this);

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
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        // //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        // //grid.table.bind("keydown",
        // grid.table.keydown((event) => {
        //     this._onKeyDown.Dispatch(this, event)
        // })

        // grid.bind("dataBound", (e: any) => {
        //     this._onGridDataBound.Dispatch(this, e)
        // });

        // grid.dataSource.bind("change", (e: any) => {
        //     if (e.action == "itemchange") {
        //         let itemsArray = e.items[0];
        //         let changedValue = itemsArray[e.field];
        //         let identifierValue = itemsArray["uid"];
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
        //             let identifierValue = e.model.uid;
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
        let columns: IColumn[] = this.grid.behavior.columns.map((x:any) => {
            return {
                ColumnId: x.name ? x.name : "Unknown Column",
                ColumnFriendlyName: x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                ColumnType: this.getColumnType(x.name),
                Visible: true
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

        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public onMenuClicked(menuItem: IMenuItem): void {
        this.Strategies.get(menuItem.StrategyId).onAction(menuItem.Action);
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
        return ""
    }

    public getColumnIndex(columnName: string): number {
        return 0;
    }


    public isColumnReadonly(columnId: string): boolean {
            return false;
    }

    public setCustomSort(columnId: string, comparer: Function): void {
    }

    public removeCustomSort(columnId: string): void {
    }

    private ReInitGrid() {
    }

    public getColumnValueString(columnId: string): Array<string> {
        return []
    }

    public SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
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

