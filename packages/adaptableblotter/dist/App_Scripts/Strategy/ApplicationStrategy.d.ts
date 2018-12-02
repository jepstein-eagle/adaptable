import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
export declare class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}
