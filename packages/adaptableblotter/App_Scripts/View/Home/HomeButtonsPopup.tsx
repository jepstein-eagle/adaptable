import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { DualListBoxEditor } from "../Components/ListBox/DualListBoxEditor";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { FormGroup, Col, Checkbox, Row } from "react-bootstrap";

interface HomeButtonsPopupComponentProps extends StrategyViewPopupProps<HomeButtonsPopupComponent> {
    DashboardState: DashboardState,
    MenuState: MenuState,
    onDashboardSetFunctionButtons: (StrategyConstants: string[]) => DashboardRedux.DashboardSetFunctionButtonsAction
    onDashboardShowFunctionsDropdown: () => DashboardRedux.DashboardShowFunctionsDropdownAction
    onDashboardHideFunctionsDropdown: () => DashboardRedux.DashboardHideFunctionsDropdownAction
    onDashboardShowColumnsDropdown: () => DashboardRedux.DashboardShowColumnsDropdownAction
    onDashboardHideColumnsDropdown: () => DashboardRedux.DashboardHideColumnsDropdownAction
    onDashboardShowSystemStatusButton: () => DashboardRedux.DashboardShowSystemStatusButtonAction
    onDashboardHideSystemStatusButton: () => DashboardRedux.DashboardHideSystemStatusButtonAction
    onDashboardShowAboutButton: () => DashboardRedux.DashboardShowAboutButtonAction
    onDashboardHideAboutButton: () => DashboardRedux.DashboardHideAboutButtonAction
}

class HomeButtonsPopupComponent extends React.Component<HomeButtonsPopupComponentProps, {}> {
    render() {
        let cssClassName: string = this.props.cssClassName + "__home";

        let selectedValues: string[] = [];
        this.props.DashboardState.VisibleButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.StrategyId == x)
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyConstants.getNameForStrategyId(x))
            }
        })

        let availableValues = this.props.MenuState.MenuItems.filter(x => x.IsVisible && selectedValues.indexOf(x.Label) == -1).map(x => x.Label)

        let individualHomeToolbarOptions = <AdaptableBlotterForm horizontal>
            <FormGroup controlId="formInlineName">
                <Col xs={5} className="ab_medium_margin">
                    <Checkbox onChange={(e) => this.onShowFunctionsDropdownChanged(e)}
                        checked={this.props.DashboardState.ShowFunctionsDropdown} > Show Functions Dropdown </Checkbox>
                </Col>
                <Col xs={5} className="ab_medium_margin">
                    <Checkbox onChange={(e) => this.onShowColumnsDropdownChanged(e)}
                        checked={this.props.DashboardState.ShowColumnsDropdown} > Show Columns Dropdown</Checkbox>
                </Col>
                <Col xs={5} className="ab_medium_margin">
                    <Checkbox onChange={(e) => this.onShowSystemStatusButtonChanged(e)}
                        checked={this.props.DashboardState.ShowSystemStatusButton} > Show System Status Button </Checkbox>
                </Col>
                <Col xs={5} className="ab_medium_margin">
                    <Checkbox onChange={(e) => this.onShowAboutButtonChanged(e)}
                        checked={this.props.DashboardState.ShowAboutButton} > Show About Button </Checkbox>
                </Col>
            </FormGroup>
        </AdaptableBlotterForm>;

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText="Home Toolbar Configuration" bsStyle="primary" glyphicon={StrategyConstants.FunctionsGlyph} className="ab_main_popup">
                {individualHomeToolbarOptions}
                <DualListBoxEditor AvailableValues={availableValues}
                    cssClassName={cssClassName}
                    SelectedValues={selectedValues}
                    HeaderAvailable="Hidden Function Buttons"
                    HeaderSelected="Visible Function Buttons"
                    onChange={(SelectedValues) => this.ListChange(SelectedValues)}
                    ReducedDisplay={true} />
            </PanelWithButton>
        </div>
    }

    onShowFunctionsDropdownChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardShowFunctionsDropdown()
        } else {
            this.props.onDashboardHideFunctionsDropdown()
        }
    }

    onShowColumnsDropdownChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardShowColumnsDropdown()
        } else {
            this.props.onDashboardHideColumnsDropdown()
        }
    }

    onShowSystemStatusButtonChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardShowSystemStatusButton()
        } else {
            this.props.onDashboardHideSystemStatusButton()
        }
    }

    onShowAboutButtonChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardShowAboutButton()
        } else {
            this.props.onDashboardHideAboutButton()
        }
    }

    ListChange(selectedValues: string[]) {
        let buttonNames = selectedValues.map(sv => StrategyConstants.getIdForStrategyName(sv))
        this.props.onDashboardSetFunctionButtons(buttonNames)
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
        onDashboardSetFunctionButtons: (StrategyConstants: string[]) => dispatch(DashboardRedux.DashboardSetFunctionButtons(StrategyConstants)),
        onDashboardShowFunctionsDropdown: () => dispatch(DashboardRedux.DashboardShowFunctionsDropdown()),
        onDashboardHideFunctionsDropdown: () => dispatch(DashboardRedux.DashboardHideFunctionsDropdown()),
        onDashboardShowColumnsDropdown: () => dispatch(DashboardRedux.DashboardShowColumnsDropdown()),
        onDashboardHideColumnsDropdown: () => dispatch(DashboardRedux.DashboardHideColumnsDropdown()),
        onDashboardShowSystemStatusButton: () => dispatch(DashboardRedux.DashboardShowSystemStatusButton()),
        onDashboardHideSystemStatusButton: () => dispatch(DashboardRedux.DashboardHideSystemStatusButton()),
        onDashboardShowAboutButton: () => dispatch(DashboardRedux.DashboardShowAboutButton()),
        onDashboardHideAboutButton: () => dispatch(DashboardRedux.DashboardHideAboutButton()),
    }
}

export let HomeButtonsPopup = connect(mapStateToProps, mapDispatchToProps)(HomeButtonsPopupComponent);

