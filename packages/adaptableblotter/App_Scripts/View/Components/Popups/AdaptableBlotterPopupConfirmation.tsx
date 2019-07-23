import * as React from 'react';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { UIHelper } from '../../UIHelper';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { PanelWithImage } from '../Panels/PanelWithImage';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { Flex, Box, Text } from 'rebass';
import SimpleButton from '../../../components/SimpleButton';
import Input from '../../../components/Input';
import Dialog from '../../../components/Dialog';

/**
 * Used when giving the user 2 choices with the option of adding text also
 */

export interface AdaptableBlotterPopupConfirmationProps
  extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
  ShowPopup: boolean;
  onConfirm: (comment: string) => void;
  onCancel: () => void;
  Header: string;
  Msg: string;
  ConfirmButtonText: string;
  CancelButtonText: string;
  ShowInputBox: boolean;
  MessageType: MessageType;
  AdaptableBlotter: IAdaptableBlotter;
}

export interface AdaptableBlotterPopupConfirmationState {
  PromptText: string;
}

export class AdaptableBlotterPopupConfirmation extends React.Component<
  AdaptableBlotterPopupConfirmationProps,
  AdaptableBlotterPopupConfirmationState
> {
  constructor(props: AdaptableBlotterPopupConfirmationProps) {
    super(props);
    this.state = { PromptText: '' };
  }

  render() {
    let style: string = UIHelper.getStyleNameByMessageType(this.props.MessageType);
    let header: string = this.props.Header;
    let glyph: string = UIHelper.getGlyphByMessageType(this.props.MessageType);

    return (
      this.props.ShowPopup && (
        <Dialog
          modal
          isOpen={this.props.ShowPopup}
          onDismiss={this.props.onCancel}
          showCloseButton={false}
          style={{
            minHeight: 'auto',
          }}
        >
          <PanelWithImage header={header} icon={glyph} variant="primary">
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {this.props.Msg.split('\n').map(function(item, index) {
                  return (
                    <Text key={index} margin={2}>
                      {item}
                      <br />
                    </Text>
                  );
                })}
              </div>
              {this.props.ShowInputBox && (
                <div style={{ marginTop: '20px' }}>
                  <span>Please enter a comment to confirm</span>
                  <br />
                  <Input
                    marginTop={2}
                    value={this.state.PromptText}
                    type="string"
                    placeholder="Enter text"
                    onChange={(e: React.SyntheticEvent) => this.changeContent(e)}
                  />
                </div>
              )}
              <Box marginTop={3}>
                <Flex padding={2}>
                  <SimpleButton
                    bsStyle={StyleConstants.PRIMARY_BSSTYLE}
                    tone="error"
                    variant="raised"
                    disabled={!this.canConfirm()}
                    onClick={() => this.onConfirmmForm()}
                  >
                    {this.props.ConfirmButtonText}
                  </SimpleButton>
                  <div style={{ flex: 1 }} />
                  <SimpleButton tone="neutral" variant="raised" onClick={() => this.onCancelForm()}>
                    {this.props.CancelButtonText}
                  </SimpleButton>
                </Flex>
              </Box>
            </div>
          </PanelWithImage>
        </Dialog>
      )
    );
  }

  onCancelForm(): void {
    this.setState({ PromptText: '' } as AdaptableBlotterPopupConfirmationState);
    this.props.onCancel();
  }

  onConfirmmForm(): void {
    let promptText = this.state.PromptText;
    this.setState({ PromptText: '' } as AdaptableBlotterPopupConfirmationState);
    this.props.onConfirm(promptText);
  }

  changeContent = (e: any) => {
    this.setState({ PromptText: e.target.value } as AdaptableBlotterPopupConfirmationState);
  };

  canConfirm(): boolean {
    if (this.props.ShowInputBox) {
      return StringExtensions.IsNotNullOrEmpty(this.state.PromptText);
    }
    return true;
  }
}
