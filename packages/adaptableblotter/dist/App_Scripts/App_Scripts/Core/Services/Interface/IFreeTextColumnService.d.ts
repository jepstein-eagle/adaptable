import { IFreeTextColumn } from "../../Api/Interface/IAdaptableBlotterObjects";
export interface IFreeTextColumnService {
    GetFreeTextValue(column: IFreeTextColumn, record: any): any;
}
