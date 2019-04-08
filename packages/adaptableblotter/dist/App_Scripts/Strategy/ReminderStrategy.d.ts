import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { ReminderState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
    protected ReminderState: ReminderState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private handleGridReloaded;
    private scheduleReminders;
}
