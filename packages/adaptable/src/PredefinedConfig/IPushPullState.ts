import { BaseSchedule } from './Common/Schedule';
import { AdaptableObject } from './Common/AdaptableObject';
import { ConfigState } from './ConfigState';

/**
 * This State **is purely internal** - used by AdapTable for managing the ipushpull plugin
 *
 * It does not form part of Predefined Config and it is not persisted as part of Adaptable State.
 *
 * To set up ipushpull at design time please use the [ipushpull Plugin Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_ipushpullpluginoptions_.ipushpullpluginoptions.html)
 */
export interface IPushPullState extends ConfigState {
  IsIPushPullRunning?: boolean;
  IPushPullDomainsPages?: IPushPullDomain[];
  IPushPullLoginErrorMessage?: string;
  CurrentLiveIPushPullReport?: IPushPullReport;
  CurrentIPushpullUsername?: string;
  CurrentIPushpullPassword?: string;
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
