import { IMenuItem } from '../../Core/Interface/IMenu';
import { IEntitlement } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
export interface IStrategy {
    Id: string;
    getPopupMenuItem(): IMenuItem;
    getStrategyEntitlement(): IEntitlement;
    InitializeWithRedux(): void;
    addContextMenuItem(column: IColumn): void;
}
