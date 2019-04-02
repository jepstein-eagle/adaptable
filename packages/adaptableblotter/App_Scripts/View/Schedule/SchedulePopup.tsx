import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import * as ScheduleRedux from '../../Redux/ActionsReducers/ScheduleRedux'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import { AccessLevel, ExportDestination, ScheduleType, MessageType } from "../../Utilities/Enums";
import { ISchedule, IScheduleRule, IScheduleTime, IAlertScheduleItem } from "../../Utilities/Interface/BlotterObjects/ISchedule";
import { ObjectFactory } from "../../Utilities/ObjectFactory";

interface SchedulePopupProps extends StrategyViewPopupProps<SchedulePopupComponent> {
    onAddSchedule: (schedule: ISchedule) => ScheduleRedux.ScheduleAddAction,
   
}

interface SchedulePopupState {

}

class SchedulePopupComponent extends React.Component<SchedulePopupProps, SchedulePopupState> {

    constructor(props: SchedulePopupProps) {
        super(props);
        // this.state = { EditedScheduleText: "", EditedStyle: null }
    }


    public componentDidMount() {
        //    this.setState({ EditedScheduleText: this.props.ScheduleText, EditedStyle: this.props.ScheduleStyle });
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__Schedule";

        let infoBody: any[] = ["Run schedules.", <br />, <br />, "Use it.",]

        let clearButton1 = <ButtonClear cssClassName={cssClassName} onClick={() => this.onClear1()}
        bsStyle={"default"}
        overrideText={"Alert schedule"}
        overrideTooltip="Create Test schedule"
        DisplayMode="Text"
        size={"small"} 
        AccessLevel={AccessLevel.Full}
        />

        let clearButton2 = <ButtonClear cssClassName={cssClassName} onClick={() => this.onClear2()}
        bsStyle={"default"}
        overrideText={"REport schedule"}
        overrideTooltip="Create Test schedule"
        DisplayMode="Text"
        size={"small"} 
        AccessLevel={AccessLevel.Full}
        />


        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ScheduleStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ScheduleGlyph} infoBody={infoBody}>

                <span>Schedules here...</span>
                {clearButton1}
                {clearButton2}

            </PanelWithImage>
        </div>

    }

    onClear1() {
       let schedule : ISchedule = this.CreateTestSchedule1();
       this.props.onAddSchedule(schedule);
    }

    onClear2() {
       let schedule : ISchedule = this.CreateTestSchedule2();
       this.props.onAddSchedule(schedule);
    }

    private CreateTestSchedule1(): ISchedule{
        let scheduleRule: IScheduleRule ={
            DayOfWeek:2,
            Hour: 22,
            Minute: 12
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

         let alertSchedule: ISchedule = {
            ScheduleItem: alertScheduleItem,
            ScheduleTime: scheduleTime,
            ScheduleType: ScheduleType.Alert
        }
//console.log(alertSchedule);
        return alertSchedule;

    }
    private CreateTestSchedule2(): ISchedule{
        let scheduleRule: IScheduleRule ={
            DayOfWeek:2,
            Hour: 21,
            Minute: 45
        }
       
        let scheduleTime: IScheduleTime={
           RecurringDate: scheduleRule
        }

        let reportSchedule: ISchedule = {
            ScheduleItem: {
                Name: "All Data",
                ExportDestination: ExportDestination.CSV
            },
            ScheduleTime: scheduleTime,
            ScheduleType: ScheduleType.Report
        }


       
       
//console.log(alertSchedule);
        return reportSchedule;

    }

}


function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddSchedule: (schedule: ISchedule) => dispatch(ScheduleRedux.ScheduleAdd(schedule)),
    };
}

export let SchedulePopup = connect(mapStateToProps, mapDispatchToProps)(SchedulePopupComponent);
