import { ColumnCategoryState } from './Interface/IState';
import * as Redux from 'redux';
import { IColumnCategory } from '../../Utilities/Interface/BlotterObjects/IColumnCategory';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const COLUMN_CATEGORY_ADD = 'COLUMN_CATEGORY_ADD';
export const COLUMN_CATEGORY_EDIT = 'COLUMN_CATEGORY_EDIT';
export const COLUMN_CATEGORY_DELETE = 'COLUMN_CATEGORY_DELETE';

export interface ColumnCategoryAction extends Redux.Action {
  columnCategory: IColumnCategory;
}

export interface ColumnCategoryAddAction extends ColumnCategoryAction {}

export interface ColumnCategoryEditAction extends ColumnCategoryAction {}

export interface ColumnCategoryDeleteAction extends ColumnCategoryAction {}

export const ColumnCategoryAdd = (columnCategory: IColumnCategory): ColumnCategoryAddAction => ({
  type: COLUMN_CATEGORY_ADD,
  columnCategory,
});

export const ColumnCategoryEdit = (columnCategory: IColumnCategory): ColumnCategoryEditAction => ({
  type: COLUMN_CATEGORY_EDIT,
  columnCategory,
});

export const ColumnCategoryDelete = (
  columnCategory: IColumnCategory
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
  let columnCategories: IColumnCategory[];

  switch (action.type) {
    case COLUMN_CATEGORY_ADD: {
      const actionColumnCategory: IColumnCategory = (action as ColumnCategoryAction).columnCategory;

      if (!actionColumnCategory.Uuid) {
        actionColumnCategory.Uuid = createUuid();
      }
      columnCategories = [].concat(state.ColumnCategories);
      columnCategories.push(actionColumnCategory);
      return { ...state, ColumnCategories: columnCategories };
    }

    case COLUMN_CATEGORY_EDIT: {
      const actionColumnCategory: IColumnCategory = (action as ColumnCategoryAction).columnCategory;

      return {
        ...state,
        ColumnCategories: state.ColumnCategories.map(abObject =>
          abObject.Uuid === actionColumnCategory.Uuid ? actionColumnCategory : abObject
        ),
      };
    }

    case COLUMN_CATEGORY_DELETE: {
      const actionColumnCategory: IColumnCategory = (action as ColumnCategoryAction).columnCategory;
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
