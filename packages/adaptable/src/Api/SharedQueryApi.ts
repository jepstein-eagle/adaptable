import { SharedQueryState, SharedQuery } from '../PredefinedConfig/SharedQueryState';
import { TypeUuid } from '../PredefinedConfig/Uuid';

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

  getExpressionStringForQuery(query: string | TypeUuid): string;

  isSharedQuery(query: string | TypeUuid): boolean;

  /**
   * Opens the Shared Query popup screen
   */
  showSharedQueryPopup(): void;
}
