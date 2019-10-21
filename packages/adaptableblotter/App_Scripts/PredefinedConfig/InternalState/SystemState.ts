import { ISystemStatus } from '../../Utilities/Interface/ISystemStatus';

import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../Common/ChartEnums';
import { Expression } from '../Common/Expression/Expression';
import { InternalState } from './InternalState';
import { Calendar } from '../RunTimeState/CalendarState';
import { ChartData } from '../RunTimeState/ChartState';
import { Report } from '../RunTimeState/ExportState';
import { QueryRange } from '../Common/Expression/QueryRange';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IStrategyActionReturn';
/**
 * SYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing
 */

export interface SystemState extends InternalState {
  SystemStatus: ISystemStatus;
  AdaptableAlerts: AdaptableAlert[];
  AvailableCalendars: Calendar[];
  CurrentLiveReports: ILiveReport[];
  IsValidSmartEditSelection: boolean;
  SmartEditPreviewInfo: IPreviewInfo;
  BulkUpdateValidationResult: BulkUpdateValidationResult;
  BulkUpdatePreviewInfo: IPreviewInfo;
  ChartData: ChartData;
  ChartVisibility: ChartVisibility;
  CalculatedColumnErrorMessage: string;
  IPPDomainsPages: IPPDomain[];
  SystemReports: Report[];
  ReportErrorMessage: string;
  QuickSearchRange: QueryRange;
  QuickSearchVisibleColumnExpressions: Expression[];
}
