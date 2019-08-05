import * as React from 'react';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { UIHelper } from '../UIHelper';
import { ButtonInfo } from '../Components/Buttons/ButtonInfo';

import { Icon } from '../../components/icons';
import OverlayTrigger from '../../components/OverlayTrigger';

import { Flex, Box, Text } from 'rebass';

export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
  headerText?: string;
  showEvent?: string;
  hideEvent?: string;
  bodyText: any[];
  MessageType?: MessageType;
  triggerAction?: string;
  useButton?: boolean;
  tooltipText?: string;
  popoverMinWidth?: number;
}

export class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
  render() {
    let messageType: MessageType =
      this.props.MessageType != null ? this.props.MessageType : MessageType.Info;

    let useButton = this.props.useButton != null ? this.props.useButton : false;
    let popoverMinWidth: string =
      this.props.popoverMinWidth != null ? this.props.popoverMinWidth.toString() + 'px' : 'auto';

    const title = StringExtensions.IsNotNullOrEmpty(this.props.headerText)
      ? this.props.headerText
      : '';
    const popoverClickRootClose = (
      <Box
        className="ab-Popover"
        style={{ margin: '0px', padding: '0px', minWidth: popoverMinWidth, maxWidth: 300 }}
      >
        {title ? (
          <Text fontSize={2} padding={2}>
            <b>{title}</b>
          </Text>
        ) : null}
        <Box padding={2}>
          {this.props.bodyText.map((textOrHTML: any, index: any) => (
            <span key={index}>{textOrHTML}</span>
          ))}
        </Box>
      </Box>
    );

    const icon = UIHelper.getGlyphByMessageType(messageType);
    const color = UIHelper.getColorByMessageType(messageType);

    const iconStyle = {
      color,
      fill: 'currentColor',
    };

    return (
      <Flex alignItems="center">
        <Icon name="check" />
        <OverlayTrigger
          showTriangle
          render={() => popoverClickRootClose}
          showEvent={(this.props.showEvent || 'mouseenter') as 'mouseenter'}
          hideEvent={(this.props.hideEvent || 'mouseleave') as 'mouseleave'}
          style={{
            overflow: 'visible',
          }}
          defaultZIndex={100000}
        >
          {useButton ? (
            <ButtonInfo
              style={iconStyle}
              onClick={() => null}
              icon={icon}
              tooltip={this.props.tooltipText}
            />
          ) : (
            <div tabIndex={0} style={{ cursor: 'pointer', display: 'inline-block' }}>
              <Icon name={icon} />
            </div>
          )}
        </OverlayTrigger>
      </Flex>
    );
  }
}
