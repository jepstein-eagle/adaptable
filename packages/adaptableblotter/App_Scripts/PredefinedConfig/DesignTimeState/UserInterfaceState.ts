import { DesignTimeState } from './DesignTimeState';
import { IPermittedColumnValues } from '../../Utilities/Interface/IPermittedColumnValues';

export interface UserInterfaceState extends DesignTimeState {
  ColorPalette?: string[];
  StyleClassNames?: string[];
  PermittedColumnValues?: IPermittedColumnValues[];
}
