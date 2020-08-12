import { SharedQueryState, SharedQuery } from '../PredefinedConfig/SharedQueryState';
import { TypeUuid } from '../PredefinedConfig/Uuid';
import { QueryObject } from '../PredefinedConfig/Common/QueryObject';

export interface SharedQueryApi {
  /**
   * Retrieves the Shared Query section from Adaptable State
   *
   */
  getSharedQueryState(): SharedQueryState;

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
  showSharedQueryPopup(): void;
}
