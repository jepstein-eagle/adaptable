import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

export interface IStrategyActionReturn<T> {
  ActionReturn?: T;
  Alert?: AdaptableAlert;
}
