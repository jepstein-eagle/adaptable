import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { AdaptablePopover } from '../AdaptablePopover';
import { MessageType } from '../../Core/Enums';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'


interface ApplicationToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ApplicationToolbarControlComponent> {

}
class ApplicationToolbarControlComponent extends React.Component<ApplicationToolbarControlComponentProps, {}> {

    render(): any {

        let cssClassName: string = this.props.cssClassName + "__Application";



        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyIds.ApplicationStrategyName} glyphicon={StrategyIds.ApplicationGlyph} onClose={() => this.props.onClose(StrategyIds.ApplicationStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            <div className="ApplicationToolBarContents" style={{minHeight:30}}>

            </div>
        </PanelDashboard>
    }   
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.ApplicationPopup, isReadOnly))
    };
}

export let ApplicationToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ApplicationToolbarControlComponent);