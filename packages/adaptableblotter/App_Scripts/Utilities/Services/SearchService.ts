import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ISearchService } from './Interface/ISearchService';
import * as StrategyConstants from '../Constants/StrategyConstants';
import { SearchChangedTrigger, DisplayAction } from '../../PredefinedConfig/Common/Enums';
import { UserFilterState } from '../../PredefinedConfig/UserFilterState';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';
import { DataSourceState, DataSource } from '../../PredefinedConfig/DataSourceState';
import { ColumnFilterState } from '../../PredefinedConfig/ColumnFilterState';
import { AdvancedSearchState, AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import BlotterHelper from '../Helpers/BlotterHelper';
import {
  BlotterSearchState,
  BlotterSortState,
  SearchChangedInfo,
} from '../../Api/Events/SearchChanged';
import { SearchChangedEventArgs } from '../../types';

export class SearchService implements ISearchService {
  private blotter: IAdaptableBlotter;

  constructor(blotter: IAdaptableBlotter) {
    this.blotter = blotter;

    this.blotter.adaptableBlotterStore.onAny((eventName: string) => {
      if (this.blotter.isInitialised) {
        if (
          eventName == AdvancedSearchRedux.ADVANCED_SEARCH_ADD ||
          eventName == AdvancedSearchRedux.ADVANCED_SEARCH_EDIT ||
          eventName == AdvancedSearchRedux.ADVANCED_SEARCH_DELETE ||
          eventName == AdvancedSearchRedux.ADVANCED_SEARCH_SELECT
        ) {
          this.publishSearchChanged(SearchChangedTrigger.AdvancedSearch);
        } else if (
          eventName == ColumnFilterRedux.COLUMN_FILTER_ADD ||
          eventName == ColumnFilterRedux.COLUMN_FILTER_EDIT ||
          eventName == ColumnFilterRedux.COLUMN_FILTER_SET ||
          eventName == ColumnFilterRedux.COLUMN_FILTER_CLEAR_ALL ||
          eventName == ColumnFilterRedux.COLUMN_FILTER_CLEAR
        ) {
          setTimeout(() => this.blotter.applyGridFiltering(), 5);
          this.publishSearchChanged(SearchChangedTrigger.ColumnFilter);
        } else if (
          eventName == DataSourceRedux.DATA_SOURCE_SELECT ||
          eventName == DataSourceRedux.DATA_SOURCE_ADD ||
          eventName == DataSourceRedux.DATA_SOURCE_EDIT ||
          eventName == DataSourceRedux.DATA_SOURCE_DELETE
        ) {
          this.publishSearchChanged(SearchChangedTrigger.DataSource);
        } else if (
          eventName == QuickSearchRedux.QUICK_SEARCH_APPLY ||
          eventName == QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY ||
          eventName == QuickSearchRedux.QUICK_SEARCH_SET_STYLE
        ) {
          // if not highlighting cell then lets tell quick search strategy to create a range
          if (
            this.blotter.api.quickSearchApi.getQuickSearchDisplayAction() !=
            DisplayAction.HighlightCell
          ) {
            const quickSearchStrategy = this.blotter.strategies.get(
              StrategyConstants.QuickSearchStrategyId
            ) as IQuickSearchStrategy;
            quickSearchStrategy.createQuickSearchRange();
          }
          this.blotter.applyGridFiltering();
          this.blotter.redraw();
          this.publishSearchChanged(SearchChangedTrigger.QuickSearch);
        } else if (
          eventName == UserFilterRedux.USER_FILTER_ADD ||
          eventName == UserFilterRedux.USER_FILTER_EDIT ||
          eventName == UserFilterRedux.USER_FILTER_DELETE ||
          eventName == UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER
        ) {
          setTimeout(() => this.blotter.applyGridFiltering(), 5);
          this.publishSearchChanged(SearchChangedTrigger.UserFilter);
        } else if (eventName == GridRedux.GRID_SET_SORT) {
          this.publishSearchChanged(SearchChangedTrigger.Sort);
        }
      }
    });
  }

  /**
   * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
   * This is primarily to help users who want to run search on the server and so need to know what has changed
   * @param searchChangedTrigger function that triggered the event
   */
  publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void {
    if (this.blotter.isInitialised) {
      const currentDataSource: DataSource = this.blotter.api.dataSourceApi.getCurrentDataSource();
      const currentAdvancedSearch:
        | AdvancedSearch
        | undefined = this.blotter.api.advancedSearchApi.getCurrentAdvancedSearch();

      // lets get the searchstate
      const blotterSearchState: BlotterSearchState = {
        dataSource: currentDataSource == null ? undefined : currentDataSource,
        advancedSearch: currentAdvancedSearch == null ? undefined : currentAdvancedSearch,
        quickSearch: this.blotter.api.quickSearchApi.getQuickSearchValue(),
        columnFilters: this.blotter.api.columnFilterApi.getAllColumnFilter(),
      };

      const blotterSortState: BlotterSortState = {
        columnSorts: this.blotter.api.gridApi.getColumnSorts(),
        customSorts: this.blotter.api.customSortApi.getAllCustomSort(),
      };

      const searchChangedInfo: SearchChangedInfo = {
        searchChangedTrigger,
        blotterSearchState,
        blotterSortState,
        searchAsAtDate: new Date(),
      };

      const searchChangedArgs: SearchChangedEventArgs = BlotterHelper.createFDC3Message(
        'Search Changed Args',
        searchChangedInfo
      );

      // now depprecated and shortly to be removed...
      this.blotter.api.eventApi._onSearchChanged.Dispatch(this.blotter, searchChangedArgs);
      // new way (and soon only way)
      this.blotter.api.eventApi.emit('SearchChanged', searchChangedArgs);
    }
  }
}
