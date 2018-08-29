"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHORTCUT_APPLY = 'SHORTCUT_APPLY';
exports.SHORTCUT_ADD = 'SHORTCUT_ADD';
exports.SHORTCUT_DELETE = 'SHORTCUT_DELETE';
exports.SHORTCUT_CHANGE_KEY = 'SHORTCUT_CHANGE_KEY';
exports.SHORTCUT_CHANGE_OPERATION = 'SHORTCUT_CHANGE_OPERATION';
exports.SHORTCUT_CHANGE_RESULT = 'SHORTCUT_CHANGE_RESULT';
exports.ShortcutApply = (Shortcut, CellInfo, KeyEventString, NewValue) => ({
    type: exports.SHORTCUT_APPLY,
    Shortcut,
    CellInfo,
    KeyEventString,
    NewValue
});
exports.ShortcutAdd = (Shortcut) => ({
    type: exports.SHORTCUT_ADD,
    Shortcut
});
exports.ShortcutChangeKey = (Shortcut, NewShortcutKey) => ({
    type: exports.SHORTCUT_CHANGE_KEY,
    Shortcut,
    NewShortcutKey
});
exports.ShortcutChangeOperation = (Shortcut, NewShortcutOperation) => ({
    type: exports.SHORTCUT_CHANGE_OPERATION,
    Shortcut,
    NewShortcutOperation
});
exports.ShortcutChangeResult = (Shortcut, NewShortcutResult) => ({
    type: exports.SHORTCUT_CHANGE_RESULT,
    Shortcut,
    NewShortcutResult
});
exports.ShortcutDelete = (Shortcut) => ({
    type: exports.SHORTCUT_DELETE,
    Shortcut
});
const initialShortcutState = {
    Shortcuts: []
};
exports.ShortcutReducer = (state = initialShortcutState, action) => {
    let shortcuts;
    switch (action.type) {
        case exports.SHORTCUT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state);
        case exports.SHORTCUT_CHANGE_KEY: {
            let actionTyped = action;
            let shortcut = actionTyped.Shortcut;
            shortcuts = [].concat(state.Shortcuts);
            let index = shortcuts.indexOf(shortcut);
            shortcuts[index] = Object.assign({}, shortcut, { ShortcutKey: actionTyped.NewShortcutKey });
            return Object.assign({}, state, {
                Shortcuts: shortcuts
            });
        }
        case exports.SHORTCUT_CHANGE_OPERATION: {
            let actionTyped = action;
            let shortcut = actionTyped.Shortcut;
            shortcuts = [].concat(state.Shortcuts);
            let index = shortcuts.indexOf(shortcut);
            shortcuts[index] = Object.assign({}, shortcut, { ShortcutOperation: actionTyped.NewShortcutOperation });
            return Object.assign({}, state, {
                Shortcuts: shortcuts
            });
        }
        case exports.SHORTCUT_CHANGE_RESULT: {
            let actionTyped = action;
            let shortcut = actionTyped.Shortcut;
            shortcuts = [].concat(state.Shortcuts);
            let index = shortcuts.indexOf(shortcut);
            shortcuts[index] = Object.assign({}, shortcut, { ShortcutResult: actionTyped.NewShortcutResult });
            return Object.assign({}, state, {
                Shortcuts: shortcuts
            });
        }
        case exports.SHORTCUT_ADD: {
            let newShortcut = action.Shortcut;
            shortcuts = [].concat(state.Shortcuts);
            shortcuts.push(newShortcut);
            return Object.assign({}, state, {
                Shortcuts: shortcuts
            });
        }
        case exports.SHORTCUT_DELETE: {
            let deletedShortcut = action.Shortcut;
            shortcuts = [].concat(state.Shortcuts);
            let index = shortcuts.findIndex(x => x.ShortcutKey == deletedShortcut.ShortcutKey);
            shortcuts.splice(index, 1);
            return Object.assign({}, state, {
                Shortcuts: shortcuts
            });
        }
        default:
            return state;
    }
};
