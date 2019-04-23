"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutRedux = require("../Redux/ActionsReducers/LayoutRedux");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ApiBase_1 = require("./ApiBase");
const GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
class LayoutApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().Layout;
    }
    Set(layoutName) {
        let layout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
        }
    }
    Clear() {
        this.dispatchAction(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
    }
    GetCurrent() {
        let layoutName = this.getBlotterState().Layout.CurrentLayout;
        return this.GetByName(layoutName);
    }
    GetCurrentName() {
        return this.getBlotterState().Layout.CurrentLayout;
    }
    GetByName(layoutName) {
        let layout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            return layout;
        }
    }
    GetAll() {
        return this.getBlotterState().Layout.Layouts;
    }
    Save() {
        let currentLayoutName = this.getBlotterState().Layout.CurrentLayout;
        if (currentLayoutName != GeneralConstants_1.DEFAULT_LAYOUT) {
            let currentLayoutObject = this.getBlotterState().Layout.Layouts.find(l => l.Name == currentLayoutName);
            let currentLayoutIndex = this.getBlotterState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName);
            if (currentLayoutIndex != -1) {
                let gridState = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null;
                let visibleColumns = this.getBlotterState().Grid.Columns.filter(c => c.Visible);
                let gridSorts = this.getBlotterState().Grid.GridSorts;
                let layoutToSave = ObjectFactory_1.ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName);
                this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave));
            }
        }
    }
}
exports.LayoutApi = LayoutApi;
