import { BulkUpdateState } from '../../Redux/ActionsReducers/Interface/IState';

export interface IBulkUpdateApi {
  getBulkUpdateState(): BulkUpdateState;
  getBulkUpdateValue(): string;
}
