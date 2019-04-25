import * as Redux from 'redux';
import { SystemState } from './Interface/IState';
import { ExportDestination } from '../../Utilities/Enums';
import { IPPDomain } from "../../Utilities/Interface/Reports/IPPDomain";
import { ISystemStatus } from "../../Utilities/Interface/ISystemStatus";
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ChartVisibility } from '../../Utilities/ChartEnums';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { IChartData } from "../../Utilities/Interface/BlotterObjects/Charting/IChartData";
import { IRange } from '../../Utilities/Interface/Expression/IRange';
import { Expression } from '../../Utilities/Expression';
export declare const SYSTEM_SET_HEALTH_STATUS = "SYSTEM_SET_HEALTH_STATUS";
export declare const SYSTEM_CLEAR_HEALTH_STATUS = "SYSTEM_CLEAR_HEALTH_STATUS";
export declare const SYSTEM_ALERT_ADD = "SYSTEM_ALERT_ADD";
export declare const SYSTEM_ALERT_DELETE = "SYSTEM_ALERT_DELETE";
export declare const SYSTEM_ALERT_DELETE_ALL = "SYSTEM_ALERT_DELETE_ALL";
export declare const REPORT_START_LIVE = "REPORT_START_LIVE";
export declare const REPORT_STOP_LIVE = "REPORT_STOP_LIVE";
export declare const SET_IPP_DOMAIN_PAGES = "SET_IPP_DOMAIN_PAGES";
export declare const REPORT_SET_ERROR_MESSAGE = "REPORT_SET_ERROR_MESSAGE";
export declare const SMARTEDIT_CHECK_CELL_SELECTION = "SMARTEDIT_CHECK_CELL_SELECTION";
export declare const SMARTEDIT_FETCH_PREVIEW = "SMARTEDIT_FETCH_PREVIEW";
export declare const SMARTEDIT_SET_VALID_SELECTION = "SMARTEDIT_SET_VALID_SELECTION";
export declare const SMARTEDIT_SET_PREVIEW = "SMARTEDIT_SET_PREVIEW";
export declare const BULK_UPDATE_CHECK_CELL_SELECTION = "BULK_UPDATE_CHECK_CELL_SELECTION";
export declare const BULK_UPDATE_SET_VALID_SELECTION = "BULK_UPDATE_SET_VALID_SELECTION";
export declare const BULK_UPDATE_SET_PREVIEW = "BULK_UPDATE_SET_PREVIEW";
export declare const CHART_SET_CHART_DATA = "CHART_SET_CHART_DATA";
export declare const CHART_SET_CHART_VISIBILITY = "CHART_SET_CHART_VISIBILITY";
export declare const CALCULATEDCOLUMN_SET_ERROR_MESSAGE = "CALCULATEDCOLUMN_SET_ERROR_MESSAGE";
export declare const QUICK_SEARCH_SET_RANGE = "QUICK_SEARCH_SET_RANGE";
export declare const QUICK_SEARCH_CLEAR_RANGE = "QUICK_SEARCH_CLEAR_RANGE";
export declare const QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS = "QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS";
export declare const QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS = "QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS";
export interface SystemSetHealthStatusAction extends Redux.Action {
    SystemStatus: ISystemStatus;
}
export interface SystemClearHealthStatusAction extends Redux.Action {
}
export interface SystemAlertAddAction extends Redux.Action {
    Alert: IAdaptableAlert;
    MaxAlerts: number;
}
export interface SystemAlertDeleteAction extends Redux.Action {
    Index: number;
}
export interface SystemAlertDeleteAllAction extends Redux.Action {
}
export interface ReportStartLiveAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
    WorkbookName: string;
}
export interface ReportStopLiveAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
export interface SmartEditCheckCellSelectionAction extends Redux.Action {
}
export interface SmartEditFetchPreviewAction extends Redux.Action {
}
export interface SmartEditSetPreviewAction extends Redux.Action {
    SmartEditPreviewInfo: IPreviewInfo;
}
export interface SmartEditSetValidSelectionAction extends Redux.Action {
    IsValidSmartEditSelection: boolean;
}
export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {
}
export interface BulkUpdateSetPreviewAction extends Redux.Action {
    BulkUpdatePreviewInfo: IPreviewInfo;
}
export interface BulkUpdateSetValidSelectionAction extends Redux.Action {
    IsValidBulkUpdateSelection: boolean;
}
export interface ChartSetChartDataAction extends Redux.Action {
    chartData: IChartData;
}
export interface ChartSetChartVisibiityAction extends Redux.Action {
    ChartVisibility: ChartVisibility;
}
export interface CalculatedColumnSetErrorMessageAction extends Redux.Action {
    ErrorMsg: string;
}
export interface SetIPPDomainPagesAction extends Redux.Action {
    IPPDomainsPages: IPPDomain[];
}
export interface ReportSetErrorMessageAction extends Redux.Action {
    ErrorMessage: string;
}
export interface QuickSearchSetRangeAction extends Redux.Action {
    Range: IRange;
}
export interface QuickSearchClearRangeAction extends Redux.Action {
}
export interface QuickSearchSetVisibleColumnExpressionsAction extends Redux.Action {
    Expressions: Expression[];
}
export interface QuickSearchClearVisibleColumnExpressionsAction extends Redux.Action {
}
export declare const SystemSetHealthStatus: (SystemStatus: ISystemStatus) => SystemSetHealthStatusAction;
export declare const SystemClearHealthStatus: () => SystemClearHealthStatusAction;
export declare const SystemAlertAdd: (Alert: IAdaptableAlert, MaxAlerts: number) => SystemAlertAddAction;
export declare const SystemAlertDelete: (Index: number) => SystemAlertDeleteAction;
export declare const SystemAlertDeleteAll: () => SystemAlertDeleteAllAction;
export declare const ReportStartLive: (Report: string, WorkbookName: string, ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => ReportStartLiveAction;
export declare const ReportStopLive: (Report: string, ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => ReportStopLiveAction;
export declare const SmartEditCheckCellSelection: () => SmartEditCheckCellSelectionAction;
export declare const SmartEditSetValidSelection: (IsValidSmartEditSelection: boolean) => SmartEditSetValidSelectionAction;
export declare const SmartEditSetPreview: (SmartEditPreviewInfo: IPreviewInfo) => SmartEditSetPreviewAction;
export declare const BulkUpdateCheckCellSelection: () => BulkUpdateCheckCellSelectionAction;
export declare const BulkUpdateSetValidSelection: (IsValidBulkUpdateSelection: boolean) => BulkUpdateSetValidSelectionAction;
export declare const BulkUpdateSetPreview: (BulkUpdatePreviewInfo: IPreviewInfo) => BulkUpdateSetPreviewAction;
export declare const ChartSetChartData: (chartData: IChartData) => ChartSetChartDataAction;
export declare const ChartSetChartVisibility: (ChartVisibility: ChartVisibility) => ChartSetChartVisibiityAction;
export declare const CalculatedColumnSetErrorMessage: (ErrorMsg: string) => CalculatedColumnSetErrorMessageAction;
export declare const SetIPPDomainPages: (IPPDomainsPages: IPPDomain[]) => SetIPPDomainPagesAction;
export declare const ReportSetErrorMessage: (ErrorMessage: string) => ReportSetErrorMessageAction;
export declare const QuickSearchSetRange: (Range: IRange) => QuickSearchSetRangeAction;
export declare const QuickSearchClearRange: () => QuickSearchClearRangeAction;
export declare const QuickSearchSetVisibleColumnExpressions: (Expressions: Expression[]) => QuickSearchSetVisibleColumnExpressionsAction;
export declare const QuickSearchClearVisibleColumnExpressions: () => QuickSearchClearVisibleColumnExpressionsAction;
export declare const SystemReducer: Redux.Reducer<SystemState>;
