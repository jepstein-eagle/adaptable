"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomSortPopup_1 = require("./CustomSort/CustomSortPopup");
const SmartEditPopup_1 = require("./SmartEdit/SmartEditPopup");
const ShortcutPopup_1 = require("./Shortcut/ShortcutPopup");
const PlusMinusPopup_1 = require("./PlusMinus/PlusMinusPopup");
const ColumnChooserPopup_1 = require("./ColumnChooser/ColumnChooserPopup");
const ColumnInfoPopup_1 = require("./ColumnInfo/ColumnInfoPopup");
const ExportPopup_1 = require("./Export/ExportPopup");
const FlashingCellsPopup_1 = require("./FlashingCells/FlashingCellsPopup");
const CalendarsPopup_1 = require("./Calendars/CalendarsPopup");
const ConditionalStylePopup_1 = require("./ConditionalStyle/ConditionalStylePopup");
const QuickSearchPopup_1 = require("./QuickSearch/QuickSearchPopup");
const QuickSearchToolbarControl_1 = require("./QuickSearch/QuickSearchToolbarControl");
const ColumnFilterToolbarControl_1 = require("./ColumnFilter/ColumnFilterToolbarControl");
const ThemeToolbarControl_1 = require("./Theme/ThemeToolbarControl");
const ApplicationToolbarControl_1 = require("./Application/ApplicationToolbarControl");
const AdvancedSearchPopup_1 = require("./AdvancedSearch/AdvancedSearchPopup");
const AdvancedSearchToolbarControl_1 = require("./AdvancedSearch/AdvancedSearchToolbarControl");
const BulkUpdateToolbarControl_1 = require("./BulkUpdate/BulkUpdateToolbarControl");
const SmartEditToolbarControl_1 = require("./SmartEdit/SmartEditToolbarControl");
const UserFilterPopup_1 = require("./UserFilter/UserFilterPopup");
const FormatColumnPopup_1 = require("./FormatColumn/FormatColumnPopup");
const ThemePopup_1 = require("./Theme/ThemePopup");
const CellValidationPopup_1 = require("./CellValidation/CellValidationPopup");
const LayoutPopup_1 = require("./Layout/LayoutPopup");
const ColumnCategoryPopup_1 = require("./ColumnCategory/ColumnCategoryPopup");
const LayoutToolbarControl_1 = require("./Layout/LayoutToolbarControl");
const ExportToolbarControl_1 = require("./Export/ExportToolbarControl");
const TeamSharingPopup_1 = require("./TeamSharing/TeamSharingPopup");
const IPushPullLogin_1 = require("./Export/IPushPullLogin");
const HomeToolbarControl_1 = require("./Home/HomeToolbarControl");
const ApplicationPopup_1 = require("./Application/ApplicationPopup");
const DashboardPopup_1 = require("./Dashboard/DashboardPopup");
const DataManagementPopup_1 = require("./DataManagement/DataManagementPopup");
const ColumnFilterPopup_1 = require("./ColumnFilter/ColumnFilterPopup");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const CalculatedColumnPopup_1 = require("./CalculatedColumn/CalculatedColumnPopup");
const IPushPullDomainPageSelector_1 = require("./Export/IPushPullDomainPageSelector");
const BulkUpdatePopup_1 = require("./BulkUpdate/BulkUpdatePopup");
const DataSourcePopup_1 = require("./DataSource/DataSourcePopup");
const DataSourceToolbarControl_1 = require("./DataSource/DataSourceToolbarControl");
const AlertPopup_1 = require("./Alert/AlertPopup");
const AlertToolbarControl_1 = require("./Alert/AlertToolbarControl");
const ChartPopup_1 = require("./Chart/ChartPopup");
const ChartToolbarControl_1 = require("./Chart/ChartToolbarControl");
const FreeTextColumnPopup_1 = require("./FreeTextColumn/FreeTextColumnPopup");
const PercentBarPopup_1 = require("./PercentBar/PercentBarPopup");
const PieChartPopup_1 = require("./PieChart/PieChartPopup");
const CellSummaryPopup_1 = require("./CellSummary/CellSummaryPopup");
const CellSummaryToolbarControl_1 = require("./CellSummary/CellSummaryToolbarControl");
const ChartDisplayPopup_1 = require("./Chart/ChartDisplayPopup");
const SchedulePopup_1 = require("./Schedule/SchedulePopup");
exports.AdaptableViewFactory = {
    AdvancedSearchPopup: AdvancedSearchPopup_1.AdvancedSearchPopup,
    AlertPopup: AlertPopup_1.AlertPopup,
    ApplicationPopup: ApplicationPopup_1.ApplicationPopup,
    BulkUpdatePopup: BulkUpdatePopup_1.BulkUpdatePopup,
    CalculatedColumnPopup: CalculatedColumnPopup_1.CalculatedColumnPopup,
    CalendarsPopup: CalendarsPopup_1.CalendarsPopup,
    CellValidationPopup: CellValidationPopup_1.CellValidationPopup,
    ChartPopup: ChartPopup_1.ChartPopup,
    ColumnChooserPopup: ColumnChooserPopup_1.ColumnChooserPopup,
    ColumnFilterPopup: ColumnFilterPopup_1.ColumnFilterPopup,
    ColumnInfoPopup: ColumnInfoPopup_1.ColumnInfoPopup,
    ConditionalStylePopup: ConditionalStylePopup_1.ConditionalStylePopup,
    CustomSortPopup: CustomSortPopup_1.CustomSortPopup,
    DashboardPopup: DashboardPopup_1.DashboardPopup,
    DataManagementPopup: DataManagementPopup_1.DataManagementPopup,
    DataSourcePopup: DataSourcePopup_1.DataSourcePopup,
    ExportPopup: ExportPopup_1.ExportPopup,
    FlashingCellsPopup: FlashingCellsPopup_1.FlashingCellsPopup,
    FormatColumnPopup: FormatColumnPopup_1.FormatColumnPopup,
    FreeTextColumnPopup: FreeTextColumnPopup_1.FreeTextColumnPopup,
    IPushPullLogin: IPushPullLogin_1.IPushPullLogin,
    IPushPullDomainPageSelector: IPushPullDomainPageSelector_1.IPushPullDomainPageSelector,
    LayoutPopup: LayoutPopup_1.LayoutPopup,
    ColumnCategoryPopup: ColumnCategoryPopup_1.ColumnCategoryPopup,
    PercentBarPopup: PercentBarPopup_1.PercentBarPopup,
    PieChartPopup: PieChartPopup_1.PieChartPopup,
    PlusMinusPopup: PlusMinusPopup_1.PlusMinusPopup,
    QuickSearchPopup: QuickSearchPopup_1.QuickSearchPopup,
    SchedulePopup: SchedulePopup_1.SchedulePopup,
    CellSummaryPopup: CellSummaryPopup_1.CellSummaryPopup,
    SmartEditPopup: SmartEditPopup_1.SmartEditPopup,
    ShortcutPopup: ShortcutPopup_1.ShortcutPopup,
    ThemePopup: ThemePopup_1.ThemePopup,
    TeamSharingPopup: TeamSharingPopup_1.TeamSharingPopup,
    UserFilterPopup: UserFilterPopup_1.UserFilterPopup,
    ChartDisplayPopup: ChartDisplayPopup_1.ChartDisplayPopup
};
//here we put the dashboard control for each strategy
exports.AdaptableDashboardViewFactory = new Map([
    [StrategyConstants.AdvancedSearchStrategyId, AdvancedSearchToolbarControl_1.AdvancedSearchToolbarControl],
    [StrategyConstants.DataSourceStrategyId, DataSourceToolbarControl_1.DataSourceToolbarControl],
    [StrategyConstants.QuickSearchStrategyId, QuickSearchToolbarControl_1.QuickSearchToolbarControl],
    [StrategyConstants.LayoutStrategyId, LayoutToolbarControl_1.LayoutToolbarControl],
    [StrategyConstants.ColumnFilterStrategyId, ColumnFilterToolbarControl_1.ColumnFilterToolbarControl],
    [StrategyConstants.ApplicationStrategyId, ApplicationToolbarControl_1.ApplicationToolbarControl],
    [StrategyConstants.ExportStrategyId, ExportToolbarControl_1.ExportToolbarControl],
    [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolbarControl_1.BulkUpdateToolbarControl],
    [StrategyConstants.SmartEditStrategyId, SmartEditToolbarControl_1.SmartEditToolbarControl],
    [StrategyConstants.CellSummaryStrategyId, CellSummaryToolbarControl_1.CellSummaryToolbarControl],
    [StrategyConstants.AlertStrategyId, AlertToolbarControl_1.AlertToolbarControl],
    [StrategyConstants.ChartStrategyId, ChartToolbarControl_1.ChartToolbarControl],
    [StrategyConstants.ThemeStrategyId, ThemeToolbarControl_1.ThemeToolbarControl],
]);
exports.AdaptableDashboardPermanentToolbarFactory = new Map([
    [StrategyConstants.HomeStrategyId, HomeToolbarControl_1.HomeToolbarControl],
]);
