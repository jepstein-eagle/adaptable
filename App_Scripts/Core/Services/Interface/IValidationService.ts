import { ICellValidationRule } from "../../../Core/Api/AdaptableBlotterObjects";
import { IDataChangingEvent } from './IAuditService';

export interface IValidationService {
    ValidateCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[]
  }