import { DesignTimeState } from './DesignTimeState';

export interface UserInterfaceState extends DesignTimeState {
  ColorPalette?: string[];
  StyleClassNames?: string[];
  PermittedColumnValues?: IPermittedColumnValues[];
}

export interface IPermittedColumnValues {
  ColumnId: string;
  PermittedValues: any[];
}

/*
Property

Type

Comments

ColorPalette

string array

The colours that appear by default in the palette dropdown when setting colours for Styles, Quick Search, Format Column etc. Simply provide the hex value for each colour.

StyleClassNames

string array

A list of (existing and available) css styles that can be used when creating Conditional Styles or Format Columns, thereby avoiding the need to create the style manually.

PermittedColumnValues

IPermittedColumnValues array

A list of which values are permitted by column. If set up, then only the values listed appear in the Query Builder, Bulk Update dropdown etc when that column is selected.

An IPermittedColumnValues object contains 2 properties:

ColumnId - the name of the column

PermittedValues - an array of allowed values
*/
