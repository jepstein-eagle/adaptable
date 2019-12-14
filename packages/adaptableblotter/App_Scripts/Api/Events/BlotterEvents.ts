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

export interface BlotterEventArgs extends FDC3Schema {
  data: any[];
}

export interface AdaptableBlotterEventData {
  name: string;
  type: string;
  id: any;
}
