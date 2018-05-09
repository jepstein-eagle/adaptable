import '../../../stylesheets/adaptableblotter-style.css'

import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore'
import { IStrategy } from '../../Strategy/Interface/IStrategy';
import { IUIError, IUIConfirmation } from '../../Core/Interface/IMessage';
import { IMenuItem } from '../../Core/Interface/IMenu';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../../Core/Services/CalendarService'
import { IAuditService, IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { IValidationService } from '../../Core/Services/Interface/IValidationService'
import { AuditService } from '../../Core/Services/AuditService'
import { StyleService } from '../../Core/Services/StyleService'
import { ValidationService } from '../../Core/Services/ValidationService'
//import { ThemeService } from '../../Core/Services/ThemeService'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import { CalculatedColumnExpressionService } from '../../Core/Services/CalculatedColumnExpressionService'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy'
import { SmartEditStrategy } from '../../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../../Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from '../../Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from '../../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../../Strategy/ColumnChooserStrategy'
import { ExportStrategy } from '../../Strategy/ExportStrategy'
import { FlashingCellsKendoStrategy } from '../../Strategy/FlashingCellsKendoStrategy'
import { CalendarStrategy } from '../../Strategy/CalendarStrategy'
import { ConditionalStyleKendoStrategy } from '../../Strategy/ConditionalStyleKendoStrategy'
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { UserFilterStrategy } from '../../Strategy/UserFilterStrategy'
import { ColumnFilterStrategy } from '../../Strategy/ColumnFilterStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { DashboardStrategy } from '../../Strategy/DashboardStrategy'
import { FormatColumnKendoStrategy } from '../../Strategy/FormatColumnKendoStrategy'
import { ColumnInfoStrategy } from '../../Strategy/ColumnInfoStrategy'
import { TeamSharingStrategy } from '../../Strategy/TeamSharingStrategy'
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { DataType, LeafExpressionOperator, DisplayAction, DistinctCriteriaPairValue, SortOrder } from '../../Core/Enums'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { IDataChangingEvent } from '../../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { GridState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { Color } from '../../Core/color';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { AboutStrategy } from '../../Strategy/AboutStrategy';
import { BulkUpdateStrategy } from '../../Strategy/BulkUpdateStrategy';
import { IAdaptableStrategyCollection, ICellInfo, ISelectedCells } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { FilterFormReact } from '../../View/Components/FilterForm/FilterForm';
import { ContextMenuReact } from '../../View/Components/ContextMenu/ContextMenu';
import { SelectColumnStrategy } from '../../Strategy/SelectColumnStrategy';
import { BlotterApi } from './BlotterApi';
import { ICalculatedColumn, IColumnFilter, ICellValidationRule, IGridSort } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs } from '../../Core/Api/Interface/ServerSearch';
import { IErrorService } from '../../Core/Services/Interface/IErrorService';
import { ErrorService } from '../../Core/Services/ErrorService';


export class AdaptableBlotter implements IAdaptableBlotter {
    public api: IBlotterApi
    public GridName: string = "Kendo Telerik"
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public ValidationService: IValidationService
    public ErrorService: IErrorService

    public StyleService: StyleService
    // public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    public CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    private blotterOptions: IAdaptableBlotterOptions
    private contextMenuContainer: HTMLDivElement

    constructor(blotterOptions: IAdaptableBlotterOptions, private abContainer: HTMLElement, private vendorGrid: kendo.ui.Grid, ) {
        //we init with defaults then overrides with options passed in the constructor
        this.blotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this, this.blotterOptions);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.StyleService = new StyleService(this);
        this.ValidationService = new ValidationService(this);
        this.ErrorService = new ErrorService(this);


        // this.ThemeService = new ThemeService(this);
        this.AuditLogService = new AuditLogService(this, this.blotterOptions);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService(this, null)

        // store the options in state - and also later anything else that we need...
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetBlotterOptionsAction>(GridRedux.GridSetBlotterOptions(this.blotterOptions));

        this.Strategies = new Map<string, IStrategy>();

        this.Strategies.set(StrategyIds.AboutStrategyId, new AboutStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.BulkUpdateStrategyId, new BulkUpdateStrategy(this))
        // this.Strategies.set(StrategyIds.CalculatedColumnStrategyId, new CalculatedColumnStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        this.Strategies.set(StrategyIds.ColumnFilterStrategyId, new ColumnFilterStrategy(this))
        this.Strategies.set(StrategyIds.ColumnInfoStrategyId, new ColumnInfoStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleKendoStrategy(this))
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy(this))
        this.Strategies.set(StrategyIds.ExportStrategyId, new ExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsKendoStrategy(this))
        this.Strategies.set(StrategyIds.FormatColumnStrategyId, new FormatColumnKendoStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.TeamSharingStrategyId, new TeamSharingStrategy(this))
        this.Strategies.set(StrategyIds.SelectColumnStrategyId, new SelectColumnStrategy(this))
        // removing theme from kendo until we can get the table issue working properly
        // this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.UserFilterStrategyId, new UserFilterStrategy(this))


        this.contextMenuContainer = this.abContainer.ownerDocument.createElement("div")
        this.contextMenuContainer.id = "contextMenuContainer"
        this.contextMenuContainer.style.position = 'absolute'
        this.abContainer.ownerDocument.body.appendChild(this.contextMenuContainer)
        ReactDOM.render(ContextMenuReact(this), this.contextMenuContainer);

        iPushPullHelper.isIPushPullLoaded(this.blotterOptions.iPushPullConfig)

        ReactDOM.render(AdaptableBlotterApp(this), this.abContainer);

        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()),
                (e) => {
                    console.error('Failed to Init AdaptableBlotterStore : ', e);
                    //for now i'm still initializing the strategies even if loading state has failed.... 
                    //we may revisit that later
                    this.Strategies.forEach(strat => strat.InitializeWithRedux())
                })
            .then(
                () => this.initInternalGridLogic(vendorGrid),
                (e) => {
                    console.error('Failed to Init Strategies : ', e);
                    //for now i'm still initializing the grid even if loading state has failed.... 
                    //we may revisit that later
                    this.initInternalGridLogic(vendorGrid)
                })

        // get the api ready
        this.api = new BlotterApi(this);
    }

    public InitAuditService() {
        //Probably Temporary but we init the Audit service with current data
        this.AuditService.Init(this.vendorGrid.dataSource.data())
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
        let columns: IColumn[] = this.vendorGrid.columns.map((x: kendo.ui.GridColumn, index: number) => {
            let isVisible: boolean = this.isGridColumnVisible(x);
            return {
                ColumnId: x.field ? x.field : "Unknown Column",
                FriendlyName: x.title ? x.title : (x.field ? x.field : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: isVisible,
                Index: isVisible ? index : -1
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetColumnsAction>(GridRedux.GridSetColumns(columns));
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        VisibleColumnList.forEach((column, index) => {
            let col = this.vendorGrid.columns.find(x => x.field == column.ColumnId)
            //if not then not need to set it because it was already visible.........
            if (col.hasOwnProperty('hidden')) {
                this.vendorGrid.showColumn(col)
            }
            this.vendorGrid.reorderColumn(index, col);
        })
        this.vendorGrid.columns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.field) < 0).forEach((col => {
            this.vendorGrid.hideColumn(col)
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

    private _onSelectedCellsChanged: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onSelectedCellsChanged;
    }

    private _onRefresh: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onRefresh;
    }

    public SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs> = new EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>();

    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => {
            let menuItem = x.getPopupMenuItem()
            if (menuItem != null) {
                menuItems.push(menuItem);
            }
        })
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
        let item = this.vendorGrid.dataItem(row);
        let uuid = this.getPrimaryKeyValueFromRecord(item);
        let idx = activeCell.index();
        let col = <string>(this.vendorGrid.columns[idx].field);
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

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    public getSelectedCells(): ISelectedCells {

        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected = this.vendorGrid.select().not("tr");
        selected.each((i, element) => {
            var row = $(element).closest("tr");
            var item = this.vendorGrid.dataItem(row);
            var uuid = this.getPrimaryKeyValueFromRecord(item);
            var idx = $(element).index();
            var col = <string>(this.vendorGrid.columns[idx].field);
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
        if (!this.vendorGrid.dataSource.options.schema.hasOwnProperty('model') ||
            !this.vendorGrid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            let type = this.getTypeFromFirstRecord(column.field);
            console.log('There is no Schema model for the grid. Defaulting to type of the first record for column ' + column.field, type)
            return type
        }

        let type = this.vendorGrid.dataSource.options.schema.model.fields[column.field].type;

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
        let row = this.vendorGrid.dataSource.data()[0]
        let value = row[columnId]
        if (value instanceof Date) {
            return DataType.Date
        }
        else {
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
    }

    public setValue(cellInfo: ICellInfo): void {
        let model = this.vendorGrid.dataSource.getByUid(cellInfo.Id)
        let oldValue = model.get(cellInfo.ColumnId)
        model.set(cellInfo.ColumnId, cellInfo.Value);

        let dataChangedEvent: IDataChangedEvent =
            {
                OldValue: oldValue,
                NewValue: cellInfo.Value,
                ColumnId: cellInfo.ColumnId,
                IdentifierValue: cellInfo.Id,
                Timestamp: null,
                Record: null
            }
        this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        // first update the model, then sync the grid, then tell the AuditService (which will fire an event picked up by Flashing Cells)
        var dataChangedEvents: IDataChangedEvent[] = []
        for (let item of batchValues) {
            let model: any = this.vendorGrid.dataSource.getByUid(item.Id);
            let oldValue = model[item.ColumnId]
            model[item.ColumnId] = item.Value;

            let dataChangedEvent: IDataChangedEvent =
                {
                    OldValue: oldValue,
                    NewValue: item.Value,
                    ColumnId: item.ColumnId,
                    IdentifierValue: item.Id,
                    Timestamp: null,
                    Record: null
                }
            dataChangedEvents.push(dataChangedEvent);

        }

        // this line triggers a Databound changed event 
        this.vendorGrid.dataSource.sync();
        this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        // for (let item of batchValues) {
        //     // todo: work out why we have this line?  seems superfluous....
        //     let model: any = this.vendorGrid.dataSource.getByUid(item.Id);
        //     this.AuditService.CreateAuditEvent(item.Id, item.Value, item.ColumnId, model);
        // }
    }

    public cancelEdit() {
        this.vendorGrid.closeCell()
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any {
        if (type == "getColumnValue") {
            let record: any = this.vendorGrid.dataSource.getByUid(id);
            return (columnId: string) => { return record[columnId]; }
        }
        else {
            return (columnId: string) => { return this.getDisplayValue(id, columnId); }
        }
    }

    public getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any {
        if (type == "getColumnValue") {
            return (columnId: string) => { return record[columnId]; }
        }
        else {
            return (columnId: string) => { return this.getDisplayValueFromRecord(record, columnId); }
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
        this.vendorGrid.select(selectorQuery);
    }

    public getColumnIndex(columnId: string): number {
        return this.vendorGrid.columns.findIndex(x => x.field == columnId);
    }

    private getColumnFromColumnId(columnId: string): IColumn {
        return this.GetGridState().Columns.find(c => c.ColumnId == columnId);
    }

    public isColumnReadonly(columnId: string): boolean {
        if (!this.vendorGrid.dataSource.options.schema.hasOwnProperty('model') || !this.vendorGrid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            //field cannot be readonly in that scenario
            return false;
        }
        let column = this.vendorGrid.dataSource.options.schema.model.fields[columnId];
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
        let column = this.vendorGrid.columns.find(x => x.field == columnId);

        if (column) {
            column.sortable = { compare: comparer }
        }
        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }

    public removeCustomSort(columnId: string): void {
        let column = this.vendorGrid.columns.find(x => x.field == columnId);

        if (column) {
            column.sortable = {}
        }

        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }

    private ReInitGrid() {
        this.vendorGrid.setDataSource(this.vendorGrid.dataSource);
        this._onRefresh.Dispatch(this, this)
    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();
        this.vendorGrid.dataSource.data().forEach((row: any) => {
            let displayValue = this.getDisplayValueFromRecord(row, columnId)
            let rawValue = row[columnId]
            if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
            else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }

        })
        return Array.from(returnMap.values()).slice(0, this.blotterOptions.maxColumnValueItemsDisplayed);
    }

    private getRowByRowIdentifier(rowIdentifierValue: any): JQuery {
        //be careful here if we ever change to real primary key for kendo as we rely on UID
        return this.vendorGrid.table.find("tr[data-uid='" + rowIdentifierValue + "']");
    }

    private getCellByColumnIndexAndRow(row: any, columnIndex: number): JQuery {
        let tdIndex = columnIndex + 1;
        //we use the context of Jquery instead of parent/children so we improve performance drastically!
        let cell = $("td:nth-child(" + tdIndex + ")", row);
        return cell;
    }

    public getDisplayValue(id: any, columnId: string): string {
        let record: kendo.data.Model = this.vendorGrid.dataSource.getByUid(id);
        return this.getDisplayValueFromRecord(record, columnId)
    }

    public getDisplayValueFromRecord(row: any, columnId: string): string {
        let column = this.vendorGrid.columns.find(x => x.field == columnId);
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
        this.vendorGrid.table.find("td").removeClass((index, classes) => {
            return classes.split(/\s+/).filter(c => {
                return regex.test(c);
            }).join(' ');
        })
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
        this.vendorGrid.table.find("tr").removeClass((index, classes) => {
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

    public forAllRecordsDo(func: (record: any) => any) {
        let dataSource = this.vendorGrid.dataSource.data();
        dataSource.forEach(row => {
            func(row)
        });
    }

    public forAllVisibleRecordsDo(func: (record: any) => any) {
        let dataSource = this.vendorGrid.dataSource.view();
        dataSource.forEach(row => {
            func(row)
        });
    }

    public applyGridFiltering(): void {
        //we remove all style linked to QuickSearch
        this.removeAllCellStylesWithRegex(new RegExp("^Ab-QuickSearch"));
        let quickSearchColors: { rowId: any, columnIndex: number }[] = []
        let myFilter: kendo.data.DataSourceFilterItem = {
            operator: (record: any) => {
                let columns = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
                //first we assess AdvancedSearch 
                let currentSearchName = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
                if (StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                    let currentSearch = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
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
                        switch (this.AdaptableBlotterStore.TheStore.getState().QuickSearch.Operator) {
                            case LeafExpressionOperator.Contains:
                                {
                                    if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                        //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                        if (quickSearchState.DisplayAction == DisplayAction.HighlightCell
                                            || quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell) {
                                            quickSearchColors.push({ rowId, columnIndex: this.getColumnIndex(column.ColumnId) })
                                        }
                                        //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                        if (quickSearchState.DisplayAction == DisplayAction.ShowRow) {
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
                                        if (quickSearchState.DisplayAction == DisplayAction.HighlightCell
                                            || quickSearchState.DisplayAction == DisplayAction.ShowRowAndHighlightCell) {
                                            quickSearchColors.push({ rowId, columnIndex: this.getColumnIndex(column.ColumnId) })
                                        }
                                        //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                        if (quickSearchState.DisplayAction == DisplayAction.ShowRow) {
                                            return true;
                                        }
                                        recordReturnValue = true
                                    }
                                }
                                break;
                        }
                    }
                    //if we color only then we just return true....
                    if (quickSearchState.DisplayAction == DisplayAction.HighlightCell) {
                        return true;
                    }
                    return recordReturnValue;
                }
                return true;
            }
        }
        this.vendorGrid.dataSource.filter(myFilter);
        quickSearchColors.forEach(x => this.addCellStyle(x.rowId, x.columnIndex, "Ab-QuickSearch"))
        this._onRefresh.Dispatch(this, this);
    }
    public removeCalculatedColumnFromGrid(calculatedColumnID: string) {
        // todo
    }
    public addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn) {
        // todo
    }
    public getFirstRecord(): any {
        return null;
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.abContainer);
        ReactDOM.unmountComponentAtNode(this.contextMenuContainer);
    }

    //TEMPORARY : JO
    public getIPPStyle(): IPPStyle {
        let headerFirstCol: HTMLElement = document.querySelectorAll(".k-header").item(0) as HTMLElement
        let header: HTMLElement = document.querySelector(".k-grid-header") as HTMLElement
        let headerColStyle = window.getComputedStyle(header, null)
        let firstRow: HTMLElement = document.querySelector("tbody[role='rowgroup']").firstElementChild as HTMLElement
        let firstRowStyle = window.getComputedStyle(firstRow, null)
        let secondRow: HTMLElement = document.querySelector(".k-alt") as HTMLElement
        let secondRowStyle = window.getComputedStyle(secondRow, null)
        return {
            Header: {
                headerColor: new Color(headerColStyle.color).toHex(),
                headerBackColor: new Color(headerColStyle.backgroundColor).toHex(),
                headerFontFamily: headerColStyle.fontFamily,
                headerFontSize: headerColStyle.fontSize,
                headerFontStyle: headerColStyle.fontStyle,
                headerFontWeight: headerColStyle.fontWeight,
                height: Number(headerColStyle.height.replace("px", "")),
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
                    let headerColumn: HTMLElement = document.querySelector(".k-header[data-field='" + col.ColumnId + "']") as HTMLElement
                    let headerColumnStyle = window.getComputedStyle(headerColumn || headerFirstCol, null)
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign }
                })
            },
            Row: {
                color: new Color(firstRowStyle.color).toHex(),
                backColor: new Color(firstRowStyle.backgroundColor).toHex(),
                altBackColor: new Color(secondRowStyle.backgroundColor).toHex(),
                fontFamily: firstRowStyle.fontFamily,
                fontSize: firstRowStyle.fontSize,
                fontStyle: firstRowStyle.fontStyle,
                fontWeight: firstRowStyle.fontWeight,
                height: Number(firstRowStyle.height.replace("px", "")),
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map((col, index) => {
                    let cellElement: HTMLElement = firstRow.children.item(index + 1) as HTMLElement
                    let headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null)
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign }
                })
            },

        }
    }


    private GetGridState(): GridState {
        return this.AdaptableBlotterStore.TheStore.getState().Grid;
    }

    private initInternalGridLogic(grid: kendo.ui.Grid) {
        //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        //grid.table.bind("keydown",
        grid.table.keydown((event) => {
            this._onKeyDown.Dispatch(this, <any>event);
        });
        grid.bind("dataBound", (e: kendo.ui.GridDataBoundEvent) => {
            this._onGridDataBound.Dispatch(this, this);
        });
        grid.bind("save", (e: kendo.ui.GridSaveEvent) => {
            let dataChangingEvent: IDataChangingEvent;
            for (let col of this.vendorGrid.columns) {
                if (e.values.hasOwnProperty(col.field)) {
                    dataChangingEvent = { ColumnId: col.field, NewValue: e.values[col.field], IdentifierValue: this.getPrimaryKeyValueFromRecord(e.model) };
                    break;
                }
            }
            let failedRules: ICellValidationRule[] = this.ValidationService.ValidateCellChanging(dataChangingEvent);
            if (failedRules.length > 0) {
                // first see if its an error = should only be one item in array if so
                if (failedRules[0].CellValidationMode == 'Stop Edit') {
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
                        Id: dataChangingEvent.IdentifierValue,
                        ColumnId: dataChangingEvent.ColumnId,
                        Value: dataChangingEvent.NewValue
                    };
                    let confirmation: IUIConfirmation = {
                        CancelText: "Cancel Edit",
                        ConfirmationTitle: "Cell Validation Failed",
                        ConfirmationMsg: warningMessage,
                        ConfirmationText: "Bypass Rule",
                        CancelAction: null,
                        ConfirmAction: GridRedux.GridSetValueLikeEdit(cellInfo, (e.model as any)[dataChangingEvent.ColumnId]),
                        ShowCommentBox: true
                    };
                    this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
                    //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                    e.preventDefault();
                }
            }
            else {

                let dataChangedEvent: IDataChangedEvent =
                    {
                        OldValue: (e.model as any)[dataChangingEvent.ColumnId],
                        NewValue: dataChangingEvent.NewValue,
                        ColumnId: dataChangingEvent.ColumnId,
                        IdentifierValue: dataChangingEvent.IdentifierValue,
                        Timestamp: null,
                        Record: null
                    }
                this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
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
        //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        grid.bind("columnReorder", () => {
            // we want to fire this after the DOM manipulation. 
            // Why Kendo don't have the concept of columnReordering and columnReordered is beyond my understanding
            // http://www.telerik.com/forums/column-reorder-event-delay
            setTimeout(() => this.setColumnIntoStore(), 5);
        });
        //I find that kendo hasnt' been too smart in their naming since it looks like very much the change on the datasource
        grid.bind("change", () => {
            this._onSelectedCellsChanged.Dispatch(this, this)
        });
        grid.bind("sort", () => {
            this.onSortChanged()
        });
        $("th[role='columnheader']").on('contextmenu', (e: JQueryMouseEventObject) => {
            e.preventDefault();
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(e.currentTarget.getAttribute("data-field"), e.clientX, e.clientY));
        });
        grid.bind("filterMenuInit", (e: kendo.ui.GridFilterMenuInitEvent) => {
            this.createFilterForm(e);
        });
    }


    public getRowInfo(): any {
        return this.vendorGrid.dataSource.data().length;
    }
    public getColumnInfo(): any {
        return this.vendorGrid.columns.length;
    }

    public selectColumn(columnId: string) {
        let selectorQuery: JQuery

        let columnIndex = this.getColumnIndex(columnId);

        let rows = this.vendorGrid.dataSource.data();

        rows.forEach((row: any) => {
            var uid = row["uid"];
            var myrow = this.getRowByRowIdentifier(uid);
            let cellSelect = this.getCellByColumnIndexAndRow(myrow, columnIndex)
            if (selectorQuery == null) {
                selectorQuery = cellSelect
            }
            else {
                selectorQuery = selectorQuery.add(cellSelect)
            }
        })

        this.vendorGrid.select(selectorQuery);
    }

    private onSortChanged(): void {
        let sortModel: any[] = this.vendorGrid.dataSource.sort()
        let gridSorts: IGridSort[];
        if (sortModel != null) {
            if (sortModel.length > 0) {
                // for now assuming just single column sorts...
                let sortObject: any = sortModel[0];

                gridSorts = [{ Column: sortObject.field, SortOrder: (sortObject.dir == "asc") ? SortOrder.Ascending : SortOrder.Descending }]
            }
        }
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetSortAction>(GridRedux.GridSetSort(gridSorts));
    }

    public setGridSort(gridSorts: IGridSort[]): void {
        // get the sort model
        let sortModel: any[] = []
        if (gridSorts.length > 0) {
            let gridSort: IGridSort = gridSorts[0]; // just one for now
            let sortDescription: string = (gridSort.SortOrder == SortOrder.Ascending) ? "asc" : "desc"
            this.vendorGrid.dataSource.sort({ field: gridSort.Column, dir: sortDescription });
        } else {
            this.vendorGrid.dataSource.sort({});
        }


    }

    public canMultiSort(): boolean {
        return true;
    }

}

