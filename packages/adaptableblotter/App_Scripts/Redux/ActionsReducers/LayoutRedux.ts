import * as Redux from 'redux';
import { LayoutState } from './Interface/IState';
import { ILayout } from '../../Utilities/Interface/BlotterObjects/ILayout';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';

export const LAYOUT_SELECT = 'LAYOUT_SELECT';
export const LAYOUT_ADD_UPDATE = 'LAYOUT_ADD_UPDATE';
export const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_DELETE = 'DELETE_LAYOUT';

export interface LayoutSaveAction extends Redux.Action {
  Index: number;
  Layout: ILayout;
}

export interface LayoutAddUpdateAction extends Redux.Action {
  Index: number;
  Layout: ILayout;
}

export interface LayoutSelectAction extends Redux.Action {
  LayoutName: string;
}

export interface LayoutDeleteAction extends Redux.Action {
  LayoutName: string;
}

export interface LayoutIncludeVendorStateAction extends Redux.Action {}

export interface LayoutExcludeVendorStateAction extends Redux.Action {}

export const LayoutSave = (Index: number, Layout: ILayout): LayoutSaveAction => ({
  type: LAYOUT_SAVE,
  Index,
  Layout,
});

export const LayoutAddUpdate = (Index: number, Layout: ILayout): LayoutAddUpdateAction => ({
  type: LAYOUT_ADD_UPDATE,
  Index,
  Layout,
});

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
  type: LAYOUT_SELECT,
  LayoutName,
});

export const LayoutDelete = (LayoutName: string): LayoutDeleteAction => ({
  type: LAYOUT_DELETE,
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
  let index: number;
  let layouts: ILayout[];
  switch (action.type) {
    //  case LAYOUT_SAVE: // we do nothing here as its all done in the store
    //      return state
    case LAYOUT_SELECT:
      return Object.assign({}, state, { CurrentLayout: (<LayoutSelectAction>action).LayoutName });
    case LAYOUT_ADD_UPDATE:
      let actionTypedAddUpdate = <LayoutAddUpdateAction>action;
      layouts = [].concat(state.Layouts);
      index = actionTypedAddUpdate.Index;
      if (actionTypedAddUpdate.Index > -1) {
        // it exists
        layouts[index] = actionTypedAddUpdate.Layout;
      } else {
        layouts.push(actionTypedAddUpdate.Layout);
      }
      return Object.assign({}, state, { Layouts: layouts });
    case LAYOUT_DELETE:
      let actionTypedDelete = <LayoutDeleteAction>action;
      layouts = [].concat(state.Layouts);
      index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName);
      layouts.splice(index, 1);
      return Object.assign({}, state, { Layouts: layouts });
    default:
      return state;
  }
};
