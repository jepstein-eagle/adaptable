import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from './../DualListBoxEditor'
import { ConfigEntityRowItem } from "../Components/ConfigEntityRowItem";
import { IColItem } from "../Interfaces";
import { PanelWithRow } from "../Components/Panels/PanelWithRow";
import { Helper } from "../../Core/Helpers/Helper";

interface BulkUpdatePopupComponentProps extends StrategyViewPopupProps<BulkUpdatePopupComponent> {
   
}



class BulkUpdatePopupComponent extends React.Component<BulkUpdatePopupComponentProps, {}> {

    render() {

       

        return <PanelWithImage header={StrategyNames.BulkUpdateStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.BulkUpdateGlyph}>
            <PanelWithRow ColItems={null} bsStyle="info" />
            {"Hello"}
        </PanelWithImage>
    }



}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        //  onDashboardControlConfigChange: (strategyId: string, newConfig: any) => dispatch(DashboardRedux.DashboardSetConfigurationItem(strategyId, newConfig))
    };
}

export let BulkUpdatePopup = connect(mapStateToProps, mapDispatchToProps)(BulkUpdatePopupComponent);

