import * as GeneralConstants from './Constants/GeneralConstants'
import { IAdaptableBlotterOptions } from './Api/Interface/IAdaptableBlotterOptions';

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    enableAuditLog: false,
    enableRemoteConfigServer: false,
    userName: GeneralConstants.USER_NAME,
    blotterId: GeneralConstants.BLOTTER_ID,
    predefinedConfig: null,
    maxColumnValueItemsDisplayed: 5000,
    serverSearchOption: 'None',
    columnValuesOnlyInQueries: false,
    adaptableBlotterContainer: "adaptableBlotter",
    vendorContainer: "grid",
    includeVendorStateInLayouts: false,
    vendorGrid: null,
    primaryKey: "",
    vendorGridName: "agGrid"
}


