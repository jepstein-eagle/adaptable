// used in layouts to save which is the current sorted column
export interface IGridSort {
  Column: string;
  SortOrder: 'Unknown' | 'Ascending' | 'Descending';
}
