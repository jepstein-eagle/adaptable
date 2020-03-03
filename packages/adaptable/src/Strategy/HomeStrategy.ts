import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IHomeStrategy } from './Interface/IHomeStrategy';

// This is a special strategy that the user can never remove but which is useful to us
// We use it to manage internal state changes and menu items that are not directly strategy related
// But dont really like it and think we can do this better...
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.HomeStrategyId, adaptable);
    // useful for when grid reloads (e.g. at midnight);
    this.adaptable._on('GridReloaded', () => {
      this.adaptable.applyGridFiltering();
    });
  }

  public setStrategyEntitlement(): void {
    this.AccessLevel = 'Full';
  }
}
