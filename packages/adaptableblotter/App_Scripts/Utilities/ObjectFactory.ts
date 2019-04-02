import { ExpressionHelper, IRangeEvaluation } from './Helpers/ExpressionHelper';
import { IGridSort } from "./Interface/IGridSort";
import { IStyle } from "./Interface/IStyle";
import { IColumnCategory } from "./Interface/BlotterObjects/IColumnCategory";
import { IFormatColumn } from "./Interface/BlotterObjects/IFormatColumn";
import { ILayout } from "./Interface/BlotterObjects/ILayout";
import { IPlusMinusRule } from "./Interface/BlotterObjects/IPlusMinusRule";
import { IShortcut } from "./Interface/BlotterObjects/IShortcut";
import { IUserFilter } from "./Interface/BlotterObjects/IUserFilter";
import { IPercentBar } from "./Interface/BlotterObjects/IPercentBar";
import { IFreeTextColumn } from "./Interface/BlotterObjects/IFreeTextColumn";
import { IReport } from "./Interface/BlotterObjects/IReport";
import { IFlashingCell } from "./Interface/BlotterObjects/IFlashingCell";
import { ICustomSort } from "./Interface/BlotterObjects/ICustomSort";
import { IConditionalStyle } from "./Interface/BlotterObjects/IConditionalStyle";
import { IColumnFilter } from "./Interface/BlotterObjects/IColumnFilter";
import { ICellValidationRule } from "./Interface/BlotterObjects/ICellValidationRule";
import { ICalculatedColumn } from "./Interface/BlotterObjects/ICalculatedColumn";
import { IAdvancedSearch } from "./Interface/BlotterObjects/IAdvancedSearch";
import { ICategoryChartDefinition, IPieChartDefinition } from "./Interface/BlotterObjects/IChartDefinition";
import { IAlertDefinition } from "./Interface/BlotterObjects/IAlertDefinition";
import { IRange } from "./Interface/Expression/IRange";
import { LeafExpressionOperator, SortOrder, ReportColumnScope, ReportRowScope, MathOperation, DataType, ConditionalStyleScope, FontStyle, FontWeight, RangeOperandType, MessageType, ActionMode, LicenceScopeType, LicenceUserType, ScheduleType, ExportDestination } from './Enums';
import { IColumn } from './Interface/IColumn';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { ColumnHelper } from './Helpers/ColumnHelper';
import { ICellSummmary } from "./Interface/SelectedCell/ICellSummmary";
import { Expression } from '../Utilities/Expression';
import { IVendorGridInfo } from "./Interface/IVendorGridInfo";
import { CellValidationHelper } from './Helpers/CellValidationHelper';
import { EMPTY_STRING, CHART_DEFAULT_YAXIS_TOTAL, PLUS_MINUS_DEFAULT_NUDGE_VALUE, ALERT_DEFAULT_OPERATOR, ALERT_DEFAULT_RANGE_OPERAND_TYPE, ALERT_DEFAULT_MESSAGE_TYPE, ALERT_DEFAULT_SHOW_AS_POPUP, DEFAULT_DARK_GREEN_COLOR, DEFAULT_DARK_RED_COLOR } from './Constants/GeneralConstants';
import { DefaultCategoryChartProperties } from './Defaults/DefaultCategoryChartProperties';
import { ILicenceInfo } from './Interface/ILicenceInfo';
import { ChartType, SecondaryColumnOperation } from './ChartEnums';
import { DefaultPieChartProperties } from './Defaults/DefaultPieChartProperties';
import { ISchedule, IScheduleRule, IScheduleTime, IAlertScheduleItem } from './Interface/BlotterObjects/ISchedule';


export module ObjectFactory {

    export function CreateLicenceInfo(licenceType: LicenceScopeType, isLicenceInDate: boolean, licenceUserType: LicenceUserType, expiryDate: Date): ILicenceInfo {
        return {
            LicenceScopeType: licenceType,
            IsLicenceInDate: isLicenceInDate,
            LicenceUserType: licenceUserType,
            ExpiryDate: expiryDate
        }
    }

    export function CreateEmptyCustomSort(): ICustomSort {
        return { ColumnId: EMPTY_STRING, SortedValues: [] }
    }


    export function CreateTestSchedule(): ISchedule{
        let scheduleRule: IScheduleRule ={
            DayOfWeek:2,
            Hour: 9,
            Minute: 6
        }
       
        let scheduleTime: IScheduleTime={
           RecurringDate: scheduleRule
        }

        let reportSchedule: ISchedule = {
            ScheduleItem: {
                Name: "All Data",
                ExportDestination: ExportDestination.CSV
            },
            ScheduleTime: scheduleTime,
            ScheduleType: ScheduleType.Report
        }


        let alertScheduleItem: IAlertScheduleItem = {
            Alert: {

                Header: "Test Schedule",
                Msg: "This alert has worked",
                MessageType: MessageType.Success,
                ShowAsPopup: true
            }
        }

         let alertSchedule: ISchedule = {
            ScheduleItem: alertScheduleItem,
            ScheduleTime: scheduleTime,
            ScheduleType: ScheduleType.Alert
        }
console.log(alertSchedule);
        return alertSchedule;

    }

    export function CreateEmptyPieChartDefinition(): IPieChartDefinition {
        return {
            Name: EMPTY_STRING,
            Description: EMPTY_STRING,
            PrimaryColumnId: EMPTY_STRING,
            SecondaryColumnId: null,
            SecondaryColumnOperation: SecondaryColumnOperation.Count,
            ChartProperties: DefaultPieChartProperties,
            ChartType: ChartType.PieChart,
            VisibleRowsOnly: true
        }
    }
    export function CreateEmptyCategoryChartDefinition(): ICategoryChartDefinition {
        return {
            Name: EMPTY_STRING,
            Description: EMPTY_STRING,
            YAxisColumnIds: [],
            YAxisTotal: CHART_DEFAULT_YAXIS_TOTAL,
            XAxisColumnId: EMPTY_STRING,
            XAxisExpression: ExpressionHelper.CreateEmptyExpression(),
            ChartProperties: DefaultCategoryChartProperties,
            ChartType: ChartType.CategoryChart
        }
    }

    export function CreateEmptyCalculatedColumn(): ICalculatedColumn {
        return { ColumnId: EMPTY_STRING, ColumnExpression: EMPTY_STRING }
    }

    export function CreateEmptyPlusMinusRule(): IPlusMinusRule {
        return {
            ColumnId: EMPTY_STRING,
            IsDefaultNudge: false,
            NudgeValue: PLUS_MINUS_DEFAULT_NUDGE_VALUE,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
    }

    export function CreateEmptyAlertDefinition(): IAlertDefinition {
        return {
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
            ShowAsPopup: ALERT_DEFAULT_SHOW_AS_POPUP
        }
    }

    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Name: EMPTY_STRING,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
    }

    export function CreateEmptyColumnCategory(): IColumnCategory {
        return {
            ColumnCategoryId: EMPTY_STRING,
            ColumnIds: []
        }
    }

    export function CreateEmptyRange(): IRange {
        return {
            Operator: LeafExpressionOperator.Unknown,
            Operand1: EMPTY_STRING,
            Operand2: EMPTY_STRING,
            Operand1Type: RangeOperandType.Value,
            Operand2Type: RangeOperandType.Value
        }
    }

    export function CreateEmptyGridSort(): IGridSort {
        return {
            Column: EMPTY_STRING,
            SortOrder: SortOrder.Unknown
        }
    }

    export function CreateEmptyCellValidation(): ICellValidationRule {
        return {
            ActionMode: 'Stop Edit',
            ColumnId: EMPTY_STRING,
            Range: {
                Operator: LeafExpressionOperator.None,
                Operand1: EMPTY_STRING,
                Operand2: EMPTY_STRING,
                Operand1Type: RangeOperandType.Column,
                Operand2Type: RangeOperandType.Column,
            },
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
    }

    export function CreateEmptyPercentBar(): IPercentBar {
        return {
            ColumnId: EMPTY_STRING,
            MaxValue: 100,
            MinValue: 0,
            PositiveColor: DEFAULT_DARK_GREEN_COLOR,
            NegativeColor: DEFAULT_DARK_RED_COLOR,
            ShowValue: false,
            MaxValueColumnId: null,
            MinValueColumnId: null
        }
    }

    export function CreateEmptyUserFilter(): IUserFilter {
        return {
            Name: EMPTY_STRING,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            ColumnId: EMPTY_STRING
        };
    }

    export function CreateEmptyReport(): IReport {
        return {
            Name: EMPTY_STRING,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            ColumnIds: [],
            ReportColumnScope: ReportColumnScope.AllColumns,
            ReportRowScope: ReportRowScope.AllRows
        };
    }

    export function CreateDefaultFlashingCell(column: IColumn, upColor: string, downColor: string, duration: number): IFlashingCell {
        return {
            IsLive: false,
            ColumnId: column.ColumnId,
            FlashingCellDuration: duration,
            UpColor: upColor,
            DownColor: downColor
        };
    }


    export function CreateEmptyShortcut(): IShortcut {
        return {
            ShortcutKey: null,
            ShortcutResult: null,
            ColumnType: DataType.Number,
            ShortcutOperation: MathOperation.Multiply,
            IsDynamic: false
        }
    }

    export function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter): string {
        let columns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(CellValidation.ColumnId, columns)
        let expressionDescription: string = (ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, columns) :
            EMPTY_STRING;
        return (columnFriendlyName + ": " + CellValidationHelper.createCellValidationDescription(CellValidation, columns) + expressionDescription);
    }

    export function CreateEmptyConditionalStyle(): IConditionalStyle {
        return {
            ColumnId: null,
            ColumnCategoryId: null,
            Style: CreateEmptyStyle(),
            ConditionalStyleScope: ConditionalStyleScope.Row,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
    }

    export function CreateEmptyFormatColumn(): IFormatColumn {
        return {
            ColumnId: EMPTY_STRING,
            Style: CreateEmptyStyle()
        }
    }

    export function CreateEmptyFreeTextColumn(): IFreeTextColumn {
        return {
            ColumnId: EMPTY_STRING,
            DefaultValue: EMPTY_STRING,
            FreeTextStoredValues: []
        }
    }

    export function CreateLayout(columns: IColumn[], gridSorts: IGridSort[], vendorGridInfo: IVendorGridInfo, name: string): ILayout {
        return {
            Columns: (columns) ? columns.map(x => x.ColumnId) : [],
            GridSorts: gridSorts,
            Name: name,
            VendorGridInfo: vendorGridInfo
        }
    }

    export function CreateColumnFilter(columnId: string, expression: Expression): IColumnFilter {
        return {
            ColumnId: columnId,
            Filter: expression
        }
    }

    export function CreateColumnFilterFromUserFilter(userFilter: IUserFilter): IColumnFilter {
        return {
            ColumnId: userFilter.ColumnId,
            Filter: ExpressionHelper.CreateSingleColumnExpression(userFilter.ColumnId, [], [], [userFilter.Name], []),
        }
    }

    export function CreateUserFilterFromColumnFilter(columnFilter: IColumnFilter, name: string): IUserFilter {
        return {
            Name: name,
            ColumnId: columnFilter.ColumnId,
            Expression: columnFilter.Filter,
        }
    }

    export function CreateRange(operator: LeafExpressionOperator, operand1: any, operand2: any, rangeOperandType: RangeOperandType, rangeOperandType2: RangeOperandType): IRange {
        return {
            Operator: operator,
            Operand1: operand1,
            Operand2: operand2,
            Operand1Type: rangeOperandType,
            Operand2Type: rangeOperandType2
        }
    }

    export function CreateRangeEvaluation(operator: LeafExpressionOperator, operand1: any, operand2: any, newValue: any, initialValue: any, columnId: string): IRangeEvaluation {
        return {
            operand1: operand1,
            operand2: operand2,
            newValue: newValue,
            operator: operator,
            initialValue: initialValue,
            columnId: columnId
        }
    }
    export function CreateCellValidationRule(columnId: string, range: IRange, actionMode: ActionMode, expression: Expression): ICellValidationRule {
        return {
            ColumnId: columnId,
            Range: range,
            ActionMode: actionMode,
            Expression: expression,
        }
    }

    export function CreateEmptyStyle(): IStyle {
        return {
            BackColor: null,
            ForeColor: null,
            FontWeight: FontWeight.Normal,
            FontStyle: FontStyle.Normal,
            FontSize: null,
            ClassName: EMPTY_STRING
        }
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
            VWAP: null
        }
    }
}
