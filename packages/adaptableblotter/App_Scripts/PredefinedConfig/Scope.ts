import { DataType } from './Common/Enums';

export interface Scope {
  DataType?: DataType;
  ColumnIds?: string[];
  ColumnCategoryIds?: string[];
}
