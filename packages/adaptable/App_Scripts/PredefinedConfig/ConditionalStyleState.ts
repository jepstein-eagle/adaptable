import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';
import { AdaptableStyle } from './Common/AdaptableStyle';

/**
 * The Predefined Configuration for the Conditional Style function
 *
 * Use Conditional Styles to set rules for how columns or rows should look visualy based on the data they contain.
 *
 * Conditional Styles uses an [Expression](../classes/_predefinedconfig_common_expression_expression_.expression.html) (aka Queries) for evaluation.
 *
 * **Further Resources**
 *
 * [Conditional Style Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360030602892-Conditional-Style-Videos)
 *
 * [Conditional Style Demo](https://demo.adaptableblotter.com/style/aggridconditionalstyledemo/)
 *
 * [Conditional Style API](_api_conditionalstyleapi_.conditionalstyleapi.html)
 *
 * [Conditional Style FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029742932-Conditional-Styles-FAQ)
 *
 * [Conditional Style Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
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
export interface ConditionalStyleState extends RunTimeState {
  ConditionalStyles?: ConditionalStyle[];
}

/**
 * The ConditionalStyle object used in the Conditional Style function.
 */
export interface ConditionalStyle extends AdaptableObject {
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
  ConditionalStyleScope?: 'Column' | 'Row' | 'ColumnCategory';

  /**
   * When the Style should be applied.  Only rows that match the Expression will be styled.  See [Expression](../classes/_predefinedconfig_common_expression_expression_.expression.html) for more details.
   */
  Expression?: Expression;

  /**
   * The Style to apply when the rule is matched.
   *
   * The Style object defines fore and back colours, font size and other basic style properties.  See [Style](_predefinedconfig_common_istyle_.istyle.html) for more details.
   */
  Style?: AdaptableStyle;
}

/*
A collection of Conditional Styles

An IConditionalStyle consists of 5 properties: (see section below for more information).

ColumnId: The column which will be styled (if there is one)

ColumnCategoryId: The Column Category which will have all its columns styled.

ConditionalStyleScope: Where the Style will be applied.  Possible values are: Column, Row, ColumnCategory

Expression: When the Style should be applied.  Only rows that match the Expression will be styled.  See Expression Object Config for more details.

Style: The style to apply.  See Style Object Config for more details.

*/
