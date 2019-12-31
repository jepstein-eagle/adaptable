export interface ICellSummmary {
  Sum: any; // can be number or blank
  Average: any; // can be number or blank
  Median: any; // can be number or blank
  Mode: any; // can be number or blank
  Distinct: any; // always a number
  Max: any; // can be number or blank
  Min: any; // can be number or blank
  Count: any; // always a number
  [key: string]: any;
}
