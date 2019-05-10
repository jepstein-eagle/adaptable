import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonEdit extends React.Component<ButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText="Edit"
        bsStyle="success"
        bsSize={this.props.size}
        glyph="edit"
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        cssClassName={this.props.cssClassName + StyleConstants.EDIT_BUTTON}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
