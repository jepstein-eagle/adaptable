import {
  ColumnCategoryState,
  ColumnCategory,
} from '../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const COLUMN_CATEGORY_ADD = 'COLUMN_CATEGORY_ADD';
export const COLUMN_CATEGORY_EDIT = 'COLUMN_CATEGORY_EDIT';
export const COLUMN_CATEGORY_DELETE = 'COLUMN_CATEGORY_DELETE';

export interface ColumnCategoryAction extends Redux.Action {
  columnCategory: ColumnCategory;
}

export interface ColumnCategoryAddAction extends ColumnCategoryAction {}

export interface ColumnCategoryEditAction extends ColumnCategoryAction {}

export interface ColumnCategoryDeleteAction extends ColumnCategoryAction {}

export const ColumnCategoryAdd = (columnCategory: ColumnCategory): ColumnCategoryAddAction => ({
  type: COLUMN_CATEGORY_ADD,
  columnCategory,
});

export const ColumnCategoryEdit = (columnCategory: ColumnCategory): ColumnCategoryEditAction => ({
  type: COLUMN_CATEGORY_EDIT,
  columnCategory,
});

export const ColumnCategoryDelete = (
  columnCategory: ColumnCategory
): ColumnCategoryDeleteAction => ({
  type: COLUMN_CATEGORY_DELETE,
  columnCategory,
});

const initialColumnCategoryState: ColumnCategoryState = {
  ColumnCategories: EMPTY_ARRAY,
};

export const ColumnCategoryReducer: Redux.Reducer<ColumnCategoryState> = (
  state: ColumnCategoryState = initialColumnCategoryState,
  action: Redux.Action
): ColumnCategoryState => {
  let columnCategories: ColumnCategory[];

  switch (action.type) {
    case COLUMN_CATEGORY_ADD: {
      const actionColumnCategory: ColumnCategory = (action as ColumnCategoryAction).columnCategory;

      if (!actionColumnCategory.Uuid) {
        actionColumnCategory.Uuid = createUuid();
      }
      columnCategories = [].concat(state.ColumnCategories);
      columnCategories.push(actionColumnCategory);
      return { ...state, ColumnCategories: columnCategories };
    }

    case COLUMN_CATEGORY_EDIT: {
      const actionColumnCategory: ColumnCategory = (action as ColumnCategoryAction).columnCategory;

      return {
        ...state,
        ColumnCategories: state.ColumnCategories.map(abObject =>
          abObject.Uuid === actionColumnCategory.Uuid ? actionColumnCategory : abObject
        ),
      };
    }

    case COLUMN_CATEGORY_DELETE: {
      const actionColumnCategory: ColumnCategory = (action as ColumnCategoryAction).columnCategory;
      return {
        ...state,
        ColumnCategories: state.ColumnCategories.filter(
          abObject => abObject.Uuid !== actionColumnCategory.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
