import { ConfigState } from './/ConfigState';
import { Expression } from './Common/Expression';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Advanced Search function
 *
 * Advanced Search enables you to build saveable searches using *Queries* that can be run across multiple columns using a wide variety of *Search Criteria*.
 *
 * Advanced Search uses an [[Expression]] (aka Queries) for evaluation.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Advanced Search Demo](https://demo.adaptabletools.com/search/aggridadvancedsearchdemo/)
 *
 * - {@link AdvancedSearchApi|Advanced Search API}
 *
 * - {@link SearchOptions|Search Options}
 *
 * - [Advanced Search Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/advanced-search-function.md)
 *
 * - [Expression Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-expression-guide.md)
 *
 * - [Server Functionality Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-server-functionality-guide.md)
 *
 * --------------
 *
 * ### Advanced Search Predefined Config Example**
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
 * - *Benelux* (which uses **Column Values**)
 *
 * - *Trades This Year* (which uses **Filters**)
 *
 * - *Big Dollar Notionals* (which uses both **ColumnValues** and **Ranges**) and is also set to be the `CurrentAdvancedSearch`.
 */
export interface AdvancedSearchState extends ConfigState {
  /**
   * A collection of `AdvancedSearch` objects
   *
   * These will appear in the dropdowns in the Advanced Search Toolbar and ToolPanel.
   *
   * **Default Value**:  Empty array
   */
  AdvancedSearches?: AdvancedSearch[];

  /**
   * The name of the currently run Advanced Search
   *
   * It will be the selected value in the Advanced Search Toolbar and ToolPanel and AdapTable will apply it automatically.
   *
   * It is saved in the User's state and, consequently, will be re-applied (and run) automatically the next time that AdapTable loads up.
   *
   * **Make sure that the value given, is a valid Advanced Search name**
   *
   * **Default Value**:  Empty string
   */
  CurrentAdvancedSearch?: string;
}

/**
 * The `AdvancedSearch` object used in the Advanced Search function.
 *
 *  See [Advanced Search State](_src_predefinedconfig_advancedsearchstate_.advancedsearchstate.html) for full information on how to create Advanced Searches and links to other relevant AdapTable help resources.
 *
 */
export interface AdvancedSearch extends AdaptableObject {
  /**
   * The name of the Advanced Search
   *
   * This is used for *external* identification purposes - please ensure it is unique
   *
   * It is the value that will appear in the dropdown in the Advanced Search Toolbar and ToolPanel.
   */
  Name: string;

  /**
   * The Expression (or Query) that the Advanced Search function evaluates each time it runs.
   *
   * Only rows that satisfy the Expression are displayed in AdapTable.
   *
   * See [Expression Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-expression-guide.md) for more information.
   *
   */
  Expression: Expression;
}
