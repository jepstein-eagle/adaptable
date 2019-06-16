import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { CellValidationRule } from '../../../PredefinedConfig/IUserState/CellValidationState';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: IDataChangedInfo): CellValidationRule[];
}
