import * as GeneralConstants from './Constants/GeneralConstants'
import { IAdaptableBlotterOptions } from './Api/Interface/IAdaptableBlotterOptions';

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    vendorGrid: null,
    primaryKey: "",
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
    autoSaveLayouts: false,
    getColumnValues: null,
    ignoreCaseInQueries: true,
    useDefaultVendorGridThemes: true
}

