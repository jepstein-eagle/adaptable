
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IExpressionFilter } from '../Interface/IExpression';
import { ColumnType } from '../Enums'
import { IExpressionService } from './Interface/IExpressionService';

export class ExpressionService implements IExpressionService {

    private _expressionFilters: IExpressionFilter[];

    constructor(private blotter: IAdaptableBlotter) {

        this._expressionFilters = [];
    }


    public GetFilterExpressions(): Array<IExpressionFilter> {

        // Create if first time called - is there a better way to lazy load?
        if (this._expressionFilters == null || this._expressionFilters.length == 0) {

            // Date Filters
            this._expressionFilters.push({
                ExpressionName: "Is Today Date",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (date: any): boolean => {
                    let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                    return (today.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0))
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Is In Past",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (date: any): boolean => {
                    return +date < Date.now();
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Is In Future",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (date: any): boolean => {
                    return +date > Date.now();
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Is Yesterday",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (date: any): boolean => {
                    let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                    return (yesterday.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0))
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Is Tomorrow",
                ColumnType: ColumnType.Date,
                isExpressionSatisfied: (date: any): boolean => {
                    let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                    return (tomorrow.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0))
                }
            });

            // Numeric Filters
            this._expressionFilters.push({
                ExpressionName: "Positive",
                ColumnType: ColumnType.Number,
                isExpressionSatisfied: (number: any): boolean => {
                    return (number > 0);
                }
            });

            this._expressionFilters.push({
                ExpressionName: "Negative",
                ColumnType: ColumnType.Number,
                isExpressionSatisfied: (number: any): boolean => {
                    return (number < 0);
                }
            });
        }

        return this._expressionFilters;
    }

}
