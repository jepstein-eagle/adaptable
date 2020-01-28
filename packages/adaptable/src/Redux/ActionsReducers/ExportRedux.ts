import { ExportState, Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const REPORT_SELECT = 'REPORT_SELECT';
export const REPORT_ADD = 'REPORT_ADD';
export const REPORT_EDIT = 'REPORT_EDIT';
export const REPORT_DELETE = 'REPORT_DELETE';

export const REPORT_SCHEDULE_ADD = 'REPORT_SCHEDULE_ADD';
export const REPORT_SCHEDULE_EDIT = 'REPORT_SCHEDULE_EDIT';
export const REPORT_SCHEDULE_DELETE = 'REPORT_SCHEDULE_DELETE';

export interface ExportApplyAction extends Redux.Action {
  Report: Report;
  ExportDestination: ExportDestination;
}

export interface ReportAction extends Redux.Action {
  report: Report;
}

export interface ReportSelectAction extends Redux.Action {
  SelectedReport: string;
}

export interface ReportAddAction extends ReportAction {}

export interface ReportEditAction extends ReportAction {}

export interface ReportDeleteAction extends ReportAction {}

export interface ReportScheduleAction extends Redux.Action {
  reportSchedule: ReportSchedule;
}
export interface ReportScheduleAddAction extends ReportScheduleAction {}
export interface ReportScheduleEditAction extends ReportScheduleAction {}
export interface ReportScheduleDeleteAction extends ReportScheduleAction {}

export const ReportSelect = (SelectedReport: string): ReportSelectAction => ({
  type: REPORT_SELECT,
  SelectedReport,
});

export const ReportAdd = (report: Report): ReportAddAction => ({
  type: REPORT_ADD,
  report,
});

export const ReportEdit = (report: Report): ReportEditAction => ({
  type: REPORT_EDIT,
  report,
});

export const ReportDelete = (report: Report): ReportDeleteAction => ({
  type: REPORT_DELETE,
  report,
});

// Report
export const ReportScheduleAdd = (reportSchedule: ReportSchedule): ReportScheduleAddAction => ({
  type: REPORT_SCHEDULE_ADD,
  reportSchedule,
});

export const ReportScheduleEdit = (reportSchedule: ReportSchedule): ReportScheduleEditAction => ({
  type: REPORT_SCHEDULE_EDIT,
  reportSchedule,
});
export const ReportScheduleDelete = (
  reportSchedule: ReportSchedule
): ReportScheduleDeleteAction => ({
  type: REPORT_SCHEDULE_DELETE,
  reportSchedule,
});

export const ExportApply = (
  Report: Report,
  ExportDestination: ExportDestination
): ExportApplyAction => ({
  type: EXPORT_APPLY,
  Report,
  ExportDestination,
});

const initialExportState: ExportState = {
  Reports: EMPTY_ARRAY,
  CurrentReport: EMPTY_STRING,
  ReportSchedules: EMPTY_ARRAY,
};

export const ExportReducer: Redux.Reducer<ExportState> = (
  state: ExportState = initialExportState,
  action: Redux.Action
): ExportState => {
  let reports: Report[];
  let reportSchedules: ReportSchedule[];

  switch (action.type) {
    case REPORT_SELECT:
      return Object.assign({}, state, {
        CurrentReport: (action as ReportSelectAction).SelectedReport,
      });

    case REPORT_ADD: {
      const actionReport: Report = (action as ReportAction).report;

      if (!actionReport.Uuid) {
        actionReport.Uuid = createUuid();
      }
      reports = [].concat(state.Reports);
      reports.push(actionReport);
      return { ...state, Reports: reports };
    }

    case REPORT_EDIT:
      const actionReport: Report = (action as ReportAction).report;
      return {
        ...state,
        Reports: state.Reports.map(abObject =>
          abObject.Uuid === actionReport.Uuid ? actionReport : abObject
        ),
      };

    case REPORT_DELETE: {
      const actionReport: Report = (action as ReportAction).report;
      return {
        ...state,
        Reports: state.Reports.filter(abObject => abObject.Uuid !== actionReport.Uuid),
      };
    }

    case REPORT_SCHEDULE_ADD: {
      const actionSchedule: ReportSchedule = (action as ReportScheduleAction).reportSchedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      reportSchedules = [].concat(state.ReportSchedules);
      reportSchedules.push(actionSchedule);
      return { ...state, ReportSchedules: reportSchedules };
    }
    case REPORT_SCHEDULE_EDIT: {
      const actionSchedule: ReportSchedule = (action as ReportScheduleAction).reportSchedule;
      return {
        ...state,
        ReportSchedules: state.ReportSchedules.map(abObject =>
          abObject.Uuid === actionSchedule.Uuid ? actionSchedule : abObject
        ),
      };
    }
    case REPORT_SCHEDULE_DELETE: {
      const actionSchedule: ReportSchedule = (action as ReportScheduleAction).reportSchedule;
      return {
        ...state,
        ReportSchedules: state.ReportSchedules.filter(
          abObject => abObject.Uuid !== actionSchedule.Uuid
        ),
      };
    }
    default:
      return state;
  }
};
