import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

export interface LayoutState extends RunTimeState {
  CurrentLayout?: string;
  Layouts?: Layout[];
}

export interface Layout extends AdaptableBlotterObject {
  Name: string;
  Columns: string[];
  ColumnSorts?: ColumnSort[];
  VendorGridInfo?: VendorGridInfo;
}

export interface ColumnSort {
  Column: string;
  SortOrder: 'Ascending' | 'Descending';
}

export interface VendorGridInfo {
  GroupState?: any;
  ColumnState?: any;
  ColumnGroupState?: any;
  InPivotMode?: boolean;
}

/*
CurrentLayout

string

The name of the currently selected layout. If none is provided then no layout is selected at startup.

Layouts

ILayout array

A collection of ILayout objects representing a Layout. See table below for more details.


ILayout object
The ILayout object contains the following properties

Table 18. ILayout Object Properties

Property

Type

Comments

Name

string

The name of the layout - this is what will appear in the dropdown.

Columns

string array

A collection of the names of all the columns in the layout - they will appear in the grid in the order that they appear in the list.

ColumnSorts

IColumnSort array

A collection of IColumnSort objects.

The ColumnSort object contains 2 properties:

Column - the name of the column which has a sort order

SortOrder - either "Ascending" or "Descending"

VendorGridInfo

any

Any additional vendor grid properties.

Warning
Don't populate this property yourself - instead let the Adaptable Blotter do it when the layout is loaded.

Note
This property is only used if the IncludeVendorState property is set to true in LayoutOptions when setting up the Grid (see Layout Options for more information).
*/
