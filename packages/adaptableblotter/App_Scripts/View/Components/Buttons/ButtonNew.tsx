import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonNew extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase ToolTipAndText="New"
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
            hideToolTip={this.props.hideToolTip}
            showDefaultStyle={this.props.showDefaultStyle}
            />;
    }
}