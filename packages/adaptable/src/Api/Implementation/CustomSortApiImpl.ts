import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import { ApiBase } from './ApiBase';
import { CustomSortApi } from '../CustomSortApi';
import { CustomSortState, CustomSort } from '../../PredefinedConfig/CustomSortState';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class CustomSortApiImpl extends ApiBase implements CustomSortApi {
  public getCustomSortState(): CustomSortState {
    return this.getAdaptableState().CustomSort;
  }

  public getAllCustomSort(): CustomSort[] {
    return this.getAdaptableState().CustomSort.CustomSorts;
  }

  public getCustomSortByColumn(column: string): CustomSort {
    return this.getAdaptableState().CustomSort.CustomSorts.find(cs => cs.ColumnId == column);
  }

  public addCustomSort(customSort: CustomSort): void {
    this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
  }

  public createCustomSort(columnId: string, values: string[]): void {
    let customSort: CustomSort = { ColumnId: columnId, SortedValues: values };
    this.addCustomSort(customSort);
  }

  public editCustomSort(columnId: string, values: string[]): void {
    let customSort: CustomSort = { ColumnId: columnId, SortedValues: values };
    if (this.checkItemExists(customSort, columnId, StrategyConstants.CustomSortStrategyId)) {
      this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
    }
  }

  public deleteCustomSort(column: string): void {
    let customSort: CustomSort = this.getCustomSortByColumn(column);
    this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
  }

  public showCustomSortPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.CustomSortStrategyId,
      ScreenPopups.CustomSortPopup
    );
  }
}
