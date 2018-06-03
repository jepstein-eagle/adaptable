import { Helper } from './Helpers/Helper';
import { ExpressionHelper } from './Helpers/ExpressionHelper';
import { IAdvancedSearch, ICalculatedColumn, IPlusMinusRule, ICustomSort, IRange, IGridSort, ICellValidationRule, IUserFilter, IFlashingCell, IShortcut, IConditionalStyle, IFormatColumn, ILayout, IReport, IStyle } from './Api/Interface/AdaptableBlotterObjects';
import { LeafExpressionOperator, SortOrder, ReportColumnScope, ReportRowScope, MathOperation, DataType, ConditionalStyleScope, FontStyle, FontWeight, RangeOperandType } from './Enums';
import { IColumn } from './Interface/IColumn';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { KeyValuePair } from '../View/UIInterfaces';
import { ColumnHelper } from './Helpers/ColumnHelper';
import { ISelectedCellSummmary } from '../Strategy/Interface/ISelectedCellsStrategy';

export module ObjectFactory {

    export function CreateEmptyCustomSort(): ICustomSort {
        return { ColumnId: "", SortedValues: [], IsReadOnly: false }
    }

    export function CreateEmptyCalculatedColumn(): ICalculatedColumn {
        return { ColumnId: "", ColumnExpression: "", IsReadOnly: false }
    }

    export function CreateEmptyPlusMinusRule(): IPlusMinusRule {
        return {
            ColumnId: "",
            IsDefaultNudge: false,
            NudgeValue: 1,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsReadOnly: false
        }
    }

    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsReadOnly: false
        }
    }

    export function CreateEmptyRange(): IRange {
        return {
            Operator: LeafExpressionOperator.Unknown,
            Operand1: "",
            Operand2: "",
            Operand1Type: RangeOperandType.Value,
            Operand2Type: RangeOperandType.Value
        }
    }

    export function CreateEmptyGridSort(): IGridSort {
        return {
            Column: "",
            SortOrder: SortOrder.Unknown
        }
    }

    export function CreateEmptyCellValidation(): ICellValidationRule {
        return {
            CellValidationMode: 'Stop Edit',
            ColumnId: "",
            Range: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: "",
                Operand1Type: RangeOperandType.Column,
                Operand2Type:  RangeOperandType.Column,
            },
            HasExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: "",
            IsReadOnly: false
        }
    }

    export function CreateEmptyUserFilter(): IUserFilter {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            ColumnId: "",
            IsReadOnly: false
        };
    }

    export function CreateEmptyReport(): IReport {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            Columns: [],
            ReportColumnScope: ReportColumnScope.AllColumns,
            ReportRowScope: ReportRowScope.ExpressionRows,
            IsReadOnly: true
        };
    }

    export function CreateDefaultFlashingCell(column: IColumn): IFlashingCell {
        return {
            IsLive: false,
            ColumnId: column.ColumnId,
            FlashingCellDuration: 500,
            UpColor: '#008000', DownColor: '#FF0000',
            IsReadOnly: false
        };
    }


    export function CreateEmptyShortcut(): IShortcut {
        return {
            ShortcutKey: null,
            ShortcutResult: null,
            ColumnType: DataType.Number,
            ShortcutOperation: MathOperation.Multiply,
            IsReadOnly: false,
            IsDynamic: false
        }
    }

    export function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter, showIntro = true): string {
        let columns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters;
        let columnFriendlyName: string =  ColumnHelper.getFriendlyNameFromColumnId(CellValidation.ColumnId, columns) 
        let expressionDescription: string = (CellValidation.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, columns, userFilters) :
            "";
        return (columnFriendlyName + ": " + CellValidation.Description + expressionDescription);
    }

    export function CreateEmptyConditionalStyle(): IConditionalStyle {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle(),
            ConditionalStyleScope: ConditionalStyleScope.Row,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsReadOnly: false
        }
    }

    export function CreateEmptyFormatColumn(): IFormatColumn {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle(),
            IsReadOnly: false
        }
    }

    export function CreateLayout(columns: IColumn[], gridSorts: IGridSort[], vendorGridInfo: KeyValuePair[], name: string): ILayout {
        return {
            Columns: (columns)? columns.map(x => x.ColumnId): [],
            GridSorts: gridSorts,
            Name: name,
            VendorGridInfo: vendorGridInfo,
            IsReadOnly: false
        }
    }

    export function CreateEmptyStyle(): IStyle {
        return {
            BackColor: null, 
            ForeColor: null, 
            FontWeight: FontWeight.Normal, 
            FontStyle: FontStyle.Normal, 
            FontSize: null, 
            ClassName: ""
        }
    }

    export function CreateEmptySelectedCellSummmary(): ISelectedCellSummmary {
        return {
            Sum: null,
            Average:  null,
            Mode:  null,
            Median:  null,
            Distinct:  null,
            Max:  null,
            Min: null,
            Count: null,
        }
    }

}