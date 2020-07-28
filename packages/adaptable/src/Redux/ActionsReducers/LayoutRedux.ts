import * as Redux from 'redux';
import { LayoutState, Layout } from '../../PredefinedConfig/LayoutState';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const LAYOUT_ADD = 'LAYOUT_ADD';
export const LAYOUT_EDIT = 'LAYOUT_EDIT';
export const LAYOUT_DELETE = 'LAYOUT_DELETE';
export const LAYOUT_SELECT = 'LAYOUT_SELECT';
export const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_UPDATE_CURRENT_DRAFT = 'LAYOUT_UPDATE_CURRENT_DRAFT';

export interface LayoutAction extends Redux.Action {
  layout: Layout;
}

export interface LayoutAddAction extends LayoutAction {}

export interface LayoutEditAction extends LayoutAction {}

export interface LayoutDeleteAction extends LayoutAction {}

export interface LayoutSaveAction extends LayoutAction {}

export interface LayoutUpdateCurrentDraftAction extends LayoutAction {}

export interface LayoutSelectAction extends Redux.Action {
  LayoutName: string;
}

export interface LayoutIncludeVendorStateAction extends Redux.Action {}

export interface LayoutExcludeVendorStateAction extends Redux.Action {}

export const LayoutAdd = (layout: Layout): LayoutAddAction => ({
  type: LAYOUT_ADD,
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

export const LayoutUpdateCurrentDraft = (layout: Layout): LayoutUpdateCurrentDraftAction => ({
  type: LAYOUT_UPDATE_CURRENT_DRAFT,
  layout,
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
    case LAYOUT_SELECT: {
      const newCurrentLayout = (action as LayoutSelectAction).LayoutName;
      if ((state.Layouts || []).find(l => l.Name === newCurrentLayout)) {
        return Object.assign({}, state, { CurrentLayout: newCurrentLayout });
      }
      return state;
    }
    case LAYOUT_ADD: {
      const actionLayout: Layout = (action as LayoutAction).layout;

      if (!actionLayout.Uuid) {
        actionLayout.Uuid = createUuid();
      }
      layouts = [].concat(state.Layouts);
      layouts.push(actionLayout);
      return { ...state, Layouts: layouts };
    }

    case LAYOUT_SAVE: {
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
      const newLayouts = state.Layouts.filter(abObject => abObject.Uuid !== actionLayout.Uuid);
      return {
        ...state,
        CurrentLayout:
          state.CurrentLayout === actionLayout.Name ? newLayouts[0].Name : state.CurrentLayout,
        Layouts: newLayouts,
      };
    }
    default:
      return state;
  }
};
