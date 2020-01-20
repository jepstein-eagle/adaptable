import { AdaptableApi } from '../AdaptableApi';

/**
 * Object returned by the `on('AdaptableReady')` [event](_api_eventapi_.eventapi.html).
 *
 * Contains 2 properties
 *
 * - **adaptableAPI**: This is the *AdaptableApi* which provides run time access to all methods, functionality and events in AdapTable
 *
 * - **vendorGrid**: This is the instance of the underlying vendor grid being used.
 *
 * note: vendorGrid is returned here particularly for 'core' (i.e. vanilla) AdapTable users as the vendorGrid object they set in options is updated by the AdapTable constructor.
 */
export interface AdaptableReadyInfo {
  adaptableApi: AdaptableApi;
  vendorGrid: any;
}
