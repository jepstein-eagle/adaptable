import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface LogoutButtonProps extends SimpleButtonProps {}

export class ButtonLogout extends React.Component<LogoutButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Logout" iconSize={20} icon="logout" variant="text" {...this.props} />
    );
  }
}
