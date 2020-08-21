import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { LayoutApi } from '../LayoutApi';
import { LayoutState, Layout } from '../../PredefinedConfig/LayoutState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import ObjectFactory from '../../Utilities/ObjectFactory';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import Helper from '../../Utilities/Helpers/Helper';
import { createUuid } from '../../PredefinedConfig/Uuid';
import AdaptableHelper from '../../Utilities/Helpers/AdaptableHelper';
import { ColumnStateChangedInfo, ColumnStateChangedEventArgs } from '../../types';

export class LayoutApiImpl extends ApiBase implements LayoutApi {
  public getLayoutState(): LayoutState {
    return this.getAdaptableState().Layout;
  }

  public getCurrentVisibleColumnIdsMap(): { [key: string]: boolean } {
    const layout = this.getCurrentLayout();

    return layout.Columns.reduce((acc, colId) => {
      acc[colId] = true;
      return acc;
    }, {} as { [key: string]: boolean });
  }

  public getCurrentVisibleColumnIds() {
    return this.getCurrentLayout().Columns;
  }

  public setLayout(layoutName: string): void {
    if (
      StringExtensions.IsNotNullOrEmpty(layoutName) &&
      layoutName !== this.getCurrentLayoutName()
    ) {
      let layout: Layout = this.getAdaptableState().Layout.Layouts.find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
        this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));

        let columnStateChangedInfo: ColumnStateChangedInfo = {
          currentLayout: layoutName,
          adaptableApi: this.adaptable.api,
        };
        const columnStateChangedEventArgs: ColumnStateChangedEventArgs = AdaptableHelper.createFDC3Message(
          'Column State Changed Args',
          columnStateChangedInfo
        );
        this.adaptable.api.eventApi.emit('ColumnStateChanged', columnStateChangedEventArgs);
      }
    }
  }

  public getCurrentLayout(): Layout {
    const state = this.getAdaptableState();
    if (state.Grid.CurrentLayout) {
      return state.Grid.CurrentLayout;
    }
    let layoutName = state.Layout.CurrentLayout;
    return this.getLayoutByName(layoutName);
  }

  public getCurrentLayoutName(): string {
    return this.getAdaptableState().Layout.CurrentLayout;
  }

  public getLayoutByName(layoutName: string): Layout | null {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      let layout: Layout = this.getAllLayout().find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
        return layout;
      }
    }
  }

  public getAllLayout(): Layout[] {
    return this.getAdaptableState().Layout.Layouts;
  }

  public saveCurrentLayout(): void {
    let currentLayout: Layout = this.getCurrentLayout();

    if (!this.adaptable.adaptableOptions.layoutOptions?.autoSaveLayouts) {
      currentLayout = this.getAdaptableState().Grid.CurrentLayout || currentLayout;
    }
    if (currentLayout) {
      this.saveLayout(currentLayout);
    }
  }

  public doesLayoutExist(layout: Layout): boolean {
    if (layout == null) {
      return false;
    }
    let existingLayout = this.getAllLayout().find(
      l => l.Uuid == layout.Uuid || l.Name === layout.Name
    );
    return existingLayout != null;
  }

  public createAndSetLayout(layoutToCreate: Layout): Layout {
    if (this.createLayout(layoutToCreate)) {
      this.setLayout(layoutToCreate.Name);
      return layoutToCreate;
    }
  }

  public createLayout(layoutToCreate: Layout): Layout | undefined {
    if (this.doesLayoutExist(layoutToCreate)) {
      LoggingHelper.LogAdaptableError(
        "Cannot create layout with the Name: '" + layoutToCreate.Name + "' as it already exists"
      );
      return;
    }
    const newLayout = ObjectFactory.CreateEmptyLayout({ ...layoutToCreate });
    this.dispatchAction(LayoutRedux.LayoutAdd(newLayout));
    return newLayout;
  }

  public cloneAndSetLayout(layoutToClone: Layout, layoutName: string): void {
    if (!this.doesLayoutExist(layoutToClone)) {
      LoggingHelper.LogAdaptableError(
        "Cannot clone layout with Name: '" + layoutName + "' as other Layout does not exist"
      );
      return;
    }
    this.cloneLayout(layoutToClone, layoutName);
    this.setLayout(layoutName);
  }

  public cloneLayout(layoutToClone: Layout, layoutName: string): void {
    if (!this.doesLayoutExist(layoutToClone)) {
      LoggingHelper.LogAdaptableError(
        "Cannot clone layout with Name: '" + layoutName + "' as other Layout does not exist"
      );
      return;
    }

    const newLayout: Layout = Helper.cloneObject(layoutToClone);
    newLayout.Uuid = createUuid();
    newLayout.Name = layoutName;
    this.dispatchAction(LayoutRedux.LayoutAdd(newLayout));
  }

  public saveLayout(layoutToSave: Layout): void {
    if (!this.doesLayoutExist(layoutToSave)) {
      this.dispatchAction(LayoutRedux.LayoutAdd(layoutToSave));
    } else {
      this.dispatchAction(LayoutRedux.LayoutSave(layoutToSave));
    }
  }

  public showLayoutPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.LayoutStrategyId,
      ScreenPopups.LayoutPopup
    );
  }
}
