import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SharedQueryApi } from '../SharedQueryApi';
import { SharedQueryState, SharedQuery } from '../../PredefinedConfig/SharedQueryState';
import { ApiBase } from './ApiBase';
import { TypeUuid } from '../../PredefinedConfig/Uuid';
import { QueryObject } from '../../PredefinedConfig/Common/QueryObject';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

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

  public getExpressionForSharedQueryId(sharedQueryId: TypeUuid): string | undefined {
    const sharedQuery: SharedQuery = this.getSharedQueryById(sharedQueryId);
    return sharedQuery ? sharedQuery.Expression : undefined;
  }

  public getExpressionForQueryObject(queryObject: QueryObject): string | undefined {
    // first check the Expression and return that
    if (StringExtensions.IsNotNullOrEmpty(queryObject.Expression)) {
      return queryObject.Expression;
    }

    // then check the SharedQuery Id and get that
    if (StringExtensions.IsNotNullOrEmpty(queryObject.SharedQueryId)) {
      return this.getExpressionForSharedQueryId(queryObject.SharedQueryId);
    }
    return undefined;
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
