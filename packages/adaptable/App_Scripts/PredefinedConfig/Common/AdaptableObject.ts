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
   * Used to compare State objects
   *
   * **Do not provide this property when creating an Adaptable Object in Predefined Config as Adaptable will do it for you when the application loads.**
   */
  Uuid?: TypeUuid;
}
