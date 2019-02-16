import { ICalculatedColumnExpressionService } from "./Interface/ICalculatedColumnExpressionService";
import * as math from 'mathjs'
import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ColumnHelper } from "../Helpers/ColumnHelper";
import { IColumn } from "../Interface/IColumn";

export class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
    constructor(private blotter: IAdaptableBlotter, private colFunctionValue: (columnId: string, record: any) => any) {
    }

    IsExpressionValid(expression: string, columns: IColumn[]): { IsValid: Boolean, ErrorMsg?: string } {
        try {
            let cleanedExpression: string = this.CleanExpressionColumnNames(expression, columns);
            let firstRecord = this.blotter.getFirstRecord();
            math.eval(cleanedExpression, {
                Col: (columnId: string) => {
                     try { return this.colFunctionValue(columnId, firstRecord) }
                    catch (e) {
                        throw Error("Unknown column " + columnId)
                    }
                }
            })
            return { IsValid: true };
        }
        catch (e) {
            LoggingHelper.LogWarning(e);
            return { IsValid: false, ErrorMsg: e.message };
        }
    }

    ComputeExpressionValue(expression: string, record: any): any {
        try {
            if (this.blotter.isGroupRecord(record)) {
                return null;
            }
            return math.eval(expression, {
                node: record,
                Col: (columnId: string) => {
                    try { return this.colFunctionValue(columnId, record) }
                    catch (e) {
                        throw Error("Unknown column " + columnId)
                    }
                }
            })
        }
        catch (e) {
            LoggingHelper.LogError(e);
            return null;
        }
    }

    GetColumnListFromExpression(expression: string): string[] {
        let columnList: string[] = []
        let regEx: RegExp = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g
        let match = regEx.exec(expression);
        while (match !== null) {
            columnList.push(match[1])
            match = regEx.exec(expression);
        }
        return columnList
    }


    CleanExpressionColumnNames(expression: string, columns: IColumn[]): string {
        let newExpression: string = expression;
        let columnNameList: string[] = []
        let regEx: RegExp = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g
        let match = regEx.exec(expression);
        while (match !== null) {
            let columnId: any = match[1];

            // check if its a column name
            let col: IColumn = ColumnHelper.getColumnFromId(columnId, columns, false);
            if (!col) { // no column so lets see if they are using FriendlyName
                col = ColumnHelper.getColumnFromName(columnId, columns);
                columnNameList.push(columnId)
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


        /*
        
        
                let columnIds: string[] = this.getColumnListFromExpression(expression, columns);
                columnIds.forEach(c => {
                    let stringToReplace: string = 'Col("' + c + '")'
                    alert("replacing " + stringToReplace);
                    let columnFriendName = ColumnHelper.getFriendlyNameFromColumnId(c, columns);
                    let newString: string = "[" + columnFriendName + "]"
                    newExpression = newExpression.replace(stringToReplace, newString)
                    alert("new exp: " +newExpression)
                })
        
                alert("returnIng: " + newExpression)
                return newExpression
        
                */
    }







}

