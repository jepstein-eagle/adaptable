import { AdaptableApi } from '../AdaptableApi';

/**
 * The main object used when publishing events.
 *
 * Based on the FDC3 Schema (see  [FDC3 API](https://fdc3.finos.org/docs/1.0/api/api-intro))
 */
export interface FDC3Schema {
  object: string;
  definition: string;
  version: string;
}

/**
 * Base class for all AdapTable xxxEventArgs objects (e.g. AlertEventArgs, ActionColumnClickedEventArgs etc.)
 */
export interface AdaptableEventArgs extends FDC3Schema {
  data: any[];
}

/**
 * Base class for all AdapTable xxxEventData objects (e.g. AlertEventData, ActionColumnClickedEventData etc.)
 */
export interface AdaptableEventData {
  name: string;
  type: string;
  id: any;
}

/**
 * Base object for all Adaptable Event xxxInfo objects (e.g. AlertInfo, ActionColumnClickedInfo etc.)
 *
 * Contains a single `AdaptableApi` property which gives access to the main {@link AdaptableApi|Adaptable API}
 */
export interface AdaptableEventInfo {
  /**
   * The {@link AdaptableApi|Adaptable API} which provides run-time code access to all AdapTable properties, functions and events.
   *
   * This is available in all EventInfo objects.
   */
  adaptableApi: AdaptableApi;
}
