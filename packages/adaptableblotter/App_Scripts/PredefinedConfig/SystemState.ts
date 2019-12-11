import { IPPDomain } from '../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { IPreviewInfo } from '../Utilities/Interface/IPreview';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ChartVisibility } from './Common/ChartEnums';
import { Expression, QueryRange } from './Common/Expression';
import { InternalState } from './InternalState';
import { BulkUpdateValidationResult } from '../Strategy/Interface/IStrategyActionReturn';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';
import { Calendar } from './CalendarState';
import { ChartData } from './ChartState';
import { Report } from './ExportState';

//SYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing

/**
 * This is for internal use of the Adaptable Blotter only during a session.
 *
 * None of this State is provided to the Adaptable Blotter by users (through Predefined Config) and none of it is persisted.
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
  IPPLoginMessage?: string;
  SystemReports: Report[];
  ReportErrorMessage: string;
  QuickSearchRange: QueryRange;
  QuickSearchVisibleColumnExpressions: Expression[];
}
