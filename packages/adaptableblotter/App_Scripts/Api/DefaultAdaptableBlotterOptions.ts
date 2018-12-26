import * as GeneralConstants from '../Utilities/Constants/GeneralConstants'
import { IAdaptableBlotterOptions } from './Interface/IAdaptableBlotterOptions';

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    vendorGrid: null,
    primaryKey: "",
    auditLogOptions: {
        auditCellEdits: false,
        auditFunctionEvents: false,
        auditUserStateChanges: false,
        auditInternalStateChanges: false,
    },
    remoteConfigServerOptions: {
        enableRemoteConfigServer: false,
        remoteConfigServerUrl: "",
    },
    userName: GeneralConstants.USER_NAME,
    blotterId: GeneralConstants.BLOTTER_ID,
    predefinedConfig: null,
    maxColumnValueItemsDisplayed: 5000,
    serverSearchOption: 'None',
    columnValuesOnlyInQueries: false,
    adaptableBlotterContainer: "adaptableBlotter",
    vendorContainer: "grid",
    layoutOptions: {
        includeVendorStateInLayouts: false,
        autoSaveLayouts: false,
    },
    getColumnValues: null,
    ignoreCaseInQueries: true,
    useDefaultVendorGridThemes: true,
    useAdaptableBlotterFilterForm: true,
    useAdaptableBlotterFloatingFilter: true,
    showMissingPrimaryKeyWarning: true,
    indicateFilteredColumns: true
}

