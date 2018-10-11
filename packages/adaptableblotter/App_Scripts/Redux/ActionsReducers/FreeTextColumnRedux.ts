import { FreeTextColumnState } from './Interface/IState';
import * as Redux from 'redux'
import { IFreeTextColumn } from '../../Core/Api/Interface/IAdaptableBlotterObjects';

export const FreeText_COLUMN_ADD = 'FreeText_COLUMN_ADD';
export const FreeText_COLUMN_EDIT = 'FreeText_COLUMN_EDIT';
export const FreeText_COLUMN_DELETE = 'FreeText_COLUMN_DELETE';

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

export const FreeTextColumnAdd = (FreeTextColumn: IFreeTextColumn): FreeTextColumnAddAction => ({
    type: FreeText_COLUMN_ADD,
    FreeTextColumn
})

export const FreeTextColumnEdit = (Index: number, FreeTextColumn: IFreeTextColumn): FreeTextColumnEditAction => ({
    type: FreeText_COLUMN_EDIT,
    Index,
    FreeTextColumn
})
export const FreeTextColumnDelete = (FreeTextColumn: IFreeTextColumn): FreeTextColumnDeleteAction => ({
    type: FreeText_COLUMN_DELETE,
    FreeTextColumn
})

const initialFreeTextColumnState: FreeTextColumnState = {
    FreeTextColumns: []
}

export const FreeTextColumnReducer: Redux.Reducer<FreeTextColumnState> = (state: FreeTextColumnState = initialFreeTextColumnState, action: Redux.Action): FreeTextColumnState => {
    let freeTextColumns: IFreeTextColumn[]

    switch (action.type) {
        case FreeText_COLUMN_ADD:
            freeTextColumns = [].concat(state.FreeTextColumns);
            freeTextColumns.push((<FreeTextColumnAddAction>action).FreeTextColumn);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });

        case FreeText_COLUMN_EDIT: {
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = (<FreeTextColumnEditAction>action).Index
            freeTextColumns[index] = (<FreeTextColumnEditAction>action).FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        case FreeText_COLUMN_DELETE:
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = freeTextColumns.findIndex(x => x.ColumnId == (<FreeTextColumnDeleteAction>action).FreeTextColumn.ColumnId)
            freeTextColumns.splice(index, 1);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        default:
            return state
    }
}