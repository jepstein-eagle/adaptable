import { ConfigState } from './ConfigState';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { QueryObject } from './Common/QueryObject';
import { Scope } from './Common/Scope';
import { Predicate } from './Common/Predicate';

/**
 * The Predefined Configuration for the Conditional Style function
 *
 * Use Conditional Styles to set rules for how columns or rows should look visualy based on the data they contain.
 *
 * Conditional Styles uses an Expression (aka Query) for evaluation.
 *
 * **Further AdapTable Help Resources**
 *
 * [Conditional Style Demo](https://demo.adaptabletools.com/style/aggridconditionalstyledemo/)
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
 *       Scope: {
            DataTypes: ['Number'],
        },
 *       Style: {
 *          ForeColor: '#008000',
 *       },
 *       Expression: '[ChangeLastOrder]> 0'
 *     },
 *     {
 *       Scope: {
            DataTypes: ['Number'],
         },
         Style: {
 *          ForeColor: '#ff0000',
 *       },
 *       Expression: '[ChangeLastOrder]< 0'
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
 */
export interface ConditionalStyle extends QueryObject {
  /**
   * Where the Style is applied - can be for whole Row, some Columns or all Colunns of given DataType
   */
  Scope: Scope;

  Predicate?: Predicate;

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
