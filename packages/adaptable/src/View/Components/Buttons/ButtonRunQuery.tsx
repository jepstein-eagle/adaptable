import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import { Icon } from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

export class ButtonRunQuery extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Run Query" {...this.props}>
        <Icon size="1.1rem" path={mdiMagnify} />
      </SimpleButton>
    );
  }
}
