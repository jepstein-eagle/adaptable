import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { DataSourceIndexed } from './DataSourceIndexed'
import { IAdvancedSearch } from '../Core/interface/IAdvancedSearchStrategy';
import { StringExtensions } from '../Core/Extensions'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { IColumnFilter, IColumnFilterContext } from '../Core/Interface/IColumnFilterStrategy';
import { LeafExpressionOperator } from '../Core/Enums'

//All custom pipelines should extend from pipelineBase
export let FilterAndSearchDataSource = (blotter: IAdaptableBlotter) => DataSourceIndexed.extend('FilterAndSearchDataSource', {
    blotter: blotter,
    apply: function () {
        let currentSearchId = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId
        let columnFilters: IColumnFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        if (StringExtensions.IsNotNullOrEmpty(currentSearchId)
            || columnFilters.length > 0
            || StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)) {
            this.buildIndex(this.filterTest);
        } else {
            this.clearIndex();
        }
    },
    filterTest: function (r: any, rowObject: any) {
        let columns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns
        let rowId = blotter.getPrimaryKeyValueFromRecord(rowObject)

        //first we assess AdvancedSearch 
        let currentSearchId = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId
        if (StringExtensions.IsNotNullOrEmpty(currentSearchId)) {
            let currentSearch: IAdvancedSearch = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Uid == currentSearchId);
            if (!ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, blotter)) {
                return false;
            }
        }

        //we then assess filters
        let columnFilters: IColumnFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        if (columnFilters.length > 0) {
            for (let columnFilter of columnFilters) {
                if (!ExpressionHelper.checkForExpression(columnFilter.Filter, rowId, columns, blotter)) {
                    return false
                }
            }
        }

        //we assess quicksearch
        if (StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)) {
            let quickSearchLowerCase = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText.toLowerCase()
            for (let prop in rowObject) {
                let stringValueLowerCase = String(rowObject[prop]).toLowerCase()
                switch (blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchOperator) {
                    case LeafExpressionOperator.Contains:
                        {
                            if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                return true;
                            }
                        }
                        break;
                    case LeafExpressionOperator.StartsWith:
                        {
                            if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                return true;
                            }
                        }
                        break;
                    case LeafExpressionOperator.EndsWith:
                        {
                            if (stringValueLowerCase.endsWith(quickSearchLowerCase)) {
                                return true;
                            }
                        }
                        break;
                }
            }
            return false
        }
        return true;
    },
    getRowCount: function () {
        let currentSearchId = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId
        let columnFilters: IColumnFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        if (StringExtensions.IsNotNullOrEmpty(currentSearchId)
            || columnFilters.length > 0
            || StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)) {
            return this.index.length;
        }
        else
        {
            return this.dataSource.getRowCount()
        }
    }
});