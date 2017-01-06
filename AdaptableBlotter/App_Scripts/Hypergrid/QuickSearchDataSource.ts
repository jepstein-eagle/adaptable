import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { DataSourceIndexed } from './DataSourceIndexed'
import { StringExtensions } from '../Core/Extensions'
import { LeafExpressionOperator } from '../Core/Enums'

//All custom pipelines should extend from pipelineBase
export let QuickSearchDataSource = (blotter: IAdaptableBlotter) => DataSourceIndexed.extend('QuickSearchDataSource', {
    blotter: blotter,
    apply: function () {
        if (StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)) {
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
        return false;
    },
    getRowCount: function () {
        return StringExtensions.IsNotNullOrEmpty(blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText)
            ? this.index.length : this.dataSource.getRowCount();
    }
});