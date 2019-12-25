import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for System Filters
 *
 * This allows you to specify which of the filters shipped by the Adaptable Blotter are available to the User.
 *
 * By default **all** the System Filters provided by the Adaptable Blotter will be used, so only set this property if you dont want to use the full range.
 *
 * **If this section is not set then all System Filters will be used**
 *
 * If you want **no System Filters** to be used then provide an empty array:
 *
 * ```ts
 * export default {
 *  SystemFilter: {
 *    SystemFilters: [],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 *  If you want to set which System Filters should be used then provide an array with those values:
 *
 * ```ts
 * export default {
 *  SystemFilter: {
 *    SystemFilters: ['Positive', 'Today', 'Blanks'],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 *  | State Property 	| Type              	| Details                                     	|
 *  |----------------	|-------------------	|---------------------------------------------	|
 *  | ActionColumn   	| Design Time State 	| Used to create dynamic columns with Buttons 	|
 *  | AdvancedSearch 	| Run Time State    	| Create saveable multi-column searches       	|
 *  |                	|                   	|                                             	|
 *
 *
 *
 *
 * The full list of available System Filters is:
 *
 *  | Filter                  | Columns
 *  | -----------             | -----------
 *  | Blanks                  | String, Date, Number
 *  | Non Blanks              | String, Date, Number
 *  | Positive                | Number
 *  | Negative                | Number
 *  | Zero                    | Number
 *  | True                    | Boolean
 *  | False                   | Boolean
 *  | Today                   | Date
 *  | In Past                 | Date
 *  | In Future               | Date
 *  | Yesterday               | Date
 *  | Tomorrow                | Date
 *  | Next Working Day        | Date
 *  | Previous Working Day    | Date
 *  | This Year               | Date
 *
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
