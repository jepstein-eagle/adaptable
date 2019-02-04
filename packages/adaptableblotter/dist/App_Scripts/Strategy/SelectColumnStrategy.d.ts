import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISelectColumnStrategy } from "./Interface/ISelectColumnStrategy";
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {
    constructor(blotter: IAdaptableBlotter);
    addContextMenuItem(column: IColumn): void;
}
