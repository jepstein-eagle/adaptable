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
   * If the Revision number in Predefined Config is not greater than the one stored in the User's state, then it is ignored as its already been passed into the User's state (and potentially superseded).
   *
   * See [Adaptable State Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-state-guide.md) for more information.
   *
   * **Note**: This is the only property in ConfigState - the base class for all Adaptable State objects.
   */
  Revision?: number;
}
