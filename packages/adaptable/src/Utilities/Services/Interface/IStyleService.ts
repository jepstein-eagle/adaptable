import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';
// Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
export interface IStyleService {
  CreateStyleName(functionName: AdaptableFunctionName): string;
  CreateUniqueStyleName(
    functionName: AdaptableFunctionName,
    adaqptableObject: AdaptableObject
  ): string;
}
