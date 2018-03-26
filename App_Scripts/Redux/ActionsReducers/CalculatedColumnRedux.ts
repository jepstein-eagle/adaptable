import { CalculatedColumnState } from './Interface/IState';
import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import * as Redux from 'redux'

export const CALCULATEDCOLUMN_ADD = 'CALCULATEDCOLUMN_ADD';
export const CALCULATEDCOLUMN_EDIT = 'CALCULATEDCOLUMN_EDIT';
export const CALCULATEDCOLUMN_DELETE = 'CALCULATEDCOLUMN_DELETE';
export const CALCULATEDCOLUMN_IS_EXPRESSION_VALID = 'CALCULATEDCOLUMN_IS_EXPRESSION_VALID';
export const CALCULATEDCOLUMN_SET_ERROR_MSG = 'CALCULATEDCOLUMN_SET_ERROR_MSG';

export interface CalculatedColumnAddAction extends Redux.Action {
    CalculatedColumn: ICalculatedColumn
}

export interface CalculatedColumnEditAction extends Redux.Action {
    Index: number,
    CalculatedColumn: ICalculatedColumn
}

export interface CalculatedColumnDeleteAction extends Redux.Action {
    Index: number
}

export interface CalculatedColumnIsExpressionValidAction extends Redux.Action {
    Expression: string
}

export interface CalculatedColumnSetErrorMessageAction extends Redux.Action {
    ErrorMsg: string
}

export const CalculatedColumnAdd = (CalculatedColumn: ICalculatedColumn): CalculatedColumnAddAction => ({
    type: CALCULATEDCOLUMN_ADD,
    CalculatedColumn
})

export const CalculatedColumnEdit = (Index: number, CalculatedColumn: ICalculatedColumn): CalculatedColumnEditAction => ({
    type: CALCULATEDCOLUMN_EDIT,
    Index,
    CalculatedColumn
})

export const CalculatedColumnDelete = (Index: number): CalculatedColumnDeleteAction => ({
    type: CALCULATEDCOLUMN_DELETE,
    Index
})

export const CalculatedColumnIsExpressionValid = (Expression: string): CalculatedColumnIsExpressionValidAction => ({
    type: CALCULATEDCOLUMN_IS_EXPRESSION_VALID,
    Expression
})

export const CalculatedColumnSetErrorMessage = (ErrorMsg: string): CalculatedColumnSetErrorMessageAction => ({
    type: CALCULATEDCOLUMN_SET_ERROR_MSG,
    ErrorMsg
})

const initialCalculatedColumnState: CalculatedColumnState = {
    CalculatedColumns: [],
    CalculatedColumnErrorMessage : ""
}

export const CalculatedColumnReducer: Redux.Reducer<CalculatedColumnState> = (state: CalculatedColumnState = initialCalculatedColumnState, action: Redux.Action): CalculatedColumnState => {
    switch (action.type) {
        case CALCULATEDCOLUMN_SET_ERROR_MSG:{
            return Object.assign({}, state, {
                CalculatedColumnErrorMessage: (<CalculatedColumnSetErrorMessageAction>action).ErrorMsg
            });
        }
        case CALCULATEDCOLUMN_ADD: {
            let items: Array<ICalculatedColumn> = [].concat(state.CalculatedColumns);

            items.push((<CalculatedColumnAddAction>action).CalculatedColumn);
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        }
        case CALCULATEDCOLUMN_EDIT: {
            let items: Array<ICalculatedColumn> = [].concat(state.CalculatedColumns);
            let index = (<CalculatedColumnEditAction>action).Index
            items[index] = (<CalculatedColumnEditAction>action).CalculatedColumn;

            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        }
        case CALCULATEDCOLUMN_DELETE:
            var items: Array<ICalculatedColumn> = [].concat(state.CalculatedColumns);
            let index = (<CalculatedColumnDeleteAction>action).Index
            items.splice(index, 1);

            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        default:
            return state
    }
}