import { ShortcutState } from './Interface/IState';
import { MathOperation } from '../../Utilities/Enums';
import * as Redux from 'redux';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { IShortcut } from '../../Utilities/Interface/BlotterObjects/IShortcut';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const SHORTCUT_APPLY = 'SHORTCUT_APPLY';
export const SHORTCUT_ADD = 'SHORTCUT_ADD';
export const SHORTCUT_DELETE = 'SHORTCUT_DELETE';
export const SHORTCUT_EDIT = 'SHORTCUT_EDIT';

export interface ShortcutApplyAction extends Redux.Action {
  Shortcut: IShortcut;
  CellInfo: ICellInfo;
  KeyEventString: string;
  NewValue: any;
}

export interface ShortcutAddAction extends Redux.Action {
  Shortcut: IShortcut;
}

export interface ShortcutEditAction extends Redux.Action {
  index: number;
  Shortcut: IShortcut;
}

export interface ShortcutDeleteAction extends Redux.Action {
  index: number;
  Shortcut: IShortcut;
}

export const ShortcutApply = (
  Shortcut: IShortcut,
  CellInfo: ICellInfo,
  KeyEventString: string,
  NewValue: any
): ShortcutApplyAction => ({
  type: SHORTCUT_APPLY,
  Shortcut,
  CellInfo,
  KeyEventString,
  NewValue,
});

export const ShortcutAdd = (Shortcut: IShortcut): ShortcutAddAction => ({
  type: SHORTCUT_ADD,
  Shortcut,
});

export const ShortcutEdit = (index: number, Shortcut: IShortcut): ShortcutEditAction => ({
  type: SHORTCUT_EDIT,
  index,
  Shortcut,
});

export const ShortcutDelete = (index: number, Shortcut: IShortcut): ShortcutDeleteAction => ({
  type: SHORTCUT_DELETE,
  index,
  Shortcut,
});

const initialShortcutState: ShortcutState = {
  Shortcuts: EMPTY_ARRAY,
};

export const ShortcutReducer: Redux.Reducer<ShortcutState> = (
  state: ShortcutState = initialShortcutState,
  action: Redux.Action
): ShortcutState => {
  let shortcuts: IShortcut[];

  switch (action.type) {
    case SHORTCUT_APPLY:
      //we apply logic in the middleware since it's an API call
      return Object.assign({}, state);

    case SHORTCUT_ADD: {
      let newShortcut = (<ShortcutAddAction>action).Shortcut;
      shortcuts = [].concat(state.Shortcuts);
      shortcuts.push(newShortcut);
      return Object.assign({}, state, { Shortcuts: shortcuts });
    }
    case SHORTCUT_EDIT: {
      shortcuts = [].concat(state.Shortcuts);
      let actionTyped = <ShortcutEditAction>action;
      shortcuts[actionTyped.index] = actionTyped.Shortcut;
      return Object.assign({}, state, { Shortcuts: shortcuts });
    }
    case SHORTCUT_DELETE: {
      let deletedShortcut = (<ShortcutDeleteAction>action).Shortcut;
      shortcuts = [].concat(state.Shortcuts);
      let index = shortcuts.findIndex(x => x.ShortcutKey == deletedShortcut.ShortcutKey);
      shortcuts.splice(index, 1);
      return Object.assign({}, state, { Shortcuts: shortcuts });
    }
    default:
      return state;
  }
};
