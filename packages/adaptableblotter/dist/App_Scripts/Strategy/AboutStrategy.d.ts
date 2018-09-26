import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';
export declare class AboutStrategy extends AdaptableStrategyBase implements IStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}
