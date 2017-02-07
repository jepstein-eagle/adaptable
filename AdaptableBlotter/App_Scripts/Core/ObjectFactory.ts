import { Helper } from './Helper';
import { ExpressionHelper } from './Expression/ExpressionHelper';
import { IAdvancedSearch } from './Interface/IAdvancedSearchStrategy';
import { ICellValidationRule } from './Interface/ICellValidationStrategy';
import { CellValidationAction, LeafExpressionOperator, ColumnType, ShortcutAction } from '../Core/Enums';
import { IUserFilter } from './Interface/IExpression';
import { IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingColumn, IFlashingCellDuration } from './Interface/IFlashingCellsStrategy'
import { IShortcut } from './Interface/IShortcutStrategy';

export module ObjectFactory {
    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Uid: Helper.generateUid(),
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
        }
    }

    export function CreateEmptyCellValidation(): ICellValidationRule {
        return {
            CellValidationAction: CellValidationAction.Prevent,
            ColumnId: "",
            RangeExpression: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: ""
            },
            HasExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        }
    }

    export function CreateEmptyUserFilter(): IUserFilter {
        return {
            Uid: Helper.generateUid(),
            FriendlyName: "",
            Description: "",
            ColumnType: ColumnType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (value: any): boolean => {
                return null;
            },
            IsPredefined: false
        };
    }

    export function CreateDefaultFlashingColumn(column: IColumn): IFlashingColumn {
        return { IsLive: false, ColumnName: column.ColumnId, FlashingCellDuration: GetFlashingCellDurations().find(f => f.Name == "1/2 Second"), UpBackColor: '#008000', DownBackColor: '#FF0000' };
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
            ColumnType: ColumnType.Number,
            ShortcutAction: ShortcutAction.Multiply,
            IsLive: true,
            IsPredefined: false,
            IsDynamic: false
        }
    }
}

