import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from "./Interface/ICalculatedColumnStrategy";
export declare class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy {
    private CalculatedColumns;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
}
