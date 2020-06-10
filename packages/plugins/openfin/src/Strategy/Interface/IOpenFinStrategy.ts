import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';

export interface IOpenFinStrategy extends IStrategy {
  sendSnapshot(report: OpenFinReport): void;
  startLiveData(report: OpenFinReport): void;
}
