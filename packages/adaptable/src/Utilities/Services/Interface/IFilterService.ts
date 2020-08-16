import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { KeyValuePair } from '../../Interface/KeyValuePair';
import { IAdaptable, ColumnFilter } from '../../../types';
import { DataType } from '../../../PredefinedConfig/Common/Enums';

export interface IFilterService {
  GetAllSystemFilters(): string[];

  GetUserFilters(userFilters: UserFilter[], userFilterNames: string[]): UserFilter[];

  GetSystemFiltersForColumn(column: AdaptableColumn, systemFilters: string[]): string[];

  GetUserFiltersForColumn(column: AdaptableColumn, userFilters: UserFilter[]): UserFilter[];

  ShowUserFilterForColumn(
    UserFilters: UserFilter[],
    name: string,
    column: AdaptableColumn
  ): boolean;

  GetColumnIdForUserFilter(userFilter: UserFilter): string;

  GetFunctionForSystemFilter(systemFilterName: string): any;

  GetDatatypeForSystemFilter(systemFilterName: string): DataType;

  ConvertColumnFiltersToKVPArray(
    columnFilters: ColumnFilter[],
    columns: AdaptableColumn[]
  ): KeyValuePair[];

  GetColumnFiltersDescription(columnFilters: ColumnFilter[], columns: AdaptableColumn[]): string;
}
