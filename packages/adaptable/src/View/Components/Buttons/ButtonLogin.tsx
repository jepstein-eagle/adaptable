import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface LoginButtonProps extends SimpleButtonProps {}

export class ButtonLogin extends React.Component<LoginButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Login" iconSize={20} icon="login" variant="text" {...this.props} />
    );
  }
}
