"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const Enums_1 = require("../Utilities/Enums");
const _ = require("lodash");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const ChartEnums_1 = require("../Utilities/ChartEnums");
const ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
class ChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ChartStrategyId, blotter);
        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
        let refreshRate = blotter.AdaptableBlotterStore.TheStore.getState().Chart.RefreshRate * 1000;
        this.throttleSetChartData = _.throttle(this.setChartData, refreshRate);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }
    InitState() {
        let isChartRelatedStateChanged = false;
        if (this.ChartState != this.GetChartState()) {
            if (this.ChartState == null) {
                isChartRelatedStateChanged = true;
            }
            else {
                let chartStateDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition);
                let storeStateDefinition = this.GetChartState().ChartDefinitions.find(c => c.Title == this.GetChartState().CurrentChartDefinition);
                if (this.doChartDefinitionChangesRequireDataUpdate(chartStateDefinition, storeStateDefinition)) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.ChartState = this.GetChartState();
        }
        if (this.SystemState != this.GetSystemState()) {
            if (this.SystemState == null) {
                isChartRelatedStateChanged = true; // correct? seems not but not urgent to fix
            }
            else {
                if (this.SystemState.ChartVisibility != this.GetSystemState().ChartVisibility) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.SystemState = this.blotter.AdaptableBlotterStore.TheStore.getState().System;
        }
        if (isChartRelatedStateChanged) {
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartDefinition)
                && this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                this.setChartData();
            }
            else {
                this.clearChartData();
            }
            if (this.ChartState.CurrentChartDefinition == null && this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Chart, this.ChartState);
            }
        }
    }
    doChartDefinitionChangesRequireDataUpdate(cd1, cd2) {
        // slightly nonsensical for now but iwll change as more charts are added I think...
        let a = cd1;
        let b = cd2;
        if (a == null && b !== null) {
            return true;
        }
        if (b == null && a !== null) {
            return true;
        }
        if (a.XAxisColumnId != b.XAxisColumnId) {
            return true;
        }
        if (ArrayExtensions_1.ArrayExtensions.areArraysNotEqual(a.YAxisColumnIds, b.YAxisColumnIds)) {
            return true;
        }
        if (a.YAxisTotal != b.YAxisTotal) {
            return true;
        }
        if (ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(a.XAxisExpression, this.GetColumnState()) != ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(b.XAxisExpression, this.GetColumnState())) {
            return true;
        }
        return false;
    }
    handleDataSourceChanged(dataChangedInfo) {
        if (this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartDefinition)) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId = dataChangedInfo.ColumnId;
            let currentChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition);
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(currentChartDefinition.YAxisColumnIds, columnChangedId) ||
                currentChartDefinition.XAxisColumnId == columnChangedId) {
                this.throttleSetChartData();
            }
        }
    }
    setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition);
        if (chartDefinition) {
            let chartData = this.blotter.ChartService.BuildCategoryChartData(chartDefinition, columns);
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(chartData));
        }
    }
    clearChartData() {
        if (this.GetSystemState().ChartData != null) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(null));
        }
    }
    GetSystemState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().System;
    }
    GetChartState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;
    }
    GetColumnState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
    }
}
exports.ChartStrategy = ChartStrategy;
