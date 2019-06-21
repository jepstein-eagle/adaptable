import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/RunTimeState/CellValidationState';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: DataChangedInfo): CellValidationRule[];
}
