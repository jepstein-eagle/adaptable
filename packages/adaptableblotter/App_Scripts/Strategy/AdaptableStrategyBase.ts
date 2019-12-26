import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

import { Entitlement } from '../PredefinedConfig/EntitlementState';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import {
  MenuItemShowPopup,
  MenuItemDoReduxAction,
  MenuItemDoClickFunction,
} from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';

/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export abstract class AdaptableStrategyBase implements IStrategy {
  constructor(public Id: AdaptableFunctionName, protected blotter: IAdaptableBlotter) {
    this.Id = Id;
    this.blotter = blotter;
  }

  private isVisible: boolean;
  private isReadOnly: boolean;

  public initializeWithRedux() {
    this.InitState();
    this.blotter.AdaptableStore.TheStore.subscribe(() => this.InitState());
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

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  private getStrategyEntitlement(): Entitlement {
    let functionEntitlements: Entitlement[] = this.blotter.api.entitlementsApi.getEntitlementsState()
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
    Icon,
    PopupParams,
  }: {
    Label: string;
    ComponentName: string;
    Icon: string;
    PopupParams?: StrategyParams;
  }): MenuItemShowPopup {
    if (!PopupParams) {
      PopupParams = {
        source: 'FunctionMenu',
      };
    }
    if (this.isVisible && !this.isReadOnly) {
      return new MenuItemShowPopup(
        Label,
        this.Id,
        ComponentName,
        Icon,
        this.isVisible,
        PopupParams
      );
    }
  }

  // direct actions called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemClickFunction(
    Label: string,
    Icon: string,
    ClickFunction: () => void
  ): MenuItemDoClickFunction {
    if (this.isVisible && !this.isReadOnly) {
      return new MenuItemDoClickFunction(Label, this.Id, ClickFunction, Icon, true);
    }
  }

  createColumnMenuItemReduxAction(
    Label: string,
    Icon: string,
    Action: Action
  ): MenuItemDoReduxAction {
    if (this.isVisible && !this.isReadOnly) {
      return new MenuItemDoReduxAction(Label, this.Id, Action, Icon, true);
    }
  }

  // popups called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemShowPopup(
    Label: string,
    ComponentName: string,
    Icon: string,
    PopupParams?: StrategyParams
  ): MenuItemShowPopup {
    if (this.isVisible && !this.isReadOnly) {
      return new MenuItemShowPopup(Label, this.Id, ComponentName, Icon, true, PopupParams);
    }
  }

  canCreateColumnMenuItem(
    column: AdaptableColumn,
    blotter: IAdaptableBlotter,
    functionType?:
      | 'sort'
      | 'editable'
      | 'style'
      | 'sparkline'
      | 'columnfilter'
      | 'quickfilter'
      | 'numeric'
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
        return blotter.blotterOptions.filterOptions.useAdaptableBlotterQuickFilter;
      }
    }
    return true;
  }
}
