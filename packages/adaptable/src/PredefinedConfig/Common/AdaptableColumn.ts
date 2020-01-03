import { DataType } from './Enums';
import { AdaptableObject } from './AdaptableObject';

/**
 * Definition of an Adaptable Column
 *
 * Most (all?) of the properties are created by Adaptable when the grid is loaded
 *
 * The key properties are:
 *
 * -ColumnId: this is the name of the Column in the underlying grid (e.g. field as its sometimes called)
 *
 * -FriendlyName: this is the how the Column is referred to in screens and dialog and is the 'Caption' or 'Header' of the column in the underlying grid.
 */
export interface AdaptableColumn extends AdaptableObject {
  ColumnId: string;
  FriendlyName: string;
  DataType: DataType;
  Visible: boolean;
  ReadOnly: boolean;
  Sortable: boolean;
  Filterable: boolean;
  IsSparkline: boolean;
  Groupable: boolean;
  Pivotable: boolean;
  Aggregatable: boolean;
  SpecialColumn: boolean;
}
