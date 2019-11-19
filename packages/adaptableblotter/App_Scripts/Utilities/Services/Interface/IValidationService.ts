import { DataChangedInfo } from '../../../BlotterOptions/CommonObjects/DataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';

export interface IValidationService {
  GetValidationRulesForDataChange(dataChangedInfo: DataChangedInfo): CellValidationRule[];

  PerformCellValidation(dataChangedInfo: DataChangedInfo): boolean;

  PerformServerValidation(
    dataChangedInfo: DataChangedInfo,
    config: {
      onServerValidationCompleted: () => void;
    }
  ): () => boolean;
}
