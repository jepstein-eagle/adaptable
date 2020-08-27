import { QueryState, SharedQuery } from '../PredefinedConfig/QueryState';
import { TypeUuid } from '../PredefinedConfig/Uuid';
import { QueryObject } from '../PredefinedConfig/Common/QueryObject';

export interface QueryApi {
  /**
   * Retrieves the Shared Query section from Adaptable State
   *
   */
  getQueryState(): QueryState;

  /**
   * Gets all the Shared Query objects in Adaptable State
   */
  getAllSharedQuery(): SharedQuery[];

  getSharedQueryById(sharedQueryId: string): SharedQuery | undefined;

  getExpressionForSharedQueryId(sharedQueryId: TypeUuid): string | undefined;

  getExpressionForQueryObject(queryObject: QueryObject): string | undefined;

  isSharedQuery(query: string | TypeUuid): boolean;

  /**
   * Opens the Shared Query popup screen
   */
  showQueryPopup(): void;

  setCurrentQuery(query: string): void;

  clearCurrentQuery(): void;

  getCurrentQuery(): string | undefined;
}
