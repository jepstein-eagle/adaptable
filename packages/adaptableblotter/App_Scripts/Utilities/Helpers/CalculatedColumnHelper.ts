import { ColumnHelper } from "./ColumnHelper";
import { IColumn } from "../Interface/IColumn";

export module CalculatedColumnHelper {

    export function GetColumnListFromExpression(expression: string): string[] {
        let columnList: string[] = []
        let regEx: RegExp = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g
        let match = regEx.exec(expression);
        while (match !== null) {
            columnList.push(match[1])
            match = regEx.exec(expression);
        }
        return columnList
    }

    export function CleanExpressionColumnNames(expression: string, columns: IColumn[]): string {
        let newExpression: string = expression;
        let columnNameList: string[] = []
        let regEx: RegExp = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g
        let match = regEx.exec(expression);
        while (match !== null) {
            let columnId: any = match[1];

            // check if its a column name
            let col: IColumn = ColumnHelper.getColumnFromId(columnId, columns, false);
            if (!col) { // no column so lets see if they are using FriendlyName
                col = ColumnHelper.getColumnFromName(columnId, columns, false);
                if (col) {
                    columnNameList.push(columnId)
                }
            }
            match = regEx.exec(expression);
        }

        columnNameList.forEach(c => {
            let stringToReplace: string = 'Col("' + c + '")'
            let columnId = ColumnHelper.getColumnIdFromFriendlyName(c, columns);
            let newString: string = 'Col("' + columnId + '")'
            newExpression = newExpression.replace(stringToReplace, newString)
        })
        return newExpression
    }

    export function GetExpressionString(expression: string, columns: IColumn[]): string {
        let cleanExpression: string = CleanExpressionColumnNames(expression, columns);
        let columnIds: string[] = GetColumnListFromExpression(cleanExpression);
        columnIds.forEach(c => {
            let stringToReplace: string = 'Col("' + c + '")'
            let columnFriendName = ColumnHelper.getFriendlyNameFromColumnId(c, columns);
            let newString: string = "[" + columnFriendName + "]"
            cleanExpression = cleanExpression.replace(stringToReplace, newString)
        })
        return cleanExpression
    }

}