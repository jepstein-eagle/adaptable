import { TypeUuid } from './Uuid';

/**
 * The base empty Adaptable Blotter Object interface which all other State-related interfaces should extend.
 *
 * Contains a single **Uuid** property which uniquely identifies the object.
 *
 * Note: this property is assigned by the adaptable blotter when the object is created.
 *
 * If the user has provided Predefined Config, the Uuid is assigned BEFORE the Config is read.
 */
export interface AdaptableBlotterObject {
  /**
   * A unique identifier for the object
   *
   * Used to compare State objects
   *
   * **Do not provide this propety when creating an Adaptable Blotter Object in Predefined Config as the Adaptable Blotter will do it for you when the application loads.**
   */
  Uuid?: TypeUuid;
}
