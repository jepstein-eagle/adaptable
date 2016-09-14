import {IColumn} from '../../Core/Interface/IAdaptableBlotter';
/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';

export const SET_NEW_COLUMN_LIST_ORDER = 'SET_NEW_COLUMN_LIST_ORDER';

export interface SetNewColumnListOrderAction extends Redux.Action {
    VisibleColumnList: Array<IColumn>
}

export const SetNewColumnListOrder = (VisibleColumnList: Array<IColumn>): SetNewColumnListOrderAction => ({
    type: SET_NEW_COLUMN_LIST_ORDER,
    VisibleColumnList
})
