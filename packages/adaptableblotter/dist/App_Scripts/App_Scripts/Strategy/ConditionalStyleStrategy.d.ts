import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IColumn } from '../Core/Interface/IColumn';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';
export declare abstract class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    protected ConditionalStyleState: ConditionalStyleState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    addContextMenuItem(column: IColumn): void;
    protected abstract handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    private handleGridDataBound;
    abstract InitStyles(): void;
}
