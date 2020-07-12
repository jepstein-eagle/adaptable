import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

/**
 * This State **is purely internal** - used by AdapTable for managing the Glue42 plugin
 *
 * It does not form part of Predefined Config and it is not persisted as part of Adaptable State.
 *
 */
export interface Glue42State extends ConfigState {
  Glue42LoginErrorMessage?: string;
  CurrentLiveGlue42Report?: Glue42Report;
  IsGlue42Available?: boolean;
  IsGlue42Running?: boolean;
}

/**
 * A Glue42 report
 *
 * Currently just contains the name of the Report (which will exist in the Export State)
 */
export interface Glue42Report extends AdaptableObject {
  ReportName: string;
}

/**
 * Defines a Glue42 Scheduled Report.  Used in the Schedule Function (where the State will be stored).
 *
 * Includes 2 properties:
 *
 * - `Glue42Report`: The report being exported to Excel (via Glue42)
 *
 * - `Transmission`: Whether Snapshot or Live Data
 */
export interface Glue42Schedule extends BaseSchedule {
  Glue42Report: Glue42Report;
  Transmission: 'Snapshot' | 'Live Data';
}
