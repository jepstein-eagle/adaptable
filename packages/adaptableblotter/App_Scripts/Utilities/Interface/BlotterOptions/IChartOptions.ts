export interface IChartOptions {
    /**
     * Whether a chart is displayed at start up.
     * Only applies if there is the CurrentChartName property in Chart State is not empty
     * Defaults to false
     */
    displayOnStartUp: boolean;
    /**
     * Whether to show charts in a modal popup
     * If true, then we ignore the chartContainer property when working out where to show the chart
     * Defaults to false
     */
   showModal: boolean;
}

