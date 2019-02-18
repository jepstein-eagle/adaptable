"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const React = require("react");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
var ChartUIHelper;
(function (ChartUIHelper) {
    function setChartDisplayPopupState(chartDefinition, columns) {
        return {
            ChartProperties: chartDefinition.ChartProperties,
            EditedChartDefinition: null,
            IsChartSettingsVisible: false,
            // General
            IsGeneralMinimised: false,
            // Y Axis
            IsYAxisMinimised: true,
            SetYAxisMinimumValue: chartDefinition.ChartProperties.YAxisMinimumValue != undefined,
            SetYAxisLabelColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.YAxisLabelColor),
            SetYAxisTitleColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.YAxisTitleColor),
            UseDefaultYAxisTitle: isDefaultYAxisTitle(chartDefinition, columns),
            // X Axis
            IsXAxisMinimised: true,
            SetXAxisLabelColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.XAxisLabelColor),
            SetXAxisTitleColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.XAxisTitleColor),
            UseDefaultXAxisTitle: isDefaultXAxisTitle(chartDefinition, columns),
            // Highlights
            IsHighlightsMinimised: true,
            // Misc
            IsMiscMinimised: true,
            TitleMargin: (chartDefinition.ChartProperties.TitleAlignment == ChartEnums_1.HorizontalAlignment.Right) ? 5 : 0,
            SubTitleMargin: (chartDefinition.ChartProperties.SubTitleAlignment == ChartEnums_1.HorizontalAlignment.Right) ? 5 : 0
        };
    }
    ChartUIHelper.setChartDisplayPopupState = setChartDisplayPopupState;
    function isDefaultYAxisTitle(chartDefinition, columns) {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.YAxisTitle) ||
            chartDefinition.ChartProperties.YAxisTitle == createDefaultYAxisTitle(chartDefinition, columns);
    }
    function isDefaultXAxisTitle(chartDefinition, columns) {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.XAxisTitle) ||
            chartDefinition.ChartProperties.XAxisTitle == createDefaultXAxisTitle(chartDefinition, columns);
    }
    function createDefaultYAxisTitle(chartDefinition, columns) {
        return chartDefinition.YAxisColumnIds.map(c => {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(c, columns);
        }).join(', ');
    }
    ChartUIHelper.createDefaultYAxisTitle = createDefaultYAxisTitle;
    function createDefaultXAxisTitle(chartDefinition, columns) {
        let returnString = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.XSegmentColumnId)) {
            returnString = returnString + " (by " + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XSegmentColumnId, columns) + ")";
        }
        return returnString;
    }
    ChartUIHelper.createDefaultXAxisTitle = createDefaultXAxisTitle;
    function setDefaultChartDisplayPopupState() {
        let defaultState = {
            IsGeneralMinimised: false,
            IsYAxisMinimised: true,
            SetYAxisMinimumValue: false,
            SetYAxisLabelColor: false,
            SetYAxisTitleColor: false,
            IsXAxisMinimised: true,
            SetXAxisLabelColor: false,
            SetXAxisTitleColor: false,
            IsMiscMinimised: true,
            TitleMargin: 0,
            SubTitleMargin: 0,
            UseDefaultXAxisTitle: true
        };
        return defaultState;
    }
    ChartUIHelper.setDefaultChartDisplayPopupState = setDefaultChartDisplayPopupState;
    function getChartTypeOptions() {
        let optionChartTypes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ChartType).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionChartTypes;
    }
    ChartUIHelper.getChartTypeOptions = getChartTypeOptions;
    function getToolTipOptions() {
        let optionToolTipTypes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ToolTipType).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionToolTipTypes;
    }
    ChartUIHelper.getToolTipOptions = getToolTipOptions;
    function getCrossHairModeOptions() {
        let optionCrossHairModeTypes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ChartCrosshairsMode).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionCrossHairModeTypes;
    }
    ChartUIHelper.getCrossHairModeOptions = getCrossHairModeOptions;
    function getChartSizeOptions() {
        let optionChartSizes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ChartSize).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionChartSizes;
    }
    ChartUIHelper.getChartSizeOptions = getChartSizeOptions;
    function getAlignmentOptions() {
        let optionAligments = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.HorizontalAlignment).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionAligments;
    }
    ChartUIHelper.getAlignmentOptions = getAlignmentOptions;
    function getAxisAngleOptions() {
        let optionAxisAngles = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.AxisAngle).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionAxisAngles;
    }
    ChartUIHelper.getAxisAngleOptions = getAxisAngleOptions;
    function setChartHeight(chartProperties) {
        switch (chartProperties.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
                return '350px';
            case ChartEnums_1.ChartSize.Small:
                return '450px';
            case ChartEnums_1.ChartSize.Medium:
                return '600px';
            case ChartEnums_1.ChartSize.Large:
                return '750px';
            case ChartEnums_1.ChartSize.XLarge:
                return '850px';
        }
    }
    ChartUIHelper.setChartHeight = setChartHeight;
    function setChartWidth(chartProperties, isChartSettingsVisible) {
        let chartWidth;
        switch (chartProperties.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
                chartWidth = (isChartSettingsVisible) ? 375 : 600;
                break;
            case ChartEnums_1.ChartSize.Small:
                chartWidth = (isChartSettingsVisible) ? 525 : 850;
                break;
            case ChartEnums_1.ChartSize.Medium:
                chartWidth = (isChartSettingsVisible) ? 750 : 1100;
                break;
            case ChartEnums_1.ChartSize.Large:
                chartWidth = (isChartSettingsVisible) ? 1050 : 1350;
                break;
            case ChartEnums_1.ChartSize.XLarge:
                chartWidth = (isChartSettingsVisible) ? 1200 : 1600;
                break;
        }
        chartWidth = (chartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible) ? chartWidth : chartWidth - 10;
        return chartWidth + 'px';
    }
    ChartUIHelper.setChartWidth = setChartWidth;
    function setPanelWidth(chartProperties) {
        switch (chartProperties.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
                return '650px';
            case ChartEnums_1.ChartSize.Small:
                return '900px';
            case ChartEnums_1.ChartSize.Medium:
                return '1150px';
            case ChartEnums_1.ChartSize.Large:
                return '1400px';
            case ChartEnums_1.ChartSize.XLarge:
                return '1650px';
        }
    }
    ChartUIHelper.setPanelWidth = setPanelWidth;
    function setChartColumnSize(chartProperties) {
        switch (chartProperties.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
            case ChartEnums_1.ChartSize.Small:
                return 7;
            case ChartEnums_1.ChartSize.Medium:
                return 8;
            case ChartEnums_1.ChartSize.Large:
            case ChartEnums_1.ChartSize.XLarge:
                return 9;
        }
    }
    ChartUIHelper.setChartColumnSize = setChartColumnSize;
    function setLegendColumnSize(chartProperties) {
        switch (chartProperties.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
            case ChartEnums_1.ChartSize.Small:
                return 5;
            case ChartEnums_1.ChartSize.Medium:
                return 4;
            case ChartEnums_1.ChartSize.Large:
            case ChartEnums_1.ChartSize.XLarge:
                return 3;
        }
    }
    ChartUIHelper.setLegendColumnSize = setLegendColumnSize;
    function getAngleFromEnum(axisAngle) {
        switch (axisAngle) {
            case ChartEnums_1.AxisAngle.Horizontal:
                return 0;
            case ChartEnums_1.AxisAngle.Diagonal:
                return 45;
            case ChartEnums_1.AxisAngle.Vertical:
                return 90;
        }
    }
    ChartUIHelper.getAngleFromEnum = getAngleFromEnum;
})(ChartUIHelper = exports.ChartUIHelper || (exports.ChartUIHelper = {}));
