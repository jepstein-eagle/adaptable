import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { QueryApi } from '../QueryApi';
import { QueryState, SharedQuery } from '../../PredefinedConfig/QueryState';
import { ApiBase } from './ApiBase';
import { TypeUuid } from '../../PredefinedConfig/Uuid';
import { QueryObject } from '../../PredefinedConfig/Common/QueryObject';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as parser from '../../parser/src';

export class QueryApiImpl extends ApiBase implements QueryApi {
  public getQueryState(): QueryState {
    return this.getAdaptableState().Query;
  }

  public getAllSharedQuery(): SharedQuery[] {
    return this.getQueryState().SharedQueries;
  }

  public getSharedQueryById(sharedQueryId: string): SharedQuery | undefined {
    return this.getAllSharedQuery().find(se => se.Uuid == sharedQueryId);
  }

  public getExpressionForSharedQueryId(sharedQueryId: TypeUuid): string | undefined {
    const sharedQuery: SharedQuery = this.getSharedQueryById(sharedQueryId);
    return sharedQuery ? sharedQuery.Expression : undefined;
  }

  public QueryObjectToString(queryObject: QueryObject): string | undefined {
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

  public getQueryDescription(queryObject: QueryObject): string {
    return this.QueryObjectToString(queryObject) ?? '[No Expression]';
  }

  public isSharedQuery(query: string | TypeUuid): boolean {
    const sharedQuery: SharedQuery = this.getSharedQueryById(query);
    return sharedQuery != null && sharedQuery != undefined;
  }

  public showQueryPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.QueryStrategyId,
      ScreenPopups.QueryPopup
    );
  }

  public setCurrentQuery(query: string): void {
    this.dispatchAction(QueryRedux.CurrentQueryChange(query));
  }

  public clearCurrentQuery(): void {
    this.dispatchAction(QueryRedux.CurrentQueryChange(''));
  }

  public getCurrentQuery(): string | undefined {
    return this.getAdaptableState().Query.CurrentQuery;
  }

  public getColumnsFromQueryObject(queryObject: QueryObject): string[] {
    const expression: string = this.QueryObjectToString(queryObject);
    return parser.getColumnsFromExpression(expression);
  }
}
