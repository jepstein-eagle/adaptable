import { LinkedColumnState } from './Interface/IState';
import * as Redux from 'redux'
import { ILinkedColumn } from '../../Core/Interface/Interfaces';

export const LINKED_COLUMN_ADD = 'LINKED_COLUMN_ADD';
export const LINKED_COLUMN_EDIT = 'LINKED_COLUMN_EDIT';
export const LINKED_COLUMN_DELETE = 'LINKED_COLUMN_DELETE';

export interface LinkedColumnAddAction extends Redux.Action {
    LinkedColumn: ILinkedColumn
}

export interface LinkedColumnEditAction extends Redux.Action {
    Index: number,
    LinkedColumn: ILinkedColumn
}

export interface LinkedColumnDeleteAction extends Redux.Action {
    LinkedColumn: ILinkedColumn
}


export const LinkedColumnAdd = (LinkedColumn: ILinkedColumn): LinkedColumnAddAction => ({
    type: LINKED_COLUMN_ADD,
    LinkedColumn
})

export const LinkedColumnEdit = (Index: number, LinkedColumn: ILinkedColumn): LinkedColumnEditAction => ({
    type: LINKED_COLUMN_EDIT,
    Index,
    LinkedColumn
})

export const LinkedColumnDelete = (LinkedColumn: ILinkedColumn): LinkedColumnDeleteAction => ({
    type: LINKED_COLUMN_DELETE,
    LinkedColumn
})


const initialLinkedColumnState: LinkedColumnState = {
    LinkedColumns: []
}

export const LinkedColumnReducer: Redux.Reducer<LinkedColumnState> = (state: LinkedColumnState = initialLinkedColumnState, action: Redux.Action): LinkedColumnState => {
    let LinkedColumns: ILinkedColumn[]

    switch (action.type) {
        case LINKED_COLUMN_ADD:
             LinkedColumns = [].concat(state.LinkedColumns);
            LinkedColumns.push((<LinkedColumnAddAction>action).LinkedColumn);
            return Object.assign({}, state, { LinkedColumns: LinkedColumns });

        case LINKED_COLUMN_EDIT: {
             LinkedColumns = [].concat(state.LinkedColumns);
            let index = (<LinkedColumnEditAction>action).Index
            LinkedColumns[index] = (<LinkedColumnEditAction>action).LinkedColumn;
            return Object.assign({}, state, { LinkedColumns: LinkedColumns });
        }
        case LINKED_COLUMN_DELETE: {
            LinkedColumns = [].concat(state.LinkedColumns);
            let index = LinkedColumns.findIndex(x => x.LinkedColumnId == (<LinkedColumnDeleteAction>action).LinkedColumn.LinkedColumnId)
            LinkedColumns.splice(index, 1);
            return Object.assign({}, state, { LinkedColumns: LinkedColumns });
        }
             default:
            return state
    }
}