/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {CustomSortState} from './Interface/IState';
import {ISmartEditPreview} from '../../Core/Interface/ISmartEditStrategy';
import {ICustomSort} from '../../Core/Interface/ICustomSortStrategy';
import {SmartEditOperation} from '../../Core/Enums';

export const CUSTOMSORT_ADD = 'CUSTOMSORT_ADD';
export const CUSTOMSORT_EDIT = 'CUSTOMSORT_EDIT';
export const CUSTOMSORT_DELETE = 'CUSTOMSORT_DELETE';

export interface CustomSortAddAction extends Redux.Action {
    CustomSort: ICustomSort
}

export const AddCustomSort = (CustomSort: ICustomSort): CustomSortAddAction => ({
    type: CUSTOMSORT_ADD,
    CustomSort
})

const initialCustomSortState: CustomSortState = {
    CustomSorts: []
}

export const CustomSortReducer: Redux.Reducer<CustomSortState> = (state: CustomSortState = initialCustomSortState, action: Redux.Action): CustomSortState => {
    switch (action.type) {
        case CUSTOMSORT_ADD:
            return state
        default:
            return state
    }
}