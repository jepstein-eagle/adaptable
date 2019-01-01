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
        returnBlotterOptions.configServerOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.configServerOptions, blotterOptions.configServerOptions);
        returnBlotterOptions.layoutOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.layoutOptions, blotterOptions.layoutOptions);
        returnBlotterOptions.filterOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.filterOptions, blotterOptions.filterOptions);
        returnBlotterOptions.queryOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.queryOptions, blotterOptions.queryOptions);
        returnBlotterOptions.containerOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.containerOptions, blotterOptions.containerOptions);
        returnBlotterOptions.generalOptions = Object.assign({}, DefaultAdaptableBlotterOptions_1.DefaultAdaptableBlotterOptions.generalOptions, blotterOptions.generalOptions);
        return returnBlotterOptions;
    }
    BlotterHelper.AssignBlotterOptions = AssignBlotterOptions;
    function CheckPrimaryKeyExists(blotter, columns) {
        let pkColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(blotter.BlotterOptions.primaryKey, columns);
        if (pkColumn == null) {
            let errorMessage = "The PK Column '" + blotter.BlotterOptions.primaryKey + "' does not exist.  This will affect many functions in the Adaptable Blotter.";
            if (blotter.BlotterOptions.generalOptions.showMissingPrimaryKeyWarning == true) { // show an alert if that is the option  
                blotter.api.alertApi.ShowError("No Primary Key", errorMessage, true);
            }
            else { // otherwise just log it
                LoggingHelper_1.LoggingHelper.LogError(errorMessage);
            }
        }
    }
    BlotterHelper.CheckPrimaryKeyExists = CheckPrimaryKeyExists;
    function IsConfigServerEnabled(blotterOptions) {
        return blotterOptions.configServerOptions != null
            && blotterOptions.configServerOptions.enableConfigServer != null
            && blotterOptions.configServerOptions.enableConfigServer == true;
    }
    BlotterHelper.IsConfigServerEnabled = IsConfigServerEnabled;
})(BlotterHelper = exports.BlotterHelper || (exports.BlotterHelper = {}));
