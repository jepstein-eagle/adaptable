import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';

export interface ISharedEntity {
  entity: AdaptableBlotterObject;
  strategy: string;
  timestamp: Date;
  user: string;
  blotter_id: string;
}
