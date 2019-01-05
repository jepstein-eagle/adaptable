"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const ChartRedux = require("../Redux/ActionsReducers/ChartRedux");
const Enums_1 = require("../Utilities/Enums");
const _ = require("lodash");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
class ChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ChartStrategyId, blotter);
        this.debouncedSetChartData = _.debounce(() => this.setChartData(), 500);
        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }
    InitState() {
        if (this.ChartState != this.blotter.AdaptableBlotterStore.TheStore.getState().Chart) {
            this.ChartState = this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;
            if (this.ChartState.CurrentChartDefinition != null && this.ChartState.IsChartVisible) {
                this.setChartData();
            }
            else {
                this.clearChartData();
            }
            if (this.ChartState.CurrentChartDefinition == null && this.ChartState.IsChartVisible) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartRedux.ChartHideChart());
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Chart, this.ChartState);
            }
        }
    }
    handleDataSourceChanged(dataChangedEvent) {
        if (this.ChartState.IsChartVisible && this.ChartState.CurrentChartDefinition != null) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId = dataChangedEvent.ColumnId;
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(this.ChartState.CurrentChartDefinition.YAxisColumnIds, columnChangedId) ||
                this.ChartState.CurrentChartDefinition.XAxisColumnId == columnChangedId ||
                this.ChartState.CurrentChartDefinition.AdditionalColumnId == columnChangedId) {
                this.debouncedSetChartData();
            }
        }
    }
    setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartData = this.blotter.ChartService.BuildChartData(this.GetChartState().CurrentChartDefinition, columns);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(chartData));
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
