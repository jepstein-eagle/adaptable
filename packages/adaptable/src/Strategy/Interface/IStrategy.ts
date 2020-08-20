import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../../PredefinedConfig/Common/Menu';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';
import { TeamSharingImportInfo } from '../../PredefinedConfig/TeamSharingState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';

/**
 * This is the interface that all Strategies implement (as well as all deriving from AdaptableStrategyBase).
 * Each strategy is responsible for creating popup and context menu items, providing an entitlement ( the default is 'Default') and initialising with Redux
 * Most strategies map to their own Reducer (e.g. QuickSearchStrategy => QuickSearchReducer)
 * However these strategies DONT store any State:
 * Application
 * ColumnInfo
 * StateManagement
 * Piechart
 * TeamSharing
 */

export interface IStrategy {
  Id: AdaptableFunctionName;
  FriendlyName: string;
  Glyph: string;
  Popup: string;
  addStrategyMenuItem(source: 'FunctionMenu' | 'FunctionButton'): AdaptableMenuItem | undefined;
  initializeWithRedux(): void;
  addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined;
  addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
  setStrategyEntitlement(): void;
  isStrategyAvailable(): boolean;
  getTeamSharingAction(): TeamSharingImportInfo<AdaptableObject> | undefined;
  AccessLevel: AccessLevel;
  getSpecialColumnReferences(specialColumnId: string): string | undefined;
}
/**
 * An interface for those strategies which have sytles - e.g. Conditional Style, Format Column, Flashing Cell etc.
 */
export interface IStyleStrategy extends IStrategy {
  initStyles(): void;
}

/**
 * A Wrapper around the strategies
 */
export interface IStrategyCollection extends Map<AdaptableFunctionName, IStrategy> {}
