import { ConfigState } from './ConfigState';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { QueryObject } from './Common/QueryObject';
import { Scope, ScopeColumnIds, ScopeDataTypes } from './Common/Scope';
import { AdaptableObject } from './Common/AdaptableObject';
import { TypeUuid } from './Uuid';

/**
 * The Predefined Configuration for the Conditional Style function
 *
 * Use Conditional Styles to set rules for how columns or rows should look visualy based on the data they contain.
 *
 * Conditional Styles uses an [Expression](../classes/_predefinedconfig_common_expression_expression_.expression.html) (aka Queries) for evaluation.
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
 *       ColumnId: 'ChangeLastOrder',
 *       Style: {
 *         ForeColor: '#008000',
 *       },
 *       Expression: {
 *         FilterExpressions: [
 *           {
 *             ColumnId: 'ChangeLastOrder',
 *             Filters: ['Positive'],
 *           },
 *         ],
 *       },
 *     },
 *     {
 *       Style: {
 *        ForeColor: '#ff0000',
 *       },
 *       Expression: {
 *         FilterExpressions: [
 *           {
 *             ColumnId: 'ChangeLastOrder',
 *             Filters: ['Negative'],
 *           },
 *         ],
 *       },
 *     },
 *     {
 *       Style: {
 *         BackColor: '#ffffcc',
 *         FontStyle: 'Italic',
 *         ForeColor: '#000000',
 *       },
 *       Expression: {
 *         RangeExpressions: [
 *           {
 *             ColumnId: 'ItemCost',
 *             Ranges: [
 *               {
 *                 Operand1: '80',
 *                 Operand1Type: 'Value',
 *                 Operand2: '',
 *                 Operand2Type: 'Value',
 *                 Operator: 'GreaterThan',
 *               },
 *             ],
 *           },
 *         ],
 *       },
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

export interface StyleScope {
  ColumnIds?: string[];
  DataTypes?: 'String' | 'Number' | 'Boolean' | 'Date';
}

export interface Test {
  Result: string;
}

/**
 * The ConditionalStyle object used in the Conditional Style function.
 */
export interface ConditionalStyle extends QueryObject {
  Scope?: Scope; // though later we should make mandatory with an alll!

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

  //  DataType?: 'String' | 'Number' | 'Boolean' | 'Date';
}
