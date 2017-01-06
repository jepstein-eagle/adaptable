import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'
import { IRangeExpression } from '../Core/Interface/IExpression';
import { Helper } from '../Core/Helper';
import { LeafExpressionOperator, ColumnType } from '../Core/Enums'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotter } from './AdaptableBlotter';
import { IColumnFilter, } from '../Core/Interface/IFilterStrategy';
import { IUserFilter } from '../Core/interface/IExpression';
import { Expression } from '../Core/Expression/Expression';


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

                if (!userFilter.IsPredefined) { // leaving out predefined for now as no fucking idea what to do....

                    let columnValueFiltersNew: kendo.data.DataSourceFilters = createFilterFromColumnValuesExpression(userFilter.Expression, column);
                    let rangeFiltersNew: kendo.data.DataSourceFilters = createFilterFromRangesExpression(userFilter.Expression, column);

                    if (columnValueFiltersNew || rangeFiltersNew) {
                        if (columnValueFiltersNew) {
                            kendoUserFilters.filters.push(columnValueFiltersNew);
                        }
                        if (rangeFiltersNew) {
                            kendoUserFilters.filters.push(rangeFiltersNew);
                        }
                    }
                }
            });
            return (kendoUserFilters.filters.length > 0) ? kendoUserFilters : null;
        }
    }

    function createFilterFromBasicRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilterItem {
        return { operator: getKendoOperatorForLeafOperator(range.Operator), field: column.ColumnId, value: range.Operand1 };
    }

    function createFilterFromBetweenRange(range: IRangeExpression, column: IColumn): kendo.data.DataSourceFilterItem[] {
        let newFilters: kendo.data.DataSourceFilterItem[] = [];
        let fromFilterItem: kendo.data.DataSourceFilterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: column.ColumnId, value: range.Operand1 };
        let toFilterItem: kendo.data.DataSourceFilterItem = { operator: getKendoOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: column.ColumnId, value: range.Operand2 };
        newFilters.push(fromFilterItem);
        newFilters.push(toFilterItem);
        return newFilters;
    }

    function getKendoOperatorForLeafOperator(leafExpressionOperator: LeafExpressionOperator): string {
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


  //  function convertToNumber(itemToConvert: any): number {
        // Regex might need some work but hopefully it only allows numbers, full stopes and minus signs....
   //     return Number(itemToConvert.replace(/[^0-9\.\-]+/g, ""));
   // }


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