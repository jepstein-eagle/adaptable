import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonShare extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText="Share"
        bsStyle="warning"
        bsSize={this.props.size}
        //ConfigEntity={this.props.ConfigEntity}
        glyph="share"
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        cssClassName={this.props.cssClassName + StyleConstants.SHARE_BUTTON}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
