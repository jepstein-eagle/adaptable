import { MenuItemShowPopup } from '../Core/MenuItem';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Modal, DropdownButton, Button, MenuItem, Alert, Glyphicon, Navbar, NavItem, Nav, NavDropdown, FormControl, Form, Col, Row, ControlLabel } from 'react-bootstrap';
import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux'
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux'
import { AdaptableBlotterPopup } from './AdaptableBlotterPopup';
import { PopupState, MenuState } from '../Redux/ActionsReducers/Interface/IState';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IMenuItem } from '../Core/interface/IStrategy'
import { MenuType } from '../Core/Enums';
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl';
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl';

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
    PopupState: PopupState;
    MenuState: MenuState;
    AdaptableBlotter: IAdaptableBlotter;
    onClose: () => PopupRedux.HidePopupAction;
    showPopup: (ComponentClassName: string, Params?: any) => PopupRedux.ShowPopupAction;
    onSetQuickSearchText: (newQuickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction,
    onSelectAdvancedSearch: (advancedSearchId: string) => AdvancedSearchRedux.AdvancedSearchSelectAction,
}

class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {

    render() {

        // a, rather basic, top menu. done for early demo purposes and which needs soon to be replaced by a proper, configurable, 'dashboard' like in WPF version
        // in this version all action items are buttons and all config screens go in a dropdown
        // plus i've added very simple quick search and advanced search controls
        if (this.props.MenuState.MenuItems) {
            var actionMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Action).map((menuItem: IMenuItem) => {
                return <NavItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</NavItem>
            });
        }

        if (this.props.MenuState.MenuItems) {
            var configMenuItems = this.props.MenuState.MenuItems.filter(m => m.MenuType == MenuType.Configuration).map((menuItem: IMenuItem) => {
                return <MenuItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}><Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}</MenuItem>
            });
        }

        return (
            <div className="adaptable_blotter_style">

                {/*  The temporary nav bar - in lieue of a Dashboard - containing action buttons, config dropdown and quick search control */}
                <Navbar fluid  >
                    <Navbar.Header>
                        {<QuickSearchToolbarControl AdaptableBlotter={this.props.AdaptableBlotter} onSetQuickSearchText={(quickSearchText: string) => this.onSetQuickSearch(quickSearchText)} />}
                    </Navbar.Header>
                    <Navbar.Header>
                        {<AdvancedSearchToolbarControl
                            Blotter={this.props.AdaptableBlotter}
                            AdvancedSearches={this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches}
                            onSelectAdvancedSearch={(advancedSearchId: string) => this.onSetAdvancedSearch(advancedSearchId)}
                            onNewAdvancedSearch={() => this.onNewAdvancedSearch()}
                            onEditAdvancedSearch={() => this.onEditAdvancedSearch()} />}
                    </Navbar.Header>
                    <Nav style={marginStyle} >
                        {actionMenuItems}
                        <NavDropdown key="Configure" title="Configure..." id="basic-nav-dropdown">
                            {configMenuItems}
                        </NavDropdown>
                    </Nav>
                </Navbar>

                {/*  The error modal we show - e.g. in SmartEdit when no numeric columns are selected */}
                <Modal show={this.props.PopupState.ShowErrorPopup} onHide={this.props.onClose} className="adaptable_blotter_style" >
                    <Modal.Body>
                        <Alert bsStyle="danger" onDismiss={this.props.onClose}>
                            <div>
                                <Form horizontal>
                                    <Row style={{ display: "flex" }}>
                                        <Col xs={1} >
                                            <Glyphicon glyph="warning-sign" style={errorGlypIconStyle} />
                                            {}
                                        </Col>
                                        <Col xs={11}>
                                            <h4>Error</h4>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>

                            <p>
                                {this.props.PopupState.ErrorMsg.split("\n").map(function (item, index) {
                                    return (
                                        <span key={index}>
                                            {item}
                                            <br />
                                        </span>
                                    )
                                })}
                            </p>
                            <p>
                                <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                            </p>
                        </Alert>
                    </Modal.Body>
                </Modal>

                {/*  The main model window where action and configuration screens are 'hosted' */}
                <AdaptableBlotterPopup showModal={this.props.PopupState.ShowPopup}
                    ComponentClassName={this.props.PopupState.ComponentClassName}
                    onHide={this.props.onClose}
                    AdaptableBlotter={this.props.AdaptableBlotter} />
            </div>

        );
    }

    onClick(menuItem: IMenuItem) {
        if (menuItem instanceof MenuItemShowPopup) {
            this.props.showPopup(menuItem.Action);
        }
        else {
            this.props.AdaptableBlotter.onMenuClicked(menuItem)
        };
    }

    onTest() {
        this.props.showPopup("CustomSortConfig");
    }

    // note: we dont do a search here, we just update the quick search state via Redux and the QuickSearchService will listen to the change and act accordingly.
    onSetQuickSearch(quickSearchText: string) {
        this.props.onSetQuickSearchText(quickSearchText);
    }

    // note: we dont do a search here, we just update the advanced search state via Redux and the AdvancedSearchService will listen to the change and act accordingly.
    onSetAdvancedSearch(advancedSearchId: string) {
        this.props.onSelectAdvancedSearch(advancedSearchId);
    }

    onEditAdvancedSearch() {
        this.props.showPopup("AdvancedSearchAction");
    }

    onNewAdvancedSearch() {
        // we need some way of passing in a argument to a screens
        // that way we can tell the advancedsearchscreen it needs to start the new search wizard
        this.props.showPopup("AdvancedSearchAction", "New");
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        PopupState: state.Popup,
        AdaptableBlotter: ownProps.Blotter,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClose: () => dispatch(PopupRedux.HidePopup()),
        showPopup: (componentClassName: string, params?: any) => dispatch(PopupRedux.ShowPopup(componentClassName, params)),
        onSetQuickSearchText: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(newQuickSearchText)),
        onSelectAdvancedSearch: (advancedSearchId: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchId)),
    };
}

let AdaptableBlotterReact: React.ComponentClass<any> = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterView);

export const AdaptableBlotterApp = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterReact Blotter={AdaptableBlotter} />
</Provider>;


let errorGlypIconStyle: React.CSSProperties = {
    fontSize: "large"
}

let buttonStyle: React.CSSProperties = {
    active: "none",
    focus: "none"
}

let marginStyle: React.CSSProperties = {
    margin: '15px'
}


