import { ICellValidationRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IDataChangingEvent } from './IAuditService';

export interface ILoggingService {
  LogError(message: string, ...optionalParams: any[]): void;

  LogMessage(message: string, ...optionalParams: any[]): void

  LogWarning(message: string, ...optionalParams: any[]): void
}