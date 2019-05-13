import { IUserState } from '../../Redux/ActionsReducers/Interface/IState';
import { IGridSort } from './IGridSort';
import { ICustomSort } from './BlotterObjects/ICustomSort';
import { IColumnFilter } from './BlotterObjects/IColumnFilter';
import { IAdvancedSearch } from './BlotterObjects/IAdvancedSearch';
import { IAdaptableAlert } from './IMessage';
import { IDataChangedInfo } from './IDataChangedInfo';
import { IDataSource } from './BlotterObjects/IDataSource';

export interface IFDC3Schema {
  object: string;
  definition: string;
  version: string;
}

export interface IColumnStateChangedEventArgs {
  currentLayout: string;
}

export interface IAlertFiredEventArgs {
  alert: IAdaptableAlert;
}

export interface IThemeChangedEventArgs {
  themeName: string;
}

export interface IStateChangedEventArgs extends IFDC3Schema {
  data: IStateEventData[];
}

/**
 * EventArgs sent as part of the onSearchedChanged Event
 */
export interface ISearchChangedEventArgs extends IFDC3Schema {
  data: ISearchEventData[];
}

export interface IEventData {
  name: string;
  type: string;
}

export interface IStateEventData extends IEventData {
  id: IStateChangedInfo;
}

export interface ISearchEventData extends IEventData {
  id: ISearchChangedInfo;
}

export interface IStateChangedInfo {
  stateChangedTrigger:
    | 'AdvancedSearch'
    | 'Alert'
    | 'BulkUpdate'
    | 'CalculatedColumn'
    | 'Calendar'
    | 'CellValidation'
    | 'Chart'
    | 'ColumnFilter'
    | 'ConditionalStyle'
    | 'CustomSort'
    | 'Dashboard'
    | 'DataSource'
    | 'Export'
    | 'FlashingCell'
    | 'FormatColumn'
    | 'FreeTextColumn'
    | 'Layout'
    | 'ColumnCategory'
    | 'PieChart'
    | 'PercentBar'
    | 'PlusMinus'
    | 'QuickSearch'
    | 'CellSummary'
    | 'Shortcut'
    | 'SmartEdit'
    | 'Reminder'
    | 'Theme'
    | 'UserFilter';
  userState: IUserState;
}

export interface ISearchChangedInfo {
  /**
   * Which action in the grid caused the Search state to chagne
   */
  searchChangedTrigger:
    | 'DataSource'
    | 'AdvancedSearch'
    | 'QuickSearch'
    | 'ColumnFilter'
    | 'UserFilter'
    | 'DataChange'
    | 'Sort';

  /**
   * All current active search and filters in the Grid
   */
  blotterSearchState: IBlotterSearchState;

  /**
   * The current sort state in the Grid
   */
  blotterSortState: IBlotterSortState;

  /**
   * Date the search should use - defaults to now
   * Uuseful if getting historical data
   */
  searchAsAtDate: Date;
}

/**
 * The current Search and Filter in the Blotter
 */
export interface IBlotterSearchState {
  /**
   * Current Static Data Source (if any selected)
   */
  dataSource: IDataSource;

  /**
   * Current Advanced Search (if any selected)
   */
  advancedSearch: IAdvancedSearch;

  /**
   * Current live Quick Search text. (Value can be null)
   */
  quickSearch: string;

  /**
   * Details of any column filters currently applied
   */
  columnFilters: IColumnFilter[];
}

/**
 * Overview of the current sorting state in the grid
 */
export interface IBlotterSortState {
  /**
   * Which columns (if any) have sorting applied and,if so, which direction
   */
  gridSorts: IGridSort[];

  /**
   * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
   */
  customSorts: ICustomSort[];
}
