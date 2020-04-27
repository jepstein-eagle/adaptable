import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import { AdaptablePopupPrompt } from '../Popups/AdaptablePopupPrompt';
import { IAdaptable } from '../../../types';

interface ButtonShareProps extends SimpleButtonProps {
  // Adaptable: IAdaptable;
  onShare: (description: string) => void;
  Header: string;
  Message: string;
}

interface ButtonShareState {
  open: boolean;
}

export class ButtonShare extends React.Component<ButtonShareProps, ButtonShareState> {
  constructor(props: ButtonShareProps) {
    super(props);
    this.state = { open: false };
  }
  render() {
    const { onShare, Header, Message, ...buttonProps } = this.props;
    return (
      <>
        <SimpleButton
          tooltip="Share"
          variant="text"
          icon="team-share"
          iconSize={20}
          onClick={() => this.setState({ open: true })}
          {...buttonProps}
        />
        <AdaptablePopupPrompt
          // Adaptable={Adaptable}
          Msg={Message}
          Header={Header}
          onClose={() => this.setState({ open: false })}
          onConfirm={(description: string) => {
            this.setState({ open: false });
            onShare(description);
          }}
          ShowPopup={this.state.open}
        />
      </>
    );
  }
}
