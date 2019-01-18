import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from "./Interface/ICalculatedColumnStrategy";
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy {
    private CalculatedColumnState;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
}
