import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { DualListBoxEditor, DisplaySize } from "../Components/ListBox/DualListBoxEditor";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { FormGroup, Col, Checkbox, Row, Radio, ControlLabel, FormControl, Panel, Form } from "react-bootstrap";
import { IEntitlement } from "../../Utilities/Interface/IEntitlement";

interface DashboardPopupComponentProps extends StrategyViewPopupProps<DashboardPopupComponent> {
    DashboardState: DashboardState,
    MenuState: MenuState,
    Entitlements: IEntitlement[];

    onDashboardSetFunctionButtons: (StrategyConstants: string[]) => DashboardRedux.DashboardSetFunctionButtonsAction
    onDashboardShowFunctionsDropdown: () => DashboardRedux.DashboardShowFunctionsDropdownAction
    onDashboardHideFunctionsDropdown: () => DashboardRedux.DashboardHideFunctionsDropdownAction
    onDashboardShowColumnsDropdown: () => DashboardRedux.DashboardShowColumnsDropdownAction
    onDashboardHideColumnsDropdown: () => DashboardRedux.DashboardHideColumnsDropdownAction
    onDashboardShowToolbarsDropdown: () => DashboardRedux.DashboardShowToolbarsDropdownAction
    onDashboardHideToolbarsDropdown: () => DashboardRedux.DashboardHideToolbarsDropdownAction
    onDashboardShowSystemStatusButton: () => DashboardRedux.DashboardShowSystemStatusButtonAction
    onDashboardHideSystemStatusButton: () => DashboardRedux.DashboardHideSystemStatusButtonAction
    onDashboardShowAboutButton: () => DashboardRedux.DashboardShowAboutButtonAction
    onDashboardHideAboutButton: () => DashboardRedux.DashboardHideAboutButtonAction
    onDashboardUseSingleColourForButtons: () => DashboardRedux.DashboardUseSingleColourForButtonsAction
    onDashboardUseMultipleColourForButtons: () => DashboardRedux.DashboardUseMultipleColourForButtonsAction
    onDashboardUseExtraSmallSizeButtons: () => DashboardRedux.DashboardUseExtraSmallButtonsAction
    onDashboardUseDefaultSizeButtons: () => DashboardRedux.DashboardUseDefaultSizeButtonsAction

    onDashboardSetToolbars: (StrategyConstants: string[]) => DashboardRedux.DashboardSetToolbarsAction
    onSetDashboardZoom: (zoom: number) => DashboardRedux.DashboardSetZoomAction,
}

export enum DashboardConfigView {
    General = 'General',
    Buttons = 'Buttons',
    Toolbars = 'Toolbars'
}

export interface DashboardPopupState {
    DashboardConfigView: DashboardConfigView,
    EditedZoomFactor: Number;
}

class DashboardPopupComponent extends React.Component<DashboardPopupComponentProps, DashboardPopupState> {
    constructor(props: DashboardPopupComponentProps) {
        super(props);
        this.state = {
            DashboardConfigView: DashboardConfigView.General, EditedZoomFactor: props.DashboardState.Zoom
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__home";

        let selectedValues: string[] = [];
        this.props.DashboardState.VisibleButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.StrategyId == x)
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyConstants.getNameForStrategyId(x))
            }
        })

        let availableToolbarNames: string[] = this.props.DashboardState.AvailableToolbars.filter(at => this.isVisibleStrategy(at)).map(at => {
            return StrategyConstants.getNameForStrategyId(at)
        })

        let visibleToolbarNames: string[] = this.props.DashboardState.VisibleToolbars.filter(at => this.isVisibleStrategy(at)).map(vt => {
            return StrategyConstants.getNameForStrategyId(vt)
        })

        let availableValues = this.props.MenuState.MenuItems.filter(x => x.IsVisible && selectedValues.indexOf(x.Label) == -1).map(x => x.Label)

        let individualHomeToolbarOptions = <div >
            <FormGroup controlId="formInlineName">
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onShowFunctionsDropdownChanged(e)}
                        checked={this.props.DashboardState.ShowFunctionsDropdown} > Show Functions Dropdown </Checkbox>
                </Col>
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onShowColumnsDropdownChanged(e)}
                        checked={this.props.DashboardState.ShowColumnsDropdown} > Show Columns Dropdown</Checkbox>
                </Col>
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onShowToolbarsDropdownChanged(e)}
                        checked={this.props.DashboardState.ShowToolbarsDropdown} > Show Toolbars Dropdown </Checkbox>
                </Col>
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onShowSystemStatusButtonChanged(e)}
                        checked={this.props.DashboardState.ShowSystemStatusButton} > Show System Status Button </Checkbox>
                </Col>
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onShowAboutButtonChanged(e)}
                        checked={this.props.DashboardState.ShowAboutButton} > Show About Button </Checkbox>
                </Col>
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onUseSingleColourForButtonsChanged(e)}
                        checked={this.props.DashboardState.UseSingleColourForButtons} > Use Single Colour for All Dashboard Buttons </Checkbox>
                </Col>
                <Col xs={12} >
                    <Checkbox onChange={(e) => this.onUseExtraSmallButtonsChanged(e)}
                        checked={this.props.DashboardState.UseExtraSmallButtons} > Use Small Size Buttons </Checkbox>
                </Col>
                <Col xs={12} >
                    <Form inline>Dashboard Zoom Factor:
                    {' '}
                        <FormControl value={this.state.EditedZoomFactor.toString()} bsSize={'small'} type="number" min="0.5" step="0.05" max="1" placeholder="Enter a Number" onChange={(e) => this.onSetFactorChange(e)} />
                    </Form>
                </Col>
            </FormGroup>
        </div>;

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText="Dashboard Configuration" bsStyle="primary" glyphicon={StrategyConstants.DashboardGlyph} className="ab_main_popup">

                <Row style={{ marginBottom: '10px' }}>
                    <Col xs={12} >
                        <Radio inline value={DashboardConfigView.General} checked={this.state.DashboardConfigView == DashboardConfigView.General} onChange={(e) => this.onShowGridPropertiesChanged(e)}>General Options</Radio>
                        <Radio inline value={DashboardConfigView.Buttons} checked={this.state.DashboardConfigView == DashboardConfigView.Buttons} onChange={(e) => this.onShowGridPropertiesChanged(e)}>Function Buttons</Radio>
                        <Radio inline value={DashboardConfigView.Toolbars} checked={this.state.DashboardConfigView == DashboardConfigView.Toolbars} onChange={(e) => this.onShowGridPropertiesChanged(e)}>Function Toolbars</Radio>
                    </Col>
                </Row>

                {this.state.DashboardConfigView == DashboardConfigView.General &&
                    <div>
                        {individualHomeToolbarOptions}
                    </div>
                }
                {this.state.DashboardConfigView == DashboardConfigView.Buttons &&
                    <div>
                        <DualListBoxEditor AvailableValues={availableValues}
                            cssClassName={cssClassName}
                            SelectedValues={selectedValues}
                            HeaderAvailable="Hidden Function Buttons"
                            HeaderSelected="Visible Function Buttons"
                            onChange={(SelectedValues) => this.onDashboardButtonsChanged(SelectedValues)}
                            DisplaySize={DisplaySize.Large}
                        />
                    </div>
                }
                {this.state.DashboardConfigView == DashboardConfigView.Toolbars &&
                    <DualListBoxEditor AvailableValues={availableToolbarNames}
                        cssClassName={cssClassName}
                        SelectedValues={visibleToolbarNames}
                        HeaderAvailable="Available Toolbars"
                        HeaderSelected="Visible Toolbars"
                        onChange={(SelectedValues) => this.onDashboardToolbarsChanged(SelectedValues)}
                        DisplaySize={DisplaySize.Small}
                    />
                }


            </PanelWithButton>
        </div>
    }

    onShowGridPropertiesChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let dashboardConfigView: DashboardConfigView = e.value as DashboardConfigView;
        this.setState({ DashboardConfigView: dashboardConfigView, } as DashboardPopupState)
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

    onShowToolbarsDropdownChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardShowToolbarsDropdown()
        } else {
            this.props.onDashboardHideToolbarsDropdown()
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

    onUseSingleColourForButtonsChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardUseSingleColourForButtons();
        } else {
            this.props.onDashboardUseMultipleColourForButtons();
        }
    }

    onUseExtraSmallButtonsChanged(event: React.FormEvent<any>): void {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.onDashboardUseExtraSmallSizeButtons();
        } else {
            this.props.onDashboardUseDefaultSizeButtons();
        }
    }

    onDashboardButtonsChanged(selectedValues: string[]) {
        let selectedFunctions = selectedValues.map(sv => StrategyConstants.getIdForStrategyName(sv))
        this.props.onDashboardSetFunctionButtons(selectedFunctions)
    }

    onDashboardToolbarsChanged(selectedValues: string[]) {
        let selectedToolbars: string[] = selectedValues.map(sv => {
            return StrategyConstants.getIdForStrategyName(sv)
        })
        this.props.onDashboardSetToolbars(selectedToolbars)
    }

    private onSetFactorChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        let factor = Number(e.value)
        if (factor > 1) {
            factor = 1
        }
        if (factor < 0.5 && factor != 0) {
            factor = 0.5
        }
        this.setState({ EditedZoomFactor: factor });
        if (factor != 0) {
            this.props.onSetDashboardZoom(factor);
        }
    }

    isVisibleStrategy(strategyId: string): boolean {
        let entitlement: IEntitlement = this.props.Entitlements.find(x => x.FunctionName == strategyId);
        if (entitlement) {
            return entitlement.AccessLevel != "Hidden"
        }
        return true;
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardState: state.Dashboard,
        MenuState: state.Menu,
        Entitlements: state.Entitlements.FunctionEntitlements,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardSetFunctionButtons: (StrategyConstants: string[]) => dispatch(DashboardRedux.DashboardSetFunctionButtons(StrategyConstants)),
        onDashboardShowFunctionsDropdown: () => dispatch(DashboardRedux.DashboardShowFunctionsDropdown()),
        onDashboardHideFunctionsDropdown: () => dispatch(DashboardRedux.DashboardHideFunctionsDropdown()),
        onDashboardShowColumnsDropdown: () => dispatch(DashboardRedux.DashboardShowColumnsDropdown()),
        onDashboardHideColumnsDropdown: () => dispatch(DashboardRedux.DashboardHideColumnsDropdown()),
        onDashboardShowToolbarsDropdown: () => dispatch(DashboardRedux.DashboardShowToolbarsDropdown()),
        onDashboardHideToolbarsDropdown: () => dispatch(DashboardRedux.DashboardHideToolbarsDropdown()),
        onDashboardShowSystemStatusButton: () => dispatch(DashboardRedux.DashboardShowSystemStatusButton()),
        onDashboardHideSystemStatusButton: () => dispatch(DashboardRedux.DashboardHideSystemStatusButton()),
        onDashboardShowAboutButton: () => dispatch(DashboardRedux.DashboardShowAboutButton()),
        onDashboardHideAboutButton: () => dispatch(DashboardRedux.DashboardHideAboutButton()),
        onDashboardUseSingleColourForButtons: () => dispatch(DashboardRedux.DashboardUseSingleColourForButtons()),
        onDashboardUseMultipleColourForButtons: () => dispatch(DashboardRedux.DashboardUseMultipleColourForButtons()),
        onDashboardUseExtraSmallSizeButtons: () => dispatch(DashboardRedux.DashboardUseExtraSmallButtons()),
        onDashboardUseDefaultSizeButtons: () => dispatch(DashboardRedux.DashboardUseDefaultSizeButtons()),
        onDashboardSetToolbars: (StrategyConstants: string[]) => dispatch(DashboardRedux.DashboardSetToolbars(StrategyConstants)),
        onSetDashboardZoom: (zoom: number) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),

    }
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);

