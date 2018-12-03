import { IFreeTextColumn } from "../../../api/Interface/IAdaptableBlotterObjects";

export interface IFreeTextColumnService {
    GetFreeTextValue( column: IFreeTextColumn, record: any): any
}