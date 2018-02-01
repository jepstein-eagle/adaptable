import { IStrategy } from './IStrategy';

export interface IDashboardStrategy extends IStrategy {
}


export interface IDashboardStrategyControlConfiguration {
    Strategy: string
    IsVisible: boolean;
    ControlConfiguration?: any;
}