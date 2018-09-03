import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ISelectColumnStrategy } from "./Interface/ISelectColumnStrategy";
export declare class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {
    constructor(blotter: IAdaptableBlotter);
    addContextMenuItem(columnId: string): void;
}
