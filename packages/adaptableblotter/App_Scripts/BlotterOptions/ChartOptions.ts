/**
 * Options for managing Charts in the Adaptable Blotter
 *
 * Properties to set how and where charts are displayed
 *
 * ```ts
 * chartOptions = {
 *  displayOnStartUp: true,
 *  showModal: false,
 *  pieChartMaxItems: 30,
 *};
 * ```
 */
export interface ChartOptions {
  /**
   * Whether or not a chart is displayed at start up.
   *
   * Only applies if the *CurrentChartName* property in Chart State is not empty.
   *
   * **Default Value: false**
   */
  displayOnStartUp?: boolean;
  /**
   * Whether to show charts in a modal popup.
   *
   * If true, then we ignore the *chartContainer* property when working out where to show the chart; otherwise they appear in the div that is specified im *chartContainer*.
   *
   * **Default Value: false**
   */
  showModal?: boolean;
  /**
   * The maximum number of items to show in a pie chart.
   *
   * This only applies to non numeric columns, because for numeric columns we create *bands* automatically.
   *
   * **Default Value: 50**  (If this number is too big then the pie chart will be difficult to read.)
   */
  pieChartMaxItems?: number;
}
