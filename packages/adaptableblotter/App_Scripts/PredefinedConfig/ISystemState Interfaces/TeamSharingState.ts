import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import { ISystemState } from '../Interfaces/ISystemState';
export interface TeamSharingState extends ISystemState {
  Activated: boolean;
  SharedEntities: ISharedEntity[];
}
