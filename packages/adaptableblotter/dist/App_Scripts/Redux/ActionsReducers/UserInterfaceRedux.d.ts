import * as Redux from 'redux';
import { UserInterfaceState } from './Interface/IState';
import { IPermittedColumnValues } from '../../Api/Interface/Interfaces';
export declare const COLOR_PALETTE_SET = "COLOR_PALETTE_SET";
export declare const COLOR_PALETTE_ADD = "COLOR_PALETTE_ADD";
export declare const STYLE_CLASSNAMES_ADD = "STYLE_CLASSNAMES_ADD";
export declare const PERMITTED_COLUMNVALUES_SET = "PERMITTED_COLUMNVALUES_SET";
export declare const PERMITTED_COLUMNVALUES_DELETE = "PERMITTED_COLUMNVALUES_DELETE";
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
    PermittedColumnValues: IPermittedColumnValues;
}
export interface PermittedColumnValuesDeleteAction extends Redux.Action {
    Column: string;
}
export declare const ColorPaletteSet: (ColorPalette: string[]) => ColorPaletteSetAction;
export declare const ColorPaletteAdd: (ColorPalette: string[]) => ColorPaletteAddAction;
export declare const StyleClassNamesAdd: (StyleClassNames: string[]) => StyleClassNameAddAction;
export declare const PermittedColumnValuesSet: (PermittedColumnValues: IPermittedColumnValues) => PermittedColumnValuesSetAction;
export declare const PermittedColumnValuesDelete: (Column: string) => PermittedColumnValuesDeleteAction;
export declare const UserInterfaceStateReducer: Redux.Reducer<UserInterfaceState>;
