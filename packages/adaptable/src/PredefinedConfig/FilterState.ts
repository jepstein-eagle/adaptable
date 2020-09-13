import { ConfigState } from './ConfigState';
import { AdaptableScope } from './Common/AdaptableScope';
import { AdaptableApi, AdaptableColumn } from '../types';
import { AdaptableObject } from './Common/AdaptableObject';
import { AdaptablePredicate } from './Common/AdaptablePredicate';
import { TypeHint } from './Common/Types';

/**
 * The Predefined Configuration for Filters
 *
 * It contains 2 sections:
 *
 * **System Filters** - Specifies which of the Filter shipped by AdapTable will be available to the Users
 *
 * **Column Filters** - Which columns are **currently** filtered together with the predicates that form the filter
 *
 * Note: Developer are able to write **Custom Predicates** which can then appear in Filters but these are provided in `customPredicateDefs` section of {@link AdaptableOptions| Adaptable Options} and not in Filter State.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Filter Demos](https://demo.adaptabletools.com/filters/)
 *
 * {@link FilterApi| Filter API}
 *
 * [Filter Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/filter-function.md)
 *
 * --------------
 *
 * ## System Filters
 *
 * A selection of the System Filter Predicates which will be available to users.
 *
 * By default **all** the System Filter Predicates provided by AdapTable will be available, so only set this property if you dont want to use the full range.
 *
 * If you want **no System Filter Predicates** to be available then provide an empty array:
 *
 * ```ts
 * export default {
 *  Filter: {
 *    SystemFilters: [],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 *  If you want to set which System Filter Predicates should be used then provide an array with just those values:
 *
 * ```ts
 * export default {
 *  Filter: {
 *    SystemFilters: ['Positive', 'Today', 'Blanks'],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 * The full list of System Filter predicates shipped by AdapTable is:
 *
 * | System Filter Predicate          | Columns              | Inputs|
 * | --------  	          | ------               | ------               |
 * | Values| All   | Yes |
 *   | Blanks' | All   | No |
 *   | NonBlanks| All   | No |
 *   | Equals| Number   | Yes |
 *   | NotEquals| Number   | Yes |
 *  | GreaterThan| Number   | Yes |
 *  | LessThan| Number   | Yes |
 *  | Positive| Number   | No |
 *  | Negative| Number   | No |
 *  | Zero| Number   | No |
 *  | Between| Number   | Yes |
 *  | NotBetween| Number   | Yes |
 *  | Is| String   | Yes |
 *  |IsNot| String   | Yes |
 *  | Contains| String   | Yes |
 *  | NotContains| String   | Yes |
 *  | StartsWith| String   | Yes |
 *  |EndsWith| String   | Yes |
 *  | Regex| String   | Yes |
 *  | Today| Date   | No |
 *  | Yesterday| Date   | No |
 *  | Tomorrow| Date   | No |
 *  | ThisWeek| Date   | No |
 *  | ThisMonth| Date   | No |
 *  | ThisQuarter| Date   | No |
 *  | ThisYear| Date   | No |
 *  | InPast| Date   | No |
 *  | InFuture| Date   |No |
 *  | Before| Date   | Yes |
 *  | After| Date   | Yes |
 *  | On| Date   | Yes |
 *  | NotOn| Date   | Yes |
 *  |NextWorkDay| Date   | No |
 *  | LastWorkDay| Date   | No |
 *  | True| Boolean   | No |
 *  | False| Boolean   | No |
 *
 *  --------------
 *
 *  * ##Column Filters
 *
 * To do...
 *
 * Read more at the [Filter Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/filter-function.md)
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

export interface ColumnFilterPredicate extends AdaptablePredicate {
  PredicateId: TypeHint<string, SystemFilterPredicateId>;
}

export interface UserFilter extends AdaptableObject {
  Name: string;
  Scope: AdaptableScope;
  Values?: any[];
  Predicates?: AdaptablePredicate[];
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
