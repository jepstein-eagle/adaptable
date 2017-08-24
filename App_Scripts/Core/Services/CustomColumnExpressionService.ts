import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { EnumExtensions } from '../../Core/Extensions';
import { ICustomColumnExpressionService } from "./Interface/ICustomColumnExpressionService";
import * as math from 'mathjs'

export class CustomColumnExpressionService implements ICustomColumnExpressionService {
    constructor(private blotter: IAdaptableBlotter, private colFunctionValue: (columnId: string, record: any) => any) {
    }

    IsExpressionValid(expression: string): { IsValid: Boolean, ErrorMsg?: string } {
        try {
            math.eval(expression, {
                Col: (columnId: string) => { return 0 }
            })
            return { IsValid: true };
        }
        catch (e) {
            console.error(e);
            return { IsValid: false, ErrorMsg: e.message };
        }
    }

    ComputeExpressionValue(expression: string, record: any): any {
        try {
            return math.eval(expression, {
                node: record,
                Col: (columnId: string) => { return this.colFunctionValue(columnId, record) }
            })
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }

    getColumnListFromExpression(expression: string) : string[]{
        let columnList : string[] = []
        let regEx = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g
        let match = regEx.exec(expression);
        while(match !== null) {
            columnList.push(match[1])
            match = regEx.exec(expression);
        }
        return columnList

    }
}
