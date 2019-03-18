import { IAdaptableBlotterOptions } from '../Interface/BlotterOptions/IAdaptableBlotterOptions';
import { DefaultAdaptableBlotterOptions } from '../Defaults/DefaultAdaptableBlotterOptions';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';
import { LoggingHelper } from './LoggingHelper';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
import { LicenceScopeType } from '../Enums';

export module BlotterHelper {

    export function AssignBlotterOptions(blotterOptions: IAdaptableBlotterOptions): IAdaptableBlotterOptions {
        let returnBlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions)
        returnBlotterOptions.auditOptions = Object.assign({}, DefaultAdaptableBlotterOptions.auditOptions, blotterOptions.auditOptions)
        returnBlotterOptions.configServerOptions = Object.assign({}, DefaultAdaptableBlotterOptions.configServerOptions, blotterOptions.configServerOptions)
        returnBlotterOptions.layoutOptions = Object.assign({}, DefaultAdaptableBlotterOptions.layoutOptions, blotterOptions.layoutOptions)
        returnBlotterOptions.filterOptions = Object.assign({}, DefaultAdaptableBlotterOptions.filterOptions, blotterOptions.filterOptions)
        returnBlotterOptions.queryOptions = Object.assign({}, DefaultAdaptableBlotterOptions.queryOptions, blotterOptions.queryOptions)
        returnBlotterOptions.containerOptions = Object.assign({}, DefaultAdaptableBlotterOptions.containerOptions, blotterOptions.containerOptions)
        returnBlotterOptions.generalOptions = Object.assign({}, DefaultAdaptableBlotterOptions.generalOptions, blotterOptions.generalOptions)
        return returnBlotterOptions;
    }

    export function CheckPrimaryKeyExists(blotter: IAdaptableBlotter, columns: IColumn[]): void {
        let pkColumn: IColumn = ColumnHelper.getColumnFromId(blotter.BlotterOptions.primaryKey, columns);
        if (pkColumn == null) {
            let errorMessage: string = "The PK Column '" + blotter.BlotterOptions.primaryKey + "' does not exist.  This will affect many functions in the Adaptable Blotter."
            if (blotter.BlotterOptions.generalOptions.showMissingPrimaryKeyWarning == true) { // show an alert if that is the option  
                blotter.api.alertApi.ShowError("No Primary Key", errorMessage, true)
            } else { // otherwise just log it
                LoggingHelper.LogAdaptableBlotterError(errorMessage);
            }
        }
    }

    export function IsConfigServerEnabled(blotterOptions: IAdaptableBlotterOptions): boolean {
        return blotterOptions.configServerOptions != null
            && blotterOptions.configServerOptions.enableConfigServer != null
            && blotterOptions.configServerOptions.enableConfigServer == true;
    }

    export function CheckLicenceKey(licenceInfo: ILicenceInfo): void {
        let universalOrEndUser: string =  " (" + licenceInfo.LicenceUserType + ");"
        switch (licenceInfo.LicenceScopeType) {
            case LicenceScopeType.Community:
                let licenceMessage: string = '\n';
                licenceMessage += '***********************************************************************************\n'
                licenceMessage += '************************** Adaptable Blotter License ******************************\n'
                licenceMessage += '********************* This is an evaluation / community licence *******************\n'
                licenceMessage += '******** It contains full functionality - but you cannot load or save state *******\n'
                licenceMessage += '********* Please contact sales@adaptabletools.com for upgrade information *********\n'
                licenceMessage += '***********************************************************************************\n'
                LoggingHelper.LogError(licenceMessage);
                break;

            case LicenceScopeType.Standard:
                LoggingHelper.LogAdaptableBlotterInfo(" Licence Type: Standard" + universalOrEndUser);
                break;
            case LicenceScopeType.Enterprise:
                LoggingHelper.LogAdaptableBlotterInfo(" Licence Type: Enterprise" + universalOrEndUser);
                break;
        }
        if (!licenceInfo.IsLicenceInDate) {
            let licenceMessage: string = '\n';
            licenceMessage += '***********************************************************************************\n'
            licenceMessage += '************************** Adaptable Blotter License ******************************\n'
            licenceMessage += '************************* This licence is out of date *****************************\n'
            licenceMessage += '******** Please contact sales@adaptabletools.com for to renew your licence ********\n'
            licenceMessage += '***********************************************************************************\n'
            LoggingHelper.LogError(licenceMessage);
        }
    }


}