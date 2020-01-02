import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ISearchService } from './Interface/ISearchService';
import * as StrategyConstants from '../Constants/StrategyConstants';
import { SearchChangedTrigger, DisplayAction } from '../../PredefinedConfig/Common/Enums';
import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import {
  BlotterSearchState,
  BlotterSortState,
  SearchChangedInfo,
} from '../../Api/Events/SearchChanged';
import { SearchChangedEventArgs } from '../../types';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';

export class SearchService implements ISearchService {
  private adaptable: IAdaptable;

  constructor(adaptable: IAdaptable) {
    this.adaptable = adaptable;

    this.adaptable.AdaptableStore.onAny((eventName: string) => {
      if (this.adaptable.isInitialised) {
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
          setTimeout(() => this.adaptable.applyGridFiltering(), 5);
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
            this.adaptable.api.quickSearchApi.getQuickSearchDisplayAction() !=
            DisplayAction.HighlightCell
          ) {
            const quickSearchStrategy = this.adaptable.strategies.get(
              StrategyConstants.QuickSearchStrategyId
            ) as IQuickSearchStrategy;
            quickSearchStrategy.createQuickSearchRange();
          }
          this.adaptable.applyGridFiltering();
          this.adaptable.redraw();
          this.publishSearchChanged(SearchChangedTrigger.QuickSearch);
        } else if (
          eventName == UserFilterRedux.USER_FILTER_ADD ||
          eventName == UserFilterRedux.USER_FILTER_EDIT ||
          eventName == UserFilterRedux.USER_FILTER_DELETE ||
          eventName == UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER
        ) {
          setTimeout(() => this.adaptable.applyGridFiltering(), 5);
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
    if (this.adaptable.isInitialised) {
      const currentDataSource: DataSource = this.adaptable.api.dataSourceApi.getCurrentDataSource();
      const currentAdvancedSearch:
        | AdvancedSearch
        | undefined = this.adaptable.api.advancedSearchApi.getCurrentAdvancedSearch();

      // lets get the searchstate
      const blotterSearchState: BlotterSearchState = {
        dataSource: currentDataSource == null ? undefined : currentDataSource,
        advancedSearch: currentAdvancedSearch == null ? undefined : currentAdvancedSearch,
        quickSearch: this.adaptable.api.quickSearchApi.getQuickSearchValue(),
        columnFilters: this.adaptable.api.columnFilterApi.getAllColumnFilter(),
      };

      const blotterSortState: BlotterSortState = {
        columnSorts: this.adaptable.api.gridApi.getColumnSorts(),
        customSorts: this.adaptable.api.customSortApi.getAllCustomSort(),
      };

      const searchChangedInfo: SearchChangedInfo = {
        searchChangedTrigger,
        blotterSearchState,
        blotterSortState,
        searchAsAtDate: new Date(),
      };

      const searchChangedArgs: SearchChangedEventArgs = AdaptableHelper.createFDC3Message(
        'Search Changed Args',
        searchChangedInfo
      );

      this.adaptable.api.eventApi.emit('SearchChanged', searchChangedArgs);
    }
  }
}
