import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from "../Components/ListBox/DualListBoxEditor";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";

interface HomeButtonsPopupComponentProps extends StrategyViewPopupProps<HomeButtonsPopupComponent> {
    IsReadOnly: boolean,
    DashboardState: DashboardState,
    MenuState: MenuState,
    onDashboardControlConfigChange: (strategyIds: string[]) => DashboardRedux.DashboardSetFunctionButtonsAction
}

class HomeButtonsPopupComponent extends React.Component<HomeButtonsPopupComponentProps, {}> {
    render() {
        let cssClassName: string = this.props.cssClassName + "__home";

        let selectedValues: string[] = [];
        this.props.DashboardState.VisibleButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.StrategyId == x)
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyNames.getNameForStrategy(x))
            }
        })

        let availableValues = this.props.MenuState.MenuItems.filter(x => x.IsVisible && selectedValues.indexOf(x.Label) == -1).map(x => x.Label)

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText="Function Buttons Configuration" bsStyle="primary" glyphicon={StrategyGlyphs.FunctionsGlyph} className="ab_main_popup">
                <DualListBoxEditor AvailableValues={availableValues}
                    cssClassName={cssClassName}
                    SelectedValues={selectedValues}
                    HeaderAvailable="Available Function Buttons"
                    HeaderSelected="Visible Function Buttons"
                    onChange={(SelectedValues) => this.ListChange(SelectedValues)}></DualListBoxEditor>
            </PanelWithButton>
        </div>
    }

    ListChange(selectedValues: string[]) {
        let buttonNames = selectedValues.map(sv => StrategyIds.getIdForStrategyName(sv))
        this.props.onDashboardControlConfigChange(buttonNames)
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

