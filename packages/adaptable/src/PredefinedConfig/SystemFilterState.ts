import { ConfigState } from './ConfigState';

/**
 * The Predefined Configuration for System Filters
 *
 * This allows you to specify which of the filters shipped by Adaptable are available to the User.
 *
 * By default **all** the System Filters provided by Adaptable will be used, so only set this property if you dont want to use the full range.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [System Filter Demo](https://demo.adaptabletools.com/filters/aggridsystemfiltersdemo/)
 *
 * {@link SystemFilterApi|System Filter API}
 *
 * [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 * --------------
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
 *  --------------
 *
 *  AdapTable offers 4 types of Filters:
 *
 *  | Filter Type                                   | Usage
 *  | -----------                                   | -----------
 *  | {@link ColumnFilterState|Column Filters}      | Filter a single Column using either a list of Column Values or a Range
 *  | {@link UserFilterState|User Filters}          | Columm Filters which are saved and named and therefore able to be re-used in multiple Functions
 *  | {@link NamedFilterState|Named Filters}        | Filters which are provided at design-time together with a predicate function that is called each time it needs to be evaluated
 *  | {@link SystemFilterState|System Filters}      | A predefined list of Filters shipped with AdapTable (e.g. 'Yesterday', 'Positive')
 *
 * Read more at the [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */

export interface SystemFilterState extends ConfigState {
  /**
   * Which of the system's SystemFilters you wish to make available.
   *
   * Provide an empty array if you want **no** system filters, or list just the system filters you want.
   *
   * If this property is not set then **all** the system filters are available.
   */
  SystemFilters?: string[];
}
