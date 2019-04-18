"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnHelper_1 = require("./ColumnHelper");
var CalculatedColumnHelper;
(function (CalculatedColumnHelper) {
    function GetColumnListFromExpression(expression) {
        let columnList = [];
        let regEx = /\b(?:Col\(")([a-zA-Z0-9 ]+)(?:"\))/g;
        let match = regEx.exec(expression);
        while (match !== null) {
            columnList.push(match[1]);
            match = regEx.exec(expression);
        }
        return columnList;
    }
    CalculatedColumnHelper.GetColumnListFromExpression = GetColumnListFromExpression;
    function CleanExpressionColumnNames(expression, columns) {
        let newExpression = expression;
        let columnNameList = [];
        let regEx = /\b(?:Col\(")([a-zA-Z0-9 ]+)(?:"\))/g;
        let match = regEx.exec(expression);
        while (match !== null) {
            let columnId = match[1];
            // check if its a column name
            let col = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, columns, false);
            if (!col) { // no column so lets see if they are using FriendlyName
                col = ColumnHelper_1.ColumnHelper.getColumnFromFriendlyName(columnId, columns, false);
                if (col) {
                    columnNameList.push(columnId);
                }
            }
            match = regEx.exec(expression);
        }
        columnNameList.forEach(c => {
            let stringToReplace = 'Col("' + c + '")';
            let columnId = ColumnHelper_1.ColumnHelper.getColumnIdFromFriendlyName(c, columns);
            let newString = 'Col("' + columnId + '")';
            newExpression = newExpression.replace(stringToReplace, newString);
        });
        return newExpression;
    }
    CalculatedColumnHelper.CleanExpressionColumnNames = CleanExpressionColumnNames;
    function GetExpressionString(expression, columns) {
        let cleanExpression = CleanExpressionColumnNames(expression, columns);
        let columnIds = GetColumnListFromExpression(cleanExpression);
        columnIds.forEach(c => {
            let stringToReplace = 'Col("' + c + '")';
            let columnFriendName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(c, columns);
            let newString = "[" + columnFriendName + "]";
            cleanExpression = cleanExpression.replace(stringToReplace, newString);
        });
        return cleanExpression;
    }
    CalculatedColumnHelper.GetExpressionString = GetExpressionString;
})(CalculatedColumnHelper = exports.CalculatedColumnHelper || (exports.CalculatedColumnHelper = {}));
