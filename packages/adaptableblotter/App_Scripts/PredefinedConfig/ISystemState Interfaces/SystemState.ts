import { ISystemStatus } from '../../Utilities/Interface/ISystemStatus';

import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../Common Objects/ChartEnums';
import { IRange } from '../Common Objects/Expression/IRange';
import { Expression } from '../Common Objects/Expression/Expression';
import { ISystemState } from '../Interfaces/ISystemState';
import { ICalendar } from '../IUserState Interfaces/CalendarState';
import { IChartData } from '../IUserState Interfaces/ChartState';
import { IReport } from '../IUserState Interfaces/ExportState';
/**
 * ISYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing
 */

export interface SystemState extends ISystemState {
  SystemStatus: ISystemStatus;
  Alerts: IAdaptableAlert[];
  AvailableCalendars: ICalendar[];
  CurrentLiveReports: ILiveReport[];
  IsValidSmartEditSelection: boolean;
  SmartEditPreviewInfo: IPreviewInfo;
  IsValidBulkUpdateSelection: boolean;
  BulkUpdatePreviewInfo: IPreviewInfo;
  ChartData: IChartData;
  ChartVisibility: ChartVisibility;
  CalculatedColumnErrorMessage: string;
  IPPDomainsPages: IPPDomain[];
  SystemReports: IReport[];
  ReportErrorMessage: string;
  QuickSearchRange: IRange;
  QuickSearchVisibleColumnExpressions: Expression[];
}
