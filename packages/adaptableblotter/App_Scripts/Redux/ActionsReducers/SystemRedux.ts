import * as Redux from 'redux';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { CalendarHelper } from '../../Utilities/Helpers/CalendarHelper';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import {
  EMPTY_ARRAY,
  SYSTEM_DEFAULT_CHART_VISIBILITY,
  EMPTY_STRING,
} from '../../Utilities/Constants/GeneralConstants';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { Expression, QueryRange } from '../../PredefinedConfig/Common/Expression';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { Report } from '../../PredefinedConfig/ExportState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IStrategyActionReturn';
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { IPP_LOGIN_FAILED, IPPLoginFailedAction, IPP_LOGIN } from './ExportRedux';
import { IPushPullDomain } from '../../PredefinedConfig/PartnerState';
import { LiveReport } from '../../Api/Events/LiveReportUpdated';

/*
Bit of a mixed bag of actions but essentially its those that are related to Strategies but where we DONT want to persist state
This allows us to keep the other reducers pure in terms of everything persists
Not sure if its a good idea or not and perhaps we need 2 stores but I think its better than it was...
*/

// Alerts
export const SYSTEM_ALERT_ADD = 'SYSTEM_ALERT_ADD';
export const SYSTEM_ALERT_DELETE = 'SYSTEM_ALERT_DELETE';
export const SYSTEM_ALERT_DELETE_ALL = 'SYSTEM_ALERT_DELETE_ALL';

// Updated Row
export const SYSTEM_UPDATED_ROW_ADD = 'SYSTEM_UPDATED_ROW_ADD';
export const SYSTEM_UPDATED_ROW_DELETE = 'SYSTEM_UPDATED_ROW_DELETE';
export const SYSTEM_UPDATED_ROW_DELETE_ALL = 'SYSTEM_UPDATED_ROW_DELETE_ALL';

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

export interface SystemAlertAddAction extends Redux.Action {
  Alert: AdaptableAlert;
  MaxAlerts: number;
}

export interface SystemAlertDeleteAction extends Redux.Action {
  Alert: AdaptableAlert;
}

export interface SystemAlertDeleteAllAction extends Redux.Action {
  Alerts: AdaptableAlert[];
}

export interface SystemUpdatedRowAddAction extends Redux.Action {
  updatedRowInfo: UpdatedRowInfo;
}

export interface SystemUpdatedRowDeleteAction extends Redux.Action {
  updatedRowInfo: UpdatedRowInfo;
}

export interface SystemUpdatedRowDeleteAllAction extends Redux.Action {
  updatedRowInfos: UpdatedRowInfo[];
}

export interface ReportStartLiveAction extends Redux.Action {
  Report: Report;
  ExportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42;
  PageName: string;
}

export interface ReportStopLiveAction extends Redux.Action {
  Report: Report;
  ExportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42;
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

export interface SetIPushPullDomainsPagesAction extends Redux.Action {
  IPushPullDomainsPages: IPushPullDomain[];
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
  VisibleColumnList: Array<AdaptableBlotterColumn>;
}

export const SystemAlertAdd = (Alert: AdaptableAlert, MaxAlerts: number): SystemAlertAddAction => ({
  type: SYSTEM_ALERT_ADD,
  Alert,
  MaxAlerts,
});

export const SystemAlertDelete = (Alert: AdaptableAlert): SystemAlertDeleteAction => ({
  type: SYSTEM_ALERT_DELETE,
  Alert,
});

export const SystemAlertDeleteAll = (Alerts: AdaptableAlert[]): SystemAlertDeleteAllAction => ({
  type: SYSTEM_ALERT_DELETE_ALL,
  Alerts,
});

export const SystemUpdatedRowAdd = (updatedRowInfo: UpdatedRowInfo): SystemUpdatedRowAddAction => ({
  type: SYSTEM_UPDATED_ROW_ADD,
  updatedRowInfo,
});

export const SystemUpdatedRowDelete = (
  updatedRowInfo: UpdatedRowInfo
): SystemUpdatedRowDeleteAction => ({
  type: SYSTEM_UPDATED_ROW_DELETE,
  updatedRowInfo,
});

export const SystemUpdatedRowDeleteAll = (
  updatedRowInfos: UpdatedRowInfo[]
): SystemUpdatedRowDeleteAllAction => ({
  type: SYSTEM_UPDATED_ROW_DELETE_ALL,
  updatedRowInfos,
});

export const ReportStartLive = (
  Report: Report,
  PageName: string,
  ExportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42
): ReportStartLiveAction => ({
  type: REPORT_START_LIVE,
  Report,
  ExportDestination,
  PageName,
});

export const ReportStopLive = (
  Report: Report,
  ExportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42
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

export const SetIPushPullDomainsPages = (
  IPushPullDomainsPages: IPushPullDomain[]
): SetIPushPullDomainsPagesAction => {
  return {
    type: SET_IPP_DOMAIN_PAGES,
    IPushPullDomainsPages,
  };
};

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
  VisibleColumnList: Array<AdaptableBlotterColumn>
): SetNewColumnListOrderAction => ({
  type: SET_NEW_COLUMN_LIST_ORDER,
  VisibleColumnList,
});

const initialSystemState: SystemState = {
  AdaptableAlerts: EMPTY_ARRAY,
  UpdatedRowInfos: EMPTY_ARRAY,
  AvailableCalendars: CalendarHelper.getSystemCalendars(),
  CurrentLiveReports: EMPTY_ARRAY,
  IsValidSmartEditSelection: false,
  SmartEditPreviewInfo: null,
  BulkUpdateValidationResult: { IsValid: false, Column: null },
  BulkUpdatePreviewInfo: null,
  ChartData: null,
  ChartVisibility: SYSTEM_DEFAULT_CHART_VISIBILITY,
  CalculatedColumnErrorMessage: EMPTY_STRING,
  IPushPullDomainsPages: EMPTY_ARRAY,
  SystemReports: ObjectFactory.CreateSystemReports(),
  ReportErrorMessage: EMPTY_STRING,
  QuickSearchRange: ExpressionHelper.CreateEmptyRange(),
  QuickSearchVisibleColumnExpressions: EMPTY_ARRAY,
};

export const SystemReducer: Redux.Reducer<SystemState> = (
  state: SystemState = initialSystemState,
  action: Redux.Action
): SystemState => {
  let alerts: AdaptableAlert[];
  switch (action.type) {
    case IPP_LOGIN: {
      return { ...state, IPPLoginMessage: undefined };
    }
    case IPP_LOGIN_FAILED: {
      return { ...state, IPPLoginMessage: (action as IPPLoginFailedAction).Message };
    }
    case SYSTEM_ALERT_ADD: {
      const actionTypedAdd = action as SystemAlertAddAction;
      alerts = [].concat(state.AdaptableAlerts);
      if (alerts.length == actionTypedAdd.MaxAlerts) {
        // we have hit the maximum so remove first item (oldest)
        alerts.splice(0, 1);
      }
      alerts.push(actionTypedAdd.Alert);
      return Object.assign({}, state, { AdaptableAlerts: alerts });
    }
    case SYSTEM_ALERT_DELETE: {
      const adaptableAlert: AdaptableAlert = (action as SystemAlertDeleteAction).Alert;
      return {
        ...state,
        AdaptableAlerts: state.AdaptableAlerts.filter(
          abObject => abObject.Uuid !== adaptableAlert.Uuid
        ),
      };
    }
    case SYSTEM_ALERT_DELETE_ALL: {
      return Object.assign({}, state, { AdaptableAlerts: [] });
    }

    case SYSTEM_UPDATED_ROW_ADD: {
      const actionTypedAdd = action as SystemUpdatedRowAddAction;
      let updatedRowPrimaryKeyValues: UpdatedRowInfo[] = [].concat(state.UpdatedRowInfos);
      let existingItem: UpdatedRowInfo = updatedRowPrimaryKeyValues.find(
        ur => ur.primaryKeyValue == actionTypedAdd.updatedRowInfo.primaryKeyValue
      );
      if (existingItem) {
        existingItem.changeDirection = actionTypedAdd.updatedRowInfo.changeDirection;
      } else {
        updatedRowPrimaryKeyValues.push(actionTypedAdd.updatedRowInfo);
      }
      return Object.assign({}, state, { UpdatedRowInfos: updatedRowPrimaryKeyValues });
    }
    case SYSTEM_UPDATED_ROW_DELETE: {
      const primaryKeyValue: any = (action as SystemUpdatedRowDeleteAction).updatedRowInfo
        .primaryKeyValue;
      let updatedRowPrimaryKeyValues = state.UpdatedRowInfos.filter(
        pkValue => pkValue.primaryKeyValue !== primaryKeyValue
      );
      return {
        ...state,
        UpdatedRowInfos: updatedRowPrimaryKeyValues,
      };
    }

    case SYSTEM_UPDATED_ROW_DELETE_ALL: {
      return Object.assign({}, state, { UpdatedRowInfos: [] });
    }

    case REPORT_START_LIVE: {
      const actionTyped = action as ReportStartLiveAction;
      const currentLiveReports: LiveReport[] = [].concat(state.CurrentLiveReports);
      currentLiveReports.push({
        ExportDestination: actionTyped.ExportDestination,
        Report: actionTyped.Report,
        PageName: actionTyped.PageName,
      });
      return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
    }
    case REPORT_STOP_LIVE: {
      const actionTyped = action as ReportStopLiveAction;
      const currentLiveReports: LiveReport[] = [].concat(state.CurrentLiveReports);
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
        IPushPullDomainsPages: (action as SetIPushPullDomainsPagesAction).IPushPullDomainsPages,
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
