import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';

export interface IStrategyActionReturn<T> {
  ActionReturn?: T;
  Alert?: AdaptableAlert;
}

export interface BulkUpdateValidationResult {
  IsValid: boolean;
  Column?: AdaptableBlotterColumn;
  Alert?: AdaptableAlert;
}
