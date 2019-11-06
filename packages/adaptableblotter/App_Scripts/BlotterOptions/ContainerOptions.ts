/**
 * Options for managing the different div elements required by the Adaptable Blotter.
 * ```ts
 * containerOptions = {
 *  adaptableBlotterContainer: 'blotterDiv',
 *  vendorContainer: 'vendorGridDiv',
 *  modalContainer: 'modelDiv',
 *  chartContainer: 'chartDiv',
 *};
 * ```
 */
export interface ContainerOptions {
  /**
   * Name of the **div** element which contains the Adaptable Blotter.
   *
   * Only set if you are not using a div with the default value.
   *
   * This is **onll required if using the vanilla JavaScript version** (and not the Angular or React wrappers).
   *
   * **Default Value: adaptableBlotter**
   */
  adaptableBlotterContainer?: string;

  /**
   * Name of the **div** element which contains the underlying vendor grid.
   *
   * **Default Value: grid**
   */
  vendorContainer?: string;

  /**
   * Name of the **div** element where the modals should appear.
   *
   * **Default Value: null**  (which means that modals appear in the centre of the page).
   */
  modalContainer?: string;

  /**
   * Name of the **div** element where charts should appear.
   *
   * **Make sure you create a div of the same name as that provided here.**
   *
   * **Default Value: null**  (which means that charts will be displayed directly below the toolbar).
   */
  chartContainer?: string;
}
