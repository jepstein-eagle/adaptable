"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutRedux = require("../Redux/ActionsReducers/LayoutRedux");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ApiBase_1 = require("./ApiBase");
const GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
class LayoutApi extends ApiBase_1.ApiBase {
    Set(layoutName) {
        let layout = this.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
        }
    }
    Clear() {
        this.dispatchAction(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
    }
    GetCurrent() {
        let layoutName = this.getState().Layout.CurrentLayout;
        return this.GetByName(layoutName);
    }
    GetCurrentName() {
        return this.getState().Layout.CurrentLayout;
    }
    GetByName(layoutName) {
        let layout = this.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            return layout;
        }
    }
    GetAll() {
        return this.getState().Layout.Layouts;
    }
    Save() {
        let currentLayoutName = this.getState().Layout.CurrentLayout;
        if (currentLayoutName != GeneralConstants_1.DEFAULT_LAYOUT) {
            let currentLayoutObject = this.getState().Layout.Layouts.find(l => l.Name == currentLayoutName);
            let currentLayoutIndex = this.getState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName);
            if (currentLayoutIndex != -1) {
                let gridState = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null;
                let visibleColumns = this.getState().Grid.Columns.filter(c => c.Visible);
                let gridSorts = this.getState().Grid.GridSorts;
                let layoutToSave = ObjectFactory_1.ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName);
                this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave));
            }
        }
    }
}
exports.LayoutApi = LayoutApi;
