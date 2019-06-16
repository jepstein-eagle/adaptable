import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import { InternalState } from './InternalState';
export interface TeamSharingState extends InternalState {
  Activated: boolean;
  SharedEntities: ISharedEntity[];
}
