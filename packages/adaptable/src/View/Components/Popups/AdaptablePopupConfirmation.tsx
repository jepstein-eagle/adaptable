import * as React from 'react';
import { UIHelper } from '../../UIHelper';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { PanelWithImage } from '../Panels/PanelWithImage';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { Flex, Box, Text } from 'rebass';
import SimpleButton from '../../../components/SimpleButton';
import Input from '../../../components/Input';
import Dialog from '../../../components/Dialog';

/**
 * Used when giving the user 2 choices with the option of adding text also
 */

export interface AdaptablePopupConfirmationProps
  extends React.ClassAttributes<AdaptablePopupConfirmation> {
  ShowPopup: boolean;
  onConfirm: (comment: string) => void;
  onCancel: () => void;
  Header: string;
  Msg: string;
  ConfirmButtonText: string;
  CancelButtonText: string;
  ShowInputBox: boolean;
  MessageType: MessageType;
  Adaptable: IAdaptable;
}

export interface AdaptablePopupConfirmationState {
  PromptText: string;
}

export class AdaptablePopupConfirmation extends React.Component<
  AdaptablePopupConfirmationProps,
  AdaptablePopupConfirmationState
> {
  constructor(props: AdaptablePopupConfirmationProps) {
    super(props);
    this.state = { PromptText: '' };
  }

  render() {
    let header: string = this.props.Header;
    let glyph: string = UIHelper.getGlyphByMessageType(this.props.MessageType);

    return (
      this.props.ShowPopup && (
        <Dialog
          modal
          isOpen={this.props.ShowPopup}
          onDismiss={this.props.onCancel}
          showCloseButton={false}
          style={{ minHeight: 'auto', maxWidth: '50%' }}
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
                <Box padding={2}>
                  <p>Please enter a comment to confirm</p>

                  <Input
                    marginTop={2}
                    width={'100%'}
                    value={this.state.PromptText}
                    type="string"
                    placeholder="Enter text"
                    onChange={(e: React.SyntheticEvent) => this.changeContent(e)}
                  />
                </Box>
              )}
              <Box marginTop={3}>
                <Flex padding={2}>
                  <SimpleButton
                    tone="error"
                    data-name="delete"
                    variant="raised"
                    disabled={!this.canConfirm()}
                    onClick={() => this.onConfirmmForm()}
                  >
                    {this.props.ConfirmButtonText}
                  </SimpleButton>
                  <div style={{ flex: 1 }} />
                  <SimpleButton
                    data-name="cancel"
                    tone="neutral"
                    variant="raised"
                    onClick={() => this.onCancelForm()}
                  >
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
    this.setState({ PromptText: '' } as AdaptablePopupConfirmationState);
    this.props.onCancel();
  }

  onConfirmmForm(): void {
    let promptText = this.state.PromptText;
    this.setState({ PromptText: '' } as AdaptablePopupConfirmationState);
    this.props.onConfirm(promptText);
  }

  changeContent = (e: any) => {
    this.setState({ PromptText: e.target.value } as AdaptablePopupConfirmationState);
  };

  canConfirm(): boolean {
    if (this.props.ShowInputBox) {
      return StringExtensions.IsNotNullOrEmpty(this.state.PromptText);
    }
    return true;
  }
}
