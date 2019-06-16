import { ISystemStatus } from '../../Utilities/Interface/ISystemStatus';

import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../Common/ChartEnums';
import { IRange } from '../Common/Expression/IRange';
import { Expression } from '../Common/Expression/Expression';
import { ISystemState } from './ISystemState';
import { Calendar } from '../IUserState/CalendarState';
import { ChartData } from '../IUserState/ChartState';
import { Report } from '../IUserState/ExportState';
/**
 * ISYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing
 */

export interface SystemState extends ISystemState {
  SystemStatus: ISystemStatus;
  Alerts: IAdaptableAlert[];
  AvailableCalendars: Calendar[];
  CurrentLiveReports: ILiveReport[];
  IsValidSmartEditSelection: boolean;
  SmartEditPreviewInfo: IPreviewInfo;
  IsValidBulkUpdateSelection: boolean;
  BulkUpdatePreviewInfo: IPreviewInfo;
  ChartData: ChartData;
  ChartVisibility: ChartVisibility;
  CalculatedColumnErrorMessage: string;
  IPPDomainsPages: IPPDomain[];
  SystemReports: Report[];
  ReportErrorMessage: string;
  QuickSearchRange: IRange;
  QuickSearchVisibleColumnExpressions: Expression[];
}
