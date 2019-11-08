import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { DEFAULT_LAYOUT } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { LayoutApi } from '../LayoutApi';
import { LayoutState, Layout, ColumnSort } from '../../PredefinedConfig/RunTimeState/LayoutState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

export class LayoutApiImpl extends ApiBase implements LayoutApi {
  public getLayoutState(): LayoutState {
    return this.getBlotterState().Layout;
  }

  public setLayout(layoutName: string): void {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      let layout: Layout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
        this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
      }
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

  public isDefaultLayout(): boolean {
    return this.getCurrentLayoutName() == DEFAULT_LAYOUT;
  }

  public getLayoutByName(layoutName: string): Layout {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      let layout: Layout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
        return layout;
      }
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
        let visibleColumns: AdaptableBlotterColumn[] = this.getBlotterState().Grid.Columns.filter(
          c => c.Visible
        );
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

  public showLayoutPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.LayoutStrategyId,
      ScreenPopups.LayoutPopup
    );
  }
}
