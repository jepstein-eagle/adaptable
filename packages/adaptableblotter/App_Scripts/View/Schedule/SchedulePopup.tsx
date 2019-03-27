import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'

interface SchedulePopupProps extends StrategyViewPopupProps<SchedulePopupComponent> {

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




        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ScheduleStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ScheduleGlyph} infoBody={infoBody}>

                <span>Schedules here...</span>

            </PanelWithImage>
        </div>

    }



}


function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps() {
    return {
    };
}

export let SchedulePopup = connect(mapStateToProps, mapDispatchToProps)(SchedulePopupComponent);
