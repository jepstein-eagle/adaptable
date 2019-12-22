import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import { ColumnFilter } from '../../../PredefinedConfig/ColumnFilterState';
import { KeyValuePair } from '../../Interface/KeyValuePair';
import { IAdaptableBlotter } from '../../../types';

export interface IFilterService {
  GetAllSystemFilters(): string[];

  GetUserFilters(userFilters: UserFilter[], userFilterNames: string[]): UserFilter[];

  GetSystemFiltersForColumn(column: AdaptableColumn, systemFilters: string[]): string[];

  GetUserFiltersForColumn(column: AdaptableColumn, userFilters: UserFilter[]): UserFilter[];

  GetNamedFiltersForColumn(
    column: AdaptableColumn,
    namedFilters: NamedFilter[],
    columnCategories: ColumnCategory[]
  ): NamedFilter[];

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
