import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';

export interface ISharedEntity {
  entity: AdaptableObject;
  strategy: string;
  timestamp: Date;
  user: string;
  blotter_id: string;
}
