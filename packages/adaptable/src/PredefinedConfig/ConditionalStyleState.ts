import { ConfigState } from './ConfigState';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { QueryObject } from './Common/QueryObject';

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
 *       ConditionalStyleScope: 'Column',
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
 *       ColumnId: 'ChangeLastOrder',
 *       Style: {
 *        ForeColor: '#ff0000',
 *       },
 *       ConditionalStyleScope: 'Column',
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
 *       ConditionalStyleScope: 'Row',
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

/**
 * The ConditionalStyle object used in the Conditional Style function.
 */
export interface ConditionalStyle extends QueryObject {
  /**
   * The column which will be styled (if the scope is Column)
   */
  ColumnId?: string;

  /**
   * The Column Category which will have all its set of columns styled identically (if the scope is ColumnCategory)
   */
  ColumnCategoryId?: string;

  /**
   * Where the Conditional Style is applied:  Either at Column, Row or (if there are any) Column Category level.
   */
  ConditionalStyleScope?: 'Column' | 'Row' | 'ColumnCategory'; //| 'DataType'

  /**
   * The Style to apply when the rule is matched.
   *
   * The Style object defines fore and back colours, font size and other basic style properties.  See [Style](_src_predefinedconfig_common_istyle_.istyle.html) for more details.
   */
  Style?: AdaptableStyle;

  /**
   * Whether to show the Style for Grouped Rows
   *
   * Only applies where the `ConditionalStyleScope` is Row.
   *
   * If unset, will default to false.
   */
  ExcludeGroupedRows?: boolean;

  //  DataType?: 'String' | 'Number' | 'Boolean' | 'Date';
}
