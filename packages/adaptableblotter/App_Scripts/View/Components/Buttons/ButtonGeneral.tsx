import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonGeneral extends React.Component<SimpleButtonProps, {}> {
  render() {
    return <SimpleButton px={2} py={1} tooltip="" variant="text" {...this.props} />;
  }
}
