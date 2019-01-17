import { IMenuItem } from "../../Utilities/Interface/IMenu";
import { IEntitlement } from "../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../Api/Interface/IColumn";

export interface IStrategy {
    Id: string
    getPopupMenuItem(): IMenuItem
    getStrategyEntitlement(): IEntitlement
    InitializeWithRedux(): void
    addContextMenuItem(column: IColumn): void
}
export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}