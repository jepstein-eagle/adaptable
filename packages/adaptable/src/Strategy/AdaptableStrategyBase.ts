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
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { AdaptableObject } from '../PredefinedConfig/Common/AdaptableObject';

/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export abstract class AdaptableStrategyBase implements IStrategy {
  constructor(
    public Id: AdaptableFunctionName,
    public FriendlyName: string,
    public Glyph: string,
    public Popup: string,
    protected adaptable: IAdaptable
  ) {
    this.Id = Id;
    this.FriendlyName = FriendlyName;
    this.Glyph = Glyph;
    this.Popup = Popup;
    this.adaptable = adaptable;
  }

  public AccessLevel: AccessLevel;

  public initializeWithRedux() {
    this.InitState();
    this.adaptable.adaptableStore.TheStore.subscribe(() => this.InitState());
  }

  public setStrategyEntitlement(): void {
    this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
      this.Id
    );
  }

  public isStrategyAvailable(): boolean {
    return !this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id);
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

  public getSpecialColumnReferences(specialColumnId: string): string {
    return undefined;
  }

  public addStrategyMenuItem(
    source: 'FunctionMenu' | 'FunctionButton'
  ): AdaptableMenuItem | undefined {
    if (this.isStrategyAvailable()) {
      if (this.canCreateMenuItem(this.getMinimumAccessLevelForMenu())) {
        const strategyParams: StrategyParams = {
          source: source,
        };

        return this.createMainMenuItemShowPopup({
          Label: this.FriendlyName,
          ComponentName: this.Popup,
          Icon: this.Glyph,
          PopupParams: strategyParams,
        });
      }
    }
  }

  public getMinimumAccessLevelForMenu(): AccessLevel {
    return 'ReadOnly';
  }

  public addFunctionButtonMenuItem(): AdaptableMenuItem | undefined {
    // base class implementation which is empty
    return undefined;
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
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
    return new MenuItemShowPopup(Label, this.Id, ComponentName, Icon, true, PopupParams);
  }

  // creates a menu item for the column menu to perform a function
  createColumnMenuItemClickFunction(
    Label: string,
    Icon: string,
    ClickFunction: () => void
  ): MenuItemDoClickFunction {
    return new MenuItemDoClickFunction(Label, this.Id, ClickFunction, Icon, true);
  }

  // creates a menu item for the column menu to enact a Redux action
  createColumnMenuItemReduxAction(
    Label: string,
    Icon: string,
    Action: Action
  ): MenuItemDoReduxAction {
    return new MenuItemDoReduxAction(Label, this.Id, Action, Icon, true);
  }

  // popups called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemShowPopup(
    Label: string,
    ComponentName: string,
    Icon: string,
    PopupParams?: StrategyParams
  ): MenuItemShowPopup {
    return new MenuItemShowPopup(Label, this.Id, ComponentName, Icon, true, PopupParams);
  }

  canCreateMenuItem(minimumAccessLevel: AccessLevel): boolean {
    if (minimumAccessLevel == 'Full' && this.AccessLevel != 'Full') {
      return false;
    }
    if (minimumAccessLevel == 'ReadOnly' && this.AccessLevel == 'Hidden') {
      return false;
    }
    return true;
  }

  public getTeamSharingAction(): TeamSharingImportInfo<AdaptableObject> | undefined {
    return undefined;
  }
}
