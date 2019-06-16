import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { ICellValidationRule } from '../../../PredefinedConfig/IUserState/CellValidationState';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[];
}
