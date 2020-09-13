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
 * | Blanks' | All   | No |
 * | NonBlanks| All   | No |
 * | Equals| Number   | Yes |
 * | NotEquals| Number   | Yes |
 * | GreaterThan| Number   | Yes |
 * | LessThan| Number   | Yes |
 * | Positive| Number   | No |
 * | Negative| Number   | No |
 * | Zero| Number   | No |
 * | Between| Number   | Yes |
 * | NotBetween| Number   | Yes |
 * | Is| String   | Yes |
 * | IsNot| String   | Yes |
 * | Contains| String   | Yes |
 * | NotContains| String   | Yes |
 * | StartsWith| String   | Yes |
 * | EndsWith| String   | Yes |
 * | Regex| String   | Yes |
 * | Today| Date   | No |
 * | Yesterday| Date   | No |
 * | Tomorrow| Date   | No |
 * | ThisWeek| Date   | No |
 * | ThisMonth| Date   | No |
 * | ThisQuarter| Date   | No |
 * | ThisYear| Date   | No |
 * | InPast| Date   | No |
 * | InFuture| Date   |No |
 * | Before| Date   | Yes |
 * | After| Date   | Yes |
 * | On| Date   | Yes |
 * | NotOn| Date   | Yes |
 * | NextWorkDay| Date   | No |
 * | LastWorkDay| Date   | No |
 * | True| Boolean   | No |
 * | False| Boolean   | No |
 *
 *  --------------
 *
 *  ## Column Filters
 *
 *  This a list of which Columns are filtered.
 *
 *  This can be provided either in Predefined Config or, more typically, saved by AdapTable at run-time so its available when the system next restarts.
 *
 *  A Column Filter contains 2 properties:
 *
 *  - `ColumnId` - which Column is being filtered
 *
 *  - `Predicate` - the predicate to be applied in the filter.  This will be the name of the PredicateId and, optionally, any inputs that it requires.
 *
 *  ### Column Filter Example
 *
 *  ```ts
 *  Filter: {
 *    ColumnFilters: [
 *    {
 *       ColumnId: 'ChangeLastOrder',
 *       Predicate: { PredicateId: 'Positive' },
 *    },
 *    {
 *       ColumnId: 'Employee',
 *       Predicate: {
 *         PredicateId: 'Values',
 *         Inputs: ['Janet Leverling', 'Margaret Peacock', 'Nancy Davolio'],
 *       },
 *    },
 *    {
 *       ColumnId: 'InvoicedCost',
 *       Predicate: {
 *         PredicateId: 'Between',
 *         Inputs: [10, 300],
 *       },
 *    },
 *    {
 *       ColumnId: 'OrderDate',
 *       Predicate: {
 *         PredicateId: 'InPast',
 *       },
 *    },
 *    {
 *       ColumnId: 'Employee',
 *       Predicate: { PredicateId: 'new_starter' },
 *    },
 *    {
 *       ColumnId: 'LastUpdatedTime',
 *       Predicate: { PredicateId: 'after_work' },
 *    },
 *   ],
 * },
 *
 *  .........
 *
 *     const adaptableOptions: AdaptableOptions = {
 *      ....
 *        customPredicateDefs: [
 *          {
 *            id: 'new_starter',
 *            label: 'New Starter',
 *            columnScope: { ColumnIds: ['Employee'] },
 *            functionScope: ['filter'],
 *            handler(params: PredicateDefHandlerParams) {
 *              return (
 *                params.value == 'Robert King' ||
 *                params.value == 'Laura Callahan' ||
 *                params.value == 'Andrew Fuller'
 *             );
 *            },
 *          },
 *          {
 *            id: 'after_work',
 *            label: 'After Work',
 *            columnScope: { ColumnIds: ['LastUpdatedTime'] },
 *            functionScope: ['filter'],
 *            handler(params: PredicateDefHandlerParams) {
 *             return (params.value as Date).getHours() > 17;
 *           },
 *         },
 *       ],
 *       ......
 *     };
 *  ```
 *
 *  In this example we have created 6 Column Filters.
 *
 *  The last 2 of these reference Custom Predicates (as opposed to System Predicates) which will be defined `customPredicateDefs` (as in this example)
 *
 * Read more at the [Filter Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/filter-function.md)
 *
 */

export interface FilterState extends ConfigState {
  /**
   * Which of the System Filter Predicates shipped by AdapTable you wish to make available.
   *
   * Provide an empty array if you want **no** system filters, or list just the system filters you want.
   *
   * If this property is not set then **all** the system filters are available.
   */
  SystemFilters?: SystemFilterPredicateIds;

  /**
   * List of which Columns are filtered.
   *
   *  A Column Filter contains 2 properties:
   *
   *  - `ColumnId` - which Column is being filtered
   *
   *  - `Predicate` - the predicate to be applied in the filter.  This will be the name of the PredicateId and, optionally, any inputs that it requires.
   *
   */
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
