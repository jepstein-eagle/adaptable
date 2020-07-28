import { TypeUuid } from '../Uuid';

/**
 * The base `AdaptableObject` interface which all other State-related objects should extend.
 *
 * Contains a single **Uuid** property (provided by AdapTable) which uniquely identifies the object.
 *
 */
export interface AdaptableObject {
  /**
   * A unique identifier for the Adaptable Object
   *
   * Generated and used internally by AdapTable to compare State objects
   *
   * **Do not provide this property when defining an AdaptableObject in Predefined Config as AdapTable will do it automatically when the application loads.**
   */
  Uuid?: TypeUuid;
}
