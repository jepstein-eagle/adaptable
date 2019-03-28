import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IScheduleStrategy } from './Interface/IScheduleStrategy'
import { ScheduleState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StateChangedTrigger, ExportDestination, ScheduleType, MessageType } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';
import { IReportScheduleItem, IScheduleItem, ISchedule, IAlertScheduleItem, IScheduleTime, IScheduleRule } from '../Utilities/Interface/BlotterObjects/ISchedule';
import { IAdaptableAlert } from '../Utilities/Interface/IMessage';

export class ScheduleStrategy extends AdaptableStrategyBase implements IScheduleStrategy {
    protected ScheduleState: ScheduleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ScheduleStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ScheduleStrategyName, ScreenPopups.SchedulePopup, StrategyConstants.ScheduleGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            // to do
        }
    }

    protected InitState() {
        if (this.ScheduleState != this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule) {

            // just trying one out...

            let scheduleRule: IScheduleRule ={
                DayOfWeek:5,
                Hour: 14,
                Minute: 53
            }
           
            let scheduleTime: IScheduleTime={
               RecurringDate: scheduleRule
            }

            let alertScheduleItem: IAlertScheduleItem = {
                Alert: {

                    Header: "Test Schedule",
                    Msg: "This alert has worked",
                    MessageType: MessageType.Success,
                    ShowAsPopup: true
                }
            }

            let reportSchedule: ISchedule = {
                ScheduleItem: {
                    Name: "All Data",
                    ExportDestination: ExportDestination.CSV
                },
                ScheduleTime: scheduleTime,
                ScheduleType: ScheduleType.Report
            }

            let alertSchedule: ISchedule = {
                ScheduleItem: alertScheduleItem,
                ScheduleTime: scheduleTime,
                ScheduleType: ScheduleType.Alert
            }


        //    this.blotter.ScheduleService.AddSchedule(reportSchedule);
            this.blotter.ScheduleService.AddSchedule(alertSchedule);

            this.ScheduleState = this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Schedule, this.ScheduleState)
            }
        }
    }


}