import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableBlotterOptions } from '../../BlotterOptions/AdaptableBlotterOptions';

export const DefaultAdaptableBlotterOptions: AdaptableBlotterOptions = {
  vendorGrid: null,
  primaryKey: '',
  userName: GeneralConstants.USER_NAME,
  blotterId: GeneralConstants.BLOTTER_ID,
  predefinedConfig: undefined,
  licenceKey: '',
  auditOptions: {
    auditCellEdits: {
      auditToHttpChannel: false,
      auditToConsole: false,
      auditAsEvent: false,
      auditAsAlert: false,
    },
    auditFunctionEvents: {
      auditToHttpChannel: false,
      auditToConsole: false,
      auditAsEvent: false,
      auditAsAlert: false,
    },
    auditUserStateChanges: {
      auditToHttpChannel: false,
      auditToConsole: false,
      auditAsEvent: false,
      auditAsAlert: false,
    },
    auditInternalStateChanges: {
      auditToHttpChannel: false,
      auditToConsole: false,
      auditAsEvent: false,
      auditAsAlert: false,
    },
    auditTickingDataChanges: {
      auditToHttpChannel: false,
      auditToConsole: false,
      auditAsEvent: false,
      auditAsAlert: false,
    },
    pingInterval: 60,
    auditLogsSendInterval: 1,
    alertMessageType: 'Info',
    alertShowAsPopup: false,
  },
  configServerOptions: {
    enableConfigServer: false,
    configServerUrl: '',
  },
  containerOptions: {
    adaptableBlotterContainer: 'adaptableBlotter',
    vendorContainer: 'grid',
    modalContainer: undefined,
    chartContainer: undefined,
  },
  layoutOptions: {
    includeVendorStateInLayouts: true,
    autoSaveLayouts: true,
    autoSizeColumnsInDefaultLayout: false,
  },
  filterOptions: {
    indicateFilteredColumns: true,
    useAdaptableBlotterFilterForm: true,
    useVendorFilterFormStyle: true,
    useAdaptableBlotterQuickFilter: true,
    filterActionOnUserDataChange: {
      RunFilter: GeneralConstants.FILTER_ALWAYS,
      ThrottleDelay: 0,
    },
    filterActionOnExternalDataChange: {
      RunFilter: GeneralConstants.FILTER_NEVER,
      ThrottleDelay: 0,
    },
    autoApplyFilter: true,
  },
  queryOptions: {
    maxColumnValueItemsDisplayed: 2000,
    columnValuesOnlyInQueries: false,
    getColumnValues: undefined,
    ignoreCaseInQueries: true,
  },
  editOptions: {
    validateOnServer: undefined,
    displayServerValidationMessages: true,
  },
  chartOptions: {
    displayOnStartUp: false,
    showModal: false,
    pieChartMaxItems: 50,
  },
  generalOptions: {
    useDefaultVendorGridThemes: true,
    showMissingPrimaryKeyWarning: true,
    preventDuplicatePrimaryKeyValues: true,
    serverSearchOption: 'None',
    showAdaptableBlotterToolPanel: false,
    // checkIfLatestVersionOnStartup: true,
  },
  advancedOptions: {
    userFunctions: {
      namedFilterFunctions: [],
      actionColumnFunctions: [],
    },
  },
};
