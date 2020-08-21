import { ConfigState } from './ConfigState';
import { CellSummaryOperation } from './Common/Enums';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';
import { SelectedCellInfo } from '../types';

/**
 * The Predefined Configuration for the Cell Summary function
 *
 * Cell Summary shows information about the selected cells in the Adaptable Blotter using a number of Operations.
 *
 * Note: if you are using the Finance plug-in, extra finance-related operations are available.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Cell Summary Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo/)
 *
 * {@link CellSummaryApi|Cell Summary Api}
 *
 * [Cell Summary Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/cell-summary-function.md)
 *
 * --------------
 *
 *  * **Cell Summary Example**
 *
 * ```ts
 *
 * export default {
 *  CellSummary: {
 *    CellSummaryOperationDefinitions: [
 *      {
 *        OperationName: 'Oldest',
 *        OperationFunction: 'OldestOperationFunction',
 *      },
 *    ],
 *    SummaryOperation: 'Min',
 *  },
 * } as PredefinedConfig;
 *
 *  const adaptableOptions: AdaptableOptions = {
 *   ...
 *    userFunctions: [
 *      {
 *        type: 'CellSummaryOperationFunction',
 *        name: 'OldestOperationFunction',
 *        handler(operationParam) {
 *          let dateValues: Date[] = [];
 *          operationParam.selectedCellInfo.Columns.filter(
 *            c => c.DataType === 'Date'
 *          ).forEach(dc => {
 *            let gridCells = operationParam.selectedCellInfo.GridCells.filter(
 *              gc => gc.columnId == dc.ColumnId
 *            ).map(gc => gc.rawValue);
 *            dateValues.push(...gridCells);
 *          });
 *          if (dateValues.length > 0) {
 *            const sortedDates = dateValues.sort((a, b) => {
 *              return new Date(a).getTime() - new Date(b).getTime();
 *            });
 *            return new Date(sortedDates[0]).toLocaleDateString();
 *          }
 *        },
 *      },
 *    ],
 *    ...
 *  };
 *
 *  In this example we have created a Custom Cell Summary definition called 'Oldest'.
 *
 *  We reference it in the Cell Summary section of Predefined Config and provide the actual function implementation in the `userFunctions` section of AdaptableOptions.
 *
 * --------------
 *
 *  *Cell Summary Operations*
 *
 *  | Operation | Description                                      |
 *  |---------  |-------------------	                             |
 *  | Sum       | Total of all selected cells	                     |
 *  | Average   | Average of all selected cells 	                 |
 *  | Median    | Median of all selected cells 	                   |
 *  | Mode      | The most common value of all selected cells 	                   |
 *  | Distinct  | Count of distinct values in the selected cells	 |
 *  | Max  	    | Highest value in selected cells 	               |
 *  | Min   	  | Lowest value in selected cells 	                 |
 *  | Count  	  | Count of selected cells 	                       |
 *
 * *Finance Plugin Additional Operations*
 *
 *  | Operation       | Description                                      |
 *  |---------        |-------------------	                             |
 *  | Only            | If all cells are same value it returns that value; otherwise it returns nothing |
 *  | VWAP            | Runs VWAP analysis - requires selection of 2 contiguous columns	                |
 *  | WeightedAverage | Calculates Weighted Average - requires selection of 2 contiguous columns	                |
 *
 *
 */
export interface CellSummaryState extends ConfigState {
  /**
   * The Current Summary Operation being used
   */
  SummaryOperation?: CellSummaryOperation | string;

  /**
   * Array of `CellSummaryOperationDefinition` - to be provided by at Design Time
   *
   * Each CellSummaryOperationDefinition contains a name and a refrence to the `OperationFunction` which is run when selected cells need to be summarised
   */
  CellSummaryOperationDefinitions?: CellSummaryOperationDefinition[];
}

/**
 * Additional Cell Summary Operations that can be provided by Users at Design Time
 */
export interface CellSummaryOperationDefinition {
  /**
   * The name of the Operation
   *
   * This is what will be displayed in the Cell Summary dropdowns.
   */
  OperationName: string;

  /**
   * The function that will be run each time the summary result is required.
   *
   * The function receives all the currently selected values, the numeric columns, the numeric values and much else and is expected to return a single value to be displayed in the dropdown.
   *
   * Note:  Here you just provide the **name of the function**.  The actual implementation of the function will be injected into UserOptions.
   */
  OperationFunction: string;
}

/**
 * A Function that allows users to provide their own Cell Summary operations.
 *
 * Each time it runs it is given full information about all cells that are selected (with totals)
 *
 * Note: The implementation of this function is inserted into the UserFunctions section of AdaptableOptions, with a named reference to it in the `CellSummary` section of Predefined Config.
 */
export interface CellSummaryOperationFunction extends BaseUserFunction {
  type: 'CellSummaryOperationFunction';
  name: string;
  handler: (operationParam: {
    selectedCellInfo: SelectedCellInfo;
    allValues: any[];
    numericColumns: string[];
    numericValues: number[];
    distinctCount: number;
  }) => any;
}
