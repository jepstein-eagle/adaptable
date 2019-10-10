// NOTE:  this file will include only those interfaces that are used in the UI / views,

// make sure property names match DistinctCriteriaPairValue
export interface IRawValueDisplayValuePair {
  RawValue: any;
  DisplayValue: string;
}

export interface IColItem {
  key?: string;
  Size: number;
  Content: any;
}
