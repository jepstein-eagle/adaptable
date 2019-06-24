import { RunTimeState } from './RunTimeState';
import { Expression } from '../Common/Expression/Expression';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for the Advanced Search function
 *
 * Advanced Search enables you to build saveable searches using *Queries* that can be run across multiple columns using a wide variety of *Search Criteria*.
 *
 * **Further Resources**
 *
 * [Advanced Search Help](interfaces/_api_interface_iblotterapi_.iblotterapi.html)
 *
 * [Advanced Search Demo](interfaces/_api_interface_iblotterapi_.iblotterapi.html)
 *
 * [Blotter API for Advanced Search](_api_interface_iadvancedsearchapi_.iadvancedsearchapi.html)
 *
 * **Basic usage example**
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
   *An AdvancedSearch consists of just 2 properties:
   *
   *- Name: The name of the Advanced Search
   *
   *- Expression: An expression containing the search
   */
  AdvancedSearches?: AdvancedSearch[];

  /**
   * The name of the Advanced Search which will be in use when the Blotter starts.
   *
   * It will be the selected value in the Advanced Search Toolbar and the Adaptable Blotter will apply it automatically.
   *
   * **Make sure that the value appears in the name property of one of the Advanced Searches that you provide**
   */
  CurrentAdvancedSearch?: string;
}

/**
 * The AdvancedSearch object used in the Advanced Search function.
 *
 * An AdvancedSearch consists of just 2 properties:
 *
 *- Name: The name of the Advanced Search
 *
 *- Expression: An expression which the Advanced Search will run to evaluate which rows are displayed.
 */
export interface AdvancedSearch extends AdaptableBlotterObject {
  Name: string;
  Expression: Expression;
}
