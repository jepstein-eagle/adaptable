"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.SET_MENUITEMS = 'SET_MENUITEMS';
exports.BUILD_COLUMN_CONTEXT_MENU = 'BUILD_COLUMN_CONTEXT_MENU';
exports.ADD_ITEM_COLUMN_CONTEXT_MENU = 'ADD_ITEM_COLUMN_CONTEXT_MENU';
exports.CLEAR_COLUMN_CONTEXT_MENU = 'CLEAR_COLUMN_CONTEXT_MENU';
//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
exports.SetMenuItems = (MenuItems) => ({
    type: exports.SET_MENUITEMS,
    MenuItems
});
exports.BuildColumnContextMenu = (ColumnId) => ({
    type: exports.BUILD_COLUMN_CONTEXT_MENU,
    ColumnId
});
//export const ShowColumnContextMenu = (): ShowColumnContextMenuAction => ({
//   type: SHOW_COLUMN_CONTEXT_MENU
//})
exports.AddItemColumnContextMenu = (Item) => ({
    type: exports.ADD_ITEM_COLUMN_CONTEXT_MENU,
    Item
});
exports.ClearColumnContextMenu = () => ({
    type: exports.CLEAR_COLUMN_CONTEXT_MENU
});
const initialMenuState = {
    MenuItems: GeneralConstants_1.EMPTY_ARRAY,
    ContextMenu: {
        ColumnId: null,
        Items: GeneralConstants_1.EMPTY_ARRAY
    }
};
exports.MenuReducer = (state = initialMenuState, action) => {
    switch (action.type) {
        case exports.SET_MENUITEMS:
            {
                //TODO: we need to merge with the existing set of menuitems instead of replacing it. 
                //it will be important we we ever allow show/hide on menus
                let actionTyped = action;
                let menuItems = actionTyped.MenuItems.sort((a, b) => (a.Label < b.Label) ? -1
                    : (a.Label > b.Label) ? 1 : 0);
                return Object.assign({}, state, { MenuItems: menuItems });
            }
        case exports.BUILD_COLUMN_CONTEXT_MENU:
            {
                let actionTyped = action;
                return Object.assign({}, state, {
                    ContextMenu: {
                        ColumnId: actionTyped.ColumnId,
                        Items: []
                    }
                });
            }
        case exports.CLEAR_COLUMN_CONTEXT_MENU:
            {
                return Object.assign({}, state, {
                    ContextMenu: {
                        ColumnId: "",
                        Items: []
                    }
                });
            }
        case exports.ADD_ITEM_COLUMN_CONTEXT_MENU: {
            let actionTyped = action;
            return Object.assign({}, state, {
                ContextMenu: {
                    ColumnId: state.ContextMenu.ColumnId,
                    Items: [].concat(state.ContextMenu.Items, actionTyped.Item).sort((a, b) => (a.Label < b.Label) ? -1
                        : (a.Label > b.Label) ? 1 : 0)
                }
            });
        }
        default:
            return state;
    }
};
