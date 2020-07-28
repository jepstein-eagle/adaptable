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

/**
 * An ipushpull report
 *
 * Contains the name of the Report (which will exist in the Export State), and the ipushpull `Folder` and `Page` to which it will be sent.
 */

export interface IPushPullReport extends AdaptableObject {
  ReportName: string;
  Folder: string;
  Page: string;
}
/**
 * Defines an ipushpull Schedule.  Used in the Schedule Function (where the State will be stored).
 *
 * Includes 2 properties:
 *
 * - `IPushPullReport`: The report being exported to Excel (via ipushpull)
 *
 * - `Transmission`: Whether Snapshot or Live Data
 */
export interface IPushPullSchedule extends BaseSchedule {
  IPushPullReport: IPushPullReport;
  Transmission: 'Snapshot' | 'Live Data';
}
