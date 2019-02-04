import * as GeneralConstants from '../Constants/GeneralConstants'
import { IAdaptableBlotterOptions } from '../Interface/BlotterOptions/IAdaptableBlotterOptions';

export const DefaultAdaptableBlotterOptions: IAdaptableBlotterOptions = {
    vendorGrid: null,
    primaryKey: "",
    userName: GeneralConstants.USER_NAME,
    blotterId: GeneralConstants.BLOTTER_ID,
    predefinedConfig: null,
    auditOptions: {
        auditCellEdits: false,
        auditFunctionEvents: false,
        auditUserStateChanges: false,
        auditInternalStateChanges: false,
        pingInterval: 60,
        auditLogsSendInterval: 1
    },
    configServerOptions: {
        enableConfigServer: false,
        configServerUrl: "",
    },
    containerOptions: {
        adaptableBlotterContainer: "adaptableBlotter",
        vendorContainer: "grid",
        modalContainer: null,
        chartContainer: null,
    },
    layoutOptions: {
        includeVendorStateInLayouts: false,
        autoSaveLayouts: false,
    },
    filterOptions: {
        indicateFilteredColumns: true,
        useAdaptableBlotterFilterForm: true,
        useAdaptableBlotterFloatingFilter: true,
        filterActionOnUserDataChange: {
            RunFilter: GeneralConstants.FILTER_ALWAYS,
            ThrottleDelay: 0
        },
        filterActionOnExternalDataChange: {
            RunFilter: GeneralConstants.FILTER_NEVER,
            ThrottleDelay: 0
        },
    },
    queryOptions: {
        maxColumnValueItemsDisplayed: 5000,
        columnValuesOnlyInQueries: false,
        getColumnValues: null,
        ignoreCaseInQueries: true,
    },
    generalOptions: {
        useDefaultVendorGridThemes: true,
        showMissingPrimaryKeyWarning: true,
        preventDuplicatePrimaryKeyValues: true,
        serverSearchOption: 'None',
    }
}

