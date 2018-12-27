import { IAdaptableBlotterOptions } from '../../Api/Interface/IAdaptableBlotterOptions';
import { DefaultAdaptableBlotterOptions } from '../../Api/DefaultAdaptableBlotterOptions';
import { IColumn } from '../../Api/Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';
import { LoggingHelper } from './LoggingHelper';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';

export module BlotterHelper {

    export function AssignBlotterOptions(blotterOptions: IAdaptableBlotterOptions): IAdaptableBlotterOptions {
        let returnBlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions)
        returnBlotterOptions.auditOptions = Object.assign({}, DefaultAdaptableBlotterOptions.auditOptions, blotterOptions.auditOptions)
        returnBlotterOptions.configServerOptions = Object.assign({}, DefaultAdaptableBlotterOptions.configServerOptions, blotterOptions.configServerOptions)
        returnBlotterOptions.layoutOptions = Object.assign({}, DefaultAdaptableBlotterOptions.layoutOptions, blotterOptions.layoutOptions)
        return returnBlotterOptions;
    }

    export function CheckPrimaryKeyExists(blotter: IAdaptableBlotter, columns: IColumn[]): void {
        let pkColumn: IColumn = ColumnHelper.getColumnFromId(blotter.BlotterOptions.primaryKey, columns);
        if (pkColumn == null) {
            let errorMessage: string = "The PK Column '" + blotter.BlotterOptions.primaryKey + "' does not exist.  This will affect many functions in the Adaptable Blotter."
            if (blotter.BlotterOptions.showMissingPrimaryKeyWarning == true) { // show an alert if that is the option  
                blotter.api.alertShowError("No Primary Key", errorMessage, true)
            }else{ // otherwise just log it
                LoggingHelper.LogError(errorMessage);
            }
        }
    }

    export function IsConfigServerEnabled(blotterOptions: IAdaptableBlotterOptions): boolean{
        return blotterOptions.configServerOptions != null
        && blotterOptions.configServerOptions.enableConfigServer != null
        && blotterOptions.configServerOptions.enableConfigServer == true;
    }

   

}