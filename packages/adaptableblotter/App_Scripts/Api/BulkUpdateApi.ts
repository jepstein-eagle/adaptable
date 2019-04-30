import { ApiBase } from "./ApiBase";
import { BulkUpdateState } from "../Redux/ActionsReducers/Interface/IState";
import { IBulkUpdateApi } from "./Interface/IBulkUpdateApi";

export class BulkUpdateApi extends ApiBase implements IBulkUpdateApi {

  public getBulkUpdateState(): BulkUpdateState {
    return this.getBlotterState().BulkUpdate;
  }

  public getBulkUpdateValue(): string {
    return this.getBulkUpdateState().BulkUpdateValue
  }


}