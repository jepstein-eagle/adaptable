"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { DataSourceBase } from './DataSourceBase'
const DataSourceBase = require("fin-hypergrid-data-source-base");
//All custom pipelines should extend from pipelineBase
exports.DataSourceIndexed = DataSourceBase.extend('DataSourceIndexed', {
    isNullObject: false,
    initialize: function (dataSource) {
        this.dataSource = dataSource;
        this.index = [];
    },
    transposeY: function (y) {
        return this.index.length ? this.index[y] : y;
    },
    getDataIndex: function (y) {
        return this.dataSource.getDataIndex(this.transposeY(y));
    },
    getRow: function (y) {
        return this.dataSource.getRow(this.transposeY(y));
    },
    getValue: function (x, y) {
        return this.dataSource.getValue(x, this.transposeY(y));
    },
    setValue: function (x, y, value) {
        this.dataSource.setValue(x, this.transposeY(y), value);
    },
    getRowCount: function () {
        return this.index.length || this.dataSource.getRowCount();
    },
    clearIndex: function () {
        this.index.length = 0;
    },
    buildIndex: function (predicate) {
        var rowCount = this.dataSource.getRowCount(), index = this.index;
        this.clearIndex();
        for (var r = 0; r < rowCount; r++) {
            if (!predicate || predicate.call(this, r, this.dataSource.getRow(r))) {
                index.push(r);
            }
        }
        return index;
    }
});
