import { ICellValidationRule } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IDataChangingEvent, IDataChangedEvent } from "../../../Api/Interface/IDataChanges";

export interface IValidationService {
    ValidateCellChanging(dataChangedEvent: IDataChangedEvent): ICellValidationRule[]
  }