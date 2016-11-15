import { IColumn } from './IAdaptableBlotter';
import { IStrategy } from './IStrategy';

export interface IQuickSearchStrategy extends IStrategy {

    QuickSearchText: string;
}

