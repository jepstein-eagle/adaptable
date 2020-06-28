import { AdaptableOptions, AdaptableApi } from '../types';

/**
 * Plugin Options used when creating a Master / Detail grid
 *
 * Contains 2 properties:
 *
 * * `detailAdaptableOptions` - the Adaptable Options to use for ALL detail grids
 *
 * * `onDetailInit` - function called when a Detail grid is initialised; it is given the Adaptable Api object
 */
export interface MasterDetailAgGridPluginOptions {
  detailAdaptableOptions: AdaptableOptions;
  onDetailInit?: (api: AdaptableApi) => void;
}
