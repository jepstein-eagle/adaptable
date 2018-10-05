"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./ExpressionHelper");
const ColumnHelper_1 = require("./ColumnHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var ColumnFilterHelper;
(function (ColumnFilterHelper) {
    function ConvertColumnFiltersToKVPArray(columnFilters, columns) {
        let infoBody = [];
        columnFilters.forEach(x => {
            let column = columns.find(c => c.ColumnId == x.ColumnId);
            if (column) {
                let expression = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(x.Filter, columns, false);
                infoBody.push({ Key: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(x.ColumnId, columns), Value: expression });
            }
        });
        return infoBody;
    }
    ColumnFilterHelper.ConvertColumnFiltersToKVPArray = ConvertColumnFiltersToKVPArray;
    function getColumnFiltersDescription(columnFilters, columns, blotter) {
        if (blotter && !blotter.isFilterable()) {
            return "Grid is not filterable";
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columnFilters)) {
            return "No Column Filter Active";
        }
        let stringarr = ColumnFilterHelper.ConvertColumnFiltersToKVPArray(columnFilters, columns).map(kvp => {
            return kvp.Key + ": " + kvp.Value;
        });
        return stringarr.join("; ");
    }
    ColumnFilterHelper.getColumnFiltersDescription = getColumnFiltersDescription;
})(ColumnFilterHelper = exports.ColumnFilterHelper || (exports.ColumnFilterHelper = {}));
