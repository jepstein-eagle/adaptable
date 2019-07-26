import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { IColumn } from '../../Utilities/Interface/IColumn';

export interface IStrategyActionReturn<T> {
  ActionReturn?: T;
  Alert?: IAdaptableAlert;
}

export interface BulkUpdateValidationResult {
  IsValid: boolean;
  Column?: IColumn;
  Alert?: IAdaptableAlert;
}
