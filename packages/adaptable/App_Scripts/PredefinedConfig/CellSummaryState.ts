import { RunTimeState } from './RunTimeState';
import { CellSummaryOperation } from './Common/Enums';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';

/**
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
 * *Finance Plugin*
 *
 *  | Operation | Description                                      |
 *  |---------  |-------------------	                             |
 *  | Sum       | Total of all selected cells	                     |
 *  | Average   | Average of all selected cells 	                 |
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
