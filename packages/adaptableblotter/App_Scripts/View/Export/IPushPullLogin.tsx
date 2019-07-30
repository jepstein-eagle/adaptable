import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';

import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import HelpBlock from '../../components/HelpBlock';

interface IPushPullLoginProps extends StrategyViewPopupProps<IPushPullLoginComponent> {
  onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
  onCancel: () => PopupRedux.PopupHideScreenAction;
  ErrorMsg: string;
}

interface IPushPullLoginInternalState {
  Login: string;
  Password: string;
}

class IPushPullLoginComponent extends React.Component<
  IPushPullLoginProps,
  IPushPullLoginInternalState
> {
  constructor(props: IPushPullLoginProps) {
    super(props);
    this.state = { Login: null, Password: null };
  }
  render() {
    return <div>TODO</div>;
    // let cssClassName: string = StyleConstants.PUSHPULL_LOGIN;
    // return (
    //   <PanelWithButton
    //
    //     headerText="iPushPull Login"
    //     bsStyle="primary"
    //     glyphicon="export"
    //   >
    //     <FormGroup
    //       controlId={'formEmail'}
    //       validationState={StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? 'error' : null}
    //     >
    //       <ControlLabel>Email address</ControlLabel>
    //       <Input onChange={e => this.onLoginChange(e)} type="email" placeholder="Enter email" />
    //     </FormGroup>
    //     <FormGroup
    //       controlId={'formPassword'}
    //       validationState={StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? 'error' : null}
    //     >
    //       <ControlLabel>Password</ControlLabel>
    //       <FormControl type="password" onChange={e => this.onPasswordChange(e)} />
    //       <HelpBlock>{this.props.ErrorMsg}</HelpBlock>
    //     </FormGroup>
    //     <Button
    //       className="ab_right_modal_button"
    //       onClick={() => {
    //         this.props.onCancel();
    //       }}
    //     >
    //       Cancel <Glyphicon glyph="remove" />
    //     </Button>
    //     <Button
    //       disabled={StringExtensions.IsNullOrEmpty(this.state.Password)}
    //       className="ab_right_modal_button"
    //       bsStyle="primary"
    //       onClick={() => {
    //         this.props.onLogin(this.state.Login, this.state.Password);
    //       }}
    //     >
    //       <Glyphicon glyph="user" /> Login
    //     </Button>
    //   </PanelWithButton>
    // );
  }

  private onLoginChange(event: React.FormEvent<any>) {
    const e = event.target as HTMLInputElement;
    this.setState({ Login: e.value });
  }

  private onPasswordChange(event: React.FormEvent<any>) {
    const e = event.target as HTMLInputElement;
    this.setState({ Password: e.value });
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ErrorMsg: state.System.ReportErrorMessage,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onLogin: (login: string, password: string) => dispatch(ExportRedux.IPPLogin(login, password)),
    onCancel: () => {
      dispatch(PopupRedux.PopupHideScreen());
      dispatch(SystemRedux.ReportSetErrorMessage(''));
    },
  };
}

export let IPushPullLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullLoginComponent);
