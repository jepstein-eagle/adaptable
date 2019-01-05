"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterfaceRedux = require("../Redux/ActionsReducers/UserInterfaceRedux");
const ApiBase_1 = require("./ApiBase");
class UserInterfaceApi extends ApiBase_1.ApiBase {
    SetColorPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette));
    }
    AddColorsToPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette));
    }
    AddStyleClassNames(styleClassNames) {
        this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames));
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
