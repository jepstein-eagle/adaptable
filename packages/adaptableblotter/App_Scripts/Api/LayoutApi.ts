import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { ApiBase } from './ApiBase';
import { DEFAULT_LAYOUT } from '../Utilities/Constants/GeneralConstants';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ILayoutApi } from './Interface/ILayoutApi';
import { LayoutState, Layout, ColumnSort } from '../PredefinedConfig/RunTimeState/LayoutState';

export class LayoutApi extends ApiBase implements ILayoutApi {
  public getLayoutState(): LayoutState {
    return this.getBlotterState().Layout;
  }

  public setLayout(layoutName: string): void {
    let layout: Layout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
    if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
      this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
    }
  }

  public clearLayout(): void {
    this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT));
  }

  public getCurrentLayout(): Layout {
    let layoutName = this.getBlotterState().Layout.CurrentLayout;
    return this.getLayoutByName(layoutName);
  }

  public getCurrentLayoutName(): string {
    return this.getBlotterState().Layout.CurrentLayout;
  }

  public getLayoutByName(layoutName: string): Layout {
    let layout: Layout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
    if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
      return layout;
    }
  }

  public getAllLayout(): Layout[] {
    return this.getBlotterState().Layout.Layouts;
  }

  public saveCurrentLayout(): void {
    let currentLayoutName: string = this.getBlotterState().Layout.CurrentLayout;
    if (currentLayoutName != DEFAULT_LAYOUT) {
      let currentLayoutObject: Layout = this.getBlotterState().Layout.Layouts.find(
        l => l.Name == currentLayoutName
      );
      if (currentLayoutObject) {
        let gridState: any = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;
        let visibleColumns: IColumn[] = this.getBlotterState().Grid.Columns.filter(c => c.Visible);
        let columSorts: ColumnSort[] = this.getBlotterState().Grid.ColumnSorts;

        let layoutToSave: Layout = {
          Uuid: currentLayoutObject.Uuid,
          Name: currentLayoutName,
          Columns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
          ColumnSorts: columSorts,
          VendorGridInfo: gridState,
        };

        this.saveLayout(layoutToSave);
      }
    }
  }

  public saveLayout(layoutToSave: Layout): void {
    this.dispatchAction(LayoutRedux.LayoutSave(layoutToSave));
  }
}
