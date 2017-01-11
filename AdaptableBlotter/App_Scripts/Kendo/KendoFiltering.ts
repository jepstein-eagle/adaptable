import { IRangeExpression } from '../Core/Interface/IExpression';
import { LeafExpressionOperator, ColumnType } from '../Core/Enums'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotter } from './AdaptableBlotter';
import { IColumnFilter, } from '../Core/Interface/IColumnFilterStrategy';
import { IUserFilter } from '../Core/interface/IExpression';
import { Expression } from '../Core/Expression/Expression';
import { UserFilterHelper } from '../Core/Services/UserFilterHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo } from '../Core/Expression/PredefinedExpressionHelper';


export module KendoFiltering {

    export function buildKendoFiltersFromAdaptableFilters(columnFilters: IColumnFilter[], blotter: AdaptableBlotter): kendo.data.DataSourceFilters {

        if (columnFilters == null || columnFilters.length < 1) {
            return null;
        }

        let kendoFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };

        columnFilters.forEach(columnFilter => {

            let column: IColumn = blotter.getColumnFromColumnId(columnFilter.ColumnId);
            let columnValueFilters: kendo.data.DataSourceFilters = createFilterFromColumnValuesExpression(columnFilter.Filter, column);
            let rangeFilters: kendo.data.DataSourceFilters = createFilterFromRangesExpression(columnFilter.Filter, column);
            let userFilters: kendo.data.DataSourceFilters = createFilterFromUserFiltersExpression(columnFilter.Filter, column, blotter);

            if (columnValueFilters || rangeFilters || userFilters) {
                let columnKendoFilters: kendo.data.DataSourceFilters = { logic: "or", filters: [] };

                if (columnValueFilters) {
                    columnKendoFilters.filters.push(columnValueFilters);
                }
                if (rangeFilters) {
                    columnKendoFilters.filters.push(rangeFilters);
                }
                if (userFilters) {
                    columnKendoFilters.filters.push(userFilters);
                }
                kendoFilters.filters.push(columnKendoFilters);
            }
        })
        return kendoFilters;
    }

    function createFilterFromColumnValuesExpression(expression: Expression, column: IColumn): kendo.data.DataSourceFilters {
        let columnValuesExpression = expression.ColumnValuesExpressions;
        if (columnValuesExpression.length > 0) {
            let columnValues: string[] = columnValuesExpression[0].ColumnValues;

            if (columnValues.length == 1) {
                let filterItem: kendo.data.DataSourceFilterItem = { operator: "eq", field: column.ColumnId, value: columnValues[0] };
                return filterItem;
            }
            else if (columnValues.length > 1) {
                let filterItems: kendo.data.DataSourceFilterItem[] = [];
                columnValues.forEach(e => {
                    let filterItem: kendo.data.DataSourceFilterItem = { operator: "eq", field: column.ColumnId, value: e };
                    filterItems.push(filterItem);
                })
                let kendoColumnFilters: kendo.data.DataSourceFilters = { logic: "or", filters: filterItems };  // multiple column value items are "or"
                return kendoColumnFilters;
            }
        }
    }

    function createFilterFromRangesExpression(expression: Expression, column: IColumn): kendo.data.DataSourceFilters {
        let rangeExpression = expression.RangeExpressions;
        if (rangeExpression.length > 0) {
            let ranges: IRangeExpression[] = rangeExpression[0].Ranges;

            if (ranges.length == 1) {
                let range: IRangeExpression = ranges[0];
                if (range.Operator == LeafExpressionOperator.Between) {
                    let newFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };  // multiple range items are "and"
                    newFilters.filters.push(...createFilterFromBetweenRange(range, column));
                    return newFilters;
                } else {
                    return createFilterFromBasicRange(range, column);
                }
            }
            else if (ranges.length > 1) {
                let filterItems: kendo.data.DataSourceFilterItem[] = [];
                ranges.forEach(range => {
                    if (range.Operator == LeafExpressionOperator.Between) {
                        filterItems.push(...createFilterFromBetweenRange(range, column));
                    } else {
                        filterItems.push(createFilterFromBasicRange(range, column));
                    }
                })
                let kendoRangeFilters: kendo.data.DataSourceFilters = { logic: "and", filters: filterItems };  // multiple range items are "and"
                return kendoRangeFilters;
            }
        }
    }


    function createFilterFromUserFiltersExpression(expression: Expression, column: IColumn, blotter: AdaptableBlotter): kendo.data.DataSourceFilters {

        let userFiltersExpression = expression.UserFilters;
        if (userFiltersExpression.length > 0) {
            let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
            let userFilterUids: string[] = userFiltersExpression[0].UserFilterUids;

            let kendoUserFilters: kendo.data.DataSourceFilters = { logic: "or", filters: [] };  // is it "and" or "or" ?????

            userFilterUids.forEach(userFilterUid => {

                // Get the filter 
                let userFilter: IUserFilter = userFilters.find(u => u.Uid == userFilterUid);

                let columnValueFiltersNew: kendo.data.DataSourceFilters;
                let rangeFiltersNew: kendo.data.DataSourceFilters;

                if (userFilter.IsPredefined) {  // predefined filters only map to ranges...
                    rangeFiltersNew = createFilterFromPredefinedExpression(userFilter, column);
                } else {
                    let rawValueExpression: Expression = getRawValueExpression(userFilter.Expression, column, blotter);
                    columnValueFiltersNew = createFilterFromColumnValuesExpression(rawValueExpression, column);
                    rangeFiltersNew = createFilterFromRangesExpression(userFilter.Expression, column);
                }

                if (columnValueFiltersNew || rangeFiltersNew) {
                    if (columnValueFiltersNew) {
                        kendoUserFilters.filters.push(columnValueFiltersNew);
                    }
                    if (rangeFiltersNew) {
                        kendoUserFilters.filters.push(rangeFiltersNew);
                    }
                }
            });
            return (kendoUserFilters.filters.length > 0) ? kendoUserFilters : null;
        }
    }

    function createFilterFromBasicRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilterItem {
        return { operator: getKendoOperatorForLeafOperator(range.Operator), field: column.ColumnId, value: getTypedValueForOperand(range.Operand1, column) };
    }

    function createFilterFromBetweenRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilterItem[] {
        let newFilters: kendo.data.DataSourceFilterItem[] = [];
        let fromFilterItem: kendo.data.DataSourceFilterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: getTypedValueForOperand(range.Operand1, column)  };
        let toFilterItem: kendo.data.DataSourceFilterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: getTypedValueForOperand(range.Operand2, column) };
        newFilters.push(fromFilterItem);
        newFilters.push(toFilterItem);
        return newFilters;
    }

    function getKendoOperatorForLeafOperator(leafExpressionOperator: LeafExpressionOperator): string {
        // just doing a couple for now but will need to do them all.... :(
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.Equals:
                return "eq";
            case LeafExpressionOperator.NotEquals:
                return "neq";
            case LeafExpressionOperator.GreaterThan:
                return "gt";
            case LeafExpressionOperator.GreaterThanOrEqual:
                return "gte";
            case LeafExpressionOperator.LessThan:
                return "lt";
            case LeafExpressionOperator.LessThanOrEqual:
                return "lte";
            case LeafExpressionOperator.StartsWith:
                return "startswith";
            case LeafExpressionOperator.EndsWith:
                return "endswith";
            case LeafExpressionOperator.Contains:
                return "contains";
        }
    }

    function getTypedValueForOperand(operandValue: string, column: IColumn): any {
        switch (column.ColumnType) {
            case ColumnType.Boolean:
                return operandValue; // not sure what to do here...
            case ColumnType.Date:
                return new Date(operandValue);
            case ColumnType.Number:
                return Number(operandValue);
            case ColumnType.String:
                return operandValue;
            case ColumnType.Object:
                return operandValue;
        }
    }

    function createFilterFromPredefinedExpression(userFilter: IUserFilter, column: IColumn): kendo.data.DataSourceFilters {

        let newFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };  // multiple range items are "and"
        let filterItem: kendo.data.DataSourceFilterItem;

        switch (userFilter.Uid) {
            // Date Filters - dont seem to work...
            case UserFilterHelper.TODAY_USER_FILTER:
                let todayDate: Date = new Date();
                todayDate.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: todayDate };
                break;
            case UserFilterHelper.IN_PAST_USER_FILTER:
                let pastDate: Date = new Date();
                pastDate.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: pastDate };
                break;
            case UserFilterHelper.IN_FUTURE_USER_FILTER:
                let futureDate: Date = new Date();
                futureDate.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: futureDate };
                break;
            case UserFilterHelper.YESTERDAY_USER_FILTER:
                let yesterdayDate: Date = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                yesterdayDate.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: yesterdayDate };
                break;
            case UserFilterHelper.TOMORROW_USER_FILTER:
                let tomorrowDate: Date = new Date();
                tomorrowDate.setDate(tomorrowDate.getDate() + 1);
                tomorrowDate.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: tomorrowDate };
                break;

            // Numeric Filters
            case UserFilterHelper.POSITIVE_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: 0 };
                break;
            case UserFilterHelper.NEGATIVE_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: 0 };
                break;
            case UserFilterHelper.ZERO_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: 0 };
                break;
            case UserFilterHelper.NUMERIC_BLANKS_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: null };
                break;
            case UserFilterHelper.NUMERIC_NON_BLANKS_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.NotEquals), field: column.ColumnId, value: null };
                break;

            // String Filters
            case UserFilterHelper.STRING_BLANKS_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: "" };
                break;
            case UserFilterHelper.STRING_NON_BLANKS_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.NotEquals), field: column.ColumnId, value: "" };
                break;

            // Bool Filters
            case UserFilterHelper.TRUE_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: Boolean(true) };
                break;
            case UserFilterHelper.FALSE_USER_FILTER:
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: Boolean(false) };
                break;
        }

        newFilters.filters.push(filterItem);

        return newFilters;
    }

    function getRawValueExpression(displayValueExpression: Expression, column: IColumn, blotter: AdaptableBlotter): Expression {
        // if no column values then get out
        let columnValuesExpression: { ColumnName: string, ColumnValues: Array<any> } = displayValueExpression.ColumnValuesExpressions[0];
        if (!columnValuesExpression || columnValuesExpression.ColumnValues == null || columnValuesExpression.ColumnValues.length == 0) {
            return displayValueExpression;
        }

        // if strings and bools just return the expression
        if (column.ColumnType == ColumnType.String || column.ColumnType == ColumnType.Boolean) {
            return displayValueExpression;
        }

        // if numeric or date then get the underlying values
        let columnValuePairs: Array<{ rawValue: any, displayValue: string }> = blotter.getColumnValueDisplayValuePairDistinctList(column.ColumnId, "rawValue");
        let rawValues: any[] = [];
        columnValuesExpression.ColumnValues.forEach(c => {
            let rawValue: any = columnValuePairs.find(cvp => cvp.displayValue == c).rawValue;
            rawValues.push(rawValue);
        })

        // create and return a new epxression      
        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: rawValues,
                ExpressionRange: null,
                UserFilterUids: null
            };
        return PredefinedExpressionHelper.CreateExpression(column.ColumnId, predefinedExpressionInfo, blotter);
    }

} 