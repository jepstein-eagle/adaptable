import { SystemFilterState } from '../../PredefinedConfig/IDesignTime State Interfaces/SystemFilterState';
import { IUserFilter } from '../../PredefinedConfig/IUserState Interfaces/UserFilterState';
export interface ISystemFilterApi {
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: IUserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
