import { IRangeExpression } from '../Core/Interface/IExpression';
import { LeafExpressionOperator, ColumnType, DistinctCriteriaPairValue } from '../Core/Enums'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotter } from './AdaptableBlotter';
import { IColumnFilter, } from '../Core/Interface/IColumnFilterStrategy';
import { IUserFilter } from '../Core/interface/IExpression';
import { Expression } from '../Core/Expression/Expression';
import { UserFilterHelper } from '../Core/Services/UserFilterHelper';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';


export module KendoFiltering {

    export function buildKendoFiltersFromAdaptableFilters(columnFilters: IColumnFilter[], blotter: AdaptableBlotter): kendo.data.DataSourceFilters {

        if (columnFilters == null || columnFilters.length < 1) {
            return null;
        }

        let kendoFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };

        columnFilters.forEach(columnFilter => {

            let column: IColumn = blotter.getColumnFromColumnId(columnFilter.ColumnId);
            if (columnFilter.Filter.ColumnDisplayValuesExpressions.length > 0) {
                throw "Cannot Filter on DisplayValue in Kendo"
            }
            let columnValueFilters: kendo.data.DataSourceFilters = createFilterFromColumnRawValuesExpression(columnFilter.Filter, column);
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

    function createFilterFromColumnRawValuesExpression(expression: Expression, column: IColumn): kendo.data.DataSourceFilters {
        let columnValuesExpression = expression.ColumnRawValuesExpressions;
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

            //  if (ranges.length == 1) {
            //       let range: IRangeExpression = ranges[0];
            //       if (range.Operator == LeafExpressionOperator.Between) {
            //          return createFilterFromBetweenRange(range, column);
            //      } else {
            //          return createFilterFromBasicRange(range, column);
            //      }
            //   }
            //  else if (ranges.length > 1) {
            let filterItems: kendo.data.DataSourceFilterItem[] = [];
            let kendoRangeFilters: kendo.data.DataSourceFilters = { logic: "or", filters: [] };  // multiple range items are "and" or "or"????
            ranges.forEach(range => {
                if (range.Operator == LeafExpressionOperator.Between) {
                    let betweenRange: kendo.data.DataSourceFilters = createFilterFromBetweenRange(range, column);
                    kendoRangeFilters.filters.push(betweenRange);
                } else {
                    let basicRange: kendo.data.DataSourceFilterItem = createFilterFromBasicRange(range, column);
                    filterItems.push(basicRange);
                }
            })
            if (filterItems.length > 0) {
                kendoRangeFilters.filters.push(...filterItems);
            }
            return kendoRangeFilters;
        }
        //  }
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
                    rangeFiltersNew = createFilterFromPredefinedExpression(userFilter, column, blotter);
                } else {
                    let rawValueExpression: Expression = getRawValueExpression(userFilter.Expression, column, blotter);
                    columnValueFiltersNew = createFilterFromColumnRawValuesExpression(rawValueExpression, column);
                    rangeFiltersNew = createFilterFromRangesExpression(userFilter.Expression, column);

                    // its possible that the filter could (solely or additionally) wrap a user filter - though this is a bit meaningless...
                    userFilter.Expression.UserFilters.forEach(uf => {
                        let predefinedFilter: IUserFilter = userFilters.find(u => u.Uid == userFilter.Expression.UserFilters[0].UserFilterUids[0]);
                        let returnedFilters: kendo.data.DataSourceFilters = createFilterFromPredefinedExpression(predefinedFilter, column, blotter)
                        if (rangeFiltersNew) {
                            rangeFiltersNew.filters.push(returnedFilters);
                        } else {
                            rangeFiltersNew = returnedFilters;
                        }
                    })
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

    function createFilterFromBetweenRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilters {
        let betweenFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };  // between range items have to be "and"
        let betweenFilterItems: kendo.data.DataSourceFilterItem[] = [];
        let fromFilterItem: kendo.data.DataSourceFilterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: getTypedValueForOperand(range.Operand1, column) };
        let toFilterItem: kendo.data.DataSourceFilterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: getTypedValueForOperand(range.Operand2, column) };
        betweenFilterItems.push(fromFilterItem);
        betweenFilterItems.push(toFilterItem);
        betweenFilters.filters.push(...betweenFilterItems);
        return betweenFilters;
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

    function createFilterFromPredefinedExpression(userFilter: IUserFilter, column: IColumn, blotter: IAdaptableBlotter): kendo.data.DataSourceFilters {

        let newFilters: kendo.data.DataSourceFilters = { logic: "or", filters: [] };  // multiple range items are "and"
        let filterItem: kendo.data.DataSourceFilterItem;
        let dateToCheck: Date;

        switch (userFilter.Uid) {
            case UserFilterHelper.TODAY_USER_FILTER:
                dateToCheck = new Date();
                dateToCheck.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: dateToCheck };
                break;
            case UserFilterHelper.IN_PAST_USER_FILTER:
                dateToCheck = new Date();
                dateToCheck.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: dateToCheck };
                break;
            case UserFilterHelper.IN_FUTURE_USER_FILTER:
                dateToCheck = new Date();
                dateToCheck.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: dateToCheck };
                break;
            case UserFilterHelper.YESTERDAY_USER_FILTER:
                dateToCheck = new Date();
                dateToCheck.setDate(dateToCheck.getDate() - 1);
                dateToCheck.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: dateToCheck };
                break;
            case UserFilterHelper.TOMORROW_USER_FILTER:
                dateToCheck = new Date();
                dateToCheck.setDate(dateToCheck.getDate() + 1);
                dateToCheck.setHours(0, 0, 0, 0);
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: dateToCheck };
                break;
            case UserFilterHelper.LAST_WORKING_DAY_USER_FILTER:
                dateToCheck = blotter.CalendarService.GetLastWorkingDay();
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: dateToCheck };
                break;
            case UserFilterHelper.NEXT_WORKING_DAY_USER_FILTER:
                dateToCheck = blotter.CalendarService.GetNextWorkingDay();
                filterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.Equals), field: column.ColumnId, value: dateToCheck };
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
        let columnValuesExpression: { ColumnName: string, ColumnValues: Array<any> } = displayValueExpression.ColumnDisplayValuesExpressions[0];
        if (!columnValuesExpression || columnValuesExpression.ColumnValues == null || columnValuesExpression.ColumnValues.length == 0) {
            return displayValueExpression;
        }

        // if strings and bools just return the expression
        if (column.ColumnType == ColumnType.String || column.ColumnType == ColumnType.Boolean) {
            return ExpressionHelper.CreateSingleColumnExpression(column.ColumnId, [], columnValuesExpression.ColumnValues, [], [])
            // return displayValueExpression;
        }

        // if numeric or date then get the underlying values
        let columnValuePairs = blotter.getColumnValueDisplayValuePairDistinctList(column.ColumnId, DistinctCriteriaPairValue.RawValue);
        let rawValues: any[] = [];
        columnValuesExpression.ColumnValues.forEach(c => {
            let rawValue: any = columnValuePairs.find(cvp => cvp.DisplayValue == c).RawValue;
            rawValues.push(rawValue);
        })

        return ExpressionHelper.CreateSingleColumnExpression(column.ColumnId, [], rawValues, [], [])
    }

} 