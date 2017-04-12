import { IStrategy } from './IStrategy';

export interface IDashboardStrategy extends IStrategy {
}


export interface IDashboardStrategyControl {
    Strategy: string
    IsVisible: boolean;
    IsCollapsed: boolean;
}