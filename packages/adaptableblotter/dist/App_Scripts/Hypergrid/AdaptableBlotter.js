"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../App_Scripts/Styles/stylesheets/adaptableblotter-style.css");
const CalculatedColumnStrategy_1 = require("../App_Scripts/Strategy/CalculatedColumnStrategy");
const ReactDOM = require("react-dom");
const AdaptableBlotterView_1 = require("../App_Scripts/View/AdaptableBlotterView");
const MenuRedux = require("../App_Scripts/Redux/ActionsReducers/MenuRedux");
const GridRedux = require("../App_Scripts/Redux/ActionsReducers/GridRedux");
const LayoutRedux = require("../App_Scripts/Redux/ActionsReducers/LayoutRedux");
const PopupRedux = require("../App_Scripts/Redux/ActionsReducers/PopupRedux");
const AdaptableBlotterStore_1 = require("../App_Scripts/Redux/Store/AdaptableBlotterStore");
const CalendarService_1 = require("../App_Scripts/Core/Services/CalendarService");
const AuditService_1 = require("../App_Scripts/Core/Services/AuditService");
const ValidationService_1 = require("../App_Scripts/Core/Services/ValidationService");
const CalculatedColumnExpressionService_1 = require("../App_Scripts/Core/Services/CalculatedColumnExpressionService");
const AuditLogService_1 = require("../App_Scripts/Core/Services/AuditLogService");
const StrategyConstants = require("../App_Scripts/Core/Constants/StrategyConstants");
const CustomSortStrategy_1 = require("../App_Scripts/Strategy/CustomSortStrategy");
const SmartEditStrategy_1 = require("../App_Scripts/Strategy/SmartEditStrategy");
const ShortcutStrategy_1 = require("../App_Scripts/Strategy/ShortcutStrategy");
const DataManagementStrategy_1 = require("../App_Scripts/Strategy/DataManagementStrategy");
const PlusMinusStrategy_1 = require("../App_Scripts/Strategy/PlusMinusStrategy");
const ColumnChooserStrategy_1 = require("../App_Scripts/Strategy/ColumnChooserStrategy");
const ExportStrategy_1 = require("../App_Scripts/Strategy/ExportStrategy");
const FlashingCellsHypergridStrategy_1 = require("./Strategy/FlashingCellsHypergridStrategy");
const CalendarStrategy_1 = require("../App_Scripts/Strategy/CalendarStrategy");
const ConditionalStyleHypergridStrategy_1 = require("./Strategy/ConditionalStyleHypergridStrategy");
const QuickSearchStrategy_1 = require("../App_Scripts/Strategy/QuickSearchStrategy");
const AdvancedSearchStrategy_1 = require("../App_Scripts/Strategy/AdvancedSearchStrategy");
const FormatColumnHypergridStrategy_1 = require("./Strategy/FormatColumnHypergridStrategy");
const ColumnInfoStrategy_1 = require("../App_Scripts/Strategy/ColumnInfoStrategy");
const UserFilterStrategy_1 = require("../App_Scripts/Strategy/UserFilterStrategy");
const ColumnFilterStrategy_1 = require("../App_Scripts/Strategy/ColumnFilterStrategy");
const CellValidationStrategy_1 = require("../App_Scripts/Strategy/CellValidationStrategy");
const LayoutStrategy_1 = require("../App_Scripts/Strategy/LayoutStrategy");
const ThemeStrategy_1 = require("../App_Scripts/Strategy/ThemeStrategy");
const DashboardStrategy_1 = require("../App_Scripts/Strategy/DashboardStrategy");
const TeamSharingStrategy_1 = require("../App_Scripts/Strategy/TeamSharingStrategy");
const EventDispatcher_1 = require("../App_Scripts/Core/EventDispatcher");
const EnumExtensions_1 = require("../App_Scripts/Core/Extensions/EnumExtensions");
const Enums_1 = require("../App_Scripts/Core/Enums");
const CustomSortDataSource_1 = require("./CustomSortDataSource");
const FilterAndSearchDataSource_1 = require("./FilterAndSearchDataSource");
const ObjectFactory_1 = require("../App_Scripts/Core/ObjectFactory");
const DefaultAdaptableBlotterOptions_1 = require("../App_Scripts/Core/DefaultAdaptableBlotterOptions");
const iPushPullHelper_1 = require("../App_Scripts/Core/Helpers/iPushPullHelper");
const BulkUpdateStrategy_1 = require("../App_Scripts/Strategy/BulkUpdateStrategy");
const FilterForm_1 = require("../App_Scripts/View/Components/FilterForm/FilterForm");
//import { ContextMenuReact } from '../App_Scripts/View/Components/ContextMenu/ContextMenu';
const BlotterApi_1 = require("./BlotterApi");
const DataSourceStrategy_1 = require("../App_Scripts/Strategy/DataSourceStrategy");
const AdaptableBlotterLogger_1 = require("../App_Scripts/Core/Helpers/AdaptableBlotterLogger");
const _ = require("lodash");
const SelectedCellsStrategy_1 = require("../App_Scripts/Strategy/SelectedCellsStrategy");
const ChartService_1 = require("../App_Scripts/Core/Services/ChartService");
const HypergridThemes_1 = require("./HypergridThemes");
const HomeStrategy_1 = require("../App_Scripts/Strategy/HomeStrategy");
const AlertStrategy_1 = require("../App_Scripts/Strategy/AlertStrategy");
const ColumnHelper_1 = require("../App_Scripts/Core/Helpers/ColumnHelper");
const ColumnCategoryStrategy_1 = require("../App_Scripts/Strategy/ColumnCategoryStrategy");
//icon to indicate toggle state
const UPWARDS_BLACK_ARROW = '\u25b2'; // aka '▲'
const DOWNWARDS_BLACK_ARROW = '\u25bc'; // aka '▼'
const filterOffRaw = {
    type: "image/png",
    data: "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAChSURBVChTzZHBCoUgFET9TqEiskgyWoutQvRLRIr+cR7XQAjiJW/1BgZmMUevXsY5xy9OoDEGMcYiUzeB67qibVuwQjVNA6311V+WBeM4vsLDMEApde/1fY9pmtI453neHEKAlBJd1z0fXtc16PbjODK07zvmeUZVVd8nooc75zJIOX3Gm6i0bVsGKf8xKIRIuyJTLgJJ3nvQzsjW2geIsQ/pr9hMVrSncAAAAABJRU5ErkJggg=="
};
const filterOnRaw = {
    type: "image/png",
    data: "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAACoSURBVChTY3BqfP2fHAzWmDbj7f8p294RhVOBasEa02e+/e/VBmQQCTxaX/9PnvYGoj5ywpv/Qd2ENft3vv4f1gfVBAP+nW/+h/a+ATtn1q73KHjytvdgg3070DTBgHvL6/8g22fsQGiaDmSHA21xaybgIpDHixa8hWssnA8NDEIApCh3LkIjiD2INYJCL2X6W3B8gdhEaQQBUOCA4gyE8+e9xaKJgQEA/74BNE3cElkAAAAASUVORK5CYII="
};
const filterOn = new Image();
filterOn.src = 'data:' + filterOnRaw.type + ';base64,' + filterOnRaw.data;
const filterOff = new Image();
filterOff.src = 'data:' + filterOffRaw.type + ';base64,' + filterOffRaw.data;
const getFilterIcon = (state) => {
    return state ? filterOn : filterOff;
};
class AdaptableBlotter {
    constructor(blotterOptions, renderGrid = true) {
        this.cellStyleHypergridMap = new Map();
        this.cellFlashIntervalHypergridMap = new Map();
        this._onKeyDown = new EventDispatcher_1.EventDispatcher();
        this._onGridDataBound = new EventDispatcher_1.EventDispatcher();
        this._onSelectedCellsChanged = new EventDispatcher_1.EventDispatcher();
        this._onRefresh = new EventDispatcher_1.EventDispatcher();
        this.SearchedChanged = new EventDispatcher_1.EventDispatcher();
        this.StateChanged = new EventDispatcher_1.EventDispatcher();
        this.ColumnStateChanged = new EventDispatcher_1.EventDispatcher();
        this.debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), 500);
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions, blotterOptions);
        this.hyperGrid = this.BlotterOptions.vendorGrid;
        this.VendorGridName = 'Hypergrid';
        this.EmbedColumnMenu = false;
        this.AdaptableBlotterStore = new AdaptableBlotterStore_1.AdaptableBlotterStore(this);
        // create the services
        this.CalendarService = new CalendarService_1.CalendarService(this);
        this.AuditService = new AuditService_1.AuditService(this);
        this.ValidationService = new ValidationService_1.ValidationService(this);
        this.AuditLogService = new AuditLogService_1.AuditLogService(this, this.BlotterOptions);
        this.ChartService = new ChartService_1.ChartService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService_1.CalculatedColumnExpressionService(this, (columnId, record) => {
            let column = this.getHypergridColumn(columnId);
            return this.valOrFunc(record, column);
        });
        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map();
        this.Strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy_1.AdvancedSearchStrategy(this));
        this.Strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategy_1.AlertStrategy(this));
        this.Strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy_1.BulkUpdateStrategy(this));
        this.Strategies.set(StrategyConstants.CalculatedColumnStrategyId, new CalculatedColumnStrategy_1.CalculatedColumnStrategy(this));
        this.Strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy_1.CalendarStrategy(this));
        this.Strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy_1.CellValidationStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy_1.ColumnChooserStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy_1.ColumnInfoStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy_1.ColumnInfoStrategy(this));
        this.Strategies.set(StrategyConstants.ConditionalStyleStrategyId, new ConditionalStyleHypergridStrategy_1.ConditionalStyleHypergridStrategy(this));
        this.Strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategy_1.CustomSortStrategy(this));
        this.Strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy_1.DashboardStrategy(this));
        this.Strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy_1.DataSourceStrategy(this));
        this.Strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy_1.ExportStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy_1.ColumnFilterStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnCategoryStrategyId, new ColumnCategoryStrategy_1.ColumnCategoryStrategy(this));
        this.Strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy_1.HomeStrategy(this));
        this.Strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy_1.UserFilterStrategy(this));
        this.Strategies.set(StrategyConstants.FlashingCellsStrategyId, new FlashingCellsHypergridStrategy_1.FlashingCellsHypergridStrategy(this));
        this.Strategies.set(StrategyConstants.FormatColumnStrategyId, new FormatColumnHypergridStrategy_1.FormatColumnHypergridStrategy(this));
        this.Strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy_1.LayoutStrategy(this));
        this.Strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy_1.PlusMinusStrategy(this));
        this.Strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy_1.QuickSearchStrategy(this));
        //   this.Strategies.set(StrategyConstants.SelectColumnStrategyId, new SelectColumnStrategy(this))
        this.Strategies.set(StrategyConstants.SelectedCellsStrategyId, new SelectedCellsStrategy_1.SelectedCellsStrategy(this));
        this.Strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy_1.SmartEditStrategy(this));
        this.Strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy_1.ShortcutStrategy(this));
        this.Strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy_1.TeamSharingStrategy(this));
        this.Strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy_1.ThemeStrategy(this));
        this.Strategies.set(StrategyConstants.DataManagementStrategyId, new DataManagementStrategy_1.DataManagementStrategy(this));
        this.abContainerElement = document.getElementById(this.BlotterOptions.adaptableBlotterContainer);
        if (this.abContainerElement == null) {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("There is no Div called " + this.BlotterOptions.adaptableBlotterContainer + " so cannot render the Adaptable Blotter");
            return;
        }
        this.abContainerElement.innerHTML = "";
        this.filterContainer = this.abContainerElement.ownerDocument.createElement("div");
        this.filterContainer.id = "filterContainer";
        this.filterContainer.style.position = 'absolute';
        this.filterContainer.style.visibility = "hidden";
        this.abContainerElement.ownerDocument.body.appendChild(this.filterContainer);
        //   this.contextMenuContainer = this.abContainerElement.ownerDocument.createElement("div")
        //   this.contextMenuContainer.id = "contextMenuContainer"
        //   this.contextMenuContainer.style.position = 'absolute'
        //    this.abContainerElement.ownerDocument.body.appendChild(this.contextMenuContainer)
        //    ReactDOM.render(ContextMenuReact(this), this.contextMenuContainer);
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
        })
            .then(() => {
            let currentlayout = this.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout;
            this.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(currentlayout));
            this.isInitialised = true;
            this.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupHideLoading());
        });
        // get the api ready
        this.api = new BlotterApi_1.BlotterApi(this);
        if (renderGrid) {
            if (this.abContainerElement != null) {
                ReactDOM.render(AdaptableBlotterView_1.AdaptableBlotterApp({ AdaptableBlotter: this }), this.abContainerElement);
            }
        }
    }
    getState() {
        return this.AdaptableBlotterStore.TheStore.getState();
    }
    InitAuditService() {
        // do somethign?
    }
    buildFontCSSShorthand(fontCssShortHand, newStyle) {
        var el = document.createElement("span");
        //we we let teh CSS parse build the different properties of the font CSS
        el.style.font = fontCssShortHand;
        //we now update individual properties
        el.style.fontWeight = newStyle.FontWeight.toLocaleLowerCase();
        el.style.fontStyle = newStyle.FontStyle.toLocaleLowerCase();
        //font size can be null
        if (newStyle.FontSize) {
            el.style.fontSize = EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(newStyle.FontSize);
        }
        //we return the new font CSS shorthand
        return el.style.font;
    }
    buildFontCSSProperties(fontCssShortHand) {
        var el = document.createElement("span");
        //we we let teh CSS parse build the different properties of the font CSS
        el.style.font = fontCssShortHand;
        //we return the new style
        return el.style;
    }
    setColumnIntoStore() {
        // let columns: IColumn[] = this.hyperGrid.behavior.columns.map((x: any) => {
        let activeColumns = this.hyperGrid.behavior.getActiveColumns().map((x, index) => {
            let existingColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(x.name, this.getState().Grid.Columns);
            return {
                ColumnId: existingColumn ? existingColumn.ColumnId : x.name ? x.name : "Unknown Column",
                FriendlyName: existingColumn ? existingColumn.FriendlyName :
                    x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                DataType: existingColumn ? existingColumn.DataType : this.getColumnDataType(x),
                Visible: true,
                Index: index,
                ReadOnly: this.isColumnReadonly(x.name, index),
                Sortable: existingColumn ? existingColumn.Sortable : this.isColumnSortable(x.name),
                Filterable: existingColumn ? existingColumn.Filterable : this.isFilterable() // TODO: can we manage by column
            };
        });
        let hiddenColumns = this.hyperGrid.behavior.getHiddenColumns().map((x) => {
            let existingColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(x.name, this.getState().Grid.Columns);
            return {
                ColumnId: existingColumn ? existingColumn.ColumnId : x.name ? x.name : "Unknown Column",
                FriendlyName: existingColumn ? existingColumn.FriendlyName :
                    x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                DataType: existingColumn ? existingColumn.DataType : this.getColumnDataType(x),
                Visible: false,
                Index: -1,
                ReadOnly: false,
                Sortable: existingColumn ? existingColumn.Sortable : this.isColumnSortable(x.name),
                Filterable: existingColumn ? existingColumn.Filterable : this.isFilterable() // TODO: can we manage by column
            };
        });
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetColumns(activeColumns.concat(hiddenColumns)));
    }
    hideFilterForm() {
        ReactDOM.unmountComponentAtNode(this.filterContainer);
        this.filterContainer.style.visibility = 'hidden';
    }
    setNewColumnListOrder(VisibleColumnList) {
        VisibleColumnList.forEach((column, index) => {
            //we use allcolumns so we can show previously hidden columns
            let oldcolindex = this.hyperGrid.behavior.allColumns.findIndex((x) => x.name == column.ColumnId);
            this.hyperGrid.behavior.showColumns(false, oldcolindex, index, false);
            //this.grid.swapColumns(index, oldcolindex);
        });
        this.hyperGrid.behavior.getActiveColumns().filter((x) => VisibleColumnList.findIndex(y => y.ColumnId == x.name) < 0).forEach(((col) => {
            this.hyperGrid.behavior.hideColumns(false, this.hyperGrid.behavior.allColumns.indexOf(col));
        }));
        this.hyperGrid.behavior.changed();
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
    getPrimaryKeyValueFromRecord(record) {
        return record[this.BlotterOptions.primaryKey];
    }
    gridHasCurrentEditValue() {
        return this.hyperGrid.cellEditor;
    }
    getCurrentCellEditValue() {
        if (this.hyperGrid.cellEditor) {
            return this.hyperGrid.cellEditor.getEditorValue();
        }
        return "";
    }
    getActiveCell() {
        let currentCell = this.hyperGrid.selectionModel.getLastSelection();
        if (currentCell) {
            let column = this.hyperGrid.behavior.getActiveColumns()[currentCell.origin.x];
            let row = this.hyperGrid.behavior.dataModel.dataSource.getRow(currentCell.origin.y);
            let primaryKey = this.getPrimaryKeyValueFromRecord(row);
            let value = this.valOrFunc(row, column);
            return { Id: primaryKey, ColumnId: column.name, Value: value };
        }
        return null;
    }
    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    setSelectedCells() {
        let selectionMap = new Map();
        let selected = this.hyperGrid.selectionModel.getSelections();
        let columns = [];
        for (let rectangle of selected) {
            //we don't use firstSelectedCell and lastSelectedCell as they keep the order of the click. i.e. firstcell can be below lastcell....
            for (let columnIndex = rectangle.origin.x; columnIndex <= rectangle.origin.x + rectangle.width; columnIndex++) {
                let column = this.hyperGrid.behavior.getActiveColumns()[columnIndex];
                let selectedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(column.name, this.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
                columns.push(selectedColumn);
                for (let rowIndex = rectangle.origin.y; rowIndex <= rectangle.origin.y + rectangle.height; rowIndex++) {
                    let row = this.hyperGrid.behavior.dataModel.dataSource.getRow(rowIndex);
                    let primaryKey = this.getPrimaryKeyValueFromRecord(row);
                    let value = this.valOrFunc(row, column);
                    //this line is pretty much doing the same....just keeping it for the record
                    //maybe we could get it directly from the row..... dunno wht's best
                    // let value = column.getValue(rowIndex)
                    let valueArray = selectionMap.get(primaryKey);
                    if (valueArray == undefined) {
                        valueArray = [];
                        selectionMap.set(primaryKey, valueArray);
                    }
                    let selectedCellInfo = { columnId: column.name, value: value };
                    valueArray.push(selectedCellInfo);
                }
            }
        }
        let selectedCells = { Columns: columns, Selection: selectionMap };
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetSelectedCells(selectedCells));
        this._onSelectedCellsChanged.Dispatch(this, this);
    }
    getColumnDataType(column) {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage('columnId is undefined returning String for Type');
            return Enums_1.DataType.String;
        }
        if (column) {
            if (!column.hasOwnProperty('type')) {
                let dataType;
                switch (column.getType()) {
                    case 'string':
                        dataType = Enums_1.DataType.String;
                        break;
                    case 'number':
                    case 'int':
                    case 'float':
                        dataType = Enums_1.DataType.Number;
                        break;
                    case 'boolean':
                        dataType = Enums_1.DataType.Boolean;
                        break;
                    case 'date':
                        dataType = Enums_1.DataType.Date;
                        break;
                    case 'object':
                        dataType = Enums_1.DataType.Object;
                        break;
                    //for calculated column that's what happens
                    case 'unknown': {
                        //get First record
                        let record = this.getFirstRecord();
                        var value = this.valOrFunc(record, column);
                        if (value instanceof Date) {
                            dataType = Enums_1.DataType.Date;
                        }
                        else {
                            switch (typeof value) {
                                case 'string':
                                    dataType = Enums_1.DataType.String;
                                    break;
                                case 'number':
                                    dataType = Enums_1.DataType.Number;
                                    break;
                                case 'boolean':
                                    dataType = Enums_1.DataType.Boolean;
                                    break;
                                case 'object':
                                    dataType = Enums_1.DataType.Object;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    /* falls through */
                    default:
                        break;
                }
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage('No defined type for column ' + column.name + ". Defaulting to type of first value: " + dataType);
                return dataType;
            }
            let type = column.type;
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
                    break;
                //  }
            }
        }
        AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning('columnId does not exist');
        return Enums_1.DataType.String;
    }
    setValue(cellInfo) {
        //there is a bug in hypergrid 15/12/16 and the row object on the cellEditor is the row below the one currently edited
        //so we just close editor for now even if not the one where we set the value
        //if(this.gridHasCurrentEditValue() && this.getPrimaryKeyValueFromRecord(this.hyperGrid.cellEditor.row) == id)
        this.cancelEdit();
        let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, cellInfo.Id);
        let oldValue = row[cellInfo.ColumnId];
        row[cellInfo.ColumnId] = cellInfo.Value;
        let dataChangedEvent = {
            OldValue: oldValue,
            NewValue: cellInfo.Value,
            ColumnId: cellInfo.ColumnId,
            IdentifierValue: cellInfo.Id,
            Timestamp: null,
            Record: null
        };
        this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
        //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
        this.ReindexAndRepaint();
    }
    setValueBatch(batchValues) {
        //no need to have a batch mode so far.... we'll see in the future performance
        let dataChangedEvents = [];
        for (let element of batchValues) {
            let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, element.Id);
            let oldValue = row[element.ColumnId];
            row[element.ColumnId] = element.Value;
            let dataChangedEvent = {
                OldValue: oldValue,
                NewValue: element.Value,
                ColumnId: element.ColumnId,
                IdentifierValue: element.Id,
                Timestamp: null,
                Record: null
            };
            dataChangedEvents.push(dataChangedEvent);
        }
        //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
        this.ReindexAndRepaint();
        this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        this.ClearSelection();
    }
    ClearSelection() {
        this.hyperGrid.selectionModel.clear();
        this.debouncedSetSelectedCells();
    }
    cancelEdit() {
        this.hyperGrid.cancelEditing();
    }
    forAllRecordsDo(func) {
        //we use getData instead of this.hyperGrid.behavior.dataModel.dataSource as this method is used to compute stuff on filtered data as well
        let ds = this.hyperGrid.behavior.getData();
        ds.forEach((row) => func(row));
    }
    forAllVisibleRecordsDo(func) {
        let rowCount = this.hyperGrid.behavior.dataModel.dataSource.getRowCount();
        for (var index = 0; index < rowCount; index++) {
            var element = this.hyperGrid.behavior.dataModel.dataSource.getRow(index);
            func(element);
        }
    }
    getRecordIsSatisfiedFunction(id, distinctCriteria) {
        if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
            let record = this.hyperGrid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, id);
            return (columnId) => {
                let column = this.getHypergridColumn(columnId);
                return this.valOrFunc(record, column);
            };
        }
        else {
            return (columnId) => { return this.getDisplayValue(id, columnId); };
        }
    }
    getRecordIsSatisfiedFunctionFromRecord(record, distinctCriteria) {
        if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
            return (columnId) => {
                let column = this.getHypergridColumn(columnId);
                return this.valOrFunc(record, column);
            };
        }
        else {
            return (columnId) => { return this.getDisplayValueFromRecord(record, columnId); };
        }
    }
    getColumnIndex(columnId) {
        //this returns the index of the column in the collection which is as well the index y of the cell in the grid
        // it doesnt return the index from the schema
        let hgindex = this.hyperGrid.behavior.getActiveColumns().findIndex((x) => x.name == columnId);
        return hgindex;
    }
    isColumnReadonly(columnId, index) {
        if (this.hyperGrid.cellEditor) {
            if (this.hyperGrid.cellEditor.column.name == columnId) {
                //we are already editing that column so that's an easy answer
                return false;
            }
            //in our current use cases as of 02/10/2017 it should never happens that we
            //check for editable on a different column that we edit
            else {
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("Editing " + this.hyperGrid.cellEditor.column.name + " but checking for editable on column " + columnId);
            }
        }
        else {
            //now instead of checking if editor was defined at design time on the column we try to instantiate the editor
            //for that column directly
            let cellEvent = new this.hyperGrid.behavior.CellEvent;
            //this index does need to be the coordinate y/grid index of the column and not the hypergrid column index
            cellEvent.resetGridCY(index, 1);
            let editor = this.hyperGrid.behavior.getCellEditorAt(cellEvent);
            if (editor) {
                editor.cancelEditing();
                editor = null;
                return false;
            }
            return true;
        }
    }
    isColumnSortable(columnId) {
        if (!this.isSortable()) {
            return false;
        }
        let column = this.getHypergridColumn(columnId);
        if (column.properties.hasOwnProperty('unsortable')) {
            return !column.properties.unsortable;
        }
        return true;
    }
    setCustomSort(columnId) {
        //nothing to do except the reindex so the CustomSortSource does it's job if needed
        let gridSort = this.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts.find(x => x.Column == columnId);
        if (gridSort) {
            this.ReindexAndRepaint();
        }
    }
    removeCustomSort(columnId) {
        //nothing to do except the reindex so the CustomSortSource does it's job if needed
        let gridSort = this.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts.find(x => x.Column == columnId);
        if (gridSort) {
            this.ReindexAndRepaint();
        }
    }
    ReindexAndRepaint() {
        this.hyperGrid.behavior.reindex();
        this.hyperGrid.repaint();
        this._onRefresh.Dispatch(this, this);
    }
    getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) {
        let returnMap = new Map();
        // check if there are permitted column values for that column
        let permittedValues = this.getState().UserInterface.PermittedColumnValues;
        let permittedValuesForColumn = permittedValues.find(pc => pc.ColumnId == columnId);
        if (permittedValuesForColumn) {
            permittedValuesForColumn.PermittedValues.forEach(pv => {
                returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
                if (returnMap.size == this.BlotterOptions.maxColumnValueItemsDisplayed) {
                    return Array.from(returnMap.values());
                }
            });
        }
        else {
            let column = this.getHypergridColumn(columnId);
            //We bypass the whole DataSource stuff as we need to get ALL the data
            let data = this.hyperGrid.behavior.dataModel.getData();
            for (var index = 0; index < data.length; index++) {
                var element = data[index];
                let displayString = this.getDisplayValueFromRecord(element, columnId);
                let rawValue = this.valOrFunc(element, column);
                if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
                    returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayString });
                }
                else if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.DisplayValue) {
                    returnMap.set(displayString, { RawValue: rawValue, DisplayValue: displayString });
                }
                if (returnMap.size == this.BlotterOptions.maxColumnValueItemsDisplayed) {
                    return Array.from(returnMap.values());
                }
            }
        }
        return Array.from(returnMap.values());
    }
    getDisplayValue(id, columnId) {
        let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, id);
        return this.getDisplayValueFromRecord(row, columnId);
    }
    getDisplayValueFromRecord(row, columnId) {
        let column = this.getHypergridColumn(columnId);
        if (column) {
            let formatter = column.getFormatter();
            return formatter(this.valOrFunc(row, column));
        }
        return "";
    }
    getDisplayValueFromRawValue(colId, rawValue) {
        let formatter = this.getColumnFormatter(colId);
        if (formatter) {
            return formatter(rawValue);
        }
        else {
            return rawValue;
        }
    }
    getRawValueFromRecord(row, columnId) {
        let column = this.getHypergridColumn(columnId);
        return this.valOrFunc(row, column);
    }
    getColumnFormatter(columnId) {
        let column = this.getHypergridColumn(columnId);
        if (column && column.properties.format) {
            return column.getFormatter();
        }
        return null;
    }
    addCellStyleHypergrid(rowIdentifierValue, columnId, style, timeout) {
        //here we don't call Repaint as we consider that we already are in the repaint loop
        let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(rowIdentifierValue);
        if (!cellStyleHypergridColumns) {
            cellStyleHypergridColumns = new Map();
            this.cellStyleHypergridMap.set(rowIdentifierValue, cellStyleHypergridColumns);
        }
        let cellStyleHypergrid = cellStyleHypergridColumns.get(columnId);
        if (!cellStyleHypergrid) {
            cellStyleHypergrid = {};
            cellStyleHypergridColumns.set(columnId, cellStyleHypergrid);
        }
        if (style.flashBackColor) {
            cellStyleHypergrid.flashBackColor = style.flashBackColor;
            if (timeout) {
                let cellIntervalColumns = this.cellFlashIntervalHypergridMap.get(rowIdentifierValue);
                if (!cellIntervalColumns) {
                    cellIntervalColumns = new Map();
                    this.cellFlashIntervalHypergridMap.set(rowIdentifierValue, cellIntervalColumns);
                }
                let cellFlashIntervalHypergrid = cellIntervalColumns.get(columnId);
                if (cellFlashIntervalHypergrid) {
                    clearTimeout(cellFlashIntervalHypergrid);
                    cellIntervalColumns.set(columnId, null);
                }
                let timeoutInterval = setTimeout(() => this.removeCellStyleHypergrid(rowIdentifierValue, columnId, 'flash'), timeout);
                cellIntervalColumns.set(columnId, timeoutInterval);
            }
        }
        if (style.quickSearchStyle) {
            cellStyleHypergrid.quickSearchStyle = style.quickSearchStyle;
        }
        //There is never a timeout for CS
        if (style.conditionalStyleColumn) {
            cellStyleHypergrid.conditionalStyleColumn = style.conditionalStyleColumn;
        }
        if (style.formatColumnStyle) {
            cellStyleHypergrid.formatColumnStyle = style.formatColumnStyle;
        }
    }
    addRowStyleHypergrid(rowIdentifierValue, style) {
        let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(rowIdentifierValue);
        if (!cellStyleHypergridColumns) {
            cellStyleHypergridColumns = new Map();
            this.cellStyleHypergridMap.set(rowIdentifierValue, cellStyleHypergridColumns);
        }
        for (let column of this.AdaptableBlotterStore.TheStore.getState().Grid.Columns) {
            let cellStyleHypergrid = cellStyleHypergridColumns.get(column.ColumnId);
            if (!cellStyleHypergrid) {
                cellStyleHypergrid = {};
                cellStyleHypergridColumns.set(column.ColumnId, cellStyleHypergrid);
            }
            //here we don't call Repaint as we consider that we already are in the repaint loop
            //There is never a timeout for CS
            if (style.conditionalStyleRow) {
                cellStyleHypergrid.conditionalStyleRow = style.conditionalStyleRow;
            }
        }
    }
    getRowIndexHypergrid(rowIdentifierValue) {
        //11/01/17 We cannot use findRow as it returns the rowIndex from the original DataSource
        //I leave the getIndexedData for now but we would need to optimize that.... since we create a big array every iteration
        // let row = this.hyperGrid.behavior.dataModel.dataSource.findRow(this.primaryKey, rowIdentifierValue)
        // let rowIndex = this.hyperGrid.behavior.dataModel.dataSource.getProperty('foundRowIndex')
        // return rowIndex
        let rowIndex = this.hyperGrid.behavior.dataModel.getIndexedData().findIndex((x) => {
            if (x && x.hasOwnProperty(this.BlotterOptions.primaryKey)) {
                return x[this.BlotterOptions.primaryKey] == rowIdentifierValue;
            }
            return false;
        });
        return rowIndex;
    }
    removeCellStyleHypergrid(rowIdentifierValue, columnId, style) {
        let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(rowIdentifierValue);
        if (!cellStyleHypergridColumns) {
            cellStyleHypergridColumns = new Map();
            this.cellStyleHypergridMap.set(rowIdentifierValue, cellStyleHypergridColumns);
        }
        let cellStyleHypergrid = cellStyleHypergridColumns.get(columnId);
        if (!cellStyleHypergrid) {
            cellStyleHypergrid = {};
            cellStyleHypergridColumns.set(columnId, cellStyleHypergrid);
        }
        if (style == 'flash') {
            cellStyleHypergrid.flashBackColor = undefined;
            this.hyperGrid.repaint();
        }
        if (style == 'csColumn') {
            cellStyleHypergrid.conditionalStyleColumn = undefined;
            this.hyperGrid.repaint();
        }
        if (style == 'csRow') {
            cellStyleHypergrid.conditionalStyleRow = undefined;
            this.hyperGrid.repaint();
        }
        if (style == 'QuickSearch') {
            cellStyleHypergrid.quickSearchStyle = undefined;
        }
        if (style == 'formatColumn') {
            cellStyleHypergrid.formatColumnStyle = undefined;
        }
    }
    removeAllCellStyleHypergrid(style) {
        this.cellStyleHypergridMap.forEach((cellStyleHypergridColumns) => {
            cellStyleHypergridColumns.forEach((cellStyleHypergrid) => {
                if (style == 'flash') {
                    cellStyleHypergrid.flashBackColor = undefined;
                    this.hyperGrid.repaint();
                }
                if (style == 'csColumn') {
                    cellStyleHypergrid.conditionalStyleColumn = undefined;
                    this.hyperGrid.repaint();
                }
                if (style == 'csRow') {
                    cellStyleHypergrid.conditionalStyleRow = undefined;
                    this.hyperGrid.repaint();
                }
                if (style == 'QuickSearch') {
                    cellStyleHypergrid.quickSearchStyle = undefined;
                }
                if (style == 'formatColumn') {
                    cellStyleHypergrid.formatColumnStyle = undefined;
                }
            });
        });
    }
    applyGridFiltering() {
        //which call onRefresh to refresh live excel updates
        this.ReindexAndRepaint();
    }
    clearGridFiltering() {
        // todo
    }
    clearColumnFiltering(columnIds) {
        // to do
    }
    removeCalculatedColumnFromGrid(calculatedColumnID) {
        let colIndex = this.hyperGrid.behavior.getColumns().findIndex((x) => x.name == calculatedColumnID);
        if (colIndex > -1) {
            this.hyperGrid.behavior.getColumns().splice(colIndex, 1);
            //we re-index the Column Object since we are removing the Schema 
            for (let i = colIndex; i < this.hyperGrid.behavior.getColumns().length; i++) {
                this.hyperGrid.behavior.getColumns()[i]._index = this.hyperGrid.behavior.getColumns()[i].index - 1;
            }
        }
        let activecolIndex = this.hyperGrid.behavior.getActiveColumns().findIndex((x) => x.name == calculatedColumnID);
        if (activecolIndex > -1) {
            this.hyperGrid.behavior.getActiveColumns().splice(activecolIndex, 1);
            //No need to do it here since the collections share the same instance of Column
            // for (let i = activecolIndex; i < this.hyperGrid.behavior.getActiveColumns().length; i++) {
            //     this.hyperGrid.behavior.getActiveColumns()[i]._index = this.hyperGrid.behavior.getActiveColumns()[i].index - 1
            // }
        }
        //needs to be last since column.name load up the schema
        let schemaIndex = this.hyperGrid.behavior.dataModel.schema.findIndex((x) => x.name == calculatedColumnID);
        if (schemaIndex > -1) {
            this.hyperGrid.behavior.dataModel.schema.splice(schemaIndex, 1);
        }
        this.hyperGrid.behavior.changed();
        this.setColumnIntoStore();
    }
    editCalculatedColumnInGrid(calculatedColumn) {
        let newSchema = {
            name: calculatedColumn.ColumnId,
            header: calculatedColumn.ColumnId,
            calculator: (dataRow) => {
                //22/08/17: I think that's a bug that's been fixed in v2 of hypergrid but for now we need to return the header
                if (Object.keys(dataRow).length == 0) {
                    return calculatedColumn.ColumnId;
                }
                return this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, dataRow);
            }
        };
        let schemaIndex = this.hyperGrid.behavior.dataModel.schema.findIndex((x) => x.name == calculatedColumn.ColumnId);
        this.hyperGrid.behavior.dataModel.schema[schemaIndex] = newSchema;
        let existingColumnIndex = this.hyperGrid.behavior.columns.findIndex((c) => c.name == calculatedColumn.ColumnId);
        let existingColumn = this.hyperGrid.behavior.columns.find((c) => c.name == calculatedColumn.ColumnId);
        existingColumn.calculator = newSchema.calculator;
        this.hyperGrid.behavior.columns[existingColumnIndex] = existingColumn;
        this.hyperGrid.behavior.changed();
    }
    addCalculatedColumnToGrid(calculatedColumn) {
        let newSchema = {
            name: calculatedColumn.ColumnId,
            header: calculatedColumn.ColumnId,
            calculator: (dataRow) => {
                //22/08/17: I think that's a bug that's been fixed in v2 of hypergrid but for now we need to return the header
                if (Object.keys(dataRow).length == 0) {
                    return calculatedColumn.ColumnId;
                }
                return this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, dataRow);
            }
        };
        this.hyperGrid.behavior.dataModel.schema.push(newSchema);
        this.hyperGrid.behavior.addColumn({
            index: this.hyperGrid.behavior.getColumns().length,
            header: newSchema.header,
            calculator: newSchema.calculator
        });
        this.hyperGrid.behavior.changed();
        this.setColumnIntoStore();
    }
    addFreeTextColumnToGrid(freeTextColumn) {
        // to do
    }
    isGroupRecord() {
        return false;
    }
    getFirstRecord() {
        return this.hyperGrid.behavior.dataModel.getData()[0];
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this.abContainerElement);
        ReactDOM.unmountComponentAtNode(this.filterContainer);
        //   ReactDOM.unmountComponentAtNode(this.contextMenuContainer);
    }
    valOrFunc(dataRow, column) {
        var result, calculator;
        if (dataRow) {
            result = dataRow[column.name];
            calculator = (typeof result)[0] === 'f' && result || column.calculator;
            if (calculator) {
                result = calculator(dataRow, column.name);
            }
        }
        return result || result === 0 || result === false ? result : '';
    }
    getHypergridColumn(columnId) {
        return this.hyperGrid.behavior.allColumns.find((x) => x.name == columnId);
    }
    //TEMPORARY : JO
    getIPPStyle() {
        let headerFontStyle = this.buildFontCSSProperties(this.hyperGrid.properties.columnHeaderFont);
        let fontStyle = this.buildFontCSSProperties(this.hyperGrid.properties.font);
        return {
            Header: {
                headerColor: this.hyperGrid.properties.columnHeaderColor,
                headerBackColor: this.hyperGrid.properties.columnHeaderBackgroundColor,
                headerFontFamily: headerFontStyle.fontFamily,
                headerFontSize: headerFontStyle.fontSize,
                headerFontStyle: headerFontStyle.fontStyle,
                headerFontWeight: headerFontStyle.fontWeight,
                height: this.hyperGrid.properties.defaultRowHeight,
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
                    let colHypergrid = this.getHypergridColumn(col.ColumnId);
                    return { columnFriendlyName: col.FriendlyName, width: colHypergrid.getWidth(), textAlign: colHypergrid.properties.columnHeader.halign };
                })
            },
            Row: {
                color: this.hyperGrid.properties.color,
                backColor: this.hyperGrid.properties.backgroundColor,
                altBackColor: this.hyperGrid.properties.altbackground || this.hyperGrid.properties.backgroundColor,
                fontFamily: fontStyle.fontFamily,
                fontSize: fontStyle.fontSize,
                fontStyle: fontStyle.fontStyle,
                fontWeight: fontStyle.fontWeight,
                height: this.hyperGrid.properties.defaultRowHeight,
                Columns: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(col => {
                    let colHypergrid = this.getHypergridColumn(col.ColumnId);
                    return { columnFriendlyName: col.FriendlyName, width: colHypergrid.getWidth(), textAlign: colHypergrid.properties.halign };
                })
            },
        };
    }
    initInternalGridLogic() {
        this.hyperGrid.addEventListener("fin-keydown", (e) => {
            //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
            //like that we avoid the need to have different logic for different grids....
            this._onKeyDown.Dispatch(this, e.detail.primitiveEvent);
        });
        //we'll see if we need to handle differently keydown when in edit mode internally or not....
        //I think we don't need to but hey.... you never know
        this.hyperGrid.addEventListener("fin-editor-keydown", (e) => {
            //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
            //like that we avoid the need to have different logic for different grids....
            this._onKeyDown.Dispatch(this, e.detail.keyEvent);
        });
        //we hide the filterform if scrolling on the x axis
        this.hyperGrid.addEventListener('fin-scroll-x', () => {
            if (this.filterContainer.style.visibility == 'visible') {
                this.hideFilterForm();
            }
        });
        this.hyperGrid.addEventListener('fin-click', (e) => {
            if (this.filterContainer.style.visibility == 'visible') {
                this.hideFilterForm();
            }
            if (e.detail.primitiveEvent.isHeaderCell) {
                //try to check if we are clicking on the filter icon
                //we remove the scroll as get boundscell look at visible columns only
                let scrolledX = e.detail.gridCell.x - this.hyperGrid.getHScrollValue();
                let y = e.detail.gridCell.y;
                let headerBounds = this.hyperGrid.getBoundsOfCell({ x: scrolledX, y: y });
                let mouseCoordinate = e.detail.primitiveEvent.primitiveEvent.detail.mouse;
                let iconPadding = this.hyperGrid.properties.iconPadding;
                let filterIndex = this.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.findIndex(x => x.ColumnId == e.detail.primitiveEvent.column.name);
                let filterIconWidth = getFilterIcon(filterIndex >= 0).width;
                if (mouseCoordinate.x > (headerBounds.corner.x - filterIconWidth - iconPadding)) {
                    let filterContext = {
                        Column: ColumnHelper_1.ColumnHelper.getColumnFromId(e.detail.primitiveEvent.column.name, this.AdaptableBlotterStore.TheStore.getState().Grid.Columns),
                        Blotter: this,
                        ShowCloseButton: true,
                    };
                    this.filterContainer.style.visibility = 'visible';
                    this.filterContainer.style.top = e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientY + 'px';
                    this.filterContainer.style.left = e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientX + 'px';
                    // we know get the context menu here as well as they both go in there
                    // this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(e.detail.primitiveEvent.column.name));
                    let colId = e.detail.primitiveEvent.column.name;
                    //   this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(params.column.getColId()));
                    this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.ClearColumnContextMenu());
                    let column = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, this.getState().Grid.Columns);
                    if (column != null) {
                        this.Strategies.forEach(s => {
                            s.addContextMenuItem(column);
                        });
                    }
                    ReactDOM.render(FilterForm_1.FilterFormReact(filterContext), this.filterContainer);
                }
                e.preventDefault();
            }
        });
        //   this.hyperGrid.addEventListener("fin-context-menu", (e: any) => {
        //        if (e.detail.primitiveEvent.isHeaderCell) {
        //             this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.BuildColumnContextMenu(e.detail.primitiveEvent.column.name, e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientX, e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientY));
        //         }
        //     });
        this.hyperGrid.addEventListener("fin-before-cell-edit", (event) => {
            let dataChangingEvent;
            let row = this.hyperGrid.behavior.dataModel.getRow(event.detail.input.event.visibleRow.rowIndex);
            dataChangingEvent = { ColumnId: event.detail.input.column.name, NewValue: event.detail.newValue, IdentifierValue: this.getPrimaryKeyValueFromRecord(row) };
            let failedRules = this.ValidationService.ValidateCellChanging(dataChangingEvent);
            if (failedRules.length > 0) {
                // let cellValidationStrategy: ICellValidationStrategy = this.Strategies.get(StrategyConstants.CellValidationStrategyId) as ICellValidationStrategy;
                // first see if its an error = should only be one item in array if so
                if (failedRules[0].ActionMode == 'Stop Edit') {
                    let errorMessage = ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                    this.api.alertShowError("Validation Error", errorMessage, true);
                    event.preventDefault();
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
                        ConfirmAction: GridRedux.GridSetValueLikeEdit(cellInfo, (row)[dataChangingEvent.ColumnId]),
                        ShowCommentBox: true
                    };
                    this.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
                    //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                    event.preventDefault();
                }
            }
        });
        //We call Reindex so functions like CustomSort, Search and Filter are reapplied
        this.hyperGrid.addEventListener("fin-after-cell-edit", () => {
            this.hyperGrid.behavior.reindex();
        });
        this.hyperGrid.addEventListener('fin-selection-changed', () => {
            this.debouncedSetSelectedCells();
        });
        this.hyperGrid.addEventListener('fin-column-selection-changed', () => {
            //    this.debouncedSetSelectedCells()
        });
        //this is used so the grid displays sort icon when sorting....
        this.hyperGrid.behavior.dataModel.getSortImageForColumn = (columnIndex) => {
            var icon = '';
            let gridSorts = this.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts;
            let cols = this.hyperGrid.behavior.getActiveColumns();
            gridSorts.forEach((gs, index) => {
                let foundCol = cols.find(c => c.name == gs.Column);
                if (foundCol && foundCol.index == columnIndex) {
                    icon = (gs.SortOrder == Enums_1.SortOrder.Ascending) ? UPWARDS_BLACK_ARROW : DOWNWARDS_BLACK_ARROW;
                    if (gridSorts.length > 1) {
                        let gridIndex = index + 1;
                        icon += "(" + gridIndex + ") ";
                    }
                }
            });
            return icon;
        };
        let originGetCell = this.hyperGrid.behavior.dataModel.getCell;
        this.hyperGrid.behavior.dataModel.getCell = (config, declaredRendererName) => {
            try {
                //we run the original one as we don't want it to override our styles. i.e. for ex background color for our flash
                let originalGetCellReturn;
                if (originGetCell) {
                    //we need to maintain the context tof the call
                    originalGetCellReturn = originGetCell.call(this.hyperGrid.behavior.dataModel, config, declaredRendererName);
                }
                if (config.isHeaderRow && !config.isHandleColumn) {
                    let filterIndex = this.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.findIndex(x => x.ColumnId == config.name);
                    config.value = [null, config.value, getFilterIcon(filterIndex >= 0)];
                }
                if (config.isDataRow && config.dataRow) {
                    let row = config.dataRow;
                    let columnId = config.name;
                    if (columnId && row) {
                        //check that it doesn't impact perf monitor
                        let column = this.getHypergridColumn(columnId);
                        this.AuditService.CreateAuditEvent(this.getPrimaryKeyValueFromRecord(row), this.valOrFunc(row, column), columnId, row);
                    }
                    let primaryKey = this.getPrimaryKeyValueFromRecord(row);
                    let cellStyleHypergridColumns = this.cellStyleHypergridMap.get(primaryKey);
                    let cellStyleHypergrid = cellStyleHypergridColumns ? cellStyleHypergridColumns.get(columnId) : null;
                    if (cellStyleHypergrid) {
                        let flashColor = cellStyleHypergrid.flashBackColor;
                        let conditionalStyleColumn = cellStyleHypergrid.conditionalStyleColumn;
                        let conditionalStyleRow = cellStyleHypergrid.conditionalStyleRow;
                        let quickSearchStyle = cellStyleHypergrid.quickSearchStyle;
                        let formatStyle = cellStyleHypergrid.formatColumnStyle;
                        //Lowest priority first then every step will override the properties it needs to override.
                        //probably not needed to optimise as we just assign properties.......
                        if (formatStyle && !formatStyle.ClassName) {
                            if (formatStyle.BackColor) {
                                config.backgroundColor = formatStyle.BackColor;
                            }
                            if (formatStyle.ForeColor) {
                                config.color = formatStyle.ForeColor;
                            }
                            if (formatStyle.FontStyle
                                || formatStyle.FontWeight
                                || formatStyle.ForeColor
                                || formatStyle.FontSize) {
                                config.font = this.buildFontCSSShorthand(config.font, formatStyle);
                            }
                        }
                        if (conditionalStyleRow) {
                            if (conditionalStyleRow.BackColor) {
                                config.backgroundColor = conditionalStyleRow.BackColor;
                            }
                            if (conditionalStyleRow.ForeColor) {
                                config.color = conditionalStyleRow.ForeColor;
                            }
                            if (conditionalStyleRow.FontStyle
                                || conditionalStyleRow.FontWeight
                                || conditionalStyleRow.ForeColor
                                || conditionalStyleRow.FontSize) {
                                config.font = this.buildFontCSSShorthand(config.font, conditionalStyleRow);
                            }
                        }
                        if (conditionalStyleColumn) {
                            if (conditionalStyleColumn.BackColor) {
                                config.backgroundColor = conditionalStyleColumn.BackColor;
                            }
                            if (conditionalStyleColumn.ForeColor) {
                                config.color = conditionalStyleColumn.ForeColor;
                            }
                            if (conditionalStyleColumn.FontStyle
                                || conditionalStyleColumn.FontWeight
                                || conditionalStyleColumn.ForeColor
                                || conditionalStyleColumn.FontSize) {
                                config.font = this.buildFontCSSShorthand(config.font, conditionalStyleColumn);
                            }
                        }
                        if (quickSearchStyle) {
                            if (quickSearchStyle.BackColor) {
                                config.backgroundColor = quickSearchStyle.BackColor;
                            }
                            if (quickSearchStyle.ForeColor) {
                                config.color = quickSearchStyle.ForeColor;
                            }
                            if (quickSearchStyle.FontStyle
                                || quickSearchStyle.FontWeight
                                //   || quickSearchStyle.ForeColor (JW: I think this line is unnecessary and ditto above with conditional style)
                                || quickSearchStyle.FontSize) {
                                config.font = this.buildFontCSSShorthand(config.font, quickSearchStyle);
                            }
                        }
                        if (flashColor) {
                            config.backgroundColor = flashColor;
                        }
                    }
                }
                return originalGetCellReturn || this.hyperGrid.Bars.get(declaredRendererName);
            }
            catch (err) {
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("Error during GetCell", err);
            }
        };
        this.hyperGrid.addEventListener('fin-column-sort', (e) => {
            this.onSortSaved(e.detail.column);
            this.debouncedSetSelectedCells();
            //in case we want multi column
            //keys =  event.detail.keys;
            //    this.hyperGrid.behavior.reindex();
        });
        //We add our sorter pipe last into the existing pipeline
        let currentDataSources = this.hyperGrid.behavior.dataModel.DataSources;
        currentDataSources.push(FilterAndSearchDataSource_1.FilterAndSearchDataSource(this));
        currentDataSources.push(CustomSortDataSource_1.CustomSortDataSource(this));
        this.hyperGrid.setPipeline(currentDataSources, {
            stash: 'default',
            apply: false //  Set the new pipeline without calling reindex. We might need to reindex.... Not sure yet
        });
        this.hyperGrid.addEventListener("fin-column-changed-event", () => {
            setTimeout(() => this.setColumnIntoStore(), 5);
        });
    }
    getRowCount() {
        let data = this.hyperGrid.behavior.dataModel.getData();
        return data.length;
    }
    getColumnCount() {
        //       return this.hyperGrid.behavior.getActiveColumns().length + this.hyperGrid.behavior.getHiddenColumns().length
        return this.hyperGrid.behavior.dataModel.dataSource.getColumnCount();
    }
    getVisibleRowCount() {
        let indexData = this.hyperGrid.behavior.dataModel.getIndexedData();
        return indexData.length;
    }
    getVisibleColumnCount() {
        return this.hyperGrid.behavior.getActiveColumns().length;
    }
    selectColumn(columnId) {
        // still not got this working. i can select a column but it doesnt trigger the correct selections so nothing appens
        // it seems as though we can set the ColumnSelections and RowSelections collections but not the main Selection collection which is what we need
        // stupid stupid grid.
        //   let test = this.hyperGrid.selectionModel.getSelectedColumns()
        let index = this.hyperGrid.behavior.getActiveColumns().findIndex((c) => c.name == columnId);
        this.hyperGrid.selectionModel.clear();
        // not implementing until can work out how to do it!
        this.hyperGrid.selectionModel.selectColumn(index, index);
        this.hyperGrid.selectionModel.selectRow(index, index);
        this.hyperGrid.selectionModel.setLastSelectionType("cell");
        this.debouncedSetSelectedCells();
    }
    onSortSaved(gridColumnIndex) {
        let currentGridSorts = this.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts;
        let newGridSorts = [].concat(currentGridSorts);
        let column = this.hyperGrid.behavior.getActiveColumns()[gridColumnIndex].name;
        // not rigth for existing sorts in terms of turning off...
        let currentGridSort = newGridSorts.find(gs => gs.Column == column);
        if (currentGridSort) {
            // if exists and ascending make descending
            if (currentGridSort.SortOrder == Enums_1.SortOrder.Ascending) {
                currentGridSort.SortOrder = Enums_1.SortOrder.Descending;
            }
            else { // it exists and is descendig so need to 'turn off' (i.e.remove from colection)     
                let index = newGridSorts.findIndex(a => a.Column == currentGridSort.Column);
                newGridSorts.splice(index, 1);
            }
        }
        else {
            let newGridSort = { Column: column, SortOrder: Enums_1.SortOrder.Ascending };
            newGridSorts.push(newGridSort);
        }
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetSort(newGridSorts));
        this.hyperGrid.behavior.reindex();
    }
    setGridSort() {
        this.hyperGrid.behavior.reindex();
    }
    setGridData(data) {
        let schema = this.hyperGrid.behavior.dataModel.dataSource.schema;
        this.hyperGrid.behavior.dataModel.dataSource.setData(data, schema);
        this.ReindexAndRepaint();
    }
    getVendorGridState() {
        return null;
    }
    setVendorGridState(vendorGridState) {
        // todo - but we dont know how to ;(
    }
    isSelectable() {
        return true;
    }
    isSortable() {
        if (this.hyperGrid.properties.hasOwnProperty('unsortable')) {
            return !this.hyperGrid.behavior.unsortable;
        }
        return true;
    }
    isFilterable() {
        if (this.hyperGrid.properties.hasOwnProperty('filterable')) {
            return this.hyperGrid.behavior.filterable;
        }
        return true;
    }
    isQuickFilterable() {
        return false;
    }
    isQuickFilterActive() {
        return false;
    }
    showQuickFilter() {
        // todo
    }
    hideQuickFilter() {
        // todo
    }
    applyLightTheme() {
        if (this.BlotterOptions.useDefaultVendorGridThemes) {
            this.hyperGrid.addProperties(HypergridThemes_1.HypergridThemes.getLightTheme());
            this.applyAlternateRowStyle();
        }
    }
    applyDarkTheme() {
        if (this.BlotterOptions.useDefaultVendorGridThemes) {
            this.hyperGrid.addProperties(HypergridThemes_1.HypergridThemes.getDarkTheme());
            this.applyAlternateRowStyle();
        }
    }
    applyAlternateRowStyle() {
        var origgetCell = this.hyperGrid.behavior.dataModel.getCell;
        this.hyperGrid.behavior.dataModel.getCell = (config, declaredRendererName) => {
            if (config.isDataRow) {
                var y = config.dataCell.y;
                if (y % 2) {
                    config.backgroundColor = config.altbackground;
                }
            }
            return origgetCell.call(this.hyperGrid.behavior.dataModel, config, declaredRendererName);
        };
    }
    addPercentBar(pcr) {
        // to do
    }
    removePercentBar(pcr) {
        // todo
    }
    editPercentBar(pcr) {
        // todo
    }
    redraw() {
        this.ReindexAndRepaint();
    }
}
exports.AdaptableBlotter = AdaptableBlotter;
