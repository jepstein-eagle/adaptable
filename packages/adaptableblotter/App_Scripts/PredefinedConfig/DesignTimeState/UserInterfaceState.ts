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
