import { IStrategy } from './IStrategy';
import { IPushPullReport } from '../../PredefinedConfig/IPushPullState';

export interface IPushPullStrategy extends IStrategy {
  export(report: IPushPullReport, isLiveReport: boolean): void;

  scheduleIPushPullReports(): void;
}
