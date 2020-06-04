import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
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
  const [state, setState] = React.useState<Glue42LoginPopupInternalState>({
    Login: props.glue42Login || '',
    Password: props.glue42Password || '',
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
    glue42Login: state.Glue42 ? state.Glue42!.Username : undefined,
    glue42Password: state.Glue42 ? state.Glue42!.Password : undefined,
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
