/// <reference path="../../../typings/index.d.ts" />
import {CustomSortState} from './Interface/IState';
import {ICustomSort} from '../../Core/Interface/ICustomSortStrategy';

export const CUSTOMSORT_ADD = 'CUSTOMSORT_ADD';
export const CUSTOMSORT_EDIT = 'CUSTOMSORT_EDIT';
export const CUSTOMSORT_DELETE = 'CUSTOMSORT_DELETE';

export interface CustomSortAddAction extends Redux.Action {
    CustomSort: ICustomSort
}

export interface CustomSortEditAction extends Redux.Action {
    CustomSort: ICustomSort
}

export interface CustomSortDeleteAction extends Redux.Action {
    CustomSort: ICustomSort
}

export const AddCustomSort = (CustomSort: ICustomSort): CustomSortAddAction => ({
    type: CUSTOMSORT_ADD,
    CustomSort
})

export const EditCustomSort = (CustomSort: ICustomSort): CustomSortEditAction => ({
    type: CUSTOMSORT_EDIT,
    CustomSort
})
export const DeleteCustomSort = (CustomSort: ICustomSort): CustomSortDeleteAction => ({
    type: CUSTOMSORT_DELETE,
    CustomSort
})

const initialCustomSortState: CustomSortState = {
    CustomSorts: []
}

export const CustomSortReducer: Redux.Reducer<CustomSortState> = (state: CustomSortState = initialCustomSortState, action: Redux.Action): CustomSortState => {
    switch (action.type) {
        case CUSTOMSORT_ADD:
            var items: Array<ICustomSort> = [].concat(state.CustomSorts);

            items.push((<CustomSortAddAction>action).CustomSort);
            return Object.assign({}, state, {
                CustomSorts: items
            });
        case CUSTOMSORT_EDIT: {
            var items: Array<ICustomSort> = [].concat(state.CustomSorts);
            let index = items.findIndex(x => x.ColumnId == (<CustomSortAddAction>action).CustomSort.ColumnId)
            items[index] = (<CustomSortAddAction>action).CustomSort;

            return Object.assign({}, state, {
                CustomSorts: items
            });
        }
        case CUSTOMSORT_DELETE:
            var items: Array<ICustomSort> = [].concat(state.CustomSorts);
            let index = items.findIndex(x => x.ColumnId == (<CustomSortDeleteAction>action).CustomSort.ColumnId)
            items.splice(index, 1);

            return Object.assign({}, state, {
                CustomSorts: items
            });
        default:
            return state
    }
}