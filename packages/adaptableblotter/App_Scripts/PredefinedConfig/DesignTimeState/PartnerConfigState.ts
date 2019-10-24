import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DesignTimeState } from './DesignTimeState';
import { Scope } from '../Common/Scope';
//import { PushPullConfig } from './PushPullConfig';
//import { PushPullConfig } from '../DesignTimeState/PushPullConfig';
import { Glue42Config } from '../DesignTimeState/Glue42Config';

export interface PartnerConfigState extends DesignTimeState {
  pushPullConfig?: any;
  glue42Config?: any;
  test: string;
}
