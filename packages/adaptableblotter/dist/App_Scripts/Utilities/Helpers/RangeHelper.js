"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var RangeHelper;
(function (RangeHelper) {
    function CreateValueRange(operator, operand1, operand2) {
        return {
            Operator: operator,
            Operand1: operand1 == null ? null : operand1.trim(),
            Operand2: operand2 == null ? null : operand2.trim(),
            Operand1Type: "Value",
            Operand2Type: "Value"
        };
    }
    RangeHelper.CreateValueRange = CreateValueRange;
    function GetNumberOperatorPairs() {
        return [
            { Key: "<>", Value: Enums_1.LeafExpressionOperator.NotEquals },
            { Key: ">=", Value: Enums_1.LeafExpressionOperator.GreaterThanOrEqual },
            { Key: "<=", Value: Enums_1.LeafExpressionOperator.LessThanOrEqual },
            { Key: ">", Value: Enums_1.LeafExpressionOperator.GreaterThan },
            { Key: "<", Value: Enums_1.LeafExpressionOperator.LessThan },
            { Key: "=", Value: Enums_1.LeafExpressionOperator.Equals },
            { Key: ":", Value: Enums_1.LeafExpressionOperator.Between },
            { Key: "%", Value: Enums_1.LeafExpressionOperator.Contains },
            { Key: "*", Value: Enums_1.LeafExpressionOperator.StartsWith },
            { Key: "!", Value: Enums_1.LeafExpressionOperator.NotContains },
        ];
    }
    RangeHelper.GetNumberOperatorPairs = GetNumberOperatorPairs;
    function GetStringOperatorPairs() {
        return [
            { Key: "*", Value: Enums_1.LeafExpressionOperator.StartsWith },
            { Key: "%", Value: Enums_1.LeafExpressionOperator.Contains },
            { Key: "!", Value: Enums_1.LeafExpressionOperator.NotContains },
            { Key: "=", Value: Enums_1.LeafExpressionOperator.Equals },
        ];
    }
    RangeHelper.GetStringOperatorPairs = GetStringOperatorPairs;
    function GetDateOperatorPairs() {
        return [];
    }
    RangeHelper.GetDateOperatorPairs = GetDateOperatorPairs;
    function CreateValueRangeFromOperand(rangeText) {
        // if its empty then return null
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(rangeText)) {
            return null;
        }
        // next check to see if there is an operator
        let operatorText = getSingleOperatorFromOperandText(rangeText);
        // if there is no operator then its a simple contains range
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(operatorText)) {
            return CreateValueRange(Enums_1.LeafExpressionOperator.Contains, rangeText, null);
        }
        // we have an operator: so lets get the operand text 
        let operandText = rangeText.replace(operatorText, "").trim();
        //first check that its not ONLY an operator - if so then return null
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(operandText)) {
            return null;
        }
        // we have an operator AND text so create the appropriate range
        // NOTE:  This fails unless the text is > 5.  not working for 5:7 at the moment..
        let opKVP = GetNumberOperatorPairs().find(kvp => kvp.Key == operatorText);
        if (opKVP == null) { // no number so lets try a string -- not sure we need this now as all strings are in numbers (need to rethink that)
            opKVP = GetStringOperatorPairs().find(kvp => kvp.Key == operatorText);
        }
        return (opKVP) ? CreateValueRange(opKVP.Value, operandText, null) : null;
    }
    RangeHelper.CreateValueRangeFromOperand = CreateValueRangeFromOperand;
    function getSingleOperatorFromOperandText(operandText) {
        let trimmedOperand = operandText.trim();
        let returnOperand = "";
        GetNumberOperatorPairs().forEach(op => {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnOperand)) {
                if (trimmedOperand.includes(op.Key)) {
                    returnOperand = op.Key;
                }
            }
        });
        GetStringOperatorPairs().forEach(op => {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnOperand)) {
                if (trimmedOperand.includes(op.Key)) {
                    returnOperand = op.Key;
                }
            }
        });
        return returnOperand;
    }
    function IsColumnAppropriateForRange(operator, column) {
        if (operator == Enums_1.LeafExpressionOperator.Contains) {
            return true;
        }
        // if its a number operator check if its a number column
        if (column.DataType == Enums_1.DataType.Number) {
            let tet = GetNumberOperatorPairs().map(kvp => {
                return kvp.Value;
            });
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(tet, operator)) {
                return true;
            }
        }
        // if its a string operator check if its a string column
        if (column.DataType == Enums_1.DataType.String) {
            let tet = GetStringOperatorPairs().map(kvp => {
                return kvp.Value;
            });
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(tet, operator)) {
                return true;
            }
        }
        return false;
    }
    RangeHelper.IsColumnAppropriateForRange = IsColumnAppropriateForRange;
})(RangeHelper = exports.RangeHelper || (exports.RangeHelper = {}));
