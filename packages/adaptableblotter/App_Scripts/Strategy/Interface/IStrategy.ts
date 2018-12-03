import { IMenuItem } from '../../api/Interface/IMenu'
import { IEntitlement } from '../../api/Interface/Interfaces';
import { IColumn } from '../../api/Interface/IColumn';

export interface IStrategy {
    Id: string
    getPopupMenuItem(): IMenuItem
    getStrategyEntitlement(): IEntitlement
    InitializeWithRedux(): void
    addContextMenuItem(column: IColumn): void
}