import { CustomSortState } from './Interface/IState';
import * as Redux from 'redux';
import { ICustomSort } from '../../Utilities/Interface/BlotterObjects/ICustomSort';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const CUSTOM_SORT_ADD = 'CUSTOM_SORT_ADD';
export const CUSTOM_SORT_EDIT = 'CUSTOM_SORT_EDIT';
export const CUSTOM_SORT_DELETE = 'CUSTOM_SORT_DELETE';

export interface CustomSortAction extends Redux.Action {
  customSort: ICustomSort;
}

export interface CustomSortAddAction extends CustomSortAction {}

export interface CustomSortEditAction extends CustomSortAction {}

export interface CustomSortDeleteAction extends CustomSortAction {}

export const CustomSortAdd = (customSort: ICustomSort): CustomSortAddAction => ({
  type: CUSTOM_SORT_ADD,
  customSort,
});

export const CustomSortEdit = (customSort: ICustomSort): CustomSortEditAction => ({
  type: CUSTOM_SORT_EDIT,
  customSort,
});
export const CustomSortDelete = (customSort: ICustomSort): CustomSortDeleteAction => ({
  type: CUSTOM_SORT_DELETE,
  customSort,
});

const initialCustomSortState: CustomSortState = {
  CustomSorts: EMPTY_ARRAY,
};

export const CustomSortReducer: Redux.Reducer<CustomSortState> = (
  state: CustomSortState = initialCustomSortState,
  action: Redux.Action
): CustomSortState => {
  let customSorts: ICustomSort[];

  switch (action.type) {
    case CUSTOM_SORT_ADD: {
      const actionCustomSort: ICustomSort = (action as CustomSortAction).customSort;

      if (!actionCustomSort.Uuid) {
        actionCustomSort.Uuid = createUuid();
      }
      customSorts = [].concat(state.CustomSorts);
      customSorts.push(actionCustomSort);
      return { ...state, CustomSorts: customSorts };
    }

    case CUSTOM_SORT_EDIT: {
      const actionCustomSort: ICustomSort = (action as CustomSortAction).customSort;
      return {
        ...state,
        CustomSorts: state.CustomSorts.map(abObject =>
          abObject.Uuid === actionCustomSort.Uuid ? actionCustomSort : abObject
        ),
      };
    }
    case CUSTOM_SORT_DELETE: {
      const actionCustomSort: ICustomSort = (action as CustomSortAction).customSort;
      return {
        ...state,
        CustomSorts: state.CustomSorts.filter(abObject => abObject.Uuid !== actionCustomSort.Uuid),
      };
    }

    default:
      return state;
  }
};
