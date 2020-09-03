import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import { Icon } from '@mdi/react';
import { mdiAlert } from '@mdi/js';

export class ButtonInvalid extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton {...this.props}>
        <Icon size="1.1rem" path={mdiAlert} />
      </SimpleButton>
    );
  }
}
