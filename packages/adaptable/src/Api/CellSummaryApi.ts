import {
  CellSummaryState,
  CellSummaryOperationDefinition,
} from '../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../PredefinedConfig/Common/Enums';

/**
 *  Provides full and comprehensive run-time access to the Cell Summary function
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
 * {@link CellSummaryState|Cell Summary State}
 *
 * [Cell Summary Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/cell-summary-function.mdd)
 *
 *
 */
export interface CellSummaryApi {
  /**
   * Retrieves the Cell Summary section from AdapTable State
   */
  getCellSummaryState(): CellSummaryState;

  /**
   * Retrieves the currently selected Cell Summary Operation
   */
  getCellSummaryOperation(): CellSummaryOperation | string;

  /**
   * Retrieves all Cell Summary Definitions from the AdapTable State
   */
  getCellSummaryOperationDefinitions(): CellSummaryOperationDefinition[];

  /**
   * Adds the inputted Cell Summary defiitions to the AdapTable State
   *
   * @param cellSummaryOperationDefinitions Cell Summary definitions to add
   */
  addCellSummaryOperationDefinitions(
    cellSummaryOperationDefinitions: CellSummaryOperationDefinition[]
  ): void;

  /**
   * Opens the Cell Summary popup screen
   */
  showCellSummaryPopup(): void;
}
