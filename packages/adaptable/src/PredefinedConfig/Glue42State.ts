import { DesignTimeState } from './DesignTimeState';

export interface Glue42State extends DesignTimeState {
  /**
   *  A Glue42 object - pre-populated with the user's Glue42 credentials
   */
  Glue42Config?: any;
  Glue?: any; // this is the glue object
  Glue4Office?: any; // this is the Glue4Office object
  RunLiveData?: boolean; // keep this?????
  /**
   * How long (in miliseconds) Adaptable should throttle when sending an update to Glue42.
   *
   * **Default Value: 2000**
   */
  ThrottleTime?: number;
}
