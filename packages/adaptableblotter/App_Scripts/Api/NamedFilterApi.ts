import { ApiBase } from './ApiBase';
import { INamedFilterApi } from './Interface/INamedFilterApi';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';
import { NamedFilter } from '../PredefinedConfig/RunTimeState/NamedFilterState';

export class NamedFilterApi extends ApiBase implements INamedFilterApi {
  public getAllNamedFilter(): NamedFilter[] {
    const config = this.blotter.blotterOptions.predefinedConfig as PredefinedConfig;
    return []; // config.NamedFilter.NamedFilters;  // problem with this is they might not be in config ;()
    // and currently they are not in state and there is no redux
  }
}
