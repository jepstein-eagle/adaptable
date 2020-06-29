import { AdaptableOptions, AdaptableApi } from '../types';

/**
 * Plugin Options used when creating a Master / Detail grid
 *
 * Passed into the plugin as the only argument.
 *
 * It contains 2 properties:
 *
 * * `detailAdaptableOptions` - the Adaptable Options to use for ALL detail (i.e. child) Grids
 *
 * * `onDetailInit` - function called when a Detail Grid is initialised (which happens when it opens) - it is given the Adaptable Api object
 */
export interface MasterDetailAgGridPluginOptions {
  /**
   * The `AdaptableOptions` object to use for **all child Data Grids**.
   *
   * This means that they will all share the same behaviour (and Predefined Config), and any object created for one Detail Grid will be applicable to all.
   */
  detailAdaptableOptions: AdaptableOptions;

  /**
   *  Function called when a Detail Grid is initialised (which happens when it opens)
   *
   * It receives an Adaptable Api object for use in other functions.
   */
  onDetailInit?: (api: AdaptableApi) => void;
}
