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
            SetYAxisMaximumValue: chartDefinition.ChartProperties.YAxisMaximumValue != undefined,
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
        return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
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
        let optionCrossHairModeTypes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.CrosshairDisplayMode).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionCrossHairModeTypes;
    }
    ChartUIHelper.getCrossHairModeOptions = getCrossHairModeOptions;
    function getAlignmentOptions() {
        let optionAligments = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.HorizontalAlignment).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return optionAligments;
    }
    ChartUIHelper.getAlignmentOptions = getAlignmentOptions;
    function getMarkerTypeOptions() {
        let options = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.MarkerType).map((enumName) => {
            let name = enumName.toString();
            return React.createElement("option", { key: name, value: name }, name);
        });
        return options;
    }
    ChartUIHelper.getMarkerTypeOptions = getMarkerTypeOptions;
    function getMarkerFromProps(chartProps) {
        let chartType = chartProps.ChartType;
        let markerType = chartProps.MarkerType;
        return getMarkerFor(chartType, markerType);
    }
    ChartUIHelper.getMarkerFromProps = getMarkerFromProps;
    function getMarkerFor(charType, markerType) {
        // resolves marker for specified chart type since some chart types should hide markers by default
        if (markerType === "Default" || markerType === "Unset") {
            markerType = charType == ChartEnums_1.ChartType.Point ? "Automatic" : "None";
        }
        else {
            // markerType is unchanged and we show markers that the user wants
        }
        return markerType;
    }
    ChartUIHelper.getMarkerFor = getMarkerFor;
    function getYAxisLabelsLocations() {
        let options = [
            React.createElement("option", { key: "Left", value: ChartEnums_1.AxisLabelsLocation.OutsideLeft }, "Left"),
            React.createElement("option", { key: "Right", value: ChartEnums_1.AxisLabelsLocation.OutsideRight }, "Right"),
        ];
        return options;
    }
    ChartUIHelper.getYAxisLabelsLocations = getYAxisLabelsLocations;
    function getXAxisLabelsLocations() {
        let options = [
            React.createElement("option", { key: "Top", value: ChartEnums_1.AxisLabelsLocation.OutsideTop }, "Top"),
            React.createElement("option", { key: "Bottom", value: ChartEnums_1.AxisLabelsLocation.OutsideBottom }, "Bottom"),
        ];
        return options;
    }
    ChartUIHelper.getXAxisLabelsLocations = getXAxisLabelsLocations;
    function getAxisAngleOptions() {
        let options = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.AxisAngle).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return options;
    }
    ChartUIHelper.getAxisAngleOptions = getAxisAngleOptions;
    function getAxisLabelScales() {
        let options = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.AxisScale).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return options;
    }
    ChartUIHelper.getAxisLabelScales = getAxisLabelScales;
    function getCalloutTypeOptions() {
        let options = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.CalloutsType).map((enumName) => {
            let name = enumName.toString();
            // adding known callouts as strings because we will add non-numeric properties from data source in future
            return React.createElement("option", { key: name, value: name }, name);
        });
        // TODO get non-numeric properties from data source and then add them to above options:
        // <option key={PropName} value={PropName}>PropName</option>,
        return options;
    }
    ChartUIHelper.getCalloutTypeOptions = getCalloutTypeOptions;
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
    // TODO see a note in BuildChartData function
    function getDataProperties(chartData) {
        if (chartData === undefined) {
            return [];
        }
        let item = chartData[0];
        let dataProps = Object.keys(item);
        return dataProps;
    }
    ChartUIHelper.getDataProperties = getDataProperties;
    // TODO ideally we should get names of numeric using IChartDefinition.YAxisColumnIds instead of:
    function getNumericProperties(chartData) {
        if (chartData === undefined) {
            return [];
        }
        let dataItem = chartData[0];
        let allProps = Object.keys(dataItem);
        let dataProps = [];
        allProps.forEach((name) => {
            let dataValue = dataItem[name];
            if (typeof (dataValue) === "number") {
                dataProps.push(name);
            }
        });
        // console.log("getNumericProperties " + dataProps);
        return dataProps;
    }
    ChartUIHelper.getNumericProperties = getNumericProperties;
    function getCalloutsData(chartData, chartProps) {
        // TODO ideally we should get names of numeric using IChartDefinition.YAxisColumnIds instead of this:
        let numericProps = getNumericProperties(chartData);
        let callouts = [];
        if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataRanges) {
            // skipping filtering of callouts for DataRanges because there are only 2 callouts for each Y-column
            return getCalloutsDataRanges(chartData, numericProps);
        }
        else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataChangesInValues) {
            callouts = getCalloutsDataChanges(chartData, numericProps, false);
        }
        else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataChangesInPercentage) {
            callouts = getCalloutsDataChanges(chartData, numericProps, true);
        }
        else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataPoints) {
            callouts = getCalloutsDataPoints(chartData, numericProps);
        }
        else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.None) {
            return [];
        }
        else {
            let dataColumn = chartProps.CalloutsType;
            // TODO implement a function for getting values a column named dataColumn from chartData
        }
        // users can filter out callouts and thus improve chart performance using IChartProperties.CalloutsInterval
        // perhaps this should depend on IChartProperties.XAxisInterval (when added) so that callouts align with labels on XAxis
        let filtered = [];
        for (let i = 0; i < callouts.length; i++) {
            if (i % chartProps.CalloutsInterval == 0) {
                filtered.push(callouts[i]);
            }
        }
        return filtered;
    }
    ChartUIHelper.getCalloutsData = getCalloutsData;
    function getCalloutsDataRanges(chartData, numericProps) {
        let callouts = [];
        numericProps.forEach((columnName) => {
            // setting initial values that will catch first values of an item
            let minValue = Number.MAX_VALUE;
            let maxValue = Number.MIN_VALUE;
            let minIndex = 0;
            let maxIndex = 0;
            // find index and MIN/MAX values of each data column
            for (let i = 0; i < chartData.length; i++) {
                const item = chartData[i];
                let itemValue = item[columnName];
                if (minValue > itemValue) {
                    minValue = itemValue;
                    minIndex = i;
                }
                if (maxValue < itemValue) {
                    maxValue = itemValue;
                    maxIndex = i;
                }
            }
            // add callouts for MIN/MAX values of each data column
            callouts.push({
                CalloutsLabel: "MAX " + maxValue.toFixed(1),
                CalloutsIndex: maxIndex,
                CalloutsValue: maxValue,
                MemberPath: columnName
            });
            callouts.push({
                CalloutsLabel: "MIN " + minValue.toFixed(1),
                CalloutsIndex: minIndex,
                CalloutsValue: minValue,
                MemberPath: columnName
            });
        });
        return callouts;
    }
    ChartUIHelper.getCalloutsDataRanges = getCalloutsDataRanges;
    function getCalloutsDataChanges(chartData, numericProps, showPercentages) {
        let callouts = [];
        if (chartData.length < 2) {
            return callouts;
        }
        numericProps.forEach((column) => {
            // calculate changes between consecutive items for each data column
            for (let i = 1; i < chartData.length; i++) {
                const itemCurrent = chartData[i];
                const itemPrevious = chartData[i - 1];
                let itemChange = itemCurrent[column] - itemPrevious[column];
                let itemLabel = itemChange >= 0 ? "+" : "";
                if (showPercentages) {
                    itemChange = itemChange / itemPrevious[column] * 100.0;
                    itemLabel = itemLabel + itemChange.toFixed(0) + "%";
                }
                else {
                    itemLabel = itemLabel + itemChange.toFixed(1);
                }
                callouts.push({
                    CalloutsLabel: itemLabel,
                    CalloutsValue: itemCurrent[column],
                    CalloutsIndex: i,
                    MemberPath: column
                });
            }
            ;
        });
        return callouts;
    }
    ChartUIHelper.getCalloutsDataChanges = getCalloutsDataChanges;
    function getCalloutsDataPoints(chartData, numericProps) {
        let callouts = [];
        numericProps.forEach((column) => {
            // get values of consecutive items for each data column
            for (let i = 0; i < chartData.length; i++) {
                const itemCurrent = chartData[i];
                callouts.push({
                    CalloutsLabel: itemCurrent[column].toFixed(1),
                    CalloutsValue: itemCurrent[column],
                    CalloutsIndex: i,
                    MemberPath: column
                });
            }
            ;
        });
        return callouts;
    }
    ChartUIHelper.getCalloutsDataPoints = getCalloutsDataPoints;
})(ChartUIHelper = exports.ChartUIHelper || (exports.ChartUIHelper = {}));
