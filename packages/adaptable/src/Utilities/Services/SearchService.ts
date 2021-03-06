import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ISearchService } from './Interface/ISearchService';
import { SearchChangedTrigger } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import { SearchChangedInfo } from '../../Api/Events/SearchChanged';
import { SearchChangedEventArgs } from '../../types';

export class SearchService implements ISearchService {
  private adaptable: IAdaptable;

  constructor(adaptable: IAdaptable) {
    this.adaptable = adaptable;

    this.adaptable.adaptableStore.onAny((eventName: string) => {
      if (this.adaptable.isInitialised) {
        if (eventName == QueryRedux.CURRENT_QUERY_CHANGE) {
          setTimeout(() => this.adaptable.applyGridFiltering(), 5);
          this.publishSearchChanged(SearchChangedTrigger.CurrentQuery);
        } else if (
          eventName == FilterRedux.COLUMN_FILTER_ADD ||
          eventName == FilterRedux.COLUMN_FILTER_EDIT ||
          eventName == FilterRedux.COLUMN_FILTER_SET ||
          eventName == FilterRedux.COLUMN_FILTER_CLEAR_ALL ||
          eventName == FilterRedux.COLUMN_FILTER_CLEAR ||
          eventName == FilterRedux.USER_FILTER_ADD ||
          eventName == FilterRedux.USER_FILTER_EDIT ||
          eventName == FilterRedux.USER_FILTER_DELETE ||
          eventName == FilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER
        ) {
          setTimeout(() => this.adaptable.applyGridFiltering(), 5);
          this.publishSearchChanged(SearchChangedTrigger.Filter);
        } else if (
          eventName == DataSourceRedux.DATA_SOURCE_SELECT ||
          eventName == DataSourceRedux.DATA_SOURCE_ADD ||
          eventName == DataSourceRedux.DATA_SOURCE_EDIT ||
          eventName == DataSourceRedux.DATA_SOURCE_DELETE
        ) {
          this.publishSearchChanged(SearchChangedTrigger.DataSource);
        } else if (eventName == GridRedux.GRID_SET_SORT) {
          this.publishSearchChanged(SearchChangedTrigger.Sort);
        }
      }
    });
  }

  /**
   * Each time any of the objects that make up search are changed (e.g. filters, quick search, current query, data sources etc.) we fire an event
   * This is primarily to help users who want to run search on the server and so need to know what has changed
   * @param searchChangedTrigger function that triggered the event
   */
  publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void {
    if (this.adaptable.isInitialised) {
      const adaptableSearchState = this.adaptable.api.configApi.configGetAdaptableSearchState();
      const adaptableSortState = this.adaptable.api.configApi.configGetAdaptableSortState();

      const searchChangedInfo: SearchChangedInfo = {
        searchChangedTrigger,
        adaptableSearchState: adaptableSearchState,
        adaptableSortState: adaptableSortState,
        searchAsAtDate: new Date(),
        adaptableApi: this.adaptable.api,
      };

      const searchChangedArgs: SearchChangedEventArgs = AdaptableHelper.createFDC3Message(
        'Search Changed Args',
        searchChangedInfo
      );

      this.adaptable.api.eventApi.emit('SearchChanged', searchChangedArgs);
    }
  }
}
