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
    httpChannel: '/auditlog',
    pingInterval: 60,
    auditLogsSendInterval: 1,
    alertMessageType: 'Info',
    alertShowAsPopup: false,
  },
  containerOptions: {
    adaptableContainer: 'adaptable',
    vendorContainer: 'grid',
    modalContainer: undefined,
    chartContainer: undefined,
  },
  layoutOptions: {
    includeExpandedRowGroups: false,
    autoSaveLayouts: true,
    autoSizeColumnsInLayout: false,
    autoSizeColumnsInPivotLayout: false,
    createDefaultLayout: false,
  },
  filterOptions: {
    indicateFilteredColumns: true,
    useAdaptableFilterForm: true,
    useVendorFilterFormStyle: true,
    useAdaptableQuickFilter: true,
    clearFiltersOnStartUp: false,
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
    showMissingColumnsWarning: true,
    preventDuplicatePrimaryKeyValues: true,
    showGroupingTotalsAsHeader: false,
  },
  searchOptions: {
    serverSearchOptions: undefined,
    clearSearchesOnStartUp: false,
  },
  userInterfaceOptions: {
    useCustomMacLikeScrollbars: false,
    showAdaptableToolPanel: true,
    showAdaptableContextMenu: true,
    adaptableToolPanelTitle: GeneralConstants.ADAPTABLE,
    showUngroupColumnMenuItem: true,
  },
  exportOptions: {
    exportColumnRawValue: undefined,
  },
  stateOptions: {
    applyState: state => state,
    saveState: state => state,
  },
  teamSharingOptions: {
    enableTeamSharing: false,
    setSharedEntities: undefined,
    getSharedEntities: undefined,
  },
  customPredicateDefs: [],
};
