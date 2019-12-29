import { RunTimeState } from './/RunTimeState';
import { Expression } from './Common/Expression';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Advanced Search function
 *
 * Advanced Search enables you to build saveable searches using *Queries* that can be run across multiple columns using a wide variety of *Search Criteria*.
 *
 * Advanced Search use an [Expression](../classes/_predefinedconfig_common_expression_expression_.expression.html) (aka Queries) for evaluation.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/) | [Advanced Search API](_api_advancedsearchapi_.advancedsearchapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895971-Advanced-Search-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755137-Search-Functions)
 *
 * **Advanced Search Predefined Config Example**
 *
 * ```ts
 * export default {
 * AdvancedSearch: {
 *  CurrentAdvancedSearch:"Big Dollar Notionals",
 *  AdvancedSearches:[
 *    {
 *    Name:"Benelux",
 *    Expression:{
 *      ColumnValueExpressions:[
 *      {
 *        ColumnId:"country",
 *        ColumnDisplayValues:["Belgium","Holland","Luxembourg"]
 *      }],
 *      }
 *    },
 *    {
 *    Name:"Trades This Year",
 *    Expression:{
 *      FilterExpressions:[
 *      {
 *        ColumnId:"tradeDate",
 *        Filters:["This Year"]
 *      }],
 *     },
 *     {
 *     Name:"Big Dollar Notionals",
 *     Expression:{
 *         ColumnValueExpressions:[
 *          {
 *           ColumnId:"currency",
 *           ColumnDisplayValues:["USD"]
 *        }],
 *       RangeExpressions:[
 *        {
 *          ColumnId:"notional",
 *          Ranges:[
 *           {
 *            Operator:"GreaterThan",
 *            Operand1:"6000000",
 *            Operand2:"",
 *            Operand1Type:"Value",
 *            Operand2Type:"Value"
 *             }
 *           ]
 *        }
 *        ]}
 *       }
 *    ],
 *  }
 * } as PredefinedConfig;
 * ```
 * In this example we have created 3 Advanced Searches:
 *
 * - 'Benelux' (which uses **Column Values**)
 *
 * - 'Trades This Year' (which uses **Filters**)
 *
 * - 'Big Dollar Notionals' (which uses both ColumnValues and **Ranges**) and is also set to be the Current Advanced Search.
 */
export interface AdvancedSearchState extends RunTimeState {
  /**
   * A collection of AdvancedSearch objects - which will appear in the Advanced Search toolbar dropdown.
   *
   * **Default Value**:  Empty array
   */
  AdvancedSearches?: AdvancedSearch[];

  /**
   * The name of the Advanced Search which will be in use when the Blotter starts.
   *
   * It will be the selected value in the Advanced Search Toolbar and the Adaptable Blotter will apply it automatically.
   *
   * **Make sure that the value appears in the name property of one of the Advanced Searches that you provide**
   *
   * **Default Value**:  Empty string
   */
  CurrentAdvancedSearch?: string;
}

/**
 * The AdvancedSearch object used in the Advanced Search function.
 */
export interface AdvancedSearch extends AdaptableObject {
  /**
   * The name of the Advanced Search - used for *external* identification purposes
   */
  Name: string;

  /**
   * The Expression (or Query) that the Advanced Search implements when its run.  Only rows that satisfy the Expression are displayed.
   */
  Expression: Expression;
}
