import * as React from 'react';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { UIHelper } from '../../UIHelper';
import { Modal } from 'react-bootstrap';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { PanelWithImage } from '../Panels/PanelWithImage';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { Flex, Box, Text } from 'rebass';
import SimpleButton from '../../../components/SimpleButton';
import Input from '../../../components/Input';

/**
 * Used when giving the user 2 choices with the option of adding text also
 */

export interface AdaptableBlotterPopupConfirmationProps
  extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
  ShowPopup: boolean;
  onConfirm: (comment: string) => void;
  onCancel: Function;
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

    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.AdaptableBlotter.blotterOptions,
      document
    );
    let cssClassName: string = StyleConstants.POPUP_PROMPT;

    return (
      this.props.ShowPopup && (
        <div className={StyleConstants.POPUP_PROMPT}>
          <Modal
            show={this.props.ShowPopup}
            onHide={this.props.onCancel}
            className={cssClassName}
            container={modalContainer}
            bsSize={'small'}
          >
            <div className={cssClassName + StyleConstants.MODAL_BASE}>
              <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>
                <div className={cssClassName}>
                  <PanelWithImage
                    cssClassName={cssClassName}
                    header={header}
                    bsStyle={style}
                    glyphicon={glyph}
                    variant="primary"
                  >
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
                            className={
                              cssClassName +
                              StyleConstants.MODAL_FOOTER +
                              StyleConstants.CONFIRM_BUTTON
                            }
                            variant="raised"
                            disabled={!this.canConfirm()}
                            onClick={() => this.onConfirmmForm()}
                          >
                            {this.props.ConfirmButtonText}
                          </SimpleButton>
                          <div style={{ flex: 1 }} />
                          <SimpleButton
                            tone="neutral"
                            variant="raised"
                            bsStyle={StyleConstants.DEFAULT_BSSTYLE}
                            className={
                              cssClassName +
                              StyleConstants.MODAL_FOOTER +
                              StyleConstants.CANCEL_BUTTON
                            }
                            onClick={() => this.onCancelForm()}
                          >
                            {this.props.CancelButtonText}
                          </SimpleButton>
                        </Flex>
                      </Box>
                    </div>
                  </PanelWithImage>
                </div>
              </Modal.Body>
            </div>
          </Modal>
        </div>
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
