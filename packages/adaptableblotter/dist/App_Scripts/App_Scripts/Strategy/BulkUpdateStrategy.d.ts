import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy';
import { BulkUpdateState } from '../Redux/ActionsReducers/Interface/IState';
import { IPreviewInfo } from '../Core/Interface/IPreviewResult';
import { ICellInfo } from '../Core/Interface/Interfaces';
export declare class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
    protected BulkUpdateState: BulkUpdateState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    ApplyBulkUpdate(newValues: ICellInfo[]): void;
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(bulkUpdateValue: any): IPreviewInfo;
    private GetBulkUpdateState;
}
