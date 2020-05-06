import {
  MessageType,
  LeafExpressionOperator,
  RangeOperandType,
  SortOrder,
  ReportColumnScope,
  ReportRowScope,
  ExportDestination,
  DataType,
  MathOperation,
  // ConditionalStyleScope,
  ActionMode,
  FontWeight,
  FontStyle,
  ScheduleType,
} from '../PredefinedConfig/Common/Enums';
import { CustomSort } from '../PredefinedConfig/CustomSortState';
import {
  EMPTY_STRING,
  CHART_DEFAULT_YAXIS_TOTAL,
  PLUS_MINUS_DEFAULT_NUDGE_VALUE,
  ALERT_DEFAULT_OPERATOR,
  ALERT_DEFAULT_RANGE_OPERAND_TYPE,
  ALERT_DEFAULT_MESSAGE_TYPE,
  ALERT_DEFAULT_SHOW_POPUP,
  ALL_DATA_REPORT,
  VISIBLE_DATA_REPORT,
  SELECTED_CELLS_REPORT,
  SELECTED_ROWS_REPORT,
} from './Constants/GeneralConstants';
import { DataSource } from '../PredefinedConfig/DataSourceState';
import {
  PieChartDefinition,
  CategoryChartDefinition,
  SparklinesChartDefinition,
} from '../PredefinedConfig/ChartState';
import { SecondaryColumnOperation, ChartType } from '../PredefinedConfig/Common/ChartEnums';
import { DefaultPieChartProperties } from './Defaults/DefaultPieChartProperties';
import { DefaultCategoryChartProperties } from './Defaults/DefaultCategoryChartProperties';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';
import { PlusMinusRule } from '../PredefinedConfig/PlusMinusState';
import { AdaptableAlert } from './Interface/IMessage';
import { AlertDefinition } from '../PredefinedConfig/AlertState';
import { AdvancedSearch } from '../PredefinedConfig/AdvancedSearchState';
import ExpressionHelper, { IRangeEvaluation } from './Helpers/ExpressionHelper';
import { ColumnCategory } from '../PredefinedConfig/ColumnCategoryState';
import { VendorGridInfo, Layout, PivotDetails } from '../PredefinedConfig/LayoutState';
import { CellValidationRule } from '../PredefinedConfig/CellValidationState';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { UserFilter } from '../PredefinedConfig/UserFilterState';
import { Report, ReportSchedule } from '../PredefinedConfig/ExportState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { FlashingCell } from '../PredefinedConfig/FlashingCellState';
import { Schedule, BaseSchedule } from '../PredefinedConfig/Common/Schedule';
import { Shortcut } from '../PredefinedConfig/ShortcutState';
import { ConditionalStyle } from '../PredefinedConfig/ConditionalStyleState';
import { FormatColumn } from '../PredefinedConfig/FormatColumnState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { Expression, QueryRange } from '../PredefinedConfig/Common/Expression';
import { ColumnFilter } from '../PredefinedConfig/ColumnFilterState';
import { AdaptableStyle } from '../PredefinedConfig/Common/AdaptableStyle';
import { CellSummmary } from '../PredefinedConfig/Selection/CellSummmary';
import { createUuid } from '../PredefinedConfig/Uuid';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { DefaultSparklinesChartProperties } from './Defaults/DefaultSparklinesChartProperties';
import { DARK_GREEN, DARK_RED, getHexForName, WHITE, RED } from '../View/UIHelper';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';
import { IPushPullReport, IPushPullSchedule } from '../PredefinedConfig/IPushPullState';
import { ReminderSchedule } from '../PredefinedConfig/ReminderState';
import { Glue42Report, Glue42Schedule } from '../PredefinedConfig/Glue42State';
import { GradientColumn } from '../PredefinedConfig/GradientColumnState';

export function CreateEmptyCustomSort(): CustomSort {
  return { Uuid: createUuid(), ColumnId: EMPTY_STRING, SortedValues: [] };
}

export function CreateEmptyDataSource(): DataSource {
  return { Uuid: createUuid(), Name: EMPTY_STRING, Description: EMPTY_STRING };
}

export function CreateEmptyPieChartDefinition(): PieChartDefinition {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Description: EMPTY_STRING,
    PrimaryColumnId: EMPTY_STRING,
    SecondaryColumnId: undefined,
    SecondaryColumnOperation: SecondaryColumnOperation.Count,
    ChartProperties: DefaultPieChartProperties,
    ChartType: ChartType.PieChart,
    VisibleRowsOnly: true,
  };
}
export function CreateEmptySparklinesChartDefinition(): SparklinesChartDefinition {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Description: EMPTY_STRING,
    ColumnId: EMPTY_STRING,
    Expression: undefined,
    ChartProperties: DefaultSparklinesChartProperties,
    ChartType: ChartType.SparklinesChart,
    VisibleRowsOnly: true,
  };
}

export function CreateEmptyCategoryChartDefinition(): CategoryChartDefinition {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Description: EMPTY_STRING,
    YAxisColumnIds: [],
    YAxisTotal: CHART_DEFAULT_YAXIS_TOTAL,
    XAxisColumnId: EMPTY_STRING,
    XAxisExpression: undefined,
    ChartProperties: DefaultCategoryChartProperties,
    ChartType: ChartType.CategoryChart,
    VisibleRowsOnly: true,
  };
}

export function CreateEmptyCalculatedColumn(): CalculatedColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    ColumnExpression: EMPTY_STRING,
    // need to create some defaults - which we will change later

    CalculatedColumnSettings: {
      DataType: 'Number',
      Filterable: true,
      Resizable: true,
      Groupable: true,
      Sortable: true,
      Pivotable: true,
      Aggregatable: true,
    },
  };
}

export function CreateEmptyPlusMinusRule(): PlusMinusRule {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    IsDefaultNudge: false,
    NudgeValue: PLUS_MINUS_DEFAULT_NUDGE_VALUE,
    Expression: null,
  };
}

export function CreateEmptyAlert(): AdaptableAlert {
  return {
    Uuid: createUuid(),
    Header: EMPTY_STRING,
    Msg: EMPTY_STRING,
    AlertDefinition: CreateInternalAlertDefinitionForMessages(MessageType.Info),
  };
}

export function CreateAlert(
  alertHeader: string,
  alertMessage: string,
  alertDefinition: AlertDefinition,
  dataChangedInfo: DataChangedInfo
): AdaptableAlert {
  return {
    Uuid: createUuid(),
    Header: alertHeader,
    Msg: alertMessage,
    AlertDefinition: alertDefinition,
    DataChangedInfo: dataChangedInfo,
  };
}

export function CreateEmptyAlertDefinition(): AlertDefinition {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    Range: {
      Operator: ALERT_DEFAULT_OPERATOR,
      Operand1: EMPTY_STRING,
      Operand2: EMPTY_STRING,
      Operand1Type: ALERT_DEFAULT_RANGE_OPERAND_TYPE,
      Operand2Type: ALERT_DEFAULT_RANGE_OPERAND_TYPE,
    },
    Expression: null,
    MessageType: ALERT_DEFAULT_MESSAGE_TYPE,
    AlertProperties: {
      ShowPopup: ALERT_DEFAULT_SHOW_POPUP,
    },
  };
}

export function CreateInternalAlertDefinitionForMessages(
  messageType: MessageType,
  showPopup?: boolean
): AlertDefinition {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    Range: null,
    Expression: null,
    MessageType: messageType,
    AlertProperties: {
      ShowPopup: showPopup != null && showPopup != undefined ? showPopup : ALERT_DEFAULT_SHOW_POPUP,
    },
  };
}

export function CreateEmptyAdvancedSearch(): AdvancedSearch {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Expression: ExpressionHelper.CreateEmptyExpression(),
  };
}

export function CreateEmptyColumnCategory(): ColumnCategory {
  return {
    Uuid: createUuid(),
    ColumnCategoryId: EMPTY_STRING,
    ColumnIds: [],
  };
}

export function CreateEmptyRange(): QueryRange {
  return {
    Operator: LeafExpressionOperator.None,
    Operand1: EMPTY_STRING,
    Operand2: EMPTY_STRING,
    Operand1Type: RangeOperandType.Value,
    Operand2Type: RangeOperandType.Value,
  };
}

export function CreateEmptyColumnSort(): ColumnSort {
  return {
    Column: EMPTY_STRING,
    SortOrder: SortOrder.Ascending,
  };
}

export function CreateEmptyCellValidation(): CellValidationRule {
  return {
    Uuid: createUuid(),
    ActionMode: 'Stop Edit',
    ColumnId: EMPTY_STRING,
    Range: {
      Operator: LeafExpressionOperator.AnyChange,
      Operand1: EMPTY_STRING,
      Operand2: EMPTY_STRING,
      Operand1Type: RangeOperandType.Column,
      Operand2Type: RangeOperandType.Column,
    },
    Expression: null,
  };
}

export function CreateEmptyPercentBar(): PercentBar {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    PositiveValue: undefined,
    NegativeValue: undefined,
    PositiveColor: getHexForName(DARK_GREEN),
    NegativeColor: getHexForName(RED),
    ShowValue: false,
    ShowToolTip: true,
    PositiveValueColumnId: undefined,
    NegativeValueColumnId: undefined,
  };
}

export function CreateEmptyGradientColumn(): GradientColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    PositiveValue: undefined,
    BaseValue: 0,
    NegativeValue: undefined,
    PositiveColor: getHexForName(DARK_GREEN),
    NegativeColor: getHexForName(RED),
  };
}

export function CreateEmptySparklineColumn(): SparklineColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    MaximumValue: undefined,
    MinimumValue: undefined,
    ShowToolTip: true,
    LineColor: DefaultSparklinesChartProperties.Brush,
  };
}

export function CreateEmptyUserFilter(): UserFilter {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Expression: ExpressionHelper.CreateEmptyExpression(),
    ColumnId: EMPTY_STRING,
  };
}

export function CreateEmptyReport(): Report {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Expression: null,
    ColumnIds: null,
    ReportColumnScope: ReportColumnScope.AllColumns,
    ReportRowScope: ReportRowScope.AllRows,
  };
}

export function CreateDefaultFlashingCell(
  column: AdaptableColumn,
  upColor: string,
  downColor: string,
  duration: 250 | 500 | 750 | 1000
): FlashingCell {
  return {
    Uuid: createUuid(),
    IsLive: false,
    ColumnId: column.ColumnId,
    FlashingCellDuration: duration,
    UpColor: upColor,
    DownColor: downColor,
  };
}

export function CreateEmptyBaseSchedule(scheduleType: ScheduleType): BaseSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: scheduleType,
    Schedule: CreateEmptySchedule(),
  };
}

export function CreateEmptyReminderSchedule(): ReminderSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.Reminder,
    Schedule: CreateEmptySchedule(),
    Alert: CreateEmptyAlert(),
  };
}
export function CreateEmptyReportSchedule(): ReportSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.Report,
    Schedule: CreateEmptySchedule(),
    ReportName: EMPTY_STRING,
    ExportDestination: ExportDestination.CSV,
  };
}
export function CreateEmptyIPushPullReport(): IPushPullReport {
  return {
    Uuid: createUuid(),
    ReportName: EMPTY_STRING,
    Folder: EMPTY_STRING,
    Page: EMPTY_STRING,
  };
}
export function CreateEmptyGlue42Report(): Glue42Report {
  return {
    Uuid: createUuid(),
    ReportName: EMPTY_STRING,
  };
}
export function CreateEmptyIPushPullSchedule(): IPushPullSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.iPushPull,
    Schedule: CreateEmptySchedule(),
    IPushPullReport: CreateEmptyIPushPullReport(),
    Transmission: 'Snapshot',
  };
}

export function CreateEmptyGlue42Schedule(): Glue42Schedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.Glue42,
    Schedule: CreateEmptySchedule(),
    Glue42Report: CreateEmptyGlue42Report(),
    Transmission: 'Snapshot',
  };
}

export function CreateEmptyReminder(): ReminderSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: 'Reminder',
    Alert: CreateEmptyAlert(),
    Schedule: CreateEmptySchedule(),
  };
}

export function CreateIPushPullSchedule(iPushPullReport: IPushPullReport): IPushPullSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.iPushPull,
    Schedule: CreateEmptySchedule(),
    IPushPullReport: iPushPullReport,
    Transmission: 'Snapshot',
  };
}

export function CreateGlue42Schedule(glue42Report: Glue42Report): Glue42Schedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.Glue42,
    Schedule: CreateEmptySchedule(),
    Glue42Report: glue42Report,
    Transmission: 'Snapshot',
  };
}

export function CreateReportSchedule(reportName: string): ReportSchedule {
  return {
    Uuid: createUuid(),
    ScheduleType: ScheduleType.Report,
    Schedule: CreateEmptySchedule(),
    ReportName: reportName,
    ExportDestination: ExportDestination.CSV,
  };
}

export function CreateEmptySchedule(): Schedule {
  return {
    // todo: base of tommorrow?
    Uuid: createUuid(),
    OneOffDate: undefined,
    DaysOfWeek: [],
    Hour: 0,
    Minute: 0,
  };
}

export function CreateEmptyShortcut(): Shortcut {
  return {
    Uuid: createUuid(),
    ShortcutKey: EMPTY_STRING,
    ShortcutResult: undefined,
    ColumnType: DataType.Number,
    ShortcutOperation: MathOperation.Multiply,
    IsDynamic: false,
  };
}

export function CreateEmptyConditionalStyle(): ConditionalStyle {
  return {
    Uuid: createUuid(),
    ColumnId: undefined,
    ColumnCategoryId: undefined,
    Style: CreateEmptyStyle(),
    ConditionalStyleScope: 'Row',
    ExcludeGroupedRows: false,
    Expression: ExpressionHelper.CreateEmptyExpression(),
  };
}

export function CreateEmptyFormatColumn(): FormatColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    Style: CreateEmptyStyle(),
    DisplayFormat: undefined,
    CellAlignment: undefined,
  };
}

export function CreateEmptyFreeTextColumn(): FreeTextColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    DefaultValue: EMPTY_STRING,
    FreeTextStoredValues: [],
  };
}

export function CreateEmptyLayout(): Layout {
  return {
    Uuid: createUuid(),
    Columns: [],
    ColumnSorts: [],
    GroupedColumns: null,
    PivotDetails: null,
    Name: '',
    VendorGridInfo: null,
    AdaptableGridInfo: null,
  };
}

export function CreateDefaultLayout(
  columns: AdaptableColumn[],
  columnSorts: ColumnSort[],
  vendorGridInfo: VendorGridInfo,
  name: string
): Layout {
  let columnIds: string[] = columns ? columns.filter(x => x.Visible).map(x => x.ColumnId) : [];
  return {
    Uuid: createUuid(),
    Columns: columnIds,
    ColumnSorts: columnSorts,
    GroupedColumns: null,
    PivotDetails: null,
    Name: name,
    VendorGridInfo: vendorGridInfo,
    AdaptableGridInfo: {
      CurrentColumns: columnIds,
      CurrentColumnSorts: columnSorts,
      ExpandedRowGroupKeys: undefined,
    },
  };
}

export function CreateEmptyPivotDetails(): PivotDetails {
  return {
    PivotColumns: [],
    AggregationColumns: [],
  };
}

export function CreateColumnFilter(columnId: string, expression: Expression): ColumnFilter {
  return {
    Uuid: createUuid(),
    ColumnId: columnId,
    Filter: expression,
  };
}

export function CreateUserFilterFromColumnFilter(
  columnFilter: ColumnFilter,
  name: string
): UserFilter {
  return {
    Uuid: createUuid(),
    Name: name,
    ColumnId: columnFilter.ColumnId,
    Expression: columnFilter.Filter,
  };
}

export function CreateRange(
  operator: LeafExpressionOperator,
  operand1?: any,
  operand2?: any,
  rangeOperandType?: RangeOperandType,
  rangeOperandType2?: RangeOperandType
): QueryRange {
  return {
    Operator: operator,
    Operand1: operand1,
    Operand2: operand2,
    Operand1Type: rangeOperandType,
    Operand2Type: rangeOperandType2,
  };
}

export function CreateRangeEvaluation(
  operator: LeafExpressionOperator,
  operand1: any,
  operand2: any,
  newValue: any,
  initialValue: any,
  columnId: string
): IRangeEvaluation {
  return {
    operand1: operand1,
    operand2: operand2,
    newValue: newValue,
    operator: operator,
    initialValue: initialValue,
    columnId: columnId,
  };
}
export function CreateCellValidationRule(
  columnId: string,
  range: QueryRange,
  actionMode: ActionMode,
  expression: Expression
): CellValidationRule {
  return {
    Uuid: createUuid(),
    ColumnId: columnId,
    Range: range,
    ActionMode: actionMode,
    Expression: expression,
  };
}

export function CreateEmptyStyle(): AdaptableStyle {
  return {
    BackColor: undefined,
    ForeColor: undefined,
    FontWeight: FontWeight.Normal,
    FontStyle: FontStyle.Normal,
    FontSize: undefined,
    ClassName: EMPTY_STRING,
  };
}

export function CreateEmptyCellSummmary(): CellSummmary {
  return {
    Sum: null,
    Average: null,
    Median: null,
    Mode: null,
    Distinct: null,
    Max: null,
    Min: null,
    Count: null,
  };
}

export function CreateSystemReports(): Array<Report> {
  let _systemReports: Report[] = [];

  _systemReports.push({
    Uuid: createUuid(),
    Name: ALL_DATA_REPORT,
    ReportColumnScope: ReportColumnScope.AllColumns,
    ReportRowScope: ReportRowScope.AllRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });

  _systemReports.push({
    Uuid: createUuid(),
    Name: VISIBLE_DATA_REPORT,
    ReportColumnScope: ReportColumnScope.VisibleColumns,
    ReportRowScope: ReportRowScope.VisibleRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });

  _systemReports.push({
    Uuid: createUuid(),
    Name: SELECTED_CELLS_REPORT,
    ReportColumnScope: ReportColumnScope.SelectedCellColumns,
    ReportRowScope: ReportRowScope.SelectedCellRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });

  _systemReports.push({
    Uuid: createUuid(),
    Name: SELECTED_ROWS_REPORT,
    ReportColumnScope: ReportColumnScope.VisibleColumns,
    ReportRowScope: ReportRowScope.SelectedRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });
  return _systemReports;
}

export const ObjectFactory = {
  CreateEmptyCustomSort,
  CreateEmptyDataSource,
  CreateEmptyPieChartDefinition,
  CreateEmptySparklinesChartDefinition,
  CreateEmptyCategoryChartDefinition,
  CreateEmptyCalculatedColumn,
  CreateEmptyPlusMinusRule,
  CreateEmptyAlert,
  CreateAlert,
  CreateEmptyAlertDefinition,
  CreateInternalAlertDefinitionForMessages,
  CreateEmptyAdvancedSearch,
  CreateEmptyColumnCategory,
  CreateEmptyRange,
  CreateEmptyColumnSort,
  CreateEmptyCellValidation,
  CreateEmptyPercentBar,
  CreateEmptyGradientColumn,
  CreateEmptySparklineColumn,
  CreateEmptyUserFilter,
  CreateEmptyReport,
  CreateDefaultFlashingCell,
  CreateEmptyReminder,
  CreateEmptyBaseSchedule,
  CreateEmptyReminderSchedule,
  CreateEmptyReportSchedule,
  CreateEmptyIPushPullSchedule,
  CreateEmptyIPushPullReport,
  CreateIPushPullSchedule,
  CreateGlue42Schedule,
  CreateReportSchedule,
  CreateEmptySchedule,
  CreateEmptyShortcut,
  CreateEmptyConditionalStyle,
  CreateEmptyFormatColumn,
  CreateEmptyFreeTextColumn,
  CreateEmptyLayout,
  CreateDefaultLayout,
  CreateEmptyPivotDetails,
  CreateColumnFilter,
  CreateUserFilterFromColumnFilter,
  CreateRange,
  CreateRangeEvaluation,
  CreateCellValidationRule,
  CreateEmptyStyle,
  CreateEmptyCellSummmary,
  CreateSystemReports,
  CreateEmptyGlue42Schedule,
  CreateEmptyGlue42Report,
};
export default ObjectFactory;
