import { InternalState } from './InternalState';
import { SharedEntity } from '../Utilities/Interface/SharedEntity';
export interface TeamSharingState extends InternalState {
  Activated: boolean;
  SharedEntities: SharedEntity[];
}
