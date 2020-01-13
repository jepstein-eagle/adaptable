import * as Redux from 'redux';
import {
  UserInterfaceState,
  RowStyle,
  UserMenuItem,
  PermittedValuesColumn,
} from '../../PredefinedConfig/UserInterfaceState';
import { UIHelper } from '../../View/UIHelper';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const COLOR_PALETTE_SET = 'COLOR_PALETTE_SET';
export const COLOR_PALETTE_ADD = 'COLOR_PALETTE_ADD';
export const STYLE_CLASSNAMES_ADD = 'STYLE_CLASSNAMES_ADD';
export const PERMITTED_VALUES_COLUMN_SET = 'PERMITTED_VALUES_COLUMN_SET';
export const PERMITTED_VALUES_COLUMN_DELETE = 'PERMITTED_VALUES_COLUMN_DELETE';
export const ROW_STYLES_CLEAR = 'ROW_STYLES_CLEAR';
export const ROW_STYLES_SET = 'ROW_STYLES_SET';
export const CONTEXT_MENU_ITEM_ADD = 'CONTEXT_MENU_ITEM_ADD';

export interface ColorPaletteSetAction extends Redux.Action {
  ColorPalette: string[];
}

export interface ColorPaletteAddAction extends Redux.Action {
  ColorPalette: string[];
}

export interface StyleClassNameAddAction extends Redux.Action {
  StyleClassNames: string[];
}

export interface PermittedValuesColumnSetAction extends Redux.Action {
  PermittedValuesColumn: PermittedValuesColumn;
}

export interface PermittedValuesColumnDeleteAction extends Redux.Action {
  Column: string;
}

export interface RowStylesClearAction extends Redux.Action {}

export interface RowStylesSetAction extends Redux.Action {
  rowStyles: RowStyle[];
}

export interface ContextMenuItemAddAction extends Redux.Action {
  contextMenuItem: UserMenuItem;
}

export const ColorPaletteSet = (ColorPalette: string[]): ColorPaletteSetAction => ({
  type: COLOR_PALETTE_SET,
  ColorPalette,
});

export const ColorPaletteAdd = (ColorPalette: string[]): ColorPaletteAddAction => ({
  type: COLOR_PALETTE_ADD,
  ColorPalette,
});

export const StyleClassNamesAdd = (StyleClassNames: string[]): StyleClassNameAddAction => ({
  type: STYLE_CLASSNAMES_ADD,
  StyleClassNames,
});

export const PermittedValuesColumnSet = (
  PermittedValuesColumn: PermittedValuesColumn
): PermittedValuesColumnSetAction => ({
  type: PERMITTED_VALUES_COLUMN_SET,
  PermittedValuesColumn,
});

export const PermittedValuesColumnDelete = (Column: string): PermittedValuesColumnDeleteAction => ({
  type: PERMITTED_VALUES_COLUMN_DELETE,
  Column,
});

export const RowStylesClear = (): RowStylesClearAction => ({
  type: ROW_STYLES_CLEAR,
});

export const RowStylesSet = (rowStyles: RowStyle[]): RowStylesSetAction => ({
  type: ROW_STYLES_SET,
  rowStyles,
});

export const ContextMenuItemAdd = (contextMenuItem: UserMenuItem): ContextMenuItemAddAction => ({
  type: CONTEXT_MENU_ITEM_ADD,
  contextMenuItem,
});

const initialUserInterfaceState: UserInterfaceState = {
  ColorPalette: UIHelper.getDefaultColors(),
  StyleClassNames: EMPTY_ARRAY,
  PermittedValuesColumns: EMPTY_ARRAY,
  EditLookUpColumns: EMPTY_ARRAY,
  RowStyles: EMPTY_ARRAY,
  ColumnMenuItems: EMPTY_ARRAY,
  ContextMenuItems: EMPTY_ARRAY,
};

export const UserInterfaceStateReducer: Redux.Reducer<UserInterfaceState> = (
  state: UserInterfaceState = initialUserInterfaceState,
  action: Redux.Action
): UserInterfaceState => {
  let permittedValuesColumns: PermittedValuesColumn[];
  switch (action.type) {
    case COLOR_PALETTE_SET:
      return Object.assign({}, state, {
        ColorPalette: (action as ColorPaletteSetAction).ColorPalette,
      });
    case COLOR_PALETTE_ADD:
      const actionTypedAddColors = action as ColorPaletteAddAction;
      let existingColors = [].concat(state.ColorPalette);
      actionTypedAddColors.ColorPalette.forEach(cp => {
        existingColors.push(cp);
      });
      return Object.assign({}, state, { ColorPalette: existingColors });
    case STYLE_CLASSNAMES_ADD:
      const actionTypedAddStyles = action as StyleClassNameAddAction;
      let existingStyleNames = [].concat(state.StyleClassNames);
      actionTypedAddStyles.StyleClassNames.forEach(sc => {
        existingStyleNames.push(sc);
      });
      return Object.assign({}, state, { StyleClassNames: existingStyleNames });
    case PERMITTED_VALUES_COLUMN_SET:
      const actionTypedSetColumnValues = action as PermittedValuesColumnSetAction;
      permittedValuesColumns = [].concat(state.PermittedValuesColumns);
      let existingPermittedColumnValues: PermittedValuesColumn = permittedValuesColumns.find(
        pcv => pcv.ColumnId == actionTypedSetColumnValues.PermittedValuesColumn.ColumnId
      );
      if (existingPermittedColumnValues) {
        existingPermittedColumnValues.PermittedValues =
          actionTypedSetColumnValues.PermittedValuesColumn.PermittedValues;
      } else {
        permittedValuesColumns.push(actionTypedSetColumnValues.PermittedValuesColumn);
      }
      return Object.assign({}, state, {
        PermittedValuesColumns: permittedValuesColumns,
      });
    case PERMITTED_VALUES_COLUMN_DELETE:
      const actionTypedDeleteColumnValues = action as PermittedValuesColumnDeleteAction;
      permittedValuesColumns = [].concat(state.PermittedValuesColumns);
      let index: number = permittedValuesColumns.findIndex(
        pcv => pcv.ColumnId == actionTypedDeleteColumnValues.Column
      );
      permittedValuesColumns.splice(index, 1);
      return Object.assign({}, state, {
        PermittedValuesColumns: permittedValuesColumns,
      });
    case ROW_STYLES_CLEAR:
      return Object.assign({}, state, {
        RowStyles: EMPTY_ARRAY,
      });
    case ROW_STYLES_SET:
      return Object.assign({}, state, {
        RowStyles: (action as RowStylesSetAction).rowStyles,
      });

    case CONTEXT_MENU_ITEM_ADD:
      const contextMenuItemAdd = action as ContextMenuItemAddAction;
      let contextMenuItems = [].concat(state.ContextMenuItems);
      contextMenuItems.push(contextMenuItemAdd.contextMenuItem);
      return Object.assign({}, state, { ContextMenuItems: contextMenuItems });

    default:
      return state;
  }
};
