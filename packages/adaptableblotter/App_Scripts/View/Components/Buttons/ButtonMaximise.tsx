import * as React from 'react';
import { ButtonBase, ButtonProps } from './ButtonBase';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export interface MaximiseButtonProps extends ButtonProps {
  useHoirzontalChevron?: boolean;
}

export class ButtonMaximise extends React.Component<MaximiseButtonProps, {}> {
  render() {
    return (
      <ButtonBase
        ToolTipAndText="Maximise"
        bsStyle={this.props.bsStyle}
        bsSize={this.props.size}
        glyph={this.props.useHoirzontalChevron ? 'chevron-right' : 'chevron-down'}
        onClick={() => this.props.onClick()}
        overrideDisableButton={this.props.overrideDisableButton}
        overrideTooltip={this.props.overrideTooltip}
        style={this.props.style}
        DisplayMode={this.props.DisplayMode}
        overrideText={this.props.overrideText}
        cssClassName={this.props.cssClassName + StyleConstants.MINIMISE_BUTTON}
        hideToolTip={this.props.hideToolTip}
        showDefaultStyle={this.props.showDefaultStyle}
      />
    );
  }
}
