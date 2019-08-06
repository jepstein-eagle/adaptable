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
import { CustomSort } from '../PredefinedConfig/RunTimeState/CustomSortState';
import {
  EMPTY_STRING,
  CHART_DEFAULT_YAXIS_TOTAL,
  PLUS_MINUS_DEFAULT_NUDGE_VALUE,
  ALERT_DEFAULT_SHOW_AS_POPUP,
  ALERT_DEFAULT_OPERATOR,
  ALERT_DEFAULT_RANGE_OPERAND_TYPE,
  ALERT_DEFAULT_MESSAGE_TYPE,
  DEFAULT_DARK_GREEN_COLOR,
  DEFAULT_DARK_RED_COLOR,
} from './Constants/GeneralConstants';
import { DataSource } from '../PredefinedConfig/RunTimeState/DataSourceState';
import {
  PieChartDefinition,
  CategoryChartDefinition,
} from '../PredefinedConfig/RunTimeState/ChartState';
import { SecondaryColumnOperation, ChartType } from '../PredefinedConfig/Common/ChartEnums';
import { DefaultPieChartProperties } from './Defaults/DefaultPieChartProperties';
import { DefaultCategoryChartProperties } from './Defaults/DefaultCategoryChartProperties';
import { CalculatedColumn } from '../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { PlusMinusRule } from '../PredefinedConfig/RunTimeState/PlusMinusState';
import { IAdaptableAlert } from './Interface/IMessage';
import { AlertDefinition } from '../PredefinedConfig/RunTimeState/AlertState';
import { AdvancedSearch } from '../PredefinedConfig/RunTimeState/AdvancedSearchState';
import ExpressionHelper, { IRangeEvaluation } from './Helpers/ExpressionHelper';
import { ColumnCategory } from '../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { ColumnSort, VendorGridInfo, Layout } from '../PredefinedConfig/RunTimeState/LayoutState';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';
import { PercentBar } from '../PredefinedConfig/RunTimeState/PercentBarState';
import { UserFilter } from '../PredefinedConfig/RunTimeState/UserFilterState';
import { Report, AutoExport } from '../PredefinedConfig/RunTimeState/ExportState';
import { IColumn } from './Interface/IColumn';
import { FlashingCell } from '../PredefinedConfig/RunTimeState/FlashingCellState';
import { Reminder } from '../PredefinedConfig/RunTimeState/ReminderState';
import { Schedule } from '../PredefinedConfig/Common/Schedule';
import { Shortcut } from '../PredefinedConfig/RunTimeState/ShortcutState';
import { IAdaptableBlotter } from '../types';
import ColumnHelper from './Helpers/ColumnHelper';
import CellValidationHelper from './Helpers/CellValidationHelper';
import { ConditionalStyle } from '../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { FormatColumn } from '../PredefinedConfig/RunTimeState/FormatColumnState';
import { FreeTextColumn } from '../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { Expression } from '../PredefinedConfig/Common/Expression/Expression';
import { ColumnFilter } from '../PredefinedConfig/RunTimeState/ColumnFilterState';
import { IStyle } from '../PredefinedConfig/Common/IStyle';
import { ICellSummmary } from './Interface/SelectedCell/ICellSummmary';
import { createUuid } from '../PredefinedConfig/Uuid';
import { QueryRange } from '../PredefinedConfig/Common/Expression/QueryRange';

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

export function CreateEmptyAlert(): IAdaptableAlert {
  return {
    Header: EMPTY_STRING,
    Msg: EMPTY_STRING,
    MessageType: MessageType.Info,
    ShowAsPopup: ALERT_DEFAULT_SHOW_AS_POPUP,
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
    ShowAsPopup: ALERT_DEFAULT_SHOW_AS_POPUP,
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
    PositiveColor: DEFAULT_DARK_GREEN_COLOR,
    NegativeColor: DEFAULT_DARK_RED_COLOR,
    ShowValue: false,
    ShowToolTip: true,
    MaxValueColumnId: undefined,
    MinValueColumnId: undefined,
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
  column: IColumn,
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

export function CreateCellValidationMessage(
  CellValidation: CellValidationRule,
  blotter: IAdaptableBlotter
): string {
  let columns: IColumn[] = blotter.api.gridApi.getColumns();
  let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(
    CellValidation.ColumnId,
    columns
  );
  let expressionDescription: string = ExpressionHelper.IsNotNullOrEmptyExpression(
    CellValidation.Expression
  )
    ? ' when ' + ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, columns)
    : EMPTY_STRING;
  return (
    columnFriendlyName +
    ': ' +
    CellValidationHelper.createCellValidationDescription(CellValidation, columns) +
    expressionDescription
  );
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

export function CreateLayout(
  columns: IColumn[],
  columnSorts: ColumnSort[],
  vendorGridInfo: VendorGridInfo,
  name: string
): Layout {
  return {
    Uuid: createUuid(),
    Columns: columns ? columns.map(x => x.ColumnId) : [],
    ColumnSorts: columnSorts,
    Name: name,
    VendorGridInfo: vendorGridInfo,
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
    Distinct: null,
    Max: null,
    Min: null,
    Count: null,
    Only: null,
    VWAP: null,
  };
}

export const ObjectFactory = {
  CreateEmptyCustomSort,
  CreateEmptyDataSource,
  CreateEmptyPieChartDefinition,
  CreateEmptyCategoryChartDefinition,
  CreateEmptyCalculatedColumn,
  CreateEmptyPlusMinusRule,
  CreateEmptyAlert,
  CreateEmptyAlertDefinition,
  CreateEmptyAdvancedSearch,
  CreateEmptyColumnCategory,
  CreateEmptyRange,
  CreateEmptyColumnSort,
  CreateEmptyCellValidation,
  CreateEmptyPercentBar,
  CreateEmptyUserFilter,
  CreateEmptyReport,
  CreateDefaultFlashingCell,
  CreateEmptyReminder,
  CreateEmptyAutoExport,
  CreateEmptySchedule,
  CreateEmptyShortcut,
  CreateCellValidationMessage,
  CreateEmptyConditionalStyle,
  CreateEmptyFormatColumn,
  CreateEmptyFreeTextColumn,
  CreateLayout,
  CreateColumnFilter,
  CreateUserFilterFromColumnFilter,
  CreateRange,
  CreateRangeEvaluation,
  CreateCellValidationRule,
  CreateEmptyStyle,
  CreateEmptyCellSummmary,
};
export default ObjectFactory;
