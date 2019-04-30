import { IFreeTextColumn } from "../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { ApiBase } from "./ApiBase";
import { IFreeTextColumnApi } from "./Interface/IFreeTextColumnApi";
import { FreeTextColumnState } from "../Redux/ActionsReducers/Interface/IState";
export declare class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {
    getFreeTextColumnState(): FreeTextColumnState;
    getAllFreeTextColumn(): IFreeTextColumn[];
    addFreeTextColumn(freeTextColumn: IFreeTextColumn): void;
    addEditFreeTextColumnStoredValue(freeTextColumn: IFreeTextColumn, storedValue: any): void;
    createFreeTextColumn(columnId: string, defaultValue?: string): void;
    deleteFreeTextColumn(columnId: string): void;
}
