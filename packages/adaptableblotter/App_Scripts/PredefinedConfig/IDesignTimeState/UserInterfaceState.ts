import { IDesignTimeState } from './IDesignTimeState';
import { IPermittedColumnValues } from '../../Utilities/Interface/IPermittedColumnValues';

export interface UserInterfaceState extends IDesignTimeState {
  ColorPalette?: string[];
  StyleClassNames?: string[];
  PermittedColumnValues?: IPermittedColumnValues[];
}
