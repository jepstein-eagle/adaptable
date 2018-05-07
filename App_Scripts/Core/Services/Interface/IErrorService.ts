import { ICellValidationRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IDataChangingEvent } from './IAuditService';

export interface IErrorService {
    LogError(errorMessage: string): void;
  }