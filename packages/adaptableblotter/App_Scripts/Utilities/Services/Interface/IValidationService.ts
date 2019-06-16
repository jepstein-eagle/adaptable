import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/RunTimeState/CellValidationState';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: IDataChangedInfo): CellValidationRule[];
}
