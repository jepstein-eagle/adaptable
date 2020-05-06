/**
 * Base Interface for all Adaptable State objects
 *
 * Includes a single `Revision` property - used for managing versioning
 */
export interface ConfigState {
  /**
   * The 'version' number of the Item.
   *
   * Used for when developers want to update one section in Predefined Config while  keeping others unchanged.
   *
   * If the Revision number in Predefined Config is greater than the one stored in the User's state, then the section in Predefined Config will be used, and will replace the State.
   *
   * If its not greater then Predefined Config is ignored as its already been passed into the User's state (and potentially superseded).
   */
  Revision?: number;
}
