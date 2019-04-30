"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterfaceRedux = require("../Redux/ActionsReducers/UserInterfaceRedux");
const ApiBase_1 = require("./ApiBase");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
class UserInterfaceApi extends ApiBase_1.ApiBase {
    getUserInterfaceState() {
        return this.getBlotterState().UserInterface;
    }
    setColorPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette));
    }
    addColorsToPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette));
    }
    addStyleClassNames(styleClassNames) {
        this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames));
    }
    getAllPermittedValues() {
        return this.getBlotterState().UserInterface.PermittedColumnValues;
    }
    getPermittedValuesForColumn(columnId) {
        let permittedValues = this.getAllPermittedValues();
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(permittedValues)) {
            return permittedValues.find(pc => pc.ColumnId == columnId);
        }
        return undefined;
    }
    setColumnPermittedValues(column, permittedValues) {
        let permittedColumnValues = { ColumnId: column, PermittedValues: permittedValues };
        this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues));
    }
    clearColumnPermittedValues(column) {
        this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column));
    }
}
exports.UserInterfaceApi = UserInterfaceApi;
