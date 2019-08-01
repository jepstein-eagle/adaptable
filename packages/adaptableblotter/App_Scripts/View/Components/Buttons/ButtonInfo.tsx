import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface InfoButtonProps extends SimpleButtonProps {
  glyph?: string;
  tooltip?: string;
}

export class ButtonInfo extends React.Component<InfoButtonProps, {}> {
  render() {
    return <SimpleButton iconSize={20} icon="info" variant="text" {...this.props} />;
  }
}
