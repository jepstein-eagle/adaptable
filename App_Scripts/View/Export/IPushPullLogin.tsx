import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { HelpBlock } from 'react-bootstrap';
import { ControlLabel, Button, FormControl, FormGroup, Glyphicon } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import * as StyleConstants from '../../Core/Constants/StyleConstants';

interface IPushPullLoginProps extends StrategyViewPopupProps<IPushPullLoginComponent> {
    onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
    onCancel: () => PopupRedux.PopupHideAction
    ErrorMsg: string
}

interface IPushPullLoginInternalState {
    Login: string
    Password: string
}

class IPushPullLoginComponent extends React.Component<IPushPullLoginProps, IPushPullLoginInternalState> {
    constructor(props: IPushPullLoginProps) {
        super(props);
        this.state = { Login: null, Password: null }
    }
    render() {
        let cssClassName: string = StyleConstants.PUSHPULL_LOGIN
        return <PanelWithButton cssClassName={cssClassName} headerText="iPushPull Login" bsStyle="primary" glyphicon="export">
            <FormGroup controlId={"formEmail"} validationState={StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? "error" : null}>
                <ControlLabel>Email address</ControlLabel>
                <FormControl onChange={(e) => this.onLoginChange(e)} type="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup controlId={"formPassword"} validationState={StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? "error" : null}>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" onChange={(e) => this.onPasswordChange(e)} />
                <HelpBlock>{this.props.ErrorMsg}</HelpBlock>
            </FormGroup>
            <Button className="ab_right_modal_button" onClick={() => { this.props.onCancel() }}>Cancel <Glyphicon glyph="remove" /></Button>
            <Button disabled={StringExtensions.IsNullOrEmpty(this.state.Password)}
                className="ab_right_modal_button" bsStyle="primary"
                onClick={() => { this.props.onLogin(this.state.Login, this.state.Password) }}><Glyphicon glyph="user" /> Login</Button>

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
        ErrorMsg: state.Export.ErrorMsg
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLogin: (login: string, password: string) => dispatch(ExportRedux.IPPLogin(login, password)),
        onCancel: () => { dispatch(PopupRedux.PopupHide()); dispatch(ExportRedux.ReportSetErrorMsg("")) }
    };
}

export let IPushPullLogin = connect(mapStateToProps, mapDispatchToProps)(IPushPullLoginComponent);
