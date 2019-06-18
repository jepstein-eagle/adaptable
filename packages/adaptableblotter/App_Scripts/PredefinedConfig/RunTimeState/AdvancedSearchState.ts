import { RunTimeState } from './RunTimeState';
import { Expression } from '../Common/Expression/Expression';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for Advanced Search
 *
 * **Warning: if you don't specify an output in the configuration your input file will be overridden !**
 *
 * Basic usage example:
 *
 * ```ts
 * "AdvancedSearch":{
 *  "CurrentAdvancedSearch":"Big Dollar Notionals",
 *  "AdvancedSearches":[
 *    {
 *    "Name":"Benelux",
 *    "Expression":{
 *      "ColumnValueExpressions":[
 *      {
 *        "ColumnId":"country",
 *        "ColumnDisplayValues":["Belgium","Holland","Luxembourg"]
 *      }],
 *      "FilterExpressions":[],
 *      "RangeExpressions":[]
 *      }
 *    },
 *    {
 *    "Name":"Trades This Year",
 *    "Expression":{
 *      "ColumnValueExpressions":[],
 *      "FilterExpressions":[
 *      {
 *        "ColumnId":"tradeDate",
 *        "Filters":["This Year"]
 *      }],
 *      "RangeExpressions":[]}
 *     },
 *     {
 *     "Name":"Big Dollar Notionals",
 *     "Expression":{
 *         "ColumnValueExpressions":[
 *          {
 *           "ColumnId":"currency",
 *           "ColumnDisplayValues":["USD"]
 *        }],
 *       "FilterExpressions":[],
 *       "RangeExpressions":[
 *        {
 *          "ColumnId":"notional",
 *          "Ranges":[
 *           {
 *            "Operator":"GreaterThan",
 *            "Operand1":"6000000",
 *            "Operand2":"",
 *            "Operand1Type":"Value",
 *            "Operand2Type":"Value"
 *             }
 *           ]
 *        }
 *        ]}
 *       }
 *    ],
 *  }
 *}
 * ```
 * In this example we have created 3 Advanced Searches: 'Benelux', 'Trades This Year', and 'Big Dollar Notionals'.
 *
 * Note that 'Big Dollar Notionals' (which is also set to be the Current Advanced Search) uses both Column Values and Ranges.
 */
export interface AdvancedSearchState extends RunTimeState {
  AdvancedSearches?: AdvancedSearch[];
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
