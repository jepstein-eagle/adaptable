/**
 * General options section of Adaptable Blotter Options.
 *
 * Essentially those options that didnt fit into an obvious group (e.g. Layout, Filter etc.) but we didnt want at root.
 *
 * Includes options for Server Searching, Themes and managing Primary Keys.
 *
 * ```ts
 * flashingUpdateOptions = {
 *  defaultFlashingColumnUpColor: 'AdvancedSearch',
 *  useDefaultVendorGridThemes: false
 *};
 * ```
 */
export interface FlashingUpdateOptions {
  /**
   * Whether or not to show a Blotter Tool Panel on the right hand side (ag-Grid only).
   *
   * Recommended to set to true (default) to give users access.
   *
   * Note - the toolpanel is not yet operational and will be released in the Summer of 2019.
   *
   * **Default Value: false**
   */
  defaultFlashingColumnUpColor?: string;
}
