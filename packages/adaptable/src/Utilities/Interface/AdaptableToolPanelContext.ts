import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableApi } from '../../Api/AdaptableApi';

export interface AdaptableToolPanelContext {
  Adaptable: IAdaptable;
  Api: AdaptableApi;
}
