import { IAdaptable } from '../../../BlotterInterfaces/IAdaptable';
import * as React from 'react';

import { UIHelper } from '../../UIHelper';
import Dialog from '../../../components/Dialog';
import { Box } from 'rebass';

export interface IAdaptableLoadingScreenProps
  extends React.ClassAttributes<AdaptableLoadingScreen> {
  showLoadingScreen: boolean;
  onClose?: () => {};
  Adaptable: IAdaptable;
}

export class AdaptableLoadingScreen extends React.Component<IAdaptableLoadingScreenProps, {}> {
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
