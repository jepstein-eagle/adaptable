"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./ExpressionHelper");
var ColumnFilterHelper;
(function (ColumnFilterHelper) {
    function CreateColumnFilterFromUserFilter(userFilter) {
        return {
            ColumnId: userFilter.ColumnId,
            Filter: ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(userFilter.ColumnId, [], [], [userFilter.Name], []),
            IsReadOnly: false
        };
    }
    ColumnFilterHelper.CreateColumnFilterFromUserFilter = CreateColumnFilterFromUserFilter;
})(ColumnFilterHelper = exports.ColumnFilterHelper || (exports.ColumnFilterHelper = {}));
