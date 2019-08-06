import { ApiBase } from './ApiBase';
import { INamedFilterApi } from './Interface/INamedFilterApi';
import { NamedFilter, NamedFilterState } from '../PredefinedConfig/RunTimeState/NamedFilterState';

export class NamedFilterApi extends ApiBase implements INamedFilterApi {
  public getNamedFilterState(): NamedFilterState {
    return this.getBlotterState().NamedFilter;
  }

  public getAllNamedFilter(): NamedFilter[] {
    return this.getNamedFilterState().NamedFilters;
  }

  public getNamedFilterByName(name: string): NamedFilter {
    return this.getAllNamedFilter().find(nf => nf.Name == name);
  }
}
