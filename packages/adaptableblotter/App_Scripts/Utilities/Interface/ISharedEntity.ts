import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';

export interface ISharedEntity {
  entity: AdaptableBlotterObject;
  strategy: string;
  timestamp: Date;
  user: string;
  blotter_id: string;
}
