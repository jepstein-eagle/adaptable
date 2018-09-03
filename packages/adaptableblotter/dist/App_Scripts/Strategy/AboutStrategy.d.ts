import { IAboutStrategy } from './Interface/IAboutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { KeyValuePair } from '../View/UIInterfaces';
export declare class AboutStrategy extends AdaptableStrategyBase implements IAboutStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    CreateAboutInfo(): KeyValuePair[];
}
