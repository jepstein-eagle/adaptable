import * as Redux from 'redux';
import { MenuState } from '../../PredefinedConfig/InternalState/MenuState';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterMenuItem } from '../../Utilities/Interface/AdaptableBlotterMenu';

export const SET_MAIN_MENUITEMS = 'SET_MAIN_MENUITEMS';
export const BUILD_COLUMN_MENU = 'BUILD_COLUMN_MENU';
export const ADD_ITEM_COLUMN_MENU = 'ADD_ITEM_COLUMN_MENU';
export const CLEAR_COLUMN_MENU = 'CLEAR_COLUMN_MENU';

export interface SetMainMenuItemsAction extends Redux.Action {
  MenuItems: AdaptableBlotterMenuItem[];
}

export interface BuildColumnMenuAction extends Redux.Action {
  ColumnId: string;
}

export interface AddItemColumnMenuAction extends Redux.Action {
  Item: AdaptableBlotterMenuItem;
}

export interface ClearColumnMenuAction extends Redux.Action {}

//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
export const SetMainMenuItems = (
  MenuItems: AdaptableBlotterMenuItem[]
): SetMainMenuItemsAction => ({
  type: SET_MAIN_MENUITEMS,
  MenuItems,
});

export const BuildColumnMenu = (ColumnId: string): BuildColumnMenuAction => ({
  type: BUILD_COLUMN_MENU,
  ColumnId,
});

export const AddItemColumntMenu = (Item: AdaptableBlotterMenuItem): AddItemColumnMenuAction => ({
  type: ADD_ITEM_COLUMN_MENU,
  Item,
});

export const ClearColumntMenu = (): ClearColumnMenuAction => ({
  type: CLEAR_COLUMN_MENU,
});

const initialMenuState: MenuState = {
  MainMenuItems: EMPTY_ARRAY,
  ColumnMenu: {
    ColumnId: null,
    MenuItems: EMPTY_ARRAY,
  },
};

export const MenuReducer: Redux.Reducer<MenuState> = (
  state: MenuState = initialMenuState,
  action: Redux.Action
): MenuState => {
  switch (action.type) {
    case SET_MAIN_MENUITEMS: {
      //TODO: we need to merge with the existing set of menuitems instead of replacing it.
      //it will be important we we ever allow show/hide on menus
      let actionTyped = <SetMainMenuItemsAction>action;
      let menuItems = actionTyped.MenuItems.sort(
        (a: AdaptableBlotterMenuItem, b: AdaptableBlotterMenuItem) =>
          a.Label < b.Label ? -1 : a.Label > b.Label ? 1 : 0
      );

      return Object.assign({}, state, { MainMenuItems: menuItems });
    }
    case BUILD_COLUMN_MENU: {
      let actionTyped = <BuildColumnMenuAction>action;
      return Object.assign({}, state, {
        ColumnMenu: {
          ColumnId: actionTyped.ColumnId,
          MenuItems: [],
        },
      });
    }
    case CLEAR_COLUMN_MENU: {
      return Object.assign({}, state, {
        ColumnMenu: {
          ColumnId: '',
          MenuItems: [],
        },
      });
    }
    case ADD_ITEM_COLUMN_MENU: {
      let actionTyped = <AddItemColumnMenuAction>action;
      return Object.assign({}, state, {
        ColumnMenu: {
          ColumnId: state.ColumnMenu.ColumnId,
          MenuItems: []
            .concat(state.ColumnMenu.MenuItems, actionTyped.Item)
            .sort((a: AdaptableBlotterMenuItem, b: AdaptableBlotterMenuItem) =>
              a.Label < b.Label ? -1 : a.Label > b.Label ? 1 : 0
            ),
        },
      });
    }
    default:
      return state;
  }
};
