import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IAlertDefinition } from "../Utilities/Interface/BlotterObjects/IAlertDefinition";
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
export declare class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    protected AlertState: AlertState;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void;
    CheckDataChanged(dataChangedEvent: IDataChangedInfo): IAlertDefinition[];
    private IsAlertTriggered;
}
