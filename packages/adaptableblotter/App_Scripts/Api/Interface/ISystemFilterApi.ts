import { IUserFilter } from '../../Utilities/Interface/IAdaptableBlotterObjects';
export interface ISystemFilterApi {
  userFilterSet(userFilters: IUserFilter[]): void;
  Set(systemFilters: string[]): void;
  Clear(): void;
  GetCurrent(): string[];
  GetAll(): string[];
}
