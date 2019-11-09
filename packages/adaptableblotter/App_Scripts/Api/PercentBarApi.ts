import { PercentBarState, PercentBar } from '../PredefinedConfig/PercentBarState';

/**
 * Provides full and comprehensive run-time access to the Percent Bar function and associated Percent Bar state (from Predefined Config).
 *
 */
export interface PercentBarApi {
  /**
   * Retrieves the Percent Bar section from the Adaptable Blotter State
   */
  getPercentBarState(): PercentBarState;

  /**
   * Retrieves all the Percent Bar objects in the Adaptable Blotter State
   */
  getAllPercentBar(): PercentBar[];

  /**
   * Retrieves a Percent Bar for a given column
   *
   * @param columnId the column which has the Percent Bar
   */
  getPercentBarByColumn(columnId: string): PercentBar;

  /**
   * Adds a new Percent Bar to the Adaptable Blotter State
   *
   * @param percentBar the Percent Bar to add
   */
  addPercentBar(percentBar: PercentBar): void;

  /**
   * Creates a new Percent Bar - using the given properties
   *
   * @param columnId the Id of the column which will show the Percent Bar
   * @param minValue
   * @param maxValue
   * @param positiveColor
   * @param negativeColor
   * @param showValue
   */
  createPercentBar(
    columnId: string,
    minValue: number,
    maxValue: number,
    positiveColor: string,
    negativeColor: string,
    showValue: boolean
  ): void;

  /**
   * Edits an existing Percent Bar
   *
   * It replaces the current Percent Bar for that column with the given one.
   * @param percentBar the Percent Bar to edit
   */
  editPercentBar(percentBar: PercentBar): void;

  /**
   * Edits the Minimum Value in a Percent Bar
   * @param minValue the Minimum Value to set for the Percent Bar
   * @param columnId the Column Id which contains the Percent Bar
   */
  editPercentBarMinValue(minValue: number, columnId: string): void;

  /**
   * Edits the Maximum Value in a Percent Bar
   * @param maxValue the Maximum Value to set for the Percent Bar
   * @param columnId the Column Id which contains the Percent Bar
   */
  editPercentBarMaxValue(maxValue: number, columnId: string): void;

  /**
   * Changes the Positive Colour of a Percent Bar
   * @param positiveColor the Positive Colour to set for the Percent Bar
   * @param columnId the Column Id which contains the Percent Bar
   */
  editPercentBarPositiveColor(positiveColor: string, columnId: string): void;

  /**
   * Edits the Negative Colour in a Percent Bar
   * @param negativeColor the Negative Colour to set for the Percent Bar
   * @param columnId the Column Id which contains the Percent Bar
   */
  editPercentBarNegativeColor(negativeColor: string, columnId: string): void;

  /**
   * Sets whether or not the Percent Bar will additionally display the cell's value
   * @param showValue whether or not to show the cell's value inside the Percent Bar
   * @param columnId the Column Id which contains the Percent Bar
   */
  editPercentBarShowValue(showValue: boolean, columnId: string): void;

  /**
   * Deletes the Percent Bar from the Adaptable Blotter State
   * @param columnId the Column Id which contains the Percent Bar
   */
  deletePercentBar(columnId: string): void;

  /**
   * Opens the Percent Bar popup screen
   */
  showPercentBarPopup(): void;
}
