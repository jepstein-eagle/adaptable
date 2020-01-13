import { IStrategy } from './IStrategy';
import { IPushPullReport } from '../../PredefinedConfig/IPushPullState';

export interface IPushPullStrategy extends IStrategy {
  sendSnapshot(report: IPushPullReport): void;
  startLiveData(report: IPushPullReport): void;
}
