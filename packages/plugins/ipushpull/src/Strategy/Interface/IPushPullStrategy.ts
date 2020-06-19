import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';
import { IPushPullReport } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';

export interface IPushPullStrategy extends IStrategy {
  sendSnapshot(report: IPushPullReport): void;
  startLiveData(report: IPushPullReport): void;
}
