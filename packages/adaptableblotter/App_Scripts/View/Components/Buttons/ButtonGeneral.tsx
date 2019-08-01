import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonGeneral extends React.Component<SimpleButtonProps, {}> {
  render() {
    return <SimpleButton tooltip="" variant="text" {...this.props} />;
  }
}
