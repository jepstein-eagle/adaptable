import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import {
  IBlotterSearchState,
  IBlotterSortState,
  ISearchChangedEventArgs,
  ISearchChangedInfo,
  ISearchEventData,
  IStateChangedInfo,
  IStateEventData,
} from '../Utilities/Interface/IStateEvents';
import { IStateChangedEventArgs } from '../Utilities/Interface/StateChanged/IStateChangedEventArgs';
import { SearchChangedTrigger, StateChangedTrigger, DataType } from '../Utilities/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IEntitlement } from '../Utilities/Interface/IEntitlement';
import { IAdvancedSearch } from '../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { IColumn } from '../Utilities/Interface/IColumn';
import { IUserState } from '../Redux/ActionsReducers/Interface/IState';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Utilities/MenuItem';
import { IMenuItem } from '../Utilities/Interface/IMenu';
import { IDataSource } from '../Utilities/Interface/BlotterObjects/IDataSource';

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

  public popupMenuItem: IMenuItem;

  protected InitState(): void {
    // derived in each strategy that needs to manage state
  }

  public getPopupMenuItem(): IMenuItem {
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

  public addContextMenuItem(column: IColumn): void {
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

  // direct actions called by the context menu - invisible if strategy is hidden or readonly
  createContextMenuItemReduxAction(Label: string, GlyphIcon: string, Action: Action): any {
    if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
      let menuItemShowPopup: MenuItemDoReduxAction = new MenuItemDoReduxAction(
        Label,
        this.Id,
        Action,
        GlyphIcon,
        true
      );
      this.addContextMenuItemToStore(menuItemShowPopup);
    }
  }

  // popups called by the context menu - invisible if strategy is hidden or readonly
  createContextMenuItemShowPopup(
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
      this.addContextMenuItemToStore(menuItemShowPopup);
    }
  }

  private addContextMenuItemToStore(menuItem: IMenuItem): void {
    this.blotter.api.internalApi.ColumnContextMenuAddItem(menuItem);
  }

  canCreateContextMenuItem(
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
      } else if (functionType == 'floatingfilter') {
        return (
          blotter.hasFloatingFilter &&
          blotter.blotterOptions.filterOptions.useAdaptableBlotterFloatingFilter
        );
      }
    }
    return true;
  }

  /**
   * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
   * This is primarily to help users who want to run search on the server and so need to know what has changed
   * @param searchChangedTrigger function that triggered the event
   */
  publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void {
    let currentDataSource: IDataSource = this.blotter.api.dataSourceApi.getCurrentDataSource();
    let currentAdvancedSearch: IAdvancedSearch = this.blotter.api.advancedSearchApi.getCurrentAdvancedSearch();

    // lets get the searchstate
    let blotterSearchState: IBlotterSearchState = {
      dataSource: currentDataSource == null ? null : currentDataSource,
      advancedSearch: currentAdvancedSearch == null ? null : currentAdvancedSearch,
      quickSearch: this.blotter.api.quickSearchApi.getQuickSearchValue(),
      columnFilters: this.blotter.api.columnFilterApi.getAllColumnFilter(),
    };

    let blotterSortState: IBlotterSortState = {
      gridSorts: this.blotter.api.gridApi.getGridSorts(),
      customSorts: this.blotter.api.customSortApi.getAllCustomSort(),
    };

    let searchChangedInfo: ISearchChangedInfo = {
      searchChangedTrigger: searchChangedTrigger,
      blotterSearchState: blotterSearchState,
      blotterSortState: blotterSortState,
      searchAsAtDate: new Date(),
    };

    let searchEventData: ISearchEventData = {
      name: 'Adaptable Blotter',
      type: 'Search Args',
      id: searchChangedInfo,
    };

    let searchChangedArgs: ISearchChangedEventArgs = {
      object: 'fdc3-context',
      definition: 'https://fdc3.org/context/1.0.0/',
      version: '1.0.0',
      data: [searchEventData],
    };
    this.blotter.api.eventApi._onSearchedChanged.Dispatch(this.blotter, searchChangedArgs);
  }

  /**
   * An event which is triggered whenever User (as oppoesed to System) State is changed.
   * Its the responsibility of each function to fire the event when their state changes
   * @param stateChangedTrigger which function has triggered the event
   * @param state the current state of that function
   */
  publishStateChanged(stateChangedTrigger: StateChangedTrigger, state: IUserState): void {
    let stateChangedInfo: IStateChangedInfo = {
      stateChangedTrigger: stateChangedTrigger,
      userState: state,
    };

    let stateEventData: IStateEventData = {
      name: 'Adaptable Blotter',
      type: 'State Args',
      id: stateChangedInfo,
    };

    let stateChangedArgs: IStateChangedEventArgs = {
      object: 'fdc3-context',
      definition: 'https://fdc3.org/context/1.0.0/',
      version: '1.0.0',
      data: [stateEventData],
    };
    this.blotter.api.eventApi._onStateChanged.Dispatch(this.blotter, stateChangedArgs);
  }
}
