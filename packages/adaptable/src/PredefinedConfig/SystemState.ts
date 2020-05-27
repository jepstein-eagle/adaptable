import { IPreviewInfo } from '../Utilities/Interface/IPreview';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ChartVisibility } from './Common/ChartEnums';
import { Expression, QueryRange } from './Common/Expression';
import { InternalState } from './InternalState';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';
import { Calendar } from './CalendarState';
import { ChartData } from './ChartState';
import { Report } from './ExportState';
import { LiveReport } from '../Api/Events/LiveDataChanged';
import { BulkUpdateValidationResult } from '../Strategy/Interface/IBulkUpdateStrategy';
import { GridCell } from '../types';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

export interface IPushPullReport extends AdaptableObject {
  ReportName: string;
  Folder: string;
  Page: string;
}

export interface IPushPullSchedule extends BaseSchedule {
  iPushPullReport: IPushPullReport;
  transmission: 'Snapshot' | 'Live Data';
}

/**
 * Internal object that maps an IPushPull Domain object
 */
export interface IPushPullDomain {
  /**
   * the Name of the Domain / Folder
   */
  Name: string;

  /**
   * the Id of the Folder
   */
  FolderId: number;

  /**
   * The names of the pages within the (Folder)
   */
  Pages: string[];
}

//SYSTEM STATE IMPLEMENTATIONS - System, Menu, Grid, Popup, TeamSharing

export interface IPushPullState {
  IsIPushPullRunning?: boolean;
  IPushPullDomainsPages?: IPushPullDomain[];
  IPushPullLoginErrorMessage?: string;
  CurrentLiveIPushPullReport?: IPushPullReport;
}
/**
 * This is for internal use of Adaptable only during a session.
 *
 * None of this State is provided to Adaptable by users (through Predefined Config) and none of it is persisted.
 */
export interface SystemState extends InternalState, IPushPullState {
  AdaptableAlerts: AdaptableAlert[];
  UpdatedRowInfos: UpdatedRowInfo[];
  AvailableCalendars: Calendar[];
  IsValidSmartEditSelection: boolean;
  SmartEditPreviewInfo: IPreviewInfo;
  BulkUpdateValidationResult: BulkUpdateValidationResult;
  BulkUpdatePreviewInfo: IPreviewInfo;
  ChartData: ChartData;
  ChartVisibility: ChartVisibility;
  CalculatedColumnErrorMessage: string;
  CurrentLiveReports: LiveReport[];

  SystemReports: Report[];
  ReportErrorMessage: string;
  QuickSearchRange: QueryRange;
  QuickSearchVisibleColumnExpressions: Expression[];
  LastAppliedShortCut: GridCell | undefined;
}
