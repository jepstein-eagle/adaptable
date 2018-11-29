import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { ISelectColumnStrategy } from "./Interface/ISelectColumnStrategy";
import { IColumn } from '../Api/Interface/IColumn';
export declare class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {
    constructor(blotter: IAdaptableBlotter);
    addContextMenuItem(column: IColumn): void;
}
