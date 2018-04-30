import { ICellValidationRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IDataChangingEvent } from './IAuditService';

export interface IValidationService {
    ValidateCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[]
  }