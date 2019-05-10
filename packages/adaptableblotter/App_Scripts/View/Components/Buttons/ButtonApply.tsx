import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export interface ApplyButtonProps extends ButtonProps {
  glyph: string;
}

export class ButtonApply extends React.Component<ApplyButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText="Apply"
        bsStyle={this.props.bsStyle}
        bsSize={this.props.size}
        glyph={this.props.glyph}
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        cssClassName={this.props.cssClassName + StyleConstants.APPLY_BUTTON}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
