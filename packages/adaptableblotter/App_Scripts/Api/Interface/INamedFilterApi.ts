import {
  NamedFilter,
  NamedFilterState,
} from '../../PredefinedConfig/RunTimeState/NamedFilterState';

export interface INamedFilterApi {
  getNamedFilterState(): NamedFilterState;

  getAllNamedFilter(): NamedFilter[];
}
