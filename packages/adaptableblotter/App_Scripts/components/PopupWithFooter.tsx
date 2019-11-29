import * as React from 'react';

import Dialog, { DialogProps } from './Dialog';

import FlexWithFooter from './FlexWithFooter';

/**
 * This is the main popup that we use - so all function popups will appear here.
 */

export interface IPopupWithFooterProps extends DialogProps {
  showModal: boolean;
  onHide?: () => void;
  modal?: boolean;

  footer: React.ReactNode;
  children: React.ReactNode;
}

export class PopupWithFooter extends React.Component<IPopupWithFooterProps, {}> {
  render() {
    const { showModal, onHide, footer, ...dialogProps } = this.props;
    return (
      <Dialog
        {...dialogProps}
        isOpen={showModal}
        onDismiss={onHide}
        showCloseButton={false}
        padding={0}
      >
        <FlexWithFooter
          flexDirection="column"
          style={{
            height: '100%',
            maxHeight: '90vh',

            width: '70vw',
            maxWidth: 800,
          }}
          footer={footer}
          footerProps={{
            padding: 2,
            backgroundColor: 'primary',
            className: 'ab-Popup__footer',
          }}
          children={this.props.children}
        />
      </Dialog>
    );
  }
}
