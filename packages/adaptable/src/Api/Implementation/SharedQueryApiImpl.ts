import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SharedQueryApi } from '../SharedQueryApi';
import { SharedQueryState, SharedQuery } from '../../PredefinedConfig/SharedQueryState';
import { ApiBase } from './ApiBase';
import { TypeUuid } from '../../PredefinedConfig/Uuid';

export class SharedQueryApiImpl extends ApiBase implements SharedQueryApi {
  public getSharedQueryState(): SharedQueryState {
    return this.getAdaptableState().SharedQuery;
  }

  public getAllSharedQuery(): SharedQuery[] {
    return this.getSharedQueryState().SharedQueries;
  }

  public getSharedQueryById(sharedQueryId: string): SharedQuery | undefined {
    return this.getAllSharedQuery().find(se => se.Uuid == sharedQueryId);
  }

  public getExpressionForQuery(sharedQueryId: TypeUuid): string | undefined {
    const sharedQuery: SharedQuery = this.getSharedQueryById(sharedQueryId);
    return sharedQuery ? sharedQuery.Expression : undefined;
  }

  public isSharedQuery(query: string | TypeUuid): boolean {
    const sharedQuery: SharedQuery = this.getSharedQueryById(query);
    return sharedQuery != null && sharedQuery != undefined;
  }

  public showSharedQueryPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.SharedQueryStrategyId,
      ScreenPopups.SharedQueryPopup
    );
  }
}
