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


/* dead stuff from when trying to be clever wtih display and real values... 
    function getDecPlaces(itemToConvert: any): any {
        // Regex might need some work but hopefully it only allows numbers, full stopes and minus signs....

        var match = ('' + itemToConvert).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (match.length > 1 && match[1] != null) {
            return match[1].length;
        } else {
            return 0;
        }
    }

    function convertToNumber(itemToConvert: any): number {
        // Regex might need some work but hopefully it only allows numbers, full stopes and minus signs....
        return Number(itemToConvert.replace(/[^0-9\.\-]+/g, ""));
    }

    function getMinusNumber(numDecPlaces: number): number {
        switch (numDecPlaces) {
            case 0:
                return 0.5;
            case 1:
                return 0.05;
            case 2:
                return 0.005;
            case 3:
                return 0.0005;
            case 4:
                return 0.00005;
            case 5:
                return 0.000005;
            case 6:
                return 0.0000005;

        }
    }


export function buildKendoFiltersFromAdaptableFilters(columnFilters: IColumnFilter[], blotter: AdaptableBlotter): kendo.data.DataSourceFilters {
        if (columnFilters == null || columnFilters.length < 1) {
            return null;
        }
        let columnFilter: IColumnFilter = columnFilters[0];

//let columnFilter: IColumnFilter =  columnFilter.Filter.ColumnValuesExpressions[0].ColumnValues[0];


        let column: IColumn = blotter.getColumnFromColumnId(columnFilter.ColumnId);

        let displayValue: any = columnFilter.Filter.ColumnValuesExpressions[0].ColumnValues[0];

        let rawValue : any = columnFilter.RealValue;

let numberDecPlacesTest = getDecPlaces(rawValue);
        let realDisplayValue: number = getTypedValue(displayValue, column);
        let numberDecPlaces = getDecPlaces(realDisplayValue);

        let minusNumber: number = getMinusNumber(numberDecPlaces);

        let fromValue = realDisplayValue - minusNumber;
        let toValue = realDisplayValue + minusNumber;


        let newFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };  // multiple range items are "and"
        let fromFilterItem: kendo.data.DataSourceFilterItem = { operator: getFilterStringOperatorForLeafOperator(LeafExpressionOperator.GreaterThan), field: "bid", value: fromValue };
        let toFilterItem: kendo.data.DataSourceFilterItem = { operator: getFilterStringOperatorForLeafOperator(LeafExpressionOperator.LessThan), field: "bid", value: toValue };
        newFilters.filters.push(fromFilterItem);
        newFilters.filters.push(toFilterItem);
        return newFilters;
    */

    export function buildKendoFiltersFromAdaptableFilters(columnFilters: IColumnFilter[], blotter: AdaptableBlotter): kendo.data.DataSourceFilters {
        if (columnFilters == null || columnFilters.length < 1) {
            return null;
        }
      
        
                   let kendoFilters: kendo.data.DataSourceFilters = { logic: "and", filters: [] };
        
                columnFilters.forEach(columnFilter => {
        
                    let column: IColumn = blotter.getColumnFromColumnId(columnFilter.ColumnId);
        
                    // for now lets just get any column value filters and range filters - we are leaving predefined / named filters for now...
                    let columnValueFilters: kendo.data.DataSourceFilters = createFilterFromColumnValuesExpression(columnFilter.Filter, column);
                    let rangeFilters: kendo.data.DataSourceFilters = createFilterFromRangesExpression(columnFilter.Filter, column);
        
                    // examine userfilters, and add column value filters and range filters respectively as appropriate
                    createFilterFromUserFiltersExpression(columnFilter.Filter, column, blotter, columnValueFilters, rangeFilters);
        
        
        
        
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



    function createFilterFromUserFiltersExpression(expression: Expression, column: IColumn, blotter: AdaptableBlotter, columnValueFilters: kendo.data.DataSourceFilters, rangeFilters: kendo.data.DataSourceFilters): void {
        let userFiltersExpression = expression.UserFilters;
        if (userFiltersExpression.length > 0) {
            let userFilters: IUserFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
            let userFilterUids: string[] = userFiltersExpression[0].UserFilterUids;

            userFilterUids.forEach(userFilterUid => {

                // Get the filter 
                let userFilter: IUserFilter = userFilters.find(u => u.Uid == userFilterUid);

                if (!userFilter.IsPredefined) { // leaving out predefined for now as no fucking idea what to do....

                    let columnValueFiltersNew: kendo.data.DataSourceFilters = createFilterFromColumnValuesExpression(userFilter.Expression, column);
                    if (columnValueFiltersNew)
                        if (columnValueFilters) {
                            columnValueFilters.filters.push(columnValueFiltersNew);
                        } else {
                            columnValueFilters = columnValueFiltersNew;
                        }


                    let rangeFiltersNew: kendo.data.DataSourceFilters = createFilterFromRangesExpression(userFilter.Expression, column);
                    if (rangeFiltersNew)
                        if (rangeFilters) {
                            rangeFilters.filters.push(rangeFiltersNew);
                        } else {
                            rangeFilters = rangeFilters;
                        }
                }
            })


        }
    }

    function getTypedValue(valueToTest: string, column: IColumn): any {
        switch (column.ColumnType) {
            case ColumnType.Boolean:
                return true;// This is wrong
            case ColumnType.Date:
                return new Date(valueToTest);
            case ColumnType.Number:
                return convertToNumber(valueToTest);
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


    function convertToNumber(itemToConvert: any): number {
        // Regex might need some work but hopefully it only allows numbers, full stopes and minus signs....
        return Number(itemToConvert.replace(/[^0-9\.\-]+/g, ""));
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