import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

/**
 * This State is purely local - used by AdapTable internally for managing the OpenFin plugin
 *
 * It does not form part of Predefined Config
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
