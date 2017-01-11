import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'

//All custom pipelines should extend from pipelineBase
export let DataSourceIndexed = (<any>window).fin.Hypergrid.DataSourceBase.extend('DataSourceIndexed', {

    isNullObject: false,
    initialize: function (dataSource: any) {
        this.dataSource = dataSource;
        this.index = [];
    },

    transposeY: function (y: any) {
        return this.index.length ? this.index[y] : y;
    },

    getDataIndex: function (y: any) {
        return this.dataSource.getDataIndex(this.transposeY(y));
    },

    getRow: function (y: any) {
        return this.dataSource.getRow(this.transposeY(y));
    },

    getValue: function (x: any, y: any) {
        return this.dataSource.getValue(x, this.transposeY(y));
    },

    setValue: function (x: any, y: any, value: any) {
        this.dataSource.setValue(x, this.transposeY(y), value);
    },

    getRowCount: function () {
        return this.index.length || this.dataSource.getRowCount();
    },

    clearIndex: function () {
        this.index.length = 0;
    },

    buildIndex: function (predicate: any) {
        var rowCount = this.dataSource.getRowCount(),
            index = this.index;

        this.clearIndex();

        for (var r = 0; r < rowCount; r++) {
            if (!predicate || predicate.call(this, r, this.dataSource.getRow(r))) {
                index.push(r);
            }
        }

        return index;
    }
});