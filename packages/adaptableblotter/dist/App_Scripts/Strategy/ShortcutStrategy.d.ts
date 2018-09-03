import { IShortcutStrategy } from './Interface/IShortcutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICellInfo } from '../Core/Interface/Interfaces';
export declare class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {
    private Shortcuts;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private handleKeyDown;
    private CalculateShortcut;
    ApplyShortcut(activeCell: ICellInfo, newValue: any): void;
    private ShowErrorPreventMessage;
    private ShowWarningMessages;
}
