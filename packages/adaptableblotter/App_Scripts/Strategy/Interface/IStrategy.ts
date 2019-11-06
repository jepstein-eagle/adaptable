import { AdaptableBlotterMenuItem, ContextMenuInfo } from '../../Utilities/MenuItem';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';

/**
 * This is the interface that all Strategies implement (as well as all deriving from AdaptableStrategyBase).
 * Each strategy is responsible for creating popup and context menu items, providing an entitlement ( the default is 'Default') and initialising with Redux
 * Most strategies map to their own Reducer (e.g. QuickSearchStrategy => QuickSearchReducer)
 * However these strategies DONT store any State:
 * Application
 * Columnchooser
 * ColumnInfo
 * StateManagement
 * Piechart
 * TeamSharing
 * Plus there is one 'special' strategy that the user cannot hide called the HomeStrategy which has important functions that need to be called (e.g. creates Team Sharing and other menu items)
 */

export interface IStrategy {
  Id: string;
  addMainMenuItem(): AdaptableBlotterMenuItem | undefined;
  initializeWithRedux(): void;
  addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined;
  addContextMenuItem(contextMenuInfo: ContextMenuInfo): AdaptableBlotterMenuItem | undefined;
  setStrategyEntitlement(): void;
}

/**
 * A Wrapper around the strategies
 */
export interface IStrategyCollection extends Map<string, IStrategy> {}
