import { DataChangedInfo } from '../../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import * as Redux from 'redux';
import { IUIConfirmation } from '../../Interface/IMessage';

export interface IValidationService {
  GetValidationRulesForDataChange(dataChangedInfo: DataChangedInfo): CellValidationRule[];

  PerformCellValidation(dataChangedInfo: DataChangedInfo): boolean;

  PerformServerValidation(
    dataChangedInfo: DataChangedInfo,
    config: {
      onServerValidationCompleted: () => void;
    }
  ): () => boolean;

  createCellValidationDescription(
    cellValidationRule: CellValidationRule,
    columns: AdaptableColumn[]
  ): string;

  CreateCellValidationMessage(CellValidation: CellValidationRule): string;

  createCellValidationUIConfirmation(
    confirmAction: Redux.Action,
    cancelAction: Redux.Action,
    warningMessage?: string
  ): IUIConfirmation;
}
