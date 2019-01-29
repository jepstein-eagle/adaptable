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
class ChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ChartStrategyId, blotter);
        this.debouncedSetChartData = _.debounce(() => this.setChartData(), this.getRefreshrate());
        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }
    InitState() {
        let isChartRelatedStateChanged = false;
        if (this.ChartState != this.GetChartState()) {
            this.ChartState = this.GetChartState();
            isChartRelatedStateChanged = true;
        }
        if (this.SystemState != this.GetSystemState()) {
            if (this.SystemState == null) {
                isChartRelatedStateChanged = true; // correct?
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
    handleDataSourceChanged(dataChangedInfo) {
        //     console.log(dataChangedInfo.ColumnId)
        if (this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartDefinition)) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId = dataChangedInfo.ColumnId;
            let currentChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition);
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(currentChartDefinition.YAxisColumnIds, columnChangedId) ||
                currentChartDefinition.XAxisColumnId == columnChangedId ||
                currentChartDefinition.AdditionalColumnId == columnChangedId) {
                this.debouncedSetChartData();
            }
        }
    }
    getRefreshrate() {
        return (this.ChartState == null) ? 1000 : this.ChartState.RefreshRate * 1000;
    }
    setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let currentChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition);
        if (currentChartDefinition) {
            let chartData = this.blotter.ChartService.BuildChartData(currentChartDefinition, columns);
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
}
exports.ChartStrategy = ChartStrategy;
