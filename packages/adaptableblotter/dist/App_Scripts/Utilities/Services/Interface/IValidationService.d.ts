import { ICellValidationRule } from "../../Interface/BlotterObjects/ICellValidationRule";
import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";
export interface IValidationService {
    ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[];
}
