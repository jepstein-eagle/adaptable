import { IRangeEvaluation } from './Helpers/ExpressionHelper';
import { IAdvancedSearch, ICalculatedColumn, IPlusMinusRule, ICustomSort, IRange, IGridSort, ICellValidationRule, IUserFilter, IFlashingCell, IShortcut, IConditionalStyle, IFormatColumn, ILayout, IReport, IStyle, IAlertDefinition, IChartDefinition, IColumnFilter, IFreeTextColumn, IPercentBar, IColumnCategory } from './Interface/IAdaptableBlotterObjects';
import { LeafExpressionOperator, RangeOperandType, ActionMode } from './Enums';
import { IColumn } from './Interface/IColumn';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { ISelectedCellSummmary } from '../Strategy/Interface/ISelectedCellsStrategy';
import { Expression } from '../Utilities/Expression';
import { IVendorGridInfo } from "./Interface/IVendorGridInfo";
export declare module ObjectFactory {
    function CreateEmptyCustomSort(): ICustomSort;
    function CreateEmptyChartDefinition(): IChartDefinition;
    function CreateEmptyCalculatedColumn(): ICalculatedColumn;
    function CreateEmptyPlusMinusRule(): IPlusMinusRule;
    function CreateEmptyAlertDefinition(): IAlertDefinition;
    function CreateEmptyAdvancedSearch(): IAdvancedSearch;
    function CreateEmptyColumnCategory(): IColumnCategory;
    function CreateEmptyRange(): IRange;
    function CreateEmptyGridSort(): IGridSort;
    function CreateEmptyCellValidation(): ICellValidationRule;
    function CreateEmptyPercentBar(): IPercentBar;
    function CreateEmptyUserFilter(): IUserFilter;
    function CreateEmptyReport(): IReport;
    function CreateDefaultFlashingCell(column: IColumn, upColor: string, downColor: string, duration: number): IFlashingCell;
    function CreateEmptyShortcut(): IShortcut;
    function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter): string;
    function CreateEmptyConditionalStyle(): IConditionalStyle;
    function CreateEmptyFormatColumn(): IFormatColumn;
    function CreateEmptyFreeTextColumn(): IFreeTextColumn;
    function CreateLayout(columns: IColumn[], gridSorts: IGridSort[], vendorGridInfo: IVendorGridInfo, name: string): ILayout;
    function CreateColumnFilter(columnId: string, expression: Expression): IColumnFilter;
    function CreateColumnFilterFromUserFilter(userFilter: IUserFilter): IColumnFilter;
    function CreateUserFilterFromColumnFilter(columnFilter: IColumnFilter, name: string): IUserFilter;
    function CreateRange(operator: LeafExpressionOperator, operand1: any, operand2: any, rangeOperandType: RangeOperandType, rangeOperandType2: RangeOperandType): IRange;
    function CreateRangeEvaluation(operator: LeafExpressionOperator, operand1: any, operand2: any, newValue: any, initialValue: any, columnId: string): IRangeEvaluation;
    function CreateCellValidationRule(columnId: string, range: IRange, actionMode: ActionMode, expression: Expression): ICellValidationRule;
    function CreateEmptyStyle(): IStyle;
    function CreateEmptySelectedCellSummmary(): ISelectedCellSummmary;
}
