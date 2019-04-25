"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./ExpressionHelper");
const ColumnHelper_1 = require("./ColumnHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var ColumnFilterHelper;
(function (ColumnFilterHelper) {
    function convertColumnFiltersToKVPArray(columnFilters, columns) {
        let infoBody = [];
        columnFilters.forEach(x => {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(x.ColumnId, columns);
            if (column) {
                let expression = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(x.Filter, columns, false);
                infoBody.push({ Key: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(x.ColumnId, columns), Value: expression });
            }
        });
        return infoBody;
    }
    ColumnFilterHelper.convertColumnFiltersToKVPArray = convertColumnFiltersToKVPArray;
    function getColumnFiltersDescription(columnFilters, columns, blotter) {
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columnFilters)) {
            return "No Column Filter Active";
        }
        let stringarr = ColumnFilterHelper.convertColumnFiltersToKVPArray(columnFilters, columns).map(kvp => {
            return kvp.Key + ": " + kvp.Value;
        });
        return stringarr.join("; ");
    }
    ColumnFilterHelper.getColumnFiltersDescription = getColumnFiltersDescription;
})(ColumnFilterHelper = exports.ColumnFilterHelper || (exports.ColumnFilterHelper = {}));
