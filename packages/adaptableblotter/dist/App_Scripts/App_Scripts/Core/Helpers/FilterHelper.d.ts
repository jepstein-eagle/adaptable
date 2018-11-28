import { DataType } from '../Enums';
import { IColumn } from '../Interface/IColumn';
import { IUserFilter } from '../Api/Interface/IAdaptableBlotterObjects';
export declare module FilterHelper {
    const BLANKS_SYSTEM_FILTER = "Blanks";
    const NON_BLANKS_SYSTEM_FILTER = "Non Blanks";
    const TODAY_SYSTEM_FILTER = "Today";
    const IN_PAST_SYSTEM_FILTER = "In Past";
    const IN_FUTURE_SYSTEM_FILTER = "In Future";
    const YESTERDAY_SYSTEM_FILTER = "Yesterday";
    const TOMORROW_SYSTEM_FILTER = "Tomorrow";
    const NEXT_WORKING_DAY_SYSTEM_FILTER = "Next Working Day";
    const PREVIOUS_WORKING_DAY_SYSTEM_FILTER = "Previous Working Day";
    const THIS_YEAR_SYSTEM_FILTER = "This Year";
    const POSITIVE_SYSTEM_FILTER = "Positive";
    const NEGATIVE_SYSTEM_FILTER = "Negative";
    const ZERO_SYSTEM_FILTER = "Zero";
    const TRUE_SYSTEM_FILTER = "True";
    const FALSE_SYSTEM_FILTER = "False";
    function GetAllSystemFilters(): string[];
    function GetUserFilters(userFilters: IUserFilter[], userFilterNames: string[]): IUserFilter[];
    function GetSystemFiltersForColumn(column: IColumn, systemFilters: string[]): string[];
    function GetUserFiltersForColumn(column: IColumn, userFilters: IUserFilter[]): IUserFilter[];
    function ShowUserFilterForColumn(UserFilters: IUserFilter[], name: string, column: IColumn): boolean;
    function GetColumnIdForUserFilter(userFilter: IUserFilter): string;
    function GetFunctionForSystemFilter(systemFilterName: string): any;
    function GetDatatypeForSystemFilter(systemFilterName: string): DataType;
}
