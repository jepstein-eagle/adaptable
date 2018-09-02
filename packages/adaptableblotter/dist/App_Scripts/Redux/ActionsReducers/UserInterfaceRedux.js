"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR_PALETTE_SET = 'COLOR_PALETTE_SET';
exports.COLOR_PALETTE_ADD = 'COLOR_PALETTE_ADD';
exports.STYLE_CLASSNAMES_ADD = 'STYLE_CLASSNAMES_ADD';
//export const PERMITTED_COLUMNVALUES_ADD = 'PERMITTED_COLUMNVALUES_ADD';
exports.PERMITTED_COLUMNVALUES_SET = 'PERMITTED_COLUMNVALUES_SET';
exports.PERMITTED_COLUMNVALUES_DELETE = 'PERMITTED_COLUMNVALUES_DELETE';
exports.ColorPaletteSet = (ColorPalette) => ({
    type: exports.COLOR_PALETTE_SET,
    ColorPalette
});
exports.ColorPaletteAdd = (ColorPalette) => ({
    type: exports.COLOR_PALETTE_ADD,
    ColorPalette
});
exports.StyleClassNamesAdd = (StyleClassNames) => ({
    type: exports.STYLE_CLASSNAMES_ADD,
    StyleClassNames
});
exports.PermittedColumnValuesSet = (PermittedColumnValues) => ({
    type: exports.PERMITTED_COLUMNVALUES_SET,
    PermittedColumnValues
});
exports.PermittedColumnValuesDelete = (Column) => ({
    type: exports.PERMITTED_COLUMNVALUES_DELETE,
    Column
});
//export const PermittedColumnValuesAdd = (ColumnValues: string[]): PermittedColumnValuesAddAction => ({
//    type: PERMITTED_COLUMNVALUES_ADD,
//    ColumnValues
//})
const initialUserInterfaceState = {
    ColorPalette: [
        "#000000",
        "#ffffff",
        "#C0C0C0",
        "#808080",
        "#800000",
        "#808000",
        "#008000",
        "#00FF00",
        "#FFFF00",
        "#FFFFCC",
        "#000080",
        "#0000FF",
        "#008080",
        "#00FFFF",
        "#FF00FF",
        "#800080",
        "#8B0000",
        "#FF0000",
        "#FF6961",
        "#FFA500",
    ],
    StyleClassNames: [],
    PermittedColumnValues: []
};
exports.UserInterfaceStateReducer = (state = initialUserInterfaceState, action) => {
    let permittedColumnValues;
    switch (action.type) {
        case exports.COLOR_PALETTE_SET:
            return Object.assign({}, state, { ColorPalette: action.ColorPalette });
        case exports.COLOR_PALETTE_ADD:
            let actionTypedAddColors = action;
            let existingColors = [].concat(state.ColorPalette);
            actionTypedAddColors.ColorPalette.forEach(cp => {
                existingColors.push(cp);
            });
            return Object.assign({}, state, { ColorPalette: existingColors });
        case exports.STYLE_CLASSNAMES_ADD:
            let actionTypedAddStyles = action;
            let existingStyleNames = [].concat(state.StyleClassNames);
            actionTypedAddStyles.StyleClassNames.forEach(sc => {
                existingStyleNames.push(sc);
            });
            return Object.assign({}, state, { StyleClassNames: existingStyleNames });
        case exports.PERMITTED_COLUMNVALUES_SET:
            let actionTypedSetColumnValues = action;
            permittedColumnValues = [].concat(state.PermittedColumnValues);
            let existingPermittedColumnValues = permittedColumnValues.find(pcv => pcv.ColumnId == actionTypedSetColumnValues.PermittedColumnValues.ColumnId);
            if (existingPermittedColumnValues) {
                existingPermittedColumnValues.PermittedValues = actionTypedSetColumnValues.PermittedColumnValues.PermittedValues;
            }
            else {
                permittedColumnValues.push(actionTypedSetColumnValues.PermittedColumnValues);
            }
            return Object.assign({}, state, {
                PermittedColumnValues: permittedColumnValues
            });
        case exports.PERMITTED_COLUMNVALUES_DELETE:
            let actionTypedDeleteColumnValues = action;
            permittedColumnValues = [].concat(state.PermittedColumnValues);
            let index = permittedColumnValues.findIndex(pcv => pcv.ColumnId == actionTypedDeleteColumnValues.Column);
            permittedColumnValues.splice(index, 1);
            return Object.assign({}, state, {
                PermittedColumnValues: permittedColumnValues
            });
        default:
            return state;
    }
};
