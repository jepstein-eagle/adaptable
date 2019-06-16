import { CustomSortState, CustomSort } from '../../PredefinedConfig/RunTimeState/CustomSortState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const CUSTOM_SORT_ADD = 'CUSTOM_SORT_ADD';
export const CUSTOM_SORT_EDIT = 'CUSTOM_SORT_EDIT';
export const CUSTOM_SORT_DELETE = 'CUSTOM_SORT_DELETE';

export interface CustomSortAction extends Redux.Action {
  customSort: CustomSort;
}

export interface CustomSortAddAction extends CustomSortAction {}

export interface CustomSortEditAction extends CustomSortAction {}

export interface CustomSortDeleteAction extends CustomSortAction {}

export const CustomSortAdd = (customSort: CustomSort): CustomSortAddAction => ({
  type: CUSTOM_SORT_ADD,
  customSort,
});

export const CustomSortEdit = (customSort: CustomSort): CustomSortEditAction => ({
  type: CUSTOM_SORT_EDIT,
  customSort,
});
export const CustomSortDelete = (customSort: CustomSort): CustomSortDeleteAction => ({
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
  let customSorts: CustomSort[];

  switch (action.type) {
    case CUSTOM_SORT_ADD: {
      const actionCustomSort: CustomSort = (action as CustomSortAction).customSort;

      if (!actionCustomSort.Uuid) {
        actionCustomSort.Uuid = createUuid();
      }
      customSorts = [].concat(state.CustomSorts);
      customSorts.push(actionCustomSort);
      return { ...state, CustomSorts: customSorts };
    }

    case CUSTOM_SORT_EDIT: {
      const actionCustomSort: CustomSort = (action as CustomSortAction).customSort;
      return {
        ...state,
        CustomSorts: state.CustomSorts.map(abObject =>
          abObject.Uuid === actionCustomSort.Uuid ? actionCustomSort : abObject
        ),
      };
    }
    case CUSTOM_SORT_DELETE: {
      const actionCustomSort: CustomSort = (action as CustomSortAction).customSort;
      return {
        ...state,
        CustomSorts: state.CustomSorts.filter(abObject => abObject.Uuid !== actionCustomSort.Uuid),
      };
    }

    default:
      return state;
  }
};
