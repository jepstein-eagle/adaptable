import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';
export declare class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    CurrentLayout: string;
    protected LayoutState: LayoutState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
}
