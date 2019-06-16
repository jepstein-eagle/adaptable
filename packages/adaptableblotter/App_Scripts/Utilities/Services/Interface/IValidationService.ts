import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { ICellValidationRule } from '../../../PredefinedConfig/IUserState Interfaces/CellValidationState';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[];
}
