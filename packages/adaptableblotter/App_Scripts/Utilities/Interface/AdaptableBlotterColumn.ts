import { DataType } from '../../PredefinedConfig/Common/Enums';
import { TypeUuid } from '../../PredefinedConfig/Uuid';

// want to rename this to AdaptableColumn but big job...
export interface AdaptableBlotterColumn {
  Uuid?: TypeUuid; // not sure about this but could be a winner...
  ColumnId: string;
  FriendlyName: string;
  DataType: DataType;
  Visible: boolean;
  ReadOnly: boolean;
  Sortable: boolean;
  Filterable: boolean;
  IsSparkline: boolean;
}
