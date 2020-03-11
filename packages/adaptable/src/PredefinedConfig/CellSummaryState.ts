import { RunTimeState } from './RunTimeState';
import { CellSummaryOperation } from './Common/Enums';

/**
 * The Predefined Configuration for the Cell Summary function
 *
 * Cell Summary shows information about the selected cells in the Adaptable Blotter using a number of Operations.
 *
 * Note: if you are using the Finance plug-in, extra finance-related operations are available.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo/) | [Cell Summary API](_src_api_cellsummaryapi_.cellsummaryapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360004550458-Cell-Summary-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
 *
 *  *Cell Summary Operations*
 *
 *  | Operation | Description                                      |
 *  |---------  |-------------------	                             |
 *  | Sum       | Total of all selected cells	                     |
 *  | Average   | Average of all selected cells 	                 |
 *  | Median    | Median of all selected cells 	                   |
 *  | Distinct  | Lists all distinct values in the selected cells	 |
 *  | Max  	    | Highest value in selected cells 	               |
 *  | Min   	  | Lowest value in selected cells 	                 |
 *  | Count  	  | Count of selected cells 	                       |
 *
 * *Finance Plugin Additional Operations*
 *
 *  | Operation | Description                                      |
 *  |---------  |-------------------	                             |
 *  | Only      | If all cells are same value it returns that value; otherwise it returns nothing |
 *  | VWAP      | Runs VWAP analysis - requires selection of 2 contiguous columns	                |
 *
 *
 */
export interface CellSummaryState extends RunTimeState {
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
   * Note:  Here you just provide the **name of the function**.  The actual implementation of the function is in UserOptions.
   */
  OperationFunction: string;
}
