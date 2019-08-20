import * as Redux from 'redux';
import { SystemState } from '../../PredefinedConfig/InternalState/SystemState';
import { CalendarHelper } from '../../Utilities/Helpers/CalendarHelper';
import { ExportDestination, MessageType } from '../../PredefinedConfig/Common/Enums';
import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { ISystemStatus } from '../../Utilities/Interface/ISystemStatus';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import {
  EMPTY_ARRAY,
  SYSTEM_DEFAULT_CHART_VISIBILITY,
  EMPTY_STRING,
} from '../../Utilities/Constants/GeneralConstants';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ReportHelper } from '../../Utilities/Helpers/ReportHelper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { Expression } from '../../PredefinedConfig/Common/Expression/Expression';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { ChartData } from '../../PredefinedConfig/RunTimeState/ChartState';
import { QueryRange } from '../../PredefinedConfig/Common/Expression/QueryRange';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IStrategyActionReturn';

/*
Bit of a mixed bag of actions but essentially its those that are related to Strategies but where we DONT want to persist state
This allows us to keep the other reducers pure in terms of everything persists
Not sure if its a good idea or not and perhaps we need 2 stores but I think its better than it was...
*/

// Health Status
export const SYSTEM_SET_HEALTH_STATUS = 'SYSTEM_SET_HEALTH_STATUS';
export const SYSTEM_CLEAR_HEALTH_STATUS = 'SYSTEM_CLEAR_HEALTH_STATUS';

// Alerts
export const SYSTEM_ALERT_ADD = 'SYSTEM_ALERT_ADD';
export const SYSTEM_ALERT_DELETE = 'SYSTEM_ALERT_DELETE';
export const SYSTEM_ALERT_DELETE_ALL = 'SYSTEM_ALERT_DELETE_ALL';

// Live Reports
export const REPORT_START_LIVE = 'REPORT_START_LIVE';
export const REPORT_STOP_LIVE = 'REPORT_STOP_LIVE';
export const SET_IPP_DOMAIN_PAGES = 'SET_IPP_DOMAIN_PAGES';
export const REPORT_SET_ERROR_MESSAGE = 'REPORT_SET_ERROR_MESSAGE';

// Smart Edit
export const SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
export const SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
export const SMARTEDIT_SET_VALID_SELECTION = 'SMARTEDIT_SET_VALID_SELECTION';
export const SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';

// Bulk Update
export const BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
export const BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
export const BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';

// Chart Managemet
export const CHART_SET_CHART_DATA = 'CHART_SET_CHART_DATA';
export const CHART_SET_CHART_VISIBILITY = 'CHART_SET_CHART_VISIBILITY';

// Error Messages
export const CALCULATEDCOLUMN_SET_ERROR_MESSAGE = 'CALCULATEDCOLUMN_SET_ERROR_MESSAGE';
export const CALCULATEDCOLUMN_IS_EXPRESSION_VALID = 'CALCULATEDCOLUMN_IS_EXPRESSION_VALID';

// Quick Search
export const QUICK_SEARCH_SET_RANGE = 'QUICK_SEARCH_SET_RANGE';
export const QUICK_SEARCH_CLEAR_RANGE = 'QUICK_SEARCH_CLEAR_RANGE';
export const QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS =
  'QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS';
export const QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS =
  'QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS';

// Columns
export const SET_NEW_COLUMN_LIST_ORDER = 'SET_NEW_COLUMN_LIST_ORDER';

export interface SystemSetHealthStatusAction extends Redux.Action {
  SystemStatus: ISystemStatus;
}

export interface SystemClearHealthStatusAction extends Redux.Action {}

export interface SystemAlertAddAction extends Redux.Action {
  Alert: IAdaptableAlert;
  MaxAlerts: number;
}

export interface SystemAlertDeleteAction extends Redux.Action {
  Index: number;
}

export interface SystemAlertDeleteAllAction extends Redux.Action {}

export interface ReportStartLiveAction extends Redux.Action {
  Report: Report;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
  WorkbookName: string;
}

export interface ReportStopLiveAction extends Redux.Action {
  Report: Report;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}

export interface SmartEditCheckCellSelectionAction extends Redux.Action {}

export interface SmartEditFetchPreviewAction extends Redux.Action {}

export interface SmartEditSetPreviewAction extends Redux.Action {
  SmartEditPreviewInfo: IPreviewInfo;
}

export interface SmartEditSetValidSelectionAction extends Redux.Action {
  IsValidSmartEditSelection: boolean;
}

export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {}

export interface BulkUpdateSetPreviewAction extends Redux.Action {
  BulkUpdatePreviewInfo: IPreviewInfo;
}

export interface BulkUpdateSetValidSelectionAction extends Redux.Action {
  bulkUpdateValidationResult: BulkUpdateValidationResult;
}

export interface ChartSetChartDataAction extends Redux.Action {
  chartData: ChartData;
}

export interface ChartSetChartVisibiityAction extends Redux.Action {
  ChartVisibility: ChartVisibility;
}

export interface CalculatedColumnSetErrorMessageAction extends Redux.Action {
  ErrorMsg: string;
}

export interface CalculatedColumnIsExpressionValidAction extends Redux.Action {
  expression: string;
}

export interface SetIPPDomainPagesAction extends Redux.Action {
  IPPDomainsPages: IPPDomain[];
}

export interface ReportSetErrorMessageAction extends Redux.Action {
  ErrorMessage: string;
}
export interface QuickSearchSetRangeAction extends Redux.Action {
  QueryRange: QueryRange;
}
export interface QuickSearchClearRangeAction extends Redux.Action {}
export interface QuickSearchSetVisibleColumnExpressionsAction extends Redux.Action {
  Expressions: Expression[];
}
export interface QuickSearchClearVisibleColumnExpressionsAction extends Redux.Action {}

export interface SetNewColumnListOrderAction extends Redux.Action {
  VisibleColumnList: Array<IColumn>;
}

export const SystemSetHealthStatus = (
  SystemStatus: ISystemStatus
): SystemSetHealthStatusAction => ({
  type: SYSTEM_SET_HEALTH_STATUS,
  SystemStatus,
});

export const SystemClearHealthStatus = (): SystemClearHealthStatusAction => ({
  type: SYSTEM_CLEAR_HEALTH_STATUS,
});

export const SystemAlertAdd = (
  Alert: IAdaptableAlert,
  MaxAlerts: number
): SystemAlertAddAction => ({
  type: SYSTEM_ALERT_ADD,
  Alert,
  MaxAlerts,
});

export const SystemAlertDelete = (Index: number): SystemAlertDeleteAction => ({
  type: SYSTEM_ALERT_DELETE,
  Index,
});

export const SystemAlertDeleteAll = (): SystemAlertDeleteAllAction => ({
  type: SYSTEM_ALERT_DELETE_ALL,
});

export const ReportStartLive = (
  Report: Report,
  WorkbookName: string,
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
): ReportStartLiveAction => ({
  type: REPORT_START_LIVE,
  Report,
  ExportDestination,
  WorkbookName,
});

export const ReportStopLive = (
  Report: Report,
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
): ReportStopLiveAction => ({
  type: REPORT_STOP_LIVE,
  Report,
  ExportDestination,
});

export const SmartEditCheckCellSelection = (): SmartEditCheckCellSelectionAction => ({
  type: SMARTEDIT_CHECK_CELL_SELECTION,
});

export const SmartEditSetValidSelection = (
  IsValidSmartEditSelection: boolean
): SmartEditSetValidSelectionAction => ({
  type: SMARTEDIT_SET_VALID_SELECTION,
  IsValidSmartEditSelection,
});

export const SmartEditSetPreview = (
  SmartEditPreviewInfo: IPreviewInfo
): SmartEditSetPreviewAction => ({
  type: SMARTEDIT_SET_PREVIEW,
  SmartEditPreviewInfo,
});

export const BulkUpdateCheckCellSelection = (): BulkUpdateCheckCellSelectionAction => ({
  type: BULK_UPDATE_CHECK_CELL_SELECTION,
});

export const BulkUpdateSetValidSelection = (
  bulkUpdateValidationResult: BulkUpdateValidationResult
): BulkUpdateSetValidSelectionAction => ({
  type: BULK_UPDATE_SET_VALID_SELECTION,
  bulkUpdateValidationResult,
});

export const BulkUpdateSetPreview = (
  BulkUpdatePreviewInfo: IPreviewInfo
): BulkUpdateSetPreviewAction => ({
  type: BULK_UPDATE_SET_PREVIEW,
  BulkUpdatePreviewInfo,
});

export const ChartSetChartData = (chartData: ChartData): ChartSetChartDataAction => ({
  type: CHART_SET_CHART_DATA,
  chartData,
});

export const ChartSetChartVisibility = (
  ChartVisibility: ChartVisibility
): ChartSetChartVisibiityAction => ({
  type: CHART_SET_CHART_VISIBILITY,
  ChartVisibility,
});

export const CalculatedColumnSetErrorMessage = (
  ErrorMsg: string
): CalculatedColumnSetErrorMessageAction => ({
  type: CALCULATEDCOLUMN_SET_ERROR_MESSAGE,
  ErrorMsg,
});

export const CalculatedColumnIsExpressionValid = (
  expression: string
): CalculatedColumnIsExpressionValidAction => ({
  type: CALCULATEDCOLUMN_IS_EXPRESSION_VALID,
  expression,
});

export const SetIPPDomainPages = (IPPDomainsPages: IPPDomain[]): SetIPPDomainPagesAction => ({
  type: SET_IPP_DOMAIN_PAGES,
  IPPDomainsPages,
});

export const ReportSetErrorMessage = (ErrorMessage: string): ReportSetErrorMessageAction => ({
  type: REPORT_SET_ERROR_MESSAGE,
  ErrorMessage,
});
export const QuickSearchSetRange = (QueryRange: QueryRange): QuickSearchSetRangeAction => ({
  type: QUICK_SEARCH_SET_RANGE,
  QueryRange,
});

export const QuickSearchClearRange = (): QuickSearchClearRangeAction => ({
  type: QUICK_SEARCH_CLEAR_RANGE,
});
export const QuickSearchSetVisibleColumnExpressions = (
  Expressions: Expression[]
): QuickSearchSetVisibleColumnExpressionsAction => ({
  type: QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS,
  Expressions,
});

export const QuickSearchClearVisibleColumnExpressions = (): QuickSearchClearVisibleColumnExpressionsAction => ({
  type: QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS,
});

export const SetNewColumnListOrder = (
  VisibleColumnList: Array<IColumn>
): SetNewColumnListOrderAction => ({
  type: SET_NEW_COLUMN_LIST_ORDER,
  VisibleColumnList,
});

const initialSystemState: SystemState = {
  SystemStatus: { StatusMessage: 'All good', StatusType: MessageType.Success }, // SYSTEM_DEFAULT_SYSTEM_STATUS_TYPE
  Alerts: EMPTY_ARRAY,
  AvailableCalendars: CalendarHelper.getSystemCalendars(),
  CurrentLiveReports: EMPTY_ARRAY,
  IsValidSmartEditSelection: false,
  SmartEditPreviewInfo: null,
  BulkUpdateValidationResult: { IsValid: false, Column: null },
  BulkUpdatePreviewInfo: null,
  ChartData: null,
  ChartVisibility: SYSTEM_DEFAULT_CHART_VISIBILITY,
  CalculatedColumnErrorMessage: EMPTY_STRING,
  IPPDomainsPages: EMPTY_ARRAY,
  SystemReports: ReportHelper.CreateSystemReports(),
  ReportErrorMessage: EMPTY_STRING,
  QuickSearchRange: ExpressionHelper.CreateEmptyRange(),
  QuickSearchVisibleColumnExpressions: EMPTY_ARRAY,
};

export const SystemReducer: Redux.Reducer<SystemState> = (
  state: SystemState = initialSystemState,
  action: Redux.Action
): SystemState => {
  let alerts: IAdaptableAlert[];
  switch (action.type) {
    case SYSTEM_SET_HEALTH_STATUS:
      return Object.assign({}, state, {
        SystemStatus: (action as SystemSetHealthStatusAction).SystemStatus,
      });
    case SYSTEM_CLEAR_HEALTH_STATUS:
      return Object.assign({}, state, {
        SystemStatus: { StatusMessage: '', StatusType: 'Success' },
      });
    case SYSTEM_ALERT_ADD: {
      const actionTypedAdd = action as SystemAlertAddAction;
      alerts = [].concat(state.Alerts);
      if (alerts.length == actionTypedAdd.MaxAlerts) {
        // we have hit the maximum so remove first item (oldest)
        alerts.splice(0, 1);
      }
      alerts.push(actionTypedAdd.Alert);
      return Object.assign({}, state, { Alerts: alerts });
    }
    case SYSTEM_ALERT_DELETE: {
      const actionTypedDelete = action as SystemAlertDeleteAction;
      alerts = [].concat(state.Alerts);
      alerts.splice(actionTypedDelete.Index, 1);
      return Object.assign({}, state, { Alerts: alerts });
    }
    case SYSTEM_ALERT_DELETE_ALL: {
      return Object.assign({}, state, { Alerts: [] });
    }
    case REPORT_START_LIVE: {
      const actionTyped = action as ReportStartLiveAction;
      const currentLiveReports: ILiveReport[] = [].concat(state.CurrentLiveReports);
      currentLiveReports.push({
        ExportDestination: actionTyped.ExportDestination,
        Report: actionTyped.Report,
        WorkbookName: actionTyped.WorkbookName,
      });
      return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
    }
    case REPORT_STOP_LIVE: {
      const actionTyped = action as ReportStopLiveAction;
      const currentLiveReports: ILiveReport[] = [].concat(state.CurrentLiveReports);
      const index = currentLiveReports.findIndex(
        x => x.Report == actionTyped.Report && x.ExportDestination == actionTyped.ExportDestination
      );
      currentLiveReports.splice(index, 1);
      return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
    }
    case SMARTEDIT_SET_VALID_SELECTION:
      return Object.assign({}, state, {
        IsValidSmartEditSelection: (action as SmartEditSetValidSelectionAction)
          .IsValidSmartEditSelection,
      });
    case SMARTEDIT_SET_PREVIEW:
      return Object.assign({}, state, {
        SmartEditPreviewInfo: (action as SmartEditSetPreviewAction).SmartEditPreviewInfo,
      });
    case BULK_UPDATE_SET_VALID_SELECTION:
      return Object.assign({}, state, {
        BulkUpdateValidationResult: (action as BulkUpdateSetValidSelectionAction)
          .bulkUpdateValidationResult,
      });
    case BULK_UPDATE_SET_PREVIEW:
      return Object.assign({}, state, {
        BulkUpdatePreviewInfo: (action as BulkUpdateSetPreviewAction).BulkUpdatePreviewInfo,
      });

    // Chart Actions
    case CHART_SET_CHART_DATA:
      return Object.assign({}, state, { ChartData: (action as ChartSetChartDataAction).chartData });

    case CHART_SET_CHART_VISIBILITY:
      return Object.assign({}, state, {
        ChartVisibility: (action as ChartSetChartVisibiityAction).ChartVisibility,
      });

    case CALCULATEDCOLUMN_SET_ERROR_MESSAGE: {
      return Object.assign({}, state, {
        CalculatedColumnErrorMessage: (action as CalculatedColumnSetErrorMessageAction).ErrorMsg,
      });
    }
    case SET_IPP_DOMAIN_PAGES: {
      return Object.assign({}, state, {
        IPPDomainsPages: (action as SetIPPDomainPagesAction).IPPDomainsPages,
      });
    }
    case REPORT_SET_ERROR_MESSAGE: {
      return Object.assign({}, state, {
        ReportErrorMessage: (action as ReportSetErrorMessageAction).ErrorMessage,
      });
    }
    case QUICK_SEARCH_SET_RANGE: {
      return Object.assign({}, state, {
        QuickSearchRange: (action as QuickSearchSetRangeAction).QueryRange,
      });
    }
    case QUICK_SEARCH_CLEAR_RANGE: {
      return Object.assign({}, state, { QuickSearchRange: ExpressionHelper.CreateEmptyRange() });
    }
    case QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS: {
      return Object.assign({}, state, {
        QuickSearchVisibleColumnExpressions: (action as QuickSearchSetVisibleColumnExpressionsAction)
          .Expressions,
      });
    }
    case QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS: {
      return Object.assign({}, state, { QuickSearchVisibleColumnExpressions: EMPTY_ARRAY });
    }

    default:
      return state;
  }
};
