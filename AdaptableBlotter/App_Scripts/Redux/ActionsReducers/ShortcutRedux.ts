/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {ShortcutState} from './Interface/IState';
import {IShortcut} from '../../Core/Interface/IShortcutStrategy';

export const SHORTCUT_SELECT = 'SHORTCUT_SELECT';
export const SHORTCUT_ADD = 'SHORTCUT_ADD';
export const SHORTCUT_EDIT = 'SHORTCUT_EDIT';
export const SHORTCUT_DELETE = 'SHORTCUT_DELETE';

export interface ShortcutSelectAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutAddAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutEditAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutDeleteAction extends Redux.Action {
    Shortcut: IShortcut
}

export const SelectShortcut = (Shortcut: IShortcut): ShortcutSelectAction => ({
    type: SHORTCUT_SELECT,
    Shortcut
})

export const AddShortcut = (Shortcut: IShortcut): ShortcutAddAction => ({
    type: SHORTCUT_ADD,
    Shortcut
})

export const EditShortcut = (Shortcut: IShortcut): ShortcutEditAction => ({
    type: SHORTCUT_EDIT,
    Shortcut
})

export const DeleteShortcut = (Shortcut: IShortcut): ShortcutDeleteAction => ({
    type: SHORTCUT_DELETE,
    Shortcut
})

const initialShortcutState: ShortcutState = {
    Shortcuts: [{ ShortcutId: 1, ShortcutName: "First", IsLive: false }, { ShortcutId: 2, ShortcutName: "Second", IsLive: false}]
}

export const ShortcutReducer: Redux.Reducer<ShortcutState> = (state: ShortcutState = initialShortcutState, action: Redux.Action): ShortcutState => {
    switch (action.type) {
        //  have take all the otehr actions out of here for now; need to add back when we do add / edit / delete


         case SHORTCUT_SELECT: {
          //  alert("In reducer")
 
            var items: Array<IShortcut> = [].concat(state.Shortcuts);
            let updatedShortcut = (<ShortcutSelectAction>action).Shortcut;
            alert(updatedShortcut.ShortcutId);
            alert(updatedShortcut.IsLive);
            let index = items.findIndex(x => x.ShortcutId == (<ShortcutSelectAction>action).Shortcut.ShortcutId)
            items[index] = (<ShortcutSelectAction>action).Shortcut;

            

            return Object.assign({}, state, {
                Shortcuts: items
            });
        }


        default:
            return state
    }
}