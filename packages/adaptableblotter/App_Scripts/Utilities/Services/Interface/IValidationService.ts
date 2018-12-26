import { ICellValidationRule } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IDataChangingEvent } from "../../../Api/Interface/IDataChanges";

export interface IValidationService {
    ValidateCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[]
  }