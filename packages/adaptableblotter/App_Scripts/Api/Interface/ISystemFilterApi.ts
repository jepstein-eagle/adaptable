import { SystemFilterState } from '../../PredefinedConfig/IDesignTimeState/SystemFilterState';
import { UserFilter } from '../../PredefinedConfig/IUserState/UserFilterState';

export interface ISystemFilterApi {
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: UserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
