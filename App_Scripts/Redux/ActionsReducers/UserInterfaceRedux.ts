import * as Redux from 'redux';
import { UserInterfaceState } from './Interface/IState'
import { IPermittedColumnValues } from '../../Core/Interface/Interfaces';


export const COLOR_PALETTE_SET = 'COLOR_PALETTE_SET';
export const COLOR_PALETTE_ADD = 'COLOR_PALETTE_ADD';
export const STYLE_CLASSNAMES_ADD = 'STYLE_CLASSNAMES_ADD';
//export const PERMITTED_COLUMNVALUES_ADD = 'PERMITTED_COLUMNVALUES_ADD';
export const PERMITTED_COLUMNVALUES_SET = 'PERMITTED_COLUMNVALUES_SET';
export const PERMITTED_COLUMNVALUES_DELETE = 'PERMITTED_COLUMNVALUES_DELETE';

export interface ColorPaletteSetAction extends Redux.Action {
    ColorPalette: string[]
}

export interface ColorPaletteAddAction extends Redux.Action {
    ColorPalette: string[]
}

export interface StyleClassNameAddAction extends Redux.Action {
    StyleClassNames: string[]
}

export interface PermittedColumnValuesSetAction extends Redux.Action {
    PermittedColumnValues: IPermittedColumnValues
}

export interface PermittedColumnValuesDeleteAction extends Redux.Action {
   Column: string
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

export const PermittedColumnValuesSet = (PermittedColumnValues: IPermittedColumnValues): PermittedColumnValuesSetAction => ({
    type: PERMITTED_COLUMNVALUES_SET,
    PermittedColumnValues
})

export const PermittedColumnValuesDelete = (Column: string): PermittedColumnValuesDeleteAction => ({
    type: PERMITTED_COLUMNVALUES_DELETE,
    Column
})

//export const PermittedColumnValuesAdd = (ColumnValues: string[]): PermittedColumnValuesAddAction => ({
//    type: PERMITTED_COLUMNVALUES_ADD,
//    ColumnValues
//})

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
    let permittedColumnValues: IPermittedColumnValues[]
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
        case PERMITTED_COLUMNVALUES_SET:
            let actionTypedSetColumnValues = (<PermittedColumnValuesSetAction>action)
            permittedColumnValues = [].concat(state.PermittedColumnValues)
            let existingPermittedColumnValues: IPermittedColumnValues = permittedColumnValues.find(pcv => pcv.ColumnId == actionTypedSetColumnValues.PermittedColumnValues.ColumnId)
            if (existingPermittedColumnValues) {
                existingPermittedColumnValues.PermittedValues = actionTypedSetColumnValues.PermittedColumnValues.PermittedValues
            } else {
                permittedColumnValues.push(actionTypedSetColumnValues.PermittedColumnValues);
            }
            return Object.assign({}, state, {
                PermittedColumnValues: permittedColumnValues
            });
        case PERMITTED_COLUMNVALUES_DELETE:
            let actionTypedDeleteColumnValues = (<PermittedColumnValuesDeleteAction>action)
            permittedColumnValues = [].concat(state.PermittedColumnValues)
            let index: number = permittedColumnValues.findIndex(pcv => pcv.ColumnId == actionTypedDeleteColumnValues.Column)
            permittedColumnValues.splice(index, 1);
            return Object.assign({}, state, {
                PermittedColumnValues: permittedColumnValues
            });
        default:
            return state
    }
}