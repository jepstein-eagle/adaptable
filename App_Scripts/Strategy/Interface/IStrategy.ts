import { IMenuItem } from '../../Core/Interface/IMenu'
import { IEntitlement } from '../../Core/Interface/Interfaces';

export interface IStrategy {
    Id: string
    getPopupMenuItem(): IMenuItem
    getStrategyEntitlement(): IEntitlement
    InitializeWithRedux(): void
    
}