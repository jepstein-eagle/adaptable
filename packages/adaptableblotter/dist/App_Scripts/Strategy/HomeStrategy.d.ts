import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
    private GridSorts;
    private GridState;
    constructor(blotter: IAdaptableBlotter);
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    private GetGridState;
}
