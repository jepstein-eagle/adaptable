import { ShortcutState } from './Interface/IState';
import { MathOperation } from '../../Utilities/Enums';
import * as Redux from 'redux';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { IShortcut } from '../../Utilities/Interface/BlotterObjects/IShortcut';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const SHORTCUT_APPLY = 'SHORTCUT_APPLY';
export const SHORTCUT_ADD = 'SHORTCUT_ADD';
export const SHORTCUT_EDIT = 'SHORTCUT_EDIT';
export const SHORTCUT_DELETE = 'SHORTCUT_DELETE';

export interface ShortcutApplyAction extends Redux.Action {
  Shortcut: IShortcut;
  CellInfo: ICellInfo;
  KeyEventString: string;
  NewValue: any;
}

export interface ShortcutAction extends Redux.Action {
  shortcut: IShortcut;
}

export interface ShortcutAddAction extends ShortcutAction {}

export interface ShortcutEditAction extends ShortcutAction {}

export interface ShortcutDeleteAction extends ShortcutAction {}

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

export const ShortcutAdd = (shortcut: IShortcut): ShortcutAddAction => ({
  type: SHORTCUT_ADD,
  shortcut,
});

export const ShortcutEdit = (shortcut: IShortcut): ShortcutEditAction => ({
  type: SHORTCUT_EDIT,
  shortcut,
});
export const ShortcutDelete = (shortcut: IShortcut): ShortcutDeleteAction => ({
  type: SHORTCUT_DELETE,
  shortcut,
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
      const actionShortcut: IShortcut = (action as ShortcutAction).shortcut;

      if (!actionShortcut.Uuid) {
        actionShortcut.Uuid = createUuid();
      }
      shortcuts = [].concat(state.Shortcuts);
      shortcuts.push(actionShortcut);
      return { ...state, Shortcuts: shortcuts };
    }

    case SHORTCUT_EDIT: {
      const actionShortcut: IShortcut = (action as ShortcutAction).shortcut;
      return {
        ...state,
        Shortcuts: state.Shortcuts.map(abObject =>
          abObject.Uuid === actionShortcut.Uuid ? actionShortcut : abObject
        ),
      };
    }
    case SHORTCUT_DELETE: {
      const actionShortcut: IShortcut = (action as ShortcutAction).shortcut;
      return {
        ...state,
        Shortcuts: state.Shortcuts.filter(abObject => abObject.Uuid !== actionShortcut.Uuid),
      };
    }
    default:
      return state;
  }
};
