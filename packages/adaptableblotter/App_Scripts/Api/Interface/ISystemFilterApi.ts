import { SystemFilterState } from '../../PredefinedConfig/IDesignTimeState/SystemFilterState';
import { IUserFilter } from '../../PredefinedConfig/IUserState/UserFilterState';

export interface ISystemFilterApi {
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: IUserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
