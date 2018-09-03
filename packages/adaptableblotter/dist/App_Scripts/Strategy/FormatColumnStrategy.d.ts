import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
export declare abstract class FormatColumnStrategy extends AdaptableStrategyBase implements IFormatColumnStrategy {
    protected FormatColumnState: FormatColumnState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
    protected InitState(): void;
    protected abstract InitStyles(): void;
}
