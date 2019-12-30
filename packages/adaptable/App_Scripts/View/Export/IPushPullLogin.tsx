import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';

import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import FormLayout, { FormRow } from '../../components/FormLayout';
import Input from '../../components/Input';
import SimpleButton from '../../components/SimpleButton';
import FlexWithFooter from '../../components/FlexWithFooter';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { usePopupContext } from '../Components/Popups/PopupContext';
import ErrorBox from '../../components/ErrorBox';
import HelpBlock from '../../components/HelpBlock';
import { Flex } from 'rebass';

interface IPushPullLoginProps {
  pushpullLogin: string | undefined;
  pushpullPassword: string | undefined;
  pushpullLoginErrorMessage: string | undefined;

  onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
  onCancel: () => any;
}

interface IPushPullLoginInternalState {
  Login: string | undefined;
  Password: string | undefined;
}

const IPushPullLoginComponent = (props: IPushPullLoginProps) => {
  const [state, setState] = React.useState<IPushPullLoginInternalState>({
    Login: props.pushpullLogin || '',
    Password: props.pushpullPassword || '',
  });

  const { hidePopup } = usePopupContext();

  const onSubmit = () => {
    props.onLogin(state.Login || '', state.Password || '');
  };

  const onLoginChange = (event: React.FormEvent<any>) => {
    const e = event.target as HTMLInputElement;
    setState({ ...state, Login: e.value });
  };

  const onPasswordChange = (event: React.FormEvent<any>) => {
    const e = event.target as HTMLInputElement;
    setState({ ...state, Password: e.value });
  };
  return (
    <PanelWithImage
      header="iPushPull Login Details"
      glyphicon="export"
      variant="primary"
      style={{ height: '100%' }}
    >
      <FlexWithFooter
        as="form"
        onSubmit={(e: any) => {
          e.preventDefault();
          onSubmit();
        }}
        footerProps={{
          fontSize: 'var(--ab-font-size-4)',
        }}
        footer={
          <>
            <SimpleButton
              tone="neutral"
              variant="text"
              tooltip="Close"
              onClick={e => {
                e.stopPropagation();
                hidePopup();
              }}
            >
              CLOSE
            </SimpleButton>
            <div style={{ flex: 1 }} />

            <SimpleButton
              tone="accent"
              variant="raised"
              type="submit"
              disabled={StringExtensions.IsNullOrEmpty(state.Password)}
              icon={'check'}
            >
              Login
            </SimpleButton>
          </>
        }
      >
        <Flex flexDirection="column" padding={2} margin={2}>
          <HelpBlock marginBottom={1}>
            Login to iPushPull using your login (email address) and password.
          </HelpBlock>

          <FormLayout margin={3}>
            <FormRow label="iPushPull login:">
              <Input
                width="100%"
                type="email"
                placeholder="Email address"
                value={state.Login}
                onChange={onLoginChange}
              />
            </FormRow>
            <FormRow label="iPushPull password:">
              <Input
                width="100%"
                type="password"
                placeholder="Password"
                value={state.Password}
                onChange={onPasswordChange}
              />
            </FormRow>
            {props.pushpullLoginErrorMessage ? (
              <FormRow label="">
                <ErrorBox>{props.pushpullLoginErrorMessage}</ErrorBox>
              </FormRow>
            ) : null}
          </FormLayout>
        </Flex>
      </FlexWithFooter>
    </PanelWithImage>
  );
};

function mapStateToProps(state: AdaptableState) {
  return {
    pushpullLogin: state.Partner.iPushPull ? state.Partner.iPushPull!.Username : undefined,
    pushpullPassword: state.Partner.iPushPull ? state.Partner.iPushPull!.Password : undefined,
    pushpullLoginErrorMessage: state.System.IPPLoginMessage,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
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
