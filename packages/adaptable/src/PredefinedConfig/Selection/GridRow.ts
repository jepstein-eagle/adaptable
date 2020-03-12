export interface GridRow {
  primaryKeyValue: any;
  rowData: any;
  rowInfo: RowInfo;
  rowNode: any;
}

export interface RowInfo {
  isMaster: boolean;
  isExpanded: boolean;
  isGroup: boolean;
  level: number;
}
