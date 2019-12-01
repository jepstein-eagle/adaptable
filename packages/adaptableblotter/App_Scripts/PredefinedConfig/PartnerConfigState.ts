import { DesignTimeState } from './DesignTimeState';
import { Glue42Config } from './Glue42Config';

export interface PartnerConfigState extends DesignTimeState {
  ipushpull?: iPushPullState;
  glue42Config?: Glue42Config;
}

export interface iPushPullState {
  ipushpullConfig?: any;
  username?: string;
  password?: string;
}
