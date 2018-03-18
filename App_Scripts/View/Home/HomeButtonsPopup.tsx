import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from "../Components/ListBox/DualListBoxEditor";

interface HomeButtonsPopupComponentProps extends StrategyViewPopupProps<HomeButtonsPopupComponent> {
    IsReadOnly: boolean,
    DashboardState: DashboardState,
    MenuState: MenuState,
    onDashboardControlConfigChange: (strategyIds: string[]) => DashboardRedux.DashboardSetFunctionButtonsAction
}

class HomeButtonsPopupComponent extends React.Component<HomeButtonsPopupComponentProps, {}> {
    render() {
        let config: string[] = [];
        this.props.DashboardState.DashboardFunctionButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.Label == x)
            if (menuItem != null && menuItem.IsVisible) {
                config.push(x)
            }
        })

        return <div className="adaptable_blotter_style_popup_home">
            <PanelWithImage header="Function Buttons Configuration" bsStyle="primary" glyphicon={StrategyGlyphs.FunctionsGlyph}>
                <DualListBoxEditor AvailableValues={this.props.MenuState.MenuItems.filter(x => x.IsVisible && config.indexOf(x.Label) == -1).map(x => x.Label)}
                    SelectedValues={config}
                    HeaderAvailable="Available Function Buttons"
                    HeaderSelected="Visible Function Buttons"
                    onChange={(SelectedValues) => this.ListChange(SelectedValues)}></DualListBoxEditor>
            </PanelWithImage>
        </div>
    }

    ListChange(selectedValues: string[]) {
        this.props.onDashboardControlConfigChange(selectedValues)
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
         DashboardState: state.Dashboard,
        MenuState: state.Menu,
      };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardControlConfigChange: (strategyIds: string[]) => dispatch(DashboardRedux.DashboardSetFunctionButtons(strategyIds))
    };
}

export let HomeButtonsPopup = connect(mapStateToProps, mapDispatchToProps)(HomeButtonsPopupComponent);

