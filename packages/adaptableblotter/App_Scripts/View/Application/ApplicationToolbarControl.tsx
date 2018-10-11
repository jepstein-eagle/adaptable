import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { AccessLevel } from "../../Core/Enums";

interface ApplicationToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ApplicationToolbarControlComponent> {
    ApplicationToolbarTitle: string;

}
class ApplicationToolbarControlComponent extends React.Component<ApplicationToolbarControlComponentProps, {}> {

    render(): any {

        let cssClassName: string = this.props.cssClassName + "__Application";
        let headerText = StringExtensions.IsNotNullOrEmpty(this.props.ApplicationToolbarTitle) ?
            this.props.ApplicationToolbarTitle :
            StrategyIds.ApplicationStrategyName

        return <PanelDashboard cssClassName={cssClassName} headerText={headerText} glyphicon={StrategyIds.ApplicationGlyph} onClose={() => this.props.onClose(StrategyIds.ApplicationStrategyId)} onConfigure={() => this.props.onConfigure()}>
            <div className="ApplicationToolBarContents" style={{ minHeight: 30 }}>

            </div>
        </PanelDashboard>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ApplicationToolbarTitle: state.Dashboard.ApplicationToolbarTitle,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.ApplicationStrategyId,ScreenPopups.ApplicationPopup))
    };
}

export let ApplicationToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ApplicationToolbarControlComponent);