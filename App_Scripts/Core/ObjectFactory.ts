import { Helper } from './Helpers/Helper';
import { ExpressionHelper } from './Helpers/ExpressionHelper';
import { IAdvancedSearch } from '../Strategy/Interface/IAdvancedSearchStrategy';
import { ICellValidationRule } from '../Strategy/Interface/ICellValidationStrategy';
import { IConditionalStyle } from '../Strategy/Interface/IConditionalStyleStrategy';
import { ReportColumnScope, ReportRowScope, CellValidationMode, LeafExpressionOperator, DataType, MathOperation, ConditionalStyleScope, FontWeight, FontStyle, RangeOperandType, SortOrder } from '../Core/Enums';
import { IUserFilter } from '../Strategy/Interface/IUserFilterStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCell } from '../Strategy/Interface/IFlashingCellsStrategy'
import { IShortcut } from '../Strategy/Interface/IShortcutStrategy';
import { ICustomSort } from '../Strategy/Interface/ICustomSortStrategy';
import { IPlusMinusRule } from '../Strategy/Interface/IPlusMinusStrategy';
import { IFormatColumn } from '../Strategy/Interface/IFormatColumnStrategy';
import { ICalculatedColumn } from "../Strategy/Interface/ICalculatedColumnStrategy";
import { IReport } from '../Strategy/Interface/IExportStrategy';
import { IColumn } from './Interface/IColumn';
import { IRange } from './Interface/IRange';
import { ILayout } from '../Strategy/Interface/ILayoutStrategy';
import { IGridSort } from './Interface/Interfaces';
import { IStyle } from './Interface/IStyle';

export module ObjectFactory {

    export function CreateEmptyCustomSort(): ICustomSort {
        return { ColumnId: "", Values: [], IsPredefined: false }
    }

    export function CreateEmptyCalculatedColumn(): ICalculatedColumn {
        return { ColumnId: "", GetValueFunc: "", IsPredefined: false }
    }

    export function CreateEmptyPlusMinusRule(): IPlusMinusRule {
        return {
            ColumnId: "",
            IsDefaultNudge: false,
            NudgeValue: 1,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
        }
    }

    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
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
            CellValidationMode: CellValidationMode.StopEdit,
            ColumnId: "",
            Range: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: "",
                Operand1Type: RangeOperandType.Column,
                Operand2Type: RangeOperandType.Column,
            },
            HasExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: "",
            IsPredefined: false
        }
    }

    export function CreateEmptyUserFilter(): IUserFilter {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            ColumnId: "",
            IsPredefined: false
        };
    }

    export function CreateEmptyReport(): IReport {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            Columns: [],
            ReportColumnScope: ReportColumnScope.AllColumns,
            ReportRowScope: ReportRowScope.ExpressionRows,
            IsPredefined: false
        };
    }

    export function CreateDefaultFlashingCell(column: IColumn): IFlashingCell {
        return {
            IsLive: false,
            ColumnName: column.ColumnId,
            FlashingCellDuration: 500,
            UpBackColor: '#008000', DownBackColor: '#FF0000',
            IsPredefined: false
        };
    }

    export function GetFlashingCellDurations(): number[] {
        return [250, 500, 750, 1000]
    }

    export function CreateEmptyShortcut(): IShortcut {
        return {
            ShortcutKey: null,
            ShortcutResult: null,
            DataType: DataType.Number,
            ShortcutOperation: MathOperation.Multiply,
            IsPredefined: false,
            IsDynamic: false
        }
    }

    export function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter, showIntro = true): string {
        let columns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
        let columnFriendlyName: string = columns.find(c => c.ColumnId == CellValidation.ColumnId).FriendlyName;
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
            IsPredefined: false
        }
    }

    export function CreateEmptyFormatColumn(): IFormatColumn {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle(),
            IsPredefined: false
        }
    }

    export function CreateLayout(columns: IColumn[], gridSorts: IGridSort[], name: string): ILayout {
        return {
            Columns: (columns)? columns.map(x => x.ColumnId): [],
            GridSorts: gridSorts,
            Name: name,
            IsPredefined: false
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

}