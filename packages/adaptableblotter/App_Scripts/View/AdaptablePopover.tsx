import * as React from 'react';
import { Label, OverlayTrigger, Glyphicon, Popover, Button } from 'react-bootstrap';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { MessageType } from '../PredefinedConfig/Common/Enums';
import * as StyleConstants from '../Utilities/Constants/StyleConstants';
import { ButtonApply } from './Components/Buttons/ButtonApply';
import { ButtonInfo } from './Components/Buttons/ButtonInfo';
import { UIHelper } from './UIHelper';

/*
Very basic - for now! - info box that allows us to show Error where required.
3 params:
1. HeaderText - if not supplied then no header appears
2. BodyText - the main message (sent not as a string but as an array so it can include html elements)
3. MessageType - Info, Warning or Error (matching the bootstrap types)
4. Trigger - defaults to hover but can be click...
*/

export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
  headerText: string;
  bodyText: any[];
  MessageType?: MessageType;
  cssClassName: string;
  triggerAction?: string;
  useButton?: boolean;
  tooltipText?: string;
  popoverMinWidth?: number;
  size?: ReactBootstrap.Sizes;
  showDefaultStyle?: boolean;
}

export class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.INFO_BUTTON;

    let messageType: MessageType =
      this.props.MessageType != null ? this.props.MessageType : MessageType.Info;

    let triggerAction = this.props.triggerAction != null ? this.props.triggerAction : ['click'];

    let useButton = this.props.useButton != null ? this.props.useButton : false;
    let popoverMinWidth: string =
      this.props.popoverMinWidth != null ? this.props.popoverMinWidth.toString() + 'px' : 'auto';
    let size = this.props.size ? this.props.size : 'small';

    const popoverClickRootClose = (
      <Popover
        style={{ margin: '0px', padding: '0px', minWidth: popoverMinWidth }}
        id={'ab_popover'}
        title={
          StringExtensions.IsNotNullOrEmpty(this.props.headerText) ? this.props.headerText : ''
        }
      >
        {this.props.bodyText.map((textOrHTML: any, index: any) => (
          <span key={index}>{textOrHTML}</span>
        ))}
      </Popover>
    );

    return (
      <span className={cssClassName}>
        <OverlayTrigger
          rootClose
          trigger={triggerAction}
          placement={'bottom'}
          overlay={popoverClickRootClose}
        >
          {useButton ? (
            <ButtonInfo
              cssClassName={cssClassName}
              onClick={() => null}
              size={size}
              glyph={UIHelper.getGlyphByMessageType(messageType)}
              bsStyle={UIHelper.getStyleNameByMessageType(messageType)}
              DisplayMode="Glyph"
              tooltipText={this.props.tooltipText}
              showDefaultStyle={this.props.showDefaultStyle}
            />
          ) : (
            <Label
              bsSize="large"
              bsStyle={UIHelper.getStyleNameByMessageType(messageType)}
              className="ab_medium_padding"
            >
              <Glyphicon glyph={UIHelper.getGlyphByMessageType(messageType)} />
            </Label>
          )}
        </OverlayTrigger>
      </span>
    );
  }
}
