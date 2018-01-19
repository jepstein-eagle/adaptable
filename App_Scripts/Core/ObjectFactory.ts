import { Helper } from './Helper';
import { ExpressionHelper } from './Expression/ExpressionHelper';
import { IAdvancedSearch } from './Interface/IAdvancedSearchStrategy';
import { ICellValidationRule } from './Interface/ICellValidationStrategy';
import { IConditionalStyleCondition } from './Interface/IConditionalStyleStrategy';
import { RangeColumnScope, RangeRowScope, CellValidationMode, LeafExpressionOperator, DataType, ShortcutAction, ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../Core/Enums';
import { IUserFilter } from './Interface/IExpression';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingColumn } from './Interface/IFlashingCellsStrategy'
import { IShortcut } from './Interface/IShortcutStrategy';
import { ICustomSort } from './Interface/ICustomSortStrategy';
import { IPlusMinusCondition } from './Interface/IPlusMinusStrategy';
import { IFormatColumn } from './Interface/IFormatColumnStrategy';
import { Expression } from './Expression/Expression'
import { ICalculatedColumn } from "./Interface/ICalculatedColumnStrategy";
import { IRange } from './Interface/IExportStrategy';
import { IStyle } from '../Core/Interface/IStyle';

export module ObjectFactory {



    export function CreateEmptyCustomSort(): ICustomSort {
        return { ColumnId: "", CustomSortItems: [], IsPredefined: false }
    }

    export function CreateEmptyCalculatedColumn(): ICalculatedColumn {
        return { ColumnId: "", GetValueFunc: "", IsPredefined: false }
    }

    export function CreateEmptyPlusMinusCondition(defaultNudgeValue: number): IPlusMinusCondition {
        return {
            ColumnId: "",
            DefaultNudge: defaultNudgeValue,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
        }
    }
    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Uid: Helper.generateUid(),
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
        }
    }

    export function CreateEmptyCellValidation(): ICellValidationRule {
        return {
            CellValidationMode: CellValidationMode.PreventEdit,
            ColumnId: "",
            RangeExpression: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: ""
            },
            HasExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: "",
            IsPredefined: false
        }
    }

    export function CreateEmptyUserFilter(): IUserFilter {
        return {
            Uid: Helper.generateUid(),
            FriendlyName: "",
            Description: "",
            DataType: DataType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
        };
    }

    export function CreateEmptyRange(): IRange {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            Columns: [],
            RangeColumnScope: RangeColumnScope.AllColumns,
            RangeRowScope: RangeRowScope.ExpressionRows,
            IsPredefined: false
        };
    }

    export function CreateDefaultFlashingColumn(column: IColumn): IFlashingColumn {
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
            ShortcutAction: ShortcutAction.Multiply,
            IsPredefined: false,
            IsDynamic: false
        }
    }


    export function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter, showIntro = true): string {
        let columns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters;
        let columnFriendlyName: string = columns.find(c => c.ColumnId == CellValidation.ColumnId).FriendlyName;
        let expressionDescription: string = (CellValidation.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, columns, userFilters) :
            "";
        return (columnFriendlyName + ": " + CellValidation.Description + expressionDescription);
    }

    export function CreateEmptyConditionalStyle(): IConditionalStyleCondition {
        return {
            ColumnId: "",
            Style: { BackColor: null, ForeColor: null, FontWeight: FontWeight.Normal, FontStyle: FontStyle.Normal, FontSize: null },
            ConditionalStyleScope: ConditionalStyleScope.Row,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
        }
    }

    export function CreateEmptyFormatColumn(): IFormatColumn {
        return {
            ColumnId: "",
            Style: { BackColor: null, ForeColor: null, FontWeight: FontWeight.Normal, FontStyle: FontStyle.Normal, FontSize: null },
            IsPredefined: false
        }
    }





}