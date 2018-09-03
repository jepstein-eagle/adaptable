import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    CurrentLayout: string;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}
