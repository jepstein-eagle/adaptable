import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import { Icon } from '@mdi/react';
import { mdiArrowExpand } from '@mdi/js';

export class ButtonExpand extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Expand" {...this.props}>
        <Icon size="1.1rem" path={mdiArrowExpand} />
      </SimpleButton>
    );
  }
}
