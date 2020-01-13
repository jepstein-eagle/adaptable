export interface GridRow {
  primaryKeyValue: any;
  rowData: any;
  rowInfo: RowInfo;
}

export interface RowInfo {
  isMaster: boolean;
  isExpanded: boolean;
  isGroup: boolean;
  level: number;
}
