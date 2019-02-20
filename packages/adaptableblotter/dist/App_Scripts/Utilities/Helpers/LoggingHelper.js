"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const Enums_1 = require("../Enums");
var LoggingHelper;
(function (LoggingHelper) {
    function LogAlert(message, messageType, ...optionalParams) {
        switch (messageType) {
            case Enums_1.MessageType.Info:
                LogAdaptableBlotterInfo(message, optionalParams);
                break;
            case Enums_1.MessageType.Success:
                LogAdaptableBlotterSuccess(message, optionalParams);
                break;
            case Enums_1.MessageType.Warning:
                LogAdaptableBlotterWarning(message, optionalParams);
                break;
            case Enums_1.MessageType.Error:
                LogAdaptableBlotterError(message, optionalParams);
                break;
        }
    }
    LoggingHelper.LogAlert = LogAlert;
    function LogAdaptableBlotterInfo(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Info: " + message, optionalParams);
        }
        else {
            console.log("Adaptable Blotter Info: " + message);
        }
    }
    LoggingHelper.LogAdaptableBlotterInfo = LogAdaptableBlotterInfo;
    function LogAdaptableBlotterSuccess(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Success: " + message, optionalParams);
        }
        else {
            console.log("Adaptable Blotter Success: " + message);
        }
    }
    LoggingHelper.LogAdaptableBlotterSuccess = LogAdaptableBlotterSuccess;
    function LogAdaptableBlotterWarning(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blovtter Warning: " + message, optionalParams);
        }
        else {
            console.warn("Adaptable Blotter Warning: " + message);
        }
    }
    LoggingHelper.LogAdaptableBlotterWarning = LogAdaptableBlotterWarning;
    function LogAdaptableBlotterError(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams);
        }
        else {
            console.error("Adaptable Blotter Error: " + message);
        }
    }
    LoggingHelper.LogAdaptableBlotterError = LogAdaptableBlotterError;
    function LogError(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error(message, optionalParams);
        }
        else {
            console.error(message);
        }
    }
    LoggingHelper.LogError = LogError;
})(LoggingHelper = exports.LoggingHelper || (exports.LoggingHelper = {}));
