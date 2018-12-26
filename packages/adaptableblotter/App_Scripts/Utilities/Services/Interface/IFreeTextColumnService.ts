import { IFreeTextColumn } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IDataChangedEvent } from "./IAuditService";

export interface IFreeTextColumnService {
    GetFreeTextValue( column: IFreeTextColumn, record: any): any

    CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedEvent) :void
   
    CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedEvent[]): void 
   
}