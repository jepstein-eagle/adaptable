import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IColumn } from '../Utilities/Interface/IColumn';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Utilities/MenuItem';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';
import { IEntitlement } from '../PredefinedConfig/DesignTimeState/EntitlementsState';

/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export abstract class AdaptableStrategyBase implements IStrategy {
  constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    this.Id = Id;
    this.blotter = blotter;
  }

  public initializeWithRedux() {
    this.InitState();
    this.blotter.adaptableBlotterStore.TheStore.subscribe(() => this.InitState());
  }

  public popupMenuItem: AdaptableBlotterMenuItem;

  protected InitState(): void {
    /**
     *  derived in each strategy that needs to manage state
     * Most now have been taken elsewhere into services.  All that is left is:
     *  Chart Strategy - lots
     *  Custom Sort
     *  Percent Bar
     *  Theme
     */
  }

  public getPopupMenuItem(): AdaptableBlotterMenuItem {
    if (!this.hasPopupMenu()) {
      return null;
    }

    if (this.popupMenuItem == null) {
      this.addPopupMenuItem();
    }
    return this.popupMenuItem;
  }

  protected hasPopupMenu(): boolean {
    return true;
  }

  protected addPopupMenuItem(): void {
    // base class implementation which is empty
  }

  public addColumnMenuItem(column: IColumn): void {
    // base class implementation which is empty
  }

  getStrategyEntitlement(): IEntitlement {
    let functionEntitlements: IEntitlement[] = this.blotter.api.entitlementApi.getEntitlementState()
      .FunctionEntitlements;
    return functionEntitlements.find(x => x.FunctionName == this.Id);
  }

  isVisibleStrategy(): boolean {
    let entitlement: IEntitlement = this.getStrategyEntitlement();
    if (entitlement) {
      return entitlement.AccessLevel != 'Hidden';
    }
    return true;
  }

  isReadOnlyStrategy(): boolean {
    let entitlement: IEntitlement = this.getStrategyEntitlement();
    if (entitlement) {
      if (entitlement.AccessLevel == 'ReadOnly') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  // creates the menu items in the main dropdown
  createMenuItemShowPopup(
    Label: string,
    ComponentName: string,
    GlyphIcon: string,
    PopupParams?: string
  ) {
    let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
      Label,
      this.Id,
      ComponentName,
      GlyphIcon,
      this.isVisibleStrategy(),
      PopupParams
    );
    this.popupMenuItem = menuItemShowPopup;
  }

  // direct actions called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemReduxAction(Label: string, GlyphIcon: string, Action: Action): any {
    if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
      let menuItemShowPopup: MenuItemDoReduxAction = new MenuItemDoReduxAction(
        Label,
        this.Id,
        Action,
        GlyphIcon,
        true
      );
      this.addMenuItemToStore(menuItemShowPopup);
    }
  }

  // popups called by the column menu - invisible if strategy is hidden or readonly
  createColumnMenuItemShowPopup(
    Label: string,
    ComponentName: string,
    GlyphIcon: string,
    PopupParams?: string
  ) {
    if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
      let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
        Label,
        this.Id,
        ComponentName,
        GlyphIcon,
        true,
        PopupParams
      );
      this.addMenuItemToStore(menuItemShowPopup);
    }
  }

  private addMenuItemToStore(menuItem: AdaptableBlotterMenuItem): void {
    this.blotter.api.internalApi.addColumnMenuItem(menuItem);
  }

  canCreateColumnMenuItem(
    column: IColumn,
    blotter: IAdaptableBlotter,
    functionType: string = ''
  ): boolean {
    if (this.isReadOnlyStrategy()) {
      return false;
    }
    if (StringExtensions.IsNotNullOrEmpty(functionType)) {
      if (functionType == 'sort') {
        return column.Sortable;
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
