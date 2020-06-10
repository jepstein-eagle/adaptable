import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';

export interface IOpenFinService {
  pushData(data: any[]): Promise<any>;
}
