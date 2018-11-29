import * as Redux from 'redux';
import { SystemState } from './Interface/IState';
import { ISystemStatus } from '../../Core/Interface/Interfaces';
import { IAlert } from '../../Core/Interface/IMessage';
import { ExportDestination } from '../../Utilities/Enums';
import { IPreviewInfo } from '../../Core/Interface/IPreview';
export declare const SYSTEM_SET_HEALTH_STATUS = "SYSTEM_SET_HEALTH_STATUS";
export declare const SYSTEM_CLEAR_HEALTH_STATUS = "SYSTEM_CLEAR_HEALTH_STATUS";
export declare const SYSTEM_ALERT_ADD = "SYSTEM_ALERT_ADD";
export declare const SYSTEM_ALERT_DELETE = "SYSTEM_ALERT_DELETE";
export declare const SYSTEM_ALERT_DELETE_ALL = "SYSTEM_ALERT_DELETE_ALL";
export declare const REPORT_START_LIVE = "REPORT_START_LIVE";
export declare const REPORT_STOP_LIVE = "REPORT_STOP_LIVE";
export declare const SMARTEDIT_CHECK_CELL_SELECTION = "SMARTEDIT_CHECK_CELL_SELECTION";
export declare const SMARTEDIT_FETCH_PREVIEW = "SMARTEDIT_FETCH_PREVIEW";
export declare const SMARTEDIT_SET_VALID_SELECTION = "SMARTEDIT_SET_VALID_SELECTION";
export declare const SMARTEDIT_SET_PREVIEW = "SMARTEDIT_SET_PREVIEW";
export declare const BULK_UPDATE_CHECK_CELL_SELECTION = "BULK_UPDATE_CHECK_CELL_SELECTION";
export declare const BULK_UPDATE_SET_VALID_SELECTION = "BULK_UPDATE_SET_VALID_SELECTION";
export declare const BULK_UPDATE_SET_PREVIEW = "BULK_UPDATE_SET_PREVIEW";
export interface SystemSetHealthStatusAction extends Redux.Action {
    SystemStatus: ISystemStatus;
}
export interface SystemClearHealthStatusAction extends Redux.Action {
}
export interface SystemAlertAddAction extends Redux.Action {
    Alert: IAlert;
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
export declare const SystemSetHealthStatus: (SystemStatus: ISystemStatus) => SystemSetHealthStatusAction;
export declare const SystemClearHealthStatus: () => SystemClearHealthStatusAction;
export declare const SystemAlertAdd: (Alert: IAlert, MaxAlerts: number) => SystemAlertAddAction;
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
export declare const SystemReducer: Redux.Reducer<SystemState>;
