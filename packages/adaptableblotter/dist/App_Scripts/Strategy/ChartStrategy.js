"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const Enums_1 = require("../Utilities/Enums");
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
        let displayChartAtStartUp = false;
        if (this.ChartState != this.GetChartState()) {
            if (this.ChartState == null) {
                isChartRelatedStateChanged = true;
                // if user has set display at startup to be true and there is a current chart then show it
                if (this.blotter.BlotterOptions.chartOptions.displayOnStartUp && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.GetChartState().CurrentChartName)) {
                    displayChartAtStartUp = true;
                }
            }
            else {
                let chartStateDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
                let storeStateDefinition = this.GetChartState().ChartDefinitions.find(c => c.Name == this.GetChartState().CurrentChartName);
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
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName)
                && this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                this.setChartData();
            }
            else {
                this.clearChartData();
            }
            if (this.ChartState.CurrentChartName == null && this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Chart, this.ChartState);
            }
            if (displayChartAtStartUp) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised));
                this.setChartData();
            }
        }
    }
    doChartDefinitionChangesRequireDataUpdate(cd1, cd2) {
        if (cd1 == null && cd2 !== null) {
            return true;
        }
        if (cd2 == null && cd1 !== null) {
            return true;
        }
        if (cd1 == null && cd2 == null) {
            return false;
        }
        if (cd1.ChartType == ChartEnums_1.ChartType.CategoryChart) {
            return this.doCategoryChartDefinitionChangesRequireDataUpdate(cd1, cd2);
        }
        if (cd1.ChartType == ChartEnums_1.ChartType.PieChart) {
            return this.doPieChartDefinitionChangesRequireDataUpdate(cd1, cd2);
        }
    }
    doCategoryChartDefinitionChangesRequireDataUpdate(cd1, cd2) {
        if (cd1.XAxisColumnId != cd2.XAxisColumnId) {
            return true;
        }
        if (ArrayExtensions_1.ArrayExtensions.areArraysNotEqual(cd1.YAxisColumnIds, cd2.YAxisColumnIds)) {
            return true;
        }
        if (cd1.YAxisTotal != cd2.YAxisTotal) {
            return true;
        }
        if (ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cd1.XAxisExpression, this.GetColumnState()) != ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cd2.XAxisExpression, this.GetColumnState())) {
            return true;
        }
        return false;
    }
    doPieChartDefinitionChangesRequireDataUpdate(cd1, cd2) {
        if (cd1.PrimaryColumnId != cd2.PrimaryColumnId) {
            return true;
        }
        if (cd1.SecondaryColumnId != cd2.SecondaryColumnId) {
            return true;
        }
        if (cd1.SecondaryColumnOperation != cd2.SecondaryColumnOperation) {
            return true;
        }
        if (cd1.VisibleRowsOnly != cd2.VisibleRowsOnly) {
            return true;
        }
        return false;
    }
    handleDataSourceChanged(dataChangedInfo) {
        if (this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName)) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId = dataChangedInfo.ColumnId;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(columnChangedId)) {
                let currentChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
                switch (currentChartDefinition.ChartType) {
                    case ChartEnums_1.ChartType.CategoryChart:
                        let categoryChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
                        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(categoryChartDefinition.YAxisColumnIds, columnChangedId) || categoryChartDefinition.XAxisColumnId == columnChangedId) {
                            this.throttleSetChartData();
                        }
                        break;
                    case ChartEnums_1.ChartType.PieChart:
                        let pieChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
                        if (pieChartDefinition.PrimaryColumnId == columnChangedId || pieChartDefinition.SecondaryColumnId == columnChangedId) {
                            this.throttleSetChartData();
                        }
                        break;
                }
            }
        }
    }
    setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
        if (chartDefinition) {
            let chartData;
            if (chartDefinition.ChartType == ChartEnums_1.ChartType.CategoryChart) {
                chartData = this.blotter.ChartService.BuildCategoryChartData(chartDefinition, columns);
            }
            else if (chartDefinition.ChartType == ChartEnums_1.ChartType.PieChart) {
                chartData = this.blotter.ChartService.BuildPieChartData(chartDefinition);
            }
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
