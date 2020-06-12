import { BaseSchedule } from './Common/Schedule';
import { AdaptableObject } from './Common/AdaptableObject';
import { ConfigState } from './ConfigState';

// This is now ENTIRELY local - nothing is provided at design time as that is all done through options
// and we have moved scheduling
export interface IPushPullState extends ConfigState {
  IsIPushPullRunning?: boolean;
  IPushPullDomainsPages?: IPushPullDomain[];
  IPushPullLoginErrorMessage?: string;
  CurrentLiveIPushPullReport?: IPushPullReport;
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

export interface IPushPullReport extends AdaptableObject {
  ReportName: string;
  Folder: string;
  Page: string;
}
export interface IPushPullSchedule extends BaseSchedule {
  IPushPullReport: IPushPullReport;
  Transmission: 'Snapshot' | 'Live Data';
}
