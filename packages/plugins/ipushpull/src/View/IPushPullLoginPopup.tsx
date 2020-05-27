import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import { useAdaptable } from '@adaptabletools/adaptable/src/View/AdaptableContext';

import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as IPushPullRedux from '../Redux/ActionReducers/IPushPullRedux';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import FormLayout, { FormRow } from '@adaptabletools/adaptable/src/components/FormLayout';
import Input from '@adaptabletools/adaptable/src/components/Input';
import SimpleButton from '@adaptabletools/adaptable/src/components/SimpleButton';
import FlexWithFooter from '@adaptabletools/adaptable/src/components/FlexWithFooter';
import { PanelWithImage } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithImage';
import { usePopupContext } from '@adaptabletools/adaptable/src/View/Components/Popups/PopupContext';
import ErrorBox from '@adaptabletools/adaptable/src/components/ErrorBox';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';
import { Flex } from 'rebass';

import { IPushPullPluginOptions } from '../';

interface IPushPullLoginPopupProps {
  pushpullLogin: string | undefined;
  pushpullPassword: string | undefined;
  pushpullLoginErrorMessage: string | undefined;

  onLogin: (login: string, password: string) => IPushPullRedux.IPushPullLoginAction;
  onCancel: () => any;
}

interface IPushPullLoginPopupInternalState {
  Login: string | undefined;
  Password: string | undefined;
}

const IPushPullLoginComponent = (props: IPushPullLoginPopupProps) => {
  const adaptable = useAdaptable();
  const options: IPushPullPluginOptions = adaptable!.getPlugin('ipushpull')!.options;

  const [state, setState] = React.useState<IPushPullLoginPopupInternalState>({
    Login: options.username || '',
    Password: options.password || '',
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
      header="ipushpull Login Details"
      glyphicon="login"
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
            Login to ipushpull using your login (email address) and password.
          </HelpBlock>

          <FormLayout margin={3}>
            <FormRow label="ipushpull login:">
              <Input
                width="100%"
                type="email"
                placeholder="Email address"
                value={state.Login}
                onChange={onLoginChange}
              />
            </FormRow>
            <FormRow label="ipushpull password:">
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

function mapStateToProps(state: AdaptableState): Partial<IPushPullLoginPopupProps> {
  return {
    // pushpullLogin: state.IPushPull ? state.IPushPull!.Username : undefined,
    // pushpullPassword: state.IPushPull ? state.IPushPull!.Password : undefined,
    // pushpullLoginErrorMessage: state.IPushPull.IPushPullLoginErrorMessage,
    pushpullLoginErrorMessage: state.System.IPushPullLoginErrorMessage,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<IPushPullLoginPopupProps> {
  return {
    onLogin: (login: string, password: string) =>
      dispatch(IPushPullRedux.IPushPullLogin(login, password)),
    onCancel: () => {
      dispatch(PopupRedux.PopupHideScreen());
      dispatch(IPushPullRedux.IPushPullSetLoginErrorMessage(''));
    },
  };
}

export let IPushPullLoginPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullLoginComponent);
