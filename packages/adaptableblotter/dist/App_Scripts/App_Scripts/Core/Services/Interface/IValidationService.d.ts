import { ICellValidationRule } from "../../Api/Interface/IAdaptableBlotterObjects";
import { IDataChangingEvent } from './IAuditService';
export interface IValidationService {
    ValidateCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[];
}
