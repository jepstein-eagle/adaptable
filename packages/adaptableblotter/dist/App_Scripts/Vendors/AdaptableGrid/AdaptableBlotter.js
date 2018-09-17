"use strict";
/// <reference path="AdaptableBlotter.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("../../Styles/stylesheets/adaptableblotter-style.css");
const ReactDOM = require("react-dom");
const AdaptableBlotterView_1 = require("../../View/AdaptableBlotterView");
const MenuRedux = require("../../Redux/ActionsReducers/MenuRedux");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const AdaptableBlotterStore_1 = require("../../Redux/Store/AdaptableBlotterStore");
const CalendarService_1 = require("../../Core/Services/CalendarService");
const AuditService_1 = require("../../Core/Services/AuditService");
const ValidationService_1 = require("../../Core/Services/ValidationService");
//import { // } from '../../Core/Services/ThemeService'
const StyleService_1 = require("../../Core/Services/StyleService");
const CalculatedColumnExpressionService_1 = require("../../Core/Services/CalculatedColumnExpressionService");
const AuditLogService_1 = require("../../Core/Services/AuditLogService");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const CustomSortStrategy_1 = require("../../Strategy/CustomSortStrategy");
const SmartEditStrategy_1 = require("../../Strategy/SmartEditStrategy");
const ShortcutStrategy_1 = require("../../Strategy/ShortcutStrategy");
const DataManagementStrategy_1 = require("../../Strategy/DataManagementStrategy");
const PlusMinusStrategy_1 = require("../../Strategy/PlusMinusStrategy");
const ColumnChooserStrategy_1 = require("../../Strategy/ColumnChooserStrategy");
const ExportStrategy_1 = require("../../Strategy/ExportStrategy");
const CalendarStrategy_1 = require("../../Strategy/CalendarStrategy");
const QuickSearchStrategy_1 = require("../../Strategy/QuickSearchStrategy");
const AdvancedSearchStrategy_1 = require("../../Strategy/AdvancedSearchStrategy");
const UserFilterStrategy_1 = require("../../Strategy/UserFilterStrategy");
const ColumnFilterStrategy_1 = require("../../Strategy/ColumnFilterStrategy");
const CellValidationStrategy_1 = require("../../Strategy/CellValidationStrategy");
const LayoutStrategy_1 = require("../../Strategy/LayoutStrategy");
const ThemeStrategy_1 = require("../../Strategy/ThemeStrategy");
const DashboardStrategy_1 = require("../../Strategy/DashboardStrategy");
const EventDispatcher_1 = require("../../Core/EventDispatcher");
const Enums_1 = require("../../Core/Enums");
const DefaultAdaptableBlotterOptions_1 = require("../../Core/DefaultAdaptableBlotterOptions");
const AboutStrategy_1 = require("../../Strategy/AboutStrategy");
const BulkUpdateStrategy_1 = require("../../Strategy/BulkUpdateStrategy");
const BlotterApi_1 = require("./BlotterApi");
const AdaptableBlotterLogger_1 = require("../../Core/Helpers/AdaptableBlotterLogger");
const ChartService_1 = require("../../Core/Services/ChartService");
class AdaptableBlotter {
    constructor(grid, container, options) {
        this.grid = grid;
        this.container = container;
        this._onKeyDown = new EventDispatcher_1.EventDispatcher();
        this._onGridDataBound = new EventDispatcher_1.EventDispatcher();
        this._onSelectedCellsChanged = new EventDispatcher_1.EventDispatcher();
        this.SearchedChanged = new EventDispatcher_1.EventDispatcher();
        this.ColumnStateChanged = new EventDispatcher_1.EventDispatcher();
        this._onRefresh = new EventDispatcher_1.EventDispatcher();
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions, options);
        this.VendorGridName = 'AdaptableGrid';
        this.EmbedColumnMenu = false;
        this.AdaptableBlotterStore = new AdaptableBlotterStore_1.AdaptableBlotterStore(this);
        // create the services
        this.CalendarService = new CalendarService_1.CalendarService(this);
        this.AuditService = new AuditService_1.AuditService(this);
        this.ValidationService = new ValidationService_1.ValidationService(this);
        this.StyleService = new StyleService_1.StyleService(this);
        this.ChartService = new ChartService_1.ChartService(this);
        //   this.ThemeService = new ThemeService(this)
        this.AuditLogService = new AuditLogService_1.AuditLogService(this, this.BlotterOptions);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService_1.CalculatedColumnExpressionService(this, null);
        // store the options in state - and also later anything else that we need...
        //   this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.GridSetBlotterOptionsAction>(GridRedux.GridSetBlotterOptions(this.BlotterOptions));
        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map();
        this.Strategies.set(StrategyIds.AboutStrategyId, new AboutStrategy_1.AboutStrategy(this));
        this.Strategies.set(StrategyIds.BulkUpdateStrategyId, new BulkUpdateStrategy_1.BulkUpdateStrategy(this));
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy_1.CustomSortStrategy(this));
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy_1.SmartEditStrategy(this));
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy_1.ShortcutStrategy(this));
        this.Strategies.set(StrategyIds.DataManagementStrategyId, new DataManagementStrategy_1.DataManagementStrategy(this));
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy_1.PlusMinusStrategy(this));
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy_1.ColumnChooserStrategy(this));
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy_1.DashboardStrategy(this));
        this.Strategies.set(StrategyIds.ExportStrategyId, new ExportStrategy_1.ExportStrategy(this));
        // this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy_1.CalendarStrategy(this));
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy_1.AdvancedSearchStrategy(this));
        // this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy_1.QuickSearchStrategy(this));
        this.Strategies.set(StrategyIds.UserFilterStrategyId, new UserFilterStrategy_1.UserFilterStrategy(this));
        this.Strategies.set(StrategyIds.ColumnFilterStrategyId, new ColumnFilterStrategy_1.ColumnFilterStrategy(this));
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy_1.ThemeStrategy(this));
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy_1.CellValidationStrategy(this));
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy_1.LayoutStrategy(this));
        this.filterContainer = this.container.ownerDocument.createElement("div");
        this.filterContainer.id = "filterContainer";
        this.filterContainer.style.position = 'absolute';
        this.filterContainer.style.visibility = "hidden";
        this.container.ownerDocument.body.appendChild(this.filterContainer);
        ReactDOM.render(AdaptableBlotterView_1.AdaptableBlotterApp({ AdaptableBlotter: this }), this.container);
        $(grid).keydown((event) => {
            this._onKeyDown.Dispatch(this, event);
        });
        // get the api ready
        this.api = new BlotterApi_1.BlotterApi(this);
    }
    Render() {
        // todo
    }
    InitAuditService() {
        // todo?
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
    setColumnIntoStore() {
        let activeColumns = this.grid.getVisibleColumns().map((x, index) => {
            let columnId = x.getId();
            return {
                ColumnId: columnId ? columnId : "Unknown Column",
                FriendlyName: x.getFriendlyName() ? x.getFriendlyName() : (columnId ? columnId : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: true,
                Index: index,
                ReadOnly: true,
                Sortable: true,
                Filterable: true // TODO
            };
        });
        let hiddenColumns = this.grid.getHiddenColumns().map((x) => {
            let columnId = x.getId();
            return {
                ColumnId: columnId ? columnId : "Unknown Column",
                FriendlyName: x.getFriendlyName() ? x.getFriendlyName() : (columnId ? columnId : "Unknown Column"),
                DataType: this.getColumnDataType(x.name),
                Visible: false,
                Index: -1,
                ReadOnly: true,
                Sortable: true,
                Filterable: true // TODO
            };
        });
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetColumns(activeColumns.concat(hiddenColumns)));
    }
    hideFilterForm() {
        throw Error("not implemented yet");
    }
    setNewColumnListOrder(VisibleColumnList) {
        let gridVisibleColumns = this.grid.getVisibleColumns();
        let gridHiddenColumns = this.grid.getHiddenColumns();
        VisibleColumnList.forEach((column, index) => {
            let col = gridVisibleColumns.find(x => x.getId() == column.ColumnId);
            if (!col) {
                // it was missing so need to make it visible...
                col = gridHiddenColumns.find(x => x.getId() == column.ColumnId);
                if (col) // what if its not in this collection either????
                 {
                    col.setVisible();
                }
            }
            //          this.grid.newColumnOrder(index, col);
        });
        gridVisibleColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getId()) < 0).forEach((col => {
            col.setHidden();
        }));
        let visibleIds = VisibleColumnList.map(v => v.ColumnId);
        // hoping this is enough?
        this.grid.newColumnOrder(visibleIds);
        this.grid.render();
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.setColumnIntoStore();
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
    getPrimaryKeyValueFromRecord(record) {
        return null;
    }
    gridHasCurrentEditValue() {
        return this.grid.getCurrentEditor() != null;
    }
    getCurrentCellEditValue() {
        let editor = this.grid.getCurrentEditor();
        if (editor) {
            let editval = editor.editVal;
            return editval;
        }
        return "";
    }
    getActiveCell() {
        let activeCell = this.grid.getActiveCell();
        let cellInfo = { Id: activeCell.getRowId(), ColumnId: activeCell.getColId(), Value: activeCell.getRawValue() };
        return cellInfo;
    }
    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    setSelectedCells() {
        let selectionMap = new Map();
        let cells = this.grid.getSelectedCells();
        cells.forEach((c) => {
            var valueArray = selectionMap.get(c.getRowId());
            if (valueArray == undefined) {
                valueArray = [];
                selectionMap.set(c.getRowId(), valueArray);
            }
        });
    }
    getColumnDataType(column) {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage('columnId is undefined returning String for Type');
            return Enums_1.DataType.String;
        }
        let dataType = column.getType();
        // not sure why but cannot switch if we do AdaptableBlotterGrid.DataType.String
        switch (dataType) {
            case 0:
                return Enums_1.DataType.String;
            case 1:
                return Enums_1.DataType.Number;
            case 2:
                return Enums_1.DataType.Boolean;
            case 3:
                return Enums_1.DataType.Date;
            case 4:
                return Enums_1.DataType.Object;
            default:
                break;
        }
        // all else fails, return a string
        return Enums_1.DataType.String;
    }
    setValue(cellInfo) {
        let row = this.grid.getRowFromId(cellInfo.Id);
        let cell = this.getCellFromRowAndColumnId(row, cellInfo.ColumnId);
        cell.setValue(cellInfo.Value);
    }
    setValueBatch(batchValues) {
        batchValues.forEach(b => {
            this.setValue(b);
        });
        // not sure if this is best place..
        this.rendergrid();
    }
    cancelEdit() {
        this.grid.exitCurrentEditor();
    }
    getRecordIsSatisfiedFunction(id, type) {
        // this is very very wrong!
        if (type == "getColumnValue") {
            return (columnId) => { return this.getRawValueFromRecord(id, columnId); };
        }
        else {
            return (columnId) => { return this.getDisplayValue(id, columnId); };
        }
    }
    getRecordIsSatisfiedFunctionFromRecord(record, type) {
        if (type == "getColumnValue") {
            return (columnId) => { return this.getCellFromRowAndColumnId(record, columnId).getRawValue(); };
        }
        else {
            return (columnId) => { return this.getDisplayValueFromRecord(record, columnId); };
        }
    }
    getColumnIndex(columnId) {
        let column = this.grid.getColumnFromId(columnId);
        let columnIndex = this.grid.getPositionOfColumn(column);
        return columnIndex;
    }
    setCustomSort(columnId, comparer) {
        // todo
    }
    removeCustomSort(columnId) {
        // todo
    }
    getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) {
        let returnMap = new Map();
        this.grid.getAllRows().forEach((row) => {
            let cell = this.getCellFromRowAndColumnId(row, columnId);
            let displayValue = cell.getFormattedValue(this.grid);
            let rawValue = cell.getRawValue();
            if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
            else if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
        });
        return Array.from(returnMap.values());
    }
    getDisplayValue(id, columnId) {
        let row = this.grid.getRowFromId(id);
        return this.getDisplayValueFromRecord(row, columnId);
    }
    getDisplayValueFromRecord(row, columnId) {
        let cell = this.getCellFromRowAndColumnId(row, columnId);
        return cell.getFormattedValue(this.grid);
    }
    getDisplayValueFromRawValue(colId, rawValue) {
        // todo
    }
    getRawValueFromRecord(row, columnId) {
        let gridRow = this.grid.getRowFromId(columnId);
        let cell = this.getCellFromRowAndColumnId(row, columnId);
        return cell.getRawValue();
    }
    getCellFromRowAndColumnId(row, columnId) {
        let columnIndex = this.getColumnIndex(columnId);
        return row.getCell(columnIndex);
    }
    addCellStyle(rowIdentifierValue, columnIndex, style, timeout) {
        var row = this.grid.getRowFromId(rowIdentifierValue);
        var cell = row.getCell(columnIndex);
        cell.addClass(style);
        if (timeout) {
            setTimeout(() => this.removeCellStyle(rowIdentifierValue, columnIndex, style), timeout);
        }
    }
    addRowStyle(rowIdentifierValue, style, timeout) {
        var row = this.grid.getRowFromId(rowIdentifierValue);
        // note: no check on if already exists...
        row.addClass(style, this.grid);
        if (timeout) {
            setTimeout(() => this.removeRowStyle(rowIdentifierValue, style), timeout);
        }
    }
    removeAllCellStylesWithRegex(regex) {
        //
    }
    removeAllRowStylesWithRegex(regex) {
        //
    }
    removeCellStyle(rowIdentifierValue, columnIndex, style) {
        var row = this.grid.getRowFromId(rowIdentifierValue);
        var cell = row.getCell(columnIndex);
        cell.removeClass(style);
    }
    removeRowStyle(rowIdentifierValue, style) {
        var row = this.grid.getRowFromId(rowIdentifierValue);
        // note: no check on if already exists...
        row.removeClass(style, this.grid);
    }
    forAllRecordsDo(func) {
        //jo:not tested, not even tried
        this.grid.getAllRows().forEach(r => func(r));
    }
    forAllVisibleRecordsDo(func) {
        //jo:not tested, not even tried 
        this.grid.getVisibleRows().forEach(r => func(r));
    }
    getAllRows() {
        return null;
    }
    getAllVisibleRows() {
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
    applyGridFiltering() {
        return null;
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
    editCalculatedColumnInGrid(calculatedColumn) {
        // nothing to do
    }
    addCalculatedColumnToGrid(calculatedColumn) {
        // todo
    }
    removeCalculatedColumnFromGrid(calculatedColumnID) {
        // todo
    }
    isGroupRecord(record) {
        return false;
    }
    getFirstRecord() {
        return null;
    }
    rendergrid() {
        this.grid.render();
    }
    getRecordFromRowId(rowId) {
        return null;
    }
    //TEMPORARY : JO
    getIPPStyle() {
        return null;
    }
    getRowCount() {
        return 1;
    }
    getColumnCount() {
        return 1;
    }
    getVisibleRowCount() {
        return 1;
    }
    getVisibleColumnCount() {
        return 1;
    }
    selectColumn(columnId) {
        // todo
    }
    setGridSort(gridSorts) {
        //todo
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
}
exports.AdaptableBlotter = AdaptableBlotter;
