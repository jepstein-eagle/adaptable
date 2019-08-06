import {
  NamedFilter,
  NamedFilterState,
} from '../../PredefinedConfig/RunTimeState/NamedFilterState';

/**
 * Provides full and comprehensive run-time access to the Named Filter function and associated state.
 */
export interface INamedFilterApi {
  /**
   * Retrieves the Named Filter State
   */
  getNamedFilterState(): NamedFilterState;

  /**
   * Returns all the Named Filters in the State
   */
  getAllNamedFilter(): NamedFilter[];

  /**
   * Returns the Named Filter with the given name
   */
  getNamedFilterByName(name: string): NamedFilter;
}
