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

interface IPushPullLoginProps {
  onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
  onCancel: () => any;
}

interface IPushPullLoginInternalState {
  Login: string;
  Password: string;
}

const IPushPullLoginComponent = (props: IPushPullLoginProps) => {
  const [state, setState] = React.useState<IPushPullLoginInternalState>({
    Login: '',
    Password: '',
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
      header="iPushPull Login"
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
        <FormLayout padding={2}>
          <FormRow label={'IPushPull login'}>
            <Input
              type="email"
              placeholder="Email address"
              value={state.Login}
              onChange={onLoginChange}
            />
          </FormRow>
          <FormRow label={'Password'}>
            <Input
              type="password"
              placeholder="Password"
              value={state.Password}
              onChange={onPasswordChange}
            />
          </FormRow>
        </FormLayout>
      </FlexWithFooter>
    </PanelWithImage>
  );
};

function mapStateToProps(state: AdaptableBlotterState) {
  return {};
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

export let IPushPullLogin = connect(mapStateToProps, mapDispatchToProps)(IPushPullLoginComponent);
