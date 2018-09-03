import { CalculatedColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { ICalculatedColumn } from '../../Core/Api/Interface/AdaptableBlotterObjects';
export declare const CALCULATEDCOLUMN_ADD = "CALCULATEDCOLUMN_ADD";
export declare const CALCULATEDCOLUMN_EDIT = "CALCULATEDCOLUMN_EDIT";
export declare const CALCULATEDCOLUMN_DELETE = "CALCULATEDCOLUMN_DELETE";
export declare const CALCULATEDCOLUMN_IS_EXPRESSION_VALID = "CALCULATEDCOLUMN_IS_EXPRESSION_VALID";
export declare const CALCULATEDCOLUMN_SET_ERROR_MSG = "CALCULATEDCOLUMN_SET_ERROR_MSG";
export interface CalculatedColumnAddAction extends Redux.Action {
    CalculatedColumn: ICalculatedColumn;
}
export interface CalculatedColumnEditAction extends Redux.Action {
    Index: number;
    CalculatedColumn: ICalculatedColumn;
}
export interface CalculatedColumnDeleteAction extends Redux.Action {
    Index: number;
}
export interface CalculatedColumnIsExpressionValidAction extends Redux.Action {
    Expression: string;
}
export interface CalculatedColumnSetErrorMessageAction extends Redux.Action {
    ErrorMsg: string;
}
export declare const CalculatedColumnAdd: (CalculatedColumn: ICalculatedColumn) => CalculatedColumnAddAction;
export declare const CalculatedColumnEdit: (Index: number, CalculatedColumn: ICalculatedColumn) => CalculatedColumnEditAction;
export declare const CalculatedColumnDelete: (Index: number) => CalculatedColumnDeleteAction;
export declare const CalculatedColumnIsExpressionValid: (Expression: string) => CalculatedColumnIsExpressionValidAction;
export declare const CalculatedColumnSetErrorMessage: (ErrorMsg: string) => CalculatedColumnSetErrorMessageAction;
export declare const CalculatedColumnReducer: Redux.Reducer<CalculatedColumnState>;
