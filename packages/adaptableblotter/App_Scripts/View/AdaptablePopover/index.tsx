import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { UIHelper } from '../UIHelper';
import { ButtonInfo } from '../Components/Buttons/ButtonInfo';

import icons from '../../components/icons';
import OverlayTrigger from '../../components/OverlayTrigger';

import { ReactComponentLike } from 'prop-types';
import { Flex, Box, Text } from 'rebass';

/*
Very basic - for now! - info box that allows us to show Error where required.
3 params:
1. HeaderText - if not supplied then no header appears
2. BodyText - the main message (sent not as a string but as an array so it can include html elements)
3. MessageType - Info, Warning or Error (matching the bootstrap types)
4. Trigger - defaults to hover but can be click...
*/

export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
  headerText?: string;
  bodyText: any[];
  MessageType?: MessageType;
  cssClassName?: string;
  triggerAction?: string;
  useButton?: boolean;
  tooltipText?: string;
  popoverMinWidth?: number;
  size?: ReactBootstrap.Sizes;
  showDefaultStyle?: boolean;
}

export class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
  render() {
    let cssClassName = (this.props.cssClassName || '') + StyleConstants.INFO_BUTTON;

    let messageType: MessageType =
      this.props.MessageType != null ? this.props.MessageType : MessageType.Info;

    let triggerAction = this.props.triggerAction != null ? this.props.triggerAction : ['click'];

    let useButton = this.props.useButton != null ? this.props.useButton : false;
    let popoverMinWidth: string =
      this.props.popoverMinWidth != null ? this.props.popoverMinWidth.toString() + 'px' : 'auto';
    let size = this.props.size ? this.props.size : 'small';

    const title = StringExtensions.IsNotNullOrEmpty(this.props.headerText)
      ? this.props.headerText
      : '';
    const popoverClickRootClose = (
      <Box
        className="ab-Popover"
        style={{ margin: '0px', padding: '0px', minWidth: popoverMinWidth, maxWidth: 300 }}
      >
        {title ? (
          <Text fontSize={3} padding={2}>
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
    const IconCmp = icons[icon] as ReactComponentLike;

    const iconStyle = {
      color,
      fill: 'currentColor',
    };

    return (
      <Flex alignItems="center" className={cssClassName}>
        {icons.check}
        <OverlayTrigger
          showTriangle
          render={() => popoverClickRootClose}
          showEvent="click"
          hideEvent="blur"
          style={{
            overflow: 'visible',
          }}
          defaultZIndex={100000}
        >
          {useButton ? (
            <ButtonInfo
              style={iconStyle}
              onClick={() => null}
              glyph={icon}
              tooltip={this.props.tooltipText}
            />
          ) : (
            <div tabIndex={0} style={{ cursor: 'pointer', display: 'inline-block' }}>
              {IconCmp ? <IconCmp style={iconStyle} /> : <Glyphicon glyph={icon} />}
            </div>
          )}
        </OverlayTrigger>
      </Flex>
    );
  }
}
