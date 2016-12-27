import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { INamedExpression, IRangeExpression } from '../Interface/IExpression';
import { ColumnType, LeafExpressionOperator } from '../Enums'
import { IExpressionService } from './Interface/IExpressionService';
import { StringExtensions } from '../../Core/Extensions';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo } from '../../Core/Expression/PredefinedExpressionHelper';


export class ExpressionService implements IExpressionService {

    private _namedExpressions: INamedExpression[];

    constructor(private blotter: IAdaptableBlotter) {
        this._namedExpressions = [];
    }

    // only doing this because we seem to lose hte "isExpressionSatisfied" bit when we persist so we cannot rely on it being in the object
    // so either we get it every time we load for every expression or we go via this method
    public EvaluateExpression(expressionId: string, valueToCheck: any): boolean {
        return this.GetNamedExpressions().find(e => e.Uid == expressionId).isExpressionSatisfied(valueToCheck);
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


    public GetNamedExpressions(): Array<INamedExpression> {

        // Create if first time called - is there a better way to lazy load?
        if (this._namedExpressions == null || this._namedExpressions.length == 0) {

            // Date Predefined Named Expressions
            this._namedExpressions.push({
                Uid: "Today",
                FriendlyName: "Today",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                    return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "In Past",
                FriendlyName: "In Past",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    return +dateToCheck < Date.now();
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "In Future",
                FriendlyName: "In Future",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    return +dateToCheck > Date.now();
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "Yesterday",
                FriendlyName: "Yesterday",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                    return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "Tomorrow",
                FriendlyName: "Tomorrow",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                    return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                },
                IsPredefined: true
            });

            // Numeric Predefined Named Expressions
            this._namedExpressions.push({
                Uid: "Positive",
                FriendlyName: "Positive",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck > 0);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "Negative",
                FriendlyName: "Negative",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck < 0);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "Zero",
                FriendlyName: "Zero",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck == 0);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "NumericBlanks",
                FriendlyName: "Blanks",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck == null);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "NumericNonBlanks",
                FriendlyName: "Non Blanks",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck != null);
                },
                IsPredefined: true
            });


            // String Predefined Named Expressions
            this._namedExpressions.push({
                Uid: "StringBlanks",
                FriendlyName: "Blanks",
                ColumnType: ColumnType.String,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (stringToCheck: string): boolean => {
                    return (StringExtensions.IsNullOrEmpty(stringToCheck));
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "StringNonBlanks",
                FriendlyName: "Non Blanks",
                ColumnType: ColumnType.String,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (stringToCheck: any): boolean => {
                    return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
                },
                IsPredefined: true
            });

            // Boolean Predefined Named Expressions
            this._namedExpressions.push({
                Uid: "True",
                FriendlyName: "True",
                ColumnType: ColumnType.Boolean,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                    return (boolToCheck);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Uid: "False",
                FriendlyName: "False",
                ColumnType: ColumnType.Boolean,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                    return (!boolToCheck);
                },
                IsPredefined: true
            });


            // this is going to mimic a named expression that is created by a user:  Currency = 'EUR' = uses a range expression
            let predefinedExpressionInfoCurrency: IPredefinedExpressionInfo = { ColumnValues: null, NamedExpression: null, ExpressionRange: { Operator: LeafExpressionOperator.Equals, Operand1: "EUR", Operand2: "" } };
            let rangeExpressionCurrency: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> = PredefinedExpressionHelper.CreateRangeExpression("currency", predefinedExpressionInfoCurrency);

            this._namedExpressions.push({
                Uid: "EuroCurrency",
                FriendlyName: "Euro Currency",
                ColumnType: ColumnType.String,
                Expression: new Expression([], [], rangeExpressionCurrency),
                isExpressionSatisfied: (value: any): boolean => {
                    return null;
                },
                IsPredefined: false
            });

            // this is going to mimic a named expression that is created by a user:  TradeDate > '1 Jan 2016' = uses a range expression
            let predefinedExpressionInfoTradeDate: IPredefinedExpressionInfo = { ColumnValues: null, NamedExpression: null, ExpressionRange: { Operator: LeafExpressionOperator.GreaterThan, Operand1: new Date(2016, 0, 1).toDateString(), Operand2: "" } };
            let rangeExpressionTradeDate: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> = PredefinedExpressionHelper.CreateRangeExpression("tradeDate", predefinedExpressionInfoTradeDate);

            this._namedExpressions.push({
                Uid: "TradeDateThisYear",
                FriendlyName: "Trade Date This Year",
                ColumnType: ColumnType.Date,
                Expression: new Expression([], [], rangeExpressionTradeDate),
                isExpressionSatisfied: (value: any): boolean => {
                    return null;
                },
                IsPredefined: false
            });

            // this is going to mimic a named expression that is created by a user:  Country IN 'France', 'Germany', 'Italy' = uses a column values expression
            let predefinedExpressionCountries: IPredefinedExpressionInfo = { ColumnValues: ["Belgium", "Luxemborg", "Holland"], NamedExpression: null, ExpressionRange: null };
            let columnsExpressionCountries: Array<{ ColumnName: string, ColumnValues: Array<any> }> = PredefinedExpressionHelper.CreateColumnValuesExpression("country", predefinedExpressionCountries);

            this._namedExpressions.push({
                Uid: "Benelux",
                FriendlyName: "Benelux",
                ColumnType: ColumnType.String,
                Expression: new Expression(columnsExpressionCountries, [], []),
                isExpressionSatisfied: (value: any): boolean => {
                    return null;
                },
                IsPredefined: false
            });
        }

        return this._namedExpressions;
    }


    public CreateNamedExpression(): INamedExpression {
        let predefinedExpressionCountries: IPredefinedExpressionInfo = { ColumnValues: ["Belgium", "Luxemborg", "Holland"], NamedExpression: null, ExpressionRange: null };
        let columnsExpressionCountries: Array<{ ColumnName: string, ColumnValues: Array<any> }> = PredefinedExpressionHelper.CreateColumnValuesExpression("country", predefinedExpressionCountries);

        let namedExpression: INamedExpression = {
            Uid: "Benelux",
            FriendlyName: "Benelux",
            ColumnType: ColumnType.String,
            Expression: new Expression(columnsExpressionCountries, [], []),
            isExpressionSatisfied: (value: any): boolean => {
                return null;
            },
            IsPredefined: false
        };

        return namedExpression;
    }



    /*
        public GetFilterExpressionsold(): Array<INamedExpression> {
    
            // Create if first time called - is there a better way to lazy load?
            if (this._expressionFilters == null || this._expressionFilters.length == 0) {
    
               
    
              
             
                // String Filters
                this._expressionFilters.push({
                    ExpressionId: "StringBlanks",
                    ExpressionName: "Blanks",
                    ColumnType: ColumnType.String,
                    Expression: null,
                    isExpressionSatisfied: (stringToCheck: string): boolean => {
                        return (StringExtensions.IsNullOrEmpty(stringToCheck));
                    }
                });
    
                this._expressionFilters.push({
                    ExpressionId: "StringNonBlanks",
                    ExpressionName: "Non Blanks",
                    ColumnType: ColumnType.String,
                    Expression: null,
                    isExpressionSatisfied: (stringToCheck: any): boolean => {
                        return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
                    }
                });
    
    
                // Boolean Filters
                this._expressionFilters.push({
                    ExpressionId: "True",
                    ExpressionName: "True",
                    ColumnType: ColumnType.Boolean,
                    Expression: null,
                    isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                        return (boolToCheck);
                    }
                });
    
                this._expressionFilters.push({
                    ExpressionId: "False",
                    ExpressionName: "False",
                    ColumnType: ColumnType.Boolean,
                    Expression: null,
                    isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                        return (!boolToCheck);
                    }
                });
    
            }
    
            return this._expressionFilters;
        }
    
    
    */
}
