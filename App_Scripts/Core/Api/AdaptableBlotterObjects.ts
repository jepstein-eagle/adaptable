import { LeafExpressionOperator, RangeOperandType, SortOrder, CellValidationMode, ConditionalStyleScope, MathOperation, DataType, ReportColumnScope, ReportRowScope } from '../Enums';
import { IStyle } from '../Interface/IStyle';


/**
 * The base Adaptable Blotter Object interface 
 */
export interface IAdaptableBlotterObject {
  IsPredefined: boolean
}

// Basic Expression object
export class Expression {
  constructor(
      public ColumnDisplayValuesExpressions: Array<{ ColumnName: string, ColumnDisplayValues: Array<string> }>,
      public ColumnRawValuesExpressions: Array<{ ColumnName: string, ColumnRawValues: Array<any> }>,
      public FilterExpressions: Array<{ ColumnName: string, Filters: Array<string> }>,
      public RangeExpressions: Array<{ ColumnName: string, Ranges: Array<IRange> }>) {
  }
} 


export interface IRange {
  Operator: LeafExpressionOperator;
  Operand1: string;
  Operand2: string;
  Operand1Type: RangeOperandType
  Operand2Type: RangeOperandType
}


export interface IRangeEvaluation {
   operand1: any;
   operand2: any;
   newValue: any;
   operator: LeafExpressionOperator;
   initialValue: any
}

// Core objects for Strategies
export interface IAdvancedSearch extends IAdaptableBlotterObject {
  Name: string,
  Expression: Expression,
}


export interface ICalculatedColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string
}

export interface ICalendar {
  CalendarName: string;
  YearName: Number;
  CalendarEntries: ICalendarEntry[];
}

export interface ICalendarEntry {
  HolidayName: string;
  HolidayDate: string;
}

export interface ICellValidationRule extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange,
  CellValidationMode: CellValidationMode;
  Description: string;
  HasExpression: boolean;
  OtherExpression: Expression;
}

export interface IColumnFilter  {
  ColumnId: string
  Filter: Expression
}

export interface IConditionalStyle extends IAdaptableBlotterObject {
  ColumnId: string
  ConditionalStyleScope: ConditionalStyleScope
  Expression: Expression
  Style: IStyle
}

export interface ICustomSort extends IAdaptableBlotterObject {
  ColumnId: string;
  Values: string[]
}

export interface IReport extends IAdaptableBlotterObject {
  Name: string;
  ReportColumnScope: ReportColumnScope
  ReportRowScope: ReportRowScope
  Columns: string[]
  Expression: Expression
}

export interface IFlashingCell extends IAdaptableBlotterObject {
  IsLive: boolean,
  ColumnName: string;
  FlashingCellDuration: number;
  UpBackColor : string
  DownBackColor : string
}

export interface IFormatColumn extends IAdaptableBlotterObject {
  ColumnId: string
  Style: IStyle
}

export interface ILayout extends IAdaptableBlotterObject{
  Name: string;
  Columns: string[];
  GridSorts: IGridSort[]
}

export interface IPlusMinusRule extends IAdaptableBlotterObject{
  ColumnId: string
  IsDefaultNudge: boolean
  NudgeValue: number
  Expression: Expression
}

export interface IShortcut extends IAdaptableBlotterObject{
  ShortcutKey: string;
  ShortcutResult: any;
  ShortcutOperation: MathOperation
  DataType: DataType;
  IsDynamic: boolean
}

export interface IUserFilter extends IAdaptableBlotterObject {
  Name: string;
  Expression: Expression;
  ColumnId: string
}

export interface IUserTheme extends IAdaptableBlotterObject {
  Name: string;
  Url: string
}


// used in layouts to save which is the current sorted column
export interface IGridSort {
  Column: string;
  SortOrder: SortOrder
}

