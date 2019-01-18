import { CustomSortState } from './Interface/IState';
import * as Redux from 'redux'
import { ICustomSort } from '../../Utilities/Interface/IAdaptableBlotterObjects';

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

export const CustomSortAdd = (CustomSort: ICustomSort): CustomSortAddAction => ({
    type: CUSTOMSORT_ADD,
    CustomSort
})

export const CustomSortEdit = (CustomSort: ICustomSort): CustomSortEditAction => ({
    type: CUSTOMSORT_EDIT,
    CustomSort
})
export const CustomSortDelete = (CustomSort: ICustomSort): CustomSortDeleteAction => ({
    type: CUSTOMSORT_DELETE,
    CustomSort
})

const initialCustomSortState: CustomSortState = {
    CustomSorts: []
}

export const CustomSortReducer: Redux.Reducer<CustomSortState> = (state: CustomSortState = initialCustomSortState, action: Redux.Action): CustomSortState => {
    let customSorts: ICustomSort[]

    switch (action.type) {
        case CUSTOMSORT_ADD:
            customSorts = [].concat(state.CustomSorts);
            customSorts.push((<CustomSortAddAction>action).CustomSort);
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        
        case CUSTOMSORT_EDIT: {
            customSorts = [].concat(state.CustomSorts);
            let index = customSorts.findIndex(x => x.ColumnId == (<CustomSortAddAction>action).CustomSort.ColumnId)
            customSorts[index] = (<CustomSortAddAction>action).CustomSort;
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        }
        case CUSTOMSORT_DELETE:
            customSorts = [].concat(state.CustomSorts);
            let index = customSorts.findIndex(x => x.ColumnId == (<CustomSortDeleteAction>action).CustomSort.ColumnId)
            customSorts.splice(index, 1);
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        
        default:
            return state
    }
}