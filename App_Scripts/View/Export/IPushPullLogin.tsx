import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonToolbar, ControlLabel, Button, Form, Col, Panel, FormControl, FormGroup, Collapse, Glyphicon } from 'react-bootstrap';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { Helper } from '../../Core/Helper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'

interface IPushPullLoginProps extends IStrategyViewPopupProps<IPushPullLoginComponent> {
    onLogin: (login: string, password: string, sucessAction: Redux.Action) => ExportRedux.IPPLoginAction;
    onCancel: () => PopupRedux.PopupHideAction
}

interface IPushPullLoginInternalState {
    Login: string
    Password: string
}

class IPushPullLoginComponent extends React.Component<IPushPullLoginProps, IPushPullLoginInternalState> {
    render() {
        return <PanelWithButton headerText="iPushPull Login" bsStyle="primary" glyphicon="export">
            <FormGroup controlId={"formEmail"}>
                <ControlLabel>Email address</ControlLabel>
                <FormControl onChange={(e) => this.onLoginChange(e)} type="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup controlId={"formPassword"}>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" onChange={(e) => this.onPasswordChange(e)} />
            </FormGroup>
            <Button style={buttonRightStyle} onClick={() => { this.props.onCancel() }}>Cancel <Glyphicon glyph="remove" /></Button>
            <Button style={buttonRightStyle} bsStyle="primary" onClick={() => { this.props.onLogin(this.state.Login, this.state.Password, JSON.parse(this.props.PopupParams)) }}><Glyphicon glyph="user" /> Login</Button>
        </PanelWithButton>
    }

    private onLoginChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.setState({ Login: e.value })
    }

    private onPasswordChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.setState({ Password: e.value })
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Ranges: state.Range.Ranges
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLogin: (login: string, password: string, sucessAction: Redux.Action) => dispatch(ExportRedux.IPPLogin(login, password, sucessAction)),
        onCancel: () => dispatch(PopupRedux.PopupHide())
    };
}

export let IPushPullLogin = connect(mapStateToProps, mapDispatchToProps)(IPushPullLoginComponent);

var buttonRightStyle = {
    float: 'right'
};