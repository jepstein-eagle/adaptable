import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

/**
 * This State **is purely internal** - used by AdapTable for managing the OpenFin plugin
 *
 * It does not form part of Predefined Config and it is not persisted as part of Adaptable State.
 */
export interface OpenFinState extends ConfigState {
  CurrentLiveOpenFinReport?: OpenFinReport;
  IsOpenFinRunning?: boolean;
}

/**
 * An OpenFin report
 *
 * Currently just contains the name of the Report (which will exist in the Export State)
 */
export interface OpenFinReport extends AdaptableObject {
  ReportName: string;
}

/**
 * Defines a OpenFin Schedule.  Used in the Schedule Function (where the State will be stored).
 *
 * Includes 2 properties:
 *
 * - `OpenFinReport`: The report being exported to Excel (via OpenFin)
 *
 * - `Transmission`: Whether Snapshot or Live Data (currently only the latter is supported)
 */
export interface OpenFinSchedule extends BaseSchedule {
  OpenFinReport: OpenFinReport;
  Transmission: 'Live Data';
}
