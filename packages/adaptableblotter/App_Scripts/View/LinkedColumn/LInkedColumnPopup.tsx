import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColItem } from "../UIInterfaces";
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'

interface LinkedColumnPopupProps extends StrategyViewPopupProps<LinkedColumnPopupComponent> {
 //   CurrentCalendar: string
 //   AvailableLinkedColumn: ICalendar[]
 //   onSelectCalendar: (selectedCalendar: ICalendar) => LinkedColumnRedux.LinkedColumnelectAction,
}

interface LinkedColumnPopupInternalState {
 //   DisplayedCalendar: ICalendar
 //   DisplayedYear: Number
}

class LinkedColumnPopupComponent extends React.Component<LinkedColumnPopupProps, LinkedColumnPopupInternalState> {

    constructor(props: LinkedColumnPopupProps) {
        super(props);
        this.state = { DisplayedCalendar: null, DisplayedYear: 2017 }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__LinkedColumn";

        let infoBody: any[] = ["Choose which region Holiday LinkedColumn you wish to use.", <br />, <br />,
            "These are used primarily when calculating Working Days."]


     
       
    
        return <PanelWithImage cssClassName={cssClassName}  header={StrategyConstants.LinkedColumnStrategyName} bsStyle="primary" glyphicon={StrategyConstants.LinkedColumnGlyph} infoBody={infoBody}>

           
           
        </PanelWithImage>
    }

   

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
    //    CurrentCalendar: state.Calendar.CurrentCalendar,
    //    AvailableLinkedColumn: state.System.AvailableLinkedColumn
    };
}

function mapDispatchToProps() {
    return {
    //    onSelectCalendar: (calendar: ICalendar) => dispatch(LinkedColumnRedux.LinkedColumnelect(calendar.Name)),
    };
}

export let LinkedColumnPopup = connect(mapStateToProps, mapDispatchToProps)(LinkedColumnPopupComponent);

