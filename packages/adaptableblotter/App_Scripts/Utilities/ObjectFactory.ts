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
  ConditionalStyleScope,
  ActionMode,
  FontWeight,
  FontStyle,
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
import { ColumnSort, VendorGridInfo, Layout, PivotDetails } from '../PredefinedConfig/LayoutState';
import { CellValidationRule } from '../PredefinedConfig/CellValidationState';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { UserFilter } from '../PredefinedConfig/UserFilterState';
import { Report, AutoExport } from '../PredefinedConfig/ExportState';
import { AdaptableBlotterColumn } from './Interface/AdaptableBlotterColumn';
import { FlashingCell } from '../PredefinedConfig/FlashingCellState';
import { Reminder } from '../PredefinedConfig/ReminderState';
import { Schedule } from '../PredefinedConfig/Common/Schedule';
import { Shortcut } from '../PredefinedConfig/ShortcutState';
import { IAdaptableBlotter } from '../types';
import ColumnHelper from './Helpers/ColumnHelper';
import { ConditionalStyle } from '../PredefinedConfig/ConditionalStyleState';
import { FormatColumn } from '../PredefinedConfig/FormatColumnState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { Expression } from '../PredefinedConfig/Common/Expression/Expression';
import { ColumnFilter } from '../PredefinedConfig/ColumnFilterState';
import { IStyle } from '../PredefinedConfig/Common/IStyle';
import { ICellSummmary } from './Interface/Selection/ICellSummmary';
import { createUuid } from '../PredefinedConfig/Uuid';
import { QueryRange } from '../PredefinedConfig/Common/Expression/QueryRange';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { DefaultSparklinesChartProperties } from './Defaults/DefaultSparklinesChartProperties';
import { DARK_GREEN, DARK_RED, getHexForName } from '../View/UIHelper';
import { AlertDefinitionDeleteAction } from '../Redux/ActionsReducers/AlertRedux';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';

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
  return { Uuid: createUuid(), ColumnId: EMPTY_STRING, ColumnExpression: EMPTY_STRING };
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
      ShowPopup: showPopup ? showPopup : ALERT_DEFAULT_SHOW_POPUP,
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
    MaxValue: 100,
    MinValue: 0,
    PositiveColor: getHexForName(DARK_GREEN),
    NegativeColor: getHexForName(DARK_RED),
    ShowValue: false,
    ShowToolTip: true,
    MaxValueColumnId: undefined,
    MinValueColumnId: undefined,
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
    AutoExport: null,
  };
}

export function CreateDefaultFlashingCell(
  column: AdaptableBlotterColumn,
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

export function CreateEmptyReminder(): Reminder {
  return {
    Uuid: createUuid(),
    Alert: CreateEmptyAlert(),
    Schedule: CreateEmptySchedule(),
  };
}

export function CreateEmptyAutoExport(): AutoExport {
  return {
    Uuid: createUuid(),
    ExportDestination: ExportDestination.CSV,
    Schedule: CreateEmptySchedule(),
  };
}

export function CreateEmptySchedule(): Schedule {
  return {
    // todo: base of tommorrow?
    Uuid: createUuid(),
    OneOffDate: undefined,
    DaysOfWeek: [],
    Hour: 17,
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
    ConditionalStyleScope: ConditionalStyleScope.Row,
    Expression: ExpressionHelper.CreateEmptyExpression(),
  };
}

export function CreateEmptyFormatColumn(): FormatColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    Style: CreateEmptyStyle(),
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
    BlotterGridInfo: null,
  };
}

export function CreateLayout(
  columns: AdaptableBlotterColumn[],
  columnSorts: ColumnSort[],
  vendorGridInfo: VendorGridInfo,
  name: string
): Layout {
  return {
    Uuid: createUuid(),
    Columns: columns ? columns.map(x => x.ColumnId) : [],
    ColumnSorts: columnSorts,
    GroupedColumns: null,
    PivotDetails: null,
    Name: name,
    VendorGridInfo: vendorGridInfo,
    BlotterGridInfo: {
      CurrentColumns: columns ? columns.map(x => x.ColumnId) : [],
      CurrentColumnSorts: columnSorts,
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
  operand1: any,
  operand2: any,
  rangeOperandType: RangeOperandType,
  rangeOperandType2: RangeOperandType
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

export function CreateEmptyStyle(): IStyle {
  return {
    BackColor: undefined,
    ForeColor: undefined,
    FontWeight: FontWeight.Normal,
    FontStyle: FontStyle.Normal,
    FontSize: undefined,
    ClassName: EMPTY_STRING,
  };
}

export function CreateEmptyCellSummmary(): ICellSummmary {
  return {
    Sum: null,
    Average: null,
    Median: null,
    Mode: null,
    Distinct: null,
    Max: null,
    Min: null,
    Count: null,
    Only: null,
    VWAP: null,
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
    ReportColumnScope: ReportColumnScope.SelectedColumns,
    ReportRowScope: ReportRowScope.SelectedCells,
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
  CreateEmptySparklineColumn,
  CreateEmptyUserFilter,
  CreateEmptyReport,
  CreateDefaultFlashingCell,
  CreateEmptyReminder,
  CreateEmptyAutoExport,
  CreateEmptySchedule,
  CreateEmptyShortcut,
  CreateEmptyConditionalStyle,
  CreateEmptyFormatColumn,
  CreateEmptyFreeTextColumn,
  CreateEmptyLayout,
  CreateLayout,
  CreateEmptyPivotDetails,
  CreateColumnFilter,
  CreateUserFilterFromColumnFilter,
  CreateRange,
  CreateRangeEvaluation,
  CreateCellValidationRule,
  CreateEmptyStyle,
  CreateEmptyCellSummmary,
  CreateSystemReports,
};
export default ObjectFactory;
