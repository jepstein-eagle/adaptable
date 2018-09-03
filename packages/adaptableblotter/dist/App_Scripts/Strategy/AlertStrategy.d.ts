import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { IAlertDefinition } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
export declare class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    protected AlertState: AlertState;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    CheckDataChanged(dataChangedEvent: IDataChangedEvent): IAlertDefinition[];
    private IsAlertTriggered;
}
