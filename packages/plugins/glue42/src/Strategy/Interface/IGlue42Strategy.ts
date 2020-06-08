import { Glue42Report } from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';

export interface IGlue42Strategy extends IStrategy {
  sendSnapshot(report: Glue42Report): void;
  startLiveData(report: Glue42Report): void;
}
