import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterObject } from '../../../PredefinedConfig/Common/AdaptableBlotterObject';
// Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
export interface IStyleService {
  CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string;
  CreateUniqueStyleName(
    strategyId: string,
    blotter: IAdaptableBlotter,
    adaqptableBlotterObject: AdaptableBlotterObject
  ): string;
}
