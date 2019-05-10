import { IUserFilter } from '../../Utilities/Interface/BlotterObjects/IUserFilter';
import { SystemFilterState } from '../../Redux/ActionsReducers/Interface/IState';
export interface ISystemFilterApi {
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: IUserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
