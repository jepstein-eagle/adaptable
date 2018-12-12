"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ChartInternalRedux = require("../Redux/ActionsReducers/ChartInternalRedux");
const Enums_1 = require("../Utilities/Enums");
const _ = require("lodash");
class ChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ChartStrategyId, blotter);
        this.debouncedSetChartData = _.debounce(() => this.setChartData(), 500);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }
    InitState() {
        if (this.ChartState != this.blotter.AdaptableBlotterStore.TheStore.getState().Chart) {
            this.ChartState = this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Chart, this.ChartState);
            }
        }
        // need to ensure that we catch the current chart being changed...
        if (this.ChartInternalState != this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal) {
            if (this.ChartInternalState == null) { // first time so just set - no need to get data
                this.ChartInternalState = this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal;
            }
            else { // want to make sure we dont get into internal loop updating chart data...
                let isChartStateChanged = (this.ChartInternalState.ChartData != this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal.ChartData);
                this.ChartInternalState = this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal;
                if (!isChartStateChanged) {
                    if (this.ChartInternalState.CurrentChartDefinition != null && this.ChartInternalState.ChartVisible) {
                        this.setChartData();
                    }
                    else {
                        this.clearChartData();
                    }
                    if (this.ChartInternalState.CurrentChartDefinition == null && this.ChartInternalState.ChartVisible) {
                        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalHideChart());
                    }
                }
            }
        }
    }
    handleDataSourceChanged(dataChangedEvent) {
        if (this.ChartInternalState != null && this.ChartInternalState.ChartVisible && this.ChartInternalState.CurrentChartDefinition != null) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId = dataChangedEvent.ColumnId;
            if (this.ChartInternalState.CurrentChartDefinition.YAxisColumnId == columnChangedId ||
                this.ChartInternalState.CurrentChartDefinition.XAxisColumnId == columnChangedId ||
                this.ChartInternalState.CurrentChartDefinition.AdditionalColumnId == columnChangedId) {
                this.debouncedSetChartData();
            }
        }
    }
    setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartData = this.blotter.ChartService.BuildChartData(this.ChartInternalState.CurrentChartDefinition, columns);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalSetChartData(chartData));
    }
    clearChartData() {
        if (this.ChartInternalState.ChartData != null) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalSetChartData(null));
        }
    }
}
exports.ChartStrategy = ChartStrategy;
