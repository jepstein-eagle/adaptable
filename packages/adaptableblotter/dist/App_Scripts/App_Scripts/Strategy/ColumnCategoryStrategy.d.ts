import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ColumnCategoryStrategy extends AdaptableStrategyBase implements IColumnCategoryStrategy {
    CurrentColumnCategory: string;
    protected ColumnCategoryState: ColumnCategoryState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
}
