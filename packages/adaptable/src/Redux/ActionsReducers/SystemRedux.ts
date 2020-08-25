import * as Redux from 'redux';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import {
  EMPTY_ARRAY,
  SYSTEM_DEFAULT_CHART_VISIBILITY,
  EMPTY_STRING,
} from '../../Utilities/Constants/GeneralConstants';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { Report } from '../../PredefinedConfig/ExportState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
import { SystemFilterId } from '../../PredefinedConfig/FilterState';

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

// Columns
export const SET_NEW_COLUMN_LIST_ORDER = 'SET_NEW_COLUMN_LIST_ORDER';

// Shortcut
export const SET_LAST_APPLIED_SHORTCUT = 'SET_LAST_APPLIED_SHORTCUT';

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
  ReportDestination: 'OpenfinExcel' | 'Glue42';
  PageName: string;
}

export interface ReportStopLiveAction extends Redux.Action {
  Report: Report;
  ReportDestination: 'OpenfinExcel' | 'Glue42';
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

export interface ReportSetErrorMessageAction extends Redux.Action {
  ErrorMessage: string;
}
export interface SetNewColumnListOrderAction extends Redux.Action {
  VisibleColumnList: string[];
}

export interface SetLastAppliedShortcutAction extends Redux.Action {
  gridCell: GridCell | undefined;
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

export const SetNewColumnListOrder = (
  VisibleColumnList: string[]
): SetNewColumnListOrderAction => ({
  type: SET_NEW_COLUMN_LIST_ORDER,
  VisibleColumnList,
});

export const SetLastAppliedShortcut = (
  gridCell: GridCell | undefined
): SetLastAppliedShortcutAction => ({
  type: SET_LAST_APPLIED_SHORTCUT,
  gridCell,
});

const initialSystemState: SystemState = {
  AdaptableAlerts: EMPTY_ARRAY,
  UpdatedRowInfos: EMPTY_ARRAY,
  IsValidSmartEditSelection: false,
  SmartEditPreviewInfo: null,
  BulkUpdateValidationResult: { IsValid: false, Column: null },
  BulkUpdatePreviewInfo: null,
  ChartData: null,
  ChartVisibility: SYSTEM_DEFAULT_CHART_VISIBILITY,
  CalculatedColumnErrorMessage: EMPTY_STRING,
  SystemReports: ObjectFactory.CreateSystemReports(),
  ReportErrorMessage: EMPTY_STRING,
  LastAppliedShortCut: null,
};

export const SystemReducer: Redux.Reducer<SystemState> = (
  state: SystemState = initialSystemState,
  action: Redux.Action
): SystemState => {
  let alerts: AdaptableAlert[];
  switch (action.type) {
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

    case SET_LAST_APPLIED_SHORTCUT: {
      return Object.assign({}, state, {
        LastAppliedShortCut: (action as SetLastAppliedShortcutAction).gridCell,
      });
    }

    default:
      return state;
  }
};
