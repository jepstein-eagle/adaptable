import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';

export class ButtonCancel extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText="Close Wizard"
        glyph="remove"
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        hideToolTip={this.props.hideToolTip}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
