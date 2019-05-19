import * as Redux from 'redux';
import { LayoutState } from './Interface/IState';
import { ILayout } from '../../Utilities/Interface/BlotterObjects/ILayout';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';

export const LAYOUT_SELECT = 'LAYOUT_SELECT';
export const LAYOUT_ADD = 'LAYOUT_ADD';
export const LAYOUT_EDIT = 'LAYOUT_EDIT';
export const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_DELETE = 'DELETE_LAYOUT';

export interface LayoutSaveAction extends Redux.Action {
  Index: number;
  Layout: ILayout;
}

export interface LayoutAddAction extends Redux.Action {
  Layout: ILayout;
}

export interface LayoutEditAction extends Redux.Action {
  Index: number;
  Layout: ILayout;
}

export interface LayoutSelectAction extends Redux.Action {
  LayoutName: string;
}

export interface LayoutDeleteAction extends Redux.Action {
  Layout: ILayout;
}

export interface LayoutIncludeVendorStateAction extends Redux.Action {}

export interface LayoutExcludeVendorStateAction extends Redux.Action {}

export const LayoutSave = (Index: number, Layout: ILayout): LayoutSaveAction => ({
  type: LAYOUT_SAVE,
  Index,
  Layout,
});

export const LayoutAdd = (Layout: ILayout): LayoutAddAction => ({
  type: LAYOUT_ADD,
  Layout,
});

export const LayoutEdit = (Index: number, Layout: ILayout): LayoutEditAction => ({
  type: LAYOUT_EDIT,
  Index,
  Layout,
});

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
  type: LAYOUT_SELECT,
  LayoutName,
});

export const LayoutDelete = (Layout: ILayout): LayoutDeleteAction => ({
  type: LAYOUT_DELETE,
  Layout,
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
    case LAYOUT_ADD:
      let actionTypedAdd = <LayoutAddAction>action;
      layouts = [].concat(state.Layouts);
      layouts.push(actionTypedAdd.Layout);
      return Object.assign({}, state, { Layouts: layouts });
    case LAYOUT_EDIT:
      let actionTypedAddUpdate = <LayoutEditAction>action;
      layouts = [].concat(state.Layouts);
      index = actionTypedAddUpdate.Index;
      layouts[index] = actionTypedAddUpdate.Layout;
      return Object.assign({}, state, { Layouts: layouts });
    case LAYOUT_DELETE:
      let actionTypedDelete = <LayoutDeleteAction>action;
      layouts = [].concat(state.Layouts);
      index = layouts.findIndex(x => x.Name == actionTypedDelete.Layout.Name);
      layouts.splice(index, 1);
      return Object.assign({}, state, { Layouts: layouts });
    default:
      return state;
  }
};
