import { IAdaptableBlotter } from '../../types';

export interface IPushPullService {
  getPPInstance: () => any;
}

export class PushPullService implements IPushPullService {
  public ppInstance: any = null;

  constructor(public blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  public getPPInstance(): any | null {
    if (this.ppInstance) {
      return this.ppInstance;
    }

    return (this.ppInstance = this.blotter.api.partnerConfigApi.getPushPullInstance());
  }
}
