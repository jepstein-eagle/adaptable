import { IShortcutStrategy } from './Interface/IShortcutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { ICellInfo } from '../Api/Interface/Interfaces';
export declare class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {
    private ShortcutState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private handleKeyDown;
    private CalculateShortcut;
    ApplyShortcut(activeCell: ICellInfo, newValue: any): void;
    private ShowErrorPreventMessage;
    private ShowWarningMessages;
}
