import { SystemFilterState } from '../PredefinedConfig/SystemFilterState';
import { UserFilter } from '../PredefinedConfig/UserFilterState';

export interface SystemFilterApi {
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: UserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
