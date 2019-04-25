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
        this.blotter.onSearchChanged().Subscribe(() => this.handleSearchChanged());
        this.blotter.SearchedChanged.Subscribe(() => this.handleSearchChanged());
        let refreshRate = blotter.adaptableBlotterStore.TheStore.getState().Chart.RefreshRate * 1000;
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
                if (this.blotter.blotterOptions.chartOptions.displayOnStartUp && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.GetChartState().CurrentChartName)) {
                    displayChartAtStartUp = true;
                }
            }
            else {
                let chartStateDefinition = this.GetCurrentChartDefinition();
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
            this.SystemState = this.blotter.adaptableBlotterStore.TheStore.getState().System;
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
                this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
            }
            if (this.blotter.IsInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Chart, this.ChartState);
            }
            if (displayChartAtStartUp) {
                this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised));
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
        if (cd1.VisibleRowsOnly != cd2.VisibleRowsOnly) {
            return true;
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
        return false;
    }
    handleSearchChanged() {
        // weÎ always redraw a chart if its visible when a search has been applied as its relatively rare...
        // might need to rethink if that is too OTT
        if (this.isCurrentChartVisibiilityMaximised()) {
            let currentChartDefinition = this.GetCurrentChartDefinition();
            if (currentChartDefinition != null && currentChartDefinition.VisibleRowsOnly) {
                this.throttleSetChartData();
            }
        }
    }
    handleDataSourceChanged(dataChangedInfo) {
        if (this.isCurrentChartVisibiilityMaximised()) {
            let columnChangedId = dataChangedInfo.ColumnId;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(columnChangedId)) {
                let currentChartDefinition = this.GetCurrentChartDefinition();
                if (this.isChartDataChanged(currentChartDefinition, columnChangedId)) {
                    this.throttleSetChartData();
                }
            }
        }
    }
    isCurrentChartVisibiilityMaximised() {
        return this.blotter.IsInitialised &&
            this.SystemState != null &&
            this.ChartState != null &&
            this.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName);
    }
    isChartDataChanged(currentChartDefinition, columnChangedId) {
        if (currentChartDefinition == null) {
            return false;
        }
        switch (currentChartDefinition.ChartType) {
            case ChartEnums_1.ChartType.CategoryChart:
                let categoryChartDefinition = currentChartDefinition;
                return (ArrayExtensions_1.ArrayExtensions.ContainsItem(categoryChartDefinition.YAxisColumnIds, columnChangedId) || categoryChartDefinition.XAxisColumnId == columnChangedId);
            case ChartEnums_1.ChartType.PieChart:
                let pieChartDefinition = currentChartDefinition;
                return (pieChartDefinition.PrimaryColumnId == columnChangedId || pieChartDefinition.SecondaryColumnId == columnChangedId);
        }
    }
    setChartData() {
        let columns = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartDefinition = this.GetCurrentChartDefinition();
        if (chartDefinition) {
            let chartData;
            if (chartDefinition.ChartType == ChartEnums_1.ChartType.CategoryChart) {
                chartData = this.blotter.ChartService.BuildCategoryChartData(chartDefinition, columns);
            }
            else if (chartDefinition.ChartType == ChartEnums_1.ChartType.PieChart) {
                chartData = this.blotter.ChartService.BuildPieChartData(chartDefinition);
            }
            this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(chartData));
        }
    }
    clearChartData() {
        if (this.GetSystemState().ChartData != null) {
            this.blotter.adaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(null));
        }
    }
    GetSystemState() {
        return this.blotter.adaptableBlotterStore.TheStore.getState().System;
    }
    GetChartState() {
        return this.blotter.adaptableBlotterStore.TheStore.getState().Chart;
    }
    GetColumnState() {
        return this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
    }
    GetCurrentChartDefinition() {
        return this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
    }
}
exports.ChartStrategy = ChartStrategy;
