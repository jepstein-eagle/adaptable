import { IFreeTextColumn } from "../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { ApiBase } from "./ApiBase";
import { IFreeTextColumnApi } from "./Interface/IFreeTextColumnApi";
import { FreeTextColumnState } from "../Redux/ActionsReducers/Interface/IState";
export declare class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {
    GetState(): FreeTextColumnState;
    GetAll(): IFreeTextColumn[];
    Add(freeTextColumn: IFreeTextColumn): void;
    Create(columnId: string, defaultValue?: string): void;
    Delete(columnId: string): void;
}
