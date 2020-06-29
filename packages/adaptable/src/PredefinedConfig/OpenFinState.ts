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

export interface OpenFinReport extends AdaptableObject {
  ReportName: string;
  // might be more properties
}

export interface OpenFinSchedule extends BaseSchedule {
  OpenFinReport: OpenFinReport;
  Transmission: 'Live Data';
}
