import { ConfigState } from './ConfigState';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';
import { Scope } from './Common/Scope';
import { AdaptableApi, AdaptableColumn } from '../types';
import { AdaptableObject } from './Common/AdaptableObject';
import { Predicate } from './Common/Predicate';
import { TypeHint } from './Common/Types';

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
 * {@link FilterApi| Filter API}
 *
 * [Filter ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
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
  SystemFilters?: SystemFilterPredicateIds;
  FilterPredicates?: string[];
  ColumnFilters?: ColumnFilter[];

  // not sure about this?  Seems like a good idea but perhaps not
  // lets comment out so we dont confuse users until we add them...
  // UserFilters?: UserFilter[];
}

export interface FilterPredicateInput {
  type: 'number' | 'text' | 'date';
  defaultValue?: any;
}

export interface FilterPredicateHandler {
  (params: FilterPredicateParams): boolean;
}

export interface FilterPredicateParams {
  value: any;
  displayValue: string;
  inputs: any[];
  column: AdaptableColumn;
  api: AdaptableApi;
}

export interface ColumnFilter extends AdaptableObject {
  ColumnId: string;
  Predicate: ColumnFilterPredicate;
}

export interface ColumnFilterPredicate extends Predicate {
  PredicateId: TypeHint<string, SystemFilterPredicateId>;
}

export interface UserFilter extends AdaptableObject {
  Name: string;
  Scope: Scope;
  Values?: any[];
  Predicates?: Predicate[];
}

export type SystemFilterPredicateIds = SystemFilterPredicateId[];

export type SystemFilterPredicateId =
  | 'Values'
  | 'Blanks'
  | 'NonBlanks'
  | 'Equals'
  | 'NotEquals'
  | 'GreaterThan'
  | 'LessThan'
  | 'Positive'
  | 'Negative'
  | 'Zero'
  | 'Between'
  | 'NotBetween'
  | 'Is'
  | 'IsNot'
  | 'Contains'
  | 'NotContains'
  | 'StartsWith'
  | 'EndsWith'
  | 'Regex'
  | 'Today'
  | 'Yesterday'
  | 'Tomorrow'
  | 'ThisWeek'
  | 'ThisMonth'
  | 'ThisQuarter'
  | 'ThisYear'
  | 'InPast'
  | 'InFuture'
  | 'Before'
  | 'After'
  | 'On'
  | 'NotOn'
  | 'NextWorkDay'
  | 'LastWorkDay'
  | 'True'
  | 'False';
