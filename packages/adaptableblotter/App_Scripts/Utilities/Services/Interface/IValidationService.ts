import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';

export interface IValidationService {
  GetValidationRulesForDataChange(dataChangedEvent: DataChangedInfo): CellValidationRule[];

  ValidateDataChange(dataChangedInfo: DataChangedInfo): boolean;
}
