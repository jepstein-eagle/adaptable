import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from 'react';

import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
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
    let cssClassName: string = StyleConstants.AB_STYLE;

    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.AdaptableBlotter.blotterOptions,
      document
    );

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
