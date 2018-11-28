import { ICalculatedColumnExpressionService } from "./Interface/ICalculatedColumnExpressionService";
import * as math from 'mathjs'
import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";

export class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
    constructor(private blotter: IAdaptableBlotter, private colFunctionValue: (columnId: string, record: any) => any) {
    }

    IsExpressionValid(expression: string): { IsValid: Boolean, ErrorMsg?: string } {
        try {
            let firstRecord = this.blotter.getFirstRecord();
            math.eval(expression, {
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
            if(this.blotter.isGroupRecord(record)){
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

    getColumnListFromExpression(expression: string): string[] {
        let columnList: string[] = []
        let regEx = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g
        let match = regEx.exec(expression);
        while (match !== null) {
            columnList.push(match[1])
            match = regEx.exec(expression);
        }
        return columnList

    }

    Test(expression: string, record: any): any {
        try {
            if(this.blotter.isGroupRecord(record)){
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

}
