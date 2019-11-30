import { DesignTimeState } from './DesignTimeState';
import { Glue42Config } from './Glue42Config';

export interface PartnerConfigState extends DesignTimeState {
  ipushpull?: any;
  glue42Config?: Glue42Config;
}
