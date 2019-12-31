import { RunTimeState } from './RunTimeState';
import { CellSummaryOperation } from './Common/Enums';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';

/**
 * The Predefined Configuration for the Cell Summary function
 *
 * Cell Summary shows information about the selected cells in the Adaptable Blotter using a number of Operations.
 *
 * Note: if you are using the Finance plug-in, extra finance-related operations are available.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/gridmanagement/aggridcellsummarydemo/) | [Cell Summary API](_api_cellsummaryapi_.cellsummaryapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360004550458-Cell-Summary-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
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
  SummaryOperation?: CellSummaryOperation | string;
}

export interface CellSummaryOperationDefinition {
  OperationName: string;
  OperationFunction: (operationParam: {
    selectedCellInfo: SelectedCellInfo;
    allValues: any[];
    numericColumns: string[];
    numericValues: number[];
    distinctCount: number;
  }) => any;
}
