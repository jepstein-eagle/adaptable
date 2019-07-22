import * as React from 'react';

import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonEdit extends React.Component<SimpleButtonProps, {}> {
  render() {
    return <SimpleButton tooltip="Edit" variant="text" icon="edit" iconSize={20} {...this.props} />;
  }
}
