import { IMenuItem } from '../../Api/Interface/IMenu';
import { IEntitlement } from '../../api/Interface/Interfaces';
import { IColumn } from '../../Api/Interface/IColumn';
export interface IStrategy {
    Id: string;
    getPopupMenuItem(): IMenuItem;
    getStrategyEntitlement(): IEntitlement;
    InitializeWithRedux(): void;
    addContextMenuItem(column: IColumn): void;
}
