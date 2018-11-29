"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import styles - ab and 2 default agGrid
require("../App_Scripts/Styles/stylesheets/adaptableblotter-style.css");
const ReactDOM = require("react-dom");
const _ = require("lodash");
const AdaptableBlotterView_1 = require("../App_Scripts/View/AdaptableBlotterView");
const StrategyConstants = require("../App_Scripts/Core/Constants/StrategyConstants");
const StyleConstants = require("../App_Scripts/Core/Constants/StyleConstants");
const ScreenPopups = require("../App_Scripts/Core/Constants/ScreenPopups");
const AdaptableBlotterStore_1 = require("../App_Scripts/Redux/Store/AdaptableBlotterStore");
const MenuRedux = require("../App_Scripts/Redux/ActionsReducers/MenuRedux");
const LayoutRedux = require("../App_Scripts/Redux/ActionsReducers/LayoutRedux");
const GridRedux = require("../App_Scripts/Redux/ActionsReducers/GridRedux");
const FreeTextColumnRedux = require("../App_Scripts/Redux/ActionsReducers/FreeTextColumnRedux");
const PopupRedux = require("../App_Scripts/Redux/ActionsReducers/PopupRedux");
const AuditLogService_1 = require("../App_Scripts/Utilities/Services/AuditLogService");
const StyleService_1 = require("../App_Scripts/Utilities/Services/StyleService");
const CalendarService_1 = require("../App_Scripts/Utilities/Services/CalendarService");
const AuditService_1 = require("../App_Scripts/Utilities/Services/AuditService");
const ValidationService_1 = require("../App_Scripts/Utilities/Services/ValidationService");
const ChartService_1 = require("../App_Scripts/Utilities/Services/ChartService");
const FreeTextColumnService_1 = require("../App_Scripts/Utilities/Services/FreeTextColumnService");
const CalculatedColumnExpressionService_1 = require("../App_Scripts/Utilities/Services/CalculatedColumnExpressionService");
const AlertStrategy_1 = require("../App_Scripts/Strategy/AlertStrategy");
const ApplicationStrategy_1 = require("../App_Scripts/Strategy/ApplicationStrategy");
const BulkUpdateStrategy_1 = require("../App_Scripts/Strategy/BulkUpdateStrategy");
const CustomSortagGridStrategy_1 = require("./Strategy/CustomSortagGridStrategy");
const SmartEditStrategy_1 = require("../App_Scripts/Strategy/SmartEditStrategy");
const ShortcutStrategy_1 = require("../App_Scripts/Strategy/ShortcutStrategy");
const DataManagementStrategy_1 = require("../App_Scripts/Strategy/DataManagementStrategy");
const PlusMinusStrategy_1 = require("../App_Scripts/Strategy/PlusMinusStrategy");
const ColumnChooserStrategy_1 = require("../App_Scripts/Strategy/ColumnChooserStrategy");
const ExportStrategy_1 = require("../App_Scripts/Strategy/ExportStrategy");
const FlashingCellsagGridStrategy_1 = require("./Strategy/FlashingCellsagGridStrategy");
const CalendarStrategy_1 = require("../App_Scripts/Strategy/CalendarStrategy");
const ConditionalStyleagGridStrategy_1 = require("./Strategy/ConditionalStyleagGridStrategy");
const QuickSearchagGridStrategy_1 = require("./Strategy/QuickSearchagGridStrategy");
const AdvancedSearchStrategy_1 = require("../App_Scripts/Strategy/AdvancedSearchStrategy");
const UserFilterStrategy_1 = require("../App_Scripts/Strategy/UserFilterStrategy");
const ColumnFilterStrategy_1 = require("../App_Scripts/Strategy/ColumnFilterStrategy");
const CellValidationStrategy_1 = require("../App_Scripts/Strategy/CellValidationStrategy");
const LayoutStrategy_1 = require("../App_Scripts/Strategy/LayoutStrategy");
const ThemeStrategy_1 = require("../App_Scripts/Strategy/ThemeStrategy");
const TeamSharingStrategy_1 = require("../App_Scripts/Strategy/TeamSharingStrategy");
const FormatColumnagGridStrategy_1 = require("./Strategy/FormatColumnagGridStrategy");
const ColumnInfoStrategy_1 = require("../App_Scripts/Strategy/ColumnInfoStrategy");
const DashboardStrategy_1 = require("../App_Scripts/Strategy/DashboardStrategy");
const CalculatedColumnStrategy_1 = require("../App_Scripts/Strategy/CalculatedColumnStrategy");
const SelectColumnStrategy_1 = require("../App_Scripts/Strategy/SelectColumnStrategy");
const SelectedCellsStrategy_1 = require("../App_Scripts/Strategy/SelectedCellsStrategy");
const DataSourceStrategy_1 = require("../App_Scripts/Strategy/DataSourceStrategy");
const HomeStrategy_1 = require("../App_Scripts/Strategy/HomeStrategy");
const FreeTextColumnStrategy_1 = require("../App_Scripts/Strategy/FreeTextColumnStrategy");
const ChartStrategy_1 = require("../App_Scripts/Strategy/ChartStrategy");
const PercentBarStrategy_1 = require("../App_Scripts/Strategy/PercentBarStrategy");
const ColumnCategoryStrategy_1 = require("../App_Scripts/Strategy/ColumnCategoryStrategy");
// components
const FilterWrapper_1 = require("./FilterWrapper");
const FloatingFilterWrapper_1 = require("./FloatingFilterWrapper");
const EventDispatcher_1 = require("../App_Scripts/Core/EventDispatcher");
const Enums_1 = require("../App_Scripts/Utilities/Enums");
const ObjectFactory_1 = require("../App_Scripts/Utilities/ObjectFactory");
const color_1 = require("../App_Scripts/Utilities/color");
const BlotterApi_1 = require("./BlotterApi");
// Helpers
const DefaultAdaptableBlotterOptions_1 = require("../App_Scripts/Api/DefaultAdaptableBlotterOptions");
const iPushPullHelper_1 = require("../App_Scripts/Utilities/Helpers/iPushPullHelper");
const ColumnHelper_1 = require("../App_Scripts/Utilities/Helpers/ColumnHelper");
const StyleHelper_1 = require("../App_Scripts/Utilities/Helpers/StyleHelper");
const LayoutHelper_1 = require("../App_Scripts/Utilities/Helpers/LayoutHelper");
const ExpressionHelper_1 = require("../App_Scripts/Utilities/Helpers/ExpressionHelper");
const eventKeys_1 = require("ag-grid/dist/lib/eventKeys");
const LoggingHelper_1 = require("../App_Scripts/Utilities/Helpers/LoggingHelper");
const StringExtensions_1 = require("../App_Scripts/Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../App_Scripts/Utilities/Extensions/ArrayExtensions");
class AdaptableBlotter {
    constructor(blotterOptions, renderGrid = true) {
        this.calculatedColumnPathMap = new Map();
        this._onKeyDown = new EventDispatcher_1.EventDispatcher();
        this._onGridDataBound = new EventDispatcher_1.EventDispatcher();
        this._onSelectedCellsChanged = new EventDispatcher_1.EventDispatcher();
        this._onRefresh = new EventDispatcher_1.EventDispatcher();
        this.SearchedChanged = new EventDispatcher_1.EventDispatcher();
        this.StateChanged = new EventDispatcher_1.EventDispatcher();
        this.ColumnStateChanged = new EventDispatcher_1.EventDispatcher();
        this.debouncedSetColumnIntoStore = _.debounce(() => this.setColumnIntoStore(), 500);
        this.debouncedSaveGridLayout = _.debounce(() => this.saveGridLayout(), 500);
        this.debouncedSetSelectedCells = _.debounce(() => this.setSelectedCells(), 500);
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions, blotterOptions);
        this.gridOptions = this.BlotterOptions.vendorGrid;
        this.VendorGridName = 'agGrid';
        this.EmbedColumnMenu = true;
        this.isInitialised = false;
        // create the store
        this.AdaptableBlotterStore = new AdaptableBlotterStore_1.AdaptableBlotterStore(this);
        // create the services
        this.CalendarService = new CalendarService_1.CalendarService(this);
        this.AuditService = new AuditService_1.AuditService(this);
        this.ValidationService = new ValidationService_1.ValidationService(this);
        this.AuditLogService = new AuditLogService_1.AuditLogService(this, this.BlotterOptions);
        this.StyleService = new StyleService_1.StyleService(this);
        this.ChartService = new ChartService_1.ChartService(this);
        this.FreeTextColumnService = new FreeTextColumnService_1.FreeTextColumnService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService_1.CalculatedColumnExpressionService(this, (columnId, record) => this.gridOptions.api.getValue(columnId, record));
        // get the api ready
        this.api = new BlotterApi_1.BlotterApi(this);
        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map();
        this.Strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategy_1.AlertStrategy(this));
        this.Strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy_1.AdvancedSearchStrategy(this));
        this.Strategies.set(StrategyConstants.ApplicationStrategyId, new ApplicationStrategy_1.ApplicationStrategy(this));
        this.Strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy_1.BulkUpdateStrategy(this));
        this.Strategies.set(StrategyConstants.CalculatedColumnStrategyId, new CalculatedColumnStrategy_1.CalculatedColumnStrategy(this));
        this.Strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy_1.CalendarStrategy(this));
        this.Strategies.set(StrategyConstants.PercentBarStrategyId, new PercentBarStrategy_1.PercentBarStrategy(this));
        this.Strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy_1.CellValidationStrategy(this));
        this.Strategies.set(StrategyConstants.ChartStrategyId, new ChartStrategy_1.ChartStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy_1.ColumnChooserStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy_1.ColumnFilterStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy_1.ColumnInfoStrategy(this));
        this.Strategies.set(StrategyConstants.ConditionalStyleStrategyId, new ConditionalStyleagGridStrategy_1.ConditionalStyleagGridStrategy(this));
        this.Strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortagGridStrategy_1.CustomSortagGridStrategy(this));
        this.Strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy_1.DashboardStrategy(this));
        this.Strategies.set(StrategyConstants.DataManagementStrategyId, new DataManagementStrategy_1.DataManagementStrategy(this));
        this.Strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy_1.DataSourceStrategy(this));
        this.Strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy_1.ExportStrategy(this));
        this.Strategies.set(StrategyConstants.FlashingCellsStrategyId, new FlashingCellsagGridStrategy_1.FlashingCellsagGridStrategy(this));
        this.Strategies.set(StrategyConstants.FormatColumnStrategyId, new FormatColumnagGridStrategy_1.FormatColumnagGridStrategy(this));
        this.Strategies.set(StrategyConstants.FreeTextColumnStrategyId, new FreeTextColumnStrategy_1.FreeTextColumnStrategy(this));
        this.Strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy_1.HomeStrategy(this));
        this.Strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy_1.LayoutStrategy(this));
        this.Strategies.set(StrategyConstants.ColumnCategoryStrategyId, new ColumnCategoryStrategy_1.ColumnCategoryStrategy(this));
        this.Strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy_1.PlusMinusStrategy(this));
        this.Strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchagGridStrategy_1.QuickSearchagGridStrategy(this));
        this.Strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy_1.SmartEditStrategy(this));
        this.Strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy_1.ShortcutStrategy(this));
        this.Strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy_1.TeamSharingStrategy(this));
        this.Strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy_1.ThemeStrategy(this));
        this.Strategies.set(StrategyConstants.SelectColumnStrategyId, new SelectColumnStrategy_1.SelectColumnStrategy(this));
        this.Strategies.set(StrategyConstants.SelectedCellsStrategyId, new SelectedCellsStrategy_1.SelectedCellsStrategy(this));
        this.Strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy_1.UserFilterStrategy(this));
        iPushPullHelper_1.iPushPullHelper.isIPushPullLoaded(this.BlotterOptions.iPushPullConfig);
        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()), (e) => {
            LoggingHelper_1.LoggingHelper.LogError('Failed to Init AdaptableBlotterStore : ', e);
            //for now we initiliaze the strategies even if loading state has failed (perhaps revisit this?) 
            this.Strategies.forEach(strat => strat.InitializeWithRedux());
        })
            .then(() => this.initInternalGridLogic(), (e) => {
            LoggingHelper_1.LoggingHelper.LogError('Failed to Init Strategies : ', e);
            //for now we initiliaze the grid even if initialising strategies has failed (perhaps revisit this?) 
            this.initInternalGridLogic();
        })
            .then(() => {
            // at the end so load the current layout, refresh the toolbar and turn off the loading message
            let currentlayout = this.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout;
            this.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(currentlayout));
            if (this.gridOptions.floatingFilter) { // sometimes the header row looks wrong when using floating filter so to be sure...
                this.gridOptions.api.refreshHeader();
            }
            this.isInitialised = true;
            this.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupHideLoading());
        });
        if (renderGrid) {
            if (this.abContainerElement == null) {
                this.abContainerElement = document.getElementById(this.BlotterOptions.adaptableBlotterContainer);
            }
            if (this.abContainerElement != null) {
                this.abContainerElement.innerHTML = "";
                ReactDOM.render(AdaptableBlotterView_1.AdaptableBlotterApp({ AdaptableBlotter: this }), this.abContainerElement);
            }
        }
    }
    getState() {
        return this.AdaptableBlotterStore.TheStore.getState();
    }
    createFilterWrapper(col) {
        this.gridOptions.api.destroyFilter(col);
        this.gridOptions.api.getColumnDef(col).filter = FilterWrapper_1.FilterWrapperFactory(this);
        col.initialise();
    }
    createFloatingFilterWrapper(col) {
        this.gridOptions.api.getColumnDef(col).floatingFilterComponentParams = { suppressFilterButton: false };
        this.gridOptions.api.getColumnDef(col).floatingFilterComponent = FloatingFilterWrapper_1.FloatingFilterWrapperFactory(this);
    }
    InitAuditService() {
        //Probably Temporary but we init the Audit service with current data
        this.AuditService.Init(this.gridOptions.rowData);
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
    applyGridFiltering() {
        if (this.isFilterable()) {
            this.gridOptions.api.onFilterChanged();
            this._onRefresh.Dispatch(this, this);
        }
        else {
            LoggingHelper_1.LoggingHelper.LogError('Trying to filter on a non-filterable grid.');
        }
    }
    clearGridFiltering() {
        this.gridOptions.columnApi.getAllColumns().forEach(c => {
            c.setFilterActive(false);
        });
    }
    clearColumnFiltering(columnIds) {
        columnIds.forEach(c => {
            let column = this.gridOptions.columnApi.getAllColumns().find(col => col.getColId() == c);
            if (column) {
                column.setFilterActive(false);
            }
        });
    }
    hideFilterForm() {
        if (this.hideFilterFormPopup) {
            this.hideFilterFormPopup();
        }
    }
    setNewColumnListOrder(VisibleColumnList) {
        let allColumns = this.gridOptions.columnApi.getAllGridColumns();
        let startIndex = 0;
        //  this is not quite right as it assumes that only the first column can be grouped 
        //  but lets do this for now and then refine and refactor later to deal with weirder use cases
        if (ColumnHelper_1.ColumnHelper.isSpecialColumn(allColumns[0].getColId())) {
            startIndex++;
        }
        VisibleColumnList.forEach((column, index) => {
            let col = this.gridOptions.columnApi.getColumn(column.ColumnId);
            if (!col.isVisible()) {
                this.setColumnVisible(this.gridOptions.columnApi, col, true, "api");
            }
            this.moveColumn(this.gridOptions.columnApi, col, startIndex + index, "api");
        });
        allColumns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.getColId()) < 0).forEach((col => {
            this.setColumnVisible(this.gridOptions.columnApi, col, false, "api");
        }));
        // we need to do this to make sure agGrid and Blotter column collections are in sync
        this.setColumnIntoStore();
    }
    setColumnIntoStore() {
        let allColumns = [];
        let existingColumns = this.getState().Grid.Columns;
        let vendorCols = this.gridOptions.columnApi.getAllGridColumns();
        let quickSearchClassName = this.getQuickSearchClassName();
        vendorCols.forEach((vendorColumn) => {
            let colId = vendorColumn.getColId();
            if (!ColumnHelper_1.ColumnHelper.isSpecialColumn(colId)) {
                let existingColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, existingColumns);
                if (existingColumn) {
                    existingColumn.Visible = vendorColumn.isVisible();
                }
                else {
                    existingColumn = this.createColumn(vendorColumn, quickSearchClassName);
                }
                allColumns.push(existingColumn);
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetColumns(allColumns));
    }
    createColumn(vendorColumn, quickSearchClassName) {
        let colId = vendorColumn.getColId();
        let abColumn = {
            ColumnId: colId,
            FriendlyName: this.gridOptions.columnApi.getDisplayNameForColumn(vendorColumn, 'header'),
            DataType: this.getColumnDataType(vendorColumn),
            Visible: vendorColumn.isVisible(),
            ReadOnly: this.isColumnReadonly(colId),
            Sortable: this.isColumnSortable(colId),
            Filterable: this.isColumnFilterable(colId),
        };
        this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
        return abColumn;
    }
    getQuickSearchClassName() {
        let blotter = this;
        let quickSearchClassName = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Style.ClassName) ?
            blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Style.ClassName :
            StyleHelper_1.StyleHelper.CreateStyleName(StrategyConstants.QuickSearchStrategyId, this);
        return quickSearchClassName;
    }
    addQuickSearchStyleToColumn(col, quickSearchClassName) {
        let blotter = this;
        let cellClassRules = {};
        cellClassRules[quickSearchClassName] = function (params) {
            let columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
            let quickSearchState = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)
                && (quickSearchState.DisplayAction == Enums_1.DisplayAction.HighlightCell
                    || quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRowAndHighlightCell)) {
                let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                let displayValue = blotter.getDisplayValueFromRecord(params.node, columnId);
                if (displayValue) {
                    let stringValueLowerCase = displayValue.toLowerCase();
                    switch (blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.Operator) {
                        case Enums_1.LeafExpressionOperator.Contains:
                            {
                                if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                    return true;
                                }
                            }
                            break;
                        case Enums_1.LeafExpressionOperator.StartsWith:
                            {
                                if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                    return true;
                                }
                            }
                            break;
                    }
                }
            }
            return false;
        };
        this.setCellClassRules(cellClassRules, col.ColumnId, "QuickSearch");
    }
    createMenu() {
        let menuItems = [];
        this.Strategies.forEach(x => {
            let menuItem = x.getPopupMenuItem();
            if (menuItem != null) {
                if (menuItems.findIndex(m => m.StrategyId == menuItem.StrategyId) == -1) {
                    menuItems.push(menuItem);
                }
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.SetMenuItems(menuItems));
    }
    getPrimaryKeyValueFromRecord(record) {
        return this.gridOptions.api.getValue(this.BlotterOptions.primaryKey, record);
    }
    gridHasCurrentEditValue() {
        if (this._currentEditor) {
            return true;
        }
        return false;
    }
    getCurrentCellEditValue() {
        //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
        if (this._currentEditor) {
            return this._currentEditor.getValue();
        }
        return "";
    }
    getActiveCell() {
        let activeCell = this.gridOptions.api.getFocusedCell();
        if (activeCell) {
            let rowNode = this.gridOptions.api.getModel().getRow(activeCell.rowIndex);
            //if the selected cell is from a group cell we don't return it
            //that's a design choice as this is used only when editing and you cant edit those cells
            if (rowNode && !rowNode.group) {
                return {
                    ColumnId: activeCell.column.getColId(),
                    Id: this.getPrimaryKeyValueFromRecord(rowNode),
                    Value: this.gridOptions.api.getValue(activeCell.column, rowNode)
                };
            }
        }
    }
    saveGridLayout() {
        if (this.BlotterOptions.includeVendorStateInLayouts) {
            LayoutHelper_1.LayoutHelper.autoSaveLayout(this);
        }
    }
    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns nothing
    setSelectedCells() {
        let selectionMap = new Map();
        let test = this.gridOptions.api.getSelectedNodes();
        let selected = this.gridOptions.api.getRangeSelections();
        let columns = [];
        if (selected) {
            //we iterate for each ranges
            selected.forEach((rangeSelection, index) => {
                let y1 = Math.min(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex);
                let y2 = Math.max(rangeSelection.start.rowIndex, rangeSelection.end.rowIndex);
                for (let column of rangeSelection.columns) {
                    let colId = column.getColId();
                    if (index == 0) {
                        let selectedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, this.getState().Grid.Columns);
                        columns.push(selectedColumn);
                    }
                    for (let rowIndex = y1; rowIndex <= y2; rowIndex++) {
                        let rowNode = this.gridOptions.api.getModel().getRow(rowIndex);
                        //if the selected cells are from a group cell we don't return it
                        //that's a design choice as this is used only when editing and you cant edit those cells
                        if (rowNode && !rowNode.group) {
                            let primaryKey = this.getPrimaryKeyValueFromRecord(rowNode);
                            let value = this.gridOptions.api.getValue(column, rowNode);
                            let valueArray = selectionMap.get(primaryKey);
                            if (valueArray == undefined) {
                                valueArray = [];
                                selectionMap.set(primaryKey, valueArray);
                            }
                            let selectedCellInfo = { columnId: colId, value: value };
                            valueArray.push(selectedCellInfo);
                        }
                    }
                }
            });
        }
        let selectedCells = { Columns: columns, Selection: selectionMap };
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetSelectedCells(selectedCells));
        this._onSelectedCellsChanged.Dispatch(this, this);
    }
    //We deduce the type here, as there is no way to get it through the definition
    getColumnDataType(column) {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            LoggingHelper_1.LoggingHelper.LogMessage('column is undefined returning String for Type');
            return Enums_1.DataType.String;
        }
        // get the column type if already in store (and not unknown)
        let existingColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(column.getId(), this.getState().Grid.Columns);
        if (existingColumn && existingColumn.DataType != Enums_1.DataType.Unknown) {
            return existingColumn.DataType;
        }
        // check for column type
        let colType = column.getColDef().type;
        if (colType) {
            let isArray = Array.isArray(colType);
            if (isArray) {
                // do array check
                let myDatatype = Enums_1.DataType.Unknown;
                colType.forEach((c) => {
                    if (c.startsWith("abColDef")) {
                        myDatatype = this.getabColDefValue(c);
                    }
                });
                if (myDatatype != Enums_1.DataType.Unknown) {
                    return myDatatype;
                }
            }
            else {
                // do string check
                if (colType.startsWith("abColDef")) {
                    return this.getabColDefValue(colType);
                }
            }
        }
        let row = this.gridOptions.api.getModel().getRow(0);
        if (row == null) { // possible that there will be no data.
            LoggingHelper_1.LoggingHelper.LogWarning('there is no first row so we are returning Unknown for Type');
            return Enums_1.DataType.Unknown;
        }
        //if it's a group we need the content of the group
        if (row.group) {
            row = row.childrenAfterGroup[0];
        }
        let value = this.gridOptions.api.getValue(column, row);
        let dataType;
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
        LoggingHelper_1.LoggingHelper.LogMessage("No defined type for column '" + column.getColId() + "'. Defaulting to type of first value: " + dataType);
        return dataType;
    }
    getabColDefValue(colType) {
        switch (colType) {
            case 'abColDefNumber':
                return Enums_1.DataType.Number;
            case 'abColDefString':
                return Enums_1.DataType.String;
            case 'abColDefBoolean':
                return Enums_1.DataType.Boolean;
            case 'abColDefDate':
                return Enums_1.DataType.Date;
            case 'abColDefObject':
                return Enums_1.DataType.Object;
        }
    }
    setValue(cellInfo) {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            if (cellInfo.Id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                let oldValue = this.gridOptions.api.getValue(cellInfo.ColumnId, rowNode);
                rowNode.setDataValue(cellInfo.ColumnId, cellInfo.Value);
                // this seems to loop unnecessarily... ????
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
        });
        this.applyGridFiltering();
        this.gridOptions.api.clearRangeSelection();
    }
    setValueBatch(batchValues) {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        // using new method... (JW, 11/3/18)
        var itemsToUpdate = [];
        var dataChangedEvents = [];
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            let value = batchValues.find(x => x.Id == this.getPrimaryKeyValueFromRecord(rowNode));
            if (value) {
                let oldValue = this.gridOptions.api.getValue(value.ColumnId, rowNode);
                var data = rowNode.data;
                data[value.ColumnId] = value.Value;
                itemsToUpdate.push(data);
                let dataChangedEvent = {
                    OldValue: oldValue,
                    NewValue: value.Value,
                    ColumnId: value.ColumnId,
                    IdentifierValue: value.Id,
                    Timestamp: null,
                    Record: null
                };
                dataChangedEvents.push(dataChangedEvent);
                this.checkIfDataChangingColumnIsFreeText(dataChangedEvent);
            }
        });
        this.AuditLogService.AddEditCellAuditLogBatch(dataChangedEvents);
        dataChangedEvents.forEach(dc => this.AuditService.CreateAuditChangedEvent(dc));
        // if its a freetext column then do our own stuff
        this.applyGridFiltering();
        this.gridOptions.api.clearRangeSelection();
    }
    cancelEdit() {
        this.gridOptions.api.stopEditing(true);
    }
    getRecordIsSatisfiedFunction(id, distinctCriteria) {
        if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
            let rowNodeSearch;
            //ag-grid doesn't support FindRow based on data
            // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
            this.gridOptions.api.getModel().forEachNode(rowNode => {
                if (id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                    rowNodeSearch = rowNode;
                }
            });
            return (columnId) => { return this.gridOptions.api.getValue(columnId, rowNodeSearch); };
        }
        else {
            return (columnId) => { return this.getDisplayValue(id, columnId); };
        }
    }
    getRecordIsSatisfiedFunctionFromRecord(record, distinctCriteria) {
        if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
            return (columnId) => { return this.gridOptions.api.getValue(columnId, record); };
        }
        else {
            return (columnId) => { return this.getDisplayValueFromRecord(record, columnId); };
        }
    }
    getColumnIndex(columnId) {
        return null;
    }
    isColumnReadonly(columnId) {
        //same as hypergrid. we do not support the fact that some rows are editable and some are not
        //if editable is a function then we return that its not readonly since we assume that some record will be editable
        //that's wrong but we ll see if we face the issue later
        //also looks like the column object already has the Iseditable function... need to check that
        let colDef = this.gridOptions.api.getColumnDef(columnId);
        if (typeof colDef.editable == 'boolean') {
            return !colDef.editable;
        }
        else {
            return true;
        }
    }
    isColumnSortable(columnId) {
        if (!this.isSortable()) {
            return false;
        }
        let colDef = this.gridOptions.api.getColumnDef(columnId);
        if (colDef.suppressSorting != null) {
            return !colDef.suppressSorting;
        }
        return true;
    }
    isColumnFilterable(columnId) {
        if (!this.isFilterable()) {
            return false;
        }
        let colDef = this.gridOptions.api.getColumnDef(columnId);
        if (colDef.suppressFilter != null) {
            return !colDef.suppressFilter;
        }
        return true;
    }
    setCustomSort(columnId, comparer) {
        let sortModel = this.gridOptions.api.getSortModel();
        let columnDef = this.gridOptions.api.getColumnDef(columnId);
        if (columnDef) {
            columnDef.comparator = comparer;
        }
        this.gridOptions.api.setSortModel(sortModel);
    }
    removeCustomSort(columnId) {
        let sortModel = this.gridOptions.api.getSortModel();
        let columnDef = this.gridOptions.api.getColumnDef(columnId);
        if (columnDef) {
            columnDef.comparator = null;
        }
        this.gridOptions.api.setSortModel(sortModel);
    }
    getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) {
        let returnMap = new Map();
        // check if there are permitted column values for that column
        let permittedValues = this.getState().UserInterface.PermittedColumnValues;
        let permittedValuesForColumn = permittedValues.find(pc => pc.ColumnId == columnId);
        if (permittedValuesForColumn) {
            permittedValuesForColumn.PermittedValues.forEach(pv => {
                returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
            });
        }
        else { // get the distinct values for the column from the grid
            //we use forEachNode as we want to get all data even the one filtered out...
            let useRawValue = this.useRawValueForColumn(columnId);
            let data = this.gridOptions.api.forEachNode(rowNode => {
                //we do not return the values of the aggregates when in grouping mode
                //otherwise they wxould appear in the filter dropdown etc....
                if (!rowNode.group) {
                    let rawValue = this.gridOptions.api.getValue(columnId, rowNode);
                    let displayValue = (useRawValue) ?
                        rawValue :
                        this.getDisplayValueFromRecord(rowNode, columnId);
                    if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
                        returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
                    }
                    else if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.DisplayValue) {
                        returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
                    }
                }
            });
        }
        return Array.from(returnMap.values()).slice(0, this.BlotterOptions.maxColumnValueItemsDisplayed);
    }
    useRawValueForColumn(columnId) {
        // will add more in due course I'm sure but for now only percent bar columns return false...
        return ArrayExtensions_1.ArrayExtensions.ContainsItem(this.getState().PercentBar.PercentBars, columnId);
    }
    getDisplayValue(id, columnId) {
        //ag-grid doesn't support FindRow based on data
        // so we use the foreach rownode and apparently it doesn't cause perf issues.... but we'll see
        let returnValue;
        let foundRow = false;
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            if (!foundRow && id == this.getPrimaryKeyValueFromRecord(rowNode)) {
                returnValue = this.getDisplayValueFromRecord(rowNode, columnId);
                foundRow = true;
            }
        });
        return returnValue;
    }
    getDisplayValueFromRecord(row, columnId) {
        if (row == null) {
            return "";
        }
        let rawValue = this.gridOptions.api.getValue(columnId, row);
        return this.getDisplayValueFromRawValue(columnId, rawValue);
    }
    getDisplayValueFromRawValue(columnId, rawValue) {
        let colDef = this.gridOptions.api.getColumnDef(columnId);
        let column = this.gridOptions.columnApi.getAllColumns().find(c => c.getColId() == columnId);
        if (colDef.valueFormatter) {
            let formatter = colDef.valueFormatter;
            let params = {
                value: rawValue,
                node: null,
                data: null,
                colDef: colDef,
                column: column,
                api: this.gridOptions.api,
                columnApi: this.gridOptions.columnApi,
                context: null
            };
            let formattedValue = formatter(params);
            if (colDef.cellRenderer) {
                return this.getRenderedValue(colDef, formattedValue);
            }
            return formattedValue || "";
        }
        else if (colDef.cellRenderer) {
            return this.getRenderedValue(colDef, rawValue);
        }
        else {
            return this.cleanValue(rawValue);
        }
    }
    getRenderedValue(colDef, valueToRender) {
        let isRenderedColumn = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.getState().PercentBar.PercentBars, colDef.field);
        if (isRenderedColumn) {
            return valueToRender;
        }
        let render = colDef.cellRenderer;
        if (typeof render == "string") {
            return this.cleanValue(valueToRender);
        }
        return render({ value: valueToRender }) || "";
    }
    cleanValue(value) {
        if (value == null || value == 'null') {
            return null;
        }
        else if (value == undefined || value == 'undefined') {
            return undefined;
        }
        else {
            return String(value) || "";
        }
    }
    getRawValueFromRecord(row, columnId) {
        return this.gridOptions.api.getValue(columnId, row);
    }
    setCellClassRules(cellClassRules, columnId, type) {
        let localCellClassRules = this.gridOptions.columnApi.getColumn(columnId).getColDef().cellClassRules;
        if (localCellClassRules) {
            if (type == "FormatColumn") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyConstants.FormatColumnStrategyId)) {
                        delete localCellClassRules[prop];
                    }
                }
            }
            else if (type == "ConditionalStyle") {
                let cssStyles = this.getState().ConditionalStyle.ConditionalStyles.map(c => c.Style.ClassName);
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyConstants.ConditionalStyleStrategyId) || ArrayExtensions_1.ArrayExtensions.ContainsItem(cssStyles, prop)) {
                        delete localCellClassRules[prop];
                    }
                }
            }
            //Is initialized in setColumnIntoStore
            else if (type == "QuickSearch") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StrategyConstants.QuickSearchStrategyId)) {
                        delete localCellClassRules[prop];
                    }
                }
            }
            //Is initialized in Flash
            else if (type == "FlashingCell") {
                for (let prop in localCellClassRules) {
                    if (prop.includes(StyleConstants.FLASH_UP_STYLE)) {
                        delete localCellClassRules[prop];
                    }
                    if (prop.includes(StyleConstants.FLASH_DOWN_STYLE)) {
                        delete localCellClassRules[prop];
                    }
                }
            }
            for (let prop in cellClassRules) {
                localCellClassRules[prop] = cellClassRules[prop];
            }
        }
        else {
            this.gridOptions.columnApi.getColumn(columnId).getColDef().cellClassRules = cellClassRules;
        }
    }
    forAllRecordsDo(func) {
        this.gridOptions.api.getModel().forEachNode(rowNode => {
            func(rowNode);
        });
    }
    forAllVisibleRecordsDo(func) {
        this.gridOptions.api.forEachNodeAfterFilterAndSort(rowNode => {
            func(rowNode);
        });
    }
    redraw() {
        this.gridOptions.api.redrawRows();
        this.gridOptions.api.refreshHeader();
        this._onRefresh.Dispatch(this, this);
    }
    refreshCells(rowNode, columnIds) {
        this.gridOptions.api.refreshCells({ rowNodes: [rowNode], columns: columnIds, force: true });
    }
    editCalculatedColumnInGrid(calculatedColumn) {
        // first change the value getter in the coldefs - nothing else needs to change
        let colDefs = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef());
        let colDefIndex = colDefs.findIndex(x => x.headerName == calculatedColumn.ColumnId);
        let newColDef = colDefs[colDefIndex];
        newColDef.valueGetter = (params) => this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, params.node);
        colDefs[colDefIndex] = newColDef;
        this.gridOptions.api.setColumnDefs(colDefs);
        // for column list its an itnernal map only so we can first delete
        for (let columnList of this.calculatedColumnPathMap.values()) {
            let index = columnList.indexOf(calculatedColumn.ColumnId);
            if (index > -1) {
                columnList.splice(index, 1);
            }
        }
        // and then add
        let columnList = this.CalculatedColumnExpressionService.getColumnListFromExpression(calculatedColumn.ColumnExpression);
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column);
            if (!childrenColumnList) {
                childrenColumnList = [];
                this.calculatedColumnPathMap.set(column, childrenColumnList);
            }
            childrenColumnList.push(calculatedColumn.ColumnId);
        }
    }
    removeCalculatedColumnFromGrid(calculatedColumnID) {
        let colDefs = this.gridOptions.columnApi.getAllColumns().map(x => x.getColDef());
        let colDefIndex = colDefs.findIndex(x => x.headerName == calculatedColumnID);
        if (colDefIndex > -1) {
            colDefs.splice(colDefIndex, 1);
            this.gridOptions.api.setColumnDefs(colDefs);
        }
        for (let columnList of this.calculatedColumnPathMap.values()) {
            let index = columnList.indexOf(calculatedColumnID);
            if (index > -1) {
                columnList.splice(index, 1);
            }
        }
        this.setColumnIntoStore();
    }
    addCalculatedColumnToGrid(calculatedColumn) {
        let venderCols = this.gridOptions.columnApi.getAllColumns();
        let colDefs = venderCols.map(x => x.getColDef());
        colDefs.push({
            headerName: calculatedColumn.ColumnId,
            colId: calculatedColumn.ColumnId,
            hide: true,
            valueGetter: (params) => this.CalculatedColumnExpressionService.ComputeExpressionValue(calculatedColumn.ColumnExpression, params.node)
        });
        this.gridOptions.api.setColumnDefs(colDefs);
        let columnList = this.CalculatedColumnExpressionService.getColumnListFromExpression(calculatedColumn.ColumnExpression);
        for (let column of columnList) {
            let childrenColumnList = this.calculatedColumnPathMap.get(column);
            if (!childrenColumnList) {
                childrenColumnList = [];
                this.calculatedColumnPathMap.set(column, childrenColumnList);
            }
            childrenColumnList.push(calculatedColumn.ColumnId);
        }
        this.addSpecialColumnToState(calculatedColumn.ColumnId, true);
    }
    addFreeTextColumnToGrid(freeTextColumn) {
        let venderCols = this.gridOptions.columnApi.getAllColumns();
        let colDefs = venderCols.map(x => x.getColDef());
        colDefs.push({
            headerName: freeTextColumn.ColumnId,
            colId: freeTextColumn.ColumnId,
            editable: true,
            hide: true,
            valueGetter: (params) => this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, params.node)
        });
        this.gridOptions.api.setColumnDefs(colDefs);
        this.addSpecialColumnToState(freeTextColumn.ColumnId, false);
    }
    addSpecialColumnToState(columnId, isReadOnly) {
        let vendorColumn = this.gridOptions.columnApi.getAllColumns().find(vc => vc.getColId() == columnId);
        let specialColumn = {
            ColumnId: columnId,
            FriendlyName: columnId,
            DataType: this.getColumnDataType(vendorColumn),
            Visible: false,
            ReadOnly: isReadOnly,
            Sortable: this.isSortable(),
            Filterable: this.isFilterable(),
        };
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridAddColumn(specialColumn));
        let quickSearchClassName = this.getQuickSearchClassName();
        this.addQuickSearchStyleToColumn(specialColumn, quickSearchClassName);
        if (this.isFilterable() && this.BlotterOptions.useAdaptableBlotterFilterForm) {
            this.createFilterWrapper(vendorColumn);
        }
        if (this.isInitialised) {
            let conditionalStyleagGridStrategy = this.Strategies.get(StrategyConstants.ConditionalStyleStrategyId);
            conditionalStyleagGridStrategy.InitStyles();
        }
    }
    isGroupRecord(record) {
        let rowNode = record;
        return rowNode.group;
    }
    getFirstRecord() {
        let record;
        this.gridOptions.api.forEachNode(rowNode => {
            if (!rowNode.group) {
                if (!record) {
                    record = rowNode;
                }
            }
        });
        return record;
    }
    destroy() {
        if (this.abContainerElement != null) {
            ReactDOM.unmountComponentAtNode(this.abContainerElement);
        }
    }
    //TEMPORARY : JO
    getIPPStyle() {
        let headerFirstCol = document.querySelectorAll(".ag-header-cell").item(0);
        let header = document.querySelector(".ag-header");
        let headerColStyle = window.getComputedStyle(header, null);
        let firstRow = document.querySelector(".ag-row-even");
        let firstRowStyle = window.getComputedStyle(firstRow, null);
        let secondRow = document.querySelector(".ag-row-odd");
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
                Columns: this.getState().Grid.Columns.map(col => {
                    let headerColumn = document.querySelector(".ag-header-cell[col-id='" + col.ColumnId + "']");
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
                Columns: this.getState().Grid.Columns.map(col => {
                    let cellElement = document.querySelector(".ag-cell[col-id='" + col.ColumnId + "']");
                    let headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null);
                    return { columnFriendlyName: col.FriendlyName, width: Number(headerColumnStyle.width.replace("px", "")), textAlign: headerColumnStyle.textAlign };
                })
            },
        };
    }
    initInternalGridLogic() {
        if (this.abContainerElement == null) {
            this.abContainerElement = document.getElementById(this.BlotterOptions.adaptableBlotterContainer);
        }
        if (this.abContainerElement == null) {
            LoggingHelper_1.LoggingHelper.LogError("There is no Div called " + this.BlotterOptions.adaptableBlotterContainer + " so cannot render the Adaptable Blotter");
            return;
        }
        let gridContainerElement = document.getElementById(this.BlotterOptions.vendorContainer);
        if (gridContainerElement) {
            gridContainerElement.addEventListener("keydown", (event) => this._onKeyDown.Dispatch(this, event));
        }
        // vendorGrid.api.addGlobalListener((type: string, event: any) => {
        //     //console.log(event)
        // });
        //we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type 
        //since there are many events and we want them to behave the same
        let columnEventsThatTriggersStateChange = [
            eventKeys_1.Events.EVENT_COLUMN_MOVED,
            eventKeys_1.Events.EVENT_GRID_COLUMNS_CHANGED,
            eventKeys_1.Events.EVENT_COLUMN_EVERYTHING_CHANGED,
            eventKeys_1.Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
            //   Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            eventKeys_1.Events.EVENT_COLUMN_VISIBLE,
            //   Events.EVENT_COLUMN_PINNED,
            eventKeys_1.Events.EVENT_NEW_COLUMNS_LOADED
        ];
        this.gridOptions.api.addGlobalListener((type) => {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                // bit messy but better than alternative which was calling setColumnIntoStore for every single column
                let popupState = this.getState().Popup.ScreenPopup;
                if (popupState.ShowScreenPopup && (popupState.ComponentName == ScreenPopups.ColumnChooserPopup || ScreenPopups.CalculatedColumnPopup)) {
                    // ignore
                }
                else {
                    this.debouncedSetColumnIntoStore(); // was: this.setColumnIntoStore();
                }
            }
        });
        // Pinning columms and changing column widths will trigger an auto save (if that and includvendorstate are both turned on)
        let columnEventsThatTriggersAutoLayoutSave = [
            eventKeys_1.Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            eventKeys_1.Events.EVENT_COLUMN_PINNED
        ];
        this.gridOptions.api.addGlobalListener((type) => {
            if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
                this.debouncedSaveGridLayout();
            }
        });
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_CELL_EDITING_STARTED, (params) => {
            //TODO: Jo: This is a workaround as we are accessing private members of agGrid.
            let editor = this.gridOptions.api.rowRenderer.rowCompsByIndex[params.node.rowIndex].cellComps[params.column.getColId()].cellEditor;
            //No need to register for the keydown on the editor since we already register on the main div
            //TODO: check that it works when edit is popup. That's why I left the line below
            //editor.getGui().addEventListner("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = editor;
            //if there was already an implementation set by the dev we keep the reference to it and execute it at the end
            let oldIsCancelAfterEnd = this._currentEditor.isCancelAfterEnd;
            let isCancelAfterEnd = () => {
                let dataChangingEvent;
                dataChangingEvent = { ColumnId: params.column.getColId(), NewValue: this._currentEditor.getValue(), IdentifierValue: this.getPrimaryKeyValueFromRecord(params.node) };
                let failedRules = this.ValidationService.ValidateCellChanging(dataChangingEvent);
                if (failedRules.length > 0) {
                    // first see if its an error = should only be one item in array if so
                    if (failedRules[0].ActionMode == "Stop Edit") {
                        let errorMessage = ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                        this.api.alertShowError("Validation Error", errorMessage, true);
                        return true;
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
                            ConfirmAction: GridRedux.GridSetValueLikeEdit(cellInfo, this.gridOptions.api.getValue(params.column.getColId(), params.node)),
                            ShowCommentBox: true
                        };
                        this.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
                        //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                        return true;
                    }
                }
                let whatToReturn = oldIsCancelAfterEnd ? oldIsCancelAfterEnd() : false;
                if (!whatToReturn) {
                    //no failed validation so we raise the edit auditlog
                    let dataChangedEvent = {
                        OldValue: this.gridOptions.api.getValue(params.column.getColId(), params.node),
                        NewValue: dataChangingEvent.NewValue,
                        ColumnId: dataChangingEvent.ColumnId,
                        IdentifierValue: dataChangingEvent.IdentifierValue,
                        Timestamp: null,
                        Record: null
                    };
                    this.AuditLogService.AddEditCellAuditLog(dataChangedEvent);
                    // it might be a free text column so we need to update the values
                    this.checkIfDataChangingColumnIsFreeText(dataChangedEvent);
                }
                return whatToReturn;
            };
            this._currentEditor.isCancelAfterEnd = isCancelAfterEnd;
        });
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_CELL_EDITING_STOPPED, (params) => {
            //(<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            this._currentEditor = null;
            //We refresh the filter so we get live search/filter when editing.
            //Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
            this.applyGridFiltering();
            this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_SELECTION_CHANGED, () => {
            this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_RANGE_SELECTION_CHANGED, () => {
            this.debouncedSetSelectedCells();
        });
        //  this.gridOptions.api.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGED, (params: any) => {
        //     console.log(params)
        // });
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_SORT_CHANGED, (params) => {
            this.onSortChanged();
            this.debouncedSetSelectedCells();
        });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_UPDATED, (params: any) => {
        //  });
        //  vendorGrid.api.addEventListener(Events.EVENT_ROW_DATA_CHANGED, (params: any) => {
        //});
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_MODEL_UPDATED, () => {
            // not sure about this - doing it to make sure that we set the columns properly at least once!
            this.checkColumnsDataTypeSet();
        });
        this.gridOptions.api.addEventListener(eventKeys_1.Events.EVENT_CELL_VALUE_CHANGED, (params) => {
            let identifierValue = this.getPrimaryKeyValueFromRecord(params.node);
            this.AuditService.CreateAuditEvent(identifierValue, params.newValue, params.colDef.field, params.node);
            //24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
            //so we manually raise.
            //https://github.com/JonnyAdaptableTools/adaptableblotter/issues/118
            let columnList = this.calculatedColumnPathMap.get(params.colDef.field);
            if (columnList) {
                columnList.forEach(x => {
                    let newValue = this.gridOptions.api.getValue(x, params.node);
                    this.AuditService.CreateAuditEvent(identifierValue, newValue, x, params.node);
                });
            }
        });
        //We plug our filter mecanism and if there is already something like external widgets... we save ref to the function
        let originalisExternalFilterPresent = this.gridOptions.isExternalFilterPresent;
        this.gridOptions.isExternalFilterPresent = () => {
            let columnFilters = this.getState().ColumnFilter.ColumnFilters;
            let isFilterActive = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilters);
            if (isFilterActive) {
                //used in particular at init time to show the filter icon correctly
                for (let colFilter of columnFilters) {
                    if (!this.gridOptions.columnApi.getColumn(colFilter.ColumnId).isFilterActive()) {
                        this.gridOptions.columnApi.getColumn(colFilter.ColumnId).setFilterActive(true);
                    }
                }
            }
            let isSearchActive = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.getState().AdvancedSearch.CurrentAdvancedSearch);
            let isQuickSearchActive = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.getState().QuickSearch.QuickSearchText);
            //it means that originaldoesExternalFilterPass will be called to we reinit that collection
            return isFilterActive || isSearchActive || isQuickSearchActive || (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false);
        };
        let originaldoesExternalFilterPass = this.gridOptions.doesExternalFilterPass;
        this.gridOptions.doesExternalFilterPass = (node) => {
            let columns = this.getState().Grid.Columns;
            //first we assess AdvancedSearch (if its running locally)
            if (this.BlotterOptions.serverSearchOption == 'None') {
                let currentSearchName = this.getState().AdvancedSearch.CurrentAdvancedSearch;
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                    // Get the actual Advanced Search object and check it exists
                    let currentSearch = this.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
                    if (currentSearch) {
                        // See if our record passes the Expression - using Expression Helper; if not then return false
                        if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, node, columns, this)) {
                            // if (!ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, this)) {
                            return false;
                        }
                    }
                }
            }
            //we then assess filters
            if (this.BlotterOptions.serverSearchOption == 'None' || this.BlotterOptions.serverSearchOption == 'AdvancedSearch') {
                let columnFilters = this.getState().ColumnFilter.ColumnFilters;
                if (columnFilters.length > 0) {
                    for (let columnFilter of columnFilters) {
                        if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, node, columns, this)) {
                            // if (!ExpressionHelper.checkForExpression(columnFilter.Filter, rowId, columns, this)) {
                            return false;
                        }
                    }
                }
                //we assess quicksearch
                let quickSearchState = this.getState().QuickSearch;
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)
                    && quickSearchState.DisplayAction != Enums_1.DisplayAction.HighlightCell) {
                    let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                    for (let column of columns.filter(c => c.Visible)) {
                        let displayValue = this.getDisplayValueFromRecord(node, column.ColumnId);
                        if (displayValue != null) {
                            let stringValueLowerCase = displayValue.toLowerCase();
                            switch (quickSearchState.Operator) {
                                case Enums_1.LeafExpressionOperator.Contains:
                                    {
                                        if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
                                        }
                                    }
                                    break;
                                case Enums_1.LeafExpressionOperator.StartsWith:
                                    {
                                        if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    return false;
                }
            }
            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
        };
        // if (this.isFilterable()) {
        if (this.BlotterOptions.useAdaptableBlotterFilterForm) {
            this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
                this.createFilterWrapper(col);
            });
        }
        // }
        if (this.gridOptions.floatingFilter && this.BlotterOptions.useAdaptableBlotterFloatingFilter) {
            //      if (this.isFilterable()) {
            this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
                this.createFloatingFilterWrapper(col);
            });
        }
        // add any special renderers
        let percentBars = this.getState().PercentBar.PercentBars;
        percentBars.forEach(pcr => {
            this.addPercentBar(pcr);
        });
        let originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
        this.gridOptions.getMainMenuItems = (params) => {
            //couldnt find a way to listen for menu close. There is a Menu Item Select 
            //but you can also clsoe the menu from filter and clicking outside the menu....
            //    this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.HideColumnContextMenu());
            let colId = params.column.getColId();
            this.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.ClearColumnContextMenu());
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, this.getState().Grid.Columns);
            if (column != null) {
                this.Strategies.forEach(s => {
                    s.addContextMenuItem(column);
                });
            }
            let colMenuItems;
            //if there was an initial implementation we init the list of menu items with this one, otherwise we take
            //the default items
            if (originalgetMainMenuItems) {
                let originalMenuItems = originalgetMainMenuItems(params);
                colMenuItems = originalMenuItems.slice(0);
            }
            else {
                colMenuItems = params.defaultItems.slice(0);
            }
            colMenuItems.push('separator');
            this.getState().Menu.ContextMenu.Items.forEach(x => {
                let glyph = this.abContainerElement.ownerDocument.createElement("span");
                glyph.className = "glyphicon glyphicon-" + x.GlyphIcon;
                colMenuItems.push({
                    name: x.Label,
                    action: () => this.AdaptableBlotterStore.TheStore.dispatch(x.Action),
                    icon: glyph
                });
            });
            return colMenuItems;
        };
        this.AdaptableBlotterStore.Load
            .then(() => this.Strategies.forEach(strat => strat.InitializeWithRedux()), (e) => {
            LoggingHelper_1.LoggingHelper.LogError('Failed to Init AdaptableBlotterStore : ', e);
            //for now i'm still initializing the strategies even if loading state has failed.... 
            //we may revisit that later
            this.Strategies.forEach(strat => strat.InitializeWithRedux());
        });
    }
    addPercentBar(pcr) {
        let renderedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(pcr.ColumnId, this.getState().Grid.Columns);
        if (renderedColumn) {
            let showNegatives = pcr.MinValue < 0;
            let showPositives = pcr.MaxValue > 0;
            let maxValue = pcr.MaxValue;
            let minValue = pcr.MinValue;
            let cellRendererFunc = (params) => {
                let isNegativeValue = params.value < 0;
                let value = params.value;
                if (isNegativeValue) {
                    value = value * -1;
                }
                let percentagePositiveValue = ((100 / maxValue) * value);
                let percentageNegativeValue = ((100 / (minValue * -1)) * value);
                //    let dualValue 
                if (showNegatives && showPositives) { // if need both then half the space
                    percentagePositiveValue = percentagePositiveValue / 2;
                    percentageNegativeValue = percentageNegativeValue / 2;
                }
                let eOuterDiv = document.createElement('div');
                eOuterDiv.className = 'ab_div-colour-render-div';
                if (pcr.ShowValue) {
                    let showValueBar = document.createElement('div');
                    showValueBar.className = 'ab_div-colour-render-text';
                    if (showNegatives && showPositives) {
                        showValueBar.style.paddingLeft = (isNegativeValue) ? '50%' : '20%';
                    }
                    else {
                        showValueBar.style.paddingLeft = '5px';
                    }
                    showValueBar.innerHTML = params.value;
                    eOuterDiv.appendChild(showValueBar);
                }
                if (showNegatives) {
                    let fullWidth = (showPositives) ? 50 : 100;
                    let negativeDivBlankBar = document.createElement('div');
                    negativeDivBlankBar.className = 'ab_div-colour-render-bar';
                    negativeDivBlankBar.style.width = (fullWidth - percentageNegativeValue) + '%';
                    eOuterDiv.appendChild(negativeDivBlankBar);
                    let negativeDivPercentBar = document.createElement('div');
                    negativeDivPercentBar.className = 'ab_div-colour-render-bar';
                    negativeDivPercentBar.style.width = percentageNegativeValue + '%';
                    if (isNegativeValue) {
                        negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
                    }
                    eOuterDiv.appendChild(negativeDivPercentBar);
                }
                if (showPositives) {
                    let positivePercentBarDiv = document.createElement('div');
                    positivePercentBarDiv.className = 'ab_div-colour-render-bar';
                    positivePercentBarDiv.style.width = percentagePositiveValue + '%';
                    if (!isNegativeValue) {
                        positivePercentBarDiv.style.backgroundColor = pcr.PositiveColor;
                    }
                    eOuterDiv.appendChild(positivePercentBarDiv);
                }
                return eOuterDiv;
            };
            let vendorGridColumn = this.gridOptions.columnApi.getColumn(pcr.ColumnId);
            vendorGridColumn.getColDef().cellRenderer = cellRendererFunc;
        }
    }
    removePercentBar(pcr) {
        let renderedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(pcr.ColumnId, this.getState().Grid.Columns);
        if (renderedColumn) {
            let vendorGridColumn = this.gridOptions.columnApi.getColumn(pcr.ColumnId);
            // note we dont get it from the original (but I guess it will be applied next time you run...)
            vendorGridColumn.getColDef().cellRenderer = null;
        }
    }
    editPercentBar(pcr) {
        this.removePercentBar(pcr);
        this.addPercentBar(pcr);
    }
    onSortChanged() {
        let sortModel = this.gridOptions.api.getSortModel();
        let gridSorts = [];
        if (sortModel != null) {
            if (sortModel.length > 0) {
                sortModel.forEach(sm => {
                    if (ColumnHelper_1.ColumnHelper.isSpecialColumn(sm.colId)) {
                        let groupedColumn = this.gridOptions.columnApi.getAllColumns().find(c => c.isRowGroupActive() == true);
                        if (groupedColumn) {
                            let customSort = this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == groupedColumn.getColId());
                            if (customSort) {
                                // check that not already applied
                                if (!this.getState().Grid.GridSorts.find(gs => ColumnHelper_1.ColumnHelper.isSpecialColumn(gs.Column))) {
                                    let customSortStrategy = this.Strategies.get(StrategyConstants.CustomSortStrategyId);
                                    let groupCustomSort = ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort();
                                    groupCustomSort.ColumnId = sm.colId;
                                    groupCustomSort.SortedValues = customSort.SortedValues;
                                    let comparator = customSortStrategy.getComparerFunction(groupCustomSort, this);
                                    this.setCustomSort(sm.colId, comparator);
                                }
                            }
                        }
                    }
                    let gridSort = { Column: sm.colId, SortOrder: (sm.sort == "asc") ? Enums_1.SortOrder.Ascending : Enums_1.SortOrder.Descending };
                    gridSorts.push(gridSort);
                });
            }
        }
        this.AdaptableBlotterStore.TheStore.dispatch(GridRedux.GridSetSort(gridSorts));
    }
    getRowCount() {
        return this.gridOptions.rowData ? this.gridOptions.rowData.length : this.gridOptions.api.getDisplayedRowCount();
    }
    getColumnCount() {
        return this.gridOptions.columnApi.getAllColumns().length;
    }
    getVisibleRowCount() {
        return this.gridOptions.api.getDisplayedRowCount();
    }
    getVisibleColumnCount() {
        return this.gridOptions.columnApi.getAllColumns().filter(c => c.isVisible()).length;
    }
    selectColumn(columnId) {
        this.gridOptions.api.clearRangeSelection();
        let rangeSelectionParams = {
            rowStart: 0,
            rowEnd: this.gridOptions.api.getDisplayedRowCount(),
            columnStart: columnId,
            columnEnd: columnId,
            floatingStart: "top",
            floatingEnd: "bottom"
        };
        this.gridOptions.api.addRangeSelection(rangeSelectionParams);
    }
    setGridSort(gridSorts) {
        // get the sort model
        let sortModel = [];
        gridSorts.forEach(gs => {
            let sortDescription = (gs.SortOrder == Enums_1.SortOrder.Ascending) ? "asc" : "desc";
            sortModel.push({ colId: gs.Column, sort: sortDescription });
        });
        this.gridOptions.api.setSortModel(sortModel);
        this.gridOptions.api.onSortChanged();
    }
    setData(dataSource) {
        this.gridOptions.api.setRowData(dataSource);
    }
    checkColumnsDataTypeSet() {
        // check that we have no unknown columns - if we do then ok
        let firstCol = this.getState().Grid.Columns[0];
        if (firstCol && firstCol.DataType == Enums_1.DataType.Unknown) {
            this.setColumnIntoStore();
        }
    }
    checkIfDataChangingColumnIsFreeText(dataChangedEvent) {
        let freeTextColumn = this.getState().FreeTextColumn.FreeTextColumns.find(fc => fc.ColumnId == dataChangedEvent.ColumnId);
        if (freeTextColumn) {
            let freeTextStoredValue = { PrimaryKey: dataChangedEvent.IdentifierValue, FreeText: dataChangedEvent.NewValue };
            this.AdaptableBlotterStore.TheStore.dispatch(FreeTextColumnRedux.FreeTextColumnAddEditStoredValue(freeTextColumn, freeTextStoredValue));
        }
    }
    getVendorGridState(visibleCols, forceFetch) {
        // forceFetch is used for default layout and just gets everything in the grid's state - not nice and can be refactored
        if (forceFetch) {
            return {
                GroupState: null,
                ColumnState: JSON.stringify(this.gridOptions.columnApi.getColumnState())
            };
        }
        if (this.BlotterOptions.includeVendorStateInLayouts) {
            let groupedState = null;
            let test = this.gridOptions.columnApi.getAllDisplayedColumns();
            let groupedCol = test.find(c => ColumnHelper_1.ColumnHelper.isSpecialColumn(c.getColId()));
            if (groupedCol) {
                groupedState = groupedCol.getActualWidth();
            }
            let columnState = this.gridOptions.columnApi.getColumnState();
            // Dont like this but not sure we have a choice to avoid other issues...
            // Going to update the state to make sure that visibility matches those given here
            columnState.forEach(c => {
                // to do
                let colId = c.colId;
                if (visibleCols.find(v => v == colId)) {
                    c.hide = false;
                }
                else {
                    c.hide = true;
                }
            });
            return {
                GroupState: groupedState,
                ColumnState: JSON.stringify(columnState)
            };
        }
        return null; // need this?
    }
    setVendorGridState(vendorGridState) {
        if (vendorGridState) {
            let columnState = JSON.parse(vendorGridState.ColumnState);
            if (columnState) {
                this.setColumnState(this.gridOptions.columnApi, columnState, "api");
            }
            let groupedState = vendorGridState.GroupState;
            if (groupedState) {
                // assume for now its just a number
                let column = this.gridOptions.columnApi.getColumn("ag-Grid-AutoColumn");
                if (column) {
                    this.gridOptions.columnApi.setColumnWidth(column, groupedState, true);
                }
            }
        }
    }
    // these 3 methods are strange as we shouldnt need to have to set a columnEventType but it seems agGrid forces us to 
    // not sure why as its not in the api
    setColumnVisible(columnApi, col, isVisible, columnEventType) {
        columnApi.setColumnVisible(col, isVisible, columnEventType);
    }
    moveColumn(columnApi, col, index, columnEventType) {
        columnApi.moveColumn(col, index, columnEventType);
    }
    setColumnState(columnApi, columnState, columnEventType) {
        columnApi.setColumnState(columnState, columnEventType);
    }
    isSelectable() {
        if (this.gridOptions.enableRangeSelection != null) {
            return this.gridOptions.enableRangeSelection;
        }
        return false;
    }
    isSortable() {
        if (this.gridOptions.enableSorting != null) {
            return this.gridOptions.enableSorting;
        }
        return false;
    }
    isFilterable() {
        if (this.gridOptions.enableFilter != null) {
            return this.gridOptions.enableFilter;
        }
        return false;
    }
    isQuickFilterable() {
        return true;
    }
    isQuickFilterActive() {
        if (this.gridOptions.floatingFilter != null) {
            return this.gridOptions.floatingFilter;
        }
        return false;
    }
    showQuickFilter() {
        this.gridOptions.floatingFilter = true;
        this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
            this.createFloatingFilterWrapper(col);
        });
        this.gridOptions.api.refreshHeader();
    }
    hideQuickFilter() {
        this.gridOptions.floatingFilter = false;
        //   this.gridOptions.columnApi.getAllGridColumns().forEach(col => {
        //       this.deleteFloatingFilterWrapper(col);
        //   }); 
        this.gridOptions.api.refreshHeader();
    }
    applyLightTheme() {
        if (this.BlotterOptions.useDefaultVendorGridThemes && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.BlotterOptions.vendorContainer)) {
            let container = document.getElementById(this.BlotterOptions.vendorContainer);
            if (container != null) {
                container.className = "ag-theme-balham";
            }
        }
    }
    applyDarkTheme() {
        if (this.BlotterOptions.useDefaultVendorGridThemes && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.BlotterOptions.vendorContainer)) {
            let container = document.getElementById(this.BlotterOptions.vendorContainer);
            if (container != null) {
                container.className = "ag-theme-balham-dark";
            }
        }
    }
}
exports.AdaptableBlotter = AdaptableBlotter;
