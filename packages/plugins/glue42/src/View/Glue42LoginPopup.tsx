import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { useAdaptable } from '@adaptabletools/adaptable/src/View/AdaptableContext';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as Glue42Redux from '../Redux/ActionReducers/Glue42Redux';
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
import { Glue42PluginOptions } from '..';

interface Glue42LoginPopupProps {
  glue42Login: string | undefined;
  glue42Password: string | undefined;
  glue42LoginErrorMessage: string | undefined;

  onLogin: (login: string, password: string) => Glue42Redux.Glue42LoginAction;
  onCancel: () => any;
}

interface Glue42LoginPopupInternalState {
  Login: string | undefined;
  Password: string | undefined;
}

const Glue42LoginComponent = (props: Glue42LoginPopupProps) => {
  const adaptable = useAdaptable();
  const options: Glue42PluginOptions = adaptable!.getPlugin('ipushpull')!.options;
  const [state, setState] = React.useState<Glue42LoginPopupInternalState>({
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
      header="Glue42 Login Details"
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
          <HelpBlock marginBottom={1}>Login to Glue42 using your login and password.</HelpBlock>

          <FormLayout margin={3}>
            <FormRow label="Glue42 login:">
              <Input
                width="100%"
                type="text"
                placeholder="Username"
                value={state.Login}
                onChange={onLoginChange}
              />
            </FormRow>
            <FormRow label="Glue42 password:">
              <Input
                width="100%"
                type="password"
                placeholder="Password"
                value={state.Password}
                onChange={onPasswordChange}
              />
            </FormRow>
            {props.glue42LoginErrorMessage ? (
              <FormRow label="">
                <ErrorBox>{props.glue42LoginErrorMessage}</ErrorBox>
              </FormRow>
            ) : null}
          </FormLayout>
        </Flex>
      </FlexWithFooter>
    </PanelWithImage>
  );
};

function mapStateToProps(state: AdaptableState): Partial<Glue42LoginPopupProps> {
  return {
    glue42LoginErrorMessage: state.Glue42.Glue42LoginErrorMessage,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<Glue42LoginPopupProps> {
  return {
    onLogin: (login: string, password: string) =>
      dispatch(Glue42Redux.Glue42Login(login, password)),
    onCancel: () => {
      dispatch(PopupRedux.PopupHideScreen());
      dispatch(Glue42Redux.Glue42SetLoginErrorMessage(''));
    },
  };
}

export let Glue42LoginPopup = connect(mapStateToProps, mapDispatchToProps)(Glue42LoginComponent);
