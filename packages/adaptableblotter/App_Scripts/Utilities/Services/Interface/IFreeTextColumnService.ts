import { IFreeTextColumn } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";

export interface IFreeTextColumnService {
    GetFreeTextValue( column: IFreeTextColumn, record: any): any

    CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedInfo) :void
   
    CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedInfo[]): void 
   
}