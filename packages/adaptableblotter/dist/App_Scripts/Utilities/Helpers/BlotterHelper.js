"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultAdaptableBlotterOptions_1 = require("../Defaults/DefaultAdaptableBlotterOptions");
const ColumnHelper_1 = require("./ColumnHelper");
const LoggingHelper_1 = require("./LoggingHelper");
const Enums_1 = require("../Enums");
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
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError(errorMessage);
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
    function CheckLicenceKey(licenceInfo) {
        let universalOrEndUser = " (" + licenceInfo.LicenceUserType + "). ";
        let expiryDate = 'Expires: ' + licenceInfo.ExpiryDate.toLocaleDateString();
        switch (licenceInfo.LicenceScopeType) {
            case Enums_1.LicenceScopeType.Community:
                let licenceMessage = '\n';
                licenceMessage += '***********************************************************************************\n';
                licenceMessage += '************************** Adaptable Blotter License ******************************\n';
                licenceMessage += '********************* This is an evaluation / community licence *******************\n';
                licenceMessage += '******** It contains full functionality - but you cannot load or save state *******\n';
                licenceMessage += '********* Please contact sales@adaptabletools.com for upgrade information *********\n';
                licenceMessage += '***********************************************************************************\n';
                LoggingHelper_1.LoggingHelper.LogError(licenceMessage);
                break;
            case Enums_1.LicenceScopeType.Standard:
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterInfo(" Licence Type: Standard" + universalOrEndUser + expiryDate);
                break;
            case Enums_1.LicenceScopeType.Enterprise:
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterInfo(" Licence Type: Enterprise" + universalOrEndUser + expiryDate);
                break;
        }
        if (!licenceInfo.IsLicenceInDate) {
            let licenceMessage = '\n';
            licenceMessage += '***********************************************************************************\n';
            licenceMessage += '************************** Adaptable Blotter License ******************************\n';
            licenceMessage += '************************* This licence is out of date *****************************\n';
            licenceMessage += '******** Please contact sales@adaptabletools.com for to renew your licence ********\n';
            licenceMessage += '***********************************************************************************\n';
            LoggingHelper_1.LoggingHelper.LogError(licenceMessage);
        }
    }
    BlotterHelper.CheckLicenceKey = CheckLicenceKey;
})(BlotterHelper = exports.BlotterHelper || (exports.BlotterHelper = {}));
