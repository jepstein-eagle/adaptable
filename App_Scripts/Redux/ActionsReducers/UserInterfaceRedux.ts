import * as Redux from 'redux';
import { UserInterfaceState } from './Interface/IState'
import { IPermittedColumnValues } from '../../Core/Interface/Interfaces';


export const COLOR_PALETTE_SET = 'COLOR_PALETTE_SET';
export const COLOR_PALETTE_ADD = 'COLOR_PALETTE_ADD';
export const STYLE_CLASSNAMES_ADD = 'STYLE_CLASSNAMES_ADD';
export const PERMITTED_COLUMNVALUES_ADD = 'PERMITTED_COLUMNVALUES_ADD';

export interface ColorPaletteSetAction extends Redux.Action {
    ColorPalette: string[]
}

export interface ColorPaletteAddAction extends Redux.Action {
    ColorPalette: string[]
}

export interface StyleClassNameAddAction extends Redux.Action {
    StyleClassNames: string[]
}

export interface PermittedColumnValuesAddAction extends Redux.Action {
    PermittedColumnValues: IPermittedColumnValues
}

export const ColorPaletteSet = (ColorPalette: string[]): ColorPaletteSetAction => ({
    type: COLOR_PALETTE_SET,
    ColorPalette
})

export const ColorPaletteAdd = (ColorPalette: string[]): ColorPaletteAddAction => ({
    type: COLOR_PALETTE_ADD,
    ColorPalette
})

export const StyleClassNamesAdd = (StyleClassNames: string[]): StyleClassNameAddAction => ({
    type: STYLE_CLASSNAMES_ADD,
    StyleClassNames
})

export const PermittedColumnValuesAdd = (PermittedColumnValues: IPermittedColumnValues): PermittedColumnValuesAddAction => ({
    type: PERMITTED_COLUMNVALUES_ADD,
    PermittedColumnValues
})

const initialUserInterfaceState: UserInterfaceState = {
    ColorPalette: [
        "#000000", //  {/* black */}
        "#ffffff", //  {/* white */}
        "#C0C0C0", //  {/* light gray */}
        "#808080", //  {/* dark gray */}
        "#800000", //  {/* brown */}

        "#808000", //  {/* olive */}
        "#008000", //  {/* dark green */}
        "#00FF00", //  {/* light green */}
        "#FFFF00", //  {/* yellow */}
        "#FFFFCC", //  {/* pale yellow (quick search default) */}

        "#000080", //  {/* dark blue */}
        "#0000FF", //  {/* blue */}
        "#008080", //  {/* cyan */}
        "#00FFFF", //  {/* light blue */}
        "#FF00FF", //  {/* pink */}

        "#800080", //  {/* purple */}
        "#8B0000", //  {/* dark red */}
        "#FF0000", //  {/* red */}
        "#FF6961", //  {/* pastel red */}
        "#FFA500", //  {/* orange */}
    ],
    StyleClassNames: [],
    PermittedColumnValues: []

}

export const UserInterfaceStateReducer: Redux.Reducer<UserInterfaceState> = (state: UserInterfaceState = initialUserInterfaceState, action: Redux.Action): UserInterfaceState => {
    switch (action.type) {
        case COLOR_PALETTE_SET:
            return Object.assign({}, state, { ColorPalette: (<ColorPaletteSetAction>action).ColorPalette })
        case COLOR_PALETTE_ADD:
            let actionTypedAddColors = (<ColorPaletteAddAction>action)
            let existingColors = [].concat(state.ColorPalette);
            actionTypedAddColors.ColorPalette.forEach(cp => {
                existingColors.push(cp)
            })
            return Object.assign({}, state, { ColorPalette: existingColors })
        case STYLE_CLASSNAMES_ADD:
            let actionTypedAddStyles = (<StyleClassNameAddAction>action)
            let existingStyleNames = [].concat(state.StyleClassNames);
            actionTypedAddStyles.StyleClassNames.forEach(sc => {
                existingStyleNames.push(sc)
            })
            return Object.assign({}, state, { StyleClassNames: existingStyleNames })
        case PERMITTED_COLUMNVALUES_ADD:
            let actionTypedAddColumnValues = (<PermittedColumnValuesAddAction>action)
            let permittedColumnValues = [].concat(state.PermittedColumnValues)
            permittedColumnValues.push(actionTypedAddColumnValues.PermittedColumnValues);
            return Object.assign({}, state, {
                PermittedColumnValues: permittedColumnValues
            });
        default:
            return state
    }
}