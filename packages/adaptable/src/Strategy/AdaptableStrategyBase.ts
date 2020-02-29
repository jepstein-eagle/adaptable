import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import {
  MenuItemShowPopup,
  MenuItemDoReduxAction,
  MenuItemDoClickFunction,
} from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { AccessLevel } from '../PredefinedConfig/EntitlementState';

/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export abstract class AdaptableStrategyBase implements IStrategy {
  constructor(public Id: AdaptableFunctionName, protected adaptable: IAdaptable) {
    this.Id = Id;
    this.adaptable = adaptable;
  }

  public AccessLevel: AccessLevel;

  public initializeWithRedux() {
    this.InitState();
    this.adaptable.AdaptableStore.TheStore.subscribe(() => this.InitState());
  }

  public setStrategyEntitlement(): void {
    this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
      this.Id
    );
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
    // are we sure that we want to stop readonly strategies appearing?
    if (this.accessLevel !== 'Hidden') {
      return new MenuItemShowPopup(Label, this.Id, ComponentName, Icon, true, PopupParams);
    }
  }

  // direct actions called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemClickFunction(
    Label: string,
    Icon: string,
    ClickFunction: () => void
  ): MenuItemDoClickFunction {
    if (this.accessLevel !== 'Hidden') {
      return new MenuItemDoClickFunction(Label, this.Id, ClickFunction, Icon, true);
    }
  }

  createColumnMenuItemReduxAction(
    Label: string,
    Icon: string,
    Action: Action
  ): MenuItemDoReduxAction {
    if (this.accessLevel !== 'Hidden') {
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
    if (this.accessLevel !== 'Hidden') {
      return new MenuItemShowPopup(Label, this.Id, ComponentName, Icon, true, PopupParams);
    }
  }

  canCreateColumnMenuItem(
    column: AdaptableColumn,
    adaptable: IAdaptable,
    functionType?:
      | 'sort'
      | 'editable'
      | 'style'
      | 'sparkline'
      | 'columnfilter'
      | 'quickfilter'
      | 'numeric'
  ): boolean {
    if (this.accessLevel != 'Full') {
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
        return adaptable.adaptableOptions.filterOptions.useAdaptableQuickFilter;
      }
    }
    return true;
  }
}
