/// <reference path="AdaptableBlotter.d.ts" />

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

    //Grid is ANY for now.... Might be good to ask Jason to create definition file?
    constructor(private grid: AdaptableGrid.AdaptableGrid, private container: HTMLElement, options?: IAdaptableBlotterOptions) {
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
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        //this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        //this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.FilterStrategyId, new FilterStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))

        this.filterContainer = this.container.ownerDocument.createElement("div")
        this.filterContainer.id = "filterContainer"
        this.filterContainer.style.position = 'absolute'
        this.filterContainer.style.visibility = "hidden"
        this.container.ownerDocument.body.appendChild(this.filterContainer)

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

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
        let activeColumns: IColumn[] = this.grid.getVisibleColumns().map((x: AdaptableGrid.Column, index: number) => {
            return {
                ColumnId: x.getId() ? x.getId() : "Unknown Column",
                FriendlyName:  x.getFriendlyName() ? x.getFriendlyName() : (x.getId() ? x.getId() : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: true,
                Index: index
            }
        });
        let hiddenColumns: IColumn[] = this.grid.getHiddenColumns().map((x: any) => {
            return {
                ColumnId: x.getId() ? x.getId() : "Unknown Column",
              FriendlyName:  x.getFriendlyName() ? x.getFriendlyName() : (x.getId() ? x.getId() : "Unknown Column"),
                DataType: this.getColumnDataType(x.name),
                Visible: false,
                Index: -1
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(activeColumns.concat(hiddenColumns)));
    }

    public hideFilterForm() {
        throw Error("not implemented yet")
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        let gridVisibleColumns: AdaptableGrid.Column[] = this.grid.getVisibleColumns();
        let gridHiddenColumns: AdaptableGrid.Column[] = this.grid.getHiddenColumns();


        VisibleColumnList.forEach((column, index) => {
            let col = gridVisibleColumns.find(x => x.getId() == column.ColumnId)
            if (!col) {
                // it was missing so need to make it visible...
                col = gridHiddenColumns.find(x => x.getId() == column.ColumnId);
                if (col) // what if its not in this collection either????
                {
                    col.setVisible();
                }
            }
            //          this.grid.newColumnOrder(index, col);
        })
        gridVisibleColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getId()) < 0).forEach((col => {
            col.setHidden();
        }))
        let visibleIds: any[] = VisibleColumnList.map(v => v.ColumnId);
        // hoping this is enough?
        this.grid.newColumnOrder(visibleIds)
        this.grid.render();
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.setColumnIntoStore();
    }

    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));

        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public getPrimaryKeyValueFromRecord(record: any): any {
        return null
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
        return null
    }

    private getColumnDataType(column: AdaptableGrid.Column): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            console.log('columnId is undefined returning String for Type')
            return DataType.String;
        }

        let dataType: any = column.getType();

        // not sure why but cannot switch if we do AdaptableBlotterGrid.DataType.String
        switch (dataType) {
            case 0:
                return DataType.String;
            case 1:
                return DataType.Number;
            case 2:
                return DataType.Boolean;
            case 3:
                return DataType.Date;
            case 4:
                return DataType.Object;
            default:
                break;
        }

        // all else fails, return a string
        return DataType.String;
    }


    public setValue(cellInfo: ICellInfo): void {
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
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
        return null
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