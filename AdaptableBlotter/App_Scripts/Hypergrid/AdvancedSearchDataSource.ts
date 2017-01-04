import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { DataSourceIndexed } from './DataSourceIndexed'
import { IAdvancedSearch } from '../Core/interface/IAdvancedSearchStrategy';
import { StringExtensions } from '../Core/Extensions'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';

//All custom pipelines should extend from pipelineBase
export let AdvancedSearchDataSource = (blotter: IAdaptableBlotter) => DataSourceIndexed.extend('AdvancedSearchDataSource', {
    blotter: blotter,
    apply: function () {
        let currentSearchId = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId
        if (StringExtensions.IsNotNullOrEmpty(currentSearchId)) {
            let savedSearch: IAdvancedSearch = blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(s => s.Uid == currentSearchId);
            this.buildIndex(this.filterTest(savedSearch));
        } else {
            this.clearIndex();
        }
    },
    filterTest: (currentSearch: IAdvancedSearch) => function (r: any, rowObject: any) {
        let columns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns
        let rowId = blotter.getPrimaryKeyValueFromRecord(rowObject)
        return ExpressionHelper.checkForExpression(currentSearch.Expression, rowId, columns, blotter);
    },
    getRowCount: function () {
        return StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearchId)
            ? this.index.length : this.dataSource.getRowCount();
    }
});