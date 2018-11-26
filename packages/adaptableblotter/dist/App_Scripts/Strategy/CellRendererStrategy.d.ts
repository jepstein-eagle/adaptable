import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICellRendererStrategy } from './Interface/ICellRendererStrategy';
import { CellRendererState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Core/Interface/IColumn';
export declare class CellRendererStrategy extends AdaptableStrategyBase implements ICellRendererStrategy {
    protected CellRendererState: CellRendererState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
}
