import { AdaptableState } from '../PredefinedConfig/AdaptableState';

export interface TeamSharingOptions {
  // TODO change any
  shareEntity?: (entity: any) => Promise<void>;

  loadEntities?: () => Promise<any>;
}
