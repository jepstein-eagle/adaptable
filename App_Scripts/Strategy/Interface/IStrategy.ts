import { IEntitlement } from '../../Core/Interface/IAdaptableBlotter'
import { IMenuItem } from '../../Core/Interface/IMenu'

export interface IStrategy {
    Id: string
    getPopupMenuItem(): IMenuItem
    getStrategyEntitlement(): IEntitlement
    InitializeWithRedux(): void
    
}