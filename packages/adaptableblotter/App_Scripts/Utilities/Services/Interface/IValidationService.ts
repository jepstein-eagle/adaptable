import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';

export interface IValidationService {
  GetValidationRulesForDataChange(dataChangedInfo: DataChangedInfo): CellValidationRule[];

  PerformCellValidation(dataChangedInfo: DataChangedInfo): boolean;

  PerformServerValidation(
    dataChangedInfo: DataChangedInfo,
    config: {
      onEditSuccess: () => void;
    }
  ): () => boolean;
}
