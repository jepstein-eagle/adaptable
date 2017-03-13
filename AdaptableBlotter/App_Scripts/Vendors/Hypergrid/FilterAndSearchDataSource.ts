import { AdaptableBlotter } from './AdaptableBlotter'
import { DataSourceIndexed } from './DataSourceIndexed'
import { IAdvancedSearch } from '../../Core/interface/IAdvancedSearchStrategy';
import { StringExtensions } from '../../Core/Extensions'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IColumnFilter, IColumnFilterContext } from '../../Core/Interface/IColumnFilterStrategy';
import { LeafExpressionOperator, QuickSearchDisplayType } from '../../Core/Enums'

//All custom pipelines should extend from pipelineBase
export let FilterAndSearchDataSource = (blotter: AdaptableBlotter) => DataSourceIndexed.extend('FilterAndSearchDataSource', {
    blotter: blotter,
    apply: function () {
        this.clearColorQuickSearch();
        let currentSearchId = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId
        let columnFilters: IColumnFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        if (StringExtensions.IsNotNullOrEmpty(currentSearchId)
            || columnFilters.length > 0
            || StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)) {
            this.buildIndex(this.filterTest);
            this.colorQuickSearch();
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
            let quickSearchState = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch
            let quickSearchLowerCase = quickSearchState.QuickSearchText.toLowerCase()

            let recordReturnValue = false
            for (let column of columns.filter(c=>c.Visible)) {
                let displayValue = blotter.getDisplayValueFromRecord(rowObject, column.ColumnId)
                let stringValueLowerCase = displayValue.toLowerCase()
                let columnIndex = blotter.getColumnIndex(column.ColumnId)
                switch (blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchOperator) {
                    case LeafExpressionOperator.Contains:
                        {
                            if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                                //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell
                                    || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndColourCell) {
                                    this.quickSearchColor.push({ rowID: rowId, columnIndex: columnIndex, style: { quickSearchBackColor: quickSearchState.QuickSearchBackColor } })
                                }
                                //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRow) {
                                    return true;
                                }
                                recordReturnValue = true
                            }
                        }
                        break;
                    case LeafExpressionOperator.StartsWith:
                        {
                            if (stringValueLowerCase.startsWith(quickSearchLowerCase)) {
                                //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                                if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell
                                    || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndColourCell) {
                                    this.quickSearchColor.push({ rowID: rowId, columnIndex: columnIndex, style: { quickSearchBackColor: quickSearchState.QuickSearchBackColor } })
                                }
                                //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                                if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRow) {
                                    return true;
                                }
                                recordReturnValue = true
                            }
                        }
                        break;
                    case LeafExpressionOperator.EndsWith:
                        {
                            //if we need to color cell then add it to the collection otherwise we add undefined so we clear previous properties
                            if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell
                                || quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRowAndColourCell) {
                                this.quickSearchColor.push({ rowID: rowId, columnIndex: columnIndex, style: { quickSearchBackColor: quickSearchState.QuickSearchBackColor } })
                            }
                            //if we need to display only the rows that matched the quicksearch and no coloring then we can return
                            if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ShowRow) {
                                return true;
                            }
                            recordReturnValue = true
                        }
                        break;
                }
            }
            //if we color only then we just return true....
            if (quickSearchState.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell) {
                return true;
            }
            return recordReturnValue
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
        else {
            return this.dataSource.getRowCount()
        }
    },
    colorQuickSearch: function () {
        for (let record of this.quickSearchColor) {
            blotter.addCellStyleHypergrid(record.rowID, record.columnIndex, record.style)
        }
    },
    clearColorQuickSearch: function () {
        if (this.quickSearchColor) {
            for (let record of this.quickSearchColor) {
                let rowIndex = blotter.getRowIndexHypergrid(record.rowID)
                blotter.removeCellStyleByIndex(record.columnIndex, rowIndex, "QuickSearch")
            }
        }
        this.quickSearchColor = [];
    }
});