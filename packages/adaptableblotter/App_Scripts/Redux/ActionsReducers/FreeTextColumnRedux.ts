import { FreeTextColumnState } from './Interface/IState';
import * as Redux from 'redux'
import { IFreeTextColumn } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { FreeTextStoredValue } from '../../View/UIInterfaces';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const FREE_TEXT_COLUMN_ADD = 'FREE_TEXT_COLUMN_ADD';
export const FREE_TEXT_COLUMN_EDIT = 'FREE_TEXT_COLUMN_EDIT';
export const FREE_TEXT_COLUMN_DELETE = 'FREE_TEXT_COLUMN_DELETE';
export const FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = 'FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE';

export interface FreeTextColumnAddAction extends Redux.Action {
    FreeTextColumn: IFreeTextColumn
}

export interface FreeTextColumnEditAction extends Redux.Action {
    Index: number,
    FreeTextColumn: IFreeTextColumn
}

export interface FreeTextColumnDeleteAction extends Redux.Action {
    FreeTextColumn: IFreeTextColumn
}

export interface FreeTextColumnAddEditStoredValueAction extends Redux.Action {
    FreeTextColumn: IFreeTextColumn,
    FreeTextStoredValue: FreeTextStoredValue
}

export const FreeTextColumnAdd = (FreeTextColumn: IFreeTextColumn): FreeTextColumnAddAction => ({
    type: FREE_TEXT_COLUMN_ADD,
    FreeTextColumn
})

export const FreeTextColumnEdit = (Index: number, FreeTextColumn: IFreeTextColumn): FreeTextColumnEditAction => ({
    type: FREE_TEXT_COLUMN_EDIT,
    Index,
    FreeTextColumn
})

export const FreeTextColumnDelete = (FreeTextColumn: IFreeTextColumn): FreeTextColumnDeleteAction => ({
    type: FREE_TEXT_COLUMN_DELETE,
    FreeTextColumn
})

export const FreeTextColumnAddEditStoredValue = (FreeTextColumn: IFreeTextColumn, FreeTextStoredValue: FreeTextStoredValue): FreeTextColumnAddEditStoredValueAction => ({
    type: FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
    FreeTextColumn,
    FreeTextStoredValue
})

const initialFreeTextColumnState: FreeTextColumnState = {
    FreeTextColumns: EMPTY_ARRAY
}

export const FreeTextColumnReducer: Redux.Reducer<FreeTextColumnState> = (state: FreeTextColumnState = initialFreeTextColumnState, action: Redux.Action): FreeTextColumnState => {
    let freeTextColumns: IFreeTextColumn[]

    switch (action.type) {
        case FREE_TEXT_COLUMN_ADD:
             freeTextColumns = [].concat(state.FreeTextColumns);
            freeTextColumns.push((<FreeTextColumnAddAction>action).FreeTextColumn);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });

        case FREE_TEXT_COLUMN_EDIT: {
             freeTextColumns = [].concat(state.FreeTextColumns);
            let index = (<FreeTextColumnEditAction>action).Index
            freeTextColumns[index] = (<FreeTextColumnEditAction>action).FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        case FREE_TEXT_COLUMN_DELETE: {
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = freeTextColumns.findIndex(x => x.ColumnId == (<FreeTextColumnDeleteAction>action).FreeTextColumn.ColumnId)
            freeTextColumns.splice(index, 1);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        case FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
            let actionTypedAddEditStoredValue = (<FreeTextColumnAddEditStoredValueAction>action)

            let existingIndex: number = actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues.findIndex(ftsv => ftsv.PrimaryKey == actionTypedAddEditStoredValue.FreeTextStoredValue.PrimaryKey);
            if (existingIndex != -1) {
                actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues[existingIndex] = actionTypedAddEditStoredValue.FreeTextStoredValue;
            } else {
                actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues.push(actionTypedAddEditStoredValue.FreeTextStoredValue)
            }
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = freeTextColumns.findIndex(x => x.ColumnId == actionTypedAddEditStoredValue.FreeTextColumn.ColumnId)
            freeTextColumns[index] = actionTypedAddEditStoredValue.FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        default:
            return state
    }
}