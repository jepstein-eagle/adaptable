import { Helper } from './Helper';
import { ExpressionHelper } from './Expression/ExpressionHelper';
import { IAdvancedSearch } from './Interface/IAdvancedSearchStrategy';
import { ICellValidationRule } from './Interface/ICellValidationStrategy';
import { IConditionalStyleCondition, IStyle } from './Interface/IConditionalStyleStrategy';
import { CellValidationMode, LeafExpressionOperator, DataType, ShortcutAction, ConditionalStyleScope, FontWeight , FontStyle, FontSize} from '../Core/Enums';
import { IUserFilter } from './Interface/IExpression';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingColumn, IFlashingCellDuration } from './Interface/IFlashingCellsStrategy'
import { IShortcut } from './Interface/IShortcutStrategy';
import { ICustomSort } from './Interface/ICustomSortStrategy';
import { IPlusMinusCondition } from './Interface/IPlusMinusStrategy';
import { Expression } from './Expression/Expression'

export module ObjectFactory {

    export function CreateEmptyCustomSort(): ICustomSort {
        return { ColumnId: "", CustomSortItems: [], IsPredefined: false }
    }

    export function CreateEmptyPlusMinusCondition(defaultNudgeValue: number): IPlusMinusCondition {
        return {
            ColumnId: "select",
            DefaultNudge: defaultNudgeValue,
            Expression: CreateEmptyExpression(),
            IsPredefined: false
        }
    }
    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Uid: Helper.generateUid(),
            Name: "",
            Expression: CreateEmptyExpression(),
            IsPredefined: false
        }
    }

    export function CreateEmptyCellValidation(): ICellValidationRule {
        return {
            CellValidationMode: CellValidationMode.Prevent,
            ColumnId: "",
            RangeExpression: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: ""
            },
            HasExpression: false,
            OtherExpression: CreateEmptyExpression(),
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
            Expression: CreateEmptyExpression(),
            IsExpressionSatisfied: (value: any): boolean => {
                return null;
            },
            IsPredefined: false
        };
    }

    export function CreateDefaultFlashingColumn(column: IColumn): IFlashingColumn {
        return {
            IsLive: false,
            ColumnName: column.ColumnId,
            FlashingCellDuration: GetFlashingCellDurations().find(f => f.Name == "1/2 Second"),
            UpBackColor: '#008000', DownBackColor: '#FF0000',
            IsPredefined: false
        };
    }

    export function GetFlashingCellDurations(): IFlashingCellDuration[] {
        return [
            { Name: "1/4 Second", Duration: 250 },
            { Name: "1/2 Second", Duration: 500 },
            { Name: "3/4 Second", Duration: 250 },
            { Name: "1 Second", Duration: 1000 },
        ]
    }

    export function CreateEmptyShortcut(): IShortcut {
        return {
            ShortcutKey: null,
            ShortcutResult: null,
            DataType: DataType.Number,
            ShortcutAction: ShortcutAction.Multiply,
            IsLive: true,
            IsPredefined: false,
            IsDynamic: false
        }
    }

    export function CreateEmptyExpression(): Expression {
        return new Expression([], [], [], [])
    }

    export function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter, showIntro = true): string {
        let intro: string = (showIntro) ? "The following Cell Validation was broken:" : "";
        let columns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters;
        let columnFriendlyName: string = columns.find(c => c.ColumnId == CellValidation.ColumnId).FriendlyName;
        let expressionDescription: string = (CellValidation.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, columns, userFilters) :
            "";
        return (intro + "\nColumn: '" + columnFriendlyName + "'\nRule: " + CellValidation.Description + expressionDescription);
    }

    export function CreateEmptyConditionalStyle(): IConditionalStyleCondition {
        return {
            Uid: Helper.generateUid(),
            ColumnId: "",
            Style: { BackColor: undefined, ForeColor: undefined, FontWeight: FontWeight.Normal,FontStyle: FontStyle.Normal , FontSize: FontSize.Medium},
            ConditionalStyleScope: ConditionalStyleScope.Row,
            Expression: CreateEmptyExpression(),
            IsPredefined: false
        }
    }





}

