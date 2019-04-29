"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const AlertStrategy_1 = require("../Strategy/AlertStrategy");
const AdvancedSearchStrategy_1 = require("../Strategy/AdvancedSearchStrategy");
const ApplicationStrategy_1 = require("../Strategy/ApplicationStrategy");
const BulkUpdateStrategy_1 = require("../Strategy/BulkUpdateStrategy");
const CalculatedColumnStrategy_1 = require("../Strategy/CalculatedColumnStrategy");
const CalendarStrategy_1 = require("../Strategy/CalendarStrategy");
const CellValidationStrategy_1 = require("../Strategy/CellValidationStrategy");
const ChartStrategy_1 = require("../Strategy/ChartStrategy");
const ColumnChooserStrategy_1 = require("../Strategy/ColumnChooserStrategy");
const ColumnFilterStrategy_1 = require("../Strategy/ColumnFilterStrategy");
const ColumnInfoStrategy_1 = require("../Strategy/ColumnInfoStrategy");
const ConditionalStyleStrategyagGrid_1 = require("./Strategy/ConditionalStyleStrategyagGrid");
const CustomSortStrategyagGrid_1 = require("./Strategy/CustomSortStrategyagGrid");
const DashboardStrategy_1 = require("../Strategy/DashboardStrategy");
const DataManagementStrategy_1 = require("../Strategy/DataManagementStrategy");
const DataSourceStrategy_1 = require("../Strategy/DataSourceStrategy");
const ExportStrategy_1 = require("../Strategy/ExportStrategy");
const FlashingCellsStrategyagGrid_1 = require("./Strategy/FlashingCellsStrategyagGrid");
const FormatColumnStrategyagGrid_1 = require("./Strategy/FormatColumnStrategyagGrid");
const FreeTextColumnStrategy_1 = require("../Strategy/FreeTextColumnStrategy");
const HomeStrategy_1 = require("../Strategy/HomeStrategy");
const LayoutStrategy_1 = require("../Strategy/LayoutStrategy");
const ColumnCategoryStrategy_1 = require("../Strategy/ColumnCategoryStrategy");
const PercentBarStrategy_1 = require("../Strategy/PercentBarStrategy");
const PieChartStrategy_1 = require("../Strategy/PieChartStrategy");
const PlusMinusStrategy_1 = require("../Strategy/PlusMinusStrategy");
const QuickSearchStrategy_1 = require("../Strategy/QuickSearchStrategy");
const SmartEditStrategy_1 = require("../Strategy/SmartEditStrategy");
const ShortcutStrategy_1 = require("../Strategy/ShortcutStrategy");
const TeamSharingStrategy_1 = require("../Strategy/TeamSharingStrategy");
const ThemeStrategy_1 = require("../Strategy/ThemeStrategy");
const CellSummaryStrategy_1 = require("../Strategy/CellSummaryStrategy");
const UserFilterStrategy_1 = require("../Strategy/UserFilterStrategy");
const ReminderStrategy_1 = require("../Strategy/ReminderStrategy");
/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */
// tslint:disable-next-line: class-name
class agGridHelper {
    constructor(blotter, gridOptions) {
        this.blotter = blotter;
        this.gridOptions = gridOptions;
    }
    getLightThemeName() {
        return "ag-theme-balham";
    }
    getDarkThemeName() {
        return "ag-theme-balham-dark";
    }
    setUpStrategies() {
        let strategies = new Map();
        let blotter = this.blotter;
        strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategy_1.AlertStrategy(blotter));
        strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy_1.AdvancedSearchStrategy(blotter));
        strategies.set(StrategyConstants.ApplicationStrategyId, new ApplicationStrategy_1.ApplicationStrategy(blotter));
        strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy_1.BulkUpdateStrategy(blotter));
        strategies.set(StrategyConstants.CalculatedColumnStrategyId, new CalculatedColumnStrategy_1.CalculatedColumnStrategy(blotter));
        strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy_1.CalendarStrategy(blotter));
        strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy_1.CellValidationStrategy(blotter));
        strategies.set(StrategyConstants.ChartStrategyId, new ChartStrategy_1.ChartStrategy(blotter));
        strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy_1.ColumnChooserStrategy(blotter));
        strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy_1.ColumnFilterStrategy(blotter));
        strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy_1.ColumnInfoStrategy(blotter));
        strategies.set(StrategyConstants.ConditionalStyleStrategyId, new ConditionalStyleStrategyagGrid_1.ConditionalStyleStrategyagGrid(blotter));
        strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategyagGrid_1.CustomSortStrategyagGrid(blotter));
        strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy_1.DashboardStrategy(blotter));
        strategies.set(StrategyConstants.DataManagementStrategyId, new DataManagementStrategy_1.DataManagementStrategy(blotter));
        strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy_1.DataSourceStrategy(blotter));
        strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy_1.ExportStrategy(blotter));
        strategies.set(StrategyConstants.FlashingCellsStrategyId, new FlashingCellsStrategyagGrid_1.FlashingCellStrategyagGrid(blotter));
        strategies.set(StrategyConstants.FormatColumnStrategyId, new FormatColumnStrategyagGrid_1.FormatColumnStrategyagGrid(blotter));
        strategies.set(StrategyConstants.FreeTextColumnStrategyId, new FreeTextColumnStrategy_1.FreeTextColumnStrategy(blotter));
        strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy_1.HomeStrategy(blotter));
        strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy_1.LayoutStrategy(blotter));
        strategies.set(StrategyConstants.ColumnCategoryStrategyId, new ColumnCategoryStrategy_1.ColumnCategoryStrategy(blotter));
        strategies.set(StrategyConstants.PercentBarStrategyId, new PercentBarStrategy_1.PercentBarStrategy(blotter));
        strategies.set(StrategyConstants.PieChartStrategyId, new PieChartStrategy_1.PieChartStrategy(blotter));
        strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy_1.PlusMinusStrategy(blotter));
        strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy_1.QuickSearchStrategy(blotter));
        strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy_1.SmartEditStrategy(blotter));
        strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy_1.ShortcutStrategy(blotter));
        strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy_1.TeamSharingStrategy(blotter));
        strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy_1.ThemeStrategy(blotter));
        strategies.set(StrategyConstants.CellSummaryStrategyId, new CellSummaryStrategy_1.CellSummaryStrategy(blotter));
        strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy_1.UserFilterStrategy(blotter));
        strategies.set(StrategyConstants.ReminderStrategyId, new ReminderStrategy_1.ReminderStrategy(blotter));
        return strategies;
    }
    TrySetUpNodeIds(isValidPrimaryKey) {
        if (!isValidPrimaryKey) { // if no valid pk then always false
            return false;
        }
        // need some way of checking if running on client on server
        // if on server then we return false
        // also we can check if they have done it
        let primaryKey = this.blotter.blotterOptions.primaryKey;
        // otherwise lets set the Id so that it returns the primaryKey
        this.gridOptions.getRowNodeId = function (data) {
            return data[primaryKey];
        };
        return true;
    }
    createCellRendererFunc(pcr, blotterId) {
        let showNegatives = pcr.MinValue < 0;
        let showPositives = pcr.MaxValue > 0;
        let cellRendererFunc = (params) => {
            let isNegativeValue = params.value < 0;
            let value = params.value;
            let maxValue = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pcr.MaxValueColumnId) ?
                this.blotter.getRawValueFromRecord(params.node, pcr.MaxValueColumnId) :
                pcr.MaxValue;
            let minValue = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pcr.MinValueColumnId) ?
                this.blotter.getRawValueFromRecord(params.node, pcr.MinValueColumnId) :
                pcr.MinValue;
            if (isNegativeValue) {
                value = value * -1;
            }
            let percentagePositiveValue = ((100 / maxValue) * value);
            let percentageNegativeValue = ((100 / (minValue * -1)) * value);
            if (showNegatives && showPositives) { // if need both then half the space
                percentagePositiveValue = percentagePositiveValue / 2;
                percentageNegativeValue = percentageNegativeValue / 2;
            }
            let eOuterDiv = document.createElement('div');
            eOuterDiv.className = 'ab_div-colour-render-div';
            if (pcr.ShowValue) {
                let showValueBar = document.createElement('div');
                showValueBar.id = 'ab_div-colour-render-text_' + blotterId + '_' + pcr.ColumnId;
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
                negativeDivBlankBar.id = 'ab_div-colour-blank-bar_' + blotterId + '_' + pcr.ColumnId;
                negativeDivBlankBar.style.width = (fullWidth - percentageNegativeValue) + '%';
                eOuterDiv.appendChild(negativeDivBlankBar);
                let negativeDivPercentBar = document.createElement('div');
                negativeDivPercentBar.className = 'ab_div-colour-render-bar';
                negativeDivBlankBar.id = 'ab_div-colour-negative-bar_' + blotterId + '_' + pcr.ColumnId;
                negativeDivPercentBar.style.width = percentageNegativeValue + '%';
                if (isNegativeValue) {
                    negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
                }
                eOuterDiv.appendChild(negativeDivPercentBar);
            }
            if (showPositives) {
                let positivePercentBarDiv = document.createElement('div');
                positivePercentBarDiv.className = 'ab_div-colour-render-bar';
                positivePercentBarDiv.id = 'ab_div-colour-positive-bar_' + blotterId + '_' + pcr.ColumnId;
                positivePercentBarDiv.style.width = percentagePositiveValue + '%';
                if (!isNegativeValue) {
                    positivePercentBarDiv.style.backgroundColor = pcr.PositiveColor;
                }
                eOuterDiv.appendChild(positivePercentBarDiv);
            }
            return eOuterDiv;
        };
        return cellRendererFunc;
    }
    getCleanValue(value) {
        if (value == null || value == 'null') {
            return undefined;
        }
        else if (value == undefined || value == 'undefined') {
            return undefined;
        }
        else {
            return String(value) || "";
        }
    }
    getRenderedValue(percentBars, colDef, valueToRender) {
        let isRenderedColumn = ArrayExtensions_1.ArrayExtensions.ContainsItem(percentBars, colDef.field);
        if (isRenderedColumn) {
            return valueToRender;
        }
        let render = colDef.cellRenderer;
        if (typeof render == "string") {
            return this.getCleanValue(valueToRender);
        }
        return render({ value: valueToRender }) || "";
    }
    safeSetColDefs(colDefs) {
        // bizarrely we need this line otherwise ag-Grid mangles the ColIds (e.g. 'tradeId' becomes 'tradeId_1')
        this.gridOptions.api.setColumnDefs([]);
        this.gridOptions.api.setColumnDefs(colDefs);
    }
    createAdaptableBlotterSideBarDefs(showFilterPanel, showColumnsPanel) {
        let toolPanelDef = [];
        if (showFilterPanel) {
            let filterToolPanel = {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
            };
            toolPanelDef.push(filterToolPanel);
        }
        if (showColumnsPanel) {
            let columnsToolPanel = {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
            };
            toolPanelDef.push(columnsToolPanel);
        }
        toolPanelDef.push(this.createAdaptableBlotterToolPanel());
        let abSideBarDef = {
            toolPanels: toolPanelDef,
            defaultToolPanel: '' // for now we wont show an open (default) tool panel in this scenario - might revisit
        };
        return abSideBarDef;
    }
    createAdaptableBlotterToolPanel() {
        return {
            id: 'adaptableBlotterToolPanel',
            labelDefault: 'Adaptable Blotter',
            labelKey: 'adaptableBlotterToolPanel',
            iconKey: 'menu',
            toolPanel: 'adaptableBlotterToolPanel',
        };
    }
}
exports.agGridHelper = agGridHelper;
