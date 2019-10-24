import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DesignTimeState } from './DesignTimeState';
import { Glue42Config } from '../DesignTimeState/Glue42Config';
import { PushPullConfig } from './PushPullConfig';

export interface PartnerConfigState extends DesignTimeState {
  pushPullConfig?: PushPullConfig;
  glue42Config?: Glue42Config;
}
