import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonNext extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase ToolTipAndText="Next"
            bsStyle='info'
            bsSize={this.props.size}
            glyph="plus"
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            cssClassName={this.props.cssClassName + StyleConstants.NEW_BUTTON}
            showDefaultStyle={this.props.showDefaultStyle}
            />;
    }
}