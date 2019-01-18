import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy';
import { FreeTextColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class FreeTextColumnStrategy extends AdaptableStrategyBase implements IFreeTextColumnStrategy {
    protected FreeTextColumnState: FreeTextColumnState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
}
