import { ExpressionHelper, IRangeEvaluation } from './Helpers/ExpressionHelper';
import { IColumnSort } from './Interface/IColumnSort';
import { IStyle } from './Interface/IStyle';
import { IColumnCategory } from './Interface/BlotterObjects/IColumnCategory';
import { IFormatColumn } from './Interface/BlotterObjects/IFormatColumn';
import { ILayout } from './Interface/BlotterObjects/ILayout';
import { IPlusMinusRule } from './Interface/BlotterObjects/IPlusMinusRule';
import { IShortcut } from './Interface/BlotterObjects/IShortcut';
import { IUserFilter } from './Interface/BlotterObjects/IUserFilter';
import { IPercentBar } from './Interface/BlotterObjects/IPercentBar';
import { IFreeTextColumn } from './Interface/BlotterObjects/IFreeTextColumn';
import { IReport, IAutoExport } from './Interface/BlotterObjects/IReport';
import { IFlashingCell } from './Interface/BlotterObjects/IFlashingCell';
import { ICustomSort } from './Interface/BlotterObjects/ICustomSort';
import { IConditionalStyle } from './Interface/BlotterObjects/IConditionalStyle';
import { IColumnFilter } from './Interface/BlotterObjects/IColumnFilter';
import { ICellValidationRule } from './Interface/BlotterObjects/ICellValidationRule';
import { ICalculatedColumn } from './Interface/BlotterObjects/ICalculatedColumn';
import { IAdvancedSearch } from './Interface/BlotterObjects/IAdvancedSearch';
import {
  ICategoryChartDefinition,
  IPieChartDefinition,
} from './Interface/BlotterObjects/Charting/IChartDefinition';
import { IAlertDefinition } from './Interface/BlotterObjects/IAlertDefinition';
import { IRange } from './Interface/Expression/IRange';
import {
  LeafExpressionOperator,
  SortOrder,
  ReportColumnScope,
  ReportRowScope,
  MathOperation,
  DataType,
  ConditionalStyleScope,
  FontStyle,
  FontWeight,
  RangeOperandType,
  MessageType,
  ActionMode,
  LicenceScopeType,
  LicenceUserType,
  ExportDestination,
} from './Enums';
import { IColumn } from './Interface/IColumn';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { ColumnHelper } from './Helpers/ColumnHelper';
import { ICellSummmary } from './Interface/SelectedCell/ICellSummmary';
import { Expression } from '../Utilities/Expression';
import { IVendorGridInfo } from './Interface/IVendorGridInfo';
import { CellValidationHelper } from './Helpers/CellValidationHelper';
import {
  EMPTY_STRING,
  CHART_DEFAULT_YAXIS_TOTAL,
  PLUS_MINUS_DEFAULT_NUDGE_VALUE,
  ALERT_DEFAULT_OPERATOR,
  ALERT_DEFAULT_RANGE_OPERAND_TYPE,
  ALERT_DEFAULT_MESSAGE_TYPE,
  ALERT_DEFAULT_SHOW_AS_POPUP,
  DEFAULT_DARK_GREEN_COLOR,
  DEFAULT_DARK_RED_COLOR,
} from './Constants/GeneralConstants';
import { DefaultCategoryChartProperties } from './Defaults/DefaultCategoryChartProperties';
import { ILicenceInfo } from './Interface/ILicenceInfo';
import { ChartType, SecondaryColumnOperation } from './ChartEnums';
import { DefaultPieChartProperties } from './Defaults/DefaultPieChartProperties';
import { IDataSource } from './Interface/BlotterObjects/IDataSource';
import { ISchedule } from './Interface/BlotterObjects/ISchedule';
import { IReminder } from './Interface/BlotterObjects/IReminder';
import { IAdaptableAlert } from './Interface/IMessage';
import { createUuid } from './Uuid';

export function CreateLicenceInfo(
  licenceScopeType: LicenceScopeType,
  isLicenceInDate: boolean,
  licenceUserType: LicenceUserType,
  expiryDate: Date
): ILicenceInfo {
  return {
    LicenceScopeType: licenceScopeType,
    IsLicenceInDate: isLicenceInDate,
    LicenceUserType: licenceUserType,
    ExpiryDate: expiryDate,
  };
}

export function CreateEmptyCustomSort(): ICustomSort {
  return { Uuid: createUuid(), ColumnId: EMPTY_STRING, SortedValues: [] };
}

export function CreateEmptyDataSource(): IDataSource {
  return { Uuid: createUuid(), Name: EMPTY_STRING, Description: EMPTY_STRING };
}

export function CreateEmptyPieChartDefinition(): IPieChartDefinition {
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
export function CreateEmptyCategoryChartDefinition(): ICategoryChartDefinition {
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

export function CreateEmptyCalculatedColumn(): ICalculatedColumn {
  return { Uuid: createUuid(), ColumnId: EMPTY_STRING, ColumnExpression: EMPTY_STRING };
}

export function CreateEmptyPlusMinusRule(): IPlusMinusRule {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    IsDefaultNudge: false,
    NudgeValue: PLUS_MINUS_DEFAULT_NUDGE_VALUE,
    Expression: ExpressionHelper.CreateEmptyExpression(),
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

export function CreateEmptyAlertDefinition(): IAlertDefinition {
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
    Expression: ExpressionHelper.CreateEmptyExpression(),
    MessageType: ALERT_DEFAULT_MESSAGE_TYPE,
    ShowAsPopup: ALERT_DEFAULT_SHOW_AS_POPUP,
  };
}

export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Expression: ExpressionHelper.CreateEmptyExpression(),
  };
}

export function CreateEmptyColumnCategory(): IColumnCategory {
  return {
    Uuid: createUuid(),
    ColumnCategoryId: EMPTY_STRING,
    ColumnIds: [],
  };
}

export function CreateEmptyRange(): IRange {
  return {
    Operator: LeafExpressionOperator.Unknown,
    Operand1: EMPTY_STRING,
    Operand2: EMPTY_STRING,
    Operand1Type: RangeOperandType.Value,
    Operand2Type: RangeOperandType.Value,
  };
}

export function CreateEmptyColumnSort(): IColumnSort {
  return {
    Column: EMPTY_STRING,
    SortOrder: SortOrder.Unknown,
  };
}

export function CreateEmptyCellValidation(): ICellValidationRule {
  return {
    Uuid: createUuid(),
    ActionMode: 'Stop Edit',
    ColumnId: EMPTY_STRING,
    Range: {
      Operator: LeafExpressionOperator.None,
      Operand1: EMPTY_STRING,
      Operand2: EMPTY_STRING,
      Operand1Type: RangeOperandType.Column,
      Operand2Type: RangeOperandType.Column,
    },
    Expression: ExpressionHelper.CreateEmptyExpression(),
  };
}

export function CreateEmptyPercentBar(): IPercentBar {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    MaxValue: 100,
    MinValue: 0,
    PositiveColor: DEFAULT_DARK_GREEN_COLOR,
    NegativeColor: DEFAULT_DARK_RED_COLOR,
    ShowValue: false,
    MaxValueColumnId: undefined,
    MinValueColumnId: undefined,
  };
}

export function CreateEmptyUserFilter(): IUserFilter {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Expression: ExpressionHelper.CreateEmptyExpression(),
    ColumnId: EMPTY_STRING,
  };
}

export function CreateEmptyReport(): IReport {
  return {
    Uuid: createUuid(),
    Name: EMPTY_STRING,
    Expression: ExpressionHelper.CreateEmptyExpression(),
    ColumnIds: [],
    ReportColumnScope: ReportColumnScope.AllColumns,
    ReportRowScope: ReportRowScope.AllRows,
  };
}

export function CreateDefaultFlashingCell(
  column: IColumn,
  upColor: string,
  downColor: string,
  duration: number
): IFlashingCell {
  return {
    Uuid: createUuid(),
    IsLive: false,
    ColumnId: column.ColumnId,
    FlashingCellDuration: duration,
    UpColor: upColor,
    DownColor: downColor,
  };
}

export function CreateEmptyReminder(): IReminder {
  return {
    Uuid: createUuid(),
    Alert: CreateEmptyAlert(),
    Schedule: CreateEmptySchedule(),
  };
}

export function CreateEmptyAutoExport(): IAutoExport {
  return {
    Uuid: createUuid(),
    ExportDestination: ExportDestination.CSV,
    Schedule: CreateEmptySchedule(),
  };
}

export function CreateEmptySchedule(): ISchedule {
  return {
    // todo: base of tommorrow?
    Uuid: createUuid(),
    OneOffDate: undefined,
    DaysOfWeek: [],
    Hour: 17,
    Minute: 0,
  };
}

export function CreateEmptyShortcut(): IShortcut {
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
  CellValidation: ICellValidationRule,
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

export function CreateEmptyConditionalStyle(): IConditionalStyle {
  return {
    Uuid: createUuid(),
    ColumnId: undefined,
    ColumnCategoryId: undefined,
    Style: CreateEmptyStyle(),
    ConditionalStyleScope: ConditionalStyleScope.Row,
    Expression: ExpressionHelper.CreateEmptyExpression(),
  };
}

export function CreateEmptyFormatColumn(): IFormatColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    Style: CreateEmptyStyle(),
  };
}

export function CreateEmptyFreeTextColumn(): IFreeTextColumn {
  return {
    Uuid: createUuid(),
    ColumnId: EMPTY_STRING,
    DefaultValue: EMPTY_STRING,
    FreeTextStoredValues: [],
  };
}

export function CreateLayout(
  columns: IColumn[],
  columnSorts: IColumnSort[],
  vendorGridInfo: IVendorGridInfo,
  name: string
): ILayout {
  return {
    Uuid: createUuid(),
    Columns: columns ? columns.map(x => x.ColumnId) : [],
    ColumnSorts: columnSorts,
    Name: name,
    VendorGridInfo: vendorGridInfo,
  };
}

export function CreateColumnFilter(columnId: string, expression: Expression): IColumnFilter {
  return {
    Uuid: createUuid(),
    ColumnId: columnId,
    Filter: expression,
  };
}

export function CreateUserFilterFromColumnFilter(
  columnFilter: IColumnFilter,
  name: string
): IUserFilter {
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
): IRange {
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
  range: IRange,
  actionMode: ActionMode,
  expression: Expression
): ICellValidationRule {
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
  CreateLicenceInfo,
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
