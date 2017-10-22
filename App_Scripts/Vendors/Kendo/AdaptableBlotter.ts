import '../../../stylesheets/adaptableblotter-style.css'

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import { FilterFormReact } from '../../View/FilterForm';
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
import { StyleService } from '../../Core/Services/StyleService'
import { ThemeService } from '../../Core/Services/ThemeService'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import { CalculatedColumnExpressionService } from '../../Core/Services/CalculatedColumnExpressionService'
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
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { FilterStrategy } from '../../Strategy/FilterStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { DashboardStrategy } from '../../Strategy/DashboardStrategy'
import { TeamSharingStrategy } from '../../Strategy/TeamSharingStrategy'
import { IRange } from '../../Core/Interface/IRangeStrategy'
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { Helper } from '../../Core/Helper';
import { DataType, LeafExpressionOperator, QuickSearchDisplayType, CellValidationMode, DistinctCriteriaPairValue } from '../../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn, IRawValueDisplayValuePair, IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotter'
import { IColumnFilter, IColumnFilterContext } from '../../Core/Interface/IFilterStrategy';
import { ILayout } from '../../Core/Interface/ILayoutStrategy';
import { ICellValidationRule, ICellValidationStrategy } from '../../Core/Interface/ICellValidationStrategy';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { ExportState, QuickSearchState, LayoutState } from '../../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../../Core/Extensions'
import { IDataChangingEvent } from '../../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'
import { ContextMenuReact } from '../../View/ContextMenu'
import { ICalculatedColumn } from "../../Core/Interface/ICalculatedColumnStrategy";
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";

export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService

    public StyleService: StyleService
    public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    public BlotterOptions: IAdaptableBlotterOptions
    private contextMenuContainer: HTMLDivElement

    constructor(private grid: kendo.ui.Grid, private container: HTMLElement, options?: IAdaptableBlotterOptions) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, options)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.StyleService = new StyleService(this);
        this.ThemeService = new ThemeService(this);
        this.AuditLogService = new AuditLogService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, null)

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, true))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.ExportStrategyId, new ExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.FilterStrategyId, new FilterStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy(this))
        this.Strategies.set(StrategyIds.TeamSharingStrategyId, new TeamSharingStrategy(this))

        this.contextMenuContainer = this.container.ownerDocument.createElement("div")
        this.contextMenuContainer.id = "contextMenuContainer"
        this.contextMenuContainer.style.position = 'absolute'
        this.container.ownerDocument.body.appendChild(this.contextMenuContainer)
        ReactDOM.render(ContextMenuReact(this), this.contextMenuContainer);

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
            () => this.initInternalGridLogic(grid),
            (e) => {
                console.error('Failed to Init Strategies : ', e);
                //for now i'm still initializing the grid even if loading state has failed.... 
                //we may revisit that later
                this.initInternalGridLogic(grid)
            })
    }

    public InitAuditService() {
    }

    private kendoPopup: kendo.ui.Popup
    public hideFilterForm() {
        if (this.kendoPopup) {
            this.kendoPopup.close()
        }
    }

    private createFilterForm(e: kendo.ui.GridFilterMenuInitEvent): void {
        /* 
       replacing filter screen with our own - good idea?  some ideas stolen from...
       http://www.ideatoworking.com/Blogs/ID/34/How-To-Override-Kendo-UI-Grid-Filter
       https://www.newventuresoftware.com/blog/kendo-ui-grid-custom-filtering---regex-column-filter
       */
        let filterContext: IColumnFilterContext = {
            Column: this.getColumnFromColumnId(e.field),
            Blotter: this,
            ColumnValueType: DistinctCriteriaPairValue.RawValue
        };

        // Remove default filter UI
        e.container.off();
        e.container.empty();
        this.kendoPopup = e.container.data("kendoPopup")
        //we repopuple the popup with a new react component with latest values for columns etc ...
        e.container.data("kendoPopup").bind("open", () => this.populateFilterForm(filterContext))

        let formId = "filterform" + e.field;
        //we unmount our react component when popup is closing
        e.container.data("kendoPopup").bind("close", () => {
            var filterContainer = document.getElementById(formId);
            ReactDOM.unmountComponentAtNode(filterContainer)
        })

        var filterContainer = document.getElementById(formId);
        e.container.html('<div id="' + formId + '"></div>');
    };

    private populateFilterForm(filterContext: IColumnFilterContext): void {
        let formId = "filterform" + filterContext.Column.ColumnId;
        var filterContainer = document.getElementById(formId);
        ReactDOM.render(FilterFormReact(filterContext), filterContainer);
    };


    public setColumnIntoStore() {
        //Some columns can have no ID or Title. We set it to Unknown columns 
        //but as of today it creates issues in all functions as we cannot identify the column....
        let columns: IColumn[] = this.grid.columns.map((x: kendo.ui.GridColumn, index: number) => {
            let isVisible: boolean = this.isGridColumnVisible(x);
            return {
                ColumnId: x.field ? x.field : "Unknown Column",
                FriendlyName: x.title ? x.title : (x.field ? x.field : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: isVisible,
                Index: isVisible ? index : -1
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(columns));
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
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
        this.setColumnIntoStore();
    }

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> = new EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>();
    public onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> {
        return this._onKeyDown;
    }

    private _onGridDataBound: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onGridDataBound;
    }


    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));
        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public gridHasCurrentEditValue(): boolean {
        var currentEditCell = this.getcurrentEditedCell();
        return currentEditCell.length > 0;
    }

    public getCurrentCellEditValue(): any {
        return this.getcurrentEditedCell().val();
    }

    public getPrimaryKeyValueFromRecord(record: any): any {
        return record["uid"]
    }

    public getActiveCell(): ICellInfo {
        let activeCell = $('#grid_active_cell')
        let row = activeCell.closest("tr");
        let item = this.grid.dataItem(row);
        let uuid = this.getPrimaryKeyValueFromRecord(item);
        let idx = activeCell.index();
        let col = <string>(this.grid.columns[idx].field);
        return {
            Id: uuid, ColumnId: col, Value: item.get(col)
        };
    }

    private isGridColumnVisible(gridColumn: kendo.ui.GridColumn) {
        return gridColumn.hasOwnProperty('hidden') ? !gridColumn.hidden : true;
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
            var col = <string>(this.grid.columns[idx].field);
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

    private getColumnDataType(column: kendo.ui.GridColumn): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            console.log('column is undefined returning String for Type')
            return DataType.String;
        }
        if (!this.grid.dataSource.options.schema.hasOwnProperty('model') ||
            !this.grid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            let type = this.getTypeFromFirstRecord(column.field);
            console.log('There is no Schema model for the grid. Defaulting to type of the first record for column ' + column.field, DataType[type])
            return type
        }

        let type = this.grid.dataSource.options.schema.model.fields[column.field].type;

        switch (type) {
            case 'string':
                return DataType.String;
            case 'number':
                return DataType.Number;
            case 'boolean':
                return DataType.Boolean;
            case 'date':
                return DataType.Date;
            case 'object':
                return DataType.Object;
            default:
                return this.getTypeFromFirstRecord(column.field);
        }
    }

    private getTypeFromFirstRecord(columnId: string): DataType {
        let row = this.grid.dataSource.data()[0]
        let value = row[columnId]
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
                return DataType.String;
        }
    }

    public setValue(cellInfo: ICellInfo): void {
        let model = this.grid.dataSource.getByUid(cellInfo.Id)
        let oldValue = model.get(cellInfo.ColumnId)
        model.set(cellInfo.ColumnId, cellInfo.Value);

        this.AuditLogService.AddEditCellAuditLog(cellInfo.Id,
            cellInfo.ColumnId,
            oldValue, cellInfo.Value)
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        // first update the model, then sync the grid, then tell the AuditService (which will fire an event picked up by Flashing Cells)
        for (let item of batchValues) {
            let model: any = this.grid.dataSource.getByUid(item.Id);
            let oldValue = model[item.ColumnId]
            model[item.ColumnId] = item.Value;

            this.AuditLogService.AddEditCellAuditLog(item.Id,
                item.ColumnId,
                oldValue, item.Value)
        }

        // this line triggers a Databound changed event 
        this.grid.dataSource.sync();

        for (let item of batchValues) {
            // todo: work out why we have this line?  seems superfluous....
            let model: any = this.grid.dataSource.getByUid(item.Id);
            this.AuditService.CreateAuditEvent(item.Id, item.Value, item.ColumnId, model);
        }
    }

    public cancelEdit() {
        this.grid.closeCell()
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

    public getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            return (columnName: string) => { return record[columnName]; }
        }
        else {
            return (columnName: string) => { return this.getDisplayValueFromRecord(record, columnName); }
        }
    }

    public selectCells(cells: ICellInfo[]): void {
        let selectorQuery: JQuery
        for (let cell of cells) {
            let columnIndex = this.getColumnIndex(cell.ColumnId);
            var row = this.getRowByRowIdentifier(cell.Id);
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
        let column = this.GetGridState().Columns.find(x => x.ColumnId == columnId);
        if (column) {
            return column.FriendlyName
        }
        else {
            return "";
        }
    }

    public getColumnIndex(columnName: string): number {
        return this.grid.columns.findIndex(x => x.field == columnName);
    }

    public getColumnFromColumnId(columnId: string): IColumn {
        return this.GetGridState().Columns.find(c => c.ColumnId == columnId);
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

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();
        this.grid.dataSource.data().forEach((row: any) => {
            let displayValue = this.getDisplayValueFromRecord(row, columnId)
            let rawValue = row[columnId]
            if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
            else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }

        })
        return Array.from(returnMap.values()).slice(0, this.BlotterOptions.maxColumnValueItemsDisplayed);
    }




    public exportBlotter(): void {
        // get export state
        let exportState: ExportState = this.AdaptableBlotterStore.TheStore.getState().Export;
        this.grid.options.excel.fileName = exportState.FileName + ".xlsx";
        this.grid.options.excel.allPages = exportState.AllPages;
        this.grid.options.excel.filterable = exportState.Filterable;
        this.grid.saveAsExcel();
    }

    public convertRangeToArray(range: IRange, rangeColumns: IColumn[]): any[] {
        return null;
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
        let record: kendo.data.Model = this.grid.dataSource.getByUid(id);
        return this.getDisplayValueFromRecord(record, columnId)
        // let columnIndex = this.getColumnIndex(columnId)
        // let row = this.getRowByRowIdentifier(id)
        // let cell = this.getCellByColumnIndexAndRow(row, columnIndex)
        // return cell.text();
    }

    public getDisplayValueFromRecord(row: any, columnId: string): string {
        let column = this.grid.columns.find(x => x.field == columnId);
        let rawValue = row[columnId]
        if (column.format) {
            return kendo.format(column.format, rawValue)
        }
        else {
            return String(rawValue)
        }
    }


    //Jo: we know that this function is wrong as it's not cumulative
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



    public getDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any {
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


    public applyColumnFilters(): void {
        //we remove all style linked to QuickSearch
        this.removeAllCellStylesWithRegex(new RegExp("^Ab-QuickSearch"));
        let quickSearchColors: { rowId: any, columnIndex: number }[] = []
        let myFilter: kendo.data.DataSourceFilterItem = {
            operator: (record: any) => {
                let columns = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
                //first we assess AdvancedSearch 
                let currentSearchId = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId;
                if (StringExtensions.IsNotNullOrEmpty(currentSearchId)) {
                    let currentSearch = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Uid == currentSearchId);
                    if (!ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, record, columns, this)) {
                        return false;
                    }
                }
                //we then assess filters
                let columnFilters: IColumnFilter[] = this.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters;
                if (columnFilters.length > 0) {
                    for (let columnFilter of columnFilters) {
                        if (!ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, record, columns, this)) {
                            return false;
                        }
                    }
                }
                //we assess quicksearch
                let recordReturnValue = false;
                let quickSearchState = this.AdaptableBlotterStore.TheStore.getState().QuickSearch;
                if (StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)) {
                    let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                    for (let column of columns.filter(c => c.Visible)) {
                        let displayValue = this.getDisplayValueFromRecord(record, column.ColumnId);
                        let rowId = this.getPrimaryKeyValueFromRecord(record);
                        let stringValueLowerCase = displayValue.toLowerCase();
                        switch (this.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchOperator) {
                            case LeafExpressionOperator.Contains:
                                {
                                    if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                        //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                        if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell
                                            || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndColourCell) {
                                            quickSearchColors.push({ rowId, columnIndex: this.getColumnIndex(column.ColumnId) })
                                        }
                                        //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                        if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRow) {
                                            return true;
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
                                            quickSearchColors.push({ rowId, columnIndex: this.getColumnIndex(column.ColumnId) })
                                        }
                                        //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                        if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRow) {
                                            return true;
                                        }
                                        recordReturnValue = true
                                    }
                                }
                                break;
                        }
                    }
                    //if we color only then we just return true....
                    if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell) {
                        return true;
                    }
                    return recordReturnValue;
                }
                return true;
            }
        }
        this.grid.dataSource.filter(myFilter);
        quickSearchColors.forEach(x => this.addCellStyle(x.rowId, x.columnIndex, "Ab-QuickSearch"))
    }
    public deleteCalculatedColumn(calculatedColumnID: string) {
    }
    public createCalculatedColumn(calculatedColumn: ICalculatedColumn) {

    }
    public getFirstRecord(): any {
        return null;
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
        ReactDOM.unmountComponentAtNode(this.contextMenuContainer);
    }

    private GetGridState(): GridState {
        return this.AdaptableBlotterStore.TheStore.getState().Grid;
    }

    private initInternalGridLogic(grid: kendo.ui.Grid) {
        //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        //grid.table.bind("keydown",
        grid.table.keydown((event) => {
            this._onKeyDown.Dispatch(this, event);
        });
        grid.bind("dataBound", (e: kendo.ui.GridDataBoundEvent) => {
            this._onGridDataBound.Dispatch(this, this);
        });
        grid.bind("save", (e: kendo.ui.GridSaveEvent) => {
            let dataChangedEvent: IDataChangingEvent;
            for (let col of this.grid.columns) {
                if (e.values.hasOwnProperty(col.field)) {
                    dataChangedEvent = { ColumnId: col.field, NewValue: e.values[col.field], IdentifierValue: this.getPrimaryKeyValueFromRecord(e.model) };
                    break;
                }
            }
            let failedRules: ICellValidationRule[] = this.AuditService.CheckCellChanging(dataChangedEvent);
            if (failedRules.length > 0) {
                // first see if its an error = should only be one item in array if so
                if (failedRules[0].CellValidationMode == CellValidationMode.Prevent) {
                    let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                    let error: IUIError = {
                        ErrorMsg: errorMessage
                    };
                    this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));
                    e.preventDefault();
                }
                else {
                    let warningMessage: string = "";
                    failedRules.forEach(f => {
                        warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this) + "\n";
                    });
                    let cellInfo: ICellInfo = {
                        Id: dataChangedEvent.IdentifierValue,
                        ColumnId: dataChangedEvent.ColumnId,
                        Value: dataChangedEvent.NewValue
                    };
                    let confirmation: IUIConfirmation = {
                        CancelText: "Cancel Edit",
                        ConfirmationTitle: "Cell Validation Failed",
                        ConfirmationMsg: warningMessage,
                        ConfirmationText: "Bypass Rule",
                        CancelAction: null,
                        ConfirmAction: GridRedux.SetValueLikeEdit(cellInfo, (e.model as any)[dataChangedEvent.ColumnId])
                    };
                    this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
                    //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                    e.preventDefault();
                }
            }
            else {
                this.AuditLogService.AddEditCellAuditLog(dataChangedEvent.IdentifierValue, dataChangedEvent.ColumnId, (e.model as any)[dataChangedEvent.ColumnId], dataChangedEvent.NewValue);
            }
        });
        grid.dataSource.bind("change", (e: kendo.data.DataSourceChangeEvent) => {
            if (e.action == "itemchange") {
                let itemsArray: any = e.items[0]; // type: kendo.data.DataSourceItemOrGroup
                let changedValue = itemsArray[e.field];
                let identifierValue = this.getPrimaryKeyValueFromRecord(itemsArray);
                this.AuditService.CreateAuditEvent(identifierValue, changedValue, e.field, itemsArray);
            }
        });
        //Update: 06/1/17 Not needed anymore since we are now computing the DisplayValue
        //and do not need it to be displayed on screen before being able to evaluate it.
        //we plug the AuditService on the Save event and wait for the editor to disappear so conditional style
        //can reevaluate the record when the DisplayValue is now computed. i.e. $2.000.000 instead of 2000000
        // grid.bind("save", (e: kendo.ui.GridSaveEvent) => {
        //     setTimeout(() => {
        //         //I use "in"" instead of "of" on purpose here as I'm iterating on the properties of the object and not an array
        //         for (let valueField in e.values) {
        //             let changedValue = e.values[valueField];
        //             let identifierValue = this.getPrimaryKeyValueFromRecord(e.model);
        //             this.AuditService.CreateAuditEvent(identifierValue, changedValue, valueField, true);
        //         }
        //     }, 5)
        // })
        //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        grid.bind("columnReorder", () => {
            // we want to fire this after the DOM manipulation. 
            // Why the fuck they don't have the concept of columnReordering and columnReordered is beyond my understanding
            // http://www.telerik.com/forums/column-reorder-event-delay
            setTimeout(() => this.setColumnIntoStore(), 5);
        });
        $("th[role='columnheader']").on('contextmenu', (e: JQueryMouseEventObject) => {
            e.preventDefault();
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(e.currentTarget.getAttribute("data-field"), e.clientX, e.clientY));
        });
        // // following code is taken from Telerik website for how to ADD menu items to their column header menu
        // // not sure yet if we want to use their or our menu, probably former
        // // would be nice if can work out how to make it re-evaluate during runtime;
        // // at the moment its only correct the FIRST time it runs for a column which is generally ok but not always accurate
        // grid.bind("columnMenuInit", (e: kendo.ui.GridColumnMenuInitEvent) => {
        //     let menu: any = e.container.find(".k-menu").data("kendoMenu");
        //     var field = e.field;
        //     var popup = e.container.data('kendoPopup');
        //     let columnMenuItems: string[] = [];
        //     let column: IColumn = this.getColumnFromColumnId(field);
        //     // each strategy can add its own menu item if it wants to
        //     // this.Strategies.forEach(s => s.addColumnMenuItem(column, columnMenuItems));
        //     columnMenuItems.forEach(s => menu.append({ text: s }))
        //     // we can add the item this way which is nicer but not doing so for now
        //     //  $(e.container).find("ul").append('<li id="my-id" class="k-item k-state-default" role="menuitem"><span class="k-link"><b>Manual entry</b></span></li>');
        //     // event handler - each strategy listens and acts accordingly
        //     menu.bind("select", (e: any) => {
        //         var menuText = $(e.item).text();
        //         menu.close();
        //         popup.close();
        //     });
        // })
        grid.bind("filterMenuInit", (e: kendo.ui.GridFilterMenuInitEvent) => {
            this.createFilterForm(e);
        });
    }
}

