"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants = require("../Utilities/Constants/GeneralConstants");
exports.DefaultAdaptableBlotterOptions = {
    vendorGrid: null,
    primaryKey: "",
    auditOptions: {
        auditCellEdits: false,
        auditFunctionEvents: false,
        auditUserStateChanges: false,
        auditInternalStateChanges: false,
        pingInterval: 60,
        auditLogsSendInterval: 1
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
};
