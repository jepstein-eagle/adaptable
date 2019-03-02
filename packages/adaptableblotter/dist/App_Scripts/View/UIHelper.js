"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Utilities/Enums");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const StyleConstants_1 = require("../Utilities/Constants/StyleConstants");
const LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var UIHelper;
(function (UIHelper) {
    function getDefaultColors() {
        return [
            "#000000",
            "#ffffff",
            "#C0C0C0",
            "#808080",
            "#800000",
            "#808000",
            "#008000",
            "#00FF00",
            "#FFFF00",
            "#FFFFCC",
            "#000080",
            "#0000FF",
            "#008080",
            "#00FFFF",
            "#FF00FF",
            "#800080",
            "#8B0000",
            "#FF0000",
            "#FF6961",
            "#FFA500",
        ];
    }
    UIHelper.getDefaultColors = getDefaultColors;
    function getEmptyConfigState() {
        return {
            EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1,
        };
    }
    UIHelper.getEmptyConfigState = getEmptyConfigState;
    function getExpressionBuilderState(expression) {
        return {
            Expression: expression, SelectedColumnId: "", SelectedTab: null
        };
    }
    UIHelper.getExpressionBuilderState = getExpressionBuilderState;
    function getExpressionBuilderStateWithColumn(expression, columnId) {
        return {
            Expression: expression, SelectedColumnId: columnId, SelectedTab: null
        };
    }
    UIHelper.getExpressionBuilderStateWithColumn = getExpressionBuilderStateWithColumn;
    function getDescriptionForDataType(dataType) {
        switch (dataType) {
            case Enums_1.DataType.String:
                return "string";
            case Enums_1.DataType.Number:
                return "number";
            case Enums_1.DataType.Date:
                return "date";
        }
    }
    UIHelper.getDescriptionForDataType = getDescriptionForDataType;
    function getPlaceHolderforDataType(dataType) {
        switch (dataType) {
            case Enums_1.DataType.String:
                return "Enter Value";
            case Enums_1.DataType.Number:
                return "Enter Number";
            case Enums_1.DataType.Date:
                return "Enter Date";
        }
    }
    UIHelper.getPlaceHolderforDataType = getPlaceHolderforDataType;
    function getModalContainer(blotterOptions, document) {
        let modalContainer;
        if (blotterOptions.containerOptions.modalContainer) { // this has been set, so we use the property
            modalContainer = document.getElementById(blotterOptions.containerOptions.modalContainer);
            if (modalContainer) {
                const modalContainerClassName = " modal-container";
                if (!modalContainer.className.includes(modalContainerClassName)) {
                    modalContainer.className += modalContainerClassName;
                }
            }
        }
        if (!modalContainer) {
            modalContainer = document.body;
        }
        return modalContainer;
    }
    UIHelper.getModalContainer = getModalContainer;
    function getChartContainer(blotterOptions, document, showModal) {
        let chartContainer;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(blotterOptions.containerOptions.chartContainer)) { // they have provided one so get that
            chartContainer = document.getElementById(blotterOptions.containerOptions.chartContainer);
            if (chartContainer) {
                const chartContainerClassName = " chart-container";
                if (!chartContainer.className.includes(chartContainerClassName)) {
                    chartContainer.className += chartContainerClassName;
                }
            }
            else {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("Chart div called '" + blotterOptions.containerOptions.chartContainer + "' not found: so creating standard div");
                chartContainer = document.getElementById("ad");
            }
        }
        else { // not provided one so return whole document if modal, or 'chart' if not
            chartContainer = (showModal) ? document.body : document.getElementById("ad");
        }
        return chartContainer;
    }
    UIHelper.getChartContainer = getChartContainer;
    function isValidUserChartContainer(blotterOptions, document) {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(blotterOptions.containerOptions.chartContainer)) {
            return (document.getElementById(blotterOptions.containerOptions.chartContainer) != null);
        }
        return false;
    }
    UIHelper.isValidUserChartContainer = isValidUserChartContainer;
    function IsNotEmptyStyle(style) {
        return style.BackColor != null || style.ForeColor != null || style.FontWeight != Enums_1.FontWeight.Normal || style.FontStyle != Enums_1.FontStyle.Normal || style.FontSize != null || StringExtensions_1.StringExtensions.IsNotNullOrEmpty(style.ClassName);
    }
    UIHelper.IsNotEmptyStyle = IsNotEmptyStyle;
    function getMessageTypeByStatusColour(statusColour) {
        switch (statusColour) {
            case Enums_1.StatusColour.Red:
                return Enums_1.MessageType.Error;
            case Enums_1.StatusColour.Amber:
                return Enums_1.MessageType.Warning;
            case Enums_1.StatusColour.Green:
                return Enums_1.MessageType.Success;
            case Enums_1.StatusColour.Blue:
                return Enums_1.MessageType.Info;
        }
    }
    UIHelper.getMessageTypeByStatusColour = getMessageTypeByStatusColour;
    function getStyleNameByStatusColour(statusColour) {
        switch (statusColour) {
            case Enums_1.StatusColour.Red:
                return StyleConstants_1.DANGER_BSSTYLE;
            case Enums_1.StatusColour.Amber:
                return StyleConstants_1.WARNING_BSSTYLE;
            case Enums_1.StatusColour.Green:
                return StyleConstants_1.SUCCESS_BSSTYLE;
            case Enums_1.StatusColour.Blue:
                return StyleConstants_1.INFO_BSSTYLE;
        }
    }
    UIHelper.getStyleNameByStatusColour = getStyleNameByStatusColour;
    function getGlyphByMessageType(messageType) {
        switch (messageType) {
            case Enums_1.MessageType.Info:
                return "info-sign";
            case Enums_1.MessageType.Success:
                return "ok-sign";
            case Enums_1.MessageType.Warning:
                return "warning-sign";
            case Enums_1.MessageType.Error:
                return "exclamation-sign";
        }
    }
    UIHelper.getGlyphByMessageType = getGlyphByMessageType;
    function getStyleNameByMessageType(messageType) {
        switch (messageType) {
            case Enums_1.MessageType.Error:
                return StyleConstants_1.DANGER_BSSTYLE;
            case Enums_1.MessageType.Warning:
                return StyleConstants_1.WARNING_BSSTYLE;
            case Enums_1.MessageType.Success:
                return StyleConstants_1.SUCCESS_BSSTYLE;
            case Enums_1.MessageType.Info:
                return StyleConstants_1.INFO_BSSTYLE;
        }
    }
    UIHelper.getStyleNameByMessageType = getStyleNameByMessageType;
    function getStyleForSystemStatusButton(statusColour) {
        switch (statusColour) {
            case Enums_1.StatusColour.Blue:
                return StyleConstants_1.INFO_BSSTYLE;
            case Enums_1.StatusColour.Green:
                return StyleConstants_1.SUCCESS_BSSTYLE;
            case Enums_1.StatusColour.Amber:
                return StyleConstants_1.WARNING_BSSTYLE;
            case Enums_1.StatusColour.Red:
                return StyleConstants_1.DANGER_BSSTYLE;
        }
    }
    UIHelper.getStyleForSystemStatusButton = getStyleForSystemStatusButton;
    function getGlyphForSystemStatusButton(statusColour) {
        switch (statusColour) {
            case Enums_1.StatusColour.Blue:
                return "info-sign";
            case Enums_1.StatusColour.Green:
                return "ok-sign";
            case Enums_1.StatusColour.Amber:
                return "warning-sign";
            case Enums_1.StatusColour.Red:
                return "exclamation-sign";
        }
    }
    UIHelper.getGlyphForSystemStatusButton = getGlyphForSystemStatusButton;
})(UIHelper = exports.UIHelper || (exports.UIHelper = {}));
