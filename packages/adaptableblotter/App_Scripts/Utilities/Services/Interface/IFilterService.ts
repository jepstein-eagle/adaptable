import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import { ColumnFilter } from '../../../PredefinedConfig/ColumnFilterState';
import { KeyValuePair } from '../../Interface/KeyValuePair';
import { IAdaptableBlotter } from '../../../types';

export interface IFilterService {
  GetAllSystemFilters(): string[];

  GetUserFilters(userFilters: UserFilter[], userFilterNames: string[]): UserFilter[];

  GetSystemFiltersForColumn(column: AdaptableBlotterColumn, systemFilters: string[]): string[];

  GetUserFiltersForColumn(column: AdaptableBlotterColumn, userFilters: UserFilter[]): UserFilter[];

  GetNamedFiltersForColumn(
    column: AdaptableBlotterColumn,
    namedFilters: NamedFilter[],
    columnCategories: ColumnCategory[]
  ): NamedFilter[];

  ShowUserFilterForColumn(
    UserFilters: UserFilter[],
    name: string,
    column: AdaptableBlotterColumn
  ): boolean;

  GetColumnIdForUserFilter(userFilter: UserFilter): string;

  GetFunctionForSystemFilter(systemFilterName: string): any;

  GetDatatypeForSystemFilter(systemFilterName: string): DataType;

  ConvertColumnFiltersToKVPArray(
    columnFilters: ColumnFilter[],
    columns: AdaptableBlotterColumn[]
  ): KeyValuePair[];

  GetColumnFiltersDescription(
    columnFilters: ColumnFilter[],
    columns: AdaptableBlotterColumn[]
  ): string;
}
