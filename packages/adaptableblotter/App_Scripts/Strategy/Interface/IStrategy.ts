import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../../PredefinedConfig/Common/Menu';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

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
  Id: AdaptableFunctionName;
  addFunctionMenuItem(): AdaptableMenuItem | undefined;
  initializeWithRedux(): void;
  addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
  addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
  setStrategyEntitlement(): void;
}

export interface IStyleStrategy extends IStrategy {
  initStyles(): void;
}

/**
 * A Wrapper around the strategies
 */
export interface IStrategyCollection extends Map<AdaptableFunctionName, IStrategy> {}
