import { IMenuItem } from "../../Utilities/Interface/IMenu";
import { IEntitlement } from "../../Utilities/Interface/IEntitlement";
import { IColumn } from "../../Utilities/Interface/IColumn";

/**
 * This is the interface that all Strategies implement (as well as all deriving from AdaptableStrategyBase).
 * Each strategy is responsible for creating popup and context menu items, providing an entitlement ( the default is 'Default') and initialising with Redux
 * Most strategies map to their own Reducer (e.g. QuickSearchStrategy => QuickSearchReducer)
 * However these strategies DONT store any State:
 * Application
 * Columnchooser
 * ColumnInfo
 * DataManagement
 * Piechart
 * TeamSharing
 * Plus there is one 'special' strategy that the user cannot hide called the HomeStrategy which has important functions that need to be called (e.g. creates Team Sharing and other menu items)
 */
export interface IStrategy {
    Id: string
    getPopupMenuItem(): IMenuItem
    getStrategyEntitlement(): IEntitlement
    initializeWithRedux(): void
    addContextMenuItem(column: IColumn): void
}

/**
 * A Wrapper around the strategies
 */
export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}