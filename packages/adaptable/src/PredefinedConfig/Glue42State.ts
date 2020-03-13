import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

export interface Glue42State extends ConfigState {
  Username?: string;
  Password?: string;
  GatewayURL?: string;
  Glue?: any; // this is the glue object
  Glue4Office?: any; // this is the Glue4Office object

  /**
   * How long (in miliseconds) Adaptable should throttle when sending an update to Glue42.
   *
   * **Default Value: 2000**
   */
  ThrottleTime?: number;

  /**
   * Any Glue42 Reports that should be sent according to Schedules sent by you.
   */
  Glue42Schedules?: Glue42Schedule[];
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
