import { ConfigState } from './ConfigState';
import { SystemFilterIds, SystemFilterId } from '../Utilities/Services/FilterService';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';
import { Scope } from './Common/Scope';
import { AdaptableApi } from '../types';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for Filters
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
 * Read more at the [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */

export interface FilterState extends ConfigState {
  /**
   * Which of the system's SystemFilters you wish to make available.
   *
   * Provide an empty array if you want **no** system filters, or list just the system filters you want.
   *
   * If this property is not set then **all** the system filters are available.
   */
  SystemFilters?: SystemFilterIds;
  UserFilters?: string[];
  ColumnFilters?: ColumnFilter[];
}

export interface FilterPredicate extends BaseUserFunction {
  id: SystemFilterId | string;
  type: 'FilterPredicate';
  name: string;
  scope?: Scope;
  inputs?: FilterPredicateInput[];
  handler: FilterPredicateHandler;
}

export interface FilterPredicateInput {
  type: 'number' | 'text' | 'date';
  default?: any;
}

export interface FilterPredicateHandler {
  (params: FilterPredicateParams): boolean;
}

export interface FilterPredicateParams {
  value: any;
  inputs: any[];
  api: AdaptableApi;
}

export interface ColumnFilter extends AdaptableObject {
  ColumnId: string;
  Values?: any[];
  Predicates?: ColumnFilterPredicate[];
  // Filter?: Expression;
}

export interface ColumnFilterPredicate {
  PredicateId: SystemFilterId | string;
  Inputs?: any[];
}
