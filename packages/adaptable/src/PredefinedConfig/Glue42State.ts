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

export interface Glue42Report extends AdaptableObject {
  ReportName: string;
  // might be more properties
}

export interface Glue42Schedule extends BaseSchedule {
  Glue42Report: Glue42Report;
  Transmission: 'Snapshot' | 'Live Data';
}
