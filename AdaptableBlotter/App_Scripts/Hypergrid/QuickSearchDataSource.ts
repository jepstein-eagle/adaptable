import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { DataSourceIndexed } from './DataSourceIndexed'

//All custom pipelines should extend from pipelineBase
export let QuickSearchDataSource = (blotter: IAdaptableBlotter) => DataSourceIndexed.extend('QuickSearchDataSource', {
    blotter: blotter,
    apply: function () {
        if (blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText != "") {
            this.buildIndex(this.filterTest);
        } else {
            this.clearIndex();
        }
    },
    filterTest: function (r: any, rowObject: any) {
        //Need to use the operator and case sensitive
        for (let prop in rowObject) {
            let stringValueLowerCase = String(rowObject[prop]).toLowerCase()
            let quickSearchLowerCase = blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText.toLowerCase()
            if (stringValueLowerCase.includes(quickSearchLowerCase)) {
                return true
            }
        }
        return false;
    },
    getRowCount: function () {
        return blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText != ""
            ? this.index.length : this.dataSource.getRowCount();
    }
});