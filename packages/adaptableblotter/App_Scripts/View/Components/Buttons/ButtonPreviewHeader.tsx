import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';

export class ButtonPrev extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText=""
        glyph={this.props.glyph}
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        hideToolTip={true}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
