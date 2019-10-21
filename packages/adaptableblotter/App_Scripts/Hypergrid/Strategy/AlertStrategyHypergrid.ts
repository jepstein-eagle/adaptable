import { AdaptableBlotter } from '../AdaptableBlotter';
import { AlertStrategy } from '../../Strategy/AlertStrategy';
import { IAlertStrategy } from '../../Strategy/Interface/IAlertStrategy';

export class AlertStrategyHypergrid extends AlertStrategy implements IAlertStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
  }

  public initStyles(): void {
    // to do
  }
}
