import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { DataSourceIndexed } from './DataSourceIndexed'
import { IAdvancedSearch } from '../Core/interface/IAdvancedSearchStrategy';
import { StringExtensions } from '../Core/Extensions'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { IColumnFilter, IColumnFilterContext } from '../Core/Interface/IColumnFilterStrategy';

//All custom pipelines should extend from pipelineBase
export let UserFiltersDataSource = (blotter: IAdaptableBlotter) => DataSourceIndexed.extend('UserFiltersDataSource', {
    blotter: blotter,
    apply: function () {
        let columnFilters: IColumnFilter[] = blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
        if (columnFilters.length > 0) {
            this.buildIndex(this.filterTest(columnFilters));
        } else {
            this.clearIndex();
        }
    },
    filterTest: (columnFilters: IColumnFilter[]) => function (r: any, rowObject: any) {
        let columns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns
        let rowId = blotter.getPrimaryKeyValueFromRecord(rowObject)
        for (let columnFilter of columnFilters) {
            if (!ExpressionHelper.checkForExpression(columnFilter.Filter, rowId, columns, blotter)) {
                return false
            }
            return true
        }
    },
    getRowCount: function () {
        return StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId)
            ? this.index.length : this.dataSource.getRowCount();
    }
});