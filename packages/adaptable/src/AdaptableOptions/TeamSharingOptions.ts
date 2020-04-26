import { SharedEntity } from '../PredefinedConfig/TeamSharingState';

export interface TeamSharingOptions {
  enableTeamSharing: boolean;
  getSharedEntities: (adaptableId: string) => Promise<SharedEntity[]>;
  setSharedEntities: (adaptableId: string, sharedEntities: SharedEntity[]) => Promise<void>;
}
