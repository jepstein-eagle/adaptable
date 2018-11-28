"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./ExpressionHelper");
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const ColumnHelper_1 = require("./ColumnHelper");
var AlertHelper;
(function (AlertHelper) {
    function createAlertDescription(alertDefinition, columns) {
        let dataType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(alertDefinition.ColumnId, columns);
        let valueDescription = ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(alertDefinition.Range.Operator, dataType);
        if (!ExpressionHelper_1.ExpressionHelper.OperatorRequiresValue(alertDefinition.Range.Operator)) {
            return valueDescription;
        }
        let operand1Text = (dataType == Enums_1.DataType.Boolean || dataType == Enums_1.DataType.Number) ?
            alertDefinition.Range.Operand1 :
            "'" + alertDefinition.Range.Operand1 + "'";
        valueDescription = valueDescription + operand1Text;
        if (alertDefinition.Range.Operator == Enums_1.LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(alertDefinition.Range.Operand2)) {
            let operand2Text = (dataType == Enums_1.DataType.Number) ?
                " and " + alertDefinition.Range.Operand2 :
                " and '" + alertDefinition.Range.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    }
    AlertHelper.createAlertDescription = createAlertDescription;
})(AlertHelper = exports.AlertHelper || (exports.AlertHelper = {}));
