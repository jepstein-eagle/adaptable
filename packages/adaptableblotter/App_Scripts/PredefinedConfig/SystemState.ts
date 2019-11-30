import { IPPDomain } from '../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { IPreviewInfo } from '../Utilities/Interface/IPreview';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ChartVisibility } from './Common/ChartEnums';
import { Expression } from './Common/Expression/Expression';
import { InternalState } from './InternalState';
import { QueryRange } from './Common/Expression/QueryRange';
import { BulkUpdateValidationResult } from '../Strategy/Interface/IStrategyActionReturn';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';
import { Calendar } from './CalendarState';
import { ChartData } from './ChartState';
import { Report } from './ExportState';
/**
 * SYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing
 */

export interface SystemState extends InternalState {
  AdaptableAlerts: AdaptableAlert[];
  UpdatedRowInfos: UpdatedRowInfo[];
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
