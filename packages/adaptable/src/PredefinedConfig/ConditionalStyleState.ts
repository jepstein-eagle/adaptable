import { ConfigState } from './ConfigState';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { QueryObject } from './Common/QueryObject';
import { AdaptableScope } from './Common/AdaptableScope';
import { AdaptablePredicate } from './Common/AdaptablePredicate';
import { TypeHint } from './Common/Types';

/**
 * The Predefined Configuration for the Conditional Style function
 *
 * Use Conditional Styles to set rules for how columns or rows should look visualy based on the data they contain.
 *
 * Conditional Styles uses either a Predicate or an Expression (aka Query) for evaluation.
 *
 * **Further AdapTable Help Resources**
 *
 * [Conditional Style Demo](https://demo.adaptabletools.com/style/aggridconditionalstyledemo/)
 *
 * {@link ConditionalStyleApi|Conditional Style Api}
 *
 * [Conditional Style Api](_src_api_conditionalstyleapi_.conditionalstyleapi.html)
 *
 * [Conditional Style Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/conditional-style-function.md)
 *
 * **Conditional Style Predefined Config Example**
 *
 * ```ts
 * export default {
 * ConditionalStyle: {
 *   ConditionalStyles: [
 *     {
 *        Scope: {
 *         DataTypes: ['Number'],
 *       },
 *        Style: {
 *          ForeColor: '#008000',
 *        },
 *        Predicate: {
 *          PredicateId: 'Positive',
 *        },
 *      },
 *      {
 *        Scope: {
 *          ColumnIds: ['InvoicedCost'],
 *        },
 *        Style: {
 *          BackColor: '#ffffcc',
 *          FontStyle: 'Italic',
 *          ForeColor: '#000000',
 *        },
 *        Expression: '[InvoicedCost] > 1000 AND [ItemCount] < 20',
 *        ExcludeGroupedRows: true,
 *     },
 *   ],
 * },
 * } as PredefinedConfig;
 * ```
 **/
export interface ConditionalStyleState extends ConfigState {
  ConditionalStyles?: ConditionalStyle[];
  ExcludeGroupedRows?: boolean;
}

/**
 * The ConditionalStyle object used in the Conditional Style function.
 *
 * Note: the Rule should be **either a Predicate or an Expression** but not both.
 *
 * Predicates are preferred and used in most scenarios but Expressions are available for more complicated use cases.
 */
export interface ConditionalStyle extends QueryObject {
  /**
   * Where the Style is applied - can be for whole Row, some Columns or all Colunns of given DataType
   */
  Scope: AdaptableScope;

  /**
   * The Rule to use for deciding if a style needs to be applied.
   *
   * The Predicate will include a type (e.g. 'GreaterThan' and potentially inputs (e.g. '20'))
   */
  Predicate?: ConditionalStylePredicate;

  /**
   * The Style to apply when the rule is matched.
   *
   * The Style object defines fore and back colours, font size and other basic style properties.  See [Style](_src_predefinedconfig_common_istyle_.istyle.html) for more details.
   */
  Style: AdaptableStyle;

  /**
   * Whether to show the Style for Grouped Rows
   *
   * Only applies where the `Scope` is undefined (i.e. 'Row').
   *
   * If unset, will default to false.
   */
  ExcludeGroupedRows?: boolean;
}

export interface ConditionalStylePredicate extends AdaptablePredicate {
  PredicateId: TypeHint<string, SystemConditionalStylePredicateId>;
}

type SystemConditionalStylePredicateId = 'Blanks' | 'NonBlanks';
