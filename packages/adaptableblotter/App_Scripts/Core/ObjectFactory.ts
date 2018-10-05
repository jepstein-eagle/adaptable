import { Helper } from './Helpers/Helper';
import { ExpressionHelper } from './Helpers/ExpressionHelper';
import { IAdvancedSearch, ICalculatedColumn, IPlusMinusRule, ICustomSort, IRange, IGridSort, ICellValidationRule, IUserFilter, IFlashingCell, IShortcut, IConditionalStyle, IFormatColumn, ILayout, IReport, IStyle, IAlertDefinition, IChartDefinition, IColumnFilter } from './Api/Interface/IAdaptableBlotterObjects';
import { LeafExpressionOperator, SortOrder, ReportColumnScope, ReportRowScope, MathOperation, DataType, ConditionalStyleScope, FontStyle, FontWeight, RangeOperandType, MessageType, ChartType, ActionMode } from './Enums';
import { IColumn } from './Interface/IColumn';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { KeyValuePair } from '../View/UIInterfaces';
import { ColumnHelper } from './Helpers/ColumnHelper';
import { ISelectedCellSummmary } from '../Strategy/Interface/ISelectedCellsStrategy';
import * as GeneralConstants from './Constants/GeneralConstants';
import { Expression } from './Api/Expression';

export module ObjectFactory {

    export function CreateEmptyCustomSort(): ICustomSort {
        return { ColumnId: "", SortedValues: [] }
    }

    export function CreateEmptyChartDefinition(): IChartDefinition {
        return {
            Name: "",
            Type: ChartType.BarChart,
            YAxisColumn: "",
            XAxisColumn: "",
            XAxisColumnValues: [GeneralConstants.ALL_COLUMN_VALUES]
        }
    }

    export function CreateEmptyCalculatedColumn(): ICalculatedColumn {
        return { ColumnId: "", ColumnExpression: "" }
    }

    export function CreateEmptyPlusMinusRule(): IPlusMinusRule {
        return {
            ColumnId: "",
            IsDefaultNudge: false,
            NudgeValue: 1,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
    }

    export function CreateEmptyAlertDefinition(): IAlertDefinition {
        return {
            ColumnId: "",
            Range: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: "",
                Operand1Type: RangeOperandType.Column,
                Operand2Type: RangeOperandType.Column,
            },
            Expression: ExpressionHelper.CreateEmptyExpression(),
            MessageType: MessageType.Error,
            ShowAsPopup: true
        }
    }

    export function CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression()
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
            ActionMode: 'Stop Edit',
            ColumnId: "",
            Range: {
                Operator: LeafExpressionOperator.None,
                Operand1: "",
                Operand2: "",
                Operand1Type: RangeOperandType.Column,
                Operand2Type: RangeOperandType.Column,
            },
            Expression: ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        }
    }

    export function CreateEmptyUserFilter(): IUserFilter {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            ColumnId: ""
        };
    }

    export function CreateEmptyReport(): IReport {
        return {
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
            Columns: [],
            ReportColumnScope: ReportColumnScope.AllColumns,
            ReportRowScope: ReportRowScope.ExpressionRows
        };
    }

    export function CreateDefaultFlashingCell(column: IColumn): IFlashingCell {
        return {
            IsLive: false,
            ColumnId: column.ColumnId,
            FlashingCellDuration: 500,
            UpColor: '#008000', DownColor: '#FF0000'
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

    export function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter, showIntro = true): string {
        let columns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
        let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(CellValidation.ColumnId, columns)
        let expressionDescription: string = (ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, columns) :
            "";
        return (columnFriendlyName + ": " + CellValidation.Description + expressionDescription);
    }

    export function CreateEmptyConditionalStyle(): IConditionalStyle {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle(),
            ConditionalStyleScope: ConditionalStyleScope.Row,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
    }

    export function CreateEmptyFormatColumn(): IFormatColumn {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle()
        }
    }

    export function CreateLayout(columns: IColumn[], gridSorts: IGridSort[], vendorGridInfo: KeyValuePair[], name: string): ILayout {
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

    export function CreateCellValidationRule(columnId: string, range: IRange, actionMode: ActionMode, description: string, expression: Expression): ICellValidationRule {
        return {
        ColumnId: columnId,
        Range: range,
        ActionMode: actionMode,
        Description: description,
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
            ClassName: ""
        }
    }

    export function CreateEmptySelectedCellSummmary(): ISelectedCellSummmary {
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