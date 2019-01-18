import { ICellValidationRule } from "../../Interface/IAdaptableBlotterObjects";
import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";

export interface IValidationService {
    ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[]
  }