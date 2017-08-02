import { CustomColumnState } from './Interface/IState';
import { ICustomColumn } from '../../Core/Interface/ICustomColumnStrategy';
import * as Redux from 'redux'

export const CUSTOMCOLUMN_ADD = 'CUSTOMCOLUMN_ADD';
export const CUSTOMCOLUMN_EDIT = 'CUSTOMCOLUMN_EDIT';
export const CUSTOMCOLUMN_DELETE = 'CUSTOMCOLUMN_DELETE';

export interface CustomColumnAddAction extends Redux.Action {
    CustomColumn: ICustomColumn
}

export interface CustomColumnEditAction extends Redux.Action {
    Index: number,
    CustomColumn: ICustomColumn
}

export interface CustomColumnDeleteAction extends Redux.Action {
    Index: number
}

export const CustomColumnAdd = (CustomColumn: ICustomColumn): CustomColumnAddAction => ({
    type: CUSTOMCOLUMN_ADD,
    CustomColumn
})

export const CustomColumnEdit = (Index: number, CustomColumn: ICustomColumn): CustomColumnEditAction => ({
    type: CUSTOMCOLUMN_EDIT,
    Index,
    CustomColumn
})
export const CustomColumnDelete = (Index: number): CustomColumnDeleteAction => ({
    type: CUSTOMCOLUMN_DELETE,
    Index
})

const initialCustomColumnState: CustomColumnState = {
    CustomColumns: []
}

export const CustomColumnReducer: Redux.Reducer<CustomColumnState> = (state: CustomColumnState = initialCustomColumnState, action: Redux.Action): CustomColumnState => {
    switch (action.type) {
        case CUSTOMCOLUMN_ADD: {
            let items: Array<ICustomColumn> = [].concat(state.CustomColumns);

            items.push((<CustomColumnAddAction>action).CustomColumn);
            return Object.assign({}, state, {
                CustomColumns: items
            });
        }
        case CUSTOMCOLUMN_EDIT: {
            let items: Array<ICustomColumn> = [].concat(state.CustomColumns);
            let index = (<CustomColumnEditAction>action).Index
            items[index] = (<CustomColumnEditAction>action).CustomColumn;

            return Object.assign({}, state, {
                CustomColumns: items
            });
        }
        case CUSTOMCOLUMN_DELETE:
            var items: Array<ICustomColumn> = [].concat(state.CustomColumns);
            let index = (<CustomColumnDeleteAction>action).Index
            items.splice(index, 1);

            return Object.assign({}, state, {
                CustomColumns: items
            });
        default:
            return state
    }
}