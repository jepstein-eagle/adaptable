import * as React from 'react';
import { ButtonBase, ButtonProps, ButtonBaseProps } from './ButtonBase';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';

export class ButtonDashboard extends React.Component<ButtonBaseProps, {}> {
  render() {
    return (
      <ButtonBase
        glyph={this.props.glyph}
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        ToolTipAndText={this.props.ToolTipAndText}
        AccessLevel={AccessLevel.Full}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
