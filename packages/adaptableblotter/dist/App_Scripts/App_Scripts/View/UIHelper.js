"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Utilities/Enums");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const StyleConstants_1 = require("../Utilities/Constants/StyleConstants");
var UIHelper;
(function (UIHelper) {
    function EmptyConfigState() {
        return {
            EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1,
        };
    }
    UIHelper.EmptyConfigState = EmptyConfigState;
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
        if (blotterOptions.modalContainer) { // this has been set, so we use the property
            modalContainer = document.getElementById(blotterOptions.modalContainer);
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
        }
    }
    UIHelper.getStyleNameByStatusColour = getStyleNameByStatusColour;
    function getGlyphByMessageType(messageType) {
        switch (messageType) {
            case Enums_1.MessageType.Info:
                return "info-sign";
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
            case Enums_1.MessageType.Info:
                return StyleConstants_1.INFO_BSSTYLE;
        }
    }
    UIHelper.getStyleNameByMessageType = getStyleNameByMessageType;
})(UIHelper = exports.UIHelper || (exports.UIHelper = {}));
