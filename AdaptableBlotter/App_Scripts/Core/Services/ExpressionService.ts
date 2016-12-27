import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { INamedExpression, IRangeExpression } from '../Interface/IExpression';
import { ColumnType, LeafExpressionOperator } from '../Enums'
import { IExpressionService } from './Interface/IExpressionService';
import { StringExtensions } from '../../Core/Extensions';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo } from '../../Core/Expression/PredefinedExpressionHelper';
import { FilterState } from '../../Redux/ActionsReducers/Interface/IState';


export class ExpressionService implements IExpressionService {

    private _predefinedExpressions: INamedExpression[];
    private Filters: INamedExpression[]

    constructor(private blotter: IAdaptableBlotter) {
        this._predefinedExpressions = [];

        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        if (this.Filters != this.GetFilterState().Filters) {
            this.Filters = this.GetFilterState().Filters;
        }
    }

    private GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }

    // only doing this because we seem to lose hte "isExpressionSatisfied" bit when we persist so we cannot rely on it being in the object
    // so either we get it every time we load for every expression or we go via this method
    public EvaluateExpression(expressionId: string, valueToCheck: any): boolean {
        return this.Filters.find(e => e.Uid == expressionId).isExpressionSatisfied(valueToCheck);
    }

    public ShouldShowNamedExpressionForColumn(namedExpression: INamedExpression, column: IColumn): boolean {

        // predefined expressions return if its right column type
        if (namedExpression.IsPredefined) {
            return namedExpression.ColumnType == column.ColumnType;
        }

        // see if there are any columnvalues and then get the first only
        if (namedExpression.Expression.ColumnValuesExpressions != null && namedExpression.Expression.ColumnValuesExpressions.length > 0) {
            return namedExpression.Expression.ColumnValuesExpressions[0].ColumnName == column.ColumnId; // might be that we have wrong id / friendly name => need to check
        }

        // see if there are any ranges and then get the first only
        if (namedExpression.Expression.RangeExpressions != null && namedExpression.Expression.RangeExpressions.length > 0) {
            return namedExpression.Expression.RangeExpressions[0].ColumnName == column.ColumnId; // might be that we have wrong id / friendly name => need to check
        }

        return false;
    }


   
}
