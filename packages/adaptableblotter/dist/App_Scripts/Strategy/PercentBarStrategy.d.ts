import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy';
import { PercentBarState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Core/Interface/IColumn';
export declare class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
    protected PercentBarState: PercentBarState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
}
