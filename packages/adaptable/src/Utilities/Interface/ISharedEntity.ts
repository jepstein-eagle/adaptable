import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface ISharedEntity {
  entity: AdaptableObject;
  functionName: AdaptableFunctionName;
  timestamp: Date;
  user: string;
  adaptable_id: string;
}
