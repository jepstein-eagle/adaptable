import { ICellValidationRule } from "../../../api/Interface/IAdaptableBlotterObjects";
import { IDataChangingEvent } from './IAuditService';
export interface IValidationService {
    ValidateCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[];
}
