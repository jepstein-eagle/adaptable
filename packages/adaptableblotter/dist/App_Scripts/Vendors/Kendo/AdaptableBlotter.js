"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../Styles/stylesheets/adaptableblotter-style.css");
const ReactDOM = require("react-dom");
const AdaptableBlotterView_1 = require("../../View/AdaptableBlotterView");
const MenuRedux = require("../../Redux/ActionsReducers/MenuRedux");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const AdaptableBlotterStore_1 = require("../../Redux/Store/AdaptableBlotterStore");
const CalendarService_1 = require("../../Core/Services/CalendarService");
const AuditService_1 = require("../../Core/Services/AuditService");
const StyleService_1 = require("../../Core/Services/StyleService");
const ValidationService_1 = require("../../Core/Services/ValidationService");
//import { ThemeService } from '../../Core/Services/ThemeService'
const AuditLogService_1 = require("../../Core/Services/AuditLogService");
const CalculatedColumnExpressionService_1 = require("../../Core/Services/CalculatedColumnExpressionService");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const CustomSortStrategy_1 = require("../../Strategy/CustomSortStrategy");
const SmartEditStrategy_1 = require("../../Strategy/SmartEditStrategy");
const ShortcutStrategy_1 = require("../../Strategy/ShortcutStrategy");
const DataManagementStrategy_1 = require("../../Strategy/DataManagementStrategy");
const PlusMinusStrategy_1 = require("../../Strategy/PlusMinusStrategy");
const ColumnChooserStrategy_1 = require("../../Strategy/ColumnChooserStrategy");
const ExportStrategy_1 = require("../../Strategy/ExportStrategy");
const FlashingCellsKendoStrategy_1 = require("../../Strategy/FlashingCellsKendoStrategy");
const CalendarStrategy_1 = require("../../Strategy/CalendarStrategy");
const ConditionalStyleKendoStrategy_1 = require("../../Strategy/ConditionalStyleKendoStrategy");
const QuickSearchStrategy_1 = require("../../Strategy/QuickSearchStrategy");
const AdvancedSearchStrategy_1 = require("../../Strategy/AdvancedSearchStrategy");
const UserFilterStrategy_1 = require("../../Strategy/UserFilterStrategy");
const ColumnFilterStrategy_1 = require("../../Strategy/ColumnFilterStrategy");
const CellValidationStrategy_1 = require("../../Strategy/CellValidationStrategy");
const LayoutStrategy_1 = require("../../Strategy/LayoutStrategy");
const DashboardStrategy_1 = require("../../Strategy/DashboardStrategy");
const FormatColumnKendoStrategy_1 = require("../../Strategy/FormatColumnKendoStrategy");
const ColumnInfoStrategy_1 = require("../../Strategy/ColumnInfoStrategy");
const TeamSharingStrategy_1 = require("../../Strategy/TeamSharingStrategy");
const EventDispatcher_1 = require("../../Core/EventDispatcher");
const Enums_1 = require("../../Core/Enums");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const DefaultAdaptableBlotterOptions_1 = require("../../Core/DefaultAdaptableBlotterOptions");
const iPushPullHelper_1 = require("../../Core/Helpers/iPushPullHelper");
const color_1 = require("../../Core/color");
const BulkUpdateStrategy_1 = require("../../Strategy/BulkUpdateStrategy");
const FilterForm_1 = require("../../View/Components/FilterForm/FilterForm");
//import { ContextMenuReact } from '../../View/Components/ContextMenu/ContextMenu';
const SelectColumnStrategy_1 = require("../../Strategy/SelectColumnStrategy");
const BlotterApi_1 = require("./BlotterApi");
const AdaptableBlotterLogger_1 = require("../../Core/Helpers/AdaptableBlotterLogger");
const SelectedCellsStrategy_1 = require("../../Strategy/SelectedCellsStrategy");
const ChartService_1 = require("../../Core/Services/ChartService");
const HomeStrategy_1 = require("../../Strategy/HomeStrategy");
class AdaptableBlotter {
    constructor(blotterOptions, renderGrid = true) {
        this._onKeyDown = new EventDispatcher_1.EventDispatcher();
        this._onGridDataBound = new EventDispatcher_1.EventDispatcher();
        this._onSelectedCellsChanged = new EventDispatcher_1.EventDispatcher();
        this._onRefresh = new EventDispatcher_1.EventDispatcher();
        this.SearchedChanged = new EventDispatcher_1.EventDispatcher();
        this.StateChanged = new EventDispatcher_1.EventDispatcher();
        this.ColumnStateChanged = new EventDispatcher_1.EventDispatcher();
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions, blotterOptions);
        this.vendorGrid = this.BlotterOptions.vendorGrid;
        this.VendorGridName = 'Kendo';
        this.EmbedColumnMenu = false;
        this.isInitialised = true;
        this.AdaptableBlotterStore = new AdaptableBlotterStore_1.AdaptableBlotterStore(this);
        // create the services
        this.CalendarService = new CalendarService_1.CalendarService(this);
        this.AuditService = new AuditService_1.AuditService(this);
        this.StyleService = new StyleService_1.StyleService(this);
        this.ValidationService = new ValidationService_1.ValidationService(this);
        this.ChartService = new ChartService_1.ChartService(this);
        // this.ThemeService = new ThemeService(this);
        this.AuditLogService = new AuditLogService_1.AuditLogService(this, this.BlotterOptions);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService_1.CalculatedColumnExpressionService(this, null);
        // store the options in state - and also later anything else that we need...
        //   this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetBlotterOptionsAction>(GridRedux.GridSetBlotterOptions(this.BlotterOptions));
        this.Strategies = new Map();
        this.Strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy_1.AdvancedSearchStrategy(this));
        this.Strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy_1.BulkUpdateStrategy(this));
        // this.Strategies.set(StrategyConstants.CalculatedColumnStrategyId, new CalculatedColumnStrategy(this))
        this.Strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy_1.CalendarStrategy(this));
        this.Strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy_1.CellValidationStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy_1.ColumnChooserStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy_1.ColumnFilterStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy_1.ColumnInfoStrategy(this));
        this.Strategies.set(StrategyConstants.ConditionalStyleStrategyId, new ConditionalStyleKendoStrategy_1.ConditionalStyleKendoStrategy(this));
        this.Strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategy_1.CustomSortStrategy(this));
        this.Strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy_1.DashboardStrategy(this));
        this.Strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy_1.ExportStrategy(this));
        this.Strategies.set(StrategyConstants.FlashingCellsStrategyId, new FlashingCellsKendoStrategy_1.FlashingCellsKendoStrategy(this));
        this.Strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy_1.HomeStrategy(this));
        this.Strategies.set(StrategyConstants.FormatColumnStrategyId, new FormatColumnKendoStrategy_1.FormatColumnKendoStrategy(this));
        this.Strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy_1.LayoutStrategy(this));
        this.Strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy_1.PlusMinusStrategy(this));
        this.Strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy_1.QuickSearchStrategy(this));
        this.Strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy_1.SmartEditStrategy(this));
        this.Strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy_1.ShortcutStrategy(this));
        this.Strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy_1.TeamSharingStrategy(this));
        this.Strategies.set(StrategyConstants.SelectColumnStrategyId, new SelectColumnStrategy_1.SelectColumnStrategy(this));
        this.Strategies.set(StrategyConstants.SelectedCellsStrategyId, new SelectedCellsStrategy_1.SelectedCellsStrategy(this));
        // removing theme from kendo until we can get the table issue working properly
        // this.Strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyConstants.DataManagementStrategyId, new DataManagementStrategy_1.DataManagementStrategy(this));
        this.Strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy_1.UserFilterStrategy(this));
        this.abContainerElement = document.getElementById(this.BlotterOptions.adaptableBlotterContainer);
        if (this.abContainerElement == null) {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("There is no Div called " + this.BlotterOptions.adaptableBlotterContainer + " so cannot render the Adaptable Blotter");
            return;
        }
        this.abContainerElement.innerHTML = "";
        iPushPullHelper_1.iPushPullHelper.isIPushPullLoaded(this.BlotterOptions.iPushPullConfig);
        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()), (e) => {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError('Failed to Init AdaptableBlotterStore : ', e);
            //for now i'm still initializing the strategies even if loading state has failed.... 
            //we may revisit that later
            this.Strategies.forEach(strat => strat.InitializeWithRedux());
        })
            .then(() => this.initInternalGridLogic(), (e) => {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError('Failed to Init Strategies : ', e);
            //for now i'm still initializing the grid even if loading state has failed.... 
            //we may revisit that later
            this.initInternalGridLogic();
        });
        // get the api ready
        this.api = new BlotterApi_1.BlotterApi(this);
        if (renderGrid) {
            if (this.abContainerElement != null) {
                ReactDOM.render(AdaptableBlotterView_1.AdaptableBlotterApp({ AdaptableBlotter: this }), this.abContainerElement);
            }
        }
    }
    InitAuditService() {
        //Probably Temporary but we init the Audit service with current data
        this.AuditService.Init(this.vendorGrid.dataSource.data());
    }
    hideFilterForm() {
        if (this.kendoPopup) {
            this.kendoPopup.close();
        }
    }
    createFilterForm(e) {
        /*
       replacing filter screen with our own - good idea?  some ideas stolen from...
       http://www.ideatoworking.com/Blogs/ID/34/How-To-Override-Kendo-UI-Grid-Filter
       https://www.newventuresoftware.com/blog/kendo-ui-grid-custom-filtering---regex-column-filter
       */
        let filterContext = {
            Column: this.getColumnFromColumnId(e.field),
            Blotter: this,
            ShowCloseButton: true
        };
        // Remove default filter UI
        e.container.off();
        e.container.empty();
        this.kendoPopup = e.container.data("kendoPopup");
        //we repopuple the popup with a new react component with latest values for columns etc ...
        e.container.data("kendoPopup").bind("open", () => this.populateFilterForm(filterContext));
        let formId = "filterform" + e.field;
        //we unmount our react component when popup is closing
        e.container.data("kendoPopup").bind("close", () => {
            var filterContainer = document.getElementById(formId);
            ReactDOM.unmountComponentAtNode(filterContainer);
        });
        var filterContainer = document.getElementById(formId);
        e.container.html('<div id="' + formId + '"></div>');
    }
    ;
    populateFilterForm(filterContext) {
        let formId = "filterform" + filterContext.Column.ColumnId;
        var filterContainer = document.getElementById(formId);
        ReactDOM.render(FilterForm_1.FilterFormReact(filterContext), filterContainer);
    }
    ;
    setColumnIntoStore() {
        //Some columns can have no ID or Title. We set it to Unknown columns 
        //but as of today it creates issues in all functions as we cannot identify the column....
        let columns = this.vendorGrid.columns.map((x, index) => {
            let isVisible = this.isGridColumnVisible(x);
            return {
                ColumnId: x.field ? x.field : "Unknown Column",
                FriendlyName: x.title ? x.title : (x.field ? x.field : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: isVisible,
                Index: isVisible ? index : -1,
                ReadOnly: this.isColumnReadonly(x.field),
                Sortable: true,
                Filterable: true // TODO
            };
        });
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetColumns(columns));
    }
    setNewColumnListOrder(VisibleColumnList) {
        VisibleColumnList.forEach((column, index) => {
            let col = this.vendorGrid.columns.find(x => x.field == column.ColumnId);
            //if not then not need to set it because it was already visible.........
            if (col.hasOwnProperty('hidden')) {
                this.vendorGrid.showColumn(col);
            }
            this.vendorGrid.reorderColumn(index, col);
        });
        this.vendorGrid.columns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.field) < 0).forEach((col => {
            this.vendorGrid.hideColumn(col);
        }));
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.setColumnIntoStore();
    }
    onKeyDown() {
        return this._onKeyDown;
    }
    onGridDataBound() {
        return this._onGridDataBound;
    }
    onSelectedCellsChanged() {
        return this._onSelectedCellsChanged;
    }
    onRefresh() {
        return this._onRefresh;
    }
    createMenu() {
        let menuItems = [];
        this.Strategies.forEach(x => {
            let menuItem = x.getPopupMenuItem();
            if (menuItem != null) {
                menuItems.push(menuItem);
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.SetMenuItems(menuItems));
    }
    gridHasCurrentEditValue() {
        var currentEditCell = this.getcurrentEditedCell();
        return currentEditCell.length > 0;
    }
    getCurrentCellEditValue() {
        return this.getcurrentEditedCell().val();
    }
    getPrimaryKeyValueFromRecord(record) {
        return record["uid"];
    }
    getActiveCell() {
        let activeCell = $('#grid_active_cell');
        let row = activeCell.closest("tr");
        let item = this.vendorGrid.dataItem(row);
        let uuid = this.getPrimaryKeyValueFromRecord(item);
        let idx = activeCell.index();
        let col = (this.vendorGrid.columns[idx].field);
        return {
            Id: uuid, ColumnId: col, Value: item.get(col)
        };
    }
    isGridColumnVisible(gridColumn) {
        return gridColumn.hasOwnProperty('hidden') ? !gridColumn.hidden : true;
    }
    getcurrentEditedCell() {
        // hopefully there is a way to do this without using jquery, or which is less brittle
        return $(".k-edit-cell .k-input").not(".k-formatted-value");
    }
    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    setSelectedCells() {
        let selectionMap = new Map();
        var selected = this.vendorGrid.select().not("tr");
        let cols = [];
        selected.each((i, element) => {
            var row = $(element).closest("tr");
            var item = this.vendorGrid.dataItem(row);
            var uuid = this.getPrimaryKeyValueFromRecord(item);
            var idx = $(element).index();
            var col = (this.vendorGrid.columns[idx].field);
            let selectedColumn = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == col);
            let isReadonly = this.isColumnReadonly(col);
            var value = item.get(col);
            var valueArray = selectionMap.get(uuid);
            if (valueArray == undefined) {
                valueArray = [];
                selectionMap.set(uuid, valueArray);
            }
            valueArray.push({ columnId: col, value: value });
        });
        let selectedCells = { Columns: null, Selection: selectionMap };
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetSelectedCells(selectedCells));
    }
    getColumnDataType(column) {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage('column is undefined returning String for Type');
            return Enums_1.DataType.String;
        }
        if (!this.vendorGrid.dataSource.options.schema.hasOwnProperty('model') ||
            !this.vendorGrid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            let type = this.getTypeFromFirstRecord(column.field);
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage('There is no Schema model for the grid. Defaulting to type of the first record for column ' + column.field, type);
            return type;
        }
        let type = this.vendorGrid.dataSource.options.schema.model.fields[column.field].type;
        switch (type) {
            case 'string':
                return Enums_1.DataType.String;
            case 'number':
                return Enums_1.DataType.Number;
            case 'boolean':
                return Enums_1.DataType.Boolean;
            case 'date':
                return Enums_1.DataType.Date;
            case 'object':
                return Enums_1.DataType.Object;
            default:
                return this.getTypeFromFirstRecord(column.field);
        }
    }
    getTypeFromFirstRecord(columnId) {
        let row = this.vendorGrid.dataSource.data()[0];
        let value = row[columnId];
        if (value instanceof Date) {
            return Enums_1.DataType.Date;
        }
        else {
            switch (typeof value) {
                case 'string':
                    return Enums_1.DataType.String;
                case 'number':
                    return Enums_1.DataType.Number;
                case 'boolean':
                    return Enums_1.DataType.Boolean;
                case 'object':
                    return Enums_1.DataType.Object;
                default:
                    return Enums_1.DataType.String;
            }
        }
    }
    setValue(cellInfo) {
        let model = this.vendorGrid.dataSource.getByUid(cellInfo.Id);
        let oldValue = model.get(cellInfo.ColumnId);
        model.set(cellInfo.ColumnId, cellInfo.Value);
        let dataChangedEvent = {
            OldValue: oldValue,
            NewValue: cellInfo.Value,
            ColumnId: cellInfo.ColumnId,
            IdentifierValue: cellInfo.Id,
            Timestamp: null,
            Record: null
        };
        this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
    }
    setValueBatch(batchValues) {
        // first update the model, then sync the grid, then tell the AuditService (which will fire an event picked up by Flashing Cells)
        var dataChangedEvents = [];
        for (let item of batchValues) {
            let model = this.vendorGrid.dataSource.getByUid(item.Id);
            let oldValue = model[item.ColumnId];
            model[item.ColumnId] = item.Value;
            let dataChangedEvent = {
                OldValue: oldValue,
                NewValue: item.Value,
                ColumnId: item.ColumnId,
                IdentifierValue: item.Id,
                Timestamp: null,
                Record: null
            };
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
    cancelEdit() {
        this.vendorGrid.closeCell();
    }
    getRecordIsSatisfiedFunction(id, type) {
        if (type == "getColumnValue") {
            let record = this.vendorGrid.dataSource.getByUid(id);
            return (columnId) => { return record[columnId]; };
        }
        else {
            return (columnId) => { return this.getDisplayValue(id, columnId); };
        }
    }
    getRecordIsSatisfiedFunctionFromRecord(record, type) {
        if (type == "getColumnValue") {
            return (columnId) => { return record[columnId]; };
        }
        else {
            return (columnId) => { return this.getDisplayValueFromRecord(record, columnId); };
        }
    }
    selectCells(cells) {
        let selectorQuery;
        for (let cell of cells) {
            let columnIndex = this.getColumnIndex(cell.ColumnId);
            var row = this.getRowByRowIdentifier(cell.Id);
            let cellSelect = this.getCellByColumnIndexAndRow(row, columnIndex);
            if (selectorQuery == null) {
                selectorQuery = cellSelect;
            }
            else {
                selectorQuery = selectorQuery.add(cellSelect);
            }
        }
        this.vendorGrid.select(selectorQuery);
    }
    getColumnIndex(columnId) {
        return this.vendorGrid.columns.findIndex(x => x.field == columnId);
    }
    getColumnFromColumnId(columnId) {
        return this.GetGridState().Columns.find(c => c.ColumnId == columnId);
    }
    isColumnReadonly(columnId) {
        if (!this.vendorGrid.dataSource.options.schema.hasOwnProperty('model') || !this.vendorGrid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            //field cannot be readonly in that scenario
            return false;
        }
        let column = this.vendorGrid.dataSource.options.schema.model.fields[columnId];
        if (column) {
            if (column.hasOwnProperty('editable')) {
                return !column.editable;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    setCustomSort(columnId, comparer) {
        let column = this.vendorGrid.columns.find(x => x.field == columnId);
        if (column) {
            column.sortable = { compare: comparer };
        }
        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }
    removeCustomSort(columnId) {
        let column = this.vendorGrid.columns.find(x => x.field == columnId);
        if (column) {
            column.sortable = {};
        }
        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }
    ReInitGrid() {
        this.vendorGrid.setDataSource(this.vendorGrid.dataSource);
        this._onRefresh.Dispatch(this, this);
    }
    getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) {
        let returnMap = new Map();
        this.vendorGrid.dataSource.data().forEach((row) => {
            let displayValue = this.getDisplayValueFromRecord(row, columnId);
            let rawValue = row[columnId];
            if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
            else if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
        });
        return Array.from(returnMap.values()).slice(0, this.BlotterOptions.maxColumnValueItemsDisplayed);
    }
    getRowByRowIdentifier(rowIdentifierValue) {
        //be careful here if we ever change to real primary key for kendo as we rely on UID
        return this.vendorGrid.table.find("tr[data-uid='" + rowIdentifierValue + "']");
    }
    getCellByColumnIndexAndRow(row, columnIndex) {
        let tdIndex = columnIndex + 1;
        //we use the context of Jquery instead of parent/children so we improve performance drastically!
        let cell = $("td:nth-child(" + tdIndex + ")", row);
        return cell;
    }
    getDisplayValue(id, columnId) {
        let record = this.vendorGrid.dataSource.getByUid(id);
        return this.getDisplayValueFromRecord(record, columnId);
    }
    getDisplayValueFromRecord(row, columnId) {
        let column = this.vendorGrid.columns.find(x => x.field == columnId);
        let rawValue = row[columnId];
        if (column.format) {
            return kendo.format(column.format, rawValue);
        }
        else {
            return String(rawValue);
        }
    }
    getDisplayValueFromRawValue(colId, rawValue) {
        return null;
    }
    getRawValueFromRecord(row, columnId) {
        return row[columnId];
    }
    //Jo: we know that this function is wrong as it's not cumulative
    addCellStyle(rowIdentifierValue, columnIndex, style, timeout) {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        var cell = this.getCellByColumnIndexAndRow(row, columnIndex);
        this.applyStyleToJQuerySelector(cell, style);
        if (timeout) {
            setTimeout(() => this.removeCellStyle(rowIdentifierValue, columnIndex, style), timeout);
        }
    }
    addRowStyle(rowIdentifierValue, style, timeout) {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        this.applyStyleToJQuerySelector(row, style);
        if (timeout) {
            setTimeout(() => this.removeRowStyle(rowIdentifierValue, style), timeout);
        }
    }
    applyStyleToJQuerySelector(selector, cellStyle) {
        if (selector != null && !selector.hasClass(cellStyle)) {
            selector.addClass(cellStyle);
        }
    }
    removeAllCellStylesWithRegex(regex) {
        this.vendorGrid.table.find("td").removeClass((index, classes) => {
            return classes.split(/\s+/).filter(c => {
                return regex.test(c);
            }).join(' ');
        });
    }
    removeAllRowStylesWithRegex(regex) {
        this.vendorGrid.table.find("tr").removeClass((index, classes) => {
            return classes.split(/\s+/).filter(c => {
                return regex.test(c);
            }).join(' ');
        });
    }
    removeCellStyle(rowIdentifierValue, columnIndex, style) {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        var cell = this.getCellByColumnIndexAndRow(row, columnIndex);
        if (cell != null && cell.hasClass(style)) {
            cell.removeClass(style);
        }
    }
    removeRowStyle(rowIdentifierValue, style) {
        var row = this.getRowByRowIdentifier(rowIdentifierValue);
        if (row != null && row.hasClass(style)) {
            row.removeClass(style);
        }
    }
    forAllRecordsDo(func) {
        let dataSource = this.vendorGrid.dataSource.data();
        dataSource.forEach(row => {
            func(row);
        });
    }
    forAllVisibleRecordsDo(func) {
        let dataSource = this.vendorGrid.dataSource.view();
        dataSource.forEach(row => {
            func(row);
        });
    }
    applyGridFiltering() {
        //we remove all style linked to QuickSearch
        this.removeAllCellStylesWithRegex(new RegExp("^Ab-QuickSearch"));
        let quickSearchColors = [];
        let myFilter = {
            operator: (record) => {
                let columns = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
                //first we assess AdvancedSearch 
                let currentSearchName = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                    let currentSearch = this.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
                    if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, record, columns, this)) {
                        return false;
                    }
                }
                //we then assess filters
                let columnFilters = this.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
                if (columnFilters.length > 0) {
                    for (let columnFilter of columnFilters) {
                        if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, record, columns, this)) {
                            return false;
                        }
                    }
                }
                //we assess quicksearch
                let recordReturnValue = false;
                let quickSearchState = this.AdaptableBlotterStore.TheStore.getState().QuickSearch;
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)) {
                    let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                    for (let column of columns.filter(c => c.Visible)) {
                        let displayValue = this.getDisplayValueFromRecord(record, column.ColumnId);
                        let rowId = this.getPrimaryKeyValueFromRecord(record);
                        let stringValueLowerCase = displayValue.toLowerCase();
                        switch (this.AdaptableBlotterStore.TheStore.getState().QuickSearch.Operator) {
                            case Enums_1.LeafExpressionOperator.Contains:
                                {
                                    if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                        //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                        if (quickSearchState.DisplayAction == Enums_1.DisplayAction.HighlightCell
                                            || quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRowAndHighlightCell) {
                                            quickSearchColors.push({ rowId, columnIndex: this.getColumnIndex(column.ColumnId) });
                                        }
                                        //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                        if (quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRow) {
                                            return true;
                                        }
                                        recordReturnValue = true;
                                    }
                                }
                                break;
                            case Enums_1.LeafExpressionOperator.StartsWith:
                                {
                                    if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                        //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                        if (quickSearchState.DisplayAction == Enums_1.DisplayAction.HighlightCell
                                            || quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRowAndHighlightCell) {
                                            quickSearchColors.push({ rowId, columnIndex: this.getColumnIndex(column.ColumnId) });
                                        }
                                        //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                        if (quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRow) {
                                            return true;
                                        }
                                        recordReturnValue = true;
                                    }
                                }
                                break;
                        }
                    }
                    //if we color only then we just return true....
                    if (quickSearchState.DisplayAction == Enums_1.DisplayAction.HighlightCell) {
                        return true;
                    }
                    return recordReturnValue;
                }
                return true;
            }
        };
        this.vendorGrid.dataSource.filter(myFilter);
        quickSearchColors.forEach(x => this.addCellStyle(x.rowId, x.columnIndex, "Ab-QuickSearch"));
        this._onRefresh.Dispatch(this, this);
    }
    clearGridFiltering() {
        // todo
    }
    clearColumnFiltering(columnIds) {
        // to do
    }
    editCalculatedColumnInGrid(calculatedColumn) {
        // nothing to do
    }
    removeCalculatedColumnFromGrid(calculatedColumnID) {
        // todo
    }
    addCalculatedColumnToGrid(calculatedColumn) {
        // todo
    }
    isGroupRecord(record) {
        return false;
    }
    getFirstRecord() {
        return null;
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this.abContainerElement);
        ReactDOM.unmountComponentAtNode(this.contextMenuContainer);
    }
    //TEMPORARY : JO
    getIPPStyle() {
        let headerFirstCol = document.querySelectorAll(".k-header").item(0);
        let header = document.querySelector(".k-grid-header");
        let headerColStyle = window.getComputedStyle(header, null);
        let firstRow = document.querySelector("tbody[role='rowgroup']").firstElementChild;
        let firstRowStyle = window.getComputedStyle(firstRow, null);
        let secondRow = document.querySelector(".k-alt");
        let secondRowStyle = window.getComputedStyle(secondRow, null);
        return {
            Header: {
                headerColor: new color_1.Color(headerColStyle.color).toHex(),
                headerBackColor: new color_1.Color(headerColStyle.backgroundColor).toHex(),
                headerFontFamily: headerColStyle.fontFamily,
                headerFontSize: headerColStyle.fontSize,
                headerFontStyle: headerColStyle.fontStyle,
                headerFontWeight: headerColStyle.fontWeight,
                height: Number(headerColStyle.height.replace("px", "")),
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
                    let headerColumn = document.querySelector(".k-header[data-field='" + col.ColumnId + "']");
                    let headerColumnStyle = window.getComputedStyle(headerColumn || headerFirstCol, null);
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign };
                })
            },
            Row: {
                color: new color_1.Color(firstRowStyle.color).toHex(),
                backColor: new color_1.Color(firstRowStyle.backgroundColor).toHex(),
                altBackColor: new color_1.Color(secondRowStyle.backgroundColor).toHex(),
                fontFamily: firstRowStyle.fontFamily,
                fontSize: firstRowStyle.fontSize,
                fontStyle: firstRowStyle.fontStyle,
                fontWeight: firstRowStyle.fontWeight,
                height: Number(firstRowStyle.height.replace("px", "")),
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map((col, index) => {
                    let cellElement = firstRow.children.item(index + 1);
                    let headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null);
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign };
                })
            },
        };
    }
    GetGridState() {
        return this.AdaptableBlotterStore.TheStore.getState().Grid;
    }
    initInternalGridLogic() {
        //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        //grid.table.bind("keydown",
        this.vendorGrid.table.keydown((event) => {
            this._onKeyDown.Dispatch(this, event);
        });
        this.vendorGrid.bind("dataBound", (e) => {
            this._onGridDataBound.Dispatch(this, this);
        });
        this.vendorGrid.bind("save", (e) => {
            let dataChangingEvent;
            for (let col of this.vendorGrid.columns) {
                if (e.values.hasOwnProperty(col.field)) {
                    dataChangingEvent = { ColumnId: col.field, NewValue: e.values[col.field], IdentifierValue: this.getPrimaryKeyValueFromRecord(e.model) };
                    break;
                }
            }
            let failedRules = this.ValidationService.ValidateCellChanging(dataChangingEvent);
            if (failedRules.length > 0) {
                // first see if its an error = should only be one item in array if so
                if (failedRules[0].ActionMode == 'Stop Edit') {
                    let errorMessage = ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                    this.api.alertShowError("Validation Error", errorMessage, true);
                    e.preventDefault();
                }
                else {
                    let warningMessage = "";
                    failedRules.forEach(f => {
                        warningMessage = warningMessage + ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(f, this) + "\n";
                    });
                    let cellInfo = {
                        Id: dataChangingEvent.IdentifierValue,
                        ColumnId: dataChangingEvent.ColumnId,
                        Value: dataChangingEvent.NewValue
                    };
                    let confirmation = {
                        CancelText: "Cancel Edit",
                        ConfirmationTitle: "Cell Validation Failed",
                        ConfirmationMsg: warningMessage,
                        ConfirmationText: "Bypass Rule",
                        CancelAction: null,
                        ConfirmAction: GridRedux.GridSetValueLikeEdit(cellInfo, e.model[dataChangingEvent.ColumnId]),
                        ShowCommentBox: true
                    };
                    this.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
                    //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                    e.preventDefault();
                }
            }
            else {
                let dataChangedEvent = {
                    OldValue: e.model[dataChangingEvent.ColumnId],
                    NewValue: dataChangingEvent.NewValue,
                    ColumnId: dataChangingEvent.ColumnId,
                    IdentifierValue: dataChangingEvent.IdentifierValue,
                    Timestamp: null,
                    Record: null
                };
                this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
            }
        });
        this.vendorGrid.dataSource.bind("change", (e) => {
            if (e.action == "itemchange") {
                let itemsArray = e.items[0]; // type: kendo.data.DataSourceItemOrGroup
                let changedValue = itemsArray[e.field];
                let identifierValue = this.getPrimaryKeyValueFromRecord(itemsArray);
                this.AuditService.CreateAuditEvent(identifierValue, changedValue, e.field, itemsArray);
            }
        });
        //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        this.vendorGrid.bind("columnReorder", () => {
            // we want to fire this after the DOM manipulation. 
            // Why Kendo don't have the concept of columnReordering and columnReordered is beyond my understanding
            // http://www.telerik.com/forums/column-reorder-event-delay
            setTimeout(() => this.setColumnIntoStore(), 5);
        });
        //I find that kendo hasnt' been too smart in their naming since it looks like very much the change on the datasource
        this.vendorGrid.bind("change", () => {
            this._onSelectedCellsChanged.Dispatch(this, this);
        });
        this.vendorGrid.bind("sort", () => {
            this.onSortChanged();
        });
        $("th[role='columnheader']").on('contextmenu', (e) => {
            e.preventDefault();
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(e.currentTarget.getAttribute("data-field")));
        });
        this.vendorGrid.bind("filterMenuInit", (e) => {
            this.createFilterForm(e);
        });
    }
    getRowCount() {
        return this.vendorGrid.dataSource.data().length;
    }
    getColumnCount() {
        return this.vendorGrid.columns.length;
    }
    getVisibleRowCount() {
        return 1;
    }
    getVisibleColumnCount() {
        return 1;
    }
    selectColumn(columnId) {
        let selectorQuery;
        let columnIndex = this.getColumnIndex(columnId);
        let rows = this.vendorGrid.dataSource.data();
        rows.forEach((row) => {
            var uid = row["uid"];
            var myrow = this.getRowByRowIdentifier(uid);
            let cellSelect = this.getCellByColumnIndexAndRow(myrow, columnIndex);
            if (selectorQuery == null) {
                selectorQuery = cellSelect;
            }
            else {
                selectorQuery = selectorQuery.add(cellSelect);
            }
        });
        this.vendorGrid.select(selectorQuery);
    }
    onSortChanged() {
        let sortModel = this.vendorGrid.dataSource.sort();
        let gridSorts;
        if (sortModel != null) {
            if (sortModel.length > 0) {
                // for now assuming just single column sorts...
                let sortObject = sortModel[0];
                gridSorts = [{ Column: sortObject.field, SortOrder: (sortObject.dir == "asc") ? Enums_1.SortOrder.Ascending : Enums_1.SortOrder.Descending }];
            }
        }
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetSort(gridSorts));
    }
    setGridSort(gridSorts) {
        // get the sort model
        let sortModel = [];
        if (gridSorts.length > 0) {
            let gridSort = gridSorts[0]; // just one for now
            let sortDescription = (gridSort.SortOrder == Enums_1.SortOrder.Ascending) ? "asc" : "desc";
            this.vendorGrid.dataSource.sort({ field: gridSort.Column, dir: sortDescription });
        }
        else {
            this.vendorGrid.dataSource.sort({});
        }
    }
    getVendorGridState(visibleCols, forceFetch) {
        return null;
    }
    setVendorGridState(vendorGridState) {
        // todo
    }
    isSelectable() {
        return true;
    }
    isSortable() {
        return true;
    }
    isFilterable() {
        return true;
    }
    applyLightTheme() {
        // todo 
    }
    applyDarkTheme() {
        // todo 
    }
}
exports.AdaptableBlotter = AdaptableBlotter;
