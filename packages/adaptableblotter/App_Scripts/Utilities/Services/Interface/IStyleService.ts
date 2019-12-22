import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
// Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
export interface IStyleService {
  CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string;
  CreateUniqueStyleName(
    strategyId: string,
    blotter: IAdaptableBlotter,
    adaqptableBlotterObject: AdaptableObject
  ): string;
}
