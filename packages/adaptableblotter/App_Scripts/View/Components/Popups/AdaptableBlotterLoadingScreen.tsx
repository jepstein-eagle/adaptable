import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import * as React from 'react';

import { UIHelper } from '../../UIHelper';
import Dialog from '../../../components/Dialog';
import { Box } from 'rebass';

export interface IAdaptableBlotterLoadingScreenProps
  extends React.ClassAttributes<AdaptableBlotterLoadingScreen> {
  showLoadingScreen: boolean;
  onClose?: () => {};
  AdaptableBlotter: IAdaptableBlotter;
}

export class AdaptableBlotterLoadingScreen extends React.Component<
  IAdaptableBlotterLoadingScreenProps,
  {}
> {
  render() {
    return (
      <Dialog
        modal
        isOpen={this.props.showLoadingScreen}
        onDismiss={this.props.onClose}
        showCloseButton={false}
        style={{
          minHeight: 'auto',
        }}
      >
        <Box padding={3}>
          <h4>Initialising Grid</h4>
          <p>Retrieving your settings and setting up the grid...</p>
        </Box>
      </Dialog>
    );
  }
}
