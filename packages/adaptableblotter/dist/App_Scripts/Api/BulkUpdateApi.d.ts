import { ApiBase } from "./ApiBase";
import { BulkUpdateState } from "../Redux/ActionsReducers/Interface/IState";
import { IBulkUpdateApi } from "./Interface/IBulkUpdateApi";
export declare class BulkUpdateApi extends ApiBase implements IBulkUpdateApi {
    getBulkUpdateState(): BulkUpdateState;
    getBulkUpdateValue(): string;
}
