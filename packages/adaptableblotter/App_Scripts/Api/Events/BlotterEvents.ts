import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ActionColumn } from '../../PredefinedConfig/DesignTimeState/ActionColumnState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';

/**
 * The main object used when publishing events.
 *
 * Based on the FDC3 Schema (see  [FDC3 API](https://fdc3.finos.org/docs/1.0/api/api-intro))
 */
export interface FDC3Schema {
  object: string;
  definition: string;
  version: string;
}

export interface ColumnStateChangedEventArgs {
  currentLayout: string;
}

export interface AlertFiredEventArgs {
  alert: IAdaptableAlert;
}

export interface ActionColumnClickedEventArgs {
  actionColumn: ActionColumn;
  primaryKeyValue: any;
  rowData: any;
}

export interface SelectionChangedEventArgs {
  selectedCellInfo: SelectedCellInfo;
  selectedRowInfo: SelectedRowInfo;
}

export interface ThemeChangedEventArgs {
  themeName: string;
}

export interface AdaptableBlotterEventData {
  name: string;
  type: string;
}
