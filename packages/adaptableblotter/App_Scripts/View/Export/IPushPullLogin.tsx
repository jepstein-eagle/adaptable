import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';

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
import { Flex, Text } from 'rebass';

interface IPushPullLoginProps {
  pushpullLogin: string | undefined;
  pushpullPassword: string | undefined;

  onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
  onCancel: () => any;
}

interface IPushPullLoginInternalState {
  Login: string | undefined;
  Password: string | undefined;
}

const IPushPullLoginComponent = (props: IPushPullLoginProps) => {
  const [state, setState] = React.useState<IPushPullLoginInternalState>({
    Login: props.pushpullLogin,
    Password: props.pushpullPassword,
  });

  const { hidePopup } = usePopupContext();

  const onSubmit = () => {
    props.onLogin(state.Login, state.Password);
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
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            iPushPull login:
          </Text>
          <Flex flex={7} flexDirection="row" alignItems="center">
            <Input
              type="email"
              placeholder="Email address"
              value={state.Login}
              onChange={onLoginChange}
            />
          </Flex>
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            iPushPull password:
          </Text>
          <Flex flex={7} flexDirection="row" alignItems="center">
            <Input
              type="password"
              placeholder="Password"
              value={state.Password}
              onChange={onPasswordChange}
            />
          </Flex>
        </Flex>
      </FlexWithFooter>
    </PanelWithImage>
  );
};

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    pushpullLogin: state.Partner.iPushPull ? state.Partner.iPushPull!.Username : undefined,
    pushpullPassword: state.Partner.iPushPull ? state.Partner.iPushPull!.Password : undefined,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
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
