/// <reference path="AdaptableBlotter.d.ts" />
import '../../../stylesheets/adaptableblotter-style.css'

import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore'
import {  IStrategy } from '../../Strategy/Interface/IStrategy';
import { IMenuItem } from '../../Core/Interface/IMenu';
import { ICellInfo } from '../../Core/Interface/IAdaptableBlotter';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../../Core/Services/CalendarService'
import { IAuditService } from '../../Core/Services/Interface/IAuditService'
import { IValidationService } from '../../Core/Services/Interface/IValidationService'
import { AuditService } from '../../Core/Services/AuditService'
import { ValidationService } from '../../Core/Services/ValidationService'
//import { // } from '../../Core/Services/ThemeService'
import { StyleService } from '../../Core/Services/StyleService'
import { CalculatedColumnExpressionService } from '../../Core/Services/CalculatedColumnExpressionService'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy'
import { SmartEditStrategy } from '../../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../../Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from '../../Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from '../../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../../Strategy/ColumnChooserStrategy'
import { ExportStrategy } from '../../Strategy/ExportStrategy'
import { CalendarStrategy } from '../../Strategy/CalendarStrategy'
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { UserFilterStrategy } from '../../Strategy/UserFilterStrategy'
import { ColumnFilterStrategy } from '../../Strategy/ColumnFilterStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { DashboardStrategy } from '../../Strategy/DashboardStrategy'
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { DataType, DistinctCriteriaPairValue } from '../../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn, IRawValueDisplayValuePair, IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotter'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'
import { ICalculatedColumn } from "../../Strategy/Interface/ICalculatedColumnStrategy";
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";


export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public ValidationService: IValidationService
    public StyleService: StyleService
  //  public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    private filterContainer: HTMLDivElement
    public BlotterOptions: IAdaptableBlotterOptions

    constructor(private grid: AdaptableGrid.AdaptableGrid, private container: HTMLElement, options?: IAdaptableBlotterOptions) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, options)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.ValidationService = new ValidationService(this);
        this.StyleService = new StyleService(this);
     //   this.ThemeService = new ThemeService(this)
        this.AuditLogService = new AuditLogService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, null);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy(this))

        this.Strategies.set(StrategyIds.ExportStrategyId, new ExportStrategy(this))
        // this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        // this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.UserFilterStrategyId, new UserFilterStrategy(this))
        this.Strategies.set(StrategyIds.ColumnFilterStrategyId, new ColumnFilterStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))

        this.filterContainer = this.container.ownerDocument.createElement("div")
        this.filterContainer.id = "filterContainer"
        this.filterContainer.style.position = 'absolute'
        this.filterContainer.style.visibility = "hidden"
        this.container.ownerDocument.body.appendChild(this.filterContainer)

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        $(grid).keydown((event) => {
            this._onKeyDown.Dispatch(this, <any>event)
        })



    }

    public InitAuditService() {
        // todo?
    }

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


    public setColumnIntoStore() {
        let activeColumns: IColumn[] = this.grid.getVisibleColumns().map((x: AdaptableGrid.Column, index: number) => {
            return {
                ColumnId: x.getId() ? x.getId() : "Unknown Column",
                FriendlyName: x.getFriendlyName() ? x.getFriendlyName() : (x.getId() ? x.getId() : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: true,
                Index: index
            }
        });
        let hiddenColumns: IColumn[] = this.grid.getHiddenColumns().map((x: any) => {
            return {
                ColumnId: x.getId() ? x.getId() : "Unknown Column",
                FriendlyName: x.getFriendlyName() ? x.getFriendlyName() : (x.getId() ? x.getId() : "Unknown Column"),
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
        return this.grid.getCurrentEditor() != null;
    }

    public getCurrentCellEditValue(): any {
        let editor: any = this.grid.getCurrentEditor();
        if (editor) {
            let editval: any = editor.editVal;
            return editval;
        }
        return "";
    }

    public getActiveCell(): ICellInfo {
        let activeCell: AdaptableGrid.Cell = this.grid.getActiveCell();
        let cellInfo: ICellInfo = { Id: activeCell.getRowId(), ColumnId: activeCell.getColId(), Value: activeCell.getRawValue() };
        return cellInfo;
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    public getSelectedCells(): ISelectedCells {
        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        let cells: any = this.grid.getSelectedCells();
        cells.forEach((c: AdaptableGrid.Cell) => {
            var valueArray = selectionMap.get(c.getRowId());
            if (valueArray == undefined) {
                valueArray = []
                selectionMap.set(c.getRowId(), valueArray);
            }
            valueArray.push({ columnID: c.getColId(), value: c.getRawValue() });
        });

        return {
            Selection: selectionMap
        };

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
        let row: AdaptableGrid.Row = this.grid.getRowFromId(cellInfo.Id);
        let cell: AdaptableGrid.Cell = this.getCellFromRowAndColumnId(row, cellInfo.ColumnId);
        cell.setValue(cellInfo.Value);
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        batchValues.forEach(b => {
            this.setValue(b);
        })

        // not sure if this is best place..
        this.rendergrid();
    }

    public cancelEdit() {
        this.grid.exitCurrentEditor();
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        // this is very very wrong!
        if (type == "getColumnValue") {
            return (columnName: string) => { return this.getRawValue(id, columnName); }
        }
        else {
            return (columnName: string) => { return this.getDisplayValue(id, columnName); }
        }
    }

    public getRecordIsSatisfiedFunctionFromRecord(record: AdaptableGrid.Row, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            return (columnName: string) => { return this.getCellFromRowAndColumnId(record, columnName).getRawValue() }
        }
        else {
            return (columnName: string) => { return this.getDisplayValueFromRecord(record, columnName); }
        }
    }

    public selectCells(cells: ICellInfo[]): void {
        // todo
    }

    public getColumnIndex(columnId: string): number {
        let column: AdaptableGrid.Column = this.grid.getColumnFromId(columnId);
        let columnIndex: number = this.grid.getPositionOfColumn(column);
        return columnIndex;
    }


    public isColumnReadonly(columnId: string): boolean {

        return null
    }

    public setCustomSort(columnId: string, comparer: Function): void {
        // todo
    }

    public removeCustomSort(columnId: string): void {
        // todo
    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();
        this.grid.getAllRows().forEach((row: AdaptableGrid.Row) => {
            let cell: AdaptableGrid.Cell = this.getCellFromRowAndColumnId(row, columnId);
            let displayValue = cell.getFormattedValue(this.grid);
            let rawValue = cell.getRawValue();
            if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
            else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
        })
        return Array.from(returnMap.values());
    }

    public getDisplayValue(id: any, columnId: string): string {
        let row: AdaptableGrid.Row = this.grid.getRowFromId(id);
        return this.getDisplayValueFromRecord(row, columnId);
    }

    public getDisplayValueFromRecord(row: AdaptableGrid.Row, columnId: string): string {
        let cell: AdaptableGrid.Cell = this.getCellFromRowAndColumnId(row, columnId);
        return cell.getFormattedValue(this.grid);
    }

    private getRawValue(id: any, columnId: string): string {
        let row: AdaptableGrid.Row = this.grid.getRowFromId(id);
        let cell: AdaptableGrid.Cell = this.getCellFromRowAndColumnId(row, columnId);
        return cell.getRawValue();
    }

    private getCellFromRowAndColumnId(row: AdaptableGrid.Row, columnId: string): AdaptableGrid.Cell {
        let columnIndex: number = this.getColumnIndex(columnId);
        return row.getCell(columnIndex);
    }

    public addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void {
        var row: AdaptableGrid.Row = this.grid.getRowFromId(rowIdentifierValue);
        var cell: AdaptableGrid.Cell = row.getCell(columnIndex);
        cell.addClass(style);
        if (timeout) {
            setTimeout(() => this.removeCellStyle(rowIdentifierValue, columnIndex, style), timeout);
        }
    }

    public addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void {
        var row: AdaptableGrid.Row = this.grid.getRowFromId(rowIdentifierValue);
        // note: no check on if already exists...
        row.addClass(style, this.grid);
        if (timeout) {
            setTimeout(() => this.removeRowStyle(rowIdentifierValue, style), timeout);
        }
    }

    public removeAllCellStylesWithRegex(regex: RegExp): void {
        //
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
        //
    }


    public removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void {
        var row: AdaptableGrid.Row = this.grid.getRowFromId(rowIdentifierValue);
        var cell: AdaptableGrid.Cell = row.getCell(columnIndex);
        cell.removeClass(style);
    }

    public removeRowStyle(rowIdentifierValue: any, style: string): void {
        var row: AdaptableGrid.Row = this.grid.getRowFromId(rowIdentifierValue);
        // note: no check on if already exists...
        row.removeClass(style, this.grid);

    }

    public forAllRecordsDo(func: (record: any) => any) {
        //jo:not tested, not even tried
        this.grid.getAllRows().forEach(r => func(r));
    }

    public forAllVisibleRecordsDo(func: (record: any) => any) {
        //jo:not tested, not even tried 
        this.grid.getVisibleRows().forEach(r => func(r));
    }

    public getAllRows(): any[] {
        return null;
    }

    public getAllVisibleRows(): any[] {
        return null;
    }

    // public hideRows(rowIds: string[]): void {
    //     // doing it long way to see if it works...
    //     // this is called at the end of ApplySearchOnGrid so we can just do one re-render here.

    //     let rowsToHide: AdaptableGrid.Row[] = []

    //     rowIds.forEach(r => rowsToHide.push(this.grid.getRowFromId(r)));

    //     rowsToHide.forEach(rowToHide => {
    //         if (rowToHide.isVisible()) {
    //             rowToHide.setHidden(this.grid);
    //         }
    //     })

    //     //     this.grid.render();
    // }

    // public showRows(rowIds: string[]): void {
    //     let rowsToShow: AdaptableGrid.Row[] = []

    //     rowIds.forEach(r => rowsToShow.push(this.grid.getRowFromId(r)));

    //     rowsToShow.forEach(rowToShow => {
    //         if (!rowToShow.isVisible()) {
    //             rowToShow.setVisible(this.grid);
    //         }
    //     })

    // }

    public applyColumnFilters(): void {
        return null
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }

    public createCalculatedColumn(calculatedColumn: ICalculatedColumn) {
        // todo
    }
    public deleteCalculatedColumn(calculatedColumnID: string) {
        // todo
    }

    public getFirstRecord(): any {
        return null;
    }

    public rendergrid(): void {
        this.grid.render();
    }

    public getRecordFromRowId(rowId: string): any {
        return null
    }
    //TEMPORARY : JO
    public getIPPStyle(): any {
        return null
    }
}