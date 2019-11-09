import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux';
import { ApiBase } from './ApiBase';
import { ColumnCategoryApi } from '../ColumnCategoryApi';
import { ColumnCategoryState, ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ColumnCategoryApiImpl extends ApiBase implements ColumnCategoryApi {
  public getColumnCategoryState(): ColumnCategoryState {
    return this.getBlotterState().ColumnCategory;
  }

  public getAllColumnCategory(): ColumnCategory[] {
    return this.getColumnCategoryState().ColumnCategories;
  }

  public getColumnCategoryById(columnCategoryId: string): ColumnCategory {
    return this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId);
  }

  public addColumnCategory(columnCategory: ColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory));
  }

  public createColumnCategory(columnCategoryId: string, columns: string[]): void {
    let columnCategory: ColumnCategory = {
      ColumnCategoryId: columnCategoryId,
      ColumnIds: columns,
    };
    this.addColumnCategory(columnCategory);
  }

  public editColumnCategory(columnCategory: ColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
  }

  public addColumnsToColumnCategory(columnCategoryId: string, columns: string[]): void {
    let columnCategory: ColumnCategory = this.getColumnCategoryById(columnCategoryId);
    columns.forEach(c => {
      columnCategory.ColumnIds.push(c);
    });
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
  }

  public removeColumnsFromColumnCategory(columnCategoryId: string, columns: string[]): void {
    let columnCategory: ColumnCategory = this.getAllColumnCategory().find(
      cc => cc.ColumnCategoryId == columnCategoryId
    );
    columns.forEach(c => {
      let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c);
      columnCategory.ColumnIds.splice(ccIndex, 1);
    });
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
  }

  public deleteColumnCategory(columnCategoryId: string): void {
    let columnCategory: ColumnCategory = this.getAllColumnCategory().find(
      cc => cc.ColumnCategoryId == columnCategoryId
    );
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory));
  }

  public showColumnCategoryPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ColumnCategoryStrategyId,
      ScreenPopups.ColumnCategoryPopup
    );
  }
}
