import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';

export class ButtonShare extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText="Share"
        glyph="share"
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
