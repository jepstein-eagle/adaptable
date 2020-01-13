import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableOptions } from '../../AdaptableOptions/AdaptableOptions';

export const DefaultAdaptableOptions: AdaptableOptions = {
  vendorGrid: null,
  primaryKey: '',
  userName: GeneralConstants.USER_NAME,
  adaptableId: GeneralConstants.ADAPTABLE_ID,
  predefinedConfig: undefined,
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
    auditTickingDataUpdates: {
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
    adaptableContainer: 'adaptable',
    vendorContainer: 'grid',
    modalContainer: undefined,
    chartContainer: undefined,
  },
  layoutOptions: {
    includeVendorStateInLayouts: true,
    autoSaveLayouts: true,
    autoSizeColumnsInLayout: false,
    autoSizeColumnsInPivotLayout: false,
  },
  filterOptions: {
    indicateFilteredColumns: true,
    useAdaptableFilterForm: true,
    useVendorFilterFormStyle: true,
    useAdaptableQuickFilter: true,
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
    showMissingPrimaryKeyWarning: true,
    preventDuplicatePrimaryKeyValues: true,
  },
  searchOptions: {
    serverSearchOption: 'None',
  },
  userInterfaceOptions: {
    useDefaultVendorGridThemes: true,
    showAdaptableToolPanel: false,
    showAdaptableContextMenu: true,
    adaptableToolPanelTitle: GeneralConstants.ADAPTABLE,
  },
  exportOptions: {
    exportColumnRawValue: null,
  },
  stateOptions: {
    applyState: state => state,
    saveState: state => state,
  },
};
