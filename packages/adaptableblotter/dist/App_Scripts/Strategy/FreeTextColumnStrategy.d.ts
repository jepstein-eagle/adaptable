import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy';
import { FreeTextColumnState } from '../Redux/ActionsReducers/Interface/IState';
export declare class FreeTextColumnStrategy extends AdaptableStrategyBase implements IFreeTextColumnStrategy {
    protected FreeTextColumnState: FreeTextColumnState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
    protected InitState(): void;
}
