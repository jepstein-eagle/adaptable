import { ICellValidationRule } from '../../Interface/ICellValidationStrategy';
import { IDataChangingEvent } from './IAuditService';

export interface IValidationService {
    ValidateCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[]
  }