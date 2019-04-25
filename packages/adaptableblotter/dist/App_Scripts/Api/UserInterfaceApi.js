"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterfaceRedux = require("../Redux/ActionsReducers/UserInterfaceRedux");
const ApiBase_1 = require("./ApiBase");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
class UserInterfaceApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().UserInterface;
    }
    SetColorPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette));
    }
    AddColorsToPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette));
    }
    AddStyleClassNames(styleClassNames) {
        this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames));
    }
    GetAllPermittedValues() {
        return this.getBlotterState().UserInterface.PermittedColumnValues;
    }
    GetPermittedValuesForColumn(columnId) {
        let permittedValues = this.GetAllPermittedValues();
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(permittedValues)) {
            return permittedValues.find(pc => pc.ColumnId == columnId);
        }
        return undefined;
    }
    SetColumnPermittedValues(column, permittedValues) {
        let permittedColumnValues = { ColumnId: column, PermittedValues: permittedValues };
        this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues));
    }
    ClearColumnPermittedValues(column) {
        this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column));
    }
}
exports.UserInterfaceApi = UserInterfaceApi;
