import { ConditionalStyleState, ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';
export declare abstract class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    protected ConditionalStyleState: ConditionalStyleState;
    protected ColumnCategoryState: ColumnCategoryState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    addContextMenuItem(column: IColumn): void;
    protected abstract handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void;
    private handleGridDataBound;
    abstract InitStyles(): void;
}
