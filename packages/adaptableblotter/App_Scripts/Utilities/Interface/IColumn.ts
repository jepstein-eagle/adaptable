import { DataType } from '../../PredefinedConfig/Common/Enums';

export interface IColumn {
  ColumnId: string;
  FriendlyName: string;
  DataType: DataType;
  Visible: boolean;
  ReadOnly: boolean;
  Sortable: boolean;
  Filterable: boolean;
}
