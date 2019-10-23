import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DesignTimeState } from './DesignTimeState';
import { Scope } from '../Common/Scope';
import { PushPullConfig } from './PushPullConfig';

export interface PartnerConfigState extends DesignTimeState {
  pushPullConfig?: PushPullConfig;
  glue42Config?: string; // presumably lets make glue 42 config
}
