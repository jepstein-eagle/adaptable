import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy';
import { BulkUpdateState } from '../Redux/ActionsReducers/Interface/IState';
import { ICellInfo } from "../Utilities/Interface/ICellInfo";
import { IPreviewInfo } from '../Utilities/Interface/IPreview';
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
