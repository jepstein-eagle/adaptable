import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { IColumn } from '../Core/Interface/IColumn';
export declare class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
    private GridSorts;
    private GridState;
    constructor(blotter: IAdaptableBlotter);
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    private GetGridState;
}
