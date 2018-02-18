import { Helper } from './Helpers/Helper';
import { ExpressionHelper } from './Helpers/ExpressionHelper';
import { IAdvancedSearch } from '../Strategy/Interface/IAdvancedSearchStrategy';
import { ICellValidationRule } from '../Strategy/Interface/ICellValidationStrategy';
import { IConditionalStyleCondition } from '../Strategy/Interface/IConditionalStyleStrategy';
import { ReportColumnScope, ReportRowScope, CellValidationMode, LeafExpressionOperator, DataType, ShortcutAction, ConditionalStyleScope, FontWeight, FontStyle } from '../Core/Enums';
import { IUserFilter } from '../Strategy/Interface/IUserFilterStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingColumn } from '../Strategy/Interface/IFlashingCellsStrategy'
import { IShortcut } from '../Strategy/Interface/IShortcutStrategy';
import { ICustomSort } from '../Strategy/Interface/ICustomSortStrategy';
import { IPlusMinusCondition } from '../Strategy/Interface/IPlusMinusStrategy';
import { IFormatColumn } from '../Strategy/Interface/IFormatColumnStrategy';
import { ICalculatedColumn } from "../Strategy/Interface/ICalculatedColumnStrategy";
import { IReport } from '../Strategy/Interface/IExportStrategy';

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
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: false
        }
    }

    export function CreateEmptyCellValidation(): ICellValidationRule {
        return {
            CellValidationMode: CellValidationMode.StopEdit,
            ColumnId: "",
            Range: {
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
           Name: "",
            Description: "",
            DataType: DataType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
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
        let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
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