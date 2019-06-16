import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import { ISystemState } from './ISystemState';
export interface TeamSharingState extends ISystemState {
  Activated: boolean;
  SharedEntities: ISharedEntity[];
}
