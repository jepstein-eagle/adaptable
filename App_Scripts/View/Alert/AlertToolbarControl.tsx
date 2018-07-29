import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { IAlertDefinition } from "../../Core/Api/Interface/AdaptableBlotterObjects";


interface AlertToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<AlertToolbarControlComponent> {
    AlertDefinitions: IAlertDefinition[];
    onNewAdvancedSearch: () => PopupRedux.PopupShowAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowAction;

}

class AlertToolbarControlComponent extends React.Component<AlertToolbarControlComponentProps, {}> {
   
   
    render() {
         let cssClassName: string = this.props.cssClassName + "__Alert";


         let content = <span>

            Alerts to go here

            
        </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.AlertStrategyName} glyphicon={StrategyGlyphs.AlertGlyph} onClose={() => this.props.onClose(StrategyIds.AlertStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AlertDefinitions: state.Alert.AlertDefinitions,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onNewAlert: () => dispatch(PopupRedux.PopupShow(ScreenPopups.AlertPopup, false, "New")),
        onEditAlert: () => dispatch(PopupRedux.PopupShow(ScreenPopups.AlertPopup, false, "Edit")),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.AlertPopup, isReadOnly))
    };
}

export let AlertToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AlertToolbarControlComponent);
