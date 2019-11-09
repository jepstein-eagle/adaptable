import { ApiBase } from './ApiBase';
import { NamedFilterApi } from '../NamedFilterApi';
import { NamedFilter, NamedFilterState } from '../../PredefinedConfig/NamedFilterState';

export class NamedFilterApiImpl extends ApiBase implements NamedFilterApi {
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
