import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface NewPageButtonProps extends SimpleButtonProps {}

export class ButtonNewPage extends React.Component<NewPageButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        tooltip="New Page"
        iconSize={20}
        icon="newpage" // arrow-up
        variant="text"
        {...this.props}
      />
    );
  }
}
