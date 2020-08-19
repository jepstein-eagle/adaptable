import { LayoutEditorDroppableIds } from './droppableIds';
import { Layout } from '../../../../PredefinedConfig/LayoutState';

export type LayoutEditorState = {
  dropDisabledOnColumns: boolean;
  dropDisabledOnSort: boolean;
  dropDisabledOnRowGroups: boolean;
  dragSource: LayoutEditorDroppableIds;
  layout: Layout;
};

export const getInitialState = (layout: Layout) => {
  return {
    dropDisabledOnColumns: false,
    dropDisabledOnSort: false,
    dropDisabledOnRowGroups: false,
    dragSource: LayoutEditorDroppableIds.None,
    layout,
  };
};
export type LayoutEditorAction = any;

export const reducer = (
  state: LayoutEditorState,
  action: LayoutEditorAction
): LayoutEditorState => {
  if (action.type === LayoutEditorActions.SET_DRAG_SOURCE) {
    return {
      ...state,
      dragSource: action.payload,
    };
  }
  if (action.type === LayoutEditorActions.SET_DROP_DISABLED_ON_COLUMNS) {
    return {
      ...state,
      dropDisabledOnColumns: action.payload,
    };
  }
  if (action.type === LayoutEditorActions.SET_DROP_DISABLED_ON_SORT) {
    return {
      ...state,
      dropDisabledOnSort: action.payload,
    };
  }

  if (action.type === LayoutEditorActions.SET_DROP_DISABLED_ON_ROW_GROUPS) {
    return {
      ...state,
      dropDisabledOnRowGroups: action.payload,
    };
  }

  if (action.type === LayoutEditorActions.SET_LAYOUT) {
    return {
      ...state,
      layout: action.payload,
    };
  }

  return state;
};

export enum LayoutEditorActions {
  SET_LAYOUT = 'SET_LAYOUT',
  SET_DRAG_SOURCE = 'SET_DRAG_SOURCE',
  SET_DROP_DISABLED_ON_COLUMNS = 'SET_DROP_DISABLED_ON_COLUMNS',
  SET_DROP_DISABLED_ON_SORT = 'SET_DROP_DISABLED_ON_SORT',
  SET_DROP_DISABLED_ON_ROW_GROUPS = 'SET_DROP_DISABLED_ON_ROW_GROUPS',
}
