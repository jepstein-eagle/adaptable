import { FormatColumnState } from './Interface/IState';
import * as Redux from 'redux'
import { IFormatColumn } from '../../Core/Api/Interface/IAdaptableBlotterObjects';

export const FORMAT_COLUMN_ADD = 'FORMAT_COLUMN_ADD';
export const FORMAT_COLUMN_EDIT = 'FORMAT_COLUMN_EDIT';
export const FORMAT_COLUMN_DELETE = 'FORMAT_COLUMN_DELETE';

export interface FormatColumnAddAction extends Redux.Action {
    FormatColumn: IFormatColumn
}

export interface FormatColumnEditAction extends Redux.Action {
    FormatColumn: IFormatColumn
}

export interface FormatColumnDeleteAction extends Redux.Action {
    FormatColumn: IFormatColumn
}

export const FormatColumnAdd = (FormatColumn: IFormatColumn): FormatColumnAddAction => ({
    type: FORMAT_COLUMN_ADD,
    FormatColumn
})

export const FormatColumnEdit = (FormatColumn: IFormatColumn): FormatColumnEditAction => ({
    type: FORMAT_COLUMN_EDIT,
    FormatColumn
})
export const FormatColumnDelete = (FormatColumn: IFormatColumn): FormatColumnDeleteAction => ({
    type: FORMAT_COLUMN_DELETE,
    FormatColumn
})

const initialFormatColumnState: FormatColumnState = {
    FormatColumns: []
}

export const FormatColumnReducer: Redux.Reducer<FormatColumnState> = (state: FormatColumnState = initialFormatColumnState, action: Redux.Action): FormatColumnState => {
    let formatColumns: IFormatColumn[]

    switch (action.type) {
        case FORMAT_COLUMN_ADD:
            formatColumns = [].concat(state.FormatColumns);
            formatColumns.push((<FormatColumnAddAction>action).FormatColumn);
            return Object.assign({}, state, { FormatColumns: formatColumns });

        case FORMAT_COLUMN_EDIT: {
            formatColumns = [].concat(state.FormatColumns);
            let index = formatColumns.findIndex(x => x.ColumnId == (<FormatColumnAddAction>action).FormatColumn.ColumnId)
            formatColumns[index] = (<FormatColumnAddAction>action).FormatColumn;
            return Object.assign({}, state, { FormatColumns: formatColumns });
        }
        case FORMAT_COLUMN_DELETE:
            formatColumns = [].concat(state.FormatColumns);
            let index = formatColumns.findIndex(x => x.ColumnId == (<FormatColumnDeleteAction>action).FormatColumn.ColumnId)
            formatColumns.splice(index, 1);
            return Object.assign({}, state, { FormatColumns: formatColumns });
        default:
            return state
    }
}