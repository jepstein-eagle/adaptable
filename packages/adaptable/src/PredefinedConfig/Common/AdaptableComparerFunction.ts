/**
 * A standard 'comparer' type function used to evaluate custom sorts at run-time.
 *
 * Like all comparer functions it will return -1, 0, 1 to set the sort order.
 *
 * Each time the function is run it is given 2 cell values to compare, and also both (equivalent) rows (to allow you to look up other values in the row if necessary)
 */
export type AdaptableComparerFunction = (
  valueA: any,
  valueB: any,
  nodeA: any,
  nodeB: any
) => number;
