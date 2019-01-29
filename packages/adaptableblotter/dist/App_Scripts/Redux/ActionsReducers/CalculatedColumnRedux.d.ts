import { CalculatedColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { ICalculatedColumn } from "../../Utilities/Interface/BlotterObjects/ICalculatedColumn";
export declare const CALCULATEDCOLUMN_ADD = "CALCULATEDCOLUMN_ADD";
export declare const CALCULATEDCOLUMN_EDIT = "CALCULATEDCOLUMN_EDIT";
export declare const CALCULATEDCOLUMN_DELETE = "CALCULATEDCOLUMN_DELETE";
export declare const CALCULATEDCOLUMN_IS_EXPRESSION_VALID = "CALCULATEDCOLUMN_IS_EXPRESSION_VALID";
export interface CalculatedColumnAddAction extends Redux.Action {
    calculatedColumn: ICalculatedColumn;
}
export interface CalculatedColumnEditAction extends Redux.Action {
    index: number;
    calculatedColumn: ICalculatedColumn;
}
export interface CalculatedColumnDeleteAction extends Redux.Action {
    index: number;
}
export interface CalculatedColumnIsExpressionValidAction extends Redux.Action {
    expression: string;
}
export declare const CalculatedColumnAdd: (calculatedColumn: ICalculatedColumn) => CalculatedColumnAddAction;
export declare const CalculatedColumnEdit: (index: number, calculatedColumn: ICalculatedColumn) => CalculatedColumnEditAction;
export declare const CalculatedColumnDelete: (index: number) => CalculatedColumnDeleteAction;
export declare const CalculatedColumnIsExpressionValid: (expression: string) => CalculatedColumnIsExpressionValidAction;
export declare const CalculatedColumnReducer: Redux.Reducer<CalculatedColumnState>;
