
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IExpressionFilter } from '../Interface/IExpression';
import { ColumnType } from '../Enums'
import { IExpressionService } from './Interface/IExpressionService';
import { StringExtensions } from '../../Core/Extensions';


export class ExpressionService implements IExpressionService {

    private _expressionFilters: IExpressionFilter[];

    constructor(private blotter: IAdaptableBlotter) {
        this._expressionFilters = [];
    }

    // only doing this because we seem to lose hte "isExpressionSatisfied" bit when we persist so we cannot rely on it being in the object
    // so either we get it every time we load or we do this
    public EvaluateExpression(expressionName: string, valueToCheck: any): boolean {
        return this.GetFilterExpressions().find(e => e.ExpressionName == expressionName).isExpressionSatisfied(valueToCheck);
    }

    public GetFilterExpressions(): Array<IExpressionFilter> {

        // Create if first time called - is there a better way to lazy load?
        if (this._expressionFilters == null || this._expressionFilters.length == 0) {

            // Date Filters
            this._expressionFilters.push({
                ExpressionName: "Today",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                    return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                }
            });

            this._expressionFilters.push({
                ExpressionName: "In Past",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    return +dateToCheck < Date.now();
                }
            });

            this._expressionFilters.push({
                ExpressionName: "In Future",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    return +dateToCheck > Date.now();
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Yesterday",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                    return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Tomorrow",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                    return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                }
            });

            // Numeric Filters
            this._expressionFilters.push({
                ExpressionName: "Positive",
                ColumnType: ColumnType.Number,
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck > 0);
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Negative",
                ColumnType: ColumnType.Number,
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck < 0);
                }
            });


            // String Filters
            this._expressionFilters.push({
                ExpressionName: "Blanks",
                ColumnType: ColumnType.String,
                isExpressionSatisfied: (stringToCheck: string): boolean => {
                    return (StringExtensions.IsNullOrEmpty(stringToCheck));
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Non Blanks",
                ColumnType: ColumnType.String,
                isExpressionSatisfied: (stringToCheck: any): boolean => {
                    return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
                }
            });


            // Boolean Filters
            this._expressionFilters.push({
                ExpressionName: "True",
                ColumnType: ColumnType.Boolean,
                isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                    return (boolToCheck);
                }
            });

            this._expressionFilters.push({
                ExpressionName: "False",
                ColumnType: ColumnType.Boolean,
                isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                    return (!boolToCheck);
                }
            });

        }

        return this._expressionFilters;
    }

}
