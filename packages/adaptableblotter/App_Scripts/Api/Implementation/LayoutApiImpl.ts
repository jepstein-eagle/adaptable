import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { DEFAULT_LAYOUT } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { LayoutApi } from '../LayoutApi';
import { LayoutState, Layout, ColumnSort } from '../../PredefinedConfig/LayoutState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

export class LayoutApiImpl extends ApiBase implements LayoutApi {
  public getLayoutState(): LayoutState {
    return this.getAdaptableState().Layout;
  }

  public setLayout(layoutName: string): void {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      let layout: Layout = this.getAdaptableState().Layout.Layouts.find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
        this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
      }
    }
  }

  public clearLayout(): void {
    this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT));
  }

  public getCurrentLayout(): Layout {
    let layoutName = this.getAdaptableState().Layout.CurrentLayout;
    return this.getLayoutByName(layoutName);
  }

  public getCurrentLayoutName(): string {
    return this.getAdaptableState().Layout.CurrentLayout;
  }

  public isDefaultLayout(): boolean {
    return this.getCurrentLayoutName() == DEFAULT_LAYOUT;
  }

  public getLayoutByName(layoutName: string): Layout {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      let layout: Layout = this.getAdaptableState().Layout.Layouts.find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
        return layout;
      }
    }
  }

  public getAllLayout(): Layout[] {
    return this.getAdaptableState().Layout.Layouts;
  }

  public saveCurrentLayout(): void {
    let currentLayoutName: string = this.getAdaptableState().Layout.CurrentLayout;
    if (currentLayoutName != DEFAULT_LAYOUT) {
      let currentLayoutObject: Layout = this.getAdaptableState().Layout.Layouts.find(
        l => l.Name == currentLayoutName
      );
      if (currentLayoutObject) {
        let gridState: any = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;
        let visibleColumns: AdaptableColumn[] = this.getAdaptableState().Grid.Columns.filter(
          c => c.Visible
        );
        let columnSorts: ColumnSort[] = this.getAdaptableState().Grid.ColumnSorts;

        let layoutToSave: Layout = {
          Uuid: currentLayoutObject.Uuid,
          Name: currentLayoutName,
          Columns: currentLayoutObject.Columns,
          ColumnSorts: currentLayoutObject.ColumnSorts,
          GroupedColumns: currentLayoutObject.GroupedColumns,
          PivotDetails: currentLayoutObject.PivotDetails,
          VendorGridInfo: gridState,
          AdaptableGridInfo: {
            CurrentColumns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
            CurrentColumnSorts: columnSorts,
          },
        };

        this.saveLayout(layoutToSave);
      }
    }
  }

  public saveLayout(layoutToSave: Layout): void {
    this.dispatchAction(LayoutRedux.LayoutSave(layoutToSave));
  }

  public restorelayout(layoutToSave: Layout): void {
    this.dispatchAction(LayoutRedux.LayoutRestore(layoutToSave));
  }

  public showLayoutPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.LayoutStrategyId,
      ScreenPopups.LayoutPopup
    );
  }
}
