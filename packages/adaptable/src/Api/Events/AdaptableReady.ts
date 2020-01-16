import { AdaptableApi } from '../AdaptableApi';

/**
 * Returned by the on('AdaptableReady') event
 */
export interface AdaptableReadyInfo {
  adaptableApi: AdaptableApi;
  vendorGrid: any;
}
