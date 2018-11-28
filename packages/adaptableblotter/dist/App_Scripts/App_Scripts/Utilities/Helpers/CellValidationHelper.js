"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./ExpressionHelper");
const ColumnHelper_1 = require("./ColumnHelper");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const Enums_1 = require("../../Core/Enums");
var CellValidationHelper;
(function (CellValidationHelper) {
    function createCellValidationDescription(cellValidationRule, columns) {
        if (cellValidationRule.Range.Operator == Enums_1.LeafExpressionOperator.PrimaryKeyDuplicate) {
            return "Primary Key column cannot contain duplicate values";
        }
        let valueDescription = ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(cellValidationRule.Range.Operator, ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns));
        if (!ExpressionHelper_1.ExpressionHelper.OperatorRequiresValue(cellValidationRule.Range.Operator)) {
            return valueDescription;
        }
        let dataType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns);
        let operand1Text = (dataType == Enums_1.DataType.Boolean || dataType == Enums_1.DataType.Number) ?
            cellValidationRule.Range.Operand1 :
            "'" + cellValidationRule.Range.Operand1 + "'";
        valueDescription = valueDescription + operand1Text;
        if (cellValidationRule.Range.Operator == Enums_1.LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(cellValidationRule.Range.Operand2)) {
            let operand2Text = (dataType == Enums_1.DataType.Number) ?
                " and " + cellValidationRule.Range.Operand2 :
                " and '" + cellValidationRule.Range.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    }
    CellValidationHelper.createCellValidationDescription = createCellValidationDescription;
})(CellValidationHelper = exports.CellValidationHelper || (exports.CellValidationHelper = {}));
