import { ColumnCategoryState } from './Interface/IState';
import * as Redux from 'redux'
import { IColumnCategory } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const COLUMN_CATEGORY_ADD = 'COLUMN_CATEGORY_ADD';
export const COLUMN_CATEGORY_EDIT = 'COLUMN_CATEGORY_EDIT';
export const COLUMN_CATEGORY_DELETE = 'COLUMN_CATEGORY_DELETE';

export interface ColumnCategoryAddAction extends Redux.Action {
    ColumnCategory: IColumnCategory
}

export interface ColumnCategoryEditAction extends Redux.Action {
    Index: number,
    ColumnCategory: IColumnCategory
}

export interface ColumnCategoryDeleteAction extends Redux.Action {
    ColumnCategory: IColumnCategory
}


export const ColumnCategoryAdd = (ColumnCategory: IColumnCategory): ColumnCategoryAddAction => ({
    type: COLUMN_CATEGORY_ADD,
    ColumnCategory
})

export const ColumnCategoryEdit = (Index: number, ColumnCategory: IColumnCategory): ColumnCategoryEditAction => ({
    type: COLUMN_CATEGORY_EDIT,
    Index,
    ColumnCategory
})

export const ColumnCategoryDelete = (ColumnCategory: IColumnCategory): ColumnCategoryDeleteAction => ({
    type: COLUMN_CATEGORY_DELETE,
    ColumnCategory
})


const initialColumnCategoryState: ColumnCategoryState = {
    ColumnCategories: EMPTY_ARRAY
}

export const ColumnCategoryReducer: Redux.Reducer<ColumnCategoryState> = (state: ColumnCategoryState = initialColumnCategoryState, action: Redux.Action): ColumnCategoryState => {
    let columnCategories: IColumnCategory[]

    switch (action.type) {
        case COLUMN_CATEGORY_ADD:
            columnCategories = [].concat(state.ColumnCategories);
            columnCategories.push((<ColumnCategoryAddAction>action).ColumnCategory);
            return Object.assign({}, state, { ColumnCategories: columnCategories });

        case COLUMN_CATEGORY_EDIT: {
            columnCategories = [].concat(state.ColumnCategories);
            let index = (<ColumnCategoryEditAction>action).Index
            columnCategories[index] = (<ColumnCategoryEditAction>action).ColumnCategory;
            return Object.assign({}, state, { ColumnCategories: columnCategories });
        }
        case COLUMN_CATEGORY_DELETE: {
            columnCategories = [].concat(state.ColumnCategories);
            let index = columnCategories.findIndex(x => x.ColumnCategoryId == (<ColumnCategoryDeleteAction>action).ColumnCategory.ColumnCategoryId)
            columnCategories.splice(index, 1);
            return Object.assign({}, state, { ColumnCategories: columnCategories });
        }
        default:
            return state
    }
}