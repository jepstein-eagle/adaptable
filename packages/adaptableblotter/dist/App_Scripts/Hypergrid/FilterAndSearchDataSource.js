"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataSourceIndexed_1 = require("./DataSourceIndexed");
const StringExtensions_1 = require("../App_Scripts/Core/Extensions/StringExtensions");
const ExpressionHelper_1 = require("../App_Scripts/Core/Helpers/ExpressionHelper");
const Enums_1 = require("../App_Scripts/Core/Enums");
const ArrayExtensions_1 = require("../App_Scripts/Core/Extensions/ArrayExtensions");
/* There are 3 possible reasons why we might need to filter / search the grid:
1. If there is an Advanced Search (i.e. CurrentAdvancedSearch is not empty)
2. If there are any Column Filters applied
3. If Quick Search has been applied (though it could be that the action is HighlightCell in which case we dont need to do any filtering)
We also need to take account of what the server search option is, as that will affect our actions
*/
//All custom pipelines should extend from pipelineBase
exports.FilterAndSearchDataSource = (blotter) => DataSourceIndexed_1.DataSourceIndexed.extend('FilterAndSearchDataSource', {
    blotter: blotter,
    apply: function () {
        // before we start we will clear any cell highlights that are the result of Quick Search - as we will apply that at the end if required
        this.clearColorQuickSearch();
        // Lets first get the 3 variables that indicate a filter/search is required
        let currentSearchName = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
        let columnFilters = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        let quickSearchText = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
        // If any of these 3 are set then we need to build the index and color the quick search; otherwise we should clear it
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(currentSearchName) || ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilters) || StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchText)) {
            this.buildIndex(this.filterTest);
            this.colorQuickSearch();
        }
        else {
            this.clearIndex();
        }
    },
    /*
    This boolean function will test for each row whether it passes ALL the possible filter / search requirements
    Only rows that pass all 3 (i.e. Advanced Search, Column Filters, Quick Search) will return true
    */
    filterTest: function (r, rowObject) {
        let columns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // if no columns then nothing to filter
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columns)) {
            return true;
        }
        let serverSearchOption = blotter.BlotterOptions.serverSearchOption;
        // first let's assess ADVANCED SEARCH 
        // Note: serverSearchOption has to be 'None' becasue any other value then they are performing search on the server and nothing for us to do
        if (serverSearchOption == 'None') {
            let currentSearchName = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(currentSearchName)) {
                // Get the actual Advanced Search object and check it exists
                let currentSearch = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Name == currentSearchName);
                if (currentSearch) {
                    // See if our record passes the Advanced Search Expression - using Expression Helper; if not then return false
                    if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(currentSearch.Expression, rowObject, columns, blotter)) {
                        return false;
                    }
                }
            }
        }
        // now let's assess COLUMN FILTERS to see if our record passes
        // NOTE: serverSearchOption has to be 'None' or 'AdvancedSearch' because any other value then they are checking filters on the server and nothing for us to do 
        if (serverSearchOption == 'None' || serverSearchOption == 'AdvancedSearch') {
            // Get the column filters
            let columnFilters = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilters)) {
                for (let columnFilter of columnFilters) {
                    // See if our record passes the Filter Expression - using Expression Helper; if not then return false
                    if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(columnFilter.Filter, rowObject, columns, blotter)) {
                        return false;
                    }
                }
            }
            // finally, let's assess QUICK SEARCH
            let quickSearchState = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
            // check that we have quick search running
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)) {
                let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase();
                // with quick search because we need to colour and might not need to filter we dont return true/false but instead set a return value
                let recordReturnValue = false;
                let rowId = blotter.getPrimaryKeyValueFromRecord(rowObject);
                // only check on visible columns for quick search 
                for (let column of columns.filter(c => c.Visible)) {
                    let displayValue = blotter.getDisplayValueFromRecord(rowObject, column.ColumnId);
                    let stringValueLowerCase = displayValue.toLowerCase();
                    // we need to differentiate between whether to search for 'Contains' or 'StartsWith'
                    let isMatch = (quickSearchState.Operator == Enums_1.LeafExpressionOperator.Contains) ?
                        stringValueLowerCase.includes(quickSearchLowerCase) :
                        stringValueLowerCase.startsWith(quickSearchLowerCase);
                    if (isMatch) {
                        //if we need to display ONLY the rows that matched the quicksearch and dont need to colour them then we can return true
                        if (quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRow) {
                            return true;
                        }
                        else { // if we need to color then cell then add it to the collection otherwise we add undefined so we clear previous properties
                            this.quickSearchColorCollection.push({ rowID: rowId, columnId: column.ColumnId, style: { quickSearchStyle: quickSearchState.Style } });
                        }
                        // set the return value to true (but dont return immediately as we might need to colour other cells in the row)
                        recordReturnValue = true;
                    }
                }
                //if we color only then we just return true (as we have now built the collection of cells to colour)....
                if (quickSearchState.DisplayAction == Enums_1.DisplayAction.HighlightCell) {
                    return true;
                }
                return recordReturnValue;
            }
        }
        return true;
    },
    /* If any of the 3 causes of searching are present then return the index;
    otherwise return the row count of the data source.
    */
    getRowCount: function () {
        let currentSearchName = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
        let columnFilters = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        let quickSearchText = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(currentSearchName) || ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilters) || StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchText)) {
            return this.index.length;
        }
        else {
            return this.dataSource.getRowCount();
        }
    },
    colorQuickSearch: function () {
        for (let record of this.quickSearchColorCollection) {
            blotter.addCellStyleHypergrid(record.rowID, record.columnId, record.style);
        }
    },
    clearColorQuickSearch: function () {
        if (this.quickSearchColorCollection) {
            blotter.removeAllCellStyleHypergrid("QuickSearch");
        }
        this.quickSearchColorCollection = [];
    }
});
