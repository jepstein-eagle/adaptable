"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultAdaptableBlotterOptions_1 = require("../../Api/DefaultAdaptableBlotterOptions");
const ColumnHelper_1 = require("./ColumnHelper");
const LoggingHelper_1 = require("./LoggingHelper");
var BlotterHelper;
(function (BlotterHelper) {
    function AssignBlotterOptions(blotterOptions) {
        let returnBlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions, blotterOptions);
        returnBlotterOptions.auditOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.auditOptions, blotterOptions.auditOptions);
        returnBlotterOptions.remoteConfigServerOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.remoteConfigServerOptions, blotterOptions.remoteConfigServerOptions);
        returnBlotterOptions.layoutOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.layoutOptions, blotterOptions.layoutOptions);
        return returnBlotterOptions;
    }
    BlotterHelper.AssignBlotterOptions = AssignBlotterOptions;
    function CheckPrimaryKeyExists(blotter, columns) {
        let pkColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(blotter.BlotterOptions.primaryKey, columns);
        if (pkColumn == null) {
            let errorMessage = "The PK Column '" + blotter.BlotterOptions.primaryKey + "' does not exist.  This will affect many functions in the Adaptable Blotter.";
            if (blotter.BlotterOptions.showMissingPrimaryKeyWarning == true) { // show an alert if that is the option  
                blotter.api.alertShowError("No Primary Key", errorMessage, true);
            }
            else { // otherwise just log it
                LoggingHelper_1.LoggingHelper.LogError(errorMessage);
            }
        }
    }
    BlotterHelper.CheckPrimaryKeyExists = CheckPrimaryKeyExists;
})(BlotterHelper = exports.BlotterHelper || (exports.BlotterHelper = {}));
