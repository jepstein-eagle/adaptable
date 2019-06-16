import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';

export interface ISharedEntity {
  entity: IAdaptableBlotterObject;
  strategy: string;
  timestamp: Date;
  user: string;
  blotter_id: string;
}
