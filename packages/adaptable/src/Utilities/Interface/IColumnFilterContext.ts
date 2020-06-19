import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableApi } from '../../Api/AdaptableApi';

export interface IColumnFilterContext {
  Column: AdaptableColumn;
  Adaptable: IAdaptable;
  ShowCloseButton: boolean;
}
