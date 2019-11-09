import { AdaptableBlotterObject } from './AdaptableBlotterObject';
import { DesignTimeState } from './DesignTimeState';
import { PushPullConfig } from './PushPullConfig';
import { Glue42Config } from './Glue42Config';

export interface PartnerConfigState extends DesignTimeState {
  pushPullConfig?: PushPullConfig;
  glue42Config?: Glue42Config;
}
