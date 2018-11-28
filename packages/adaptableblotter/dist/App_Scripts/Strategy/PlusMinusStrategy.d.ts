import { IPlusMinusStrategy } from './Interface/IPlusMinusStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IColumn } from '../Core/Interface/IColumn';
import { ICellInfo } from '../Core/Interface/Interfaces';
export declare class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    private PlusMinusState;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    private handleKeyDown;
    private ShowErrorPreventMessage;
    private ShowWarningMessages;
    ApplyPlusMinus(keyEventString: string, successfulValues: ICellInfo[]): void;
}
