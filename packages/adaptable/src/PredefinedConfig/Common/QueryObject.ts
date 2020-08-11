import { TypeUuid } from '../Uuid';
import { AdaptableObject } from './AdaptableObject';
/**
 * An object that contains an Adaptable Query
 *
 * This can take one of 2 forms:
 *
 * - An actual expression string using the Adaptable parser
 *
 * - A reference to a SharedQueryId (of type: TypeUuid) - use the Uuid from the Shared Query object
 */

export interface QueryObject extends AdaptableObject {
  Expression?: string;

  SharedQueryId?: TypeUuid;
}
