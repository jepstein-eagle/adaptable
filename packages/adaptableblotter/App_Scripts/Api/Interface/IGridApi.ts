export interface IGridApi {
  /**
  * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
  * @param data can be any data from any datasource that is suitable for the underlying grid.
  */
  setGridData(data: any): void;
}
