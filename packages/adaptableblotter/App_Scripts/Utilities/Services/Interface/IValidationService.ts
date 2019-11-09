import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: DataChangedInfo): CellValidationRule[];
}
