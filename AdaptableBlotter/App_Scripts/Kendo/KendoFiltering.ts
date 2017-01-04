import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'
import { IRangeExpression, INamedExpression } from '../Core/Interface/IExpression';
import { Helper } from '../Core/Helper';
import { LeafExpressionOperator, ColumnType } from '../Core/Enums'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { FilterState } from './../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotter } from './AdaptableBlotter';
import { IColumnFilter } from '../Core/Interface/IFilterStrategy';
import { Expression } from '../Core/Expression/Expression';

export module KendoFiltering {

    export function buildKendoFiltersFromAdaptableFilters(columnFilters: IColumnFilter[], blotter: AdaptableBlotter): kendo.data.DataSourceFilters {
        let kendoFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };

        columnFilters.forEach(columnFilter => {

            let column: IColumn = blotter.getColumnFromColumnId(columnFilter.ColumnId);

            // for now lets just get any column value filters and range filters - we are leaving predefined / named filters for now...
            let columnValueFilters: kendo.data.DataSourceFilters = createFilterFromColumnValuesExpression(columnFilter.Filter, column);
            let rangeFilters: kendo.data.DataSourceFilters = createFilterFromRangesExpression(columnFilter.Filter, column);

            if (columnValueFilters && rangeFilters) {
                let jointFilters: kendo.data.DataSourceFilters = { logic: "or", filters: [] };  // is it "and" or is it "or" here?
                jointFilters.filters.push(columnValueFilters);
                jointFilters.filters.push(rangeFilters);
                kendoFilters.filters.push(jointFilters);
            } else if (columnValueFilters) {
                kendoFilters.filters.push(columnValueFilters);
            } else if (rangeFilters) {
                kendoFilters.filters.push(rangeFilters);
            }
        })
        return kendoFilters;
    }

     function createFilterFromColumnValuesExpression(expression: Expression, column: IColumn): kendo.data.DataSourceFilters {
        let columnValuesExpression = expression.ColumnValuesExpressions;
        if (columnValuesExpression.length > 0) {
            let columnValues: string[] = columnValuesExpression[0].ColumnValues;

            if (columnValues.length == 1) {
                let filterItem: kendo.data.DataSourceFilterItem = { operator: "eq", field: column.ColumnId, value: getTypedValue(columnValues[0], column) };
                return filterItem;
            }
            else if (columnValues.length > 1) {
                let filterItems: kendo.data.DataSourceFilterItem[] = [];
                columnValues.forEach(e => {
                    let filterItem: kendo.data.DataSourceFilterItem = { operator: "eq", field: column.ColumnId, value: getTypedValue(e, column) };
                    filterItems.push(filterItem);
                })
                let newFilters: kendo.data.DataSourceFilters = { logic: "or", filters: filterItems };  // multiple column value items are "or"
                return newFilters;
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
                let newFilters: kendo.data.DataSourceFilters = { logic: "and", filters: filterItems };  // multiple range items are "and"
                return newFilters;
            }
        }
    }

     function getTypedValue(valueToTest: string, column: IColumn): any {
        switch (column.ColumnType) {
            case ColumnType.Boolean:
                return true;// This is wrong
            case ColumnType.Date:
                return new Date(valueToTest);
            case ColumnType.Number:
                return Helper.convertToNumber(valueToTest);
            case ColumnType.String:
                return valueToTest;
        }
    }

     function createFilterFromBasicRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilterItem {
        return { operator: getFilterStringOperatorForLeafOperator(range.Operator), field: column.ColumnId, value: getTypedValue(range.Operand1, column) };
    }

     function createFilterFromBetweenRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilterItem[] {
        let newFilters: kendo.data.DataSourceFilterItem[] = [];
        let fromFilterItem: kendo.data.DataSourceFilterItem = { operator: getFilterStringOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: getTypedValue(range.Operand1, column) };
        let toFilterItem: kendo.data.DataSourceFilterItem = { operator: getFilterStringOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: getTypedValue(range.Operand2, column) };
        newFilters.push(fromFilterItem);
        newFilters.push(toFilterItem);
        return newFilters;
    }


     function getFilterStringOperatorForLeafOperator(leafExpressionOperator: LeafExpressionOperator): string {
        // just doing a couple for now but will need to do them all.... :(
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.GreaterThan:
                return "gt";
            case LeafExpressionOperator.LessThan:
                return "lt";
            case LeafExpressionOperator.StartsWith:
                return "startswith";
            case LeafExpressionOperator.EndsWith:
                return "endswith";
            case LeafExpressionOperator.Contains:
                return "contains";
        }
    }

/*
  export function isFilteredColumn(currentFilters: kendo.data.DataSourceFilters, columnId: string): boolean {
       
        if (!currentFilters) {
            return false;
        }
        let returnValue: boolean = false;

        currentFilters.filters.forEach(c => {
            if (!returnValue) {
                let filterObjects: kendo.data.DataSourceFilterItem[] = getFilterItemsFromFilters(c);
                let filterObjectToCheck: kendo.data.DataSourceFilterItem = (filterObjects.length > 0) ? filterObjects[0] : filterObjects;
                returnValue = dataSourceFilterItemContainsField(filterObjectToCheck, columnId);
            } else {
                return true;
            }
        })
        return returnValue;
    }

  function getFilterItemsFromFilters(filters: kendo.data.DataSourceFilters): any {
        let subFilters: kendo.data.DataSourceFilter[] = filters.filters;
        if (subFilters) { // has sub filters so we need to get them
            return getFilterItemsFromFilters(subFilters);
        }
        return filters;
    }

    function dataSourceFilterItemContainsField(item: kendo.data.DataSourceFilterItem, columnId: string): boolean {
        let field = item.field;
        if (field != null && field == columnId) {
            return true;
        }
        return false;
    }

*/

} 