import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import { AccessLevel, MessageType, ExportDestination, DayOfWeek } from "../../Utilities/Enums";
import { IReminder } from "../../Utilities/Interface/BlotterObjects/IReminder";
import { ISchedule } from "../../Utilities/Interface/BlotterObjects/ISchedule";
import { IAdaptableAlert } from "../../Utilities/Interface/IMessage";
import { IAutoExport } from "../../Utilities/Interface/BlotterObjects/IReport";

interface ReminderPopupProps extends StrategyViewPopupProps<ReminderPopupComponent> {
    onAddReminder: (Reminder: IReminder) => ReminderRedux.ReminderAddAction,
     onDeleteReminder: (index: number) => ReminderRedux.ReminderDeleteAction;
}

interface ReminderPopupState {

}

class ReminderPopupComponent extends React.Component<ReminderPopupProps, ReminderPopupState> {

    constructor(props: ReminderPopupProps) {
        super(props);
        // this.state = { EditedReminderText: "", EditedStyle: null }
    }


    public componentDidMount() {
        //    this.setState({ EditedReminderText: this.props.ReminderText, EditedStyle: this.props.ReminderStyle });
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__Reminder";

        let infoBody: any[] = ["Run Reminders.", <br />, <br />, "Use it.",]

        let clearButton1 = <ButtonClear cssClassName={cssClassName} onClick={() => this.addReminder()}
            bsStyle={"default"}
            overrideText={"Alert Reminder"}
            overrideTooltip="Create Test Reminder"
            DisplayMode="Text"
            size={"small"}
            AccessLevel={AccessLevel.Full}
        />

        let clearButton2 = <ButtonClear cssClassName={cssClassName} onClick={() => this.addExport()}
            bsStyle={"default"}
            overrideText={"REport Reminder"}
            overrideTooltip="Create Test Reminder"
            DisplayMode="Text"
            size={"small"}
            AccessLevel={AccessLevel.Full}
        />

        let deleteButton = <ButtonClear cssClassName={cssClassName} onClick={() => this.onDelete()}
            bsStyle={"default"}
            overrideText={"Clear Alert"}
            overrideTooltip="Delete Alert"
            DisplayMode="Text"
            size={"small"}
            AccessLevel={AccessLevel.Full}
        />


        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ReminderStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ReminderGlyph} infoBody={infoBody}>

                <span>Reminders here...</span>
                {clearButton1}
                {clearButton2}
                {deleteButton}

            </PanelWithImage>
        </div>

    }

    addReminder() {
        let reminder: IReminder = this.CreateTestReminder1();
        //  this.props.Blotter.ScheduleService.AddAlertSchedule(reminder.Schedule, reminder.Alert);
        this.props.onAddReminder(reminder);
    }


    addExport() {
       
        let schedule: ISchedule = {
            Hour: 21,
            Minute: 2,
            DaysOfWeek: [DayOfWeek.Friday, DayOfWeek.Tuesday],
        }


      //  this.props.onAddAutoExport(-1, autoExport);

        //   this.props.Blotter.ScheduleService.AddReportSchedule(schedule, reportSchedule);
    }

    onDelete() {
        this.props.onDeleteReminder(0);
    }

    private CreateTestReminder1(): IReminder {

        let alert: IAdaptableAlert = {
            Header: "Test Reminder",
            Msg: "This alert has worked",
            MessageType: MessageType.Success,
            ShowAsPopup: true
        }
  let schedule: ISchedule = {
            DaysOfWeek: [4],
            Hour: 20,
            Minute: 58
        }

        let reminder: IReminder = {
            Alert: alert,
            Schedule: schedule
        }

        return reminder;
    }



}


function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddReminder: (Reminder: IReminder) => dispatch(ReminderRedux.ReminderAdd(Reminder)),
         onDeleteReminder: (index: number) => dispatch(ReminderRedux.ReminderDelete(index)),
    };
}

export let ReminderPopup = connect(mapStateToProps, mapDispatchToProps)(ReminderPopupComponent);
