import * as Redux from 'redux';
import {
  UserInterfaceState,
  PermittedColumnValues,
  RowStyle,
} from '../../PredefinedConfig/DesignTimeState/UserInterfaceState';
import { UIHelper } from '../../View/UIHelper';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const COLOR_PALETTE_SET = 'COLOR_PALETTE_SET';
export const COLOR_PALETTE_ADD = 'COLOR_PALETTE_ADD';
export const STYLE_CLASSNAMES_ADD = 'STYLE_CLASSNAMES_ADD';
export const PERMITTED_COLUMNVALUES_SET = 'PERMITTED_COLUMNVALUES_SET';
export const PERMITTED_COLUMNVALUES_DELETE = 'PERMITTED_COLUMNVALUES_DELETE';
export const ROW_STYLES_CLEAR = 'ROW_STYLES_CLEAR';
export const ROW_STYLES_SET = 'ROW_STYLES_SET';

export interface ColorPaletteSetAction extends Redux.Action {
  ColorPalette: string[];
}

export interface ColorPaletteAddAction extends Redux.Action {
  ColorPalette: string[];
}

export interface StyleClassNameAddAction extends Redux.Action {
  StyleClassNames: string[];
}

export interface PermittedColumnValuesSetAction extends Redux.Action {
  PermittedColumnValues: PermittedColumnValues;
}

export interface PermittedColumnValuesDeleteAction extends Redux.Action {
  Column: string;
}

export interface RowStylesClearAction extends Redux.Action {}

export interface RowStylesSetAction extends Redux.Action {
  rowStyles: RowStyle[];
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

export const PermittedColumnValuesSet = (
  PermittedColumnValues: PermittedColumnValues
): PermittedColumnValuesSetAction => ({
  type: PERMITTED_COLUMNVALUES_SET,
  PermittedColumnValues,
});

export const PermittedColumnValuesDelete = (Column: string): PermittedColumnValuesDeleteAction => ({
  type: PERMITTED_COLUMNVALUES_DELETE,
  Column,
});

export const RowStylesClear = (): RowStylesClearAction => ({
  type: ROW_STYLES_CLEAR,
});

export const RowStylesSet = (rowStyles: RowStyle[]): RowStylesSetAction => ({
  type: ROW_STYLES_SET,
  rowStyles,
});

//export const PermittedColumnValuesAdd = (ColumnValues: string[]): PermittedColumnValuesAddAction => ({
//    type: PERMITTED_COLUMNVALUES_ADD,
//    ColumnValues
//})

const initialUserInterfaceState: UserInterfaceState = {
  ColorPalette: UIHelper.getDefaultColors(),
  StyleClassNames: EMPTY_ARRAY,
  PermittedColumnValues: EMPTY_ARRAY,
  EditLookUpColumns: EMPTY_ARRAY,
  RowStyles: EMPTY_ARRAY,
};

export const UserInterfaceStateReducer: Redux.Reducer<UserInterfaceState> = (
  state: UserInterfaceState = initialUserInterfaceState,
  action: Redux.Action
): UserInterfaceState => {
  let permittedColumnValues: PermittedColumnValues[];
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
    case PERMITTED_COLUMNVALUES_SET:
      const actionTypedSetColumnValues = action as PermittedColumnValuesSetAction;
      permittedColumnValues = [].concat(state.PermittedColumnValues);
      let existingPermittedColumnValues: PermittedColumnValues = permittedColumnValues.find(
        pcv => pcv.ColumnId == actionTypedSetColumnValues.PermittedColumnValues.ColumnId
      );
      if (existingPermittedColumnValues) {
        existingPermittedColumnValues.PermittedValues =
          actionTypedSetColumnValues.PermittedColumnValues.PermittedValues;
      } else {
        permittedColumnValues.push(actionTypedSetColumnValues.PermittedColumnValues);
      }
      return Object.assign({}, state, {
        PermittedColumnValues: permittedColumnValues,
      });
    case PERMITTED_COLUMNVALUES_DELETE:
      const actionTypedDeleteColumnValues = action as PermittedColumnValuesDeleteAction;
      permittedColumnValues = [].concat(state.PermittedColumnValues);
      let index: number = permittedColumnValues.findIndex(
        pcv => pcv.ColumnId == actionTypedDeleteColumnValues.Column
      );
      permittedColumnValues.splice(index, 1);
      return Object.assign({}, state, {
        PermittedColumnValues: permittedColumnValues,
      });
    case ROW_STYLES_CLEAR:
      return Object.assign({}, state, {
        RowStyles: EMPTY_ARRAY,
      });
    case ROW_STYLES_SET:
      return Object.assign({}, state, {
        RowStyles: (action as RowStylesSetAction).rowStyles,
      });
    default:
      return state;
  }
};
