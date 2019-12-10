import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for System Filters
 *
 * This allows you to specify which of the filters shipped by the Adaptable Blotter are available to the User.
 *
 * By default ALL the System Filters provided by the Adaptable Blotter will be used so only set this property if you dont want to use the full range.
 *
 * **If this section is not set then all System Filters will be used**
 *
 * If you want **no System Filters** to be used then provide an empty array.
 *
 * Set the System Filters you want.  The full available list of System Filters is:
 *
 * | Syntax      | Description |
 *| ----------- | ----------- |
 *| Header      | Title       |
 *| Paragraph   | Text        |
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
