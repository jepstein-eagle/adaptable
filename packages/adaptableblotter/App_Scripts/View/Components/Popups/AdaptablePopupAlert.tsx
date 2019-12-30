import * as React from 'react';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';

import { PanelWithImage } from '../Panels/PanelWithImage';
import { UIHelper } from '../../UIHelper';
import { Flex, Text } from 'rebass';
import Dialog from '../../../components/Dialog';
import SimpleButton from '../../../components/SimpleButton';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';

/**
 * The most simple of the alert type popups - just shows a message with a close button.  No user action required.
 */
export interface AdaptableBlotterPopupAlertProps
  extends React.ClassAttributes<AdaptablePopupAlert> {
  ShowPopup: boolean;
  onClose: () => void;
  Msg: string;
  Header: string;
  MessageType: MessageType;
  Adaptable: IAdaptable;
}

export class AdaptablePopupAlert extends React.Component<AdaptableBlotterPopupAlertProps, {}> {
  render() {
    const messageType = this.props.MessageType || MessageType.Error;
    let headerContainsMessage: boolean = this.props.Header.indexOf(messageType) != -1;

    const headerColor = UIHelper.getColorByMessageType(messageType);
    let header: string = headerContainsMessage ? this.props.Header : messageType.toUpperCase();
    let glyph: string = UIHelper.getGlyphByMessageType(messageType);

    return (
      this.props.ShowPopup && (
        <Dialog
          showCloseButton={false}
          isOpen={this.props.ShowPopup}
          onDismiss={this.props.onClose}
          style={{
            minHeight: 'auto',
            minWidth: '20vw',
          }}
        >
          <PanelWithImage
            header={header}
            headerColor={headerColor}
            glyphicon={glyph}
            bodyProps={{ padding: 2 }}
          >
            <div>
              {headerContainsMessage == false && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text my={2}>{this.props.Header}</Text>
                </div>
              )}
              <Flex flexDirection="row" alignItems="center">
                {this.props.Msg.split('\n').map(function(item, index) {
                  return (
                    <Flex flexDirection="row" key={index}>
                      <Text key={index} margin={2}>
                        {item}
                        <br />
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
              <Flex flexDirection="row" marginTop={2} alignItems="center" padding={2}>
                <SimpleButton
                  variant="raised"
                  tone={messageType.toLowerCase() as any}
                  onClick={() => this.props.onClose()}
                >
                  OK
                </SimpleButton>
              </Flex>
            </div>
          </PanelWithImage>
        </Dialog>
      )
    );
  }
}
