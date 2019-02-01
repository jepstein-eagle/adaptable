"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const Enums_1 = require("../Enums");
var LoggingHelper;
(function (LoggingHelper) {
    function LogAlert(message, messageType, ...optionalParams) {
        switch (messageType) {
            case Enums_1.MessageType.Info:
                LogInfo(message, optionalParams);
                break;
            case Enums_1.MessageType.Success:
                LogSuccess(message, optionalParams);
                break;
            case Enums_1.MessageType.Warning:
                LogWarning(message, optionalParams);
                break;
            case Enums_1.MessageType.Error:
                LogError(message, optionalParams);
                break;
        }
    }
    LoggingHelper.LogAlert = LogAlert;
    function LogInfo(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Info: " + message, optionalParams);
        }
        else {
            console.log("Adaptable Blotter Info: " + message);
        }
    }
    LoggingHelper.LogInfo = LogInfo;
    function LogSuccess(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Success: " + message, optionalParams);
        }
        else {
            console.log("Adaptable Blotter Success: " + message);
        }
    }
    LoggingHelper.LogSuccess = LogSuccess;
    function LogWarning(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blotter Warning: " + message, optionalParams);
        }
        else {
            console.warn("Adaptable Blotter Warning: " + message);
        }
    }
    LoggingHelper.LogWarning = LogWarning;
    function LogError(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams);
        }
        else {
            console.error("Adaptable Blotter Error: " + message);
        }
    }
    LoggingHelper.LogError = LogError;
})(LoggingHelper = exports.LoggingHelper || (exports.LoggingHelper = {}));
