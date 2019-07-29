import * as React from 'react';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

import { UIHelper } from '../../UIHelper';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import Dialog from '../../../components/Dialog';
import { Flex, Box } from 'rebass';
import SimpleButton from '../../../components/SimpleButton';
import Input from '../../../components/Input';
import { SyntheticEvent } from 'react';

export interface AdaptableBlotterPopupPromptProps
  extends React.ClassAttributes<AdaptableBlotterPopupPrompt> {
  ShowPopup: boolean;
  Header: string;
  Msg: string;
  onClose: () => void;
  onConfirm: Function;
  AdaptableBlotter: IAdaptableBlotter;
}

export interface AdaptableBlotterPopupPromptState {
  PromptText: string;
}

export class AdaptableBlotterPopupPrompt extends React.Component<
  AdaptableBlotterPopupPromptProps,
  AdaptableBlotterPopupPromptState
> {
  constructor(props: AdaptableBlotterPopupPromptProps) {
    super(props);
    this.state = { PromptText: '' };
  }

  render() {
    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.AdaptableBlotter.blotterOptions,
      document
    );
    let cssClassName: string = StyleConstants.POPUP_PROMPT;

    return (
      this.props.ShowPopup && (
        <Dialog
          modal
          isOpen={this.props.ShowPopup}
          onDismiss={this.props.onClose}
          className={cssClassName}
          showCloseButton={false}
          style={{ minHeight: 'auto', maxWidth: '50%' }}
        >
          <Flex flexDirection="column">
            <Box marginTop={3} mx={2}>
              {this.props.Header}
            </Box>
            {StringExtensions.IsNotNullOrEmpty(this.props.Msg) && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {this.props.Msg.split('\n').map(function(item, index) {
                  return (
                    <span key={index}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </div>
            )}

            <Input
              autoFocus
              marginTop={3}
              mx={3}
              value={this.state.PromptText}
              type="string"
              placeholder="Enter text"
              onChange={(e: SyntheticEvent) => this.changeContent(e)}
            />

            <Box marginTop={3}>
              <Flex padding={2}>
                <SimpleButton
                  tone="accent"
                  variant="raised"
                  disabled={StringExtensions.IsNullOrEmpty(this.state.PromptText)}
                  onClick={() => this.onConfirmmForm()}
                >
                  OK
                </SimpleButton>
                <div style={{ flex: 1 }} />
                <SimpleButton tone="neutral" variant="raised" onClick={() => this.onCloseForm()}>
                  Cancel
                </SimpleButton>
              </Flex>
            </Box>
          </Flex>
        </Dialog>
      )
    );
  }

  onCloseForm(): void {
    this.setState({ PromptText: '' } as AdaptableBlotterPopupPromptState);
    this.props.onClose();
  }

  onConfirmmForm(): void {
    let promptText = this.state.PromptText;
    this.setState({ PromptText: '' } as AdaptableBlotterPopupPromptState);
    this.props.onConfirm(promptText);
  }

  changeContent = (e: any) => {
    this.setState({ PromptText: e.target.value } as AdaptableBlotterPopupPromptState);
  };
}
