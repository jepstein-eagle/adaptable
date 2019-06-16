import * as Redux from 'redux';
import { LayoutState, Layout } from '../../PredefinedConfig/IUserState/LayoutState';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const LAYOUT_ADD = 'LAYOUT_ADD';
export const LAYOUT_EDIT = 'LAYOUT_EDIT';
export const LAYOUT_DELETE = 'LAYOUT_DELETE';
export const LAYOUT_SELECT = 'LAYOUT_SELECT';
export const LAYOUT_SAVE = 'LAYOUT_SAVE';

export interface LayoutAction extends Redux.Action {
  layout: Layout;
}

export interface LayoutAddAction extends LayoutAction {}

export interface LayoutEditAction extends LayoutAction {}

export interface LayoutDeleteAction extends LayoutAction {}

export interface LayoutSaveAction extends LayoutAction {}

export interface LayoutSelectAction extends Redux.Action {
  LayoutName: string;
}

export interface LayoutIncludeVendorStateAction extends Redux.Action {}

export interface LayoutExcludeVendorStateAction extends Redux.Action {}

export const LayoutAdd = (layout: Layout): LayoutAddAction => ({
  type: LAYOUT_ADD,
  layout,
});

export const LayoutEdit = (layout: Layout): LayoutEditAction => ({
  type: LAYOUT_EDIT,
  layout,
});
export const LayoutDelete = (layout: Layout): LayoutDeleteAction => ({
  type: LAYOUT_DELETE,
  layout,
});

export const LayoutSave = (layout: Layout): LayoutSaveAction => ({
  type: LAYOUT_SAVE,
  layout,
});

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
  type: LAYOUT_SELECT,
  LayoutName,
});

const initialLayoutState: LayoutState = {
  CurrentLayout: EMPTY_STRING,
  Layouts: EMPTY_ARRAY,
};

export const LayoutReducer: Redux.Reducer<LayoutState> = (
  state: LayoutState = initialLayoutState,
  action: Redux.Action
): LayoutState => {
  let layouts: Layout[];
  switch (action.type) {
    //  case LAYOUT_SAVE: // we do nothing here as its all done in the store
    //      return state
    case LAYOUT_SELECT:
      return Object.assign({}, state, { CurrentLayout: (<LayoutSelectAction>action).LayoutName });
    case LAYOUT_ADD: {
      const actionLayout: Layout = (action as LayoutAction).layout;

      if (!actionLayout.Uuid) {
        actionLayout.Uuid = createUuid();
      }
      layouts = [].concat(state.Layouts);
      layouts.push(actionLayout);
      return { ...state, Layouts: layouts };
    }

    case LAYOUT_EDIT: {
      const actionLayout: Layout = (action as LayoutAction).layout;
      return {
        ...state,
        Layouts: state.Layouts.map(abObject =>
          abObject.Uuid === actionLayout.Uuid ? actionLayout : abObject
        ),
      };
    }

    case LAYOUT_DELETE: {
      const actionLayout: Layout = (action as LayoutAction).layout;
      return {
        ...state,
        Layouts: state.Layouts.filter(abObject => abObject.Uuid !== actionLayout.Uuid),
      };
    }
    default:
      return state;
  }
};
