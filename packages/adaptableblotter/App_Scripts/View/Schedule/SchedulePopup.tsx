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
import { AccessLevel } from "../../Utilities/Enums";
import { ISchedule } from "../../Utilities/Interface/BlotterObjects/ISchedule";
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

        let clearButton = <ButtonClear cssClassName={cssClassName} onClick={() => this.onClear()}
        bsStyle={"default"}
        overrideText={"Create Test schedule"}
        overrideTooltip="Create Test schedule"
        DisplayMode="Text"
        size={"small"} 
        AccessLevel={AccessLevel.Full}
        />


        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ScheduleStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ScheduleGlyph} infoBody={infoBody}>

                <span>Schedules here...</span>
                {clearButton}
            </PanelWithImage>
        </div>

    }

    onClear() {
       let schedule : ISchedule = ObjectFactory.CreateTestSchedule();
       this.props.onAddSchedule(schedule);
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
