import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface ExportButtonProps extends SimpleButtonProps {}

export class ButtonExport extends React.Component<ExportButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Export" iconSize={20} icon="export" variant="text" {...this.props} />
    );
  }
}
