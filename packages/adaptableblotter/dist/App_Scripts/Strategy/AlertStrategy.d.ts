import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IAlertDefinition } from '../Api/Interface/IAdaptableBlotterObjects';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';
export declare class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    protected AlertState: AlertState;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    CheckDataChanged(dataChangedEvent: IDataChangedEvent): IAlertDefinition[];
    private IsAlertTriggered;
}
