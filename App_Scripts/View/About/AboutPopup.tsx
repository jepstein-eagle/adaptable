import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from './../DualListBoxEditor'
import { ConfigEntityRowItem } from "../Components/ConfigEntityRowItem";
import { IColItem } from "../Interfaces";
import { PanelWithRow } from "../Components/Panels/PanelWithRow";
import { Helper } from "../../Core/Helpers/Helper";

interface AboutPopupComponentProps extends StrategyViewPopupProps<AboutPopupComponent> {
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
}

interface KeyValuePair {
    Key: string,
    Value: string
}

interface AboutState {
    KeyValuePairs: KeyValuePair[]
}

class AboutPopupComponent extends React.Component<AboutPopupComponentProps, AboutState> {

    constructor() {
        super();
        this.state = { KeyValuePairs: [] }
    }

    componentDidMount() {
        let keyValuePairs: KeyValuePair[] = []
        let paramItems: string[] = this.props.PopupParams.split("|");
        paramItems.forEach(y => {
            let paramItem: string[] = y.split(":")
            let keyValuePair: KeyValuePair = { Key: paramItem[0], Value: paramItem[1] }
            keyValuePairs.push(keyValuePair);
        })
        this.setState({ KeyValuePairs: keyValuePairs })
    }

    render() {

        let colItems: IColItem[] = [
            { Content: "Property", Size: 6 },
            { Content: "Value", Size: 6 },
        ]

        let count = this.state.KeyValuePairs.length

        let aboutItems = this.state.KeyValuePairs.map((x, index) => {
            let rowColItems: IColItem[] = Helper.cloneObject(colItems)
            rowColItems[0].Content = x.Key
            rowColItems[1].Content = x.Value
            return <ConfigEntityRowItem key={index} ColItems={rowColItems} />
        })

        return <PanelWithImage header="About" bsStyle="primary" glyphicon={"info-sign"}>
            <PanelWithRow ColItems={colItems} bsStyle="info" />
            {aboutItems}
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

export let AboutPopup = connect(mapStateToProps, mapDispatchToProps)(AboutPopupComponent);

