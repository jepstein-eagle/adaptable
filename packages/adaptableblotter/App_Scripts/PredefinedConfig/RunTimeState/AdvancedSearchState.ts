import { RunTimeState } from './RunTimeState';
import { Expression } from '../Common/Expression/Expression';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for Advanced Search
 *
 * Basic usage example:
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
 * In this example we have created 3 Advanced Searches: 'Benelux', 'Trades This Year', and 'Big Dollar Notionals'.
 *
 * Note that 'Big Dollar Notionals' (which is also set to be the Current Advanced Search) uses both Column Values and Ranges.
 */

/**
 *
 */
export interface AdvancedSearchState extends RunTimeState {
  /**
   * A collection of Advanced Searches - which will appear in the Advanced Search toolbar dropdown.
   *
   *An IAdvancedSearch consists of just 2 properties: (see section below for more information).
   *
   *Name: The name of the Advanced Search
   *
   *Expression: An expression containing the search - see Expression Object Config for more information
   */
  AdvancedSearches?: AdvancedSearch[];

  /**
   * The name of the Advanced Search that should be in use when the Blotter starts.
   *
   * Make sure that the value appears in the name property of one of the Advanced Searches.
   */
  CurrentAdvancedSearch?: string;
}

/**
 * The Advanced Search entity.
 * Contains the name of the Search and an Expression (the query object used in many AdaptableBlotterObjects)
 */
export interface AdvancedSearch extends AdaptableBlotterObject {
  Name: string;
  Expression: Expression;
}
