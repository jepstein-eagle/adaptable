"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const Enums_1 = require("../Enums");
var AdaptableBlotterLogger;
(function (AdaptableBlotterLogger) {
    function LogAlert(message, messageType, ...optionalParams) {
        switch (messageType) {
            case Enums_1.MessageType.Info:
                LogMessage(message, optionalParams);
                break;
            case Enums_1.MessageType.Warning:
                LogWarning(message, optionalParams);
                break;
            case Enums_1.MessageType.Error:
                LogError(message, optionalParams);
                break;
        }
    }
    AdaptableBlotterLogger.LogAlert = LogAlert;
    function LogMessage(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.log("Adaptable Blotter Info: " + message, optionalParams);
        }
        else {
            console.log("Adaptable Blotter Info: " + message);
        }
    }
    AdaptableBlotterLogger.LogMessage = LogMessage;
    function LogWarning(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.warn("Adaptable Blotter Warning: " + message, optionalParams);
        }
        else {
            console.warn("Adaptable Blotter Warning: " + message);
        }
    }
    AdaptableBlotterLogger.LogWarning = LogWarning;
    function LogError(message, ...optionalParams) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
            console.error("Adaptable Blotter Error: " + message, optionalParams);
        }
        else {
            console.error("Adaptable Blotter Error: " + message);
        }
    }
    AdaptableBlotterLogger.LogError = LogError;
})(AdaptableBlotterLogger = exports.AdaptableBlotterLogger || (exports.AdaptableBlotterLogger = {}));
