import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonShow extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase
            ToolTipAndText="Show"
            bsStyle={StyleConstants.DEFAULT_BSSTYLE}
            bsSize={this.props.size}
            glyph="resize-full"
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            cssClassName={this.props.cssClassName + StyleConstants.SHOW_BUTTON}
            showDefaultStyle={this.props.showDefaultStyle}
            />;
    }
}