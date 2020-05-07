import { TypeUuid } from '../Uuid';

/**
 * The base empty Adaptable Object interface which all other State-related interfaces should extend.
 *
 * Contains a single **Uuid** property which uniquely identifies the object.
 *
 * Note: this property is assigned by Adaptable when the object is created.
 *
 * If the user has provided Predefined Config, the Uuid is assigned BEFORE the Config is read.
 */
export interface AdaptableObject {
  /**
   * A unique identifier for the object
   *
   * Used internally by AdapTable to compare State objects
   *
   * **Do not provide this property when defining an AdaptableObject in Predefined Config as AdapTable will do it automatically when the application loads.**
   */
  Uuid?: TypeUuid;
}
