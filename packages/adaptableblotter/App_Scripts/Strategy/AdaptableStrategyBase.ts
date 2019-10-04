import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IColumn } from '../Utilities/Interface/IColumn';

import { Entitlement } from '../PredefinedConfig/DesignTimeState/EntitlementsState';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
  MenuItemShowPopup,
  MenuItemDoReduxAction,
} from '../Utilities/MenuItem';

/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export abstract class AdaptableStrategyBase implements IStrategy {
  constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    this.Id = Id;
    this.blotter = blotter;
  }

  private isVisible: boolean;
  private isReadOnly: boolean;

  public initializeWithRedux() {
    this.InitState();
    this.blotter.adaptableBlotterStore.TheStore.subscribe(() => this.InitState());
  }

  public setStrategyEntitlement(): void {
    this.isVisible = this.isVisibleStrategy();
    this.isReadOnly = this.isReadOnlyStrategy();
  }

  protected InitState(): void {
    /**
     *  derived in each strategy that needs to manage state
     * Most now have been taken elsewhere into services.  All that is left is:
     *  Chart Strategy - lots
     *  Custom Sort
     *  Percent Bar
     *  Sparkline Column
     *  Theme
     */
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  private getStrategyEntitlement(): Entitlement {
    let functionEntitlements: Entitlement[] = this.blotter.api.entitlementApi.getEntitlementState()
      .FunctionEntitlements;
    return functionEntitlements.find(x => x.FunctionName == this.Id);
  }

  private isVisibleStrategy(): boolean {
    let entitlement: Entitlement = this.getStrategyEntitlement();
    if (entitlement) {
      return entitlement.AccessLevel != 'Hidden';
    }
    return true;
  }

  private isReadOnlyStrategy(): boolean {
    let entitlement: Entitlement = this.getStrategyEntitlement();
    if (entitlement) {
      return entitlement.AccessLevel == 'ReadOnly';
    }
    return false;
  }

  // creates the menu items in the main dropdown
  createMainMenuItemShowPopup({
    Label,
    ComponentName,
    GlyphIcon,
    PopupParams,
  }: {
    Label: string;
    ComponentName: string;
    GlyphIcon: string;
    PopupParams?: StrategyParams;
  }): MenuItemShowPopup {
    return new MenuItemShowPopup(
      Label,
      this.Id,
      ComponentName,
      GlyphIcon,
      this.isVisible,
      PopupParams
    );
  }

  // direct actions called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemReduxAction(
    Label: string,
    GlyphIcon: string,
    Action: Action
  ): MenuItemDoReduxAction {
    if (this.isVisible && !this.isReadOnly) {
      return new MenuItemDoReduxAction(Label, this.Id, Action, GlyphIcon, true);
    }
  }

  // popups called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemShowPopup(
    Label: string,
    ComponentName: string,
    GlyphIcon: string,
    PopupParams?: StrategyParams
  ): MenuItemShowPopup {
    if (this.isVisible && !this.isReadOnly) {
      return new MenuItemShowPopup(Label, this.Id, ComponentName, GlyphIcon, true, PopupParams);
    }
  }

  canCreateColumnMenuItem(
    column: IColumn,
    blotter: IAdaptableBlotter,
    functionType: string = ''
  ): boolean {
    if (this.isReadOnly) {
      return false;
    }
    if (StringExtensions.IsNotNullOrEmpty(functionType)) {
      if (functionType == 'sort' && !column.IsSparkline) {
        return column.Sortable;
      } else if (functionType == 'editable') {
        return !column.ReadOnly;
      } else if (functionType == 'style') {
        return !column.IsSparkline;
      } else if (functionType == 'sparkline') {
        return column.IsSparkline;
      } else if (functionType == 'numeric') {
        return column.DataType == DataType.Number;
      } else if (functionType == 'columnfilter') {
        return column.Filterable;
      } else if (functionType == 'quickfilter') {
        return (
          blotter.hasQuickFilter &&
          blotter.blotterOptions.filterOptions.useAdaptableBlotterQuickFilter
        );
      }
    }
    return true;
  }
}
