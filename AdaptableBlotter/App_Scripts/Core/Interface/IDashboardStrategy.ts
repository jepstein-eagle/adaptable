import {IStrategy} from './IStrategy';

export interface IDashboardStrategy extends IStrategy {
}


export interface IDashboardControl {
    Name: string;
   IsVisible: boolean
}