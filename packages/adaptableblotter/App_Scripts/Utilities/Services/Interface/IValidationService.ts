import { ICellValidationRule } from '../../Interface/BlotterObjects/ICellValidationRule';
import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';

export interface IValidationService {
  ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[];
}
