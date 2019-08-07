import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for System Filters
 *
 * This allows you to specify which of the filters shipped by the Adaptable Blotter by default are available to the User.
 *
 * You can see a full list of shipped System Filters in the Help.
 */
export interface SystemFilterState extends DesignTimeState {
  /**
   * Which of the system's SystemFilters you wish to make available.
   *
   * Provide an empty array if you want **no** system filters, or list just the system filters you want.
   *
   * If this property is not set then **all** the system filters are available.
   */
  SystemFilters?: string[];
}
