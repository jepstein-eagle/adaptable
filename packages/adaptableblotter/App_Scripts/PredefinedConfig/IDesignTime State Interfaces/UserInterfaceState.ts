import { IPermittedColumnValues } from '../../Utilities/Interface/IPermittedColumnValues';
import { IDesignTimeState } from '../Interfaces/IDesignTimeState';
export interface UserInterfaceState extends IDesignTimeState {
  ColorPalette?: string[];
  StyleClassNames?: string[];
  PermittedColumnValues?: IPermittedColumnValues[];
}
